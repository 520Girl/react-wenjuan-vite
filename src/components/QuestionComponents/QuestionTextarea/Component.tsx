import React, { FC } from "react"
import { QuestionTextareaProps, QuestionTextareaDefaultProps } from "./interface"
const { Paragraph } = ATypography
const { TextArea } = AInput
const QuestionTextarea: FC = (props: QuestionTextareaProps) => {
	const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
	return (
		<div>
			<Paragraph>{title}</Paragraph>
			<TextArea placeholder={placeholder} />
		</div>
	)
}

export default QuestionTextarea
