(function(window, angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @module trTrustpass
   * @name trTrustpass
   * @restrict A
   * @scope
   */
  angular
    .module('trTrustpass', [])
    .directive('trTrustpass', trTrustpass);

  trTrustpass.$inject = ['$compile', '$timeout'];

  function trTrustpass($compile, $timeout) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        value: '=ngModel',
        trTrustpass: '=trTrustpass'
      },
      link: link
    };

    function link(scope, element, attrs, ngModel, transclude) {

      scope.isAllValid = false;
      scope.checklist = {};

      // Extend our default options with user provided options
      scope.options = angular.extend({

          // Tests
          // "A word character": a character from a-z, A-Z, 0-9, including the _ (underscore) character.
          lowercase: true, // Find a-z
          uppercase: true, // Find A-Z
          number: true, // Find 0-9
          special: true, // Find a non-word character or the _ (underscore) character
          minimum: true, // Check minimum length
          maximum: false, // Check maximum length
          word: false, // Find a word character

          // Settings
          toggle: false,
          minlength: 8,
          maxlength: 50,
          keepHeight: false,
          messageGuide: '',

          // Text
          lowercaseLabel: 'One lowercase character',
          uppercaseLabel: 'One uppercase character',
          numberLabel: 'One number',
          specialLabel: 'One special character',
          minimumLabel: 'characters minimum',
          maximumLabel: 'characters maximum',
          wordLabel: 'Alphanumeric characters',
          messageDone: 'Great! Your password is secure.'
      }, scope.trTrustpass);


      /**
       * Override options with min/maxlength attributes (either native HTML)
       */
      if(attrs.ngMaxlength || attrs.maxlength) {
        scope.options.maxlength = attrs.ngMaxlength || attrs.maxlength;
      }
      if(attrs.ngMinlength || attrs.minlength) {
        scope.options.minlength = attrs.ngMinlength || attrs.minlength;
      }

      /**
       * Available tests to run
       * Tests should return true or false
       * Should test at least for one character occurance
       */
      var tests = {
        word:      function(p) { return p && /[\w]/.test(p) ? true : false; },
        lowercase: function(p) { return p && /[a-z]/.test(p) ? true : false; },
        uppercase: function(p) { return p && /[A-Z]/.test(p) ? true : false; },
        number:    function(p) { return p && /\d/.test(p) ? true : false; },
        special:   function(p) { return p && /[_\W]/.test(p) ? true : false; },
        minimum:   function(p) { return p && p.length >= scope.options.minlength ? true : false; },
        maximum:   function(p) { return p && p.length <= scope.options.maxlength ? true : false; },
      };


      // Add our custom parser into model's $parsers
      ngModel.$parsers.unshift(validatePasswordStrength);

      // Watch for changes in value
      scope.$watch('value', validatePasswordStrength);

      // Update the passport field whenever the value on the scope changes from outside
      ngModel.$render = function() {
        if(ngModel.$viewValue) {
          element.val(ngModel.$viewValue);
        }
      };

      // On form or controller reset
      ngModel.$setPristine = function() {
        ngModel.$setViewValue('');
        ngModel.$dirty = false;
        ngModel.$pristine = true;
      };

      // If toggling is in use, toggle on element focus
      scope.isVisible = !scope.options.toggle;
      if(scope.options.toggle) {
        scope.isVisible = false;
        element
          .bind('focus', function() {
            scope.isVisible = true;
            scope.$apply();
          })
          .bind('blur', function() {
            scope.isVisible = false;
            scope.$apply();
          });
      }

      /**
       * Append the template below input
       * This could be done with
       */
      var template = angular.element(
        '<section class="trustpass" ng-show="isVisible" ng-style="{height: (options.keepHeight ? initialHeight : \'auto\')}">' +
          '<div class="trustpass-guide" ng-if="isVisible && !isAllValid && options.messageGuide" ng-bind="options.messageGuide"></div>' +
          '<ul class="trustpass-checklist" ng-show="isVisible && !isAllValid">' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.word,      \'trustpass-yep\': checklist.word      }" ng-if="options.word">{{ ::options.wordLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.lowercase, \'trustpass-yep\': checklist.lowercase }" ng-if="options.lowercase">{{ ::options.lowercaseLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.uppercase, \'trustpass-yep\': checklist.uppercase }" ng-if="options.uppercase">{{ ::options.uppercaseLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.number,    \'trustpass-yep\': checklist.number    }" ng-if="options.number">{{ ::options.numberLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.special,   \'trustpass-yep\': checklist.special   }" ng-if="options.special">{{ ::options.specialLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.minimum,   \'trustpass-yep\': checklist.minimum   }" ng-if="options.minimum">{{ ::options.minlength }} {{ ::options.minimumLabel }}</li>' +
            '<li ng-class="{ \'trustpass-nope\': !checklist.maximum,   \'trustpass-yep\': checklist.maximum   }" ng-if="options.maximum">{{ ::options.maxlength }} {{ ::options.maximumLabel }}</li>' +
          '</ul>' +
          '<div class="trustpass-done" ng-show="isVisible && isAllValid" ng-bind="options.messageDone"></div>' +
        '</section>');
      // This would be jQuery's contentTr.insertAfter(element); ...but we don't want to depend on jQuery here.
      element[0].parentNode.insertBefore(template[0], element[0].nextSibling);
      $compile(template)(scope);

      // If keepHeight is true, save the initial height of the dropdown
      if(scope.options.keepHeight) {
        $timeout(function(){
          scope.initialHeight = element[0].nextSibling.clientHeight + 'px';
        });
      }

      /**
       * Run validators for a string
       * It's absolutely vital this returns the original string for ngModel.$parsers
       *
       * @param String password
       * @return String
       */
      function validatePasswordStrength(password) {
        var checklist = {};

        // Loop trough possible tests
        for(var test in tests) {
          // Is test enabled?
          if(scope.options[test] === true) {
            // Run test (but only if we have a password string)
            checklist[test] = tests.hasOwnProperty(test) ? tests[test](password) : false;
          }
        }

        scope.checklist = checklist;
        scope.isAllValid = checkIsAllValid(checklist);
        ngModel.$setValidity('trustpass', scope.isAllValid);

        return password;
      }

      /**
       * Determine if all required tests pass
       *
       * @param Object checklist
       * @return Boolean
       */
      function checkIsAllValid(checklist) {
        for(var flag in checklist) {
          // Check if the test is supposed to be validated and if the test fails
          if(checklist[flag] === false) {
            return false;
          }
        }
        return true;
      }

    }

  }

})(window, window.angular);
