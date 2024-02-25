import ApiBasic from 'views/components/basic/apiEndpointsBasic'
import './Home.scss'
import { memo } from 'react'
import MyLicenses from 'views/components/basic/myAccount/myLicenses'
import { useDauth } from 'dauth-context-react'
import EMClogo from 'assets/img/emc-full-logo-360.png';

function Home() {
  const { isAuthenticated } = useDauth()
  return (
    <div className='web-home'>
      <div className='web-home__logo'>
        <img src={EMClogo} alt="Easy Media Cloud" />
      </div>
      <ApiBasic />
      {isAuthenticated && (
        <MyLicenses />
      )}
    </div>
  )
}

export default memo(Home)