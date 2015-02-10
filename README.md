Graceful AngularJS Form Validation Injector
============================================

 [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/demo/simple.html)
 
 ![Imgur](http://i.imgur.com/tcErJpP.png?1)

How It Works
------------
This module gracefully injects Angular validation rules from a JSON object ONLY if not defined.

For example, there is validation rule given as `{minlength:1}`,  

This input  | Will become
------------- | -------------
`<input name="foo" />` | `<input name="foo" ng-minlength="1"  ng-model="user.foo"  />`    
`<input name="foo" ng-minlength="20" />` | `<input name="foo" ng-minlength="20"  ng-model="user.foo"  />`


Why Another Validator
----------------------

There are many form validation modules in github, but There is none found which is 100% AngularJS syntax compliant validator. All of them are using its own syntax by ignoring AngularJS syntax, `ng-minlength`, `min`, `max`, etc.  

Mosf of develoers do not want to learn another syntax for another validator because AngularJS provides good ones already. This module takes advantage of AngularJS and cleaner HTML with validation rule object.

   * It is 100% AngularJS compliant
   * You can have cleaner html as you wish
   * It allows form validation by an object
   * You can use server-side validation

Install
--------

  1. bower install  
     `$ bower install nui-form-for`
  2. add script to your page 
     `<script src="nui-form-for.js"></script>`
  3. add dependency to your module  
     `var myapp = angular.module('myapp', ['nui-form-for']);`

To use application prefix instead of `nui-*`, simply define nuiPrefix before you add `nui-form-for.js`.
There is [example](https://rawgit.com/allenhwkim/nui-form-for/master/demo/with-prefix.html) for this.
```
   <script> var nuiPrefix = "ute"; </script>
   <script src="nui-form-for.js"></script>
```

Usage Example
--------------

  For entire form  [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/demo/simple.html)

    <form name="myForm" nui-form-for="user" validation-rule="user.json">
      Name: <input type="text" name="name"  /><br />
      Nick Name: <input type="text" name="nickName" /><br />
      E-mail: <input name="email" /><br />
      <input type="checkbox" name="agree" /> I agree<br/>
    </form>

  For a single field [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/demo/simple-inline.html)

    <form name="myForm">
      <input name="name" nui-rule="name" ng-model="foo" />
    </form>

Directives / Attributes
-----------------------

  * `nui-form-for`

    object variable that is related to the form.

  * `validation-rule`

    server-side validation rule object. Please refer to the following example
    If ommitted, it's using `$scope.validationRule`, so please specify the object accordingly.

        {
          "name": {
            "minlength": 2,
            "maxlength": 10,
            "message": "Invalid user name"
          },
          "nickName": {
            "required": false,
            "minlength": {
              "value": 3,
              "message": "nick name must have 3 letters"
            },
            "maxlength": {
              "value": 10,
              "message": "nick name must have  less than 10 letters"
            },
            "message": "nick name must be a valid one"
          },
          "email": {
            "type": "email"
          },
          "dob": {
            "type": "date"
          },
          "time": {
            "type": "time"
          },
          "homepage": {
            "type": "url"
          },
          "gender": {
            "pattern": "male|female"
          },
          "creditCard": {
            "pattern": "([0-9]{4}[ -]?){4}"
          },
          "agree": {}
        }

  * `nui-rule`
    
    the name of validation rule to apply to the form field. i.e. `rui-rule="email"`. 
    The validation rules must be specified in `$scope.validationRule`.


Initial Requirements For This Module
--------------------------------------

  0. Must be 100% compliant to AngularJS directives;
     * ngmessages, ngmessage
     * form, input, ng-minlenght, ng-maxlenth, ... etc

  1. Must accept validation rule as a form attriute matching to an object  
    i.e., `<form nui-form-for="<<MODEL-OBJECT>>" nui-rule="<<ALL-RULES-FOR-FORM>>">`  

  2. Must accept validation rule as a form field attribute  
     i.e.,  `<input .... nui-rule="<<VALIDATIN-RULE-NAME>>">`

  3. Must NOT overwrite AngularJS tag validation rules, and HTML5 validation rules.   
     For example, assuming there is rule `{min:10, max:20}`, and html has input tag attribute `min=1`
     then applying rule must be `{min:1, and max:20}` because `min=1` is given from html already.

LICENSE
--------
    MIT 
