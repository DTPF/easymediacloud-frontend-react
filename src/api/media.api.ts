import config from "config/config"

export const getMediaByLicenseAPI = async (licenseId: string, index: number, limit: number, token: string): Promise<any> => {
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    }
  }
  const response = await fetch(`${config.app.SERVER_URL}/get-media-by-license/${licenseId}?index=${index}&limit=${limit}`, params)
  const data = await response.json()
  return { response, data }
}
