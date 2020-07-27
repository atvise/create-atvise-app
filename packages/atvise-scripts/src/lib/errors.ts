interface AppErrorOptions {
  originalError?: Error;
  tips?: string[];
}

export class AppError extends Error {
  static from(originalError: Error, message: string, options?: AppErrorOptions) {
    return Object.assign(new this(message), { originalError, ...options });
  }

  readonly originalError?: Error;
  readonly tips: string[] = [];

  constructor(message: string, { originalError, tips }: AppErrorOptions = {}) {
    super(message);

    if (originalError) this.originalError = originalError;
    if (tips) this.tips = tips;
  }
}
export class UsageError extends AppError {}
