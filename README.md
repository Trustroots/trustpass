# Angular Trustpass
The trusty password security checklist.

This is a simple password strength meter & validator inspired by MailChimp's [signup form](https://login.mailchimp.com/signup/).

![Screenshot](./example/screenshot.png)

#### Usage
```html
<input type="password" tr-trustpass>
```

#### Usage with options
```html
<input type="password" tr-trustpass="{special: false, maximum: true}" ng-minlength="9" ng-maxlength="90">
```

#### More complicated usage with [Bootstrap](http://getbootstrap.com/) classes:
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
           ng-model="password">
  </div>
  <button type="submit" ng-disabled="demo.password.$invalid" class="btn btn-primary">Sign in</button>
</form>
```

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
| maximum    | false   | Check maximum length. Ddefaults to 50 but you can set it with ng-maxlength or maxlength attributes, or maxlength option). |
| word       | false   | Find a word character.

*"A word character" is a character from a-z, A-Z, 0-9, including the _ (underscore) character.*

#### Other settings
| **Option** | Default                                         | Description                                                                  |
|------------|-------------------------------------------------|------------------------------------------------------------------------------|
| toggle     | false                                           | Should checklist be visible only on focus?                                   |
| keepHeight | false                                           | Should dropdown area keep its initially rendered height?                     |
| minlength  | 8                                               | Minimum length of the password, if minimum test is enabled (on by default).  |
| maxlength  | 50                                              | Maximum length of the password, if maximum test is enabled (off by default). |
| message    | Great! Your password is secure. | A message shown after all tests pass.                                        |


### License
[MIT](LICENSE.md)
