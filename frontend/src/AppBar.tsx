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

const items: ReadonlyArray<{readonly text: string; readonly icon: JSX.Element}> = [
  { text: 'Omat asunnot', icon: <Home /> },
  { text: 'Vuokralaiset', icon: <HowToReg /> },
  { text: 'Sekalainen', icon: <Settings /> },
  { text: 'Asunnonkyselijät', icon: <Person /> },
  { text: 'Muut kiinnostavat kohteet', icon: <HomeWork /> },
];

export default function DominusAppBar(_props: {}): JSX.Element {
  const classes = useStyles();

  const [openState, setOpenState] = useState(false);
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
                <ListItem button key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
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
