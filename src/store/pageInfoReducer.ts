import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"
export type PageInfoType = {
	title: string
	desc?: string
	js?: string
	css?: string
}

const INIT_STATE: PageInfoType = {
	title: "",
	desc: "",
	js: "",
	css: "",
}

const componentsSlice = createSlice({
	name: "pageInfo",
	initialState: INIT_STATE,
	reducers: {
		resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
			action.payload
		},
		//修改标题
		changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
			draft.title = action.payload
		}),
	},
})

export const { resetPageInfo, changePageTitle } = componentsSlice.actions

export default componentsSlice.reducer
