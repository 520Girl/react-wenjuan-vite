import axios, { ResDateType } from "./axios"

// export type StatListDataType = {
//     id: number
//     [key: string]:any
// }

// export type StatType = {
//     total: number
//     list:StatListDataType[]
// }

//获取统计列表
export const getQuestionStatList = async (
	questionId: string,
	opt: { page: number; pageSize: number }
): Promise<ResDateType> => {
	const url = `/stat/${questionId}`
	const data = (await axios.get(url, { params: opt })) as ResDateType
	return data
}
