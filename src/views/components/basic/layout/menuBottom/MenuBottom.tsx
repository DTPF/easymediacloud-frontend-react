import { memo } from 'react';
import './menuBottom.scss';
import { NavLink } from 'react-router-dom';
import { routes } from 'router/paths';
import Tooltip from 'views/components/UI/tooltip/Tooltip';
import { RiAdminLine } from 'react-icons/ri';
import { useDauth } from 'dauth-context-react';
import { adminRole } from 'context/constants';
import { IoHomeSharp } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';

function MenuBottom() {
  const { user } = useDauth();
  return (
    <div className="menu-bottom-mobile">
      <NavLink key={routes.home} to={routes.home} className="menu-bottom-mobile__item">
        <Tooltip title="Inicio">
          <IoHomeSharp className="menu-bottom-mobile__item--icon" style={{ fontSize: '.1rem' }} />
        </Tooltip>
      </NavLink>
      <NavLink key={routes.myAccount} to={routes.myAccount} className="menu-bottom-mobile__item">
        <Tooltip title="Mi Cuenta">
          <FaCircleUser className="menu-bottom-mobile__item--icon" fontSize={'2rem'} />
        </Tooltip>
      </NavLink>
      {user.role === adminRole && (
        <NavLink key={routes.adminHome} to={routes.adminHome} className="menu-bottom-mobile__item">
          <Tooltip title="Admin">
            <RiAdminLine className="menu-bottom-mobile__item--icon" />
          </Tooltip>
        </NavLink>
      )}
    </div>
  );
}

export default memo(MenuBottom);
