import { addEvent } from './events';
import { getWebMI } from './webmi';

export type VariableValue<T> = webMI.data.VariableValue<T>;
type ResultError = webMI.data.ResultError;

const webmiData = getWebMI().data;

function isErrorResult(result): result is ResultError {
  return result.error;
}

const createDataError = (result: ResultError) =>
  Object.assign(new Error(result.errorstring), { code: result.error });

function resultCallback<R>(resolve: (result: R) => void, reject: (error: Error) => void) {
  return (result: ResultError | R) => {
    if (isErrorResult(result)) {
      reject(createDataError(result));
    } else {
      resolve(result);
    }
  };
}

type DataCall<R> = (callback: (result: ResultError | R) => void) => void;

function promisifyDataCall<R>(fn: DataCall<R>) {
  return new Promise<R>((resolve, reject) => fn(resultCallback(resolve, reject)));
}

export function read<V = any>(address: string) {
  return promisifyDataCall<VariableValue<V>>((cb) => webmiData.read(address, cb));
}

export function write<V>(address: string, value: V) {
  return promisifyDataCall<void>((cb) => webmiData.write(address, value, cb));
}

export function call<V = any>(name: string, args: Record<string, string>) {
  return promisifyDataCall<V>((cb) => webmiData.call(name, args, cb));
}

const isLoginErrorResult = (
  result: webMI.data.LoginResult
): result is webMI.data.LoginErrorResult => Object.prototype.hasOwnProperty.call(result, 'error');
const isLoginSuccessResult = (
  result: webMI.data.LoginResult
): result is webMI.data.LoginSuccessResult => !isLoginErrorResult(result) && !!result.username;

export function login(username: string, password: string): Promise<webMI.data.LoginSuccessResult> {
  return new Promise((resolve, reject) => {
    webmiData.login(username, password, ({ '': result }) => {
      if (isLoginErrorResult(result)) reject(new Error(result.error));
      else resolve(isLoginSuccessResult(result) ? result : null);
    });
  });
}

export function logout() {
  return new Promise<void>((resolve) => webmiData.logout(resolve));
}

export const addDataEvent = <N extends keyof webMI.data.DataEvents>(
  name: N,
  callback: (e: webMI.data.DataEvents[N]) => void
) => addEvent(webmiData, name, callback);

type SubscriptionState<V> = { error: Error } | { data: VariableValue<V> };

export function subscribe<V>(address: string, onResult: (data: SubscriptionState<V>) => void) {
  const subscription = webmiData.subscribe(address, (result) =>
    onResult(isErrorResult(result) ? { error: createDataError(result) } : { data: result })
  );

  return {
    cancel: () => webmiData.unsubscribe(subscription),
  };
}
