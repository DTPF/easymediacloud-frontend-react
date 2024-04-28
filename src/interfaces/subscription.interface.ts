export interface ISubscription {
  _id?: string
  user?: string
  license?: string
  type: string
  price: number
  currency: string
  maxSize: number
  maxSizeT?: string
  expire?: Date
  enabled: boolean
  requestsDataRange: TRequestsDataRange
  maxRequests: number
  createdAt: Date
  updatedAt: Date
}

export type TRequestsDataRange = {
  quantity: number
  cicle: string
}

export type SubscriptionType = 'free' | 'basic' | 'premium'
