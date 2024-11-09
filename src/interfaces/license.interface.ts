import { IMedia } from './media.interface';
import { IResponse } from './global';
import { ISubscription } from './subscription.interface';

/**
 * Represents the state of the license feature in the application.
 *
 * @interface ILicenseState
 * @property {ILicense[]} licenses - Array of licenses.
 * @property {ILicense | null} licenseSelected - The currently selected license or null if none is selected.
 * @property {boolean} isLoading - Indicates if the licenses are being loaded.
 * @property {boolean} isLoadingMedia - Indicates if the media items are being loaded.
 * @property {() => void} getLicenses - Function to fetch licenses.
 * @property {({ projectName }: { projectName: string }) => void} postLicense - Function to post a new license.
 * @property {({ licenseId, online }: { licenseId: string; online: boolean }) => void} setLicenseOnline - Function to set a license online or offline.
 * @property {({ licenseId }: { licenseId: string }) => void} deleteLicense - Function to delete a license.
 * @property {({ licenseId }: { licenseId: string }) => void} getLicenseToken - Function to get a license token.
 * @property {({ licenseId }: { licenseId: string }) => void} refreshLicenseToken - Function to refresh a license token.
 * @property {({ licenseId }: { licenseId: string }) => void} getLicenseMedia - Function to get media items for a license.
 */

/**
 * Represents a license.
 *
 * @interface ILicense
 * @extends {IgetMyLicensesAPIResponseLicense}
 * @property {IMediaPagination} mediaPagination - Pagination information for media items.
 */

/**
 * Represents the pagination information for media items.
 *
 * @interface IMediaPagination
 * @property {IMedia[]} media - Array of media items.
 * @property {number} index - Current index of the pagination.
 * @property {number} limit - Limit of media items per page.
 */

/**
 * Represents a media item.
 *
 * @interface IMedia
 * @property {string} _id - Unique identifier of the media item.
 * @property {string} user - User associated with the media item.
 * @property {string} license - License associated with the media item.
 * @property {string} url - URL of the media item.
 * @property {string} fileName - File name of the media item.
 * @property {number} size - Size of the media item in bytes.
 * @property {string} sizeT - Human-readable size of the media item.
 * @property {string} type - Type of the media item.
 * @property {boolean} enabled - Indicates if the media item is enabled.
 * @property {number} totalRequests - Total number of requests for the media item.
 * @property {string} createdAt - Creation date of the media item.
 * @property {string} updatedAt - Last update date of the media item.
 */

/**
 * Represents the data range for requests.
 *
 * @interface IRequestsDataRange
 * @property {number} quantity - Quantity of requests.
 * @property {string} cicle - Cycle of the requests.
 */

/**
 * Represents the state of the license feature in the application.
 */

/**
 * Represents a license.
 */

/**
 * Represents the pagination information for media items.
 */

/**
 * Represents the data range for requests.
 */

// API ////////////////////////////////////////////////
///////////////////////////////////////////////////////

// getMyLicensesAPI //////////////////
/**
 * Represents the response license from the getMyLicenses API.
 *
 * @interface IgetMyLicensesAPIResponseLicense
 * @property {string} _id - Unique identifier of the license.
 * @property {string} name - Name of the license.
 * @property {string} project - Project associated with the license.
 * @property {boolean} enabled - Indicates if the license is enabled.
 * @property {boolean} online - Indicates if the license is online.
 * @property {number} size - Size of the license in bytes.
 * @property {string} sizeT - Human-readable size of the license.
 * @property {number} totalFiles - Total number of files associated with the license.
 * @property {number} totalRequests - Total number of requests for the license.
 * @property {number} requestsInDataRange - Number of requests in the data range.
 * @property {string} createdAt - Creation date of the license.
 * @property {string} updatedAt - Last update date of the license.
 * @property {ISubscription} subscription - Subscription associated with the license.
 */

/**
 * Represents the response from the getMyLicenses API.
 *
 * @interface IgetMyLicensesAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 * @property {IgetMyLicensesAPIResponseLicense[]} data.licenses - Array of licenses.
 */
//////////////////////////////////////

// createLicenseAPI //////////////////
/**
 * Represents the response from the createLicense API.
 *
 * @interface IcreateLicenseAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 * @property {IgetMyLicensesAPIResponseLicense} data.license - The created license.
 */
//////////////////////////////////////

// setLicenseOnlineAPI //////////////////
/**
 * Represents the response from the setLicenseOnline API.
 *
 * @interface IsetLicenseOnlineAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 */
/////////////////////////////////////////

// deleteLicenseAPI //////////////////
/**
 * Represents the response from the deleteLicense API.
 *
 * @interface IdeleteLicenseAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 */
//////////////////////////////////////

// getLicenseTokenAPI //////////////////
/**
 * Represents the response from the getLicenseToken API.
 *
 * @interface IgetLicenseTokenAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 * @property {string} data.mediaToken - Media token for the license.
 */
////////////////////////////////////////

// refreshLicenseTokenAPI //////////////////
/**
 * Represents the response from the refreshLicenseToken API.
 *
 * @interface IrefreshLicenseTokenAPIResponse
 * @extends {IResponse}
 * @property {Object} data - Data object containing the response details.
 * @property {string} data.status - Status of the response.
 * @property {string} data.message - Message of the response.
 * @property {string} data.mediaToken - Refreshed media token for the license.
 */
////////////////////////////////////////////

/**
 * Represents the state of the license feature in the application.
 */
export interface ILicenseState {
  licenses: ILicense[];
  licenseSelected: ILicense | null;
  isLoading: boolean;
  isLoadingMedia: boolean;
  getLicenses: () => void;
  postLicense: ({ projectName, name }: { projectName: string; name: string }) => void;
  setLicenseOnline: ({ licenseId, online }: { licenseId: string; online: boolean }) => void;
  deleteLicense: ({ licenseId }: { licenseId: string }) => void;
  getLicenseToken: ({ licenseId }: { licenseId: string }) => void;
  refreshLicenseToken: ({ licenseId }: { licenseId: string }) => void;
  getLicenseMedia: ({ licenseId }: { licenseId: string }) => void;
}

/**
 * Represents a license.
 */
export interface ILicense extends IgetMyLicensesAPIResponseLicense {
  mediaPagination: IMediaPagination;
}

/**
 * Represents the pagination information for media items.
 */
export interface IMediaPagination {
  media: IMedia[];
  index: number;
  limit: number;
}

/**
 * Represents the data range for requests.
 */
export interface IRequestsDataRange {
  quantity: number;
  cicle: string;
}

// API ////////////////////////////////////////////////
///////////////////////////////////////////////////////

// getMyLicensesAPI //////////////////
export interface IgetMyLicensesAPIResponseLicense {
  _id: string;
  name: string;
  project: string;
  enabled: boolean;
  online: boolean;
  size: number;
  sizeT: string;
  totalFiles: number;
  totalRequests: number;
  requestsInDataRange: number;
  createdAt: string;
  updatedAt: string;
  subscription: ISubscription;
}
export interface IgetMyLicensesAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
    licenses: Array<IgetMyLicensesAPIResponseLicense>;
  };
}
//////////////////////////////////////

// createLicenseAPI //////////////////
export interface IcreateLicenseAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
    license: IgetMyLicensesAPIResponseLicense;
  };
}
//////////////////////////////////////

// setLicenseOnlineAPI //////////////////
export interface IsetLicenseOnlineAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
  };
}
/////////////////////////////////////////

// deleteLicenseAPI //////////////////
export interface IdeleteLicenseAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
  };
}
//////////////////////////////////////

// getLicenseTokenAPI //////////////////
export interface IgetLicenseTokenAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
    mediaToken: string;
  };
}
////////////////////////////////////////

// refreshLicenseTokenAPI //////////////////
export interface IrefreshLicenseTokenAPIResponse extends IResponse {
  data: {
    status: string;
    message: string;
    mediaToken: string;
  };
}
////////////////////////////////////////////
