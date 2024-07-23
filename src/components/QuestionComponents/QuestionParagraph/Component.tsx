import React, { FC } from "react"
import { QuestionParagraphProps, QuestionParagraphDefaultProps } from "./interface"
const { Paragraph } = ATypography
const Component: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
	const { text = "", isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

	//换行转换 插入文本
	const textList = text.split("\n")

	return (
		<Paragraph style={{ textAlign: isCenter ? "center" : "left", marginBottom: 0 }}>
			{textList.map((item, index) => (
				<span key={index}>
					{index > 0 && <br />}
					{item}
				</span>
			))}
		</Paragraph>
	)
}

export default Component
