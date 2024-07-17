import React from "react"
import type { FC } from "react"
import { UserOutlined } from "@ant-design/icons"
import { REGISTER_PATH } from "@/router/router"
import styles from "@/assets/styles/Login.module.scss"

const { Title } = ATypography

const USERNAME_KEY = "USERNAME"
const PASSWORD_KEY = "PASSWORD"

function rememberUser(username: string, password: string) {
	localStorage.setItem(USERNAME_KEY, username)
	localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
	localStorage.removeItem(USERNAME_KEY)
	localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
	return {
		username: localStorage.getItem(USERNAME_KEY),
		password: localStorage.getItem(PASSWORD_KEY),
	}
}
const Login: FC = () => {
	// 第三方提供的hook
	const [form] = AForm.useForm()
	useEffect(() => {
		const { username, password } = getUserInfoFromStorage()
		form.setFieldsValue({ username, password })
	})

	function onFinish(values: any) {
		const { username, password, remember } = values || {}
		if (remember) {
			rememberUser(username, password)
		} else {
			deleteUserFromStorage()
		}
	}
	return (
		<div className={styles.container}>
			<div>
				<ASpace>
					<Title level={2}>
						<UserOutlined />
					</Title>
					<Title level={2}>登录</Title>
				</ASpace>
			</div>
			<div>
				<AForm
					onFinish={values => onFinish(values)}
					style={{ width: "300px" }}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					form={form}
				>
					<AForm.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: "请输入用户名" }]}
					>
						<AInput placeholder="请输入用户名" />
					</AForm.Item>
					<AForm.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: "请输入密码" }]}
					>
						<AInput.Password placeholder="请输入用户名" />
					</AForm.Item>
					<AForm.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
						<ACheckbox>记住我</ACheckbox>
					</AForm.Item>
					<AForm.Item wrapperCol={{ offset: 6, span: 16 }}>
						<ASpace>
							<AButton type="primary" htmlType="submit">
								登录
							</AButton>
							<Link to={REGISTER_PATH}>注册新用户</Link>
						</ASpace>
					</AForm.Item>
				</AForm>
			</div>
		</div>
	)
}
export default Login
