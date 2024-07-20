import React from "react"

import { UserOutlined } from "@ant-design/icons"
import { message } from "antd"
import { TOKEN_KEY } from "@/constant"
import { LOGIN_PATH } from "@/router/router"
import { getLocation, removeLocation } from "@/utils"
import { getPersonalInfo } from "@/services/user"

const UseInfo = () => {
	const { data } = useRequest(getPersonalInfo)
	const nav = useNavigate()
	const token = getLocation(TOKEN_KEY)
	const { nickname, username } = data || {}

	const LoginOutlined = () => {
		message.success("退出成功")
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

	return <>{username && token ? Info : Login}</>
}

export default UseInfo
