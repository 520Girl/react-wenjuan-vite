import type { FC } from "react"
import QuestionInputConf, { QuestionInputProps } from "./QuestionInput"
import QuestionTitleConf, { QuestionTitleProps } from "./QuestionTitle"

//各个组件的props  和 title
export type ComponentsPropsType = QuestionInputProps | QuestionTitleProps

//各个组件的 的配置
export type ComponentsConfType = {
	title: string
	type: string
	Component: FC<ComponentsPropsType>
	defaultProps: Partial<ComponentsPropsType>
}

//所有组件的配置
const componentConfList: ComponentsConfType[] = [QuestionInputConf, QuestionTitleConf]

// 通过类型获取组件
export const getComponentConfByType = (type: string) => {
	return componentConfList.find(item => item.type === type)
}
