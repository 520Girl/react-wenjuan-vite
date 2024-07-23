import React, { FC } from "react"
import { QuestionTitleProps } from "./interface"
import { Select } from "antd"
import Checkbox from "antd/es/checkbox/Checkbox"

const PropComponent: FC = (props: QuestionTitleProps) => {
	const { title, level, isCenter, onChange, disabled } = props

	//监听title,placeHolder 变化
	const [form] = AForm.useForm()
	useEffect(() => {
		form.setFieldsValue({ title, level, isCenter })
	}, [title, level, isCenter, form])

	// 当属性值改变的时候
	const handleChange = () => {
		if (onChange) {
			onChange(form.getFieldsValue())
		}
	}
	return (
		<AForm
			layout="vertical"
			initialValues={{ title, level, isCenter }}
			form={form}
			disabled={disabled}
			onValuesChange={handleChange}
		>
			<AForm.Item name="title" label="标题内容" rules={[{ required: true, message: "请输入标题" }]}>
				<AInput />
			</AForm.Item>
			<AForm.Item name="level" label="层级">
				<Select
					options={[
						{ value: 1, text: 1 },
						{ value: 2, text: 2 },
						{ value: 3, text: 3 },
					]}
				></Select>
			</AForm.Item>
			<AForm.Item name="isCenter" label="居中" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
