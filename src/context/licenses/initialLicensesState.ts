import { ILicense, ILicenseState } from "interfaces/license.interface"

const initialLicensesState: ILicenseState = {
	licenses: [] as ILicense[],
	isLoading: false,
	getLicenses: () => { },
	postLicense: ({ projectName }: { projectName: string }) => { },
	setLicenseOnline: ({ licenseId, online }: { licenseId: string, online: boolean }) => { }
}

export default initialLicensesState