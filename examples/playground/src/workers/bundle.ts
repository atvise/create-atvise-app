/// <reference lib="webworker" />

import Bundler, { aborted } from '../bundler/Bundler';
import type { BundlerResult } from '../bundler/Bundler';
import type { ReplFile } from '../components/repl';

export type BundlerStartMessage = {
  type: 'bundle';
  uid: number;
  files: ReplFile[];
};

export type BundlerCancelMessage = { type: 'cancel'; uid: number };

type BundlerInputMessageMap = {
  bundle: BundlerStartMessage;
  cancel: BundlerCancelMessage;
};

export type BundlerInputMessage = {
  [T in keyof BundlerInputMessageMap]: BundlerInputMessageMap[T];
}[keyof BundlerInputMessageMap];

type BundlerInputMessageEvent = { data: BundlerInputMessage };

const isMessage = <T extends keyof BundlerInputMessageMap>(
  event: BundlerInputMessageEvent,
  type: T
): event is { data: BundlerInputMessageMap[T] } => {
  return event.data.type === type;
};

export type BundlerResultMessage = {
  type: 'result';
  uid: number;
  result?: BundlerResult;
};

export type BundlerErrorMessage = {
  type: 'error';
  uid: number;
  error: Error;
};

export type BundlerOutputMessage = BundlerResultMessage | BundlerErrorMessage;

export const isError = (message: BundlerOutputMessage): message is BundlerErrorMessage =>
  message.type === 'error';

export interface BundlerWorkerInterface extends Worker {
  postMessage(message: BundlerInputMessage): void;
}

const bundler = new Bundler();

onmessage = async (event: BundlerInputMessageEvent) => {
  console.info('Received', event.data.type, 'message', event);

  if (isMessage(event, 'bundle')) {
    try {
      const result = await bundler.bundle(event.data.files).catch((error) => {
        if (error === aborted) return undefined;

        console.error('Rethrowing');
        throw error;
      });

      postMessage({
        type: 'result',
        uid: event.data.uid,
        result,
      } as BundlerResultMessage);
    } catch (error) {
      console.log(Object.fromEntries(Object.entries(error)));
      postMessage({
        type: 'error',
        uid: event.data.uid,
        error: ({
          message: error.message,
          stack: error.stack,
          ...Object.fromEntries(Object.entries(error)),
        } as unknown) as Error,
      } as BundlerErrorMessage);
    }
  }
};
