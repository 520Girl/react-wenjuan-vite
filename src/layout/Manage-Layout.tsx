import React from "react"
import { Outlet } from "react-router-dom"
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons"
import styles from "./ManageLayout.module.scss"

const ManageLayout: React.FC = () => {
	const nav = useNavigate()
	const { pathname } = useLocation()
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<ASpace direction="vertical">
					<AButton type="primary" size="large" icon={<PlusOutlined />}>
						创建问卷
					</AButton>
					<ADivider />
					<AButton
						onClick={() => nav("/manage/list")}
						type={pathname === "/manage/list" ? "default" : "text"}
						size="large"
						icon={<BarsOutlined />}
					>
						我的问卷
					</AButton>
					<AButton
						onClick={() => nav("/manage/star")}
						type={pathname === "/manage/star" ? "default" : "text"}
						size="large"
						icon={<DeleteOutlined />}
					>
						星标问卷
					</AButton>
					<AButton
						onClick={() => nav("/manage/trash")}
						type={pathname === "/manage/trash" ? "default" : "text"}
						size="large"
						icon={<StarOutlined />}
					>
						回收站
					</AButton>
				</ASpace>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	)
}
export default ManageLayout
