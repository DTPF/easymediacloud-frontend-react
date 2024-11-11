import './profileIcon.scss';
import { memo, useCallback, useMemo } from 'react';
import { Avatar, Popover } from 'antd';
import LanguageSwitch from 'views/components/UI/languageSwitch';
import { useDauth } from 'dauth-context-react';
import { adminRole } from 'context/constants';
import SendVerifyEmailDauth from 'views/components/UI/sendVerifyEmailDauth';
import { useTranslation } from 'react-i18next';
import Icon from 'views/components/UI/icon/Icon';

function ProfileIcon() {
  const { t } = useTranslation();
  const { user, isAuthenticated, loginWithRedirect, logout, updateUserWithRedirect } = useDauth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const content = useMemo(() => {
    return (
      <div>
        {user.role === adminRole && <p>Admin</p>}
        <div className="profile-icon__language">
          <LanguageSwitch />
        </div>
        <SendVerifyEmailDauth />
        {isAuthenticated && (
          <p onClick={() => updateUserWithRedirect()} className="profile-icon__my-profile">
            {t('profile-icon_my-profile')}
          </p>
        )}
        <p
          onClick={() => (isAuthenticated ? handleLogout() : loginWithRedirect())}
          className="profile-icon__login-logout"
        >
          {isAuthenticated ? t('profile-icon_logout') : t('profile-icon_login')}
        </p>
      </div>
    );
  }, [handleLogout, isAuthenticated, loginWithRedirect, t, updateUserWithRedirect, user.role]);

  return (
    <div className="profile-icon">
      <Popover
        content={content}
        title={<div className="profile-icon__popover-title">{user.email}</div>}
        placement="bottomRight"
      >
        {isAuthenticated && user.avatar ? (
          <Avatar size={48} src={<img src={`${user.avatar.url}?source=emc`} alt={user.name} />} />
        ) : (
          <Avatar size={48} icon={<Icon type="user" />} />
        )}
      </Popover>
    </div>
  );
}

export default memo(ProfileIcon);
