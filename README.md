nui-form-for
===========

AngularJS Validation Rule Injector from an Object

How It Works
------------
This module injects Angular validation rules from an object ONLY if not defined.  

For example, there is validation rule given as `{min:1}`, 
This input `<input name="foo" />`  
will become `<input name="foo" ng-model="user.foo" ng-minlength="1" />`  

Why `nui-form-for`?
--------------------

   * 100% AngularJS compliant
   * clean html when you want
   * validation by object
   * sync/async validation injection

Install
--------

  1. $ bower install nui-form-for
  2. add script `<script src="nui-form-for.js"></script>`

Usage Example
--------------

  For entire form  [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/testapp/simple.html)

    <form name="myForm" nui-form-for="user" validation-rule="user.json">
      Name: <input type="text" name="name"  /><br />
      Nick Name: <input type="text" name="nickName" /><br />
      E-mail: <input name="email" /><br />
      <input type="checkbox" name="agree" /> I agree<br/>
    </form>

  For a single field [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/testapp/simple-inline.html)

    <form name="myForm">
      <input name="name" nui-rule="name" ng-model="foo" />
    </form>

Requirements
-------------

  0. Must be 100% compliant to AngularJS directives;
     * ngmessages, ngmessage
     * form, input, ng-minlenght, ng-maxlenth, ... etc

  1. `<form ng-form-for="<<MODEL-OBJECT>>" ng-rules="<<ALL-RULES-FOR-FORM>>">`
     Take model object with validation rules and inject those rules to form elements

  2. `<input .... ng-rule="<<VALIDATIN-RULE-NAME>>">`

  3. `<input .... ng-rule name="<<VALIDATIN-RULE-NAME>>">`
     Apply validation rule. works as ng-validate="ruleName"

  4. must NOT overwrite AngularJS tag validation rules, and HTML5 validation rules.   
     For example, assuming there is rule {min:10, max:20}, and html has input tag attribute min="1"
     then applying rule must be {min:1, and max:20} because min=1 is given from html already.

LICENSE
--------
    MIT 
