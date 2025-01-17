import type { FC } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { message } from "antd"
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData"
import ListSearch from "@/components/ListSearch"
import ListPagination from "@/components/ListPagination"
import { updateQuestions, deleteQuestions } from "@/services/question"
import styles from "./common.module.scss"

const { Title } = ATypography
const { confirm } = AModal

interface DataType {
	_id: string
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const Trash: FC = () => {
	useTitle("我的-回收站")

	const { data, loading, error, refresh } = useLoadQuestionListData({ isDeleted: true })
	const { list = [], total = 0 } = data || {}

	const [checkedList, setCheckedList] = useState<string[]>([])

	const tableColumns = [
		{
			title: "标题",
			dataIndex: "title",
			key: "title", //默认取dataIndex的值，也可以自定义
		},
		{
			title: "是否发布",
			dataIndex: "isPublished",
			render: (isPublished: boolean) =>
				isPublished ? <ATag color="processing">已发布</ATag> : <ATag>发布</ATag>,
			// key: 'title', //默认取dataIndex的值，也可以自定义
		},
		{
			title: "答卷",
			dataIndex: "answerCount",
			key: "answerCount", //默认取dataIndex的值，也可以自定义
		},
		{
			title: "创建时间",
			dataIndex: "createdAt",
			key: "createdAt", //默认取dataIndex的值，也可以自定义
		},
	]
	//彻底删除
	const { run: deleteQuestion } = useRequest(async () => await deleteQuestions(checkedList), {
		manual: true,
		onSuccess: () => {
			message.success("删除成功")
			refresh() //重新刷新页面
			setCheckedList([])
		},
		onError: () => message.error("删除失败"),
	})

	function del() {
		confirm({
			title: "确认删除",
			icon: <ExclamationCircleOutlined />,
			content: "确认彻底删除该问卷吗？",
			onOk: deleteQuestion,
		})
	}

	//恢复
	const { run: recover } = useRequest(
		async () => {
			for await (const id of checkedList) {
				await updateQuestions(id, { isDeleted: false })
			}
		},
		{
			manual: true,
			debounceWait: 500, // 防抖
			onSuccess: () => {
				message.success("恢复成功")
				refresh() //重新刷新页面
				setCheckedList([])
			},
			onError: () => message.error("恢复失败"),
		}
	)

	const TableElem = (
		<>
			<div style={{ marginBottom: "16px" }}>
				<ASpace>
					<AButton onClick={recover} type="primary" disabled={checkedList.length === 0}>
						恢复
					</AButton>
					<AButton danger onClick={() => del()}>
						彻底删除
					</AButton>
				</ASpace>
			</div>
			<ATable
				dataSource={list}
				columns={tableColumns}
				pagination={false}
				rowKey={Q => Q._id}
				rowSelection={{
					type: "checkbox",
					onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
						setCheckedList(selectedRowKeys as string[])
					},
				}}
			/>
		</>
	)
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
				</div>
				<div className={styles.right}>
					{/* <ListSearch /> */}
					<ListSearch />
					{JSON.stringify(checkedList)}
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: "center" }}>
						<ASpin />
					</div>
				)}
				{!loading && list.length === 0 && <AEmpty description="暂无数据" />}
				{list.length > 0 && TableElem}
			</div>
			<div className={styles.footer}>
				<ListPagination total={total} />
			</div>
		</>
	)
}

export default Trash
