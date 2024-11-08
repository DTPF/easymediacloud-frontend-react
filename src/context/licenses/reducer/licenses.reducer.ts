import { ILicense, ILicenseState } from 'interfaces/license.interface';
import * as LicensesTypes from './licenses.types';

export default function licensesReducer(state: ILicenseState, action: any) {
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
        licenses: [...state.licenses, payload.license],
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
        licenses: state.licenses.map((license: ILicense) => {
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
