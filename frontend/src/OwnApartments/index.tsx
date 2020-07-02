import React, { useEffect, useState } from 'react';
import { ApartmentsApi } from '../api/apis';
import { Apartment, Configuration } from '../api';

export default function OwnApartments(_props: {}): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([] as readonly Apartment[]);

  useEffect(() => {
    const apartmentsApi = new ApartmentsApi(new Configuration({
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      apiKey: (_key) => localStorage.getItem('dominus-token') || '',
    }));
    apartmentsApi.getApartments()
      .then(
        (apartments) => {
          setIsLoaded(true);
          setError(null);
          setItems(apartments);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {JSON.stringify(error)}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  // eslint-disable-next-line no-console
  console.table(items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {`${item.apartmentDescription}: ${item.streetAddress} ${item.postalCode} ${item.postDistrict}`}
        </li>
      ))}
    </ul>
  );
}
