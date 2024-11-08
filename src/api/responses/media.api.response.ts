import { IMedia } from 'interfaces/license.interface';

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
