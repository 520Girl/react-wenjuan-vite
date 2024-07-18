import type { FC } from "react"
import { produce } from "immer"
import QuestionCard from "@/components/QuestionCard"
import ListSearch from "@/components/ListSearch"
import useMouse from "@/hooks/useMouse"
import { getQuestionsList } from "@/services/question"
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "@/constant"
import styles from "./common.module.scss"

const { Title } = ATypography

// const rawQuestionList = [
// 	{
// 		_id: "q1",
// 		title: "问卷1",
// 		isPublished: true,
// 		isStar: false,
// 		answerCount: 10,
// 		createdAt: "2022-01-01",
// 	},
// 	{
// 		_id: "q2",
// 		title: "问卷2",
// 		isPublished: false,
// 		isStar: true,
// 		answerCount: 20,
// 		createdAt: "2022-01-02",
// 	},
// 	{
// 		_id: "q3",
// 		title: "问卷3",
// 		isPublished: true,
// 		isStar: false,
// 		answerCount: 30,
// 		createdAt: "2022-01-03",
// 	},
// 	{
// 		_id: "q4",
// 		title: "问卷4",
// 		isPublished: false,
// 		isStar: true,
// 		answerCount: 40,
// 		createdAt: "2022-01-04",
// 	},
// ]

const List1: FC = () => {
	useTitle("我的-问卷列表")

	//鼠标移动
	const { x, y } = useMouse()

	//列表页
	//文件列表数据
	//! 第一种方式
	// const [questionList, setQuestionList] = useState([])
	// const [total, setTotal] = useState(0)
	// useEffect(()=>{+
	// 	async function load(){
	// 		const data = await getQuestionsList()
	// 		const {list =[], total=0 } = data
	// 		setQuestionList(list)
	// 		setTotal(total)
	// 	}
	// 	load()
	// },[])
	//! 第二种方式
	// const { loading, data: questionList, error } = useLoadQuestionListData()
	// const { list = [], total = 0 } = questionList || {}

	//! 确认集合滚动加载请求数据
	const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
	const [list, setList] = useState([]) //数据叠加
	const [total, setTotal] = useState(0) // 总页面
	const [page, setPage] = useState(1) //当前页码
	const haveMoreData = list.length < total //是否有更多数据
	const [searchParms] = useSearchParams()
	const loaderMoreRef = useRef<HTMLDivElement>(null)

	const keyword = searchParms.get(LIST_SEARCH_PARAM_KEY) || ""

	// keyword 变化时，重置信息
	useEffect(() => {
		setStarted(false)
		setPage(1)
		setList([])
		setTotal(0)
	}, [keyword])

	//加载数据函数
	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionsList({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword: searchParms.get("keyword") || "",
			})
			return data
		},
		{
			manual: true,
			onSuccess: data => {
				const { list: l = [], total = 0 } = data || {}

				setList(
					produce(draft => {
						const lists = l as never[] // 假设 l 是一个数组
						draft.push(...lists)
					})
				)
				setTotal(total)
				setPage(page + 1)
			},
		}
	)

	//尝试去加载数据 防抖
	const { run: handleList } = useDebounceFn(
		() => {
			const elem = loaderMoreRef.current
			if (elem == null) return
			const domRect = elem.getBoundingClientRect()
			if (domRect == null) return
			const { bottom } = domRect
			if (bottom <= window.innerHeight) {
				//当视口高度大于 loading元素举例顶部视口的高度时，表示loading已经显示了
				setStarted(true) //防抖，开始加载
				load() //加载数据
			}
		},
		{
			wait: 1000,
		}
	)

	//! 1. 当进入页面时就需要请求数据
	useEffect(() => {
		handleList()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParms])

	//todo 2.  当进入页面的时候需要监听页面滚动
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener("scroll", handleList)
		}
		return () => {
			window.removeEventListener("scroll", handleList)
		}
	}, [searchParms, haveMoreData, handleList])

	//loading 组件
	const loadingMoreData = useMemo(() => {
		if (!started || loading) return <ASpin />
		if (total === 0) return <AEmpty description="暂无数据" />
		if (!haveMoreData) return <span>没有更多了</span>
		return <span>开始加载下一页</span>
	}, [started, total, loading, haveMoreData])
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>
						我的问卷{x}，{y}
					</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{list.length > 0 &&
					list.map((question: any) => {
						const { _id } = question
						return <QuestionCard key={_id} {...question} />
					})}
			</div>
			<div className={styles.footer}>
				<div ref={loaderMoreRef} style={{ textAlign: "center" }}>
					{loadingMoreData}
				</div>
			</div>
		</>
	)
}

export default List1
