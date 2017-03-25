'use strict';  
(function (module) {
module.factory('YaraBaseUrl',function(){
  return {
   //url:'http://52.74.132.241:8081/api/yara/web'
   //url:'http://52.74.132.241:8082/api/yara/web',
   // url:'http://192.168.0.110:8000/api/yara/web',
     // url:'http://192.168.0.122:8000/api/yara/web',
     // url:'http://54.254.147.95:8080/api/yara/web',
   url:'https://yara.events/api/yara/web',
   baseUrl:'http://localhost:8000/',
   yara:'https://yara.io/',
   yaraevents:'http://localhost:8000/',
    DST_KEY:"AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo",
    GOOGLE_PLACES:"AIzaSyCV9Dg0e7cZQv4kV50S9eDUFQdIUCSN7RM",
    GOOGLE_MAP:"AIzaSyBUCsNPiyH0baDssE7vSIAMAgYN3CAlc6Y",
    captcha_key:"6LeYeSETAAAAAFgSJd0e4v3I_D2u6ON7eDqaeurh"
  };
});
}(angular.module('Credentails',[])));