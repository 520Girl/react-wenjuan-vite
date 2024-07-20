import useGetUserInfo from "./useGetUserInfo"
import { getPersonalInfo } from "@/services/user"
import { useDispatch } from "react-redux"
import { setUserInfo } from "@/store/user"
function useLoadUserData() {
	const [waitUserData, setWaitUserData] = useState(true) //等待加载用户信息
	const dispatch = useDispatch()

	//获取ajax 数据
	const { run } = useRequest(getPersonalInfo, {
		manual: true,
		onSuccess: result => {
			const { username, nickname } = result
			//设置到 redux
			dispatch(setUserInfo({ username, nickname }))
		},
		onFinally: () => {
			setWaitUserData(false)
		},
	})

	//判断redux 中是否有用户信息
	const { username } = useGetUserInfo()
	useEffect(() => {
		if (username) {
			setWaitUserData(false)
			return
		}
		run()
	}, [username, run])

	return { waitUserData }
}

export default useLoadUserData
