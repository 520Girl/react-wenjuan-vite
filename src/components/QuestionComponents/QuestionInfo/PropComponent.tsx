import React, { FC } from "react"
import { QuestionInfoProps } from "./interface"

const { TextArea } = AInput
const PropComponent: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
	const { title, desc, onChange, disabled } = props
	const [form] = AForm.useForm()

	useEffect(() => {
		form.setFieldsValue({ title, desc })
	}, [title, desc, form])

	function handleChange() {
		if (onChange) {
			onChange(form.getFieldsValue())
		}
	}

	return (
		<AForm layout="vertical" disabled={disabled} onValuesChange={handleChange} form={form}>
			<AForm.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
				<AInput />
			</AForm.Item>
			<AForm.Item label="描述" name="desc">
				<TextArea />
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
