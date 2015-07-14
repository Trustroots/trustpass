# Angular Trustpass
The trusty password security checklist.

This is a simple password strength meter & validator inspired by MailChimp's [signup form](https://login.mailchimp.com/signup/).

Usage:
```html
<input type="password" tr-trustpass>
```

More complicated usage with [Bootstrap](http://getbootstrap.com/) classes:
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
           tr-trustpass="{maximum: true, special: false}"
           ng-minlength="9"
           ng-model="password">
  </div>
  <button type="submit" ng-disabled="demo.password.$invalid" class="btn btn-primary">Submit</button>
</form>
```

#### Options
Pass a json object to `tr-trustpass` like this: `tr-trustpass="{maximum: true, special: false}"`

##### Available tests:
* __lowercase:__ true * — Find a-z*
* __uppercase:__ true * — Find A-Z*
* __number:__ true * — Find 0-9*
* __special:__ true * — Find a non-word character or the _ (underscore) character*
* __minimum:__ true * — Check minimum length (defaults to 8 but you can set it with ng-minlength or minlength attributes)*
* __maximum:__ false * — Check maximum length*
* __word:__ false *— Find a word character*

*"A word character" is a character from a-z, A-Z, 0-9, including the _ (underscore) character.*

##### Other settings:
* __toggle:__ false *— Should checklist be visible only on focus?*
* __minlength:__ 8 *— Minimum length of the password, if minimum test is enabled (on by default).*
* __maxlength:__ 50 *— Maximum length of the password, if maximum test is enabled (off by default).*
* __message:__ 'Your password is secure and you are good to go!' *— A message shown after all tests pass.*


### License
[MIT](LICENSE)
