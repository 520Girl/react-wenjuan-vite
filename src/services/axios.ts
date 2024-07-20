// 重构 axios实例，使用拦截器
import { message } from "antd"
import axios from "axios"
import { TOKEN_KEY } from "@/constant"
import { getLocation } from "@/utils"

const instance = axios.create({ timeout: 1000 * 10 })

if (import.meta.env.MODE === "development") {
	instance.defaults.baseURL = "/api"
}

instance.interceptors.request.use(
	config => {
		config.headers.Authorization = getLocation(TOKEN_KEY)
		return config
	},
	error => Promise.reject(error)
)

//响应拦截 同意处理 error 和 msg 就不传给页面了
instance.interceptors.response.use(
	res => {
		console.log(res)
		const resData: ResType = res.data
		const { errno, msg, data } = resData
		if (errno !== 0) {
			//表示消息错误 输出错误提示即可
			if (msg) {
				message.error(msg)
			}
			console.log(res)
			throw new Error("服务器错误")
		}
		return data as any
	},
	error => {}
)

export type ResType = {
	errno: number
	msg?: string
	data?: ResDateType
}

export type ResDateType = {
	[key: string]: any
}

export default instance
