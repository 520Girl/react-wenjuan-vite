import React from "react"
import { Outlet } from "react-router-dom"
import styles from "./QuestionLayout.module.scss"

const QuestionLayout: React.FC = () => {
	return (
		<>
			<div>header</div>
			<div>
				container
				<Outlet />
			</div>
		</>
	)
}
export default QuestionLayout
