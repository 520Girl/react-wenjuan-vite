import { useDispatch } from "react-redux"
import { getQuestions } from "@/services/question"
import { resetComponents } from "@/store/componentsReducer"
import { resetPageInfo } from "@/store/pageInfoReducer"

// 目的是为了 将请求到的组件信息存储到 redux中
function useLoadQuestionData() {
	const { id = "" } = useParams()
	const dispatch = useDispatch()

	const { run, data, loading, error } = useRequest(
		async (id: string) => {
			if (!id) throw new Error("没有文件id ! ")
			const data = await getQuestions(id)
			return data
		},
		{
			manual: true,
		}
	)

	//useEffect 用来监听data 发生变化时
	useEffect(() => {
		if (!data) return

		const {
			title = "",
			desc = "",
			js = "",
			isPublished = false,
			css = "",
			componentList = [],
		} = data

		//默认选中id
		let selectedId = ""
		if (componentList.length) {
			selectedId = componentList[0].fe_id
		}
		// 将请求到的组件信息componentList  存储到 redux中
		dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

		//把pageInfo 存储到 redux store中
		dispatch(resetPageInfo({ title, js, css, desc, isPublished }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	//判断当id 发生变化的时候 重新请求数据
	useEffect(() => {
		run(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])
	return {
		loading,
		error,
	}
}

export default useLoadQuestionData
