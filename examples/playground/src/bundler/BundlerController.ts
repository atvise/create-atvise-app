/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import BundlerWorker from 'worker-loader!../workers/bundle';
/* eslint-enable import/no-webpack-loader-syntax */
import type { ReplFile } from '../components/repl';
import type { BundlerOutputMessage, BundlerWorkerInterface } from '../workers/bundle';

let worker: BundlerWorkerInterface;

let uid = 0;

export default class BundlerController {
  private handlers = new Map<number, (data: BundlerOutputMessage) => void>();
  private worker: BundlerWorkerInterface;

  constructor() {
    if (!worker) worker = new BundlerWorker();
    this.worker = worker;

    this.worker.addEventListener('message', (event) => {
      const handler = this.handlers.get(event.data.uid);

      if (handler) {
        handler(event.data);

        if (event.data.type === 'result') {
          this.handlers.delete(event.data.uid);
        }
      }
    });
  }

  bundle(files: ReplFile[]) {
    const buildUid = ++uid;

    return new Promise<BundlerOutputMessage>((resolve, reject) => {
      this.handlers.set(buildUid, resolve);
      this.worker.postMessage({ type: 'bundle', uid: buildUid, files });
    });
  }
}
