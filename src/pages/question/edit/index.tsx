import { useDispatch } from "react-redux"
import { changeSelectedId } from "@/store/componentsReducer"
import useLoadQuestionData from "@/hooks/useLoadQuestionData"
import EditCanvas from "./EditCanvas"
import styles from "./index.module.scss"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

export default function Index() {
	const { loading, error } = useLoadQuestionData()
	const dispatch = useDispatch()

	//当点击空白 位置时清空selectedId
	function clearSelectedId() {
		dispatch(changeSelectedId(""))
	}

	return (
		<div className={styles.container}>
			<div className="">header</div>
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
