import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader, Typography, TextField,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import { useLocHelper } from '../i18n';

const useStyles = makeStyles({
  wrapper: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: 275,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    display: 'inline-block',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
  },
  footer: {
    display: 'flex',
  },
});
export default function Login(_props: {}): JSX.Element {
  const classes = useStyles();
  const { t } = useLocHelper();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader title={(
          <div className={classes.header}>
            <LockIcon />
            <Typography className={classes.title} variant="h1">
              {t('login')}
            </Typography>
          </div>
        )}
        />
        <CardContent className={classes.content}>
          <TextField
            required
            id="username"
            label={t('username')}
            type="text"
            autoComplete="current-username"
            variant="outlined"
          />
          <TextField
            required
            id="password"
            label={t('password')}
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </CardContent>
        <CardActions className={classes.footer}>
          <Button variant="contained" style={{ flex: '1 1 auto' }} color="primary">{t('login')}</Button>
        </CardActions>
      </Card>
    </div>
  );
}
