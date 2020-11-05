/// <reference types="@atvise/types-webmi" />
export declare type VariableValue<T> = webMI.data.VariableValue<T>;
export declare function read<V = any>(address: string): Promise<VariableValue<V>>;
export declare function write<V>(address: string, value: V): Promise<void>;
export declare function call<V = any>(name: string, args: Record<string, string>): Promise<V>;
export declare function login(username: string, password: string): Promise<webMI.data.LoginSuccessResult>;
export declare function logout(): Promise<void>;
export declare const addDataEvent: <N extends "clientvariableschange">(name: N, callback: (e: webMI.data.DataEvents[N]) => void) => () => void;
declare type SubscriptionState<V> = {
    error: Error;
} | {
    data: VariableValue<V>;
};
export declare function subscribe<V>(address: string, onResult: (data: SubscriptionState<V>) => void): {
    cancel: () => any;
};
export {};
