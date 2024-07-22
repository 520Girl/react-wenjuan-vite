import React, { FC } from "react"
import { useDispatch } from "react-redux"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import { getComponentConfByType } from "@/components/QuestionComponents"
import { ComponentsPropsType } from "@/components/QuestionComponents"
import { updateComponent } from "@/store/componentsReducer"

const NoComponent = () => {
	return <div style={{ textAlign: "center" }}>未选中组件</div>
}

const ComponentProp: FC = () => {
	const dispatch = useDispatch()
	const { selectedComponent } = useGetComponentsInfo()
	//组件不存在
	if (selectedComponent == null) return <NoComponent />
	//组件存在 查询组件名称 以及组件配置
	const { type, props } = selectedComponent
	const componentConf = getComponentConfByType(type)
	if (!componentConf) return <NoComponent />
	const { PropComponent } = componentConf

	//修改组件中的内容
	function handleChangeProp(newProps: ComponentsPropsType) {
		if (selectedComponent == null) return null
		const { fe_id } = selectedComponent
		dispatch(updateComponent({ fe_id, newProps }))
	}
	return <PropComponent {...props} onChange={handleChangeProp} />
}

export default ComponentProp
