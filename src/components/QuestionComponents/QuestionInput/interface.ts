export type QuestionInputProps = {
	title?: string
	placeholder?: string
	onChange?: (value: QuestionInputProps) => void
	disabled?: boolean
}

//默认参数
export const QuestionInputDefaultProps: QuestionInputProps = {
	title: "标题",
	placeholder: "请输入内容",
}
