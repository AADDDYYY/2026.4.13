import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';
import zhHKTranslations from './locales/zh-HK.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';
import ruTranslations from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zhTranslations },
      en: { translation: enTranslations },
      'zh-HK': { translation: zhHKTranslations },
      ja: { translation: jaTranslations },
      ko: { translation: koTranslations },
      ru: { translation: ruTranslations }
    },
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
