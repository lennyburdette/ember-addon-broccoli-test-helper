import { defaultsDeep } from 'lodash';
import { FileMap } from '../builder';

type PackageJSON = object;
// PackageJSONParts are merged together to form the full PackageJSON object
type PackageJSONPart = object;
type PackageJSONEditor = (object: PackageJSON) => PackageJSONPart;

export default class AbstractBuilder {
  public readonly name: string;

  public readonly files: FileMap = new Map();

  public readonly packageJSONParts: PackageJSONPart[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public file(name: string, contents: string): this {
    this.files.set(name, contents);
    return this;
  }

  public packageJSON(arg: PackageJSONEditor | PackageJSONPart): this {
    if (typeof arg === 'function') {
      const rendered = this._renderPackageJSON();
      this.packageJSON(arg(rendered));
    } else {
      this.packageJSONParts.push(arg);
    }

    return this;
  }

  public build(): FileMap {
    const files = new Map<string, string>();

    for (const [filename, contents] of this.files) {
      files.set(`${this.name}/${filename}`, contents);
    }

    const packageJSON = this._renderPackageJSON();

    files.set(`${this.name}/package.json`, JSON.stringify(packageJSON));

    return files;
  }

  private _renderPackageJSON(): PackageJSON {
    return this.packageJSONParts.reduce((acc, next) => defaultsDeep(acc, next));
  }
}
