export interface IDauthUser {
  _id: string;
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  isVerified: boolean;
  language: string;
  avatar: string;
  role: string;
  telPrefix: string;
  telSuffix: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
