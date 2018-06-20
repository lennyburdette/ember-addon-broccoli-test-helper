function writeFile(filename: string, contents: string, receiver: object) {
  const pathParts = filename.split("/");
  const directories = pathParts.length > 1 ? pathParts.slice(0, -1) : [];
  const file = pathParts.slice(-1)[0];

  let current: any = receiver;
  for (const part of directories) {
    current[part] = current[part] || {};
    current = current[part];
  }

  current[file] = contents;
}

export default class Builder {
  public files: Map<string, string> = new Map();

  public application(app: Map<string, string>) {
    for (const [filename, contents] of app) {
      this.files.set(filename, contents);
    }

    return this;
  }

  public addon(addon: Map<string, string>) {
    for (const [filename, contents] of addon) {
      this.files.set(filename, contents);
    }

    return this;
  }

  public file(name: string, contents: string) {
    this.files.set(name, contents);
    return this;
  }

  public build() {
    const result = {};

    for (const [name, contents] of this.files) {
      writeFile(name, contents, result);
    }

    return result;
  }
}
