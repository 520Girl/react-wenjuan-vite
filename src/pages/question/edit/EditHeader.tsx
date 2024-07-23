import React, { FC } from "react"
import styles from "./EditHeader.module.scss"
import { LeftOutlined } from "@ant-design/icons"
import EditToolbar from "./EditToolbar"

const { Title } = ATypography

const EditHeader: FC = () => {
	const nav = useNavigate()
	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<ASpace>
						<AButton type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</AButton>
						<Title>问卷标题</Title>
					</ASpace>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<ASpace>
						<AButton>保存</AButton>
						<AButton type="primary">发布</AButton>
					</ASpace>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
