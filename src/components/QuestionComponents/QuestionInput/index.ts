import Component from "./Component"
import { QuestionInputDefaultProps } from "./interface"

//将interface 中的内容全部输出
export * from "./interface"

export default {
	title: "输入框",
	type: "questionInput", //和后端一致
	Component,
	defaultProps: QuestionInputDefaultProps,
}
