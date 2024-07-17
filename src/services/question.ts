import axios, { ResDateType } from "./axios"

export const getQuestions = async (id: string): Promise<ResDateType> => {
	const url = `/question/${id}`
	const data = (await axios.get(url)) as ResDateType
	return data
}
