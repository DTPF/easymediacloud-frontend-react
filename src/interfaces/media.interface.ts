import { ILicense } from './license.interface';

/**
 * Represents a media object.
 */
export interface IMedia {
  _id: string;
  license: ILicense;
  directory: string;
  url: string;
  fileName: string;
  size?: number;
  sizeT?: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalRequests: number;
  __v: any;
}
