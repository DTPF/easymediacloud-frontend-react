import { Collapse } from 'antd'
import { basePath } from 'api/utils/config'
import './mediaEndpoint.scss'
import { Highlight, themes } from "prism-react-renderer"
import { useAuth0 } from '@auth0/auth0-react'
import Spin from 'views/components/UI/spin/Spin'

type Props = {
  endpoint: string
  method: string
  header: boolean
  instructions: React.ReactNode
  requestCodeBlock: string
  responseCodeBlock: string
}

function PostMediaEndpoint({ endpoint, method, header, instructions, requestCodeBlock, responseCodeBlock }: Props) {
  const { isAuthenticated, isLoading } = useAuth0()
  return (
    isLoading ? <Spin /> : (
      <Collapse
        collapsible="header"
        defaultActiveKey={[isAuthenticated ? '0' : '1']}
        bordered={false}
        className='example-endpoint'
        items={[
          {
            key: '1',
            label: <h2 className='example-endpoint--title'>Subir archivo</h2>,
            children: (
              <PostEndpoint
                endpoint={endpoint}
                method={method}
                header={header}
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

export default PostMediaEndpoint

function PostEndpoint({ endpoint, method, header, instructions, requestCodeBlock, responseCodeBlock }: Props) {
  return (
    <article className='example-endpoint__media'>
      <div className='example-endpoint__media--description'>
        <div className='example-endpoint__media--description__info'>
          <p>
            <span>Endpoint:</span> {basePath}{endpoint}
          </p>
          <p>
            <span>Method:</span> {method}
          </p>
          {header === true && (
            <p>
              <span>Header:</span> Authorization {'{'}<span className='token'>token</span>{'}'}
            </p>
          )}
        </div>
        {instructions && (
          <>
            <div className='example-endpoint__media--description__title'>Intrucciones:</div>
            {instructions}
          </>
        )
        }
      </div>
      <div className='example-endpoint__media--example'>
        <div className='example-endpoint__media--example__request'>
          <div className='example-endpoint__media--example__request--title'>Petición con Javascript:</div>
          <pre className='example-endpoint__media--example__request--pre'>
            <RequestCodeBlock requestCodeBlock={requestCodeBlock} />
          </pre>
          <div className='example-endpoint__media--example__request--title'>Respuesta:</div>
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