

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'sw', 'ar', 'pt', 'ha', 'yo', 'ig'],
    debug: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json', // path to translation files
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;