import './licenseImages.scss';
import { Badge, Card, Image } from 'antd';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useCallback, useContext } from 'react';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import { copyToClipboard } from 'utils/copyToClipboard';
import { useTranslation } from 'react-i18next';
import { handleShare } from 'utils/handleShare';
import SpinUI from 'views/components/UI/spin/Spin';
import { bgMedium, colorPrimary } from 'scss/_variables';
import { IMedia } from 'interfaces/media.interface';
import { ILicense } from 'interfaces/license.interface';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { uploadByEasymediaCloudServerFolderName } from 'config/constants';
import Icon from 'views/components/UI/icon/Icon';

function LicenseImages() {
  const { licenseSelected } = useContext(LicensesContext);
  const { t } = useTranslation();

  return (
    <div className="license__images__items-container">
      <h3>{t('license-images_title')}</h3>
      <div className="license__images__items-container__items">
        {licenseSelected?.mediaPagination?.media?.map((media, index) => {
          return media.url.includes(uploadByEasymediaCloudServerFolderName) ? (
            <Badge.Ribbon text="EMC" color={bgMedium} style={{ fontSize: '.7rem' }} key={index}>
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
  const { licenseSelected, isLoadingMedia } = useContext(LicensesContext);
  const { t } = useTranslation();
  const { Meta } = Card;

  const handleDownload = useCallback((url: string, filename: string) => {
    saveAs(url, filename);
  }, []);

  return isLoadingMedia ? (
    <SpinUI size="small" />
  ) : (
    <Card
      hoverable
      className="license__images__items-container__items--card"
      loading={isLoadingMedia}
      cover={
        <Image
          alt={`${(licenseSelected as ILicense).project} archive`}
          className="license__images__items-container__items--card__img"
          src={media.url}
        />
      }
    >
      <Meta
        title={
          <div className="license__images__items-container__items--card__title">
            <Tooltip title={t('licenses_tooltip_last-update')}>
              <span style={{ fontSize: '.7rem', color: colorPrimary }}>
                {moment(media.createdAt).format('DD/MM/YYYY HH:mm')}
              </span>
            </Tooltip>
            <Tooltip title={t('license-images_total-visualizations_tooltip')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ paddingTop: 2, fontSize: '.75rem', color: colorPrimary }}>
                  {media.totalRequests}
                </span>
                <Icon type="eye" iconType="secondary" />
              </span>
            </Tooltip>
          </div>
        }
        description={
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '15px 0',
                fontSize: '0.8rem',
              }}
            >
              <div onClick={() => copyToClipboard({ text: media._id, translate: t })}>
                {media.type ? media.type : 'no-type'}
              </div>
              <div>{media.sizeT}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <Tooltip title={t('license-images_remove-image_tooltip-label')}>
                <Icon type="trash" iconType="danger" />
              </Tooltip>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Tooltip title={t('download_label')}>
                  <Icon type="download" onClick={() => handleDownload(media.url, `${media._id}.jpg`)} />
                </Tooltip>
                <Tooltip title={t('share_label')}>
                  <Icon
                    type="share"
                    onClick={() => {
                      handleShare({ url: media.url, translate: t, send: 'url' });
                      copyToClipboard({ text: media.url, translate: t, showMsg: false });
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </>
        }
      />
    </Card>
  );
}
