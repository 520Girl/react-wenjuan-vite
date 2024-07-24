import { useDispatch } from "react-redux"
import { ActionCreators as UndoActionCreators } from "redux-undo"
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

	//未使用dnd-kit 使用  document.activeElement 只会使得当前元素
	// if (activeElement == document.body) return true

	//使用了后
	if (activeElement == document.body) return true
	if (activeElement?.matches('div[role="button"]')) return true //当光标在该属性的元素下页返回true 也就是拖拽元素
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

	//撤销
	useKeyPress(
		["ctrl+z", "meta+z"],
		() => {
			if (!isActiveElement()) return
			dispatch(UndoActionCreators.undo())
		},
		{
			exactMatch: true, //严格模式，必须只按ctrl+z才触发，否则不会触发
		}
	)
	//重做
	useKeyPress(["ctrl+shift+z", "meta+shift+z"], () => {
		if (!isActiveElement()) return
		dispatch(UndoActionCreators.redo())
	})
}

export default useBindCanvasKeyPress
