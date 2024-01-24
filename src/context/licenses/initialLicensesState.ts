const initialLicensesState = {
	licenses: [{
		_id: "",
		project: "",
		enabled: true,
		online: true,
		size: 0,
		sizeT: "0 B",
		totalFiles: 0,
		createdAt: "",
		updatedAt: "",
		subscription: {
			_id: "",
			type: "",
			price: 0,
			currency: "",
			maxSize: 0,
			maxSizeT: "",
			enabled: true,
			createdAt: "",
			updatedAt: ""
		}
	}],
	isLoading: false,
	getLicenses: () => { },
	postLicense: (license: any) => { },
}

export default initialLicensesState