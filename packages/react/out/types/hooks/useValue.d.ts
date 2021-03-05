import { VariableValue } from '@atvise/modular-webmi';
export declare type UseValueState<V> = {
    loading: true;
    error: undefined;
    data: undefined;
} | {
    loading: false;
    error: Error;
    data?: VariableValue<V>;
} | {
    loading: false;
    data: VariableValue<V>;
};
/**
 * A hook that returns a variable's value.
 * @param address The variable's node id.
 */
export default function useValue<V>(address: string): UseValueState<V>;
