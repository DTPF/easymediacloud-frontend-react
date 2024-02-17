import { UserOutlined } from '@ant-design/icons';
import './LoginIcon.scss'
import { memo, useCallback, useMemo } from 'react';
import { Avatar, Popover } from 'antd';
import LanguageSwitch from 'views/components/UI/languageSwitch';
import { useDauth } from 'dauth-context-react';
import { adminRole } from 'context/constants';

function LoginIcon() {
  const { isAuthenticated, loginWithRedirect } = useDauth()
  const { user, logout } = useDauth()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const content = useMemo(() => {
    return (
      <div>
        {user.role === adminRole && (
          <p>Admin</p>
        )}
        <LanguageSwitch />
        <p onClick={() => isAuthenticated ? handleLogout() : loginWithRedirect()} style={{ cursor: 'pointer' }}>
          {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
        </p>
      </div>
    );
  }, [handleLogout, isAuthenticated, loginWithRedirect, user.role])

  console.log(user);

  return (
    <div className='login-icon'>
      <Popover content={content} title={user.email} placement="bottomRight">
        <Avatar
          size={48}
          src={(isAuthenticated && user.avatar) ? <img src={user.avatar} alt={user.name.charAt(0)} /> : <UserOutlined />}
        />
      </Popover>
    </div>
  );
}

export default memo(LoginIcon)