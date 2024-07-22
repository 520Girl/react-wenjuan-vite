import React, { FC } from "react"
import { QuestionInputProps } from "./interface"

const PropComponent: FC = (props: QuestionInputProps) => {
	const { title, placeholder, onChange } = props

	//监听title,placeHolder 变化
	const [form] = AForm.useForm()
	useEffect(() => {
		form.setFieldsValue({ title, placeholder })
	}, [title, placeholder, form])

	// 当属性值改变的时候
	const handleChange = (changedValues: any, allValues: QuestionInputProps) => {
		if (onChange) {
			onChange(allValues)
		}
	}
	return (
		<AForm
			layout="vertical"
			initialValues={{ title, placeholder }}
			form={form}
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
