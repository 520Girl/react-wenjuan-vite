import React from "react"
import type { FC } from "react"
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData"
import ListSearch from "@/components/ListSearch"
import QuestionCard from "@/components/QuestionCard"
import styles from "./common.module.scss"

const { Title } = ATypography

const Star: FC = () => {
	useTitle("我的-星标问卷")
	//文件列表数据
	const { loading, error, data } = useLoadQuestionListData({ isStar: true })
	const { list = [], total = 0 } = data || {}
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
				{loading && (
					<div style={{ textAlign: "center" }}>
						<ASpin />
					</div>
				)}
				{!loading && list.length === 0 && <AEmpty description="暂无数据" />}
				{!loading &&
					list.length > 0 &&
					list.map((question: any) => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Star
