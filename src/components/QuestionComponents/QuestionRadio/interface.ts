export type OptionType = {
	value: string
	text: string
}

export type QuestionRadioProps = {
	title?: string
	isVertical?: boolean
	options?: OptionType[]
	value?: string

	//propComponents
	onChange?: (newProps: QuestionRadioProps) => void
	disabled?: boolean
}

export const QuestionRadioDefaultProps = {
	title: "单选标题",
	isVertical: false,
	options: [
		{ value: "1", text: "选项1" },
		{ value: "2", text: "选项2" },
		{ value: "3", text: "选项3" },
	],
	value: "",
}
