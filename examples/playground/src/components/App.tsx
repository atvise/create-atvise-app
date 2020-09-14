import React, { useMemo } from 'react';
import { useSubscription } from '@atvise/webmi-react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import useDarkMode from 'use-dark-mode';
import Header from './layout/Header';

function App() {
  const { value: prefersDarkMode } = useDarkMode();
  const theme = useMemo(
    () => createMuiTheme({ palette: { type: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode]
  );

  const { data } = useSubscription<number>('AGENT.OBJECTS.test');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <p>
        <code>AGENT.OBJECTS.test</code> is currently:{' '}
        <strong>{data?.value.toFixed(2) ?? ''}</strong>
      </p>
    </ThemeProvider>
  );
}

export default App;
