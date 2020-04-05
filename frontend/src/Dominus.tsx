import React from 'react';
import { useTranslation } from 'react-i18next';
import DominusAppBar from './AppBar';
import { i18nKeys } from './i18n';

export default function Dominus(_props: {}): JSX.Element {
  const { t, i18n } = useTranslation();
  const loc: (key: i18nKeys) => string = t;
  // eslint-disable-next-line functional/no-expression-statement
  i18n.changeLanguage('fi');
  return (
    <div>
      <DominusAppBar />
      <React.StrictMode>
        {loc('contentTemplate')}
        {loc('contentTemplate2')}
      </React.StrictMode>
    </div>
  );
}
