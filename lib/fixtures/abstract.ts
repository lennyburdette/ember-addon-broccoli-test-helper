import { defaultsDeep } from "lodash";

export default class AbstractFixture {
  public name: string;

  public files: Map<string, string> = new Map();

  public packageJSONObjects: object[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public file(name: string, contents: string) {
    this.files.set(name, contents);
    return this;
  }

  public packageJSON(arg: ((object: any) => object) | any) {
    if (typeof arg === "function") {
      const rendered = this._renderPackageJSON();
      this.packageJSON(arg(rendered));
    } else {
      this.packageJSONObjects.push(arg);
    }

    return this;
  }

  public _renderPackageJSON() {
    return this.packageJSONObjects.reduce((acc, next) =>
      defaultsDeep(acc, next)
    );
  }

  public build() {
    const files = new Map<string, string>();

    for (const [filename, contents] of this.files) {
      files.set(`${this.name}/${filename}`, contents);
    }

    const packageJSON = this._renderPackageJSON();

    files.set(`${this.name}/package.json`, JSON.stringify(packageJSON));

    return files;
  }
}
