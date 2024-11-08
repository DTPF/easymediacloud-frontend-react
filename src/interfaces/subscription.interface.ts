/**
 * Represents a subscription.
 */
export interface ISubscription {
  /**
   * The unique identifier of the subscription.
   */
  _id?: string;

  /**
   * The user associated with the subscription.
   */
  user?: string;

  /**
   * The license of the subscription.
   */
  license?: string;

  /**
   * The type of the subscription.
   */
  type: string;

  /**
   * The price of the subscription.
   */
  price: number;

  /**
   * The currency of the subscription.
   */
  currency: string;

  /**
   * The maximum size of the subscription.
   */
  maxSize: number;

  /**
   * The maximum size type of the subscription.
   */
  maxSizeT?: string;

  /**
   * The expiration date of the subscription.
   */
  expire?: Date;

  /**
   * Indicates whether the subscription is enabled or not.
   */
  enabled: boolean;

  /**
   * The range of requests data for the subscription.
   */
  requestsDataRange: TRequestsDataRange;

  /**
   * The maximum number of requests for the subscription.
   */
  maxRequests: number;

  /**
   * The creation date of the subscription.
   */
  createdAt: Date;

  /**
   * The last update date of the subscription.
   */
  updatedAt: Date;
}

/**
 * Represents the range of requests data for a subscription.
 */
export type TRequestsDataRange = {
  /**
   * The quantity of requests data.
   */
  quantity: number;

  /**
   * The cycle of requests data.
   */
  cicle: string;
};

/**
 * Represents the type of a subscription.
 */
export type SubscriptionType = 'free' | 'basic' | 'premium';
