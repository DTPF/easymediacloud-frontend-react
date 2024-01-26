import { memo } from 'react'
import './apiEndpointsBasic.scss'
import MediaEndpoint from './mediaEndpoint'
import { basePath } from 'api/utils/config'

function ApiBasic() {
  return (
    <section className='api-doc-basic'>
      <PMediaEndpoint />
    </section>
  )
}

export default memo(ApiBasic)

function PMediaEndpoint() {
  return (
    <MediaEndpoint
      endpoint={'/post-media'}
      method={'POST'}
      header={true}
      instructions={<>
        <p className='example-endpoint__media--description__item'>
          • Para anidar en carpetas, ponemos en la url los nombres de las carpetas separadas por un guión "-":
        </p>
        <p className='example-endpoint__media--description__item'>
          <span className='example-endpoint__media--description__item--sub-item'>
            -{basePath}/api/v1/post-media/<span className='example-endpoint__media--description__item--sub-item__folder'>anidado1</span>-<span className='example-endpoint__media--description__item--sub-item__folder'>anidado2</span>
          </span>
        </p>
        <p className='example-endpoint__media--description__item'>
          • La clave del archivo es <span className='example-endpoint__media--description__item--media'> media</span>.
        </p></>}
      requestCodeBlock={`const formData = new FormData();
formData.append("media", archivo);
formData.append("media", archivo);

const response = await fetch(${basePath}/post-media/{folder}-{folder}, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: {token}
  },
  body: formData
});
const data = await response.json();

return { response, data };`}
      responseCodeBlock={`"message": "Archivo creado correctamente",
"media": {
    "url": "http://localhost:4011/api/v1/media/dtpf/mariachef/K38_t5mce2d0bh-GYqvtw0p8.png",
    "size": "14.82 KB",
    "createdAt": "2024-01-26T16:49:41.515Z"
}`}
    />
  )
}