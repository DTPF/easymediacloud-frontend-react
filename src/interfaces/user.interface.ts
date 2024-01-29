export interface IUserState {
  user: IUser,
  logout: () => void
}

export interface IUser {
  _id: string
  auth0Id: string
  name: string
  lastname: string
  email: string
  role: string
  isVerified: boolean
  language: string
  avatar: string
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
}

export interface IAuth0User {
  given_name?: string,
  family_name?: string,
  nickname?: string,
  name?: string,
  picture?: string,
  locale?: string,
  updated_at?: string,
  email?: string,
  email_verified?: boolean,
  sub?: string
}