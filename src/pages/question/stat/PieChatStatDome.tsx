import React from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { STAT_COLORS } from "@/constant"

const data01 = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 },
	{ name: "Group E", value: 278 },
	{ name: "Group F", value: 189 },
]
const pieChatStatDome: React.FC = () => {
	return (
		<div style={{ width: "400px", height: "300px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={400} height={400}>
					<Pie
						dataKey="value" //数据中的value
						isAnimationActive={false}
						data={data01}
						cx="50%" // x 轴的偏移
						cy="50%"
						outerRadius={80} // 饼图的直径
						fill="#8884d8"
						label={i => `${i.name}: ${i.value}`}
					>
						{data01.map((i, index) => {
							return <Cell key={i.name} fill={STAT_COLORS[index]} />
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default pieChatStatDome
