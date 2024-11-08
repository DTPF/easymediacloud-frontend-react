import { messageError, messageSuccess } from 'views/components/UI/messages';
import * as LicenseTypes from './licenses.types';
import * as api from 'api/licenses.api';
import { ILicense } from 'interfaces/license.interface';
import { TFunction } from 'i18next';
import { getMediaByLicenseAPI } from 'api/media.api';

/**
 * Retrieves licenses from the server and dispatches an action to update the state.
 * @param dispatch - The dispatch function from the Redux store.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function getLicensesAction(
  dispatch: React.Dispatch<any>,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: true });
  try {
    const { response, data } = await api.getMyLicensesAPI(token);
    if (response.status === 200) {
      const sortLicenses = data.licenses.sort((a: ILicense, b: ILicense) =>
        a.updatedAt > b.updatedAt ? -1 : 1
      );
      return dispatch({
        type: LicenseTypes.GET_LICENSES,
        payload: sortLicenses,
      });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-licenses_error') });
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false });
  }
}

/**
 * Creates a new license and dispatches an action to update the state.
 * @param dispatch - The dispatch function from the Redux store.
 * @param projectName - The name of the project.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function postLicenseAction(
  dispatch: React.Dispatch<any>,
  projectName: string,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  try {
    const { response, data } = await api.createLicenseAPI({ projectName, token });
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.POST_LICENSE,
        payload: { license: data.license },
      });
      return messageSuccess({ msg: data.message });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_post-license_error') });
  }
}

/**
 * Sets the online status of a license and dispatches an action to update the state.
 * @param dispatch - The dispatch function from the Redux store.
 * @param licenseId - The ID of the license.
 * @param online - The online status to set.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function setLicenseOnlineAction(
  dispatch: React.Dispatch<any>,
  licenseId: string,
  online: boolean,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  try {
    const { response, data } = await api.setLicenseOnlineAPI(licenseId, online, token);
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.SET_LICENSE_ONLINE,
        payload: { licenseId, online },
      });
      return messageSuccess({ msg: data.message as string });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_set-license-online_error') });
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING, payload: false });
  }
}

/**
 * Deletes a license and dispatches an action to update the state.
 * @param dispatch - The dispatch function from the Redux store.
 * @param licenseId - The ID of the license to delete.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function deleteLicenseAction(
  dispatch: React.Dispatch<any>,
  licenseId: string,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  try {
    const { response, data } = await api.deleteLicenseAPI({ licenseId, token });
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.DELETE_LICENSE,
        payload: { licenseId },
      });
      return messageSuccess({ msg: data.message });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_delete-license_error') });
  }
}

/**
 * Retrieves the media token for a license and copies it to the clipboard.
 * @param licenseId - The ID of the license.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function getLicenseTokenAction(
  licenseId: string,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  try {
    const { response, data } = await api.getLicenseTokenAPI({ licenseId, token });
    if (response.status === 200) {
      navigator.clipboard.writeText(data.mediaToken);
      return messageSuccess({ msg: translate('actions_licenses_get-license-token_success') });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-token_error') });
  }
}

/**
 * Refreshes the media token for a license and copies it to the clipboard.
 * @param licenseId - The ID of the license.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function refreshLicenseTokenAction(
  licenseId: string,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  try {
    const { response, data } = await api.refreshLicenseTokenAPI(licenseId, token);
    if (response.status === 200) {
      navigator.clipboard.writeText(data.mediaToken);
      return messageSuccess({ msg: translate('actions_licenses_refresh-license-token_success') });
    }
    return messageError({ msg: data.message });
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-token_error') });
  }
}

/**
 * Retrieves media associated with a license and dispatches an action to update the state.
 * @param dispatch - The dispatch function from the Redux store.
 * @param licenseId - The ID of the license.
 * @param token - The authentication token.
 * @param translate - The translation function.
 */
export async function getLicenseMediaAction(
  dispatch: React.Dispatch<any>,
  licenseId: string,
  token: string,
  translate: TFunction<'translation', undefined>
) {
  dispatch({ type: LicenseTypes.SET_IS_LOADING_MEDIA, payload: true });
  const index = 0;
  const limit = 20;
  try {
    const { response, data } = await getMediaByLicenseAPI({licenseId, index, limit, token});
    if (response.status === 200) {
      dispatch({
        type: LicenseTypes.GET_LICENSE_MEDIA,
        payload: {
          licenseId,
          media: data.media,
          index,
          limit,
        },
      });
    }
  } catch (err: any) {
    messageError({ msg: err.message ?? translate('actions_licenses_get-license-media_error') });
  } finally {
    dispatch({ type: LicenseTypes.SET_IS_LOADING_MEDIA, payload: false });
  }
}
