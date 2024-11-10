import './myLicenses.scss';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import LicensesContext from 'context/licenses/LicensesContext';
import Licenses from './licenses';
import Spin from 'views/components/UI/spin';
import { useDauth } from 'dauth-context-react';
import { BtnPrimary } from 'views/components/UI/buttons';
import { Input } from 'antd';
import { bgSecondaryDark } from 'scss/_variables';
import { messageError, messageWarning } from 'views/components/UI/messages';
import { useTranslation } from 'react-i18next';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import Icon from 'views/components/UI/icon/Icon';

function MyLicenses() {
  const { t } = useTranslation();
  const { licenses, getLicenses, postLicense } = useContext(LicensesContext);
  const { isLoading: isLoadingDauth } = useDauth();
  const [showCreateLicenseInput, setShowCreateLicenseInput] = useState(false);
  const [createLicenseFormValues, setCreateLicenseFormValues] = useState({
    projectName: '',
    name: '',
  });
  const validLicenseName = useMemo(() => {
    const regex = /^[a-zA-Z0-9-_]*$/;
    return regex.test(createLicenseFormValues.projectName);
  }, [createLicenseFormValues.projectName]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && !licenses[0]?._id) {
      getLicenses();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowCreateLicenseInput = useCallback(() => {
    if (!showCreateLicenseInput) {
      return setShowCreateLicenseInput(true);
    } else {
      if (!createLicenseFormValues.projectName || !createLicenseFormValues.name) {
        return messageWarning({ msg: t('licenses_create-license_empty-inputs') });
      }
      if (!validLicenseName) {
        return messageError({ msg: t('licenses_create-license_project-name_error') });
      }
      postLicense({ projectName: createLicenseFormValues.projectName, name: createLicenseFormValues.name });
    }
  }, [
    createLicenseFormValues.name,
    createLicenseFormValues.projectName,
    postLicense,
    showCreateLicenseInput,
    t,
    validLicenseName,
  ]);

  return (
    <div className="my-licenses">
      <div className="my-licenses__title-create-license">
        <h2>{t('licenses_title')}</h2>
        <div className="my-licenses__title-create-license--create">
          {showCreateLicenseInput && (
            <>
              <Tooltip title={t('licenses_create-license_close-input')}>
                <Icon type="close" onClick={() => setShowCreateLicenseInput(false)} color={bgSecondaryDark} />
              </Tooltip>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Input
                  style={{
                    width: '250px',
                    borderRadius: '25px',
                    color: validLicenseName ? 'black' : 'red',
                  }}
                  placeholder={t('licenses_create-license_name-input-placeholder')}
                  value={createLicenseFormValues.name}
                  onChange={(e) =>
                    setCreateLicenseFormValues({ ...createLicenseFormValues, name: e.target.value })
                  }
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleShowCreateLicenseInput();
                    }
                  }}
                  allowClear
                />
                <Input
                  style={{
                    width: '250px',
                    borderRadius: '25px',
                    color: validLicenseName ? 'black' : 'red',
                  }}
                  placeholder={t('licenses_create-license_project-input-placeholder')}
                  value={createLicenseFormValues.projectName}
                  onChange={(e) =>
                    setCreateLicenseFormValues({
                      ...createLicenseFormValues,
                      projectName: e.target.value.trim().toLowerCase(),
                    })
                  }
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleShowCreateLicenseInput();
                    }
                  }}
                  allowClear
                />
              </div>
            </>
          )}
          <BtnPrimary
            shape="round"
            onClick={handleShowCreateLicenseInput}
            className="my-licenses__title-create-license--create__btn-create"
            tooltip={t('licenses_create-license_create-license-btn')}
          >
            {!showCreateLicenseInput ? t('licenses_create-license_btn') : <Icon type="save" light />}
          </BtnPrimary>
        </div>
      </div>
      {isLoadingDauth ? <Spin /> : <Licenses />}
    </div>
  );
}

const MemoizedMyLicenses = memo(MyLicenses);
export default MemoizedMyLicenses;
