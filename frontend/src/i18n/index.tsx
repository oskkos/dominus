import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en from './en';
import fi from './fi';

const resources = {
  en: {
    translation: en,
  },
  fi: {
    translation: fi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fi',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export type i18nKeys = Extract<keyof typeof fi, keyof typeof en>;
export default function useLoc(key: i18nKeys): string {
  const { t } = useTranslation();
  return t(key);
}

// eslint-disable-next-line
export function useLocHelper(): { t: (key: i18nKeys) => string } {
  const { t } = useTranslation();
  return {
    t,
  };
}
