export class AcdApiError extends Error {}

export class FailedResponseError extends AcdApiError {}
export class NoPermissionError extends AcdApiError {}
export class NoResponseError extends AcdApiError {}
export class NoRequestError extends AcdApiError {}
