import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import spanishTranslation from 'assets/locale/es';
import englishTranslation from 'assets/locale/en';
import { englishLanguage } from 'context/constants';

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: englishLanguage,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: { translation: spanishTranslation },
    en: { translation: englishTranslation },
  },
});

export default i18n;
