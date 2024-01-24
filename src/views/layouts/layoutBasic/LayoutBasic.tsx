import { Outlet } from 'react-router-dom';
import HeaderMain from 'views/components/basic/layout/header';
import FooterBasic from 'views/components/basic/layout/footer/FooterBasic';
import './layoutBasic.scss'
import { memo } from 'react';
import useWindowSizeReport from 'hooks/useWindowSizeReport';
import MenuBottom from 'views/components/basic/layout/menuBottom/MenuBottom';
import { ConfigProvider } from 'antd';
import { bgMedium } from 'scss/_variables';

function LayoutMain() {
  const [isMobile] = useWindowSizeReport()
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: bgMedium,
          borderRadius: 10,
        },
      }}
    >
      <div className='layout-basic'>
        <HeaderMain />
        <div className='layout-basic__main'>
          <div className='layout-basic__main--container'>
            <Outlet />
          </div>
        </div>
        {!isMobile ? <FooterBasic /> : <MenuBottom />}
      </div>
    </ConfigProvider>
  )
}

export default memo(LayoutMain)