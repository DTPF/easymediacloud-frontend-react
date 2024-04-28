import { messageError, messageSuccess } from 'views/components/UI/messages'
import * as LicenseTypes from './licenses.types'
import * as api from "api/licenses.api"
import { ILicense } from 'interfaces/license.interface'
import { TFunction } from 'i18next'
import { getMediaByLicenseAPI } from 'api/media.api'

export async function getLicensesAction(dispatch: any, token: string, translate: TFunction<"translation", undefined>) {
  dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: true })
  try {
    const { response, data } = await api.getMyLicensesAPI(token)
    if (response.status === 200) {
      const sortLicenses = data.licenses.sort((a: ILicense, b: ILicense) => a.updatedAt > b.updatedAt ? -1 : 1)
      return dispatch({
        type: LicenseTypes.GET_LICENSES,
        payload: sortLicenses
      })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-licenses_error') })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function postLicenseAction(dispatch: any, projectName: string, token: string, translate: TFunction<"translation", undefined>) {
  try {
    const { response, data } = await api.createLicenseAPI({ projectName, token })
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.POST_LICENSE,
        payload: { license: data.license }
      })
      return messageSuccess({ msg: data.message })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_post-license_error') })
  }
}

export async function setLicenseOnlineAction(dispatch: any, licenseId: string, online: boolean, token: string, translate: TFunction<"translation", undefined>) {
  try {
    const { response, data } = await api.setLicenseOnlineAPI(licenseId, online, token)
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.SET_LICENSE_ONLINE,
        payload: { licenseId, online }
      })
      return messageSuccess({ msg: data.message as string })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_set-license-online_error') })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false })
  }
}

export async function deleteLicenseAction(dispatch: any, licenseId: string, token: string, translate: TFunction<"translation", undefined>) {
  try {
    const { response, data } = await api.deleteLicenseAPI({ licenseId, token })
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.DELETE_LICENSE,
        payload: { licenseId }
      })
      return messageSuccess({ msg: data.message })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_delete-license_error') })
  }
}

export async function getLicenseTokenAction(licenseId: string, token: string, translate: TFunction<"translation", undefined>) {
  try {
    const { response, data } = await api.getLicenseTokenAPI(licenseId, token)
    if (response.status === 200) {
      navigator.clipboard.writeText(data.mediaToken);
      return messageSuccess({ msg: translate('actions_licenses_get-license-token_success') })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-token_error') })
  }
}

export async function refreshLicenseTokenAction(licenseId: string, token: string, translate: TFunction<"translation", undefined>) {
  try {
    const { response, data } = await api.refreshLicenseTokenAPI(licenseId, token)
    if (response.status === 200) {
      navigator.clipboard.writeText(data.mediaToken);
      return messageSuccess({ msg: translate('actions_licenses_refresh-license-token_success') })
    }
    return messageError({ msg: data.message })
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-token_error') })
  }
}

export async function getLicenseMediaAction(dispatch: any, licenseId: string, token: string, translate: TFunction<"translation", undefined>) {
  dispatch({ type: LicenseTypes.SET_IS_LOADING_MEDIA, payload: true })
  const index = 0;
  const limit = 20;
  try {
    const { response, data } = await getMediaByLicenseAPI(licenseId, index, limit, token)
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.GET_LICENSE_MEDIA,
        payload: { 
          licenseId, 
          media: data.media,
          index,
          limit
         }
      })
    }
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-media_error') })
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING_MEDIA, payload: false })
  }
}