import { useSelector } from "react-redux"
import { StateType } from "@/store"

function useGetComponentsInfo() {
	const componentsInfo = useSelector((state: StateType) => state.components.present)
	const { componentList = [], selectedId = "", copiedComponent } = componentsInfo

	//获取 属性面板的组件列表、选中组件的id、选中组件的属性信息
	const selectedComponent = componentList.find(component => component.fe_id === selectedId)
	return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentsInfo
