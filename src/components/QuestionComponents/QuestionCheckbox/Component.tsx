import React, { FC } from "react"
import { QuestionCheckboxProps, QuestionCheckboxDefaultProps } from "./interface"

const { Paragraph } = ATypography
const Component: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
	const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<ASpace>
				{list.map((item, index) => {
					const { value, text, checked } = item
					return (
						<ACheckbox key={index} checked={checked} value={value}>
							{text}
						</ACheckbox>
					)
				})}
			</ASpace>
		</div>
	)
}

export default Component
