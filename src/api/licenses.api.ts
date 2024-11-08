import config from 'config/config';
import { IgetLicenseTokenAPIResponse } from './responses/licenses.api.response';

/**
 * Retrieves the licenses associated with the authenticated user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const getMyLicensesAPI = async (token: string): Promise<any> => {
  const params = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${config.app.SERVER_URL}/get-my-licenses`, params);
  const data = await response.json();
  return { response, data };
};

/**
 * Creates a new license for a project.
 * @param projectName - The name of the project.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const createLicenseAPI = async ({
  projectName,
  token,
}: {
  projectName: string;
  token: string;
}): Promise<any> => {
  const params = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project: projectName }),
  };
  const response = await fetch(`${config.app.SERVER_URL}/create-license`, params);
  const data = await response.json();
  return { response, data };
};

/**
 * Sets the online status of a license.
 * @param licenseId - The ID of the license.
 * @param online - The online status to set.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const setLicenseOnlineAPI = async (
  licenseId: string,
  online: boolean,
  token: string
): Promise<any> => {
  const params = {
    method: 'PATCH',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ online }),
  };
  const response = await fetch(`${config.app.SERVER_URL}/set-license-online/${licenseId}`, params);
  const data = await response.json();
  return { response, data };
};

/**
 * Deletes a license.
 * @param licenseId - The ID of the license to delete.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const deleteLicenseAPI = async ({
  licenseId,
  token,
}: {
  licenseId: string;
  token: string;
}): Promise<any> => {
  const params = {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  };
  const response = await fetch(`${config.app.SERVER_URL}/delete-license/${licenseId}`, params);
  const data = await response.json();
  return { response, data };
};

/**
 * Retrieves the token for a license.
 * @param licenseId - The ID of the license.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const getLicenseTokenAPI = async ({
  licenseId,
  token,
}: {
  licenseId: string;
  token: string;
}): Promise<IgetLicenseTokenAPIResponse> => {
  const params = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${config.app.SERVER_URL}/get-license-token/${licenseId}`, params);
  const data = await response.json();
  return { response, data };
};

/**
 * Refreshes the token for a license.
 * @param licenseId - The ID of the license.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an object containing the response and data.
 */
export const refreshLicenseTokenAPI = async (licenseId: string, token: string): Promise<any> => {
  const params = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${config.app.SERVER_URL}/refresh-license-token/${licenseId}`, params);
  const data = await response.json();
  return { response, data };
};
