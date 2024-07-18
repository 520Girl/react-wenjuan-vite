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
import { updateQuestions, copyQuestions } from "@/services/question"
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
	const { _id, title, createdAt, answerCount, isPublished, isStar } = props
	//修改 标星
	const [isStarred, setIsStarred] = useState(isStar)
	const { loading: changeStarLoading, run: handleStar } = useRequest(
		async () => {
			await updateQuestions(_id, { isStar: !isStarred })
		},
		{
			manual: true,
			onSuccess: result => {
				setIsStarred(!isStarred) //更新state
				message.success("修改成功!")
			},
		}
	)
	const nav = useNavigate() // 路由跳转

	//复制
	// function duplicate(id: string) {
	// 	message.success("复制成功!")
	// 	publishQuestion && publishQuestion(id)
	// }
	const { loading: duplicateLoading, run: duplicate } = useRequest(
		async () => await copyQuestions(_id),
		{
			manual: true,
			onSuccess: result => {
				message.success("复制成功!")
				nav(`/question/edit/${result.id}`)
			},
		}
	)
	//删除
	const [isDeletedState, setIsDeletedState] = useState(false)
	const { loading: deleteLoading, run: deleteQuestion } = useRequest(
		async () => await updateQuestions(_id, { isDeleted: true }),
		{
			manual: true,
			onSuccess: result => {
				message.success("删除成功!")
				setIsDeletedState(true)
			},
		}
	)
	function del() {
		confirm({
			title: "确认删除?",
			icon: <ExclamationCircleOutlined />,
			content: "你确定要删除该问卷吗？",
			onOk: deleteQuestion,
		})
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

	if (isDeletedState) return null // 已删除的问卷不显示
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<ASpace>
							{isStarred && <StarFilled style={{ color: "red" }} />}
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
						<AButton
							disabled={changeStarLoading}
							onClick={handleStar}
							type="text"
							size="small"
							icon={isStarred ? <StarFilled style={{ color: "red" }} /> : <StarOutlined />}
						>
							{isStarred ? "取消标星" : "标星"}
						</AButton>
						<APopconfirm
							title="确认复制？"
							onConfirm={() => duplicate()}
							cancelText="取消"
							okText="确认"
						>
							<AButton disabled={duplicateLoading} type="text" size="small" icon={<CopyOutlined />}>
								复制
							</AButton>
						</APopconfirm>

						<AButton
							disabled={deleteLoading}
							type="text"
							size="small"
							icon={<DeleteOutlined />}
							onClick={() => del()}
						>
							删除
						</AButton>
					</ASpace>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
