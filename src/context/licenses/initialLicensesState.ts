import { ILicense, ILicenseState } from "interfaces/license.interface"

const initialLicensesState: ILicenseState = {
	licenses: [] as ILicense[],
	licenseSelected: {} as ILicense,
	isLoading: false,
	isLoadingMedia: false,
	getLicenses: () => { },
	postLicense: ({ projectName }: { projectName: string }) => { },
	setLicenseOnline: ({ licenseId, online }: { licenseId: string, online: boolean }) => { },
	deleteLicense: ({ licenseId }: { licenseId: string }) => { },
	getLicenseToken: ({ licenseId }: { licenseId: string }) => { },
	refreshLicenseToken: ({ licenseId }: { licenseId: string }) => { },
	getLicenseMedia: ({ licenseId }: { licenseId: string }) => { },
}

export default initialLicensesState