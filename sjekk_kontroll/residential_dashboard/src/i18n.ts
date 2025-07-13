
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languagedetector from 'i18next-browser-languagedetector';
import translationEN from './locale/en.json';
import translationNO from './locale/no.json';
import { getLanguage } from './utils/language';

const resources = {
    en: {
      translation:translationEN
    },
    no: {
      translation:translationNO
    }
  };
  
i18n
.use(languagedetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: getLanguage(), 
    fallbackLng: "no",

    interpolation: {
      escapeValue: false,
    },
    react:{

    }
  },() => {
    console.log('i18next is ready');
    
  });

export default i18n;