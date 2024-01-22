import { memo, useContext } from 'react'
import './menuBottom.scss'
import { IoHomeSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { routes } from 'router/paths';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import { adminRole } from 'context/user/constants';
import UserContext from 'context/user/UserContext';
import { RiAccountCircleFill, RiAdminLine } from "react-icons/ri";

function MenuBottom() {
  const { user } = useContext(UserContext)
  return (
    <div className='menu-bottom-mobile'>
      <NavLink key={routes.home} to={routes.home} className='menu-bottom-mobile__item'>
        <Tooltip title="Inicio">
          <IoHomeSharp className='menu-bottom-mobile__item--icon' />
        </Tooltip>
      </NavLink>
      <NavLink key={routes.myAccount} to={routes.myAccount} className='menu-bottom-mobile__item'>
        <Tooltip title="Mi Cuenta">
          <RiAccountCircleFill className='menu-bottom-mobile__item--icon' />
        </Tooltip>
      </NavLink>
      {user.role === adminRole && (
        <NavLink key={routes.adminHome} to={routes.adminHome} className='menu-bottom-mobile__item'>
          <Tooltip title="Admin">
            <RiAdminLine className='menu-bottom-mobile__item--icon' />
          </Tooltip>
        </NavLink>
      )}
    </div>
  )
}

export default memo(MenuBottom)