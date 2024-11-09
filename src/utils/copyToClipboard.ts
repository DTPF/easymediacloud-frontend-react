import { TFunction } from 'i18next';
import { messageSuccess } from 'views/components/UI/messages';

export function copyToClipboard({
  text,
  showMsg = true,
  msg = null,
  translate,
}: {
  text: string;
  showMsg?: boolean;
  msg?: null | string;
  translate: TFunction<'translation', undefined>;
}) {
  navigator.clipboard.writeText(text);
  showMsg && messageSuccess({ msg: msg ? msg : translate('copy-to-clipboard_copied') });
}
