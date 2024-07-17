import React from "react"
import { FormOutlined } from "@ant-design/icons"
import styles from "@/assets/styles/Logo.module.scss"

const { Title } = ATypography
function Logo() {
	return (
		<div className={styles.container}>
			<Link to="#">
				<ASpace>
					<Title>
						<FormOutlined />
					</Title>
					<Title>小慕问卷</Title>
				</ASpace>
			</Link>
		</div>
	)
}

export default Logo
