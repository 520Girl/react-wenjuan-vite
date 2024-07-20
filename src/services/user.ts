import axios, { ResDateType } from "./axios"

export type RegisterType = {
	username: string
	password: string
	nickname?: string
}
//登录
export const login = async (username: string, password: string): Promise<ResDateType> => {
	const url = `/user/login`
	const data = (await axios.post(url, { username, password })) as ResDateType
	return data
}

//注册
export const register = async (opt: RegisterType): Promise<ResDateType> => {
	const url = `/user/register`
	const data = (await axios.post(url, opt)) as ResDateType
	return data
}

//查询个人信息
export const getPersonalInfo = async (): Promise<ResDateType> => {
	const url = "/user/info"
	const data = (await axios.get(url)) as ResDateType
	return data
}
