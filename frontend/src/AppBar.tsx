import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

export default function DominusAppBar(_props: {}): JSX.Element {
  const [openState, setOpenState] = useState(false);
  const classes = useStyles();
  const { t } = useLocHelper();

  const items: ReadonlyArray<Item> = [
    { locCode: 'ownApartments', icon: <Home />, path: '/apartments' },
    { locCode: 'tenants', icon: <HowToReg />, path: '/tenants' },
    { locCode: 'misc', icon: <Settings />, path: '/misc' },
    { locCode: 'homeSeekers', icon: <Person />, path: '/homeSeekers' },
    { locCode: 'otherInterestingApartments', icon: <HomeWork />, path: '/otherApts' },
  ];

  // eslint-disable-next-line functional/no-return-void
  const toggleDrawer = (open: boolean): void => {
    // eslint-disable-next-line functional/no-expression-statement
    setOpenState(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={(_e) => toggleDrawer(openState)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={openState}
            onClose={(_e) => setOpenState(false)}
          >
            <List>
              {items.map((item) => (
                <Link to={item.path} onClick={(_e) => setOpenState(false)}>
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
