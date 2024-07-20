import React from "react"

import { UserOutlined } from "@ant-design/icons"
import { message } from "antd"
import { useDispatch } from "react-redux"
import { loginOutlined } from "@/store/user"
import { TOKEN_KEY } from "@/constant"
import { LOGIN_PATH } from "@/router/router"
import { removeLocation } from "@/utils"
import useGetUserInfo from "@/hooks/useGetUserInfo"

const UseInfo = () => {
	const data = useGetUserInfo() //获取用户信息
	const dispatch = useDispatch()
	const nav = useNavigate()
	const { nickname, username } = data || {}

	const LoginOutlined = () => {
		message.success("退出成功")
		dispatch(loginOutlined()) // 清空redux store user信息
		removeLocation(TOKEN_KEY)
		nav(LOGIN_PATH)
	}

	const Info = (
		<>
			<div style={{ color: "white", fontSize: "18px" }}>
				<UserOutlined />
				{nickname}
				<AButton type="link" onClick={() => LoginOutlined()}>
					退出
				</AButton>
			</div>
		</>
	)
	const Login = <Link to={LOGIN_PATH}>登录</Link>

	return <>{username ? Info : Login}</>
}

export default UseInfo
