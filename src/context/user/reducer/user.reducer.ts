import * as UserTypes from './user.types'
import { IUser, IUserState } from 'interfaces/user.interface';

export default function userReducer(
	state: IUserState,
	action: {
		type: string;
		payload: {
			user: IUser
		};
	}) {
	const { type, payload } = action;

	switch (type) {
		case UserTypes.LOGIN:
			return {
				...state,
				user: payload.user,
			}

		default:
			return state
	}
}