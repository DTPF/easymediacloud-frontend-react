import { Card, Divider, Image } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BtnDefault, BtnPrimary } from 'views/components/UI/buttons';
import Spin from 'views/components/UI/spin/Spin';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import './license.scss'
import moment from 'moment';
import { GrUpdate } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import { FaEye } from "react-icons/fa6";

function License() {
  const { t } = useTranslation();
  const { id } = useParams()
  const { licenses, licenseSelected, getLicenses, getLicenseMedia, isLoadingMedia } = useContext(LicensesContext)
  const { Meta } = Card;

  useEffect(() => {
    let isMounted = true
    if (licenses.length === 0) {
      isMounted && getLicenses()
    }
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (!id) return
    let isMounted = true
    if (!licenseSelected?.mediaPagination?.media.length || licenseSelected?.mediaPagination?.media.length === 0) {
      isMounted && getLicenseMedia({ licenseId: id })
    }
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, licenseSelected?.mediaPagination?.media.length])

  return (
    <div className='license'>
      {(isLoadingMedia || !licenseSelected) && <Spin />}
      <>
        <section className='license__section'>
          <div className='license__section--header'>
            {/* Project name */}
            <Tooltip title={t('licenses_tooltip_project-name')}>
              <h2 className='license__section--header__license-name'>
                {licenseSelected?.project}
              </h2>
            </Tooltip>
            {/* Last update */}
            <Tooltip title={t('licenses_tooltip_last-update')}>
              <span className='license__section--header__last-update'>
                | <GrUpdate className='license__section--header__last-update--icon' />
                {moment(licenseSelected?.updatedAt).calendar()}
              </span>
            </Tooltip>
          </div>

          <Divider />
          <div className='license__section__items-container'>
            <h3>Imágenes</h3>
            <div className='license__section__items-container__items'>
              {licenseSelected?.mediaPagination?.media?.map((media, index) => {
                return (
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    className='license__section__items-container__items--card'
                    cover={<Image alt={`${licenseSelected?.project} archive`} className='license__section__items-container__items--card__img' src={media.url} />}
                    key={index}
                  >
                    <Meta
                      title={
                        <div className='license__section__items-container__items--card__title'>
                          <span>
                            {media.type ? media.type : 'no-type'}
                          </span>
                          <p>
                            {media.size}
                          </p>
                        </div>
                      }
                      description={
                        <div>
                          <Tooltip title={'Total visualizations'}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 5 }}>
                              <FaEye style={{ fontSize: '1.3rem', paddingTop: 0 }} />
                              {media.totalRequests}
                            </span>
                          </Tooltip>
                          <div style={{ display: 'flex', gap: '10px', marginTop: 10 }}>
                            <Tooltip title={media._id}>
                              <span>
                                <BtnDefault shape='round' size='small'>Id</BtnDefault>
                              </span>
                            </Tooltip>
                            <Tooltip title={media.url}>
                              <span>
                                <BtnPrimary shape='round' size='small'>Url</BtnPrimary>
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </>
    </div>
  )
}

export default License