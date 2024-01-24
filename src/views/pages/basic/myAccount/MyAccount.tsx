import MyLicenses from 'views/components/basic/myAccount/myLicenses/MyLicenses'
import './myAccount.scss'

export default function MyAccount() {
  return (
    <div className='my-account'>
      <h1>Mi Cuenta</h1>
      <MyLicenses />
    </div>
  )
}