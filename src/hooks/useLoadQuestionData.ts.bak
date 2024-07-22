import { getQuestions } from "@/services/question"
import { useRequest } from "ahooks"

function useLoadQuestionData() {
	const { id = "" } = useParams()
	//! 第一中方式
	// const [loading,setLoading] = useState(true)
	// const [questionData,setQuestionData] = useState({})

	// useEffect(() => {
	// 	async function fun() {
	// 		const data = await getQuestions(id)
	// 		setQuestionData(data)
	// 		setLoading(false)
	// 	}
	// 	fun()
	// }, [id])

	//! 第二中方式
	async function load() {
		const data = await getQuestions(id)
		return data
	}
	const { loading, data: questionData, error } = useRequest(load)
	return { loading, questionData, error }
}

export default useLoadQuestionData
