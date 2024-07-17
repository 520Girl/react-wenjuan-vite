import React from "react"
import type { FC } from "react"
import ListSearch from "@/components/ListSearch"

import QuestionCard from "@/components/QuestionCard"
import styles from "./common.module.scss"

const { Title } = ATypography
const rawQuestionList = [
	{
		_id: "q2",
		title: "问卷2",
		isPublished: false,
		isStar: true,
		answerCount: 20,
		createdAt: "2022-01-02",
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
const Star: FC = () => {
	useTitle("我的-星标问卷")
	//文件列表数据
	const [questionList, setQuestionList] = useState(rawQuestionList)
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 0 && <AEmpty description="暂无数据" />}
				{questionList.length > 0 &&
					questionList.map(question => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Star
