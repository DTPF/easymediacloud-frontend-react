import { memo } from 'react'
import './apiEndpointsBasic.scss'
import MediaEndpoint from './mediaEndpoint'
import { basePath } from 'api/utils/config'
import { useTranslation } from 'react-i18next'
import { useDauth } from 'dauth-context-react'

function ApiBasic() {
  return (
    <section className='api-doc-basic'>
      <GetLicenseTokenEndpoint />
      <PostMediaEndpoint />
      <DeleteMediaEndpoint />
    </section>
  )
}

export default memo(ApiBasic)

function GetLicenseTokenEndpoint() {
  const { t } = useTranslation()
  const { isAuthenticated } = useDauth()
  return (
    <MediaEndpoint
      title={'Get License Token'}
      endpoint={<span>get-license-token/<i>:licenseId</i></span>}
      method={'GET'}
      header={true}
      token={"Dauth Token"}
      isOpenCollapse={false}
      instructions={null}
      requestCodeBlock={`const response = await fetch(${isAuthenticated ? basePath : 'https://server-url'}/get-license-token/:licenseId, {
  method: "GET",
  headers: { Authorization: 'Dauth Token' }
});
const data = await response.json();

return { response, data };`}
      responseCodeBlock={`{
  "status": "get-token-success",
  "message": "${t('post-media-endpoint_codeblock-get-license-token-success')}",
  "mediaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDlmOWU1MGM5MjIzOGV..."
}`}
    />
  )
}

function PostMediaEndpoint() {
  const { t } = useTranslation()
  const { isAuthenticated } = useDauth()
  return (
    <MediaEndpoint
      title={'Post Media'}
      endpoint={'post-media'}
      method={'POST'}
      header={true}
      token={"mediaToken"}
      isOpenCollapse={false}
      instructions={<>
        <p className='example-endpoint__media--description__instructions__item'>
          • {t('post-media-endpoint_description-1')} "-":
        </p>
        <p className='example-endpoint__media--description__instructions__item'>
          <span className='example-endpoint__media--description__instructions__item--sub-item'>
            {basePath}/post-media/
            <span className='example-endpoint__media--description__instructions__item--sub-item__folder'>
              {t('post-media-endpoint_description-1-nested')}1
            </span>-
            <span className='example-endpoint__media--description__instructions__item--sub-item__folder'>
              {t('post-media-endpoint_description-1-nested')}2
            </span>
          </span>
        </p>
        <p className='example-endpoint__media--description__instructions__item'>
          • {t('post-media-endpoint_description-2')}
          <span className='example-endpoint__media--description__instructions__item--media'>
            media
          </span>.
        </p></>}
      requestCodeBlock={`const formData = new FormData();
formData.append("media", ${t('post-media-endpoint_codeblock-archive')});
formData.append("media", ${t('post-media-endpoint_codeblock-archive')});

const response = await fetch(${isAuthenticated ? basePath : 'https://server-url'}/post-media/${t('post-media-endpoint_codeblock-folders')}, {
  method: "POST",
  headers: { Authorization: 'mediaToken' },
  body: formData
});
const data = await response.json();

return { response, data };`}
      responseCodeBlock={`"message": "${t('post-media-endpoint_codeblock-created-success')}",
"media": [
  {
    "id": "65b4f31be430ca97c69e2599",
    "url": "${isAuthenticated ? basePath : 'https://server-url'}/media/65b4ed217597a1e7d3681ecf/project/${t('post-media-endpoint_codeblock-folders')}/gboAAow0KwKPLZL0QrpfU605.png",
    "size": "1.91 MB",
    "createdAt": "2024-01-27T12:12:11.631Z"
  },
  {
    "id": "65b4f31be430ca97c69e259b",
    "url": "${isAuthenticated ? basePath : 'https://server-url'}/media/65b4ed217597a1e7d3681ecf/project/${t('post-media-endpoint_codeblock-folders')}/QxwgmQfr4p1vcgFs3pi44l4s.png",
    "size": "14.82 KB",
    "createdAt": "2024-01-27T12:12:11.633Z"
  }
]`}
    />
  )
}

function DeleteMediaEndpoint() {
  const { t } = useTranslation()
  const { isAuthenticated } = useDauth()
  return (
    <MediaEndpoint
      title={'Delete Media'}
      endpoint={<span>delete-media/<i>:mediaId</i></span>}
      method={'DELETE'}
      header={true}
      token={"mediaToken"}
      isOpenCollapse={false}
      instructions={null}
      requestCodeBlock={`const response = await fetch(${isAuthenticated ? basePath : 'https://server-url'}/delete-media/{mediaId}, {
  method: "DELETE",
  headers: { Authorization: 'mediaToken' }
});
const data = await response.json();

return { response, data };`}
      responseCodeBlock={`{
  "status": "media-deleted-success",
  "message": "${t('post-media-endpoint_codeblock-deleted-success')}"
}`}
    />
  )
}