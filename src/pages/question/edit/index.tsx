import React from "react"
import { useParams } from "react-router-dom"

export default function Index() {
	const { id = "" } = useParams()
	return <div>edit{id}</div>
}
