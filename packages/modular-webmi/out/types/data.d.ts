/// <reference types="@atvise/types-webmi" />
declare type VariableValue<T> = webMI.data.VariableValue<T>;
export declare function read<V = any>(address: string): any;
export declare function write<V>(address: string, value: V): any;
export declare function call<V = Record<string, unknown>>(name: string, args: Record<string, string>): any;
declare type SubscriptionState<V> = {
    error: Error;
} | {
    data: VariableValue<V>;
};
export declare function subscribe<V>(address: string, onResult: (data: SubscriptionState<V>) => void): {
    cancel: () => any;
};
export {};
