import React, { useEffect, useState } from 'react';
import { CircularProgress, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { ApartmentsApi } from '../api/apis';
import { Apartment, Configuration } from '../api';
import { useLocHelper } from '../i18n';
import NewApartmentDialog from './NewApartmentDialog';

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
export const apartmentsApi = new ApartmentsApi(new Configuration({
  apiKey: (_key): string => localStorage.getItem('dominus-token') || '',
}));

export default function OwnApartments(_props: {}): JSX.Element {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [apartments, setApartments] = useState([] as readonly Apartment[]);

  const classes = useStyles();
  const { t } = useLocHelper();

  const handleOpenDialog = (): void => {
    setOpen(true);
  };
  const handleCloseDialog = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    apartmentsApi.getApartments()
      .then(
        (data) => {
          setIsLoaded(true);
          setError(null);
          setApartments(data);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
          setApartments([]);
        },
      );
  }, []);

  if (error) {
    return <Alert severity="error">{t('errored')}</Alert>;
  }
  if (!isLoaded) {
    return <CircularProgress className={classes.progress} />;
  }
  return (
    <div>
      <NewApartmentDialog open={open} handleClose={handleCloseDialog} />
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>
            {`${apartment.apartmentDescription}: ${apartment.streetAddress} ${apartment.postalCode} ${apartment.postDistrict}`}
          </li>
        ))}
      </ul>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon onClick={handleOpenDialog} />
      </Fab>
    </div>
  );
}
