import React from "react"
import PropTypes from "prop-types"

import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from "@/constant/index"

type PropTypes = {
	total: number
}
const ListPagination = (props: PropTypes) => {
	const { total } = props

	const nav = useNavigate()
	const { pathname } = useLocation()
	const [current, setCurrent] = useState(1)
	const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
	const [searchParams] = useSearchParams()
	console.log(searchParams)
	//当前页面的url参数，当改变url时需要同步分页的page
	useEffect(() => {
		const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
		setCurrent(page)
		const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE
		setPageSize(pageSize)
	}, [searchParams])

	//当点击分页事件
	const handlePageSizeChange = (page: number, pageSize: number) => {
		searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
		searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
		nav({
			pathname,
			search: searchParams.toString(),
		})
	}

	return (
		<>
			<APagination
				onChange={handlePageSizeChange}
				current={current}
				pageSize={pageSize}
				total={total}
				style={{ justifyContent: "center" }}
			/>
		</>
	)
}

ListPagination.propTypes = {}

export default ListPagination
