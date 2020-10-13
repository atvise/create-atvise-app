import React, { useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Brightness3, WbSunny } from '@material-ui/icons';
import useDarkMode from 'use-dark-mode';
import examples, { Example } from '../../examples';

const useStyles = makeStyles({
  space: {
    flexGrow: 1,
  },
});

interface Props {
  onSelectExample: (example: Example) => void;
}

export default function Header({ onSelectExample }: Props) {
  const darkMode = useDarkMode();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const selectExample = (example: Example) => {
    onSelectExample(example);
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">webMI React Playground</Typography>

        <div className={classes.space}></div>

        <Button color="inherit" onClick={handleClick}>
          Select an example
        </Button>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {examples.map((example) => (
            <MenuItem key={example.name} onClick={() => selectExample(example)}>
              {example.name}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Toggle dark mode">
          <IconButton color="inherit" onClick={darkMode.toggle}>
            {darkMode.value ? <Brightness3 /> : <WbSunny />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
