import AbstractBuilder from './abstract';

export default class AddonBuidler extends AbstractBuilder {
  constructor(name = 'my-addon') {
    super(name);
    this.applyDefaults();
  }

  public applyDefaults(): void {
    this.file(
      'config/environment.js',
      `module.exports = function() {
  return {};
};
`
    );
    this.file('index.js', `module.exports = { name: "${this.name}" };`);

    this.packageJSON({
      dependencies: {
        'ember-cli-babel': '*',
        'ember-cli-htmlbars': '*'
      },
      keywords: ['ember-addon'],
      name: this.name
    });
  }
}
