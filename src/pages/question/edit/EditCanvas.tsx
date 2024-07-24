import { FC, MouseEvent } from "react"
import { useDispatch } from "react-redux"
import classnames from "classnames"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import { getComponentConfByType } from "@/components/QuestionComponents"
import { ComponentInfoType, changeSelectedId, moveComponent } from "@/store/componentsReducer"
//拖拽组件
import SortableContainer from "@/components/DragSortable/SortableContainer"
import SortableItem from "@/components/DragSortable/SortableItem"

import styles from "./EditCanvas.module.scss"

type EditCanvasProps = {
	loading: boolean
}

// 这里是用过后端请求的数据进行循环展示组件
function getComponent(componentInfo: ComponentInfoType) {
	const { type, props } = componentInfo
	const componentConf = getComponentConfByType(type)
	if (componentConf == null) return null
	const { Component } = componentConf
	return <Component {...props} />
}

const EditCanvas: FC<EditCanvasProps> = ({ loading }) => {
	// 获取redux 中的 组件信息
	const { componentList, selectedId } = useGetComponentsInfo()

	//点击选中组件
	const dispatch = useDispatch()
	function handleClickComponent(event: MouseEvent<HTMLDivElement>, id: string) {
		event?.stopPropagation() //阻止冒泡
		dispatch(changeSelectedId(id))
	}

	if (loading) {
		return (
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<ASpin></ASpin>
			</div>
		)
	}
	//拖拽组件需要id 属性,
	const componentListId = componentList.map(c => ({ ...c, id: c.fe_id }))

	//处理拖拽后的事件
	function handleDragEnd(newIndex: number, oldIndex: number) {
		dispatch(moveComponent({ newIndex, oldIndex }))
	}
	return (
		<SortableContainer items={componentListId} onDragEnd={handleDragEnd}>
			<div className={styles.canvas}>
				{componentList
					.filter(item => !item.isHidden)
					.map(item => {
						const { fe_id, isLocked } = item
						// 拼接classname
						const wrapperDefaultClassName = styles["component-wrapper"]
						const selectedClassName = styles.selected
						const lockedClass = styles.locked
						const wrapperClass = classnames({
							[wrapperDefaultClassName]: true,
							[lockedClass]: isLocked,
							[selectedClassName]: fe_id === selectedId, //fe_id === selectedId
						})
						return (
							<SortableItem key={fe_id} id={fe_id}>
								<div className={wrapperClass} onClick={e => handleClickComponent(e, fe_id)}>
									<div className={styles.component}>{getComponent(item)}</div>
								</div>
							</SortableItem>
						)
					})}
				{/* <div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>
			<div className={styles["component-wrapper"]}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div> */}
			</div>
		</SortableContainer>
	)
}

export default EditCanvas
