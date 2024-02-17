export interface IDauthUser {
  _id: string
  dauthLicense?: string
  sid: string
  name: string
  lastname: string
  nickname: string
  email: string
  is_verified: boolean
  language: string
  avatar: string
  role: string
  tel_prefix: string
  tel_suffix: string
  createdAt: Date
  updatedAt: Date
  last_login: Date
}