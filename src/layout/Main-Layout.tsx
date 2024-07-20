import React from "react"
import styles from "./MainLayout.module.scss"
import Logo from "@/components/Logo"
import UseInfo from "@/components/UseInfo"
import useLoadUserData from "@/hooks/useLoadUserData"
import useNavPage from "@/hooks/useNavPage"
const { Header, Footer, Content } = ALayout

const MainLayout: React.FC = () => {
	const { waitUserData } = useLoadUserData()
	useNavPage(waitUserData)
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
					{waitUserData ? (
						<div style={{ marginTop: "100px", textAlign: "center" }}>
							<ASpin />
						</div>
					) : (
						<Outlet />
					)}
				</Content>
			</ALayout>
			<Footer className={styles.footer}>Footer</Footer>
		</ALayout>
	)
}
export default MainLayout
