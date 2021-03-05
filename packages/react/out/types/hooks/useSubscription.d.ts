import type { UseValueState } from './useValue';
/**
 * A hook that returns the live value of a variable.
 * @param address The variable's address.
 */
export default function useSubscription<V>(address: string): UseValueState<V>;
