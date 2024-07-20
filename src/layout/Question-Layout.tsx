import React from "react"
import { Outlet } from "react-router-dom"
import useLoadUserData from "@/hooks/useLoadUserData"
import useNavPage from "@/hooks/useNavPage"
import styles from "./QuestionLayout.module.scss"

const QuestionLayout: React.FC = () => {
	const { waitUserData } = useLoadUserData()
	useNavPage(waitUserData)
	return (
		<>
			<div>header</div>
			<div>
				container
				{waitUserData ? (
					<div style={{ marginTop: "100px", textAlign: "center" }}>
						<ASpin />
					</div>
				) : (
					<Outlet />
				)}
			</div>
		</>
	)
}
export default QuestionLayout
