import ApiBasic from 'views/components/basic/apiEndpointsBasic'
import './Home.scss'
import { memo } from 'react'
import MyLicenses from 'views/components/basic/myAccount/myLicenses'
import { useDauth } from 'dauth-context-react'

function Home() {
  const { isAuthenticated } = useDauth()
  return (
    <div className='web-home'>
      <h1>Easy Media Cloud</h1>
      <ApiBasic />
      {isAuthenticated && (
        <MyLicenses />
      )}
    </div>
  )
}

export default memo(Home)