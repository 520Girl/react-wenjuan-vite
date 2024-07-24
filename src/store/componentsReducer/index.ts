import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"
import cloneDeep from "lodash.clonedeep"
import { nanoid } from "nanoid"
import { arrayMove } from "@dnd-kit/sortable"
import { ComponentsPropsType } from "@/components/QuestionComponents"
import { getNextSelectedId, insertNewComponent } from "@/store/componentsReducer/utils"
export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	isHidden?: boolean
	isLocked?: boolean
	props: ComponentsPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: ComponentInfoType[]
	copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
	selectedId: "",
	componentList: [],
	copiedComponent: null,
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
				insertNewComponent(draft, newComponent)
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
		//删除选中的组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId: removeId, componentList } = draft

			//重新计算id
			const newSelectedId = getNextSelectedId(removeId, componentList)
			draft.selectedId = newSelectedId
			//删除

			const index = componentList.findIndex(item => item.fe_id === removeId)
			componentList.splice(index, 1)
		}),
		//隐藏/显示选中的组件
		changeComponentHidden: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
				const { fe_id, isHidden } = action.payload
				const { componentList } = draft
				const cusComponent = draft.componentList.find(item => item.fe_id === fe_id)

				//修改寻选中组件
				let newSelectedId = ""
				if (isHidden) {
					//隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList)
				} else {
					//显示
					newSelectedId = fe_id
				}
				draft.selectedId = newSelectedId

				if (cusComponent) {
					cusComponent.isHidden = isHidden
				}
			}
		),

		//锁定/解锁选中的组件
		toggleComponentLock: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
				const { fe_id } = action.payload
				const cusComponent = draft.componentList.find(item => item.fe_id === fe_id)

				if (cusComponent) {
					cusComponent.isLocked = !cusComponent.isLocked
				}
			}
		),

		//复制
		copySelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedC = componentList.find(item => item.fe_id === selectedId)
			if (selectedC == null) return
			draft.copiedComponent = cloneDeep(selectedC) //深拷贝
		}),
		//粘贴
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent, componentList } = draft
			if (copiedComponent == null) return

			//要修改id
			copiedComponent.fe_id = nanoid()
			//插入组件
			insertNewComponent(draft, copiedComponent)
		}),

		//选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const index = componentList.findIndex(item => item.fe_id === selectedId)
			if (index === 0) return //未选中组件
			if (index <= -1) return //选中第一个

			draft.selectedId = componentList[index - 1].fe_id
		}),
		//选中下一个
		selectNextComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const index = componentList.findIndex(item => item.fe_id === selectedId)

			if (index === 0) return //未选中组件
			if (index + 1 == componentList.length) return //选中最后一个

			draft.selectedId = componentList[index + 1].fe_id
		}),
		//修改标题
		changeComponentTitle: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
				const { fe_id, title } = action.payload //修改标题
				const cusComponent = draft.componentList.find(item => item.fe_id === fe_id)

				if (cusComponent) {
					cusComponent.title = title
				}
			}
		),
		//移动Compoent 用于拖拽时使用
		moveComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ newIndex: number; oldIndex: number }>
			) => {
				const { newIndex, oldIndex } = action.payload
				const { componentList } = draft

				draft.componentList = arrayMove(componentList, oldIndex, newIndex)
			}
		),
	},
})

export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	updateComponent,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
	changeComponentTitle,
	moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
