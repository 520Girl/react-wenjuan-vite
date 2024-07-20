// 用户的状态管理
import { LoginOutlined } from "@ant-design/icons"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UserState = {
	username: string
	nickname: string
}

const INIT_STATE: UserState = { username: "", nickname: "" }

const userSlice = createSlice({
	name: "user", //dispatch 中使用的
	initialState: INIT_STATE,
	reducers: {
		setUserInfo(state: UserState, action: PayloadAction<UserState>) {
			const { username, nickname } = action.payload
			return { ...state, username, nickname }
		},
		loginOutlined: () => INIT_STATE,
	},
})

export const { setUserInfo, loginOutlined } = userSlice.actions

export default userSlice.reducer
