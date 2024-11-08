import './licenseImages.scss';
import { Card, Image, Switch } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext } from 'react';
import { BtnDefault, BtnPrimary } from 'views/components/UI/buttons';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import { FaEye, FaRegTrashCan } from 'react-icons/fa6';
import { copyToClipboard } from 'utils/copyToClipboard';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { FaRegCopy } from 'react-icons/fa';

function LicenseImages() {
  const { licenseSelected } = useContext(LicensesContext);
  const { Meta } = Card;
  return (
    <div className="license__images__items-container">
      <h3>Imágenes</h3>
      <div className="license__images__items-container__items">
        {licenseSelected?.mediaPagination?.media?.map((media, index) => {
          return (
            <Card
              hoverable
              style={{ width: '100%' }}
              className="license__images__items-container__items--card"
              cover={
                <Image
                  alt={`${licenseSelected?.project} archive`}
                  className="license__images__items-container__items--card__img"
                  src={media.url}
                />
              }
              key={index}
            >
              <Meta
                title={
                  <div className="license__images__items-container__items--card__title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <GrStatusGoodSmall
                        style={{ fontSize: '1.5rem', color: media.enabled ? 'green' : 'red' }}
                      />
                      <Switch
                        checkedChildren="On"
                        unCheckedChildren="Off"
                        defaultChecked={media.enabled}
                        onChange={(checked) => console.log(checked)}
                        disabled
                      />
                    </div>
                    <Tooltip title={'Visualizaciones totales'}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 0 }}>
                        <FaEye style={{ fontSize: '1.3rem', paddingTop: 0 }} />
                        <p style={{ margin: 0, padding: 0, fontSize: '1rem' }}>{media.totalRequests}</p>
                      </span>
                    </Tooltip>
                  </div>
                }
                description={
                  <div>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: 15 }}
                    >
                      <span>{media.type ? media.type : 'no-type'}</span>
                      <p>{media.sizeT}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                      <span style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <BtnDefault
                          shape="round"
                          size="small"
                          onClick={() => copyToClipboard(media._id)}
                          tooltip={'Copiar id al portapapeles'}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaRegCopy style={{ fontSize: '1rem' }} /> Id
                          </span>
                        </BtnDefault>
                        <BtnPrimary
                          shape="round"
                          size="small"
                          onClick={() => copyToClipboard(media.url)}
                          tooltip={'Copiar url al portapapeles'}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaRegCopy style={{ fontSize: '1rem' }} /> Url
                          </span>
                        </BtnPrimary>
                      </span>
                      <BtnPrimary
                        shape="round"
                        size="small"
                        onClick={() => console.log('Eliminar imagen')}
                        tooltip={'Eliminar imagen'}
                        danger
                        disabled
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaRegTrashCan style={{ fontSize: '1rem', margin: 0, marginTop: 2 }} />
                        </span>
                      </BtnPrimary>
                    </div>
                  </div>
                }
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const MemoizedLicenseImages = memo(LicenseImages);
export default MemoizedLicenseImages;
