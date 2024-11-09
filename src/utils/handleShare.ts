import { messageError, messageInfo, messageSuccess } from 'views/components/UI/messages';
import { copyToClipboard } from './copyToClipboard';
import { TFunction } from 'i18next';

export const handleShare = async ({
  url,
  translate,
  send = 'file',
}: {
  url: string;
  translate: TFunction<'translation', undefined>;
  send?: 'file' | 'url';
}) => {
  if (navigator.share) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      navigator
        .share({
          title: translate('handle-search_navigator_title'),
          text: translate('search_navigator_text'),
          url: send === 'file' ? undefined : url,
          files: send === 'file' ? [file] : undefined,
        })
        .then(() => messageSuccess({ msg: translate('handle-search_navigator_share_success') }))
        .catch((error) => messageError({ msg: translate('handle-search_navigator_share_error') + error }));
    } catch (error) {
      messageError({ msg: translate('handle-search_navigator_get-image_error') + error });
    }
  } else {
    copyToClipboard({ text: url, showMsg: false, translate });
    messageInfo({ msg: translate('handle-search_navigator_share_info') });
  }
};
