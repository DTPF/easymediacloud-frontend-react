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

const response = await fetch(${basePath}/post-media/imagenes-usuarios, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: {token}
  },
  body: formData
});
const data = await response.json();

return { response, data };`}
      responseCodeBlock={`"message": "Archivo/s creado correctamente",
"media": [
    {
        "id": "65b4f31be430ca97c69e2599",
        "url": "http://localhost:4011/api/v1/media/65b4ed217597a1e7d3681ecf/mariachef/imagenes-usuarios/gboAAow0KwKPLZL0QrpfU605.png",
        "size": "1.91 MB",
        "createdAt": "2024-01-27T12:12:11.631Z"
    },
    {
        "id": "65b4f31be430ca97c69e259b",
        "url": "http://localhost:4011/api/v1/media/65b4ed217597a1e7d3681ecf/mariachef/imagenes-usuarios/QxwgmQfr4p1vcgFs3pi44l4s.png",
        "size": "14.82 KB",
        "createdAt": "2024-01-27T12:12:11.633Z"
    }
]`}
    />
  )
}