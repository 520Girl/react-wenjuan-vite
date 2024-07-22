import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"
import { ComponentsPropsType } from "@/components/QuestionComponents"
export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	props: ComponentsPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = {
	selectedId: "",
	componentList: [],
}

const componentsSlice = createSlice({
	name: "components",
	initialState: INIT_STATE,
	reducers: {
		//重置所有组件
		resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
			return action.payload
		},
		//选中某个组件
		changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
			draft.selectedId = action.payload
		}),
	},
})

export const { resetComponents, changeSelectedId } = componentsSlice.actions

export default componentsSlice.reducer
