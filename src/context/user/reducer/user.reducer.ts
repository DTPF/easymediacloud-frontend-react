import * as UserTypes from './user.types'
import { IUserState } from 'interfaces/user.interface';

export default function userReducer(
	state: IUserState,
	action: any) {
	const { type, payload } = action;

	switch (type) {
		case UserTypes.LOGIN:
			return {
				...state,
				user: payload.user,
			}

		case UserTypes.UPDATE_PARTIAL_USER:
			return {
				...state,
				user: {
					...state.user,
					[payload.key]: payload.value,
				}
			}

		case UserTypes.SET_IS_LOADING:
			return {
				...state,
				isLoading: payload.isLoading
			}

		default:
			return state
	}
}