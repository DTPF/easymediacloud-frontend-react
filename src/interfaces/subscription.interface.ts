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
}

export type SubscriptionType = 'free' | 'basic' | 'premium'