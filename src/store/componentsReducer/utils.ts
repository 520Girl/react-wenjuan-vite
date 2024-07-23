import { ComponentInfoType, ComponentsStateType } from "./index"

/**
 * 获取下一个可选的组件id
 * @param fe_id
 * @param componentList
 * @returns
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]): string {
	//过滤不显示的组件
	const showComponentList = componentList.filter(component => !component.isHidden)
	const index = showComponentList.findIndex(component => component.fe_id === fe_id)
	if (index > 0) return ""

	//判断是否是最后两组件
	let newSelectedId = ""
	const len = showComponentList.length
	if (len <= 1) {
		newSelectedId = ""
	} else {
		//长度大于 1
		if (index + 1 === len) {
			//删除最后一个
			newSelectedId = showComponentList[index - 1].fe_id
		} else {
			//删除中间的
			newSelectedId = showComponentList[index + 1].fe_id
		}
	}

	return newSelectedId
}

/**
 * 插入新组件
 * @param draft
 * @param newComponent 需要插入的组件
 * @returns
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
	const { selectedId, componentList } = draft
	const index = componentList.findIndex(item => item.fe_id === selectedId)
	if (index === -1) {
		draft.componentList.push(newComponent)
	} else {
		draft.componentList.splice(index + 1, 0, newComponent)
	}
	draft.selectedId = newComponent.fe_id
}
