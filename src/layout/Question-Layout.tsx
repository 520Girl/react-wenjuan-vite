import React from "react"
import { Outlet } from "react-router-dom"
import useLoadUserData from "@/hooks/useLoadUserData"
import useNavPage from "@/hooks/useNavPage"
import styles from "./QuestionLayout.module.scss"

const QuestionLayout: React.FC = () => {
	// 加载用户信息
	const { waitUserData } = useLoadUserData()
	// 用户没有登录时 跳转到登录页
	useNavPage(waitUserData)
	return (
		<div style={{ height: "100vh" }}>
			{waitUserData ? (
				<div style={{ marginTop: "100px", textAlign: "center" }}>
					<ASpin />
				</div>
			) : (
				<Outlet />
			)}
		</div>
	)
}
export default QuestionLayout
