import { Resolve } from "./types";

export async function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve: Resolve<void>) => {
    setTimeout(resolve, ms);
  });
}

