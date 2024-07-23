export type QuestionTitleProps = {
	title?: string
	level?: 1 | 2 | 3 | 4 | 5
	isCenter?: boolean
	onChange?: (value: QuestionTitleProps) => void //当属性值发生变化时触发的回调函数
	disabled?: boolean //是否禁用
}

export const QuestionTitleDefaultProps: QuestionTitleProps = {
	title: "一行标题",
	level: 1,
	isCenter: false,
}
