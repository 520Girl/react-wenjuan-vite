import Component from "./Component"
import { QuestionTitleDefaultProps } from "./interface"

//将interface 中的内容全部输出
export * from "./interface"

export default {
	title: "标题",
	type: "questionTitle", //和后端一致
	Component,
	defaultProps: QuestionTitleDefaultProps,
}
