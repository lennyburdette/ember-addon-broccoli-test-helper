import { createTempDir, TempDir, Tree } from "broccoli-test-helper";
import { symlinkSync } from "fs";
import { join } from "path";

interface Options {
  as?: string;
}

export default class Input {
  public static async create() {
    const input = await createTempDir();
    return new Input(input);
  }

  /**
   * @private
   */
  public wrappedInput: TempDir;

  constructor(input: TempDir) {
    this.wrappedInput = input;
  }

  public copy(from: string, to?: string) {
    return this.wrappedInput.copy(from, to);
  }

  public dispose() {
    return this.wrappedInput.dispose();
  }

  /**
   * Symlinks packages so that the Ember CLI application can find its
   * dependencies.
   * @param addonPath - absolute path to the root directory of the project
   * @param options.as - name of the addon directory
   */
  public installDependencies(addonPath: string, options: Options) {
    if (!options.as) {
      throw new Error(
        "You must provide an `as` option to `installDependecies`."
      );
    }

    this.symlinkSync(addonPath, options.as);
    this.symlinkSync(join(addonPath, "node_modules"), "node_modules");
  }

  public path() {
    return this.wrappedInput.path();
  }

  public read() {
    return this.wrappedInput.read();
  }

  public symlinkSync(target: string, path: string) {
    symlinkSync(target, join(this.wrappedInput.path(), path));
  }

  public write(tree: Tree, to?: string) {
    return this.wrappedInput.write(tree, to);
  }
}
