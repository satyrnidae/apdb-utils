import { default as cd } from 'check-dependencies';
import { Resolve } from './types';

type Scope = 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies';

type Config = {
  packageManager?: 'npm' | 'bower',
  packageDir?: string,
  onlySpecified?: boolean,
  install?: boolean,
  scopeList?: Scope[],
  optionalScopeList?: Scope[],
  checkCustomPackageNames?: boolean,
  checkGitUrls?: boolean,
  verbose?: boolean,
  log?: (...data: any[]) => void,
  error?: (...data: any[]) => void
}

type Output = {
  status: number,
  depsWereOk: boolean,
  log: any[],
  error: any[]
}
export async function checkDependenciesAsync(config: Config): Promise<Output> {
  return new Promise<Output>((resolve: Resolve<Output>) => {
    cd(config, (output: Output) => {
      resolve(output);
    });
  });
}
