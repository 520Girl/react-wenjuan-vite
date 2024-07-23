import React, { FC } from "react"
import { QuestionRadioDefaultProps, QuestionRadioProps } from "./interface"

const { Paragraph } = ATypography
const Component: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
	const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<ARadio.Group value={value}>
				<ASpace direction={isVertical ? "vertical" : "horizontal"}>
					{options.map(item => {
						const { value, text } = item
						return (
							<ARadio key={value} value={value}>
								{text}
							</ARadio>
						)
					})}
				</ASpace>
			</ARadio.Group>
		</div>
	)
}

export default Component
