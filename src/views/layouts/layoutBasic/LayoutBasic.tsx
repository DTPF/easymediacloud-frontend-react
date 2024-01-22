import { Outlet } from 'react-router-dom';
import HeaderMain from 'views/components/basic/layout/header';
import FooterBasic from 'views/components/basic/layout/footer/FooterBasic';
import './LayoutBasic.scss'
import { memo } from 'react';
import useWindowSizeReport from 'hooks/useWindowSizeReport';
import MenuBottom from 'views/components/basic/layout/menuBottom/MenuBottom';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function LayoutMain() {
  const [isMobile] = useWindowSizeReport()
  return (
    <div className='layout-basic'>
      <HeaderMain />
      <div className='layout-basic__main'>
        <div className='layout-basic__main--container'>
          <Outlet />
        </div>
        <FloatButton icon={<PlusOutlined style={{ color: 'rgb(56, 56, 56)'}} />} style={{ right: 50 }} />
      </div>
      {!isMobile ? <FooterBasic /> : <MenuBottom />}
    </div>
  )
}

export default memo(LayoutMain)