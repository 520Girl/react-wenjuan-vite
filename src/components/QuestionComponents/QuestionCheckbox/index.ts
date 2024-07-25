import Component from "./Component"
import PropComponent from "./PropComponent"
import StatComponent from "./StatComponent"
import { QuestionCheckboxDefaultProps } from "./interface"

export * from "./interface"

export default {
	title: "多选",
	type: "questionCheckbox",
	Component, //canvas 编辑答卷页面需要的
	PropComponent, //这个是 编辑页面的属性
	StatComponent, //统计页面的 统计表
	defaultProps: QuestionCheckboxDefaultProps,
}
