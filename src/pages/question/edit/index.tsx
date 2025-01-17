import { useDispatch } from "react-redux"
import { changeSelectedId } from "@/store/componentsReducer"
import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import EditCanvas from "./EditCanvas"
import styles from "./index.module.scss"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import EditHeader from "./EditHeader"

export default function Index() {
	const { loading } = useLoadQuestionData()
	const dispatch = useDispatch()
	const { title } = useGetPageInfo()
	useTitle("编辑问卷" + title)

	//当点击空白 位置时清空selectedId
	function clearSelectedId() {
		dispatch(changeSelectedId(""))
	}

	return (
		<div className={styles.container}>
			<EditHeader />
			<div className={styles["content-wrapper"]}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles["canvas-wrapper"]}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	)
}
