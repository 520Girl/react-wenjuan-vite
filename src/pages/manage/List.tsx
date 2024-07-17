import type { FC } from "react"
import { produce } from "immer"
import { useTitle } from "ahooks"
import QuestionCard from "@/components/QuestionCard"
import ListSearch from "@/components/ListSearch"
import useMouse from "@/hooks/useMouse"
import styles from "./common.module.scss"

const { Title } = ATypography

const rawQuestionList = [
	{
		_id: "q1",
		title: "问卷1",
		isPublished: true,
		isStar: false,
		answerCount: 10,
		createdAt: "2022-01-01",
	},
	{
		_id: "q2",
		title: "问卷2",
		isPublished: false,
		isStar: true,
		answerCount: 20,
		createdAt: "2022-01-02",
	},
	{
		_id: "q3",
		title: "问卷3",
		isPublished: true,
		isStar: false,
		answerCount: 30,
		createdAt: "2022-01-03",
	},
	{
		_id: "q4",
		title: "问卷4",
		isPublished: false,
		isStar: true,
		answerCount: 40,
		createdAt: "2022-01-04",
	},
]

const List1: FC = () => {
	useTitle("我的-问卷列表")

	//鼠标移动
	const { x, y } = useMouse()

	//列表页

	//文件列表数据
	const [questionList, setQuestionList] = useState(rawQuestionList)

	function addList() {
		setQuestionList(
			produce(draft => {
				draft.push({
					_id: `q${questionList.length + 1}`,
					title: "新建问卷" + (questionList.length + 1),
					isPublished: false,
					isStar: false,
					answerCount: 0,
					createdAt: new Date().toLocaleDateString(),
				})
			})
		)
	}

	function deleteQuestion(id: string) {
		// setQuestionList(questionList.filter(question => question.id !== id))
		//! immer 方式
		setQuestionList(
			produce(draft => {
				const index = draft.findIndex(question => question._id === id)
				if (index !== -1) {
					draft.splice(index, 1)
				}
			})
		)
	}

	function publishQuestion(id: string) {
		// setQuestionList(questionList.map(question => {
		//     if(question.id === id){
		//         question.isPublished = true
		//     }
		//     return question
		// }))

		//! immer 方式
		setQuestionList(
			produce(draft => {
				const q = draft.find(question => question._id === id)
				if (q) q.isPublished = true
			})
		)
	}

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>
						我的问卷{x}，{y}
					</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{/* 文件列表数据 */}
				{questionList.length > 0 &&
					questionList.map(question => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>loaderMore ... 上划加载更多</div>
		</>
	)
}

export default List1
