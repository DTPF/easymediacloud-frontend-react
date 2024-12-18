import { message } from 'antd';

type MessageSuccessProps = {
  msg: string;
  duration?: number;
};

export const messageTop = 50;
export const messageDuration = 3;
export const messageMaxCount = 3;

export function messageInfo({ msg, duration = messageDuration }: MessageSuccessProps) {
  message.config({
    top: messageTop,
    duration: duration,
    maxCount: messageMaxCount,
  });
  return message.info(msg);
}

export function messageSuccess({ msg, duration = messageDuration }: MessageSuccessProps) {
  message.config({
    top: messageTop,
    duration: duration,
    maxCount: messageMaxCount,
  });
  return message.success(msg);
}

export function messageWarning({ msg, duration = messageDuration }: MessageSuccessProps) {
  message.config({
    top: messageTop,
    duration: duration,
    maxCount: messageMaxCount,
  });
  return message.warning(msg);
}

export function messageError({ msg, duration = messageDuration }: MessageSuccessProps) {
  message.config({
    top: messageTop,
    duration: duration,
    maxCount: messageMaxCount,
  });
  return message.error(msg);
}
