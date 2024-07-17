import { UserAddOutlined } from "@ant-design/icons"
import type { FC } from "react"
import { LOGIN_PATH } from "@/router/router"
import styles from "@/assets/styles/Register.module.scss"

const { Title } = ATypography

const Register: FC = () => {
	function onFinish(values: any) {
		console.log("Received values of form: ", values)
	}
	return (
		<div className={styles.container}>
			<div>
				<ASpace>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>注册新用户</Title>
				</ASpace>
			</div>
			<div>
				<AForm
					onFinish={values => onFinish(values)}
					style={{ width: "300px" }}
					initialValues={{ remember: true }}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<AForm.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: "请输入用户名" },
							{ type: "string", min: 5, max: 20, message: "用户名长度 5-20 之间" },
							{ pattern: /^\w+$/, message: "用户名只能包含字母和数字" },
						]}
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
					<AForm.Item
						label="确认密码"
						name="repassword"
						dependencies={["password"]} // 依赖于 password ，password 变化，会重新触发 validator
						rules={[
							{ required: true, message: "请再一次输入密码" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve()
									} else {
										return Promise.reject("两次输入的密码不一致!")
									}
								},
							}),
						]}
					>
						<AInput.Password placeholder="请再一次输入密码" />
					</AForm.Item>
					<AForm.Item
						label="昵称"
						name="nikename"
						rules={[{ required: true, message: "请输入昵称" }]}
					>
						<AInput placeholder="昵称" />
					</AForm.Item>

					<AForm.Item wrapperCol={{ offset: 6, span: 14 }}>
						<ASpace>
							<AButton type="primary" htmlType="submit">
								注册
							</AButton>
							<Link to={LOGIN_PATH}> 已有账号，登录</Link>
						</ASpace>
					</AForm.Item>
				</AForm>
			</div>
		</div>
	)
}

export default Register
