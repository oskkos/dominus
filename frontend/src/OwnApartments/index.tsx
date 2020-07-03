import React, { useEffect, useState } from 'react';
import { CircularProgress, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { ApartmentsApi } from '../api/apis';
import { Apartment, Configuration } from '../api';
import { useLocHelper } from '../i18n';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  progress: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function OwnApartments(_props: {}): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([] as readonly Apartment[]);

  const classes = useStyles();
  const { t } = useLocHelper();

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
    return <Alert severity="error">{t('errored')}</Alert>;
  }
  if (!isLoaded) {
    return <CircularProgress className={classes.progress} />;
  }
  // eslint-disable-next-line no-console
  console.table(items);
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {`${item.apartmentDescription}: ${item.streetAddress} ${item.postalCode} ${item.postDistrict}`}
          </li>
        ))}
      </ul>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}
