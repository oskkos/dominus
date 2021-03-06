import React, { FormEvent, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader, Typography, TextField,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { useLocHelper } from '../i18n';
import { AuthApi } from '../api/apis';

interface AuthData {readonly msg?: string; readonly username?: string; readonly password?: string}
interface Props { readonly onLogin: (token: string|null) => void }

const useStyles = makeStyles({
  wrapper: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
  error: {
    marginTop: '10px',
  },
});
export default function Login(props: Props): JSX.Element {
  const classes = useStyles();
  const { t } = useLocHelper();
  const [state, setState] = useState({} as AuthData);
  const history = useHistory();
  const location = useLocation<{ readonly from: string }>();
  const authApi = new AuthApi();
  const { from } = location.state || { from: { pathname: '/' } };

  async function handleSubmit(event: FormEvent): Promise<boolean> {
    event.preventDefault();

    const token = await authApi.signin({ authUser: { password: state.password ?? '', username: state.username ?? '' } });
    props.onLogin(token.accessToken);
    history.replace(from);

    return false;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={classes.wrapper}
    >
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
            onChange={(e): void => setState({ ...state, username: e.target.value })}
          />
          <TextField
            required
            id="password"
            label={t('password')}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e): void => setState({ ...state, password: e.target.value })}
          />
        </CardContent>
        <CardActions className={classes.footer}>
          <Button variant="contained" style={{ flex: '1 1 auto' }} color="primary" type="submit">{t('login')}</Button>
        </CardActions>
      </Card>
      {state.msg && <Alert className={classes.error} severity="error">{state.msg}</Alert>}
    </form>
  );
}
