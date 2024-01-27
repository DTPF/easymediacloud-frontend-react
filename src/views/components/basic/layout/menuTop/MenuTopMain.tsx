import { NavLink } from "react-router-dom"
import './menuTopMain.scss'
import { memo, useContext } from "react"
import UserContext from "context/user/UserContext"
import { adminRole } from "context/user/constants"
import { routes } from "router/paths"

function MenuTop() {
  const { user } = useContext(UserContext)
  return (
    <div className='menu-top'>
      {/* <NavLink key={routes.myAccount} to={routes.myAccount}>
        Mi Cuenta
      </NavLink> */}
      {user.role === adminRole && (
        <NavLink key={adminRole} to={routes.adminHome}>
          Admin
        </NavLink>
      )}
    </div>
  )
}
export default memo(MenuTop)