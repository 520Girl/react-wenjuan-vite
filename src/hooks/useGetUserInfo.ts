import { useSelector } from "react-redux"
import { StateType } from "@/store"
import { UserState } from "@/store/user"

//获取用户信息
function useGetUserInfo() {
	const { username, nickname } = useSelector<StateType>((state: any) => state.user) as UserState
	return { username, nickname }
}
export default useGetUserInfo
