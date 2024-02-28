import './myLicenses.scss'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import LicensesContext from 'context/licenses/LicensesContext';
import Licenses from './licenses';
import Spin from 'views/components/UI/spin';
import { useDauth } from 'dauth-context-react';
import { BtnPrimary } from 'views/components/UI/buttons';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { bgSecondaryDark } from 'scss/_variables';
import { FaRegSave } from "react-icons/fa";
import { messageError } from 'views/components/UI/messages';
import { useTranslation } from 'react-i18next';
import Tooltip from 'views/components/UI/tooltip/Tooltip';

function MyLicenses() {
  const { t } = useTranslation()
  const { licenses, getLicenses, postLicense } = useContext(LicensesContext)
  const { isLoading: isLoadingDauth } = useDauth()
  const [showCreateLicenseInput, setShowCreateLicenseInput] = useState(false)
  const [licenseName, setLicenseName] = useState('')
  const validLicenseName = useMemo(() => {
    const regex = /^[a-zA-Z0-9-_]*$/;
    return regex.test(licenseName)
  }, [licenseName])

  useEffect(() => {
    let isMounted = true
    if (isMounted && !licenses[0]?._id) {
      getLicenses()
    }
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowCreateLicenseInput = useCallback(() => {
    if (!showCreateLicenseInput) {
      return setShowCreateLicenseInput(true)
    } else {
      if (!licenseName) return
      if (!validLicenseName) {
        return messageError({ msg: t('licenses_create-license_project-name_error') })
      }
      postLicense({ projectName: licenseName })
    }
  }, [licenseName, postLicense, showCreateLicenseInput, t, validLicenseName])

  return (
    <div className='my-licenses'>
      <div className='my-licenses__title-create-license'>
        <h2>{t('licenses_title')}</h2>
        <div className='my-licenses__title-create-license--create'>
          {showCreateLicenseInput && (
            <>
              <Tooltip title={t('licenses_create-license_close-input')}>
                <CloseOutlined
                  onClick={() => setShowCreateLicenseInput(false)}
                  style={{ fontSize: '1.4rem', color: bgSecondaryDark }}
                />
              </Tooltip>
              <Input
                style={{
                  width: '250px',
                  borderRadius: '25px',
                  color: validLicenseName ? 'black' : 'red'
                }}
                placeholder={t('licenses_create-license_input-placeholder')}
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value.trim())}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleShowCreateLicenseInput()
                  }
                }}
                allowClear
              />
            </>
          )}
          <BtnPrimary
            shape='round'
            onClick={handleShowCreateLicenseInput}
            className='my-licenses__title-create-license--create__btn-create'
          >
            {!showCreateLicenseInput ?
              t('licenses_create-license_btn') :
              <Tooltip title={t('licenses_create-license_create-license-btn')}>
                <FaRegSave style={{ fontSize: '1.3rem', marginTop: 4 }} />
              </Tooltip>
            }
          </BtnPrimary>
        </div>
      </div>
      {isLoadingDauth ? (
        <Spin />
      ) : (
        <Licenses />
      )}
    </div>
  )
}

export default MyLicenses