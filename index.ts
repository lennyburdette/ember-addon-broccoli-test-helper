import Builder, { Options } from './lib/builder';
import Input from './lib/input';

export { default as FixtureBuilder } from './lib/fixture';
export { default as ApplicationFixture } from './lib/fixtures/application';
export { default as AddonFixture } from './lib/fixtures/addon';

export async function createTempDir() {
  return await Input.create();
}

export function createBuilder(path: string, options?: Options) {
  return new Builder(path, options);
}
