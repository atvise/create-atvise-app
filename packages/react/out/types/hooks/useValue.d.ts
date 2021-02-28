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
export default function useValue<V>(address: string): UseValueState<V>;
