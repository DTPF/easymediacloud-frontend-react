/**
 * Fetches media items by license ID from the server.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.licenseId - The ID of the license to fetch media for.
 * @param {number} params.index - The index of the first media item to fetch.
 * @param {number} params.limit - The maximum number of media items to fetch.
 * @param {string} params.token - The authorization token for the API request.
 * @returns {Promise<IgetMediaByLicenseAPIResponse>} A promise that resolves to the API response.
 */
import config from 'config/config';
import { IgetMediaByLicenseAPIResponse } from 'interfaces/media.interface';

export const getMediaByLicenseAPI = async ({
  licenseId,
  index,
  limit,
  token,
}: {
  licenseId: string;
  index: number;
  limit: number;
  token: string;
}): Promise<IgetMediaByLicenseAPIResponse> => {
  const params = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(
    `${config.app.SERVER_URL}/get-media-by-license/${licenseId}?index=${index}&limit=${limit}`,
    params
  );
  const data = await response.json();
  return { response, data };
};
