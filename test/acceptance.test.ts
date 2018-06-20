import { expect } from 'chai';
import { resolve } from 'path';
import {
  AddonBuilder,
  ApplicationBuilder,
  createBuilder,
  createTempDir,
  FixtureBuilder
} from '../index';

describe('basic functionality', function() {
  this.timeout(6000);

  let input: any;
  let output: any;

  afterEach(async () => {
    if (input) {
      await input.dispose();
    }
    if (output) {
      await output.dispose();
    }

    input = output = null;
  });

  it('builds everything', async () => {
    const addon = new AddonBuilder('test-addon')
      .file('addon/styles/addon.css', '.from-addon { background: red; }')
      .build();

    const app = new ApplicationBuilder()
      .file('app/templates/application.hbs', '<h1>Hello World</h1>')
      .inRepoAddon('addon-under-test')
      .inRepoAddon('test-addon')
      .build();

    const applicationFixture = new FixtureBuilder()
      .application(app)
      .addon(addon)
      .build();

    input = await createTempDir();
    output = createBuilder(input.path());

    input.installDependencies(resolve(__dirname, '../..'), {
      as: 'addon-under-test'
    });

    input.write(applicationFixture);

    await output.build();

    const files = output.read();

    expect(Object.keys(files.assets)).to.deep.equal([
      'application.css',
      'application.js',
      'application.map',
      'vendor.css',
      'vendor.js',
      'vendor.map'
    ]);

    expect(files.assets['application.js']).to.include('Hello World');
    expect(files.assets['vendor.css']).to.include('.from-addon');
  });
});
