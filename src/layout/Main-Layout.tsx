import React from "react"
import styles from "./MainLayout.module.scss"
import Logo from "@/components/Logo"
import UseInfo from "@/components/UseInfo"
const { Header, Footer, Content } = ALayout

const MainLayout: React.FC = () => {
	return (
		<ALayout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UseInfo />
				</div>
			</Header>
			<ALayout>
				<Content className={styles.main}>
					<Outlet />
				</Content>
			</ALayout>
			<Footer className={styles.footer}>Footer</Footer>
		</ALayout>
	)
}
export default MainLayout
