import React from 'react';
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
          label="description"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="roomCount"
          label="rooms"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="surfaceArea"
          label="surface"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="streetAddress"
          label="street address"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postalCode"
          label="postal code"
          type="text"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="postDistrict"
          label="city"
          type="text"
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
