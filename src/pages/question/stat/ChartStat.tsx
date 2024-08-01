import { FC } from "react"
import { getComponentStat } from "@/services/stat"
// import BarChartStat from "./BarChartStatDome"
import { getComponentConfByType } from "@/components/QuestionComponents"

type PropsType = {
	selectedComponentType: string
	selectedComponentId: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
	const { selectedComponentType, selectedComponentId } = props
	const { id = "" } = useParams()
	const [statData, setStatData] = useState<Array<any>>([])

	const { run } = useRequest(
		async (questionId, componentId) => await getComponentStat(questionId, componentId),
		{
			manual: true,
			onSuccess: data => {
				setStatData(data.stat)
			},
		}
	)

	//监听id
	useEffect(() => {
		if (selectedComponentId) run(id, selectedComponentId)
	}, [id, selectedComponentId, run])

	//生成统计组件
	function getStatElem() {
		if (!selectedComponentId) return <div>请选择组件</div>
		const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
		if (!StatComponent) return <div>该组件无统计组件</div>
		return <StatComponent stat={statData} />
	}

	return (
		<>
			<ATypography.Title level={4}>图标统计</ATypography.Title>
			<div>{getStatElem()}</div>
		</>
	)
}

export default ChartStat
