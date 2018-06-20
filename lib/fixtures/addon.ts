import AbstractFixture from "./abstract";

export default class Addon extends AbstractFixture {
  constructor(name = "my-addon") {
    super(name);
    this.applyDefaults();
  }

  public applyDefaults() {
    this.file(
      "config/environment.js",
      `module.exports = function() {
  return {};
};
`
    );
    this.file("index.js", `module.exports = { name: "${this.name}" };`);

    this.packageJSON({
      dependencies: {
        "ember-cli-babel": "*",
        "ember-cli-htmlbars": "*"
      },
      devDependencies: {
        "ember-engines": "*"
      },
      keywords: ["ember-addon"],
      name: this.name
    });
  }
}
