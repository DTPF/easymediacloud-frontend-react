import './licenseImages.scss';
import { Badge, Card, Image } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext } from 'react';
import { BtnPrimary } from 'views/components/UI/buttons';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import { FaEye, FaRegTrashCan } from 'react-icons/fa6';
import { copyToClipboard } from 'utils/copyToClipboard';
import { FaRegCopy, FaShareAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { handleShare } from 'utils/handleShare';
import Spin from 'views/components/UI/spin/Spin';
import { bgMedium } from 'scss/_variables';
import { IMedia } from 'interfaces/media.interface';

function LicenseImages() {
  const { licenseSelected } = useContext(LicensesContext);
  const { t } = useTranslation();

  if (!licenseSelected) return <Spin />;

  return (
    <div className="license__images__items-container">
      <h3>{t('license-images_title')}</h3>
      <div className="license__images__items-container__items">
        {licenseSelected.mediaPagination?.media?.map((media, index) => {
          return media.url.includes('man_upload') ? (
            <Badge.Ribbon text="Manual" color={bgMedium} key={index}>
              <CardContainer media={media} />
            </Badge.Ribbon>
          ) : (
            <CardContainer media={media} key={index} />
          );
        })}
      </div>
    </div>
  );
}

const MemoizedLicenseImages = memo(LicenseImages);
export default MemoizedLicenseImages;

function CardContainer({ media }: { media: IMedia }) {
  const { licenseSelected } = useContext(LicensesContext);
  const { t } = useTranslation();
  const { Meta } = Card;

  if (!licenseSelected) return <Spin />;

  return (
    <Card
      hoverable
      style={{ width: '100%' }}
      className="license__images__items-container__items--card"
      cover={
        <Image
          alt={`${licenseSelected.project} archive`}
          className="license__images__items-container__items--card__img"
          src={media.url}
        />
      }
    >
      <Meta
        title={
          <div className="license__images__items-container__items--card__title">
            <Tooltip title={t('license-images_total-visualizations_tooltip')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 0 }}>
                <FaEye style={{ fontSize: '1.3rem', paddingTop: 0 }} />
                <p style={{ margin: 0, padding: 0, fontSize: '1rem' }}>{media.totalRequests}</p>
              </span>
            </Tooltip>
            <Tooltip title={t('share_label')}>
              <FaShareAlt
                style={{ fontSize: '1rem' }}
                onClick={() => {
                  handleShare({ url: media.url, translate: t, send: 'url' });
                  copyToClipboard({ text: media.url, translate: t, showMsg: false });
                }}
              />
            </Tooltip>
          </div>
        }
        description={
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                marginTop: 15,
                whiteSpace: 'nowrap',
                fontSize: '0.8rem',
              }}
            >
              <span>{media.type ? media.type : 'no-type'}</span>
              <p>{media.sizeT}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <Tooltip title={t('license-images_copy-id-to-clipboard_tooltip')}>
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#000' }}
                    onClick={() => copyToClipboard({ text: media._id, translate: t })}
                  >
                    Id <FaRegCopy style={{ fontSize: '1rem' }} />
                  </span>
                </Tooltip>
              </span>
              <div>
                <BtnPrimary
                  shape="round"
                  size="small"
                  onClick={() => console.log('Eliminar archivo')}
                  tooltip={t('license-images_remove-image_tooltip-label')}
                  danger
                  disabled
                >
                  <FaRegTrashCan style={{ fontSize: '1rem' }} />
                </BtnPrimary>
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );
}
