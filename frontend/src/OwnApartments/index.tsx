import React from 'react';
import { UserApi } from '../api/apis';
import { Configuration } from '../api';

export default function OwnApartments(_props: {}): JSX.Element {
  const userApi = new UserApi(new Configuration({
    apiKey: (_key) => localStorage.getItem('dominus-token') || '',
  }));
  // eslint-disable-next-line functional/no-expression-statement,no-console
  userApi.getSelf().then((self) => { console.log(self); });
  return <div>own apartments.</div>;
}
