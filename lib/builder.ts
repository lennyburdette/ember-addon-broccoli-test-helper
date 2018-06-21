import { Tree } from 'broccoli-test-helper';

export type FileMap = Map<string, string>;

/**
 * "Writes" a file to a fixture tree by converting directories in paths to
 * TreeEntry objects.
 */
function writeFile(filename: string, contents: string, receiver: Tree): void {
  const pathParts = filename.split('/');
  const directories = pathParts.length > 1 ? pathParts.slice(0, -1) : [];
  const file = pathParts.slice(-1)[0];

  let current: Tree = receiver;
  for (const part of directories) {
    current[part] = current[part] || ({} as Tree);
    current = current[part] as Tree;
  }

  current[file] = contents;
}

export default class Builder {
  public readonly files: FileMap = new Map();

  public application(app: FileMap): this {
    for (const [filename, contents] of app) {
      this.files.set(filename, contents);
    }

    return this;
  }

  public addon(addon: FileMap): this {
    for (const [filename, contents] of addon) {
      this.files.set(filename, contents);
    }

    return this;
  }

  public file(name: string, contents: string): this {
    this.files.set(name, contents);
    return this;
  }

  public build(): Tree {
    const result = {};

    for (const [name, contents] of this.files) {
      writeFile(name, contents, result);
    }

    return result;
  }
}
