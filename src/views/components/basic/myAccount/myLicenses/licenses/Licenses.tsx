import './licenses.scss'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Dropdown, MenuProps, Progress, Switch } from 'antd'
import LicensesContext from 'context/licenses/LicensesContext'
import { ILicense } from 'interfaces/license.interface'
import { FaDotCircle } from 'react-icons/fa'
import { GrStatusGoodSmall } from "react-icons/gr";
import { GrUpdate } from "react-icons/gr";
import Spin from 'views/components/UI/spin'
import moment from 'moment'
import { DownCircleOutlined } from '@ant-design/icons'
import { colorGreen, colorOrange, colorRed } from 'scss/_variables'
import Tooltip from 'views/components/UI/tooltip'
import useWindowSizeReport from 'hooks/useWindowSizeReport'
import { BtnDefault, BtnLink, BtnPrimary } from 'views/components/UI/buttons'
import { useTranslation } from 'react-i18next'

function Licenses() {
  const { t } = useTranslation()
  const { licenses, isLoading } = useContext(LicensesContext)
  return (
    <div className='my-licenses__container'>
      {isLoading ? (
        <Spin />
      ) : (
        licenses.length === 0 ? (
          <div>{t('licenses_empty-msg')}</div>
        ) : (
          licenses.map((license, index) => {
            return (
              <div key={index}><License license={license} /></div>
            )
          })
        )
      )}
    </div>
  )
}

const MemoizedLicenses = memo(Licenses)
export default MemoizedLicenses

function License({ license }: { license: ILicense }) {
  const { t } = useTranslation()
  const [isMobile, innerWidth] = useWindowSizeReport()
  const sizePercentage = useMemo(
    () => Math.round(license.size * 100 / license.subscription.maxSize)
    , [license.size, license.subscription.maxSize]
  )
  const requestsPercentage = useMemo(
    () => Math.round(license.requestsInDataRange as number * 100 / license.subscription.maxRequests),
    [license.requestsInDataRange, license.subscription.maxRequests]
  )
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  useEffect(() => {
    let isMounted = true
    isMounted && setIsOpen(isMobile ? false : true)
    return () => { isMounted = false }
  }, [isMobile])

  const toggleCollapsible = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen])

  const getLicenseStatus = useMemo(() => {
    if (license.enabled === false) {
      return {
        color: colorRed,
        text: t('licenses_tooltip_license-not-active')
      }
    }
    if (
      license.enabled === true &&
      license.online === false
    ) {
      return {
        color: colorOrange,
        text: t('licenses_tooltip_license-not-online')
      }
    }
    if (
      license.enabled === true &&
      license.online === true &&
      license.subscription.enabled === false
    ) {
      return {
        color: colorOrange,
        text: t('licenses_tooltip_subscription-not-active')
      }
    }
    if (
      license.enabled === true &&
      license.online === true &&
      license.subscription.enabled === true
    ) {
      return {
        color: colorGreen,
        text: t('licenses_tooltip_license-subscription-online-active')
      }
    }
  }, [license.enabled, license.online, license.subscription.enabled, t])

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: (
          <div className='my-licenses__container--license__column-1--sub__text'>
            <FaDotCircle style={{ color: getLicenseStatus?.color }} />
            {getLicenseStatus?.text}
          </div>
        ),
      },
    ];
  }, [getLicenseStatus?.color, getLicenseStatus?.text])

  return (
    <>
      <div className='my-licenses__container--license'>
        <div className='my-licenses__container--license__column-1'>
          <div className='my-licenses__container--license__column-1--sub'>
            <i>
              {/* Status */}
              <Dropdown menu={{ items }} placement="bottomLeft">
                <GrStatusGoodSmall style={{ color: getLicenseStatus?.color }} />
              </Dropdown>
            </i>
            {/* Project name */}
            <Tooltip title={t('licenses_tooltip_project-name')}>
              <p className='my-licenses__container--license__column-1--sub__license-name'>
                {license.project}
              </p>
            </Tooltip>
            {/* Last update */}
            <Tooltip title={t('licenses_tooltip_last-update')}>
              <span className='my-licenses__container--license__column-1--sub__last-update'>
                | <GrUpdate className='my-licenses__container--license__column-1--sub__last-update--icon' />
                {moment(license.updatedAt).calendar()}
              </span>
            </Tooltip>
          </div>
          <div className='my-licenses__container--license__column-1--sub-2'>
            {/* Online */}
            <Tooltip
              title={
                license.online ?
                  t('licenses_tooltip_deactivate-license') :
                  t('licenses_tooltip_activate-license')
              }>
              <Switch
                checkedChildren="Online"
                unCheckedChildren="Offline"
                defaultChecked={license.online}
              />
            </Tooltip>
            {/* Toggle collapse */}
            <span onClick={toggleCollapsible}>
              <DownCircleOutlined
                className={`my-licenses__container--license__column-1--sub-2__rotate-icon${isOpen ? '--open' : ''}`}
              />
            </span>
          </div>
        </div>
        <div className='my-licenses__container--license__column-2'>
          <div className='my-licenses__container--license__column-2--size'>
            {/* Progress Size */}
            <h4 className='my-licenses__container--license__column-2--size__title'>
              {t('licenses_used-disk')}
            </h4>
            <div className='my-licenses__container--license__column-2--size__progress'>
              <Progress
                percent={sizePercentage}
                showInfo={false}
                style={{ display: 'flex', alignItems: 'center' }}
              />
              <span className='my-licenses__container--license__column-2--size__progress--span'>
                <Tooltip title={`${sizePercentage}% ${t('licenses_tooltip_used-disk')}`}>
                  {`${license.sizeT}/`}
                </Tooltip>
                <Tooltip title={t('licenses_tooltip_total-available-disk')}>
                  {`${license.subscription.maxSizeT}`}
                </Tooltip>
              </span>
            </div>
          </div>
          <div className='my-licenses__container--license__column-2--requests'>
            {/* Progress Requests */}
            <h4 className='my-licenses__container--license__column-2--requests__title'>
              {t('licenses_requests')}
            </h4>
            <div className='my-licenses__container--license__column-2--requests__progress'>
              <Progress
                percent={requestsPercentage}
                showInfo={false}
                style={{ display: 'flex', alignItems: 'center' }}
              />
              <span className='my-licenses__container--license__column-2--requests__progress--span'>
                <Tooltip title={`${requestsPercentage}% ${t('licenses_tooltip_used-requests')}`}>
                  {`${license.requestsInDataRange}/`}
                </Tooltip>
                <Tooltip title={t('licenses_tooltip_max-requests-month')}>
                  {`${license.subscription.maxRequests} ${t('licenses_max-requests-month')}`}
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
        <div className={`my-licenses__container--license__collapsible${isOpen ? '--open' : ''}`}>
          <div className={`my-licenses__container--license__collapsible--open__content-1`}>
            {/* Collapse */}
            <div>
              <div className='my-licenses__container--license__collapsible--open__content-1--item'>
                <span>{t('licenses_subscription')}:</span>
                <p>{license.subscription.type.toUpperCase()}</p>
              </div>
              <div className='my-licenses__container--license__collapsible--open__content-1--item'>
                <span>{t('licenses_archives')}:</span>
                <p>{license.totalFiles}</p>
              </div>
            </div>
            <div>
              <div className='my-licenses__container--license__collapsible--open__content-1--item'>
                <span>{t('licenses_created-at')}:</span>
                <p>{moment(license.createdAt).format('L')}</p>
              </div>
              <div className='my-licenses__container--license__collapsible--open__content-1--item'>
                <span>{t('licenses_valid-until')}:</span>
                <p>{moment(license.subscription.expire).format('L')}</p>
              </div>
            </div>
          </div>
          <div className={`my-licenses__container--license__collapsible--open__content-2`}>
            <p>
              License Id: <b>{license._id}</b>
            </p>
          </div>
          {/* Buttons */}
          <div className={`my-licenses__container--license__collapsible--open__buttons`}>
            <BtnLink
              size='small'
              shape='round'
              color={colorRed}
              onClick={() => { }}
            >
              {t('licenses_remove')} {innerWidth as number >= 420 ? t('licenses_license') : ''}
            </BtnLink>
            <div className={`my-licenses__container--license__collapsible--open__buttons--sub`}>
              <BtnDefault
                size='small'
                shape='round'
                onClick={() => { }}
              >
                {t('licenses_refresh-token')}
              </BtnDefault>
              <BtnPrimary
                size='small'
                shape='round'
                onClick={() => { }}
              >
                {t('licenses_see-token')}
              </BtnPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}