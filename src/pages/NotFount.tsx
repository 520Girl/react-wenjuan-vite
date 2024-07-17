import type { FC } from "react"
import { DASHBOARD_PATH } from "@/router/router"

const NotFount: FC = () => {
	const nav = useNavigate()
	return (
		<AResult
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<AButton type="primary" onClick={() => nav(DASHBOARD_PATH)}>
					Back Home
				</AButton>
			}
		/>
	)
}
export default NotFount
