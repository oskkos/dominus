import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const en = {
  contentTemplate: 'This is the content template',
  contentTemplate2: '...more content...',
};
export type i18nType = typeof en;
export type i18nKeys = keyof i18nType;
const fi: i18nType = {
  contentTemplate: 'Sisältö tähän',
  contentTemplate2: '...lisää sisältöä...',
};


const resources = {
  en: {
    translation: en,
  },
  fi: {
    translation: fi,
  },
};

// eslint-disable-next-line functional/no-expression-statement
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
