import { configureStore } from "@reduxjs/toolkit"
import userReducer, { UserState } from "./user"
import componentReducer, { ComponentsStateType } from "./componentsReducer"

export type StateType = {
	user: UserState
	components: ComponentsStateType
}

const store = configureStore({
	reducer: {
		// store.user
		user: userReducer,
		// 组件列表
		components: componentReducer,
		// 问卷信息
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
