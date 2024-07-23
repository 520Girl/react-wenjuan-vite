import React, { FC } from "react"
import { QuestionTextareaProps } from "./interface"

const PropComponent: FC = (props: QuestionTextareaProps) => {
	const { title, placeholder, onChange, disabled } = props

	//监听title,placeHolder 变化
	const [form] = AForm.useForm()
	useEffect(() => {
		form.setFieldsValue({ title, placeholder })
	}, [title, placeholder, form])

	// 当属性值改变的时候
	const handleChange = (changedValues: any, allValues: QuestionTextareaProps) => {
		if (onChange) {
			onChange(allValues)
		}
	}

	return (
		<AForm
			layout="vertical"
			initialValues={{ title, placeholder }}
			form={form}
			disabled={disabled}
			onValuesChange={(changedValues, allValues) => handleChange(changedValues, allValues)}
		>
			<AForm.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]}>
				<AInput />
			</AForm.Item>
			<AForm.Item name="placeholder" label="placeholder">
				<AInput />
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
