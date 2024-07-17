import useLoadQuestionData from "@/hooks/useLoadQuestionData"

export default function Index() {
	const { loading, questionData } = useLoadQuestionData()

	return (
		<div>
			{loading && <div>loading...</div>}
			{!loading && (
				<div>
					<h1>STAT Question</h1>
					<div>{JSON.stringify(questionData)}</div>
				</div>
			)}
		</div>
	)
}
