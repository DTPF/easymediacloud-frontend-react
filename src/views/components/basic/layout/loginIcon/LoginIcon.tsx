import { UserOutlined } from '@ant-design/icons';
import './LoginIcon.scss'
import { useAuth0 } from '@auth0/auth0-react';
import { memo, useCallback, useContext, useMemo } from 'react';
import UserContext from 'context/user/UserContext';
import { Avatar, Popover } from 'antd';
import { adminRole } from 'context/user/constants';
import { basePath } from 'api/utils/config';
import LanguageSwitch from 'views/components/UI/languageSwitch';

function LoginIcon() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const { user, logout } = useContext(UserContext)
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

  const userAvatar = useMemo(() => user.avatar.split('://')[0] === 'https' ? user.avatar : `${basePath}/user-avatar/${user.avatar}`, [user.avatar])
  return (
    <div className='login-icon'>
      <Popover content={content} title={user.email} placement="bottomRight">
        <Avatar size={48} src={isAuthenticated ? userAvatar : <UserOutlined />} />
      </Popover>
    </div>
  );
}

export default memo(LoginIcon)