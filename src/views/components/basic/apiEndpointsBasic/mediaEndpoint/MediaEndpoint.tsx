import { Collapse } from 'antd'
import './mediaEndpoint.scss'
import { Highlight, themes } from "prism-react-renderer"
import Spin from 'views/components/UI/spin/Spin'
import { useTranslation } from 'react-i18next'
import { useDauth } from 'dauth-context-react'

type MediaEndpointProps = {
  title: string
  endpoint: React.ReactNode
  method: string
  header: boolean
  token: string
  instructions: React.ReactNode
  requestCodeBlock: string
  responseCodeBlock: string
  isOpenCollapse: boolean
}

function MediaEndpoint({ title, endpoint, method, header, token, instructions, requestCodeBlock, responseCodeBlock, isOpenCollapse }: MediaEndpointProps) {
  const { isLoading } = useDauth()
  return (
    isLoading ? <Spin /> : (
      <Collapse
        collapsible="header"
        defaultActiveKey={[isOpenCollapse ? '1' : '0']}
        bordered={false}
        className={`example-endpoint ${method.toLowerCase()}`}
        items={[
          {
            key: '1',
            label: <h2 className='example-endpoint--title'>{title}</h2>,
            children: (
              <MediaEndpointCollapse
                endpoint={endpoint}
                method={method}
                header={header}
                token={token}
                instructions={instructions}
                requestCodeBlock={requestCodeBlock}
                responseCodeBlock={responseCodeBlock}
              />
            ),
          },
        ]}
      />
    )

  )
}

export default MediaEndpoint

type MediaEndpointCollapseProps = {
  endpoint: React.ReactNode
  method: string
  header: boolean
  token: string
  instructions: React.ReactNode
  requestCodeBlock: string
  responseCodeBlock: string
}

function MediaEndpointCollapse({ endpoint, method, header, token, instructions, requestCodeBlock, responseCodeBlock }: MediaEndpointCollapseProps) {
  const { t } = useTranslation()
  return (
    <article className='example-endpoint__media'>
      <div className='example-endpoint__media--description'>
        <div className='example-endpoint__media--description__info'>
          <p className='example-endpoint__media--description__info--endpoint'>
            <span className='title'>Endpoint:</span> <span className='endpoint'>{endpoint}</span>
          </p>
          <p className='example-endpoint__media--description__info--method'>
            <span className='title'>Method:</span> {method}
          </p>
          {header === true && (
            <p className='example-endpoint__media--description__info--header'>
              <span className='title'>Header:</span> Authorization {'{'}<span className='token'>{token}</span>{'}'}
            </p>
          )}
        </div>
        {instructions && (
          <div className='example-endpoint__media--description__instructions'>
            <div className='example-endpoint__media--description__instructions__title'>
              {t('media-endpoint_instructions-label')}:
            </div>
            {instructions}
          </div>
        )
        }
      </div>
      <div className='example-endpoint__media--example'>
        <div className='example-endpoint__media--example__request'>
          <div className='example-endpoint__media--example__request--title'>
            {t('media-endpoint_requests-title')}:
          </div>
          <pre className='example-endpoint__media--example__request--pre'>
            <RequestCodeBlock requestCodeBlock={requestCodeBlock} />
          </pre>
          <div className='example-endpoint__media--example__request--title'>
            {t('media-endpoint_response-title')}:
          </div>
          <pre className='example-endpoint__media--example__request--pre'>
            <ResponseCodeBlock responseCodeBlock={responseCodeBlock} />
          </pre>
        </div>
      </div>
    </article>
  )
}

function RequestCodeBlock({ requestCodeBlock }: { requestCodeBlock: string }) {
  return (
    <Highlight
      theme={themes.dracula}
      code={requestCodeBlock}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          <div style={{ padding: 10 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ padding: '2px' }}>
                {/* <span style={{ paddingRight: 15, marginLeft: 5 }}>{i + 1}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  )
}

function ResponseCodeBlock({ responseCodeBlock }: { responseCodeBlock: string }) {
  return (
    <Highlight
      theme={themes.dracula}
      code={responseCodeBlock}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          <div style={{ padding: 10 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ padding: '2px' }}>
                {/* <span style={{ paddingRight: 15, marginLeft: 5 }}>{i + 1}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  )
}