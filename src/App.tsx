import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { memo } from "react";
import LicensesProvider from "context/licenses/LicensesProvider";
import { DauthProvider } from "dauth-context-react";

function App() {
  return (
    <DauthProvider
      domainName={process.env.REACT_APP_DAUTH_DOMAIN_NAME as string}
      tsk={process.env.REACT_APP_DAUTH_TSK as string}
    >
      <LicensesProvider>
        <RouterProvider router={router} fallbackElement={<></>} />
      </LicensesProvider>
    </DauthProvider>
  );
}

export default memo(App);
