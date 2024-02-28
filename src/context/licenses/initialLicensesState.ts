import { ILicense, ILicenseState } from "interfaces/license.interface"

const initialLicensesState: ILicenseState = {
	licenses: [] as ILicense[],
	isLoading: false,
	getLicenses: () => { },
	postLicense: ({ projectName }: { projectName: string }) => { },
	setLicenseOnline: ({ licenseId, online }: { licenseId: string, online: boolean }) => { },
	deleteLicense: ({ licenseId }: { licenseId: string }) => { },
}

export default initialLicensesState