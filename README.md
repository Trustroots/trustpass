# Angular Trustpass

The trusty password security checklist.

This is a simple password strength meter & validator inspired by MailChimp's [signup form](https://login.mailchimp.com/signup/).

[See demo](https://trustroots.github.io/trustpass)

![Screenshot](./example/screenshot.png)

Done by folks at [Trustroots.org](https://www.trustroots.org/)

## install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angular-trustpass --save
```

Then add `trTrustpass` as a dependency for your app:

```javascript
angular.module('demoApp', ['trTrustpass']);
```

### bower

```shell
bower install angular-trustpass --save
```

Add `<script>` and `<link>` to your page:
```html
<link rel="stylesheet" href="bower_modules/angular-trustpass/dist/tr-trustpass.css">
<script src="bower_modules/angular-trustpass/dist/tr-trustpass.js"></script>
```

Then add `trTrustpass` as a dependency for your app:

```javascript
angular.module('demoApp', ['trTrustpass']);
```

## Usage

#### Basic

```html
<input type="password" tr-trustpass>
```

#### With options

```html
<input type="password" tr-trustpass="{special: false}" ng-minlength="9">
```

#### Using with [Bootstrap](http://getbootstrap.com/) classes:

```html
<form name="demo">
  <div class="form-group" ng-class="{'has-error': demoForm.password.$invalid && demoForm.password.$dirty,
                                     'has-success': !demoForm.password.$invalid && demoForm.password.$dirty}">
    <label for="password">Password</label>
    <input id="password"
           class="form-control"
           type="password"
           name="password"
           placeholder="Password"
           tr-trustpass="{maximum: true, special: false, messageGuide: 'Make sure your password meets these requirements:'}"
           ng-minlength="9"
           ng-maxlength="90"
           ng-model="password">
  </div>
  <button type="submit" ng-disabled="demo.password.$invalid" class="btn btn-primary">Sign in</button>
</form>
```

Password model will have `$invalid` set true and `$error.trustpass` set true when any of the tests fail. You can then style your form or input with [Angular validation classes](https://docs.angularjs.org/guide/forms#using-css-classes).

## Options

Pass a json object to `tr-trustpass` like this: `tr-trustpass="{maximum: true, special: false}"`

#### Available tests

| **Option** | Default | Description                                                                                                               |
|------------|---------|---------------------------------------------------------------------------------------------------------------------------|
| lowercase  | true    | Find a-z                                                                                                                  |
| uppercase  | true    | Find A-Z                                                                                                                  |
| number     | true    | Find 0-9                                                                                                                  |
| special    | true    | Find a non-word character or the _ (underscore) character                                                                 |
| minimum    | true    | Check minimum length. Defaults to 8 but you can set it with ng-minlength or minlength attributes, or maxlength option.    |
| maximum    | false   | Check maximum length. Defaults to 50 but you can set it with ng-maxlength or maxlength attributes, or maxlength option). |
| word       | false   | Find a word character.

*"A word character" is a character from a-z, A-Z, 0-9, including the _ (underscore) character.*

#### Other settings

| **Option**   | Default                                         | Description                                                                  |
|--------------|-------------------------------------------------|------------------------------------------------------------------------------|
| toggle       | false                                           | Should checklist be visible only on focus?                                   |
| keepHeight   | false                                           | Should dropdown area keep its initially rendered height?                     |
| minlength    | 8                                               | Minimum length of the password, if minimum test is enabled (on by default).  |
| maxlength    | 50                                              | Maximum length of the password, if maximum test is enabled (off by default). |

#### Labels and messages

| **Option**      | Default                                         | Description                                                                                                         |
|-----------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| messageDone     | Great! Your password is secure.                 | A message shown after all tests pass.                                                                               |
| messageGuide    |                                                 | A message on top of checklist. Leave empty to hide.                                                                 |
| lowercaseLabel  | One lowercase character                         | Label for the lowercase test                                                                                        |
| uppercaseLabel  | One uppercase character                         | Label for the uppercase test                                                                                        |
| numberLabel     | One number                                      | Label for the number test                                                                                           |
| specialLabel    | One special character                           | Label for the special test                                                                                          |
| minimumLabel    | characters minimum                              | Label for the minimum test. The ng-minlength value will be prepend to the label (f.i.: 8 characters minimum)        |
| maximumLabel    | characters maximum                              | Label for the maximum test. The ng-maxlength value will be prepend to the label (f.i.: 8 characters maximum)        |
| wordLabel       | Alphanumeric characters                         | Label for the word test                                                                                             |

## Development

[Ideas](https://github.com/Trustroots/trustpass/issues) and pull requests totally welcome!

#### Install dependencies

```bash
npm install
```

#### Build

```bash
gulp
```

#### Run the example

```bash
gulp demo
```
...and open [http://localhost:3000/](http://localhost:3000/) to your browser.

## License

[MIT](LICENSE.md)
