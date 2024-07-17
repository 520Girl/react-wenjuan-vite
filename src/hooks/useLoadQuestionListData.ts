import { getQuestionsList } from "@/services/question"
import { LIST_SEARCH_PARAM_KEY } from "@/constant"
import { isValidElement } from "react"

type OptionType = {
	isStar: boolean
	isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
	const { isStar, isDeleted } = opt
	const [searchParams] = useSearchParams()

	const { data, loading, error } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
			const data = await getQuestionsList({ keyword, isStar, isDeleted })
			return data
		},
		{
			refreshDeps: [searchParams], //当searchParams变化时，重新请求
		}
	)

	return { data, loading, error }
}

export default useLoadQuestionListData