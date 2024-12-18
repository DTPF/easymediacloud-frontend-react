import { Divider, Skeleton, Spin } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import './license.scss';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import UploadImage from './components/uploadImage/UploadImage';
import LicenseImages from './components/licenseImages/LicenseImages';
import { useDauth } from 'dauth-context-react';
import Icon from 'views/components/UI/icon/Icon';

function License() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { licenseSelected, getLicenses, getLicenseMedia } = useContext(LicensesContext);
  const { isAuthenticated, isLoading } = useDauth();

  useEffect(() => {
    let isMounted = true;
    async function get() {
      if (isMounted && isAuthenticated && !isLoading && id) {
        const success = await getLicenses();
        if (success) {
          getLicenseMedia({ licenseId: id });
        }
      }
    }
    get();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated, isLoading]);

  return (
    <div className="license">
      <section className="license__section">
        <div className="license__section--header">
          {/* Project name */}
          {licenseSelected?.name && licenseSelected?.updatedAt ? (
            <>
              <Tooltip title={t('licenses_tooltip_project-name')}>
                <h2 className="license__section--header__license-name">
                  {licenseSelected?.name ? licenseSelected?.name : <Spin />}
                </h2>
              </Tooltip>
              {/* Last update */}
              <Tooltip title={t('licenses_tooltip_last-update')}>
                <span className="license__section--header__last-update">
                  <Icon
                    type="update"
                    iconType="secondary"
                    fontSize="1rem"
                    style={{ marginRight: 5, marginLeft: 10 }}
                  />
                  {moment(licenseSelected?.updatedAt).calendar()}
                </span>
              </Tooltip>
            </>
          ) : (
            <Skeleton.Node active={true} style={{ width: 170, height: 30, marginLeft: 10 }} />
          )}
        </div>
        <Divider />
        <UploadImage />
        <Divider />
        <LicenseImages />
      </section>
    </div>
  );
}

const MemoizedLicense = memo(License);
export default MemoizedLicense;
