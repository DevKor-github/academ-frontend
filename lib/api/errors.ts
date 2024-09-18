export class AcdApiError extends Error {
  constructor(msg: string = '') {
    super(`AcademError: ${msg}`);
  }
}

export class FailedResponseError extends AcdApiError {
  constructor(msg: string = '') {
    super(`FailedResponseError: ${msg}`);
  }
}

export class NoPermissionError extends AcdApiError {
  constructor(msg: string = '') {
    super(`NoPermissionError: ${msg}`);
  }
}

export class NoResponseError extends AcdApiError {
  constructor(msg: string = '') {
    super(`NoResponseError: ${msg}`);
  }
}

export class NoRequestError extends AcdApiError {
  constructor(msg: string = '') {
    super(`NoRequestError: ${msg}`);
  }
}
