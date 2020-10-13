import React, { createContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { SplitPane } from 'react-collapse-pane';
import ReplInput from '../repl/Input';
import ReplOutput from '../repl/Output';
import BundlerController from '../../bundler/BundlerController';
import { isError } from '../../workers/bundle';
import ReplPane, { PaneStatus } from '../repl/Pane';
import type { BundlerResult } from '../../bundler/Bundler';
import examples, { Example } from '../../examples';
import useStoredState from '../../hooks/useStoredState';
import type { ReplFile } from '../repl';

export type PreviewStatus =
  | { type: 'ready'; stats: { duration: number } }
  | { type: 'error'; error: Error };

export const PreviewContext = createContext({
  setStatus: (status: PreviewStatus) => {},
});

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: 'calc(100vh - 4rem)', // 4rem is the toolbar height
  },
}));

const debounce = 300;

interface Props {
  example?: Example;
}

export default function Repl({ example }: Props) {
  const classes = useStyles();
  const [files, setFiles] = useStoredState<ReplFile[]>({
    key: 'repl-files',
    defaultValue: examples[0].files,
  });
  const [inputErrors, setInputErrors] = useState<Error[]>([]);
  const [bundlerStatus, setBundlerStatus] = useState<PaneStatus>();
  const [previewStatus, setPreviewStatus] = useState<PaneStatus>();
  const [bundlerResult, setBundlerResult] = useState<BundlerResult>();

  useEffect(() => {
    if (example) {
      setFiles(example.files);
    }
  }, [example, setFiles]);

  useEffect(() => {
    console.log(`files: ${files.map((f) => f.name).join(',')}`);
  }, [files]);

  const bundler = useRef<BundlerController>();
  useEffect(() => {
    bundler.current = new BundlerController();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    async function bundle() {
      if (cancelled) return;

      setInputErrors([]);
      setBundlerStatus({ severity: 'progress', text: 'Bundler is running...' });

      console.info('Rebundling application');
      const result = await bundler.current!.bundle(files);

      if (cancelled) return;
      if (isError(result)) {
        console.error('Bundling failed', result.error);
        setInputErrors([result.error]);
      } else if (result.result) {
        console.log(result.result);
        console.info('Bundler finished in', result.result.stats.duration, 'milliseconds');

        setBundlerResult(result.result);
        setBundlerStatus({
          severity: 'success',
          text: `Bundled in ${result.result.stats.duration}ms`,
        });
      }
    }

    setBundlerStatus({ severity: 'info', text: 'Input changed' });
    setTimeout(bundle, debounce);

    return cancel;
  }, [files]);

  useEffect(() => {
    setPreviewStatus({
      severity: 'info',
      text: 'Waiting for bundle',
    });
  }, []);

  function handlePreviewStatus(status: PreviewStatus) {
    setPreviewStatus({
      severity: status.type === 'error' ? 'error' : 'success',
      text: status.type === 'error' ? status.error.message : `Loaded in ${status.stats.duration}ms`,
    });
  }

  return (
    <div className={classes.root}>
      <SplitPane split="vertical">
        <ReplPane error={inputErrors?.[0]} status={bundlerStatus}>
          <ReplInput files={files} onChange={setFiles} />
        </ReplPane>
        <ReplPane status={previewStatus}>
          <PreviewContext.Provider value={{ setStatus: handlePreviewStatus }}>
            <ReplOutput bundle={bundlerResult} />
          </PreviewContext.Provider>
        </ReplPane>
      </SplitPane>
    </div>
  );
}
