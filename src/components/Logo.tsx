import { FormOutlined } from "@ant-design/icons"
import styles from "@/assets/styles/Logo.module.scss"
import useGetUserInfo from "@/hooks/useGetUserInfo"
import { LOGIN_PATH, MANNAGE_INDEX_PATH, DASHBOARD_PATH } from "@/router/router"
const { Title } = ATypography
function Logo() {
	const { username } = useGetUserInfo()
	const [navState, setNavState] = useState(DASHBOARD_PATH)

	//如果登录跳转到问卷列表页，否则跳转到登录页
	useEffect(() => {
		if (username) {
			setNavState(MANNAGE_INDEX_PATH)
			return
		}
		setNavState(LOGIN_PATH)
	}, [username])
	return (
		<div className={styles.container}>
			<Link to={navState}>
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
