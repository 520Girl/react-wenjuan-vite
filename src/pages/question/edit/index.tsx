import React from "react"
import { useParams } from "react-router-dom"
import { getQuestions } from "@/services/question"

export default function Index() {
	const { id = "" } = useParams()
	useEffect(() => {
		async function fun() {
			const data = await getQuestions(id)
			console.log(data)
		}
		fun()
	}, [id])

	return <div>edit{id}</div>
}
