import { makeStyles, Fab } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import '@atvise/webmi-react'; // Needed for webmi data calls in preview frame
import { BundlerResult } from '../../../bundler/Bundler';
import { PreviewContext, PreviewStatus } from '../../pages/Repl';

type Props = {
  bundle?: BundlerResult;
};

const useStyles = makeStyles((theme) => ({
  iframe: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

type PreviewContext = typeof window & {
  result: PreviewStatus;
};

export default function ReplPreview({ bundle }: Props) {
  const darkMode = useDarkMode();
  const classes = useStyles();
  const [srcDoc, setSrcDoc] = useState('');
  const iframe = useRef<HTMLIFrameElement>(null);
  const preview = useContext(PreviewContext);

  function handleOnload(e: SyntheticEvent<HTMLIFrameElement, Event>) {
    const previewContext = (e.target as HTMLIFrameElement).contentWindow! as PreviewContext;

    console.log('Preview loaded');

    if (previewContext.result) {
      preview.setStatus(previewContext.result);

      // At this point we could inject the preview console:
      // (previewContext as any).console = {
      //   ...(previewContext as any).console,
      //   log: console.log.bind(console, 'preview'),
      // };
    }
  }

  useEffect(() => {
    if (!bundle) return console.log('Preview is out of date');

    setSrcDoc(`
<html>
<head>
  <title>Preview</title>
</head>
<body>
  <div id="root"></div>

  <!-- Dependencies -->
  <script src="/webmi.js"></script>
  ${bundle.bundle.imports.map((url) => `<script src="${url}"></script>`).join('\n  ')}

  <!-- State hydration -->
  <script>
    var replSettings = ${JSON.stringify({ darkMode })}
  </script>

  <!-- App -->
  <script>
    ${bundle.bundle.code}
  </script>
</body>
</html>`);
  }, [bundle, darkMode]);

  return (
    <>
      <iframe
        src="http://localhost:3000"
        className={classes.iframe}
        frameBorder="0"
        title="Preview"
        srcDoc={srcDoc}
        ref={iframe}
        onLoad={handleOnload}
      ></iframe>

      {iframe.current && (
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => iframe.current?.contentWindow?.location.reload()}
        >
          <Refresh />
        </Fab>
      )}
    </>
  );
}
