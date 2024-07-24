//传入Props类型
export type QuestionParagraphProps = {
	text?: string
	title?: string
	isCenter?: boolean
	onChange?: (value: QuestionParagraphProps) => void
	disabled?: boolean
}

export const QuestionParagraphDefaultProps = {
	text: "一个段落",
	isCenter: false,
}
