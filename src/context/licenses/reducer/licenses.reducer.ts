import { ILicense } from 'interfaces/license.interface';
import * as LicensesTypes from './licenses.types'

export default function licensesReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case LicensesTypes.GET_LICENSES:
			return {
				...state,
				licenses: payload,
			}

		case LicensesTypes.POST_LICENSE:
			return {
				...state,
				licenses: [...state.licenses, payload.license],
			}

		case LicensesTypes.SET_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			}

		case LicensesTypes.SET_LICENSE_ONLINE:
			return {
				...state,
				licenses: state.licenses.map((license: ILicense) => {
					if (license._id === payload.licenseId) {
						license.online = payload.online
					}
					return license
				}),
			}

		default:
			return state
	}
}