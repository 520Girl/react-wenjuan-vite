export type QuestionTextareaProps = {
	title?: string
	placeholder?: string
	onChange?: (value: QuestionTextareaProps) => void
	disabled?: boolean
}

//默认参数
export const QuestionTextareaDefaultProps: QuestionTextareaProps = {
	title: "标题",
	placeholder: "请输入多行内容",
}
