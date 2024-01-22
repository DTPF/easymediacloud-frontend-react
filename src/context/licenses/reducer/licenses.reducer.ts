import * as LicensesTypes from './licenses.types'

export default function licensesReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case LicensesTypes.POST_LICENSE:
			return {
				...state,
				licenses: [...state.licenses, payload.license],
			}

		default:
			return state
	}
}