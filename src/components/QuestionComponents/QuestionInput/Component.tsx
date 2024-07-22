import React, { FC } from "react"
import { QuestionInputProps, QuestionInputDefaultProps } from "./interface"
const { Paragraph } = ATypography

const QuestionInput: FC = (props: QuestionInputProps) => {
	const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
	return (
		<div>
			<Paragraph>{title}</Paragraph>
			<AInput placeholder={placeholder} />
		</div>
	)
}

export default QuestionInput
