import React, { useCallback } from 'react';
import { useTheme, makeStyles } from '@material-ui/core';
import CodeMirror, { Mode } from './CodeMirror';

const useStyles = makeStyles(() => ({
  codemirror: {
    height: '100%',
    flex: 1,
  },
}));

type Props = {
  mode: Mode;
  value: string;
} & ({ onChange: (text: string) => void; readOnly?: false } | { onChange?: never; readOnly: true });

export default function Editor({ mode, value, onChange, readOnly }: Props) {
  const classes = useStyles();
  const {
    palette: { type: theme },
  } = useTheme();

  const options = {
    mode,
    theme: theme === 'dark' ? 'monokai' : 'default',
    lineNumbers: true,
    readOnly,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  };

  const onBeforeChange = useCallback((_, __, text) => onChange?.(text), [onChange]);

  return (
    <CodeMirror
      className={classes.codemirror}
      value={value}
      options={options}
      onBeforeChange={onBeforeChange}
    />
  );
}
