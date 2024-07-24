import { configureStore } from "@reduxjs/toolkit"
import userReducer, { UserState } from "./user"
import componentReducer, { ComponentsStateType } from "./componentsReducer"
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer"

export type StateType = {
	user: UserState
	components: ComponentsStateType
	pageInfo: PageInfoType
}

const store = configureStore({
	reducer: {
		// store.user
		user: userReducer,
		// 组件列表
		components: componentReducer,
		// 页面信息
		pageInfo: pageInfoReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
