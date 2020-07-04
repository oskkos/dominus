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
import { AddApartment } from '../api/models';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
    },
  },
}));

interface Props {open: boolean; handleClose: () => void}
export default function NewApartmentDialog(props: Props): JSX.Element {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [state, setState] = useState({} as AddApartment);

  const handleSubmit = (): void => {
    console.log(state);
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          id="apartmentDescription"
          onChange={(e): void => setState({ ...state, apartmentDescription: e.target.value })}
          label="description"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="roomCount"
          onChange={(e): void => setState({ ...state, roomCount: Number(e.target.value) })}
          label="rooms"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="surfaceArea"
          onChange={(e): void => setState({ ...state, surfaceArea: Number(e.target.value) })}
          label="surface"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="streetAddress"
          onChange={(e): void => setState({ ...state, streetAddress: e.target.value })}
          label="street address"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postalCode"
          onChange={(e): void => setState({ ...state, postalCode: e.target.value })}
          label="postal code"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postDistrict"
          onChange={(e): void => setState({ ...state, postDistrict: e.target.value })}
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
