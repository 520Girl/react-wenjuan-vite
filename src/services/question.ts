import axios, { ResDateType } from "./axios"

type searchParamsType = {
	keyword: string
	isStar: boolean
	isDeleted: boolean
	page: number
	pageSize: number
}

//获取单个问卷信息
export const getQuestions = async (id: string): Promise<ResDateType> => {
	const url = `/question/${id}`
	const data = (await axios.get(url)) as ResDateType
	return data
}

//创建问卷信息
export const createQuestions = async (): Promise<ResDateType> => {
	const url = `/question`
	const data = (await axios.post(url)) as ResDateType
	return data
}

//! 查询问卷信息 Partial 表示部分的意思，即只传部分参数，其他参数可以不传,但必须传的有
export const getQuestionsList = async (opt: Partial<searchParamsType>): Promise<ResDateType> => {
	const url = `/question`
	const data = (await axios.get(url, { params: opt })) as ResDateType
	return data
}
