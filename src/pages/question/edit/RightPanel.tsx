import React, { FC } from "react"
import type { TabsProps } from "antd"
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import ComponentProp from "./ComponentProp"
import PageSetting from "./PageSetting"

//枚举
enum TabsKey {
	Prop_key = "prop",
	Setting_key = "setting",
}
const items: TabsProps["items"] = [
	{
		key: TabsKey.Prop_key,
		label: <span>属性</span>,
		icon: <FileTextOutlined />,
		children: <ComponentProp />,
	},
	{
		key: TabsKey.Setting_key,
		label: <span>页面设置</span>,
		icon: <SettingOutlined />,
		children: <PageSetting />,
	},
]

const RightPanel: FC = () => {
	const { selectedId } = useGetComponentsInfo()
	const [activeKey, setActiveKey] = useState<TabsKey>(TabsKey.Prop_key)

	useEffect(() => {
		if (selectedId) setActiveKey(TabsKey.Prop_key)
		else setActiveKey(TabsKey.Setting_key)
	}, [selectedId])

	return (
		<ATabs activeKey={activeKey} onTabClick={key => setActiveKey(key as TabsKey)} items={items} />
	)
}

export default RightPanel
