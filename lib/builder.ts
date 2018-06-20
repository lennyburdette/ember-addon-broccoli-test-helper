import { Changes, createBuilder, Output, Tree } from "broccoli-test-helper";
import { join } from "path";

// PRIVATE API ACCESS
const EmberApp: any = require("ember-cli/lib/broccoli/ember-app");
const _resetTreeCache: any = require("ember-cli/lib/models/addon")._resetTreeCache;

export interface Options { workingDir: string; }

export default class Builder {
  public path: string;

  public options: Options;

  private wrappedBuilder!: Output;

  constructor(path: string, options?: Options) {
    this.path = path;
    this.options = Object.assign({
      workingDir: "application"
    }, options);
  }

  get builder(): Output {
    if (this.wrappedBuilder) {
      return this.wrappedBuilder;
    }

    const cwd = process.cwd();
    process.chdir(join(this.path, this.options.workingDir));

    try {
      const emberApp = new EmberApp();
      const wrappedBuilder = createBuilder(emberApp.toTree([]));
      this.wrappedBuilder = wrappedBuilder;
    } finally {
      process.chdir(cwd);
    }

    return this.wrappedBuilder;
  }

  public build(): Promise<void> {
    try {
      return this.builder.build();
    } finally {
      _resetTreeCache();
    }
  }

  public changes(): Changes {
    return this.builder.changes();
  }

  public dispose(): Promise<void> {
    return this.builder.dispose();
  }

  public read(from?: string): Tree {
    return this.builder.read(from);
  }
}
