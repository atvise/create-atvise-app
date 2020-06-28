export class AppError extends Error {
  static from(originalError: Error, message: string) {
    return Object.assign(new this(message), { originalError });
  }
}
export class UsageError extends AppError {}
