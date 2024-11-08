import config from 'config/config';
import { IgetMediaByLicenseAPIResponse } from './responses/media.api.response';

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
