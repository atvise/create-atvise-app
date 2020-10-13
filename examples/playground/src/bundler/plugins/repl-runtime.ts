import type { Plugin } from 'rollup';
import type { ReplFile } from '../../components/repl';

const replId = (name: string) => `@repl/${name}`;
export const isReplFile = (id: string) => id.startsWith('@repl/');

export const inputId = replId('input');
const runtimeId = replId('runtime.jsx');

const runtime = `
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, CssBaseline, ThemeProvider, Container } from '@material-ui/core';

export function StyledApp({ children }) {
  const { value: prefersDarkMode } = window.replSettings.darkMode;
  const theme = useMemo(() => createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {children}
      </Container>
    </ThemeProvider>
  );
}

export function runApp(App, target) {
  try {
    const start = Date.now();

    ReactDOM.render((
      <StyledApp>
        <App />
      </StyledApp>
    ), target);
    window.result = { type: 'ready', stats: { duration: Date.now() - start } };
  } catch (error) {
    console.error(error);
    window.result = { type: 'error', error };
  }
}
`;

export default function replRuntime(entry: ReplFile) {
  const files = new Map<string, string>([
    [runtimeId, runtime],
    [
      inputId,
      `import { runApp } from '${runtimeId}';
import App from './${entry.name}';

runApp(App, document.getElementById('root'));
`,
    ],
  ]);

  return {
    name: 'repl-runtime',
    resolveId(id) {
      return files.has(id) ? id : null;
    },
    load(id) {
      return files.get(id);
    },
  } as Plugin;
}
