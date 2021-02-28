import React from 'react';
import { read, VariableValue } from '@atvise/modular-webmi';

export type UseValueState<V> =
  | { loading: true; error: undefined; data: undefined }
  | { loading: false; error: Error; data?: VariableValue<V> }
  | { loading: false; data: VariableValue<V> };

/**
 * A hook that returns a variable's value.
 * @param address The variable's node id.
 */
export default function useValue<V>(address: string) {
  const [state, setState] = React.useState<UseValueState<V>>({
    loading: true,
  });

  React.useEffect(() => {
    const readValue = async () => {
      try {
        const data = await read<V>(address);

        setState({
          loading: false,
          data,
        });
      } catch (error) {
        setState({ loading: false, error });
      }
    };

    readValue();
  }, [address]);

  return state;
}
