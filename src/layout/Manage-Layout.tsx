import React from "react"
import { Outlet } from "react-router-dom"
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons"
import { message } from "antd"
import { createQuestions } from "@/services/question"
import styles from "./ManageLayout.module.scss"

const ManageLayout: React.FC = () => {
	const nav = useNavigate()
	const { pathname } = useLocation()
	// const [loading, setLoading] = useState(false)

	// //创建问卷
	// const handleCreate = async () => {
	// 	setLoading(true)
	// 	const data = await createQuestions()
	// 	const {id} = data || {}
	// 	if(id){
	// 		nav(`/question/edit/${id}`)
	// 		message.success('创建成功')
	// 	}
	// 	setLoading(false)
	// }
	const {
		loading,
		// error,
		run: handleCreate,
	} = useRequest(createQuestions, {
		manual: true,
		onSuccess: data => {
			const { id } = data || {}
			if (id) {
				nav(`/question/edit/${id}`)
				message.success("创建成功")
			}
		},
	})
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<ASpace direction="vertical">
					<AButton
						onClick={handleCreate}
						loading={loading}
						type="primary"
						size="large"
						icon={<PlusOutlined />}
					>
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
