import { memo, useCallback, useEffect } from "react";
import { message } from "antd";
import { useDauth } from "dauth-context-react";
import { useTranslation } from "react-i18next";

function SendVerifyEmailDauth() {
  const { t } = useTranslation();
  const { user, sendEmailVerification, sendEmailVerificationStatus } =
    useDauth();

  useEffect(() => {
    let isMounted = true;
    if (
      sendEmailVerificationStatus.isLoading === false &&
      sendEmailVerificationStatus.status.type === "success"
    ) {
      isMounted &&
        message.success(sendEmailVerificationStatus.status.message, 4);
    }
    return () => {
      isMounted = false;
    };
  }, [
    sendEmailVerificationStatus.isLoading,
    sendEmailVerificationStatus.status.message,
    sendEmailVerificationStatus.status.type,
  ]);

  const handleSendVerificationEmail = useCallback(() => {
    sendEmailVerification();
    if (
      sendEmailVerificationStatus.isLoading === false &&
      sendEmailVerificationStatus.status.message
    ) {
      message.info(sendEmailVerificationStatus.status.message, 1.5);
    }
  }, [
    sendEmailVerification,
    sendEmailVerificationStatus.isLoading,
    sendEmailVerificationStatus.status.message,
  ]);

  return user.isVerified === false &&
    sendEmailVerificationStatus.status.type !== "success" ? (
    <p
      onClick={handleSendVerificationEmail}
      style={{ margin: "5px 0", padding: 0, cursor: "pointer" }}
    >
      {t("profile-icon_send-email-verification")}
    </p>
  ) : (
    <></>
  );
}

const MemoizedSendVerifyEmailDauth = memo(SendVerifyEmailDauth);
export default MemoizedSendVerifyEmailDauth;
