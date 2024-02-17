import { NavLink } from "react-router-dom"
import './menuTopMain.scss'
import { memo } from "react"
import { routes } from "router/paths"
import { useDauth } from "dauth-context-react"
import { adminRole } from "context/constants"

function MenuTop() {
  const { user } = useDauth()
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