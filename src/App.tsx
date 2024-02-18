import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { memo } from 'react';
import LicensesProvider from 'context/licenses/LicensesProvider';
import { DauthProvider } from "dauth-context-react"
import { isLocalhost } from 'utils/isLocalhost';

function App() {
  return (
    <DauthProvider
      domainName={process.env.REACT_APP_DAUTH_DOMAIN_NAME as string}
      sid={isLocalhost ?
        process.env.REACT_APP_DAUTH_SID as string :
        process.env.REACT_APP_DAUTH_SID_PROD as string}
    >
      <LicensesProvider>
        <RouterProvider
          router={router}
          fallbackElement={<></>}
        />
      </LicensesProvider>
    </DauthProvider>
  )
}

export default memo(App)