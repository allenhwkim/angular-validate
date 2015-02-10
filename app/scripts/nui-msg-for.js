/* global nuiPrefix, nuiFormFor */
(function(){
  'use strict';

  nuiFormFor.directive(nuiPrefix + "MsgFor", function($compile) {
    return {
      link: function(scope, element, attrs) {
        var el = element[0];
        var attrValue = attrs[nuiPrefix+"MsgFor"];
        var ngIfValue = attrValue + ".$touched && " + attrValue + ".$invalid";
        el.setAttribute("ng-if", ngIfValue);
        el.removeAttribute(nuiPrefix +  "-msg-for"); // IMPORTANT to prevent loop
        el.setAttribute( nuiPrefix + "-msg-for-removed", attrValue);
        $compile(el)(scope);
      } // link
    }; // return
  });

})();
