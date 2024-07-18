import { getQuestionsList } from "@/services/question"
import {
	LIST_SEARCH_PARAM_KEY,
	LIST_PAGE_SIZE_PARAM_KEY,
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE,
} from "@/constant"
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
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
			const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE

			const data = await getQuestionsList({ keyword, isStar, isDeleted, page, pageSize })
			return data
		},
		{
			refreshDeps: [searchParams], //当searchParams变化时，重新请求
		}
	)

	return { data, loading, error }
}

export default useLoadQuestionListData
