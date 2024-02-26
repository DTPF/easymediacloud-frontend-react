import { messageError, messageSuccess } from 'views/components/UI/messages'
import * as LicenseTypes from './licenses.types'
import { getMyLicensesAPI, setLicenseOnlineAPI } from "api/licenses.api"
import { ILicense } from 'interfaces/license.interface'

export async function getLicensesAction(dispatch: any, token: string) {
  dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: true })
  try {
    const { response, data } = await getMyLicensesAPI(token)
    if (response.status === 200) {
      const sortLicenses = data.licenses.sort((a: ILicense, b: ILicense) => a.updatedAt > b.updatedAt ? -1 : 1)
      return dispatch({
        type: LicenseTypes.GET_LICENSES,
        payload: sortLicenses
      })
    }
    if (response.status === 404 || response.status === 401) {
      return dispatch({
        type: LicenseTypes.GET_LICENSES,
        payload: []
      })
    }
    return messageError(data.message)
  } catch (err: any) {
    messageError({ msg: err.message })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function postLicenseAction(dispatch: any) { }

export async function setLicenseOnlineAction(dispatch: any, licenseId: string, online: boolean, token: string) {
  try {
    const setLicenseOnline = await setLicenseOnlineAPI(licenseId, online, token)
    if (setLicenseOnline.response.status === 200) {
      dispatch({
        type: LicenseTypes.SET_LICENSE_ONLINE,
        payload: { licenseId, online }
      })
      return messageSuccess({ msg: setLicenseOnline.data.message as string })
    }
    return messageError(setLicenseOnline.data.message)
  } catch (err: any) {
    messageError({ msg: err.message })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}