import { Divider } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spin from 'views/components/UI/spin/Spin';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import './license.scss';
import moment from 'moment';
import { GrUpdate } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import UploadImage from './components/uploadImage/UploadImage';
import LicenseImages from './components/licenseImages/LicenseImages';
import { useDauth } from 'dauth-context-react';

function License() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { licenses, licenseSelected, getLicenses, getLicenseMedia, isLoadingMedia } =
    useContext(LicensesContext);
  const { isAuthenticated } = useDauth();

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated && licenses.length === 0) {
      isMounted && getLicenses();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    if (!isAuthenticated) return;
    if (
      !licenseSelected?.mediaPagination?.media.length ||
      licenseSelected?.mediaPagination?.media.length === 0
    ) {
      isMounted && getLicenseMedia({ licenseId: id });
    }
    return () => {
      isMounted = false;
    };
  }, [getLicenseMedia, id, isAuthenticated, licenseSelected?.mediaPagination?.media.length]);

  return (
    <div className="license">
      {(isLoadingMedia || !licenseSelected) && <Spin />}
      <>
        <section className="license__section">
          <div className="license__section--header">
            {/* Project name */}
            <Tooltip title={t('licenses_tooltip_project-name')}>
              <h2 className="license__section--header__license-name">{licenseSelected?.project}</h2>
            </Tooltip>
            {/* Last update */}
            <Tooltip title={t('licenses_tooltip_last-update')}>
              <span className="license__section--header__last-update">
                | <GrUpdate className="license__section--header__last-update--icon" />
                {moment(licenseSelected?.updatedAt).calendar()}
              </span>
            </Tooltip>
          </div>
          <Divider />
          <UploadImage />
          <Divider />
          <LicenseImages />
        </section>
      </>
    </div>
  );
}

const MemoizedLicense = memo(License);
export default MemoizedLicense;
