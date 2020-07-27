import prompts, { PromptObject } from 'prompts';
import type { ScriptRunnerOptions } from '..';
import { write, load } from '../../lib/config';
import { Atviserc } from '../../types/Atviserc';
import { AppError } from '../../lib/errors';

export default async function runInit({ info, doInteractive }: ScriptRunnerOptions) {
  const existing = await load({ fallbackToDefaults: true });

  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'host',
      message: 'On which host is your atvise server running?',
      initial: existing.host,
    },
    {
      type: 'number',
      name: 'portOpc',
      message: 'Which OPC-UA port is your atvise server listening at?',
      initial: existing.port.opc,
    },
    {
      type: 'number',
      name: 'portHttp',
      message: 'Which HTTP port is your atvise server listening at?',
      initial: existing.port.http,
    },
  ];

  const {
    host = existing.host,
    portOpc = existing.port.opc,
    portHttp = existing.port.http,
  } = await doInteractive(
    () =>
      prompts(questions, {
        onCancel: () => {
          throw new AppError('User cancelled');
        },
      }),
    {}
  );

  const config: Atviserc = {
    host,
    port: {
      opc: portOpc,
      http: portHttp,
    },
  };

  const { path } = await write(config);

  info(`Wrote config to '${path}'`);
}
