import { EntitySchema } from 'typeorm';

export type EventHandlerFunction = (...args: any[]) => void;

export type Reject = (reason?: any) => void;

export type RepositoryTarget<T> = string | Function | (new () => T) | EntitySchema<T>;

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;

export type OneOrMany<T> = T | T[];

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export type Partial<T> = {
  [P in keyof T]?: T[P]
}
