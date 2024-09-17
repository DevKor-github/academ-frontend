export class AcdApiError extends Error {
  constructor(msg: String = '') {
    super(`AcademError: ${msg}`);
  }
}

export class FailedResponseError extends AcdApiError {
  constructor(msg: String = '') {
    super(`FailedResponseError: ${msg}`);
  }
}

export class NoPermissionError extends AcdApiError {
  constructor(msg: String = '') {
    super(`NoPermissionError: ${msg}`);
  }
}

export class NoResponseError extends AcdApiError {
  constructor(msg: String = '') {
    super(`NoResponseError: ${msg}`);
  }
}

export class NoRequestError extends AcdApiError {
  constructor(msg: String = '') {
    super(`NoRequestError: ${msg}`);
  }
}
