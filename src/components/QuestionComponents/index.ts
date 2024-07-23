import type { FC } from "react"
import QuestionInputConf, { QuestionInputProps } from "./QuestionInput"
import QuestionTitleConf, { QuestionTitleProps } from "./QuestionTitle"
import QuestionParagraphConf, { QuestionParagraphProps } from "./QuestionParagraph"
import QuestionInfoConf, { QuestionInfoProps } from "./QuestionInfo"
import QuestionTextareaConf, { QuestionTextareaProps } from "./QuestionTextarea"
import QuestionRadioConf, { QuestionRadioProps } from "./QuestionRadio"
import QuestionCheckboxConf, { QuestionCheckboxProps } from "./QuestionCheckbox"

//各个组件的 Props配置
export type ComponentsPropsType =
	| QuestionInputProps
	| QuestionTitleProps
	| QuestionParagraphProps
	| QuestionInfoProps
	| QuestionTextareaProps
	| QuestionRadioProps
	| QuestionCheckboxProps

//各个组件的 的配置
export type ComponentsConfType = {
	title: string
	type: string
	Component: FC<ComponentsPropsType>
	PropComponent: FC<ComponentsPropsType>
	defaultProps: Partial<ComponentsPropsType>
}

//所有组件的配置
const componentConfList: ComponentsConfType[] = [
	QuestionInputConf,
	QuestionTitleConf,
	QuestionParagraphConf,
	QuestionInfoConf,
	QuestionTextareaConf,
	QuestionRadioConf,
	QuestionCheckboxConf,
]

// 将组件进行分类显示到组件库标签中
export const componentGroup = [
	{
		groupId: "textGroup",
		groupName: "文本显示",
		components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
	},
	{
		groupId: "inputGroup",
		groupName: "用户输入",
		components: [QuestionInputConf, QuestionTextareaConf],
	},
	{
		groupId: "chooseGroup",
		groupName: "用户选择",
		components: [QuestionRadioConf, QuestionCheckboxConf],
	},
]

// 通过类型获取组件
export const getComponentConfByType = (type: string) => {
	return componentConfList.find(item => item.type === type)
}
