import { basePath } from "./utils/config";

export const getMyLicensesAPI = async (token: string): Promise<any> => {
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${basePath}/get-my-licenses`, params)
  const data = await response.json()
  return { response, data }
}