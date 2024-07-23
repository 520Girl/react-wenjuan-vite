export type QuestionInfoProps = {
	title?: string
	desc?: string

	//用于propComponent
	onChange?: (value: QuestionInfoProps) => void
	disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoProps = {
	title: "描述标题",
	desc: "这里是描述",
}
