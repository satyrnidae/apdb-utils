import { OneOrMany } from "./types";

/**
 * Converts a union of a single object and an array of that object to an array
 * @param oneOrMany The union array.
 */
export function toMany<T>(oneOrMany: OneOrMany<T>): T[] {
  if (oneOrMany instanceof Array) {
    return oneOrMany;
  }
  return new Array(oneOrMany);
}

/**
 * Convers a union of a single object and an array to a single instance of the object
 * @param oneOrMany The union array.
 * @returns The single element, or undefined if multiple elements are present.
 */
export function toOne<T>(oneOrMany: OneOrMany<T>): T | undefined {
  if (oneOrMany instanceof Array) {
    if (oneOrMany.length === 1) {
      return oneOrMany[0];
    }
    return undefined;
  }
  return oneOrMany;
}

/**
 * Converts an array to null if empty, the single entry if length is one, or returns the array.
 * @param array The array to convert
 */
export function toOneOrMany<T>(array: T[]): OneOrMany<T> | null {
  return array.length === 0 ? null : array.length === 1 ? array[0] : array;
}
