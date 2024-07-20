import type { RouteObject } from "react-router-dom"
import MainLayout from "@/layout/Main-Layout"
import ManageLayout from "@/layout/Manage-Layout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import NotFount from "@/pages/NotFount"
import List from "@/pages/manage/List"
import Star from "@/pages/manage/Star"
import Trash from "@/pages/manage/Trash"
import Edit from "@/pages/question/edit"
import Stat from "@/pages/question/stat"

declare module "react-router" {
	interface IndexRouteObject {
		name?: string
	}
	interface NonIndexRouteObject {
		name?: string
	}
}

export const routes: RouteObject[] = [
	{
		path: "/",
		name: "Home",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				name: "Dashboard",
				element: <Home />,
			},
			{
				path: "login",
				name: "login",
				element: <Login />,
			},
			{
				path: "manage",
				element: <ManageLayout />,
				children: [
					{
						path: "list",
						element: <List />,
					},
					{
						path: "star",
						element: <Star />,
					},
					{
						path: "trash",
						element: <Trash />,
					},
				],
			},
			{
				path: "/register",
				name: "register",
				element: <Register />,
			},
			{
				path: "*",
				name: "404",
				element: <NotFount />,
			},
		],
	},
	{
		path: "question",
		name: "question",
		element: <MainLayout />,
		children: [
			{
				path: "edit/:id",
				element: <Edit />,
			},
			{
				path: "stat/:id", // statistic 统计
				element: <Stat />,
			},
		],
	},
	{
		path: "*",
		name: "404",
		element: <NotFount />,
	},
]

export const LOGIN_PATH = "/login"
export const REGISTER_PATH = "/register"
export const DASHBOARD_PATH = "/"
export const MANNAGE_INDEX_PATH = "/manage/list"

//判断是否是登录注册页面
export const isLoginOrRegisterPath = (path: string) => {
	if ([LOGIN_PATH, REGISTER_PATH].includes(path)) return true
	return false
}

export const isNoNeedUserInfo = (path: string) => {
	if ([LOGIN_PATH, REGISTER_PATH, DASHBOARD_PATH].includes(path)) return true
	return false
}
