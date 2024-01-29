import { messageError } from 'views/components/UI/messages'
import * as LicenseTypes from './licenses.types'
import { getMyLicensesAPI } from "api/licenses.api"
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
    messageError(err.message)
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function postLicenseAction(dispatch: any) { }