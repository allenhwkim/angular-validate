var nuiFormFor=angular.module('nui-form-for',[]);

/* global nuiFormFor */
(function(){
  'use strict';
  var mapping = {
    'required'  : 'ng-required',
    'minlength' : 'ng-minlength',
    'maxlength' : 'ng-maxlength',
    'min'       : 'min',
    'max'       : 'max',
    'pattern'   : 'pattern',
    'type'      : 'type'
  };

  var controller = ['$scope', '$element', '$attrs', '$http','$q', '$compile',
    function($scope, $element, $attrs, $http, $q, $compile) {
      
      this.compile = function (element) {
        $compile(element)($scope);
      };
      
      this.getValidationRule = function() {
        var deferred = $q.defer();
        if (typeof $scope.validationRule == "object") {
          deferred.resolve($scope.validationRule);
        } else {
          var url = $attrs.validationRule;
          console.log('getting validation rules from', url);
          $http.get(url).then(function(resp) {
            deferred.resolve(resp.data);
          });
        }
        return deferred.promise;
      };
      
      this.injectValidationRule = function(formRules) {
        var form = $element[0];
        var modelName = $attrs.nuiFormFor;
        for (var elName in formRules) {
          var str = 'input[name=VAL], '+
            'select[name=VAL], '+
            'textarea[name=VAL]';
          var selectorStr = str.replace(/VAL/,'"'+elName+'"');
          var formEls = form.querySelectorAll(selectorStr);
          var elRules = formRules[elName];
          
          for (var i=0; i<formEls.length; i++) {
            var el = formEls[i];
            if (el.getAttribute('ng-model')) {
              console.log('ng-model already defined, skipping', el);
            } else {
              el.setAttribute('ng-model', modelName +'.'+elName);
              elRules.required = elRules.required || "true";
              for (var rule in elRules) {
                var attrKey = mapping[rule], attrVal = elRules[rule];
                if (el.getAttribute(attrKey)) {
                  console.log(attrKey, 'is already defined. skipping', el);
                } else {
                  if (attrVal) {
                    (typeof attrVal == "object") && (attrVal = attrVal.value);
                    el.setAttribute(attrKey, attrVal);
                  } 
                }
              }
              this.compile(el);
            }
          } // for (formEls)
          
        } // for (elName in rules)
      }; // function    
      
      this.injectErrorMessages = function(formRules) {
        var formName = $element[0].getAttribute("name");
        for (var elName in formRules) {
          var msgObj = {};
          var generalMsg = formRules[elName].message;
          generalMsg && (msgObj.general = generalMsg);
          for (var key in formRules[elName]) {
            var rule = formRules[elName][key];
            if (typeof rule == "object" && rule.message) {
              msgObj[key] = rule.message;
            }
          }
          if (Object.keys(msgObj).length > 0) {
            $scope[formName][elName].message = msgObj;
          }
        } // for elName in formRules
      };
    }
  ];

  nuiFormFor.directive("nuiFormFor", function() {
    return {
      controller: controller, 
      link: function(scope, element, attrs, ctrl) {
        var form = element[0];
        var formName = form.getAttribute('name');
        if (!formName || form.tagName !== "FORM") {
          return false; 
        }
        form.setAttribute('novalidate','');
        
        ctrl.getValidationRule().then(function(formRules) {
          ctrl.injectValidationRule(formRules);
          return formRules;
        }).then(function(formRules) {
          ctrl.injectErrorMessages(formRules);
        });
      }
    };
  });

})();

/* global nuiFormFor */
(function(){
  'use strict';
  var mapping = {
    'required'  : 'ng-required',
    'minlength' : 'ng-minlength',
    'maxlength' : 'ng-maxlength',
    'min'       : 'min',
    'max'       : 'max',
    'pattern'   : 'pattern',
    'type'      : 'type'
  };

  nuiFormFor.directive("nuiRule", function($compile) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs) {
        var el = element[0];
        var ruleName = attrs.ngRule || attrs.name;
        var elRules = scope.validationRule[attrs.nuiRule];
        elRules.required = elRules.required || "true";
        for (var rule in elRules) {
          var attrKey = mapping[rule], attrVal = elRules[rule];
          if (el.getAttribute(attrKey)) {
            console.log(attrKey, 'is already defined. skipping', el);
          } else {
            if (attrVal) {
              (typeof attrVal == "object") && (attrVal = attrVal.value);
              el.setAttribute(attrKey, attrVal);
            } 
          }
        }
        el.removeAttribute("nui-rule"); // to prevent loop
        $compile(el)(scope);
      } // link
    }; // return
  });

})();
