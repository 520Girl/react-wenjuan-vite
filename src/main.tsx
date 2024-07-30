import React from "react"
import ReactDOM from "react-dom/client"
// import App from "./App.tsx"
import { RouterProvider } from "react-router-dom"
import router from "@/router/index.tsx"
import store from "@/store/index.ts"
import { Provider } from "react-redux"
import "normalize.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</React.StrictMode>
)
