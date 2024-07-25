import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import StatHeader from "./StatHeader"
import styles from "./index.module.scss"
import ComponentList from "./ComponentList"
import PageStat from "./PageStat"
import ChartStat from "./ChartStat"

const Index: React.FC = () => {
	const nav = useNavigate()
	const { loading } = useLoadQuestionData()
	const { title, isPublished } = useGetPageInfo()

	//! 通过状态提升来控制selectId  和 type 不需要使用redux 因为都是在同级页面使用
	const [selectedComponentId, setSelectedComponentId] = useState("")
	const [selectedComponentType, setSelectedComponentType] = useState("")

	//修改标题
	useTitle("问卷统计 " + title)
	//loading 效果
	const loadingElem = (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<ASpin></ASpin>
		</div>
	)

	//content Elem
	function getContentElem() {
		//判断是否发布isPublished
		if (typeof isPublished === "boolean" && !isPublished) {
			return (
				<div style={{ flex: "1" }}>
					<AResult
						status="warning"
						title="该页面尚未发布"
						extra={
							<AButton type="primary" onClick={() => nav(-1)}>
								返回上一页
							</AButton>
						}
					/>
				</div>
			)
		}
		return (
			<>
				<div className={styles.left}>
					<ComponentList
						selectedComponentId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedComponentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.main}>
					<PageStat
						selectedComponentId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedComponentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.right}>
					<ChartStat
						selectedComponentId={selectedComponentId}
						selectedComponentType={selectedComponentType}
					/>
				</div>
			</>
		)
	}
	return (
		<div className={styles.container}>
			<StatHeader />
			<div className={styles["content-wrapper"]}>
				{loading && loadingElem}
				{!loading && <div className={styles.content}>{getContentElem()}</div>}
			</div>
		</div>
	)
}
export default Index
