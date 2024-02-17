import { IDauthUser } from "interfaces/user.interface";
import { basePath } from "./utils/config";

export const updateUserAPI = async (user: Partial<IDauthUser>, token: string): Promise<any> => {
	const params = {
		method: "PATCH",
		headers: {
			Authorization: token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	}
	const response = await fetch(`${basePath}/update-user`, params)
	const data = await response.json()
	return { response, data }
}