import { ISubscription } from "./subscription.interface"
import { IDauthUser } from "./user.interface"

/**
 * Represents the state of the license feature in the application.
 */
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

/**
 * Represents a license.
 */
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

/**
 * Represents the pagination information for media items.
 */
export interface IMediaPagination {
  media: IMedia[]
  index: number
  limit: number
}

/**
 * Represents a media item.
 */
export interface IMedia {
  _id: string,
  url: string,
  size: number,
  type: string,
  enabled: boolean,
  totalRequests: number,
  createdAt: string,
}

/**
 * Represents the data range for requests.
 */
export interface IRequestsDataRange {
  quantity: number
  cicle: string
}

