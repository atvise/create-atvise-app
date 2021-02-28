import React from 'react';
import { subscribe } from '@atvise/modular-webmi';
import type { UseValueState } from './useValue';

/**
 * A hook that returns the live value of a variable.
 * @param address The variable's address.
 */
export default function useSubscription<V>(address: string) {
  const [state, setState] = React.useState<UseValueState<V>>({
    loading: true,
    value: null,
  });

  React.useEffect(() => {
    const subscription = subscribe<V>(address, (value) => {
      setState({
        loading: false,
        ...value,
      });
    });

    return subscription.cancel;
  }, [address]);

  return state;
}
