export type Query<T, K extends keyof T> = Partial<T> & Pick<T, K>;
