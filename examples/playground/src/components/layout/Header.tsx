import React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Brightness3, WbSunny } from '@material-ui/icons';
import useDarkMode from 'use-dark-mode';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export default function Header() {
  const darkMode = useDarkMode();
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          webMI React Playground
        </Typography>
        <Tooltip title="Toggle dark mode">
          <IconButton onClick={darkMode.toggle}>
            {darkMode.value ? <Brightness3 /> : <WbSunny />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
