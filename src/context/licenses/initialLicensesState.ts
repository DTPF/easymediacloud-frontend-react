import { ILicense, ILicenseState } from 'interfaces/license.interface';

const initialLicensesState: ILicenseState = {
  licenses: [] as ILicense[],
  licenseSelected: {} as ILicense,
  isLoading: true,
  isLoadingMedia: true,
  getLicenses: () => Promise.resolve(false),
  postLicense: () => {},
  setLicenseOnline: () => {},
  deleteLicense: () => {},
  getLicenseToken: () => {},
  refreshLicenseToken: () => {},
  getLicenseMedia: () => {},
};

export default initialLicensesState;
