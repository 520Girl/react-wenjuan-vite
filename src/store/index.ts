import { configureStore } from "@reduxjs/toolkit"
import userReducer, { UserState } from "./user"
import undoable, { excludeAction, StateWithHistory } from "redux-undo"
import componentReducer, { ComponentsStateType } from "./componentsReducer"
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer"

export type StateType = {
	user: UserState
	//! 未使用undo
	// components: ComponentsStateType
	// 使用undo
	components: StateWithHistory<ComponentsStateType>
	pageInfo: PageInfoType
}

const store = configureStore({
	reducer: {
		// store.user
		user: userReducer,
		//! 未使用undo 组件列表
		// components: componentReducer,
		//! 使用undo
		components: undoable(componentReducer, {
			filter: excludeAction([
				"components/resetComponents",
				"components/changeSelectedId",
				"components/selectNextComponent",
				"components/selectPrevComponent",
			]),
			limit: 20, // 最大记录数
			debug: true,
		}),
		// 页面信息
		pageInfo: pageInfoReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
