import { useReducer, useMemo, useCallback, memo } from 'react';
import LicensesContext from './LicensesContext';
import initialLicensesState from './initialLicensesState';
import licenseReducer from 'context/licenses/reducer/licenses.reducer';
import * as action from 'context/licenses/reducer/licenses.actions';
import { ChildrenProps } from 'interfaces/global';
import { useDauth } from 'dauth-context-react';
import { useTranslation } from 'react-i18next';

/**
 * Provides the context and actions related to licenses.
 * @param props - The children props.
 * @returns The LicensesProvider component.
 */
function LicensesProvider(props: ChildrenProps) {
  const [licensesState, dispatch] = useReducer(licenseReducer, initialLicensesState);
  const { getAccessToken } = useDauth();
  const { t: translate } = useTranslation();

  /**
   * Retrieves the licenses.
   */
  const getLicenses = useCallback(async () => {
    const token = await getAccessToken();
    action.getLicensesAction({ dispatch, token, translate });
  }, [getAccessToken, translate]);

  /**
   * Creates a new license.
   * @param projectName - The name of the project.
   */
  const postLicense = useCallback(
    async ({ projectName }: { projectName: string }) => {
      const token = await getAccessToken();
      action.postLicenseAction({ dispatch, projectName, token, translate });
    },
    [getAccessToken, translate]
  );

  /**
   * Sets the online status of a license.
   * @param licenseId - The ID of the license.
   * @param online - The online status.
   */
  const setLicenseOnline = useCallback(
    async ({ licenseId, online }: { licenseId: string; online: boolean }) => {
      const token = await getAccessToken();
      action.setLicenseOnlineAction({ dispatch, licenseId, online, token, translate });
    },
    [getAccessToken, translate]
  );

  /**
   * Deletes a license.
   * @param licenseId - The ID of the license.
   */
  const deleteLicense = useCallback(
    async ({ licenseId }: { licenseId: string }) => {
      const token = await getAccessToken();
      action.deleteLicenseAction({ dispatch, licenseId, token, translate });
    },
    [getAccessToken, translate]
  );

  /**
   * Retrieves the access token for a license.
   * @param licenseId - The ID of the license.
   */
  const getLicenseToken = useCallback(
    async ({ licenseId }: { licenseId: string }) => {
      const token = await getAccessToken();
      action.getLicenseTokenAction({ licenseId, token, translate });
    },
    [getAccessToken, translate]
  );

  /**
   * Refreshes the access token for a license.
   * @param licenseId - The ID of the license.
   */
  const refreshLicenseToken = useCallback(
    async ({ licenseId }: { licenseId: string }) => {
      const token = await getAccessToken();
      action.refreshLicenseTokenAction({ licenseId, token, translate });
    },
    [getAccessToken, translate]
  );

  /**
   * Retrieves the media associated with a license.
   * @param licenseId - The ID of the license.
   */
  const getLicenseMedia = useCallback(
    async ({ licenseId }: { licenseId: string }) => {
      const token = await getAccessToken();
      action.getLicenseMediaAction({ dispatch, licenseId, token, translate });
    },
    [getAccessToken, translate]
  );

  const memoProvider = useMemo(
    () => ({
      ...licensesState,
      getLicenses,
      postLicense,
      setLicenseOnline,
      deleteLicense,
      getLicenseToken,
      refreshLicenseToken,
      getLicenseMedia,
    }),
    [
      licensesState,
      getLicenses,
      postLicense,
      setLicenseOnline,
      deleteLicense,
      getLicenseToken,
      refreshLicenseToken,
      getLicenseMedia,
    ]
  );

  return <LicensesContext.Provider value={memoProvider}>{props.children}</LicensesContext.Provider>;
}

export default memo(LicensesProvider);
