import Component from "./Component"
import { QuestionTextareaDefaultProps } from "./interface"
import PropComponent from "./PropComponent" //属性组件
//将interface 中的内容全部输出
export * from "./interface"

export default {
	title: "多行输入框",
	type: "questionTextarea", //和后端一致
	Component, //画布显示的组件
	PropComponent, //属性面板显示的组件
	defaultProps: QuestionTextareaDefaultProps,
}
