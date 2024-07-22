import React, { FC } from "react"
import { QuestionTitleProps, QuestionTitleDefaultProps } from "./interface"
const { Title } = ATypography

const QuestionTitle: FC = (props: QuestionTitleProps) => {
	const { text = "", level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
	//字体大小
	const getFontSize = (level: number) => {
		if (level === 1) return "24px"
		if (level === 2) return "20px"
		if (level === 3) return "16px"
	}
	return (
		<div>
			<Title
				level={level}
				style={{
					textAlign: isCenter ? "center" : "left",
					marginBottom: 0,
					fontSize: getFontSize(level),
				}}
			>
				{text}
			</Title>
		</div>
	)
}

export default QuestionTitle
