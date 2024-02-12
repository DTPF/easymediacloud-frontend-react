import { IUser } from "interfaces/user.interface";
import { basePath } from "./utils/config";
// import { makeRequest } from "./utils/makeRequest";

export const registerLoginUserAPI = async (user: any, token: string): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user: user
		}),
	}
	const response = await fetch(`${basePath}/login`, params)
	const data = await response.json()
	return { response, data }
}

export const updateUserAPI = async (user: Partial<IUser>, token: string): Promise<any> => {
	const params = {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	}
	const response = await fetch(`${basePath}/update-user`, params)
	const data = await response.json()
	return { response, data }
}