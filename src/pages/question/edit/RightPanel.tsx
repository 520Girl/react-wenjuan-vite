import React, { FC } from "react"
import type { TabsProps } from "antd"
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons"
import ComponentProp from "./ComponentProp"

const items: TabsProps["items"] = [
	{
		key: "prop",
		label: <span>属性</span>,
		icon: <FileTextOutlined />,
		children: <ComponentProp />,
	},
	{
		key: "setting",
		label: <span>页面设置</span>,
		icon: <SettingOutlined />,
		children: <div>页面设置</div>,
	},
]

const RightPanel: FC = () => {
	return <ATabs defaultActiveKey="componentLib" items={items} />
}

export default RightPanel
