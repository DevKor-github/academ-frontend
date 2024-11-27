interface BaseOption<T> {
  isSome(): this is Some<T>;
  isNone(): this is None<T>;

  map<U>(fn: (val: T) => U): Option<U>;
  bind<U>(fn: (val: T) => Option<U>): Option<U>;

  unwrap(): T | never;
  unwrapOr(optb: T): T;
}

export class None<T> implements BaseOption<T> {
  type: 'none';

  constructor() {
    this.type = 'none';
  }

  isSome(): this is Some<T> {
    return false;
  }

  isNone(): this is None<T> {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<U>(_fn: (val: T) => U): Option<U> {
    return this as unknown as None<U>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bind<U>(_fn: (val: T) => Option<U>): Option<U> {
    return this as unknown as None<U>;
  }

  unwrap(): T {
    throw new Error('Cannot unwrap failure');
  }

  unwrapOr(optb: T): T {
    return optb;
  }

  get [Symbol.toStringTag](): string {
    return 'Option.None';
  }
}

export class Some<T> implements BaseOption<T> {
  type: 'some';
  value: T;

  constructor(value: T) {
    this.type = 'some';
    this.value = value;
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None<T> {
    return false;
  }

  map<U>(fn: (val: T) => U): Option<U> {
    return new Some<U>(fn(this.value));
  }

  bind<U>(fn: (val: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  // intended unusing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unwrapOr(optv: T): T {
    return this.value;
  }

  get [Symbol.toStringTag](): string {
    return 'Option.Some';
  }
}

export type Option<T> = Some<T> | None<T>;
