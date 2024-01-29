import { IUser, IUserState } from "interfaces/user.interface"

const userState: IUser = {
	_id: '',
	auth0Id: '',
	name: '',
	lastname: '',
	email: '',
	role: '',
	isVerified: false,
	language: '',
	avatar: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	lastLogin: new Date(),
}

const initialUserState: IUserState = {
	user: userState,
	logout: () => { }
}

export default initialUserState