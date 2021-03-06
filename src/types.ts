import { EntitySchema } from 'typeorm';

export type EventHandlerFunction = (...args: any[]) => void;

export type Reject = (reason?: any) => void;

export type RepositoryTarget<T> = string | Function | (new () => T) | EntitySchema<T>;

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;

export type OneOrMany<T> = T | T[];

export enum LogLevel {
  trace = 1,
  debug = 2,
  info = 3,
  warn = 4,
  error = 5
}

export type Partial<T> = {
  [P in keyof T]?: T[P]
}
