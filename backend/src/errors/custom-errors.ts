type ErrorOptions = {
  statusCode?: number,
  cause?: unknown,
}

export class AppError extends Error {
  statusCode: number
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, { cause: options.cause })
    this.name = this.constructor.name
    this.statusCode = options.statusCode ?? 500
  }
}

export class BadRequest extends AppError {
  constructor(message = "Bad request", options: ErrorOptions = {}) {
    super(message, { ...options, statusCode: 400})
  }
}
