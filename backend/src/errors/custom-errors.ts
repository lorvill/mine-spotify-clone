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

export class BadRequestError extends AppError {
  constructor(message = "Bad request", options: ErrorOptions = {}) {
    super(message, { ...options, statusCode: 400})
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", options: ErrorOptions = {}) {
    super(message, { ...options, statusCode: 401})
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", options: ErrorOptions = {}) {
    super(message, { ...options, statusCode: 404 })
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", options: ErrorOptions = {}) {
    super(message, { ...options, statusCode: 409 })
  }
}