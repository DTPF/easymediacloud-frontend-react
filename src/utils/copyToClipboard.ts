import { messageSuccess } from 'views/components/UI/messages';

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  messageSuccess({ msg: 'Copiado al portapapeles' });
}
