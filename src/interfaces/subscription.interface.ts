/**
 * Represents a subscription.
 *
 * @interface ISubscription
 * @property {string} _id - The unique identifier for the subscription.
 * @property {string} user - The user associated with the subscription.
 * @property {string} license - The license type of the subscription.
 * @property {string} type - The type of the subscription (e.g., free, basic, premium).
 * @property {number} price - The price of the subscription.
 * @property {string} currency - The currency of the subscription price.
 * @property {number} maxSize - The maximum size allowed for the subscription.
 * @property {string} maxSizeT - The maximum size in a human-readable format.
 * @property {Date} expire - The expiration date of the subscription.
 * @property {boolean} enabled - Indicates whether the subscription is enabled.
 * @property {TRequestsDataRange} requestsDataRange - The data range for requests.
 * @property {number} maxRequests - The maximum number of requests allowed.
 * @property {Date} createdAt - The date and time when the subscription was created.
 * @property {Date} updatedAt - The date and time when the subscription was last updated.
 */

export interface ISubscription {
  _id?: string;
  user?: string;
  license?: string;
  type: string;
  price: number;
  currency: string;
  maxSize: number;
  maxSizeT?: string;
  expire?: Date;
  enabled: boolean;
  requestsDataRange: TRequestsDataRange;
  maxRequests: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TRequestsDataRange = {
  quantity: number;
  cicle: string;
};

export type SubscriptionType = 'free' | 'basic' | 'premium';
