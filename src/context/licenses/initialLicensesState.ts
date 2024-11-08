import { ILicense, ILicenseState } from "interfaces/license.interface"

const initialLicensesState: ILicenseState = {
	licenses: [] as ILicense[],
	licenseSelected: {} as ILicense,
	isLoading: false,
	isLoadingMedia: false,
	getLicenses: () => { },
	postLicense: () => { },
	setLicenseOnline: () => { },
	deleteLicense: () => { },
	getLicenseToken: () => { },
	refreshLicenseToken: () => { },
	getLicenseMedia: () => { },
}

export default initialLicensesState