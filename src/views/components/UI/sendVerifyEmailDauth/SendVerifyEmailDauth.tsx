import { memo, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { useDauth } from 'dauth-context-react';
import { useTranslation } from 'react-i18next';

function SendVerifyEmailDauth() {
  const { t } = useTranslation()
  const { user, sendEmailVerification, sev } = useDauth()

  useEffect(() => {
    let isMounted = true;
    if (sev.isLoading === false && sev.status.type === 'success') {
      isMounted && message.success(sev.status.message, 4)
    }
    return () => { isMounted = false }
  }, [sev.isLoading, sev.status.message, sev.status.type])

  const handleSendVerificationEmail = useCallback(() => {
    sendEmailVerification();
    if (sev.isLoading === false && sev.status.message) {
      message.info(sev.status.message, 1.5)
    }
  }, [sendEmailVerification, sev.isLoading, sev.status.message])

  return (user.is_verified === false && sev.status.type !== 'success') ? (
    <p
      onClick={handleSendVerificationEmail}
      style={{ margin: '5px 0', padding: 0, cursor: 'pointer' }}
    >
      {t('profile-icon_send-email-verification')}
    </p>
  ) : <></>
}

const MemoizedSendVerifyEmailDauth = memo(SendVerifyEmailDauth)
export default MemoizedSendVerifyEmailDauth