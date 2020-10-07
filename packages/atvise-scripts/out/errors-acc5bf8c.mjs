class AppError extends Error {
  constructor(message, {
    originalError,
    tips
  } = {}) {
    super(message);
    this.tips = [];
    if (originalError) this.originalError = originalError;
    if (tips) this.tips = tips;
  }

  static from(originalError, message, options) {
    return Object.assign(new this(message), {
      originalError,
      ...options
    });
  }

}
class UsageError extends AppError {}

export { AppError as A, UsageError as U };
