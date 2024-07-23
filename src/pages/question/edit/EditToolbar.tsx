import React, { FC } from "react"
import { useDispatch } from "react-redux"
import {
	DeleteOutlined,
	EyeOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
} from "@ant-design/icons"
import {
	removeSelectedComponent,
	toggleComponentLock,
	changeComponentHidden,
	copySelectedComponent,
	pasteCopiedComponent,
} from "@/store/componentsReducer"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress"

const EditToolbar: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, copiedComponent } = useGetComponentsInfo()
	const { isLocked } = selectedComponent || {}

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
		</ASpace>
	)
}

export default EditToolbar
