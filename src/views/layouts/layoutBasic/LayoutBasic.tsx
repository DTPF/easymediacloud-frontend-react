import './layoutBasic.scss';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderMain from 'views/components/basic/layout/header';
import FooterBasic from 'views/components/basic/layout/footer';
import useWindowSizeReport from 'hooks/useWindowSizeReport';
import MenuBottom from 'views/components/basic/layout/menuBottom';
import { ConfigProvider } from 'antd';
import { bgMedium } from 'scss/_variables';
import i18n from 'utils/i18n';
import { useDauth } from 'dauth-context-react';
import moment from 'moment';

function LayoutMain() {
  const [isMobile] = useWindowSizeReport();
  const { user } = useDauth();
  moment.locale(user.language);

  useEffect(() => {
    let isMounted = true;
    isMounted && i18n.changeLanguage(user.language);
    return () => {
      isMounted = false;
    };
  }, [user.language]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgMedium,
          borderRadius: 10,
        },
      }}
    >
      <div className="layout-basic">
        <HeaderMain />
        <div className="layout-basic__main">
          <div className="layout-basic__main--container">
            <Outlet />
          </div>
        </div>
        {!isMobile ? <FooterBasic /> : <MenuBottom />}
      </div>
    </ConfigProvider>
  );
}

export default memo(LayoutMain);
