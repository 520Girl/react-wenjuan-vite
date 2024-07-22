import type { FC } from "react"
import QuestionInputConf, { QuestionInputProps } from "./QuestionInput"
import QuestionTitleConf, { QuestionTitleProps } from "./QuestionTitle"

//各个组件的 Props配置
export type ComponentsPropsType = QuestionInputProps | QuestionTitleProps

//各个组件的 的配置
export type ComponentsConfType = {
	title: string
	type: string
	Component: FC<ComponentsPropsType>
	PropComponent: FC<ComponentsPropsType>
	defaultProps: Partial<ComponentsPropsType>
}

//所有组件的配置
const componentConfList: ComponentsConfType[] = [QuestionInputConf, QuestionTitleConf]

// 将组件进行分类显示到组件库标签中
export const componentGroup = [
	{
		groupId: "text",
		groupName: "文本显示",
		components: [QuestionTitleConf],
	},
	{
		groupId: "input",
		groupName: "用户输入",
		components: [QuestionInputConf],
	},
]

// 通过类型获取组件
export const getComponentConfByType = (type: string) => {
	return componentConfList.find(item => item.type === type)
}
