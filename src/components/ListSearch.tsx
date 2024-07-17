import type { ChangeEvent, FC } from "react"
import { LIST_SEARCH_PARAM_KEY } from "@/constant"

const { Search } = AInput
const ListSearch: FC = () => {
	const [value, setValue] = useState("")
	const nav = useNavigate()
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()

	//获取参数并添加到input 中
	useEffect(() => {
		const searchValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
		if (searchValue) {
			setValue(searchValue)
		}
	}, [searchParams])
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value)
	}
	function handleSearch(value: string) {
		nav({
			pathname: pathname,
			search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
		})
	}

	return (
		<>
			<Search
				onSearch={handleSearch}
				onChange={handleChange}
				value={value}
				size="large"
				allowClear
				style={{ width: 260 }}
				placeholder="请输入关键字搜索"
			/>
		</>
	)
}

export default ListSearch
