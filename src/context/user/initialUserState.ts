import { IUser } from "interfaces/user.interface"

export interface UserState {
	user: IUser,
	logout: () => void
}

const initialUserState: UserState = {
	user: {
		_id: '',
		auth0Id: '',
		name: '',
		lastname: '',
		nickname: '',
		email: '',
		role: '',
		isVerified: false,
		language: '',
		avatar: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		lastLogin: new Date(),
	},
	logout: () => { }
}

export default initialUserState