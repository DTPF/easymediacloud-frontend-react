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

export const setLicenseOnlineAPI = async (licenseId: string, online: boolean, token: string): Promise<any> => {
  const params = {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ online })
  }
  const response = await fetch(`${basePath}/set-license-online/${licenseId}`, params)
  const data = await response.json()
  return { response, data }
}