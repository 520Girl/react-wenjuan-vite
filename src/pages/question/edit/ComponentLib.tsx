import React, { FC } from "react"
import { nanoid } from "nanoid"
import { useDispatch } from "react-redux"
import { componentGroup } from "@/components/QuestionComponents"
import { ComponentsConfType } from "@/components/QuestionComponents"
import { addComponent } from "@/store/componentsReducer"
import styles from "./ComponentLib.module.scss"
const { Title } = ATypography

//! 1.需要显示所有的分类组件
function GetComponent(component: ComponentsConfType) {
	const { title, type, Component, defaultProps } = component
	const dispatch = useDispatch()

	//!2.点击组件插入画布中，当前选中的画布的后一项
	const handleClick = () => {
		dispatch(
			addComponent({
				fe_id: nanoid(),
				type,
				title,
				props: defaultProps,
			})
		)
	}
	return (
		<div key={type} className={styles.wrapper} onClick={handleClick}>
			<div className={styles.component}>
				<Component />
			</div>
		</div>
	)
}

const ComponentLib: FC = () => {
	return (
		<>
			{componentGroup.map((group, index) => {
				const { groupId, groupName, components } = group

				return (
					<div key={groupId}>
						<Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : 0 }}>
							{groupName}
						</Title>
						<div>{components.map(c => GetComponent(c))}</div>
					</div>
				)
			})}
		</>
	)
}

export default ComponentLib
