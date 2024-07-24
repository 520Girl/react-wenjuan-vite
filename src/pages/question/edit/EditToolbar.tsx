import React, { FC } from "react"
import { useDispatch } from "react-redux"
import {
	DeleteOutlined,
	EyeOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
	UpOutlined,
	DownOutlined,
} from "@ant-design/icons"
import {
	removeSelectedComponent,
	toggleComponentLock,
	changeComponentHidden,
	copySelectedComponent,
	pasteCopiedComponent,
	moveComponent,
} from "@/store/componentsReducer"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress"

const EditToolbar: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentsInfo()
	const { isLocked } = selectedComponent || {}
	//判断是否是最后一个组件 还是 第一个组件
	const leng = componentList.length
	const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
	const isFirst = selectedIndex <= 0
	const isLast = selectedIndex + 1 === leng

	//按键控制
	useBindCanvasKeyPress()

	//删除
	function handleDeleted() {
		dispatch(removeSelectedComponent())
	}

	//隐藏
	function handleHidden() {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}
	//锁定
	function handleLocked() {
		dispatch(toggleComponentLock({ fe_id: selectedId }))
	}

	//复制
	function handleCopy() {
		dispatch(copySelectedComponent())
	}
	//粘贴
	function handlePaste() {
		dispatch(pasteCopiedComponent())
	}

	//TODO 上移、下移、撤销、重做
	function moveUp() {
		if (isFirst) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
	}
	function moveDown() {
		if (isLast) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
	}

	return (
		<ASpace>
			<ATooltip title="删除">
				<AButton shape="circle" icon={<DeleteOutlined />} onClick={handleDeleted}></AButton>
			</ATooltip>
			<ATooltip title="隐藏">
				<AButton shape="circle" icon={<EyeOutlined />} onClick={handleHidden}></AButton>
			</ATooltip>
			<ATooltip title="锁定">
				<AButton
					shape="circle"
					type={isLocked ? "primary" : "default"}
					icon={<LockOutlined />}
					onClick={handleLocked}
				></AButton>
			</ATooltip>
			<ATooltip title="复制">
				<AButton shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></AButton>
			</ATooltip>
			<ATooltip title="粘贴">
				<AButton
					shape="circle"
					style={{ color: copiedComponent ? "#52c41a" : "#bfbfbf" }}
					disabled={!copiedComponent}
					icon={<BlockOutlined />}
					onClick={handlePaste}
				></AButton>
			</ATooltip>
			<ATooltip title="上移">
				<AButton
					shape="circle"
					style={{ color: isLast ? "" : "#bfbfbf" }}
					disabled={isFirst}
					icon={<UpOutlined />}
					onClick={moveUp}
				></AButton>
			</ATooltip>
			<ATooltip title="上移">
				<AButton
					shape="circle"
					style={{ color: isFirst ? "" : "#bfbfbf" }}
					disabled={isLast}
					icon={<DownOutlined />}
					onClick={moveDown}
				></AButton>
			</ATooltip>
		</ASpace>
	)
}

export default EditToolbar
