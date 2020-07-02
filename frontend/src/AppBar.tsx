import React, { MouseEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Button, Drawer as SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Home, HomeWork, HowToReg, Person, Settings,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { i18nKeys, useLocHelper } from './i18n';

interface Props {readonly authenticated?: boolean; readonly logout: () => void}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// TODO: Type-safe paths
type Item = {readonly locCode: i18nKeys; readonly icon: JSX.Element; readonly path: string};

export default function DominusAppBar(props: Props): JSX.Element {
  const { authenticated, logout } = props;
  const [state, setState] = useState({ open: false, authenticated });
  if (authenticated !== state.authenticated) {
    setState({ ...state, authenticated });
  }
  const classes = useStyles();
  const { t } = useLocHelper();

  const items: ReadonlyArray<Item> = [
    { locCode: 'ownApartments', icon: <Home />, path: '/apartments' },
    { locCode: 'tenants', icon: <HowToReg />, path: '/tenants' },
    { locCode: 'misc', icon: <Settings />, path: '/misc' },
    { locCode: 'homeSeekers', icon: <Person />, path: '/homeSeekers' },
    { locCode: 'otherInterestingApartments', icon: <HomeWork />, path: '/otherApts' },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            disabled={!state.authenticated}
            onClick={(_e): void => setState({ ...state, open: !state.open })}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state.open}
            onClose={(_e): void => setState({ ...state, open: false })}
          >
            <List>
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(_e): void => setState({ ...state, open: false })}
                >
                  <ListItem button key={item.locCode}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>
                      {t(item.locCode)}
                    </ListItemText>
                  </ListItem>
                </Link>
              ))}
            </List>
          </SwipeableDrawer>
          <Typography variant="h6" className={classes.title}>
            Dominus
          </Typography>
          {state.authenticated && <Button variant="contained" color="secondary" onClick={(_e: MouseEvent): void => logout()}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
