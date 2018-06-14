ember-addon-broccoli-test-helper
==============================================================================

Test helpers for Ember Addons that make testing build and rebuild behavior
dead simple and diff friendly. It provides a similar API to
[broccoli-test-helper][bth] and helpers for scaffolding out a temporary
Ember CLI application.

Has TypeScript declarations and supports async/await style testing.


Installation
------------------------------------------------------------------------------

```
npm install --save-dev ember-addon-broccoli-test-helper
```
or
```
yarn add --dev ember-addon-broccoli-test-helper
```


How It Works
------------------------------------------------------------------------------

Using `createTempDir()`, `Input#installDependencies`, and the fixture builders,
you can set up a temp directory like this:

```
/tmp/abcd1234/
  application/
    app/
    config/
    package.json
  my-addon/
    addon/
    index.js
  node_modules/
    ember-cli/
    ember-source/
```

The `my-addon` and `node_modules` directories are symlinks to your addon and its
dependencies.

The `application` directory contains a simplified Ember application scaffold
that references the `my-addon` directory in its package.json for Ember CLI
to discover when it builds the application.

After calling `output.build()`, you can inspect the results with the same
[broccoli-test-helper][bth] API.


Usage Examples
------------------------------------------------------------------------------

See [test/acceptance.test.ts](test/acceptance.test.ts) for an example usage.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-addon-broccoli-test-helper`
* `yarn install`

### Linting

* `yarn lint`
* `yarn lint --fix`

### Running tests

* `yarn test`


License
------------------------------------------------------------------------------

This project is licensed under the [Apache-2.0 License](LICENSE.md).

[bth]: https://github.com/broccolijs/broccoli-test-helper
