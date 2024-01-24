import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Dropdown, MenuProps, Progress, Switch } from 'antd'
import LicensesContext from 'context/licenses/LicensesContext'
import { ILicense } from 'interfaces/license.interface'
import { FaDotCircle } from 'react-icons/fa'
import { GrStatusGoodSmall } from "react-icons/gr";
import { GrUpdate } from "react-icons/gr";
import './licenses.scss'
import Spin from 'views/components/UI/spin/Spin'
import moment from 'moment'
import { DownCircleOutlined } from '@ant-design/icons'
import { colorGreen, colorOrange, colorRed } from 'scss/_variables'
import Tooltip from 'views/components/UI/tooltip/Tooltip'
import useWindowSizeReport from 'hooks/useWindowSizeReport'
import { BtnDefault, BtnLink, BtnPrimary } from 'views/components/UI/buttons/Buttons'

function Licenses() {
  const { licenses, isLoading } = useContext(LicensesContext)
  return (
    <div className='my-licenses__container'>
      {isLoading ? (
        <Spin />
      ) : (
        licenses.map((license, index) => {
          return (
            <div key={index}><License license={license} /></div>
          )
        })
      )}
    </div>
  )
}

export default Licenses

function License({ license }: { license: ILicense }) {
  moment.locale('es')
  const [isMobile, innerWidth] = useWindowSizeReport()
  const sizePercentage = useMemo(() => Math.round(license.size * 100 / license.subscription.maxSize), [license.size, license.subscription.maxSize])
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  useEffect(() => {
    let isMounted = true
    if (isMobile) {
      isMounted && setIsOpen(false)
    } else {
      isMounted && setIsOpen(true)
    }
    return () => { isMounted = false }
  }, [isMobile])

  const toggleCollapsible = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen])

  const getLicenseStatus = useMemo(() => {
    if (license.enabled === false) {
      return {
        color: colorRed,
        text: 'La licencia no está activa'
      }
    }
    if (license.enabled === true && license.online === false) {
      return {
        color: colorOrange,
        text: 'La licencia está activa pero no está online'
      }
    }
    if (license.enabled === true && license.online === true && license.subscription.enabled === false) {
      return {
        color: colorOrange,
        text: 'La licencia está activa y online pero la suscripción está desactivada'
      }
    }
    if (license.enabled === true && license.online === true && license.subscription.enabled === true) {
      return {
        color: colorGreen,
        text: 'La licencia está activa, online y la suscripción está activada'
      }
    }
  }, [license.enabled, license.online, license.subscription.enabled])

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: (
          <div className='my-licenses__container--license__column-1--sub__text' style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <FaDotCircle style={{ color: getLicenseStatus?.color }} /> {getLicenseStatus?.text}
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
            {/* Prject name */}
            <Tooltip title={'Nombre del proyecto'}>
              <p>{license.project}</p>
            </Tooltip>
            {/* Last update */}
            <Tooltip title={'Última subida de datos'}>
              <span className='my-licenses__container--license__column-1--sub__last-update'>
                | <GrUpdate className='my-licenses__container--license__column-1--sub__last-update--icon' />
                {moment(license.updatedAt).calendar()}
              </span>
            </Tooltip>
          </div>
          <div className='my-licenses__container--license__column-1--sub-2'>
            {/* Online */}
            <Tooltip title={license.online ? 'Desactivar licencia' : 'Activar licencia'}>
              <Switch checkedChildren="Online" unCheckedChildren="Offline" defaultChecked={license.online} />
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
          {/* Progress */}
          <Progress percent={sizePercentage} showInfo={false} style={{ display: 'flex', alignItems: 'center' }} />
          <span className='my-licenses__container--license__column-2--span'>
            <Tooltip title={`${sizePercentage}% ocupado`}>
              {`${license.sizeT}/`}
            </Tooltip>
            <Tooltip title={'Disco total disponible'}>
              {`${license.subscription.maxSizeT}`}
            </Tooltip>
          </span>
        </div>
        <div className={`my-licenses__container--license__collapsible${isOpen ? '--open' : ''}`}>
          <div className={`my-licenses__container--license__collapsible--open__content`}>
            {/* Collapse */}
            <div>
              <div className='my-licenses__container--license__collapsible--open__content--item'>
                <span>Suscripción:</span>
                <p>{license.subscription.type.toUpperCase()}</p>
              </div>
              <div className='my-licenses__container--license__collapsible--open__content--item'>
                <span>Archivos:</span>
                <p>{license.totalFiles}</p>
              </div>
            </div>

            <div>
              <div className='my-licenses__container--license__collapsible--open__content--item'>
                <span>Fecha creación:</span>
                <p>{moment(license.createdAt).format('L')}</p>
              </div>
              <div className='my-licenses__container--license__collapsible--open__content--item'>
                <span>Válido hasta:</span>
                <p>{moment(license.subscription.expire).format('L')}</p>
              </div>
            </div>

          </div>
          {/* Buttons */}
          <div className={`my-licenses__container--license__collapsible--open__buttons`}>
            <BtnLink
              size='small'
              shape='round'
              color={colorRed}
              onClick={() => { }}
            >
              Eliminar {innerWidth as number >= 420 ? 'licencia' : ''}
            </BtnLink>
            <div className={`my-licenses__container--license__collapsible--open__buttons--sub`}>
              <BtnDefault
                size='small'
                shape='round'
                onClick={() => { }}
              >
                Refrescar Token
              </BtnDefault>
              <BtnPrimary
                size='small'
                shape='round'
                onClick={() => { }}
              >
                Ver Token
              </BtnPrimary>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}