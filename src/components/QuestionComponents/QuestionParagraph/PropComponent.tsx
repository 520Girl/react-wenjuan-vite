import React, { FC } from "react"
import { QuestionParagraphProps } from "./interface"

const { TextArea } = AInput
const PropComponent: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
	const { text, isCenter, onChange, disabled } = props

	const [form] = AForm.useForm()

	useEffect(() => {
		form.setFieldsValue({ text, isCenter })
	}, [text, isCenter, form])

	function handleChange() {
		if (onChange) {
			onChange(form.getFieldsValue())
		}
	}

	return (
		<AForm layout="vertical" disabled={disabled} onValuesChange={handleChange} form={form}>
			<AForm.Item label="段落内容" name="text" rules={[{ required: true, message: "请输入内容" }]}>
				<TextArea />
			</AForm.Item>
			<AForm.Item name="isCenter" valuePropName="checked">
				<ACheckbox>居中显示</ACheckbox>
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
