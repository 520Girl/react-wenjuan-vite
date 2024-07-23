import { useDispatch } from "react-redux"
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
	selectNextComponent,
	selectPrevComponent,
} from "@/store/componentsReducer"
/**
 * 监听键盘事件，绑定到画布上
 *
 * */

//判断光标是否在input 这种可focus 上
function isActiveElement() {
	const activeElement = document.activeElement
	if (activeElement == document.body) return true
	return false
}

export function useBindCanvasKeyPress() {
	const dispatch = useDispatch()

	//删除组件
	useKeyPress(["backspace", "delete"], () => {
		if (!isActiveElement()) return
		dispatch(removeSelectedComponent())
	})
	//复制组件
	useKeyPress(["ctrl+c", "meta+c"], () => {
		if (!isActiveElement()) return
		dispatch(copySelectedComponent())
	})
	//粘贴组件
	useKeyPress(["ctrl+v", "meta+v"], () => {
		if (!isActiveElement()) return
		dispatch(pasteCopiedComponent())
	})

	//选中上一个
	useKeyPress(["uparrow"], () => {
		if (!isActiveElement()) return
		dispatch(selectPrevComponent())
	})
	//选中下一个
	useKeyPress(["downarrow"], () => {
		if (!isActiveElement()) return
		dispatch(selectNextComponent())
	})
}

export default useBindCanvasKeyPress
