import React, { useMemo, useState } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import useDarkMode from 'use-dark-mode';
import Header from './layout/Header';
import Repl from './pages/Repl';
import { Example } from '../examples';

function App() {
  const { value: prefersDarkMode } = useDarkMode();
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: 'rgb(87, 87, 87)',
          },
          secondary: {
            main: 'rgb(242, 214, 0)',
          },
        },
      }),
    [prefersDarkMode]
  );

  const [example, setExample] = useState<Example>();
  function handleExampleSelection(example: Example) {
    setExample(example);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onSelectExample={handleExampleSelection} />
      <Repl example={example}></Repl>
    </ThemeProvider>
  );
}

export default App;
