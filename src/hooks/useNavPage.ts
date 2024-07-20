import useGetUseInfo from "@/hooks/useGetUserInfo"
import {
	isLoginOrRegisterPath,
	isNoNeedUserInfo,
	MANNAGE_INDEX_PATH,
	LOGIN_PATH,
} from "@/router/router"
function useNavPage(waitUserData: boolean) {
	const { pathname } = useLocation()
	const { username } = useGetUseInfo()
	const nav = useNavigate()

	useEffect(() => {
		if (waitUserData) return

		//登录状态
		if (username) {
			if (isLoginOrRegisterPath(pathname)) {
				nav(MANNAGE_INDEX_PATH)
			}
			return
		}

		//未登录状态
		if (isNoNeedUserInfo(pathname)) {
			return
		} else {
			nav(LOGIN_PATH)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, username, waitUserData])
}

export default useNavPage
