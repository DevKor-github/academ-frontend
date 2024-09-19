export class AcdApiError extends Error {
  message: string;
  constructor(msg: string = '') {
    super(`AcademError: ${msg}`);
    this.message = msg;
  }
}

export class FailedResponseError extends AcdApiError {
  constructor(msg: string = '') {
    super(msg);
  }
}

export class NoPermissionError extends AcdApiError {
  constructor(msg: string = '') {
    super(msg);
  }
}

export class NoResponseError extends AcdApiError {
  constructor(msg: string = '') {
    super(msg);
  }
}

export class NoRequestError extends AcdApiError {
  constructor(msg: string = '') {
    super(msg);
  }
}
