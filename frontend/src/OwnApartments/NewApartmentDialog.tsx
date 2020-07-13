import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AddApartment } from '../api/models';
import { apartmentsApi } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
    },
  },
}));
interface Err {
  message: string;
  details: Record<string, ErrDetails>;
}
interface ErrDetails {
  message: string;
}

interface Props {open: boolean; handleClose: () => void}
export default function NewApartmentDialog(props: Props): JSX.Element {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [addApartment, setAptmt] = useState({} as AddApartment);
  const [state, setState] = useState({ backendErrors: { message: '', details: {} } as Err });

  function showError(msg: string, details: Record<string, ErrDetails>): JSX.Element {
    return (
      <Alert severity="error">
        <AlertTitle>{msg}</AlertTitle>
        {Object.keys(details).map((k) => (
          <div key={k}>
            <strong>
              {k}
              :
              {' '}
            </strong>
            <span>{details[k].message}</span>
          </div>
        ))}
      </Alert>
    );
  }

  async function handleErrors(response: Response): Promise<void> {
    if (response.ok) {
      return;
    }
    const json = await response.json();
    if (json.details) {
      try { json.details = JSON.parse(json.details); } catch (e) { /* just swallow */ }
    }
    setState({ ...state, backendErrors: json });
  }
  // TODO: Validation and error messages
  async function handleSubmit(): Promise<void> {
    try {
      await apartmentsApi.addApartment({ addApartment });
      handleClose();
    } catch (err) {
      if (err instanceof Response) {
        handleErrors(err);
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        {state.backendErrors.message.length
          ? showError(state.backendErrors.message, state.backendErrors.details)
          : null}
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          id="apartmentDescription"
          onChange={(e): void => setAptmt({ ...addApartment, apartmentDescription: e.target.value })}
          label="description"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="roomCount"
          onChange={(e): void => setAptmt({ ...addApartment, roomCount: Number(e.target.value) })}
          label="rooms"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="surfaceArea"
          onChange={(e): void => setAptmt({ ...addApartment, surfaceArea: Number(e.target.value) })}
          label="surface"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="streetAddress"
          onChange={(e): void => setAptmt({ ...addApartment, streetAddress: e.target.value })}
          label="street address"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postalCode"
          onChange={(e): void => setAptmt({ ...addApartment, postalCode: e.target.value })}
          label="postal code"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postDistrict"
          onChange={(e): void => setAptmt({ ...addApartment, postDistrict: e.target.value })}
          label="city"
          type="text"
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
