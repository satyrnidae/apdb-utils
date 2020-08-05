import { LoopStateArgs } from './loop-state-args';

export async function forEach<T>(array: T[], callback: (current: T, index: number, array: T[], loopStateArgs: LoopStateArgs) => Promise<any>): Promise<any> {
  const loopStateArgs: LoopStateArgs = new LoopStateArgs();

  for (let index = 0; index < array.length; ++index) {
    await callback(array[index], index, array, loopStateArgs);

    if (!loopStateArgs.continueExecution) {
      break;
    }
  }
}

export async function forEachAsync<T>(array: T[], callback: (current: T, index: number, array: T[]) => Promise<any>): Promise<any> {
  const promises: Promise<any>[] = [];

  for (let index = 0; index < array.length; ++index) {
    promises.push(callback(array[index], index, array));
  }

  return Promise.all(promises);
}
