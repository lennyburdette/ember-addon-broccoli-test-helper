import { createTempDir, TempDir, Tree } from "broccoli-test-helper";
import { symlinkSync } from "fs";
import { join } from "path";

interface Options {
  as?: string;
}

export default class Input {
  public static async create(): Promise<Input> {
    const input = await createTempDir();
    return new Input(input);
  }

  private readonly wrappedInput: TempDir;

  constructor(input: TempDir) {
    this.wrappedInput = input;
  }

  public copy(from: string, to?: string): void {
    return this.wrappedInput.copy(from, to);
  }

  public dispose(): Promise<void> {
    return this.wrappedInput.dispose();
  }

  /**
   * Symlinks packages so that the Ember CLI application can find its
   * dependencies.
   * @param addonPath - absolute path to the root directory of the project
   * @param options.as - name of the addon directory
   */
  public installDependencies(addonPath: string, options: Options): void {
    if (!options.as) {
      throw new Error(
        "You must provide an `as` option to `installDependecies`."
      );
    }

    this.symlinkSync(addonPath, options.as);
    this.symlinkSync(join(addonPath, "node_modules"), "node_modules");
  }

  public path(): string {
    return this.wrappedInput.path();
  }

  public read(): Tree {
    return this.wrappedInput.read();
  }

  public symlinkSync(target: string, path: string): void {
    symlinkSync(target, join(this.wrappedInput.path(), path));
  }

  public write(tree: Tree, to?: string): void {
    return this.wrappedInput.write(tree, to);
  }
}
