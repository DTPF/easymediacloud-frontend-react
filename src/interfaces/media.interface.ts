/**
 * Represents a media item.
 *
 * @interface IMedia
 * @property {string} _id - The unique identifier for the media item.
 * @property {string} user - The user associated with the media item.
 * @property {string} license - The license type of the media item.
 * @property {string} url - The URL where the media item is located.
 * @property {string} fileName - The name of the media file.
 * @property {number} size - The size of the media file in bytes.
 * @property {string} sizeT - The size of the media file in a human-readable format.
 * @property {string} type - The type of the media file (e.g., image, video).
 * @property {boolean} enabled - Indicates whether the media item is enabled.
 * @property {number} totalRequests - The total number of requests for the media item.
 * @property {string} createdAt - The date and time when the media item was created.
 * @property {string} updatedAt - The date and time when the media item was last updated.
 */

/**
 * Represents the response from the getMediaByLicenseAPI.
 *
 * @interface IgetMediaByLicenseAPIResponse
 * @property {Response} response - The HTTP response object.
 * @property {Object} data - The data returned from the API.
 * @property {string} data.status - The status of the API response.
 * @property {string} data.message - The message returned from the API.
 * @property {Array<IMedia>} data.media - An array of media items returned from the API.
 */
export interface IMedia {
  _id: string;
  user: string;
  license: string;
  url: string;
  fileName: string;
  size: number;
  sizeT: string;
  type: string;
  enabled: boolean;
  totalRequests: number;
  createdAt: string;
  updatedAt: string;
}

// API ////////////////////////////////////////////////
///////////////////////////////////////////////////////

// getMediaByLicenseAPI //////////////////
export interface IgetMediaByLicenseAPIResponse {
  response: Response;
  data: {
    status: string;
    message: string;
    media: Array<IMedia>;
  };
}
//////////////////////////////////////////
