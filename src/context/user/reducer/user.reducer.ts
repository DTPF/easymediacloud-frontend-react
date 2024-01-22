import * as UserTypes from './user.types'
import { UserState } from '../initialUserState';
import { IUser } from 'interfaces/user.interface';

export default function userReducer(
	state: UserState,
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