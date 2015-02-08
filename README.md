nui-form-for
===========

AngularJS Validation Rule Injector from an Object
 [DEMO](https://rawgit.com/allenhwkim/nui-form-for/master/testapp/simple.html)

How It Works
------------
This module injects Angular validation rules from an object ONLY if not defined.  

For example, there is validation rule given as `{minlength:1}`,   
This input  `<input name="foo" />`    
will become `<input name="foo" ng-minlength="1"  ng-model="user.foo"  />`    

However, rule given as `{minlength:1}`,   
This input  `<input name="foo" ng-minlength="20" />`   
will become `<input name="foo" ng-minlength="20"  ng-model="user.foo"  />`

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

Requirements For This Module
------------------------------

  0. Must be 100% compliant to AngularJS directives;
     * ngmessages, ngmessage
     * form, input, ng-minlenght, ng-maxlenth, ... etc

  1. Must accept validation rule as a form attriute matching to an object  
    i.e., `<form ng-form-for="<<MODEL-OBJECT>>" ng-rules="<<ALL-RULES-FOR-FORM>>">`  

  2. Must accept validation rule as a form field attribute  
     i.e.,  `<input .... ng-rule="<<VALIDATIN-RULE-NAME>>">`

  3. Must NOT overwrite AngularJS tag validation rules, and HTML5 validation rules.   
     For example, assuming there is rule {min:10, max:20}, and html has input tag attribute min="1"
     then applying rule must be {min:1, and max:20} because min=1 is given from html already.

LICENSE
--------
    MIT 
