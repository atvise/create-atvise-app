import React, { ReactNode } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  status: {
    flexGrow: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  alert: {
    padding: '0.5em 1em',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  code: {
    fontFamily: 'monospace',
    textAlign: 'left',
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
  info: {
    /* We could alter color or background here... */
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    /* We could alter color or background here... */
  },
  success: {
    /* We could alter color or background here... */
  },
  alertSpace: {
    width: '0.5em',
  },
}));

export type PaneStatus = { severity: 'error' | 'info' | 'progress' | 'success'; text: string };

type Props = {
  children: ReactNode;
  error?: Error & { frame?: string };
  status?: PaneStatus;
};

export default function ReplPane({ children, error, status: statusProp }: Props) {
  const classes = useStyles();

  const status: PaneStatus | undefined = error
    ? { severity: 'error', text: error.message }
    : statusProp;

  const isMultilineError = error && error.message.split('\n').length > 1;

  return (
    <div className={classes.pane}>
      <div className={classes.content}>{children}</div>
      <div className={classes.status}>
        {status && (
          <div
            className={[
              classes.alert,
              isMultilineError ? classes.code : '',
              classes[status.severity],
            ].join(' ')}
          >
            {status.severity === 'progress' && (
              <>
                <CircularProgress size="1em" color="secondary" />
                <div className={classes.alertSpace} />
              </>
            )}
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
}
