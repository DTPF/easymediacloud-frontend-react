import { ILicense, ILicenseState, IRequestsDataRange } from "interfaces/license.interface"
import { ISubscription } from "interfaces/subscription.interface"

const requestsDataRangeState: IRequestsDataRange = {
	quantity: 0,
	cicle: ""
}

const subscriptionState: ISubscription = {
	_id: "",
	type: "",
	price: 0,
	currency: "",
	maxSize: 0,
	maxSizeT: "",
	enabled: true,
	requestsDataRange: requestsDataRangeState,
	maxRequests: 0,
	createdAt: new Date(),
	updatedAt: new Date()
}

const licenseState: ILicense = {
	_id: "",
	project: "",
	enabled: true,
	online: true,
	size: 0,
	sizeT: "0 B",
	totalFiles: 0,
	totalRequests: 0,
	requestsInDataRange: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
	subscription: subscriptionState
}

const initialLicensesState: ILicenseState = {
	licenses: [licenseState],
	isLoading: false,
	getLicenses: () => { },
	postLicense: ({ projectName }: { projectName: string }) => { },
}

export default initialLicensesState