import { call } from '@atvise/modular-webmi';
import React from 'react';

interface UseCallOptions<A, R, D> {
  defaults?: D;
  onCompleted?: (data: R) => void;
  onError?: (error: Error) => void;
}

interface UseCallState<R> {
  called: boolean;
  loading: boolean;
  data?: R;
  error?: Error;
}

type UseCallCallback<A, R, D> = (args: Omit<A, keyof D> & Partial<D>) => Promise<void>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * A hook to call a webMI method script.
 * @param name The method script to call.
 * @param options The options to use.
 */
export default function useCall<
  A extends Record<string, string>,
  R = void,
  D extends Partial<A> = Partial<A>
>(
  name: string,
  { defaults, onCompleted = noop, onError = noop }: UseCallOptions<A, R, D> = {}
): [UseCallCallback<A, R, D>, UseCallState<R>] {
  const [state, setState] = React.useState<UseCallState<R>>({
    called: false,
    loading: false,
    data: undefined,
  });

  const callScript = React.useCallback<UseCallCallback<A, R, D>>(
    async (args) => {
      setState((current) => ({ ...current, called: true, loading: true }));

      try {
        const data = await call<R>(name, { ...(defaults || {}), ...args });
        setState((c) => ({ ...c, data, error: undefined, loading: false }));
        onCompleted(data);
      } catch (error) {
        setState((c) => ({ ...c, data: undefined, error, loading: false }));
        onError(error);
      }
    },
    [name, defaults]
  );

  return [callScript, state];
}
