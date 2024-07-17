import type { FC } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { message } from "antd"
import ListSearch from "@/components/ListSearch"
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

const rawQuestionList = [
	{
		_id: "q2",
		title: "问卷2",
		isPublished: false,
		isStar: false,
		answerCount: 20,
		createdAt: "2022-01-02",
	},
	{
		_id: "q1",
		title: "问卷1",
		isPublished: true,
		isStar: false,
		answerCount: 20,
		createdAt: "2022-01-02",
	},
]

const Trash: FC = () => {
	useTitle("我的-回收站")

	const [questionList, setQuestionList] = useState(rawQuestionList)
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

	function del(_id?: string) {
		confirm({
			title: "确认删除",
			icon: <ExclamationCircleOutlined />,
			content: "确认彻底删除该问卷吗？",
			onOk: () => message.success("删除成功"),
		})
	}

	const tableElem = (
		<>
			<div style={{ marginBottom: "16px" }}>
				<ASpace>
					<AButton type="primary" disabled={checkedList.length === 0}>
						恢复
					</AButton>
					<AButton danger onClick={() => del()}>
						彻底删除
					</AButton>
				</ASpace>
			</div>
			<ATable
				dataSource={questionList}
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
				{questionList.length === 0 && <AEmpty description="暂无数据" />}
				{questionList.length > 0 && tableElem}
			</div>
		</>
	)
}

export default Trash
