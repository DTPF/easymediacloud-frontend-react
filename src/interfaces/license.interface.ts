import { ISubscription } from "./subscription.interface"
import { IDauthUser } from "./user.interface"

export interface ILicenseState {
  licenses: ILicense[],
  licenseSelected: ILicense | null,
  isLoading: boolean,
  isLoadingMedia: boolean,
  getLicenses: () => void,
  postLicense: ({ projectName }: { projectName: string }) => void,
  setLicenseOnline: ({ licenseId, online }: { licenseId: string, online: boolean }) => void,
  deleteLicense: ({ licenseId }: { licenseId: string }) => void,
  getLicenseToken: ({ licenseId }: { licenseId: string }) => void,
  refreshLicenseToken: ({ licenseId }: { licenseId: string }) => void
  getLicenseMedia: ({ licenseId }: { licenseId: string }) => void
}

export interface ILicense {
  _id?: string
  user?: IDauthUser
  project: string
  apiKey?: string
  enabled?: boolean
  online?: boolean
  size: number
  sizeT: string
  totalFiles?: number
  subscription: ISubscription
  totalRequests?: number
  requestsInDataRange?: number
  mediaPagination: IMediaPagination
  createdAt: Date | string
  updatedAt: Date | string
  __v?: any
}

interface IMediaPagination {
  media: IMedia[]
  index: number
  limit: number
}

interface IMedia {
  _id: string,
  url: string,
  size: number,
  type: string,
  enabled: boolean,
  totalRequests: number,
  createdAt: string,
}

export interface IRequestsDataRange {
  quantity: number
  cicle: string
}