import AbstractFixture from "./abstract";

export default class Application extends AbstractFixture {
  constructor(name = "application") {
    super(name);
    this.applyDefaults();
  }

  public applyDefaults() {
    this.file("app/styles/app.css", "");
    this.file(
      "config/environment.js",
      `module.exports = function() {
  return { modulePrefix: "${this.name}" };
};
`
    );
    this.file("app/index.html", "");
    this.file("ember-cli-build.js", "module.exports = {};");

    this.packageJSON({
      "devDependencies": {
        "ember-cli": "*",
        "ember-cli-babel": "*",
        "ember-cli-htmlbars": "*",
        "ember-engines": "*",
        "ember-source": "*",
        "loader.js": "*"
      },
      "ember-addon": {
        paths: []
      },
      "name": this.name
    });
  }

  /**
   * Adds an addon to the application's package.json config for discovery. Use
   * this in tandem with the `as` option of `Input#installDependencies` to link
   * the addon under test in the Ember CLI build.
   * @param name name of the addon directory
   */
  public inRepoAddon(name: string) {
    this.packageJSON((rendered: any) => {
      const emberAddon = rendered["ember-addon"] || {};
      const paths = emberAddon.paths || [];
      const addonPath = `../${name}`;

      emberAddon.paths = paths.concat(addonPath);

      return {
        config: {
          "ember-addon": emberAddon
        }
      };
    });

    return this;
  }
}
