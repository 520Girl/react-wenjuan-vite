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

		//点击组件库 添加新组件
		addComponent: produce(
			(draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
				const newComponent = action.payload
				// 添加到选中的下一个位置
				const { selectedId, componentList } = draft
				const index = componentList.findIndex(item => item.fe_id === selectedId)
				if (index === -1) {
					draft.componentList.push(newComponent)
				} else {
					draft.componentList.splice(index + 1, 0, newComponent)
				}
				draft.selectedId = newComponent.fe_id
			}
		),

		//修改组件属性
		updateComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentsPropsType }>
			) => {
				const { fe_id, newProps } = action.payload
				//修改组件
				const cusComponent = draft.componentList.find(item => item.fe_id === fe_id)
				if (cusComponent) {
					cusComponent.props = { ...cusComponent.props, ...newProps }
				}
			}
		),
	},
})

export const { resetComponents, changeSelectedId, addComponent, updateComponent } =
	componentsSlice.actions

export default componentsSlice.reducer
