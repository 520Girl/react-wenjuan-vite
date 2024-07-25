import React, { FC } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { STAT_COLORS } from "@/constant"
import { QuestionRadioStatPropsType } from "./interface"

function format(num: number) {
	return (num * 100).toFixed(1)
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
	const sum = useMemo(() => {
		let s = 0
		stat.forEach(i => {
			s += i.count
		})
		return s
	}, [stat])

	return (
		<div style={{ width: "300px", height: "400px" }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={400} height={400}>
					<Pie
						dataKey="count" //数据中的value
						data={stat}
						cx="50%" // x 轴的偏移
						cy="50%"
						outerRadius={50} // 饼图的直径
						fill="#8884d8"
						label={i => `${i.name}: ${format(i.count / sum)}%`}
					>
						{stat.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]} />
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
