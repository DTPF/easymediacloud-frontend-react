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

export const createLicenseAPI = async ({ projectName, token }: { projectName: string, token: string }): Promise<any> => {
  const params = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ project: projectName })
  }
  const response = await fetch(`${basePath}/create-license`, params)
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

export const deleteLicenseAPI = async ({ licenseId, token }: { licenseId: string, token: string }): Promise<any> => {
  const params = {
    method: "DELETE",
    headers: {
      Authorization: token,
    }
  }
  const response = await fetch(`${basePath}/delete-license/${licenseId}`, params)
  const data = await response.json()
  return { response, data }
}

export const getLicenseTokenAPI = async (licenseId: string, token: string): Promise<any> => {
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${basePath}/get-license-token/${licenseId}`, params)
  const data = await response.json()
  return { response, data }
}

export const refreshLicenseTokenAPI = async (licenseId: string, token: string): Promise<any> => {
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${basePath}/refresh-license-token/${licenseId}`, params)
  const data = await response.json()
  return { response, data }
}