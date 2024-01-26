import ApiBasic from 'views/components/basic/apiEndpointsBasic'
import './Home.scss'
import { memo } from 'react'
import MyLicenses from 'views/components/basic/myAccount/myLicenses'
import { useAuth0 } from '@auth0/auth0-react'

function Home() {
  const { isAuthenticated } = useAuth0()
  return (
    <div className='web-home'>
      <h1>Media Cloud</h1>
      <ApiBasic />
      {isAuthenticated && (
        <MyLicenses />
      )}
    </div>
  )
}

export default memo(Home)