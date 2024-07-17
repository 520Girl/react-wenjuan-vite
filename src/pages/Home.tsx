import type { FC } from "react"
import { MANNAGE_INDEX_PATH } from "@/router/router"
import styles from "@/assets/styles/Home.module.scss"
const { Title, Paragraph } = ATypography

const Home: FC = () => {
	const nav = useNavigate()
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Title>问卷调查 | 在线投票</Title>
				<Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
				<div>
					<AButton type="primary" onClick={() => nav(MANNAGE_INDEX_PATH)}>
						开始使用
					</AButton>
				</div>
			</div>
		</div>
	)
}

export default Home
