export type OptionType = {
	value: string
	text: string
	checked: boolean
}

export type QuestionCheckboxProps = {
	title?: string
	isVertical?: boolean
	list?: OptionType[]

	//用于PropComponent

	onChange?: (value: QuestionCheckboxProps) => void
	disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxProps = {
	title: "多选标题",
	isVertical: false,
	list: [
		{ value: "1", text: "选项1", checked: false },
		{ value: "2", text: "选项2", checked: false },
		{ value: "3", text: "选项3", checked: false },
	],
}
