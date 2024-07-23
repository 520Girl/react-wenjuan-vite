import React, { FC } from "react"
import { QuestionInfoDefaultProps, QuestionInfoProps } from "./interface"

const { Title, Paragraph } = ATypography
const Component: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
	const { title = "", desc = "" } = { ...QuestionInfoDefaultProps, ...props }

	//拆分换行
	const descTextList = desc.split("\n")
	return (
		<div>
			<Title style={{ fontSize: "24px", textAlign: "center" }}>{title}</Title>
			<Paragraph style={{ textAlign: "center" }}>
				{descTextList.map((item, index) => (
					<span key={index}>
						{index > 0 && <br />}
						{item}
					</span>
				))}
			</Paragraph>
		</div>
	)
}

export default Component
