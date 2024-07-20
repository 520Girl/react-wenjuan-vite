import { configureStore } from "@reduxjs/toolkit"
import userReducer, { UserState } from "./user"

export type StateType = {
	user: UserState
}

const store = configureStore({
	reducer: {
		// store.user
		user: userReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
