import { getWebMI } from './webmi';

type VariableValue<T> = webMI.data.VariableValue<T>;
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

export function call<V = Record<string, unknown>>(name: string, args: Record<string, string>) {
  return promisifyDataCall<V>((cb) => webmiData.call(name, args, cb));
}

type SubscriptionState<V> = { error: Error } | { data: VariableValue<V> };

export function subscribe<V>(
  { address }: { address: string },
  onResult: (data: SubscriptionState<V>) => void
) {
  const subscription = webmiData.subscribe(address, (result) =>
    onResult(isErrorResult(result) ? { error: createDataError(result) } : { data: result })
  );

  return {
    cancel: () => webmiData.unsubscribe(subscription),
  };
}
