/**
 * Reducer function to manage the state of licenses.
 *
 * @param state - The current state of licenses.
 * @param action - The action to be processed.
 * @returns The new state of licenses.
 *
 * @typedef {Object} TPostLicensePayload
 * @property {ILicense} license - The license to be added.
 *
 * @typedef {Object} TSetLicenseOnlinePayload
 * @property {string} licenseId - The ID of the license to be updated.
 * @property {boolean} online - The online status to be set.
 *
 * @typedef {Object} TDeleteLicensePayload
 * @property {string} licenseId - The ID of the license to be deleted.
 *
 * @typedef {Object} TGetLicenseMediaPayload
 * @property {string} licenseId - The ID of the license to get media for.
 * @property {IMedia[]} media - The media items to be set.
 * @property {number} index - The index for pagination.
 * @property {number} limit - The limit for pagination.
 *
 * @typedef {Object} LicensesAction
 * @property {typeof LicensesTypes.GET_LICENSES} type - Action type for getting licenses.
 * @property {ILicense[]} payload - Payload containing the licenses.
 * @property {typeof LicensesTypes.POST_LICENSE} type - Action type for posting a license.
 * @property {TPostLicensePayload} payload - Payload containing the license to be added.
 * @property {typeof LicensesTypes.SET_IS_LOADING} type - Action type for setting loading state.
 * @property {boolean} payload - Payload containing the loading state.
 * @property {typeof LicensesTypes.SET_LICENSE_ONLINE} type - Action type for setting license online status.
 * @property {TSetLicenseOnlinePayload} payload - Payload containing the license ID and online status.
 * @property {typeof LicensesTypes.DELETE_LICENSE} type - Action type for deleting a license.
 * @property {TDeleteLicensePayload} payload - Payload containing the license ID to be deleted.
 * @property {typeof LicensesTypes.GET_LICENSE_MEDIA} type - Action type for getting license media.
 * @property {TGetLicenseMediaPayload} payload - Payload containing the license ID, media items, index, and limit.
 * @property {typeof LicensesTypes.SET_IS_LOADING_MEDIA} type - Action type for setting media loading state.
 * @property {boolean} payload - Payload containing the media loading state.
 */
import { ILicense, ILicenseState } from 'interfaces/license.interface';
import * as LicensesTypes from './licenses.types';
import { IMedia } from 'interfaces/media.interface';

export type TPostLicensePayload = { license: ILicense };
export type TSetLicenseOnlinePayload = { licenseId: string; online: boolean };
export type TDeleteLicensePayload = { licenseId: string };
export type TGetLicenseMediaPayload = { licenseId: string; media: IMedia[]; index: number; limit: number };

type LicensesAction =
  | { type: typeof LicensesTypes.GET_LICENSES; payload: ILicense[] }
  | { type: typeof LicensesTypes.POST_LICENSE; payload: TPostLicensePayload }
  | { type: typeof LicensesTypes.SET_IS_LOADING; payload: boolean }
  | { type: typeof LicensesTypes.SET_LICENSE_ONLINE; payload: TSetLicenseOnlinePayload }
  | { type: typeof LicensesTypes.DELETE_LICENSE; payload: TDeleteLicensePayload }
  | { type: typeof LicensesTypes.GET_LICENSE_MEDIA; payload: TGetLicenseMediaPayload }
  | { type: typeof LicensesTypes.SET_IS_LOADING_MEDIA; payload: boolean };

export default function licensesReducer(state: ILicenseState, action: LicensesAction): ILicenseState {
  const { type, payload } = action;

  switch (type) {
    case LicensesTypes.GET_LICENSES: {
      const getLicenses: ILicenseState = {
        ...state,
        licenses: payload,
      };
      return getLicenses;
    }

    case LicensesTypes.POST_LICENSE: {
      const postLicense: ILicenseState = {
        ...state,
        licenses: [payload.license, ...state.licenses],
      };
      return postLicense;
    }

    case LicensesTypes.SET_IS_LOADING: {
      const setIsLoading: ILicenseState = {
        ...state,
        isLoading: payload,
      };
      return setIsLoading;
    }

    case LicensesTypes.SET_LICENSE_ONLINE: {
      const setLicenseOnline: ILicenseState = {
        ...state,
        licenses: state.licenses.map((license) => {
          if (license._id === payload.licenseId) {
            license.online = payload.online;
          }
          return license;
        }),
      };
      return setLicenseOnline;
    }

    case LicensesTypes.DELETE_LICENSE: {
      const deleteLicense: ILicenseState = {
        ...state,
        licenses: state.licenses.filter((license) => license._id !== payload.licenseId),
      };
      return deleteLicense;
    }

    case LicensesTypes.GET_LICENSE_MEDIA: {
      const getLicenseMedia: ILicenseState = {
        ...state,
        licenses: state.licenses.map((license) => {
          if (license._id === payload.licenseId) {
            license.mediaPagination = {
              media: payload.media,
              index: payload.index,
              limit: payload.limit,
            };
          }
          return license;
        }),
        licenseSelected: state.licenses.find((license) => license._id === payload.licenseId) || null,
      };
      return getLicenseMedia;
    }

    case LicensesTypes.SET_IS_LOADING_MEDIA: {
      const setIsLoadingMedia: ILicenseState = {
        ...state,
        isLoadingMedia: payload,
      };
      return setIsLoadingMedia;
    }

    default:
      return state;
  }
}
