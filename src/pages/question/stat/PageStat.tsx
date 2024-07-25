import { FC } from "react"
import { getQuestionStatList } from "@/services/stat"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import { STAT_PAGE_SIZE } from "@/constant"

type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (id: string) => void
	setSelectedComponentType: (type: string) => void
}

const { Title } = ATypography
const PageStat: FC<PropsType> = (props: PropsType) => {
	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
	const [list, setList] = useState([])
	const [total, setTotal] = useState(0)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
	const { id = "" } = useParams()
	const { loading } = useRequest(
		async () => {
			const res = await getQuestionStatList(id, { page, pageSize })
			return res
		},
		{
			refreshDeps: [page, pageSize],
			onSuccess: res => {
				const { list = [], total = 0 } = res
				setList(list)
				setTotal(total)
			},
		}
	)
	const { componentList } = useGetComponentsInfo()

	// table List Title
	const columns = componentList.map(c => {
		const { title, fe_id, props = {}, type } = c
		const colTitle = props.title ?? title

		return {
			title: (
				<div
					onClick={() => {
						setSelectedComponentId(fe_id)
						setSelectedComponentType(type)
					}}
					style={{ cursor: "pointer" }}
				>
					<span style={{ color: fe_id === selectedComponentId ? "#1890ff" : "" }}>{colTitle}</span>
				</div>
			),
			dataIndex: fe_id,
		}
	})

	//表格数据
	const dataSource = list.map((item: any) => ({ ...item, key: item._id }))
	const TableElem = (
		<>
			<ATable columns={columns} dataSource={dataSource} pagination={false} />
			<div style={{ marginTop: "20px", textAlign: "center" }}>
				<APagination
					style={{ justifyContent: "center" }}
					current={page}
					pageSize={pageSize}
					total={total}
					onChange={page => setPage(page)}
					onShowSizeChange={(current, size) => {
						setPage(current)
						setPageSize(size)
					}}
				/>
			</div>
		</>
	)

	return (
		<div>
			<Title level={3}>答卷数量: {!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: "center" }}>
					<ASpin />
				</div>
			)}
			{!loading && TableElem}
		</div>
	)
}

export default PageStat
