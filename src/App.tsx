import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { memo } from 'react';
import LicensesProvider from 'context/licenses/LicensesProvider';
import { DauthProvider } from 'dauth-context-react';
import config from 'config/config';

function App() {
  return (
    <DauthProvider
      domainName={config.services.dauth.DOMAIN_NAME as string}
      tsk={config.services.dauth.TSK as string}
    >
      <LicensesProvider>
        <RouterProvider router={router} fallbackElement={<></>} />
      </LicensesProvider>
    </DauthProvider>
  );
}

export default memo(App);
