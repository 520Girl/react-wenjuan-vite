import { useState, useEffect } from "react"

function useMouse() {
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setX(event.clientX)
			setY(event.clientY)
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [])

	return { x, y }
}

export default useMouse
