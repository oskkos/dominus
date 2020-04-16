import React, { MouseEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  List, ListItem, ListItemIcon, ListItemText, Drawer as SwipeableDrawer,
} from '@material-ui/core';
import {
  Home, HomeWork, HowToReg, Person, Settings,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { i18nKeys, useLocHelper } from './i18n';

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

// eslint-disable-next-line functional/no-return-void
export default function DominusAppBar(props: {readonly authenticated?: boolean; readonly logout: () => void}): JSX.Element {
  const [state, setState] = useState({ open: false, authenticated: props.authenticated });
  // eslint-disable-next-line functional/no-conditional-statement
  if (props.authenticated !== state.authenticated) {
    // eslint-disable-next-line functional/no-expression-statement
    setState({ ...state, authenticated: props.authenticated });
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
          <IconButton disabled={!state.authenticated} onClick={(_e) => setState({ ...state, open: !state.open })} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state.open}
            onClose={(_e) => setState({ ...state, open: false })}
          >
            <List>
              {items.map((item) => (
                <Link to={item.path} onClick={(_e) => setState({ ...state, open: false })}>
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
          {state.authenticated && <a onClick={(e: MouseEvent) => props.logout()}>Logout</a>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
