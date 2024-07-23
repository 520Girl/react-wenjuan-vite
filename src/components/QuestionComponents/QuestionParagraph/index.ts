import Component from "./Component"
import { QuestionParagraphDefaultProps } from "./interface"
import PropComponent from "./PropComponent"

//将interface 中的内容全部输出
export * from "./interface"

export default {
	title: "段落",
	type: "questionParagraph",
	Component,
	PropComponent,
	defaultProps: QuestionParagraphDefaultProps,
}
