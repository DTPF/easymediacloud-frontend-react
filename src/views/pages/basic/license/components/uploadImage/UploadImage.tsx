import './uploadImage.scss';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import config from 'config/config';
import { getLicenseTokenAPI } from 'api/licenses.api';
import { useDauth } from 'dauth-context-react';
import { useTranslation } from 'react-i18next';
import { uploadByEasymediaCloudServerFolderName } from 'config/constants';

function UploadImage() {
  const { licenseSelected, getLicenseMedia } = useContext(LicensesContext);
  const { getAccessToken } = useDauth();
  const [token, setToken] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    async function getLicenseToken() {
      if (!licenseSelected?._id) return;
      const accessToken = await getAccessToken();
      const getToken = await getLicenseTokenAPI({ licenseId: licenseSelected._id, token: accessToken });
      if (getToken.response.status === 200) {
        setToken(getToken.data.mediaToken);
      }
    }
    isMounted && getLicenseToken();
    return () => {
      isMounted = false;
    };
  }, [getAccessToken, licenseSelected?._id]);

  const props: UploadProps = useMemo(() => {
    if (!token) return {};
    return {
      name: 'media',
      action: config.app.SERVER_URL + `/post-media/${uploadByEasymediaCloudServerFolderName}`,
      multiple: true,
      headers: {
        authorization: token,
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          getLicenseMedia({ licenseId: licenseSelected?._id as string });
          message.success(`${t('license-upload-images_handle-success')}`);
        } else if (info.file.status === 'error') {
          message.error(`${t('license-upload-images_handle-error')}`);
        }
      },
    };
  }, [getLicenseMedia, licenseSelected?._id, t, token]);

  return (
    <div className="license__section__upload-image">
      <h3>{t('license-upload-images_title')}</h3>
      <div className="license__section__upload-image__btn">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>{t('license-upload-images_btn-label')}</Button>
        </Upload>
      </div>
    </div>
  );
}

const MemoizedUploadImage = memo(UploadImage);
export default MemoizedUploadImage;
