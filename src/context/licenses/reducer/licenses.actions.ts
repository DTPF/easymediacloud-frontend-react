import { messageError, messageSuccess } from 'views/components/UI/messages'
import * as LicenseTypes from './licenses.types'
import { createLicenseAPI, deleteLicenseAPI, getMyLicensesAPI, setLicenseOnlineAPI } from "api/licenses.api"
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
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? 'Error al obtener las licencias' })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function postLicenseAction(dispatch: any, projectName: string, token: string) {
  try {
    const { response, data } = await createLicenseAPI({ projectName, token })
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.POST_LICENSE,
        payload: { license: data.license }
      })
      return messageSuccess({ msg: data.message })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? 'Error al crear la licencia' })
  }
}

export async function setLicenseOnlineAction(dispatch: any, licenseId: string, online: boolean, token: string) {
  try {
    const { response, data } = await setLicenseOnlineAPI(licenseId, online, token)
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.SET_LICENSE_ONLINE,
        payload: { licenseId, online }
      })
      return messageSuccess({ msg: data.message as string })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? 'Error al cambiar el estado de la licencia' })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function deleteLicenseAction(dispatch: any, licenseId: string, token: string) {
  try {
    const { response, data } = await deleteLicenseAPI({ licenseId, token })
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.DELETE_LICENSE,
        payload: { licenseId }
      })
      return messageSuccess({ msg: data.message })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? 'Error al eliminar la licencia' })
  }
}