export const setLocation = (key: string, value: string) => {
	localStorage.setItem(key, value)
}

export const getLocation = (key: string) => {
	return localStorage.getItem(key)
}

export const removeLocation = (key: string) => {
	localStorage.removeItem(key)
}
