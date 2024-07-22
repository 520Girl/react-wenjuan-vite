import React, { FC } from "react"
import type { TabsProps } from "antd"
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons"
import ComponentLib from "./ComponentLib"

const items: TabsProps["items"] = [
	{
		key: "componentLib",
		label: <span>组件库</span>,
		icon: <AppstoreOutlined />,
		children: <ComponentLib />,
	},
	{
		key: "layers",
		label: <span>图层</span>,
		icon: <BarsOutlined />,
		children: <div>图层</div>,
	},
]

const LeftPanel: FC = () => {
	return <ATabs defaultActiveKey="componentLib" items={items} />
}

export default LeftPanel
