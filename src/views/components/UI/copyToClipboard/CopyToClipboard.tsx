import { useTranslation } from 'react-i18next';
import { copyToClipboard } from 'utils/copyToClipboard';

export function CopyToClipoard({ text, children }: { text: string; children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <span onClick={() => copyToClipboard({ text, translate: t })} style={{ cursor: 'pointer' }}>
      {children}
    </span>
  );
}
