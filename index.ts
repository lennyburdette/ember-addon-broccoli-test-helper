import Input from './lib/input';
import Output, { Options } from './lib/output';

export { default as FixtureBuilder } from './lib/builder';
export { default as ApplicationBuilder } from './lib/builders/application';
export { default as AddonBuilder } from './lib/builders/addon';

export async function createTempDir() {
  return await Input.create();
}

export function createBuilder(path: string, options?: Options) {
  return new Output(path, options);
}
