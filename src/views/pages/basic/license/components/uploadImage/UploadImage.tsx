import './uploadImage.scss';
import LicensesContext from 'context/licenses/LicensesContext';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import config from 'config/config';
import { getLicenseTokenAPI } from 'api/licenses.api';
import { useDauth } from 'dauth-context-react';

function UploadImage() {
  const { licenseSelected, getLicenseMedia } = useContext(LicensesContext);
  const { getAccessToken } = useDauth();
  const [token, setToken] = useState<string | null>(null);

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
      action: config.app.SERVER_URL + '/post-media/platform',
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
          message.success(`${info.file.name} Archivo subido correctamente.`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} Error al subir el archivo.`);
        }
      },
    };
  }, [getLicenseMedia, licenseSelected?._id, token]);

  return (
    <div className="license__section__upload-image">
      <h3>Subir imágenes</h3>
      <div className="license__section__upload-image__btn">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click para subir</Button>
        </Upload>
      </div>
    </div>
  );
}

const MemoizedUploadImage = memo(UploadImage);
export default MemoizedUploadImage;
