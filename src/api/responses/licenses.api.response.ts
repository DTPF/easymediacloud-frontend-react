// getLicenseTokenAPI //////////////////
export interface IgetLicenseTokenAPIResponse {
  response: Response;
  data: {
    status: string;
    message: string;
    mediaToken: string;
  };
}
////////////////////////////////////////
