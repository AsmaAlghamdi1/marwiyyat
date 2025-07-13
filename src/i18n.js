import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ترجماتك
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(LanguageDetector) // يكتشف لغة المتصفح
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // اللغة الافتراضية
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;