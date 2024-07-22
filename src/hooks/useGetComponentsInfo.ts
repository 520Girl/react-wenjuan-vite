import { useSelector } from "react-redux"
import { StateType } from "@/store"

function useGetComponentsInfo() {
	const componentsInfo = useSelector((state: StateType) => state.components)
	const { componentList = [], selectedId = "" } = componentsInfo
	return { componentList, selectedId }
}

export default useGetComponentsInfo
