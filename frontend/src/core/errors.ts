export type ErrorType = 'VALIDATION_ERROR' | 'REPOSITORY_ERROR' | 'NETWORK_ERROR' | 'UNAUTHORIZED' | 'UNKNOWN_ERROR';

export class AppError extends Error {
  public type: ErrorType;
  public details?: any;

  constructor(message: string, type: ErrorType = 'UNKNOWN_ERROR', details?: any) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
