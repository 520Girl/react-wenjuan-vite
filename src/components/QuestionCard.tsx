import { FC } from "react"
import classnames from "classnames"
import {
	CopyOutlined,
	DeleteOutlined,
	EditFilled,
	LineChartOutlined,
	StarFilled,
	StarOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons"
import styles from "./QuestionCard.module.scss"
import { message } from "antd"

const { confirm } = AModal

// ts 自定义类型
type PropsType = {
	_id: string
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
	deleteQuestion?: (id: string) => void
	publishQuestion?: (id: string) => void
}

// FC - functional component
const QuestionCard: FC<PropsType> = (props: PropsType) => {
	const {
		_id,
		title,
		createdAt,
		answerCount,
		isPublished,
		deleteQuestion,
		publishQuestion,
		isStar,
	} = props
	const nav = useNavigate() // 路由跳转

	function duplicate(id: string) {
		message.success("复制成功!")
		publishQuestion && publishQuestion(id)
	}

	function del(id: string) {
		confirm({
			title: "确认删除?",
			icon: <ExclamationCircleOutlined />,
			content: "你确定要删除该问卷吗？",
			onOk: () => {
				message.success("删除成功!")
				return Promise.resolve()
			},
		})
		deleteQuestion && deleteQuestion(id)
	}

	// useEffect(() => {
	//   console.log('question card mounted')

	//   return () => {
	//     console.log('question card unmounted', id) // 销毁
	//   }

	//   // 生命周期：创建，更新（state 变化），销毁
	// }, [])

	// let itemClassName = 'list-item'
	// if (isPublished) itemClassName += ' published'
	// // 逻辑稍微复杂

	// const itemClassName = classnames('list-item', { published: isPublished })
	// const itemClassName = classnames({
	//   'list-item': true,
	//   published: isPublished,
	// })

	const listItemClass = styles["list-item"]
	const publishedClass = styles.published
	const itemClassName = classnames({
		[listItemClass]: true,
		[publishedClass]: isPublished,
	})

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<ASpace>
							{isStar && <StarFilled style={{ color: "red" }} />}
							{title}
						</ASpace>
					</Link>
				</div>
				<div className={styles.right}>
					<ASpace>
						{isPublished ? <ATag color="processing">已发布</ATag> : <ATag>发布</ATag>}

						<span>答卷：{answerCount}</span>
						<span>{createdAt}</span>
					</ASpace>
				</div>
			</div>
			<ADivider style={{ margin: "15px 0" }} />
			<div className={styles["button-container"]}>
				<div className={styles.left}>
					<ASpace>
						<AButton
							icon={<EditFilled />}
							type="text"
							size="small"
							onClick={() => nav(`/question/edit/${_id}`)}
						>
							编辑问卷
						</AButton>
						<AButton
							icon={<LineChartOutlined />}
							type="text"
							size="small"
							onClick={() => nav(`/question/stat/${_id}`)}
							disabled={!isPublished}
						>
							数据统计
						</AButton>
					</ASpace>
				</div>
				<div className={styles.right}>
					<ASpace>
						<AButton type="text" size="small" icon={isStar ? <StarFilled /> : <StarOutlined />}>
							{isStar ? "取消标星" : "标星"}
						</AButton>
						<APopconfirm
							title="确认复制？"
							onConfirm={() => duplicate(_id)}
							cancelText="取消"
							okText="确认"
						>
							<AButton type="text" size="small" icon={<CopyOutlined />}>
								复制
							</AButton>
						</APopconfirm>

						<AButton type="text" size="small" icon={<DeleteOutlined />} onClick={() => del(_id)}>
							删除
						</AButton>
					</ASpace>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
