import React, { useMemo } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import useDarkMode from 'use-dark-mode';
import Header from './layout/Header';
import Repl from './pages/Repl';

function App() {
  const { value: prefersDarkMode } = useDarkMode();
  const theme = useMemo(
    () => createMuiTheme({ palette: { type: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Repl></Repl>
    </ThemeProvider>
  );
}

export default App;
