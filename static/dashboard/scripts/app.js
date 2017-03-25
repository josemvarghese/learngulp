// if(document.URL =="http://localhost:8000"){
//     location.replace("https://yara.io/");
// }
// if(document.URL =="http://localhost:8000/sign-in"){
//     location.replace("https://yara.io/");
// }
// We not using angular router , all pages are render by server side, every page has script tag including 
// only header and footer are partials, data-time picker script are not include in all pages so we moved required contoller to app1.js
// "vcRecaptcha" is google recaptcha which is injected for captcha - https://github.com/VividCortex/angular-recaptcha
// 'Image-Upload' is used to render images which uploaded and get image dataUrl
// 'YaraService' is service module which defined as module check Service.js
// In service module 'GetDataService' is used for all get request made in yara project and 'APPService' some reusable function
// 'YaraDirective' is module for directive and filter are defined
// 'Credentails' is module for base url for all request and google key are defined
// 'ngDroplet' is module allow drag and drop image uploading -http://ngmodules.org/modules/ngDroplet
// 'ngLocalize' is used to move all reuseable message to one single json file  - https://github.com/doshprompt/angular-localization
// 'infinite-scroll' is used to request api on scroll data is loaded Used in people page - https://sroze.github.io/ngInfiniteScroll/

var app=angular.module('yara',['vcRecaptcha','ngRoute','Image-Upload','YaraService','YaraDirective','Credentails','ngDroplet','ngLocalize','infinite-scroll']);
//Locale data config - https://github.com/doshprompt/angular-localization
app.value('localeConf', {
    basePath: '/static/dashboard/languages',
    fileExtension: '.lang.json',
});

app.directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);
            
            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );
                    
                }
            });
        }
    };
});


// console.log(document.referrer);
app.run(['$window','$anchorScroll','$rootScope','locale','YaraBaseUrl',function($window,$anchorScroll,$rootScope,locale,YaraBaseUrl) {
    // console.log(document.referrer);
    // console.log(YaraBaseUrl.yara);
    // console.log(YaraBaseUrl.yaraevents);
    // console.log(window.location);
    // console.log(window.location.pathname);



    
    // --- uncomment before launch---- checking direct url typing 
    // if((document.referrer=='' && window.location.pathname=='/sign-in')||(document.referrer=='' && window.location.href== YaraBaseUrl.yaraevents)||(document.referrer=='' && window.location.pathname== '/dashboard')|| (document.referrer=='' && window.location.pathname== '/reset-password-organizer')){
    //     window.location.replace(YaraBaseUrl.yara);       
    // }
    // ------------uncomment before launch





    // // scroll to top when page is loaded
    // $('html, body').animate({
    //     scrollTop: 0
    // });
    // $('a[data-toggle="tab"]').on('click',function(){
    //   $('html, body').animate({
    //     scrollTop: 0
    //   });
    // });

    // // <!-- Ad Blocker popup  -->
    // (function() {
    //     var test = document.createElement('div');
    //     test.innerHTML = '&nbsp;';
    //     test.className = 'adsbox';
    //     document.body.appendChild(test);
    //     // window.setTimeout(function() {
    //         if (test.offsetHeight === 0) {
    //           window.location.href = "content-blockers";             
    //         }
    //         test.remove();
    //     // }, 10000);
    // })();

    // $(document).ready(function(){
    // $('body').append("<div id=\"ads\" class=\"adsbygoogle facebook promote\"></div>");
    // if($('#ads').css('display')=='none'){

      // window.location.href = "content-blockers";
      // window.location="/content-blockers"
      // alert('Ad blocker is Enabled');
    //   var popup="<div class=\"modal fade\" id=\"myModal-test\" tabindex=\"-1\" data-backdrop=\"static\"  role=\"dialog\" aria-labelledby=\"myModalLabel\">";
    //   popup+="<div class=\"modal-dialog gatekeeper-popup\" role=\"document\" >";
    //   popup+="<div class=\"modal-content modal-padding\" >";
    //   popup+="<div class=\"modal-header-top \">";
    //     popup+="<h4 class=\"modal-title modal-heading\" id=\"myModalLabel\" >Blocker Enabled</h4>";
    //   popup+="</div >";
    //   popup+="<div class=\"modal-body1\">";
    //     popup+="<div>";
    //     popup+="<div class=\"row\">";
    //     popup+="<div class=\"col-md-12 bg-collaborator text-center\" >";
    //     popup+="Disable the Ad Blocker and refresh the website.";
    //     popup+="</div>";
    //     // popup+="<div class=\"col-md-12 border-top\">";
    //     // popup+="<div class=\"col-md-10\"><div  class=\" text-danger\">&nbsp;</div></div>";
    //     // popup+="<div class=\"col-md-2 pulse-margin\"><div  data-dismiss=\"modal\" aria-label=\"Close\" class=\"btn01 btn-primary-black-pulse01 \"><a class=\"text-hover\">Close</a></div></div>";
    //     popup+="</div>";
    //     popup+="</div>";
    // popup+="</div> </div> </div></div></div>";
    //   $('body').append( popup );
    //   $('#myModal-test').modal('show');
    // }
    // url redirect
    // var yaraurl=document.referrer;
    // if (yaraurl=="https://yara.io/") {
    //     console.log(yaraurl)
    // }else{
    //   var res=yaraurl.substring(0, 19);
    //   if (res=="https://yara.events/" || res=="http://localhost:80") {
    //     console.log(res);       
    //   }else{
    //     window.location.href='https://yara.io/'
    //   }
    // }
  // });
////console.log(locale.getString('yara.adBlock'));
/*
<!--
//Disable right mouse click Script
var message="Function Disabled!";
///////////////////////////////////
function clickIE4(){
if (event.button==2){
alert(message);
return false;
}
}
function clickNS4(e){
if (document.layers||document.getElementById&&!document.all){
if (e.which==2||e.which==3){
alert(message);
return false;
}
}
}
if (document.layers){
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=clickNS4;
}
else if (document.all&&!document.getElementById){
document.onmousedown=clickIE4;
}
document.oncontextmenu=new Function("return false")

function disableCtrlKeyCombination(e)
{
       //list all CTRL + key combinations you want to disable
       var forbiddenKeys = new Array('a', 'c', 'x', 'v', 'u', 'i', 'k', 's', 'q', 'j', 'm');
       var key;
       var isCtrl;
       if(window.event)
       {
               key = window.event.keyCode;     //IE
               if(window.event.ctrlKey)
                       isCtrl = true;
               else
                       isCtrl = false;
       }
       else
       {
               key = e.which;     //firefox
               if(e.ctrlKey)
                       isCtrl = true;
               else
                       isCtrl = false;
       }
       //if ctrl is pressed check if other key is in forbidenKeys array
       if(isCtrl)
       {
               for(i=0; i<forbiddenKeys.length; i++)
               {
                       //case-insensitive comparation
                       if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase())
                       {
                              // alert('Key combination CTRL + ' +String.fromCharCode(key)+' has been disabled.');
                               return false;
                       }
               }
       }
       return true;
}
$('body').on( "keypress",function(e){
  return disableCtrlKeyCombination(e);
});
$('body').on( "keydown",function(e){
  return disableCtrlKeyCombination(e);
});
// --> 
*/
// Check browser validation and resolution of window 
//exception for urls from validation
var exUrl=["/reset-password"]; //,"/sign-up-profile","/company_invitation/","/sign-up-details"
////console.log(window.location.pathname);
if(exUrl.indexOf(window.location.pathname)<0 && window.location.pathname.indexOf('/reset-password-app/')<0){
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;
// console.log(nVer);
// console.log(nAgt);
// console.log(browserName);
// console.log(fullVersion);
// console.log(majorVersion);
// edge browser
if ((nAgt.indexOf("Edge"))!=-1) {
  browserName = "Edge";
  window.location = "/error";
}
// In Opera 15+, the true version is after "OPR/" 
if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+4);
}
// In older Opera, the true version is after "Opera" or after "Version"
else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// check is it "Edge" browser or not 
else if ((verOffset=nAgt.indexOf("Edge"))!=-1) {
 browserName = "Edge";  
 // fullVersion = nAgt.substring(verOffset+8);
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}

// if ((nAgt.indexOf("Edge"))!=-1) {
//  browserName = "Edge";
// }
  // console.log(browserName)
// if(browserName!="Firefox" && browserName!="Safari" && browserName!="Chrome" && browserName!="Opera"){
//   window.location="/error";
// }else{
  if(browserName=="Firefox" && Number(majorVersion)<40){
    window.location="/error";
  }else if(browserName=="Safari" && Number(majorVersion)<9){
    window.location="/error";
  }else if(browserName=="Chrome" && Number(majorVersion)<45){
    window.location="/error";
  }else if(browserName=="Opera" && Number(majorVersion)<35){
    window.location="/error";
  }else if(browserName=="Edge"){
    window.location="/error";
  }
// }

  if (screen.width<1024){
    window.location="/error";
  }
  //Android Version:
  if(navigator.userAgent.match(/android/i)) {
    window.location = "/error";
  }
  //iPhone Version:
  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    window.location = "/error";
  }
}
$rootScope.browser=browserName;
// var online = navigator.onLine;
// //console.log(online);
$rootScope.online=navigator.onLine;

/*if(browserName !='Firefox'){
  $(function() {
    $('input[type="password"]').prop('type', 'private');
    $('input[type="private"]').focus(function(e){
      $(this).prop('type', 'password');
    });
    $('input[type="private"]').parents('form').submit(function(){
      $(this).find('input[type="password"]').hide().prop('type', 'private');
    });
  });
}*/
   /* if(localStorage.getItem('b')==undefined){
        localStorage.setItem('b',1); 
    }else{
       localStorage.setItem('b',Number(localStorage.getItem('b'))+1);
    }
  $window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('valevent',angular.toJson(event));
    if(localStorage.getItem('b')==undefined){
       // localStorage.setItem('b',1); 
    }else{
       localStorage.setItem('b',Number(localStorage.getItem('b'))-1);

    }
  });  */

  // scroll to top when page is loaded
    $('html, body').animate({
        scrollTop: 0
    });
    $('a[data-toggle="tab"]').on('click',function(){
      $('html, body').animate({
        scrollTop: 0
      });
    });

    // <!-- Ad Blocker popup  -->
    (function() {
        var test = document.createElement('div');
        test.innerHTML = '&nbsp;';
        test.className = 'adsbox';
        document.body.appendChild(test);
        // window.setTimeout(function() {
            if (test.offsetHeight === 0) {
              window.location.href = "content-blockers";             
            }
            test.remove();
        // }, 10000);
    })();

}]);
app.config(function($routeProvider,$httpProvider){
    // Allow cross Domain and Credentials while http request
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    // redirecting according to result
    var resultRedirection = function(res){
      if(res.data.result!=1 && res.data.result!=0){
        localStorage.clear();
        sessionStorage.clear();
        sessionStorage.setItem('authSession',res.data.message);
        var infoPageErrors = {
          errorNum:"",
          heading:"",
          subHeading:res.data.message,
          description:""
        };
        localStorage.setItem('infoPageErrors',angular.toJson(infoPageErrors));
        window.location = "/info";
      }
    };
    // it intercept all http request result and validate session timeout and auth
    $httpProvider.interceptors.push(function($q) {
      return {
        'response': function(response) {
          if(response.data!= null && response.data.result!= undefined && response.data.result==4){
             localStorage.clear();
              sessionStorage.clear();
              console.log("check 71");
            window.location="/session-timeout";
          }
          
          else if(response.data!= null && response.data.result!= undefined && (response.data.result==14 )){
            localStorage.clear();
            sessionStorage.clear();
            sessionStorage.setItem('authSession',response.data.message);
            console.log(response);
            window.location="/app-account-signin";
          }
          // else if(response.data!= null && response.data.result!= undefined && (response.data.result==6 || response.data.result==7 || response.data.result==8 )){
          //   localStorage.clear();
          //   sessionStorage.clear();
          //   sessionStorage.setItem('authSession',response.data.message);
          //   console.log("2");
          //   window.location="/session-timeout";
          // }
          // else if(response.data!= null && response.data.result!= undefined && (response.data.result==5 )){
          //   localStorage.clear();
          //   sessionStorage.clear();
          //   sessionStorage.setItem('authSession',response.data.message);
          //   console.log(response);
          //   window.location="/session-timeout";
          // }
          else if(response.data!= null && response.data.result!= undefined ){
            resultRedirection(response);
          }
           return response;
        },
        'responseError': function(rejection) {
          // do something on error
          if(rejection.data== null  || rejection.data.result== undefined ){
            console.log("1");
               // localStorage.clear();
               // sessionStorage.clear();
               // sessionStorage.setItem('authSession',rejection.data.message);
               // window.location="/session-timeout";
            // window.location=YaraBaseUrl.yara;
          }else 
          if(rejection.data!= null && rejection.data.result!= undefined && (rejection.data.result==6 || rejection.data.result==7 || rejection.data.result==8 )){
            localStorage.clear();
             sessionStorage.clear();
             sessionStorage.setItem('authSession',rejection.data.message);
              console.log("4");
              resultRedirection(rejection);
            // window.location=YaraBaseUrl.yara;
          }
          else if(rejection.data.result==4){
               localStorage.clear();
               sessionStorage.clear();
               sessionStorage.setItem('authSession',rejection.data.message);
               window.location="/session-timeout";
          }
          return $q.reject(rejection);
        }
      };
    });
});
app.config(function($routeProvider,$httpProvider){
  // Allow cross Domain and Credentials while http request
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  // it intercept all http request result and validate session timeout and auth
  $httpProvider.interceptors.push(function($q) {
    return {
      'response': function(response) {
        if(response.data!= null && response.data.result!= undefined && response.data.result==4){
           localStorage.clear();
            sessionStorage.clear();
          window.location="/session-timeout";
        }
        else if(response.data!= null && response.data.result!= undefined && (response.data.result==6 || response.data.result==7 || response.data.result==8 )){
          localStorage.clear();
          sessionStorage.clear();
          sessionStorage.setItem('authSession',response.data.message);
          window.location="/session-timeout";
        }
         return response;
      },
      'responseError': function(rejection) {
        // do something on error
        if(rejection.data!= null  &&rejection.data.result!= undefined && rejection.data.result==4){
           localStorage.clear();
            sessionStorage.clear();
          window.location="/session-timeout";
        }else if(rejection.data!= null && rejection.data.result!= undefined && (rejection.data.result==6 || rejection.data.result==7 || rejection.data.result==8 )){
          localStorage.clear();
           sessionStorage.clear();
           sessionStorage.setItem('authSession',rejection.data.message);
          window.location="/session-timeout";
        }
        return $q.reject(rejection);
      }
    };
  });
});
/* we are not using router
app.config(function($routeProvider,$httpProvider) {
  $routeProvider
  .when('/sign-in', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).when('/Signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupController'
  }).when('/SignupLevel2', {
    templateUrl: 'partials/signup2.html',
    controller: 'Signuplevel2Controller'
  }).when('/FinalSignup',{
    templateUrl:'partials/invitation_signup.html',
    controller:'Signuplevel3Controller'
  }).when('/ForgotPassword', {
    templateUrl: 'partials/forgotpassword.html',
    controller: 'ForgotPWDController'
  }).when('/ResetPassword', {
    templateUrl: 'partials/resetpassword.html',
    controller:'ResetPWDController'
  }).when('/NewEvent', {
    templateUrl: 'partials/NewEvent/newevent.html'
  }).when('/BuyNewEvent', {
    templateUrl: 'partials/NewEvent/buynewevent.html',
    controller:'BuyNewEventController'
  }).when('/CreateNewEvent', {
    templateUrl: 'partials/NewEvent/neweventdetails.html',
    controller:'CreateNewEventController'
  }).when('/FreeEvent', {
    templateUrl: 'partials/NewEvent/freeevent.html',
    controller:'FreeEvntController'
  }).when('/Dashboard', {
    templateUrl: 'partials/Dashboard/landingpage.html'
  }).when('/Account',{
    templateUrl: 'partials/Dashboard/User/accountpage.html',
    controller:'AccountController'
  }).when('/Follower',{
    templateUrl: 'partials/Dashboard/User/follower.html'
  }).when('/Assets',{
    templateUrl: 'partials/Dashboard/assets.html',
    controller:'AssetsController'
  }).when('/DeCipher',{
    templateUrl: 'partials/Dashboard/decipher.html',
    controller:'DeCipherController' 
  }).when('/Admins',{
    templateUrl:'partials/Dashboard/admins.html'
  }).when('/Bills',{
    templateUrl:'partials/Dashboard/bills.html'
  }).when('/Events',{
    templateUrl: 'partials/Dashboard/eventspage.html',
    controller:'EventsController'
  }).when('/Event',{
    templateUrl:'partials/Dashboard/event.html',
    controller:'EventController'
  }).when('/event/activities',{
    templateUrl:'partials/Dashboard/activities.html',
    controller:'EventPulseController'
  }).when('/Event/HappyHelp',{
    templateUrl:'partials/Dashboard/happyhelp.html'
  }).when('/Event/General',{
    templateUrl: 'partials/Dashboard/general.html',
    controller:'EventGeneralController'
  }).when('/Event/Tickets',{
    templateUrl: 'partials/Dashboard/tickets.html',
    controller:'EventTicketsController'
  }).when('/Event/People',{
    templateUrl: 'partials/Dashboard/people1.html',
    controller:'EventPeopleController' 
  }).when('/Event/Schedule',{
    templateUrl: 'partials/Dashboard/schedule.html',
    controller:'EventScheduleController'
  }).when('/Event/Security',{
    templateUrl: 'partials/Dashboard/security.html',
    controller:'EventSecurityController'
  }).when('/Event/Kits',{
    templateUrl:'partials/Dashboard/kit.html',
    controller:'EventKitsController'
  }).when('/Event/Kits/Collabrators',{
    templateUrl:'partials/Dashboard/Kit/collabrators.html',
    controller:'EventCollabratorsController'
  }).when('/Event/Kits/Sponsor',{
    templateUrl:'partials/Dashboard/Kit/sponsor.html',
    controller:'EventSponsorController'  
  }).when('/Event/Kits/Exhibitor',{
    templateUrl:'partials/Dashboard/Kit/exhibitor.html',
    controller:'EventExhibitorController'
  }).when('/Event/Kits/Coupons',{
    templateUrl:'partials/Dashboard/Kit/coupon.html',
    controller:'EventCouponController'
  }).when('/Event/Kits/Vote',{
    templateUrl:'partials/Dashboard/Kit/vote.html',
    controller:'EventVoteController'
  }).when('/Event/Kits/FloorMap',{
    templateUrl:'partials/Dashboard/Kit/floormap.html',
    controller:'EventFloorMapController'
  }).when('/Event/Kits/ShowCase',{
    templateUrl:'partials/Dashboard/Kit/showcase.html',
    controller:'EventShowCaseController'
  }).when('/Event/Kits/Promote',{
    templateUrl:'partials/Dashboard/Kit/promote.html'
   // controller:'EventFloorMapController'
  }).when('/Event/Kits/GioCircle',{
    templateUrl:'partials/Dashboard/Kit/geocircle.html'
   // controller:'EventFloorMapController'
  }).when('/Event/Kits/WiFi',{
    templateUrl:'partials/Dashboard/Kit/wifi.html',
    controller:'EventWifiController'
  }).otherwise({
        redirectTo: '/sign-in'
  });
   $httpProvider.defaults.useXDomain = true; 
    
});e
*/

app.controller('headerController',['$scope',function($scope){
    $scope.url="templates/dashboard/pages/";
}]);
app.controller('LoginController',['$scope','$http','YaraBaseUrl','$location','GetDataService','$filter',function($scope,$http,YaraBaseUrl,$location,GetDataService,$filter){
  // check user is logged in or not and redirect if logged in
  $scope.getUser= function(){
    var i = localStorage.getItem('Logininfo');
    i = (angular.fromJson(i));
    if(i != null && i != undefined && i.isloggedin){
       window.location="/dashboard";
    }
  };
  $scope.getUser();
  $scope.shownav=false;
  $scope.key=YaraBaseUrl.captcha_key;
  $scope.wrong=0;
  $('#email').focus();
  localStorage.setItem('itsruning',true);
  sessionStorage.setItem('isavable',true);
  // login api call
  $scope.login=function(fromlogin){
      if(fromlogin.$valid){
        $('#loading').show();
        $scope.data="waiting for data";
        $scope.errormsg=false;
        $http({
          method:'Post',
          url:YaraBaseUrl.url+'/signin/', 
          data:{
            email:$scope.email,
            password:$scope.password
          }
        }).then(function success(response){
          $scope.data=response.data;
          if($scope.data.result==0||$scope.data.result==undefined){
            $scope.errormsg=true;
            // increment for invalid login and showing captcha
            $scope.wrong=$scope.wrong+1;
            localStorage.setItem("Logininfo",JSON.stringify({isloggedin:false}));
            $scope.shownav=false;
            $scope.password='';
              $("#password").focus();
          }
          else if($scope.data.result==1) {
            console.log($scope.data);
            if($scope.data.role == undefined || $scope.data.role== "Organizer"){
             localStorage.setItem("Logininfo",JSON.stringify({isloggedin:true,access_key:$scope.data.access_key,token:$scope.data.token,interests:$scope.data.interests,created_at:new Date(),role:$scope.data.role,privilege_level:$scope.data.privilege_level}));
              var  dashboardUrl = "dashboard";
              localStorage.setItem('dashboardUrl',dashboardUrl);
              window.location = "/dashboard";
            }else if($scope.data.role == 'Collaborator'){
              localStorage.setItem("Logininfo",JSON.stringify($scope.data));
              var  dashboardUrl = "collaborator-dashboard";
              localStorage.setItem('dashboardUrl',dashboardUrl);
              window.location ="/collaborator-dashboard";
            }else if($scope.data.role == "Sponsor"){
              localStorage.setItem("Logininfo",JSON.stringify($scope.data));
              var  dashboardUrl = "showcase-dashboard";
              localStorage.setItem('dashboardUrl',dashboardUrl);
              window.location ="/showcase-dashboard";
            }else if($scope.data.role == "Admin"){
              localStorage.setItem("Logininfo",JSON.stringify($scope.data));
              var  dashboardUrl = "happyhelp-dashboard";
              localStorage.setItem('dashboardUrl',dashboardUrl);
              window.location ="/happyhelp-dashboard";
            }
            $scope.shownav=true;
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
          $scope.data={};
          $scope.password='';
          $("#password").focus();
         $scope.errormsg=true;
         $scope.shownav=false;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.message=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.message=GetDataService.errorMsg[1];
                 }
        }else
        $scope.data.message=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
      }
  };
}]);
//Dashobard Controller - landingpage.html
app.controller('DashboardCtlr',['$scope','$http','$timeout','$document','vcRecaptchaService','YaraBaseUrl','APPService','GetDataService','$filter','$rootScope',function($scope,$http,$timeout,$document,vcRecaptchaService,YaraBaseUrl,APPService,GetDataService,$filter,$rootScope){
  // $scope.hideWelcome=true;
  // $scope.validateMail = function(email){ 
  //    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  
  //     {  
  //       return true;
  //     }else{
  //       return false;  
  //     }      
  //   };
  //   console.log($scope.validateMail("jose@mail.co.i"));
  // check privilege for dashboard
  if(GetDataService.getPrivilege()=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  $scope.currtuser={'first_name':''};
  $scope.userlogintime=function () {
    $scope.hideWelcome=false;
    GetDataService.getlogindetails().then(function (res) {
      if (res.result==1) {
        localStorage.setItem("checked_yara_navigation", res.checked_yara_navigation);
        // $timeout(function(){
          $('#landingId').fadeToggle(500);
            // setTimeout(function(){ $('#landingId').delay(500).fadeOut() }, 1000);
          // $scope.hideWelcome=true;
        // },1000);
        $timeout(function(){
          $scope.hideWelcome=true;
        },700);
      }
    })
  };
  $scope.getUser= function(){
    GetDataService.getCurrtUser().then(function(res){
          if(res.result==1){
                $scope.currtuser=res.user_data;
                localStorage.setItem("is_time_format_24",$scope.currtuser.is_time_format_24);
                if($scope.currtuser == undefined || $scope.currtuser ==null || $scope.currtuser == '' || $filter('isEmpty')($scope.currtuser) || $scope.currtuser.account_status=='DISABLED'){
                   $scope.Logout();
                }
                var n = $scope.currtuser.full_name;
                  n=n.split(' ');
                if(n[0].length>=3)
                  $scope.currtuser.first_name= n[0];
                else if(n[1]!=undefined && n[1] != null && n[1] != '')
                  $scope.currtuser.first_name= n[1];
                else
                  $scope.currtuser.first_name= n[0];
                localStorage.setItem("Logininfo",angular.toJson($scope.currtuser));
                var dashboardUrl = "dashboard";
                localStorage.setItem("dashboardUrl", dashboardUrl);
                if($scope.currtuser.privilege==1){
                    $scope.privilege=true;
                }
                else{
                    $scope.privilege=false;
                }
          }     
          else{
              $scope.Logout();
          }
    });
  };
  $scope.getUser();
  $scope.clearLocalStorage = function(){
      localStorage.removeItem('camImage');
      localStorage.removeItem('editSession');
      localStorage.removeItem('eventdayid');
      localStorage.removeItem('eventsdata');
      localStorage.removeItem('selEventsData');
      localStorage.removeItem('selectedEventId');
      localStorage.removeItem('sessId');
      localStorage.removeItem('dcode');
      localStorage.removeItem('ecode');
      localStorage.removeItem('addressComp');
      localStorage.removeItem('epData');
      localStorage.removeItem('lat');
      localStorage.removeItem('lng');
      localStorage.removeItem('placeName');
      localStorage.removeItem('redirectionInfo');
      localStorage.removeItem('timeZone');
      localStorage.removeItem('country');
      localStorage.removeItem('phonInfo');
      localStorage.removeItem('isEventPrvt');
      localStorage.removeItem('tabid');
      localStorage.removeItem('ticketTabinfo');
      localStorage.removeItem('delegateIdinfo');
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      localStorage.removeItem('spEdit');
      localStorage.removeItem('eventReadyRedirection');
      localStorage.removeItem('Addata');
      localStorage.removeItem('slotInfo');
      localStorage.removeItem('Addate');
      localStorage.removeItem('Adtime');
      localStorage.removeItem('ArcEventsData');
      localStorage.removeItem('dechipereventsdata');
      localStorage.removeItem('latandLong');
  };
  $scope.clearLocalStorage();
  $scope.getnews=function() {
    GetDataService.getNewsevent().then(function(res){
      if(res.result==1){
         $scope.yaranews=res.yara_news;
      }
    });    
  };
  $scope.getnews();
  if(localStorage.getItem('checked_yara_navigation')==undefined){
      $scope.userlogintime();
  }
  else{
      $scope.hideWelcome=true;
  }
  $scope.Logout = function(){
    GetDataService.Signout().then(function(res){
      if(res.result==1){
        localStorage.clear();
        window.location="/sign-in";
      }
    });
  };
  // clearing index db
  var request = window.indexedDB.open("yaraDB9.db",1);
  request.onsuccess = function(event){
    $scope.db=event.target.result;
    $scope.clearDb();
  };
  request.onerror = function(event){
  };
  request.onupgradeneeded = function(event){
    $scope.db=event.target.result;
    $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
  };  
  $scope.clearDb = function(){
        var transaction = $scope.db.transaction(["locInfo"], "readwrite");
        // create an object store on the transaction
        var objectStore = transaction.objectStore("locInfo");
        // clear all the data out of the object store
        var objectStoreRequest = objectStore.clear();
        objectStoreRequest.onsuccess = function(event){
        };
  };
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Dashobard Controller - landingpage.html
app.controller('AdminDashboardCtlr',['$scope','$http','$document','vcRecaptchaService','YaraBaseUrl','APPService','GetDataService','$filter','$rootScope',function($scope,$http,$document,vcRecaptchaService,YaraBaseUrl,APPService,GetDataService,$filter,$rootScope){
  // check privilege for dashboard
  if(GetDataService.getPrivilege()=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  $scope.currtuser={'first_name':''};
  $scope.getUser= function(){
    GetDataService.getCurrtUser().then(function(res){
      $scope.currtuser=res.user_data;
      localStorage.setItem("is_time_format_24",JSON.stringify($scope.currtuser.is_time_format_24));
      if($scope.currtuser == undefined || $scope.currtuser ==null || $scope.currtuser == '' || $filter('isEmpty')($scope.currtuser) || $scope.currtuser.account_status=='DISABLED'){
            $scope.Logout();
       }
       var n = $scope.currtuser.full_name;
        n=n.split(' ');
      if(n[0].length>=3)
        $scope.currtuser.first_name= n[0];
      else if(n[1]!=undefined && n[1] != null && n[1] != '')
        $scope.currtuser.first_name= n[1];
      else
        $scope.currtuser.first_name= n[0];
      if($scope.currtuser.company != undefined && $scope.currtuser.company !=null && $scope.currtuser.company!=''){
        if(!$scope.privilege){
          var d=JSON.parse(localStorage.getItem("Logininfo"));
          d.privilege_level="Admin";
          localStorage.setItem("Logininfo",angular.toJson(d));
        }
        $scope.privilege=true;
      }
      else
        $scope.privilege=false;
    });
  };
  $scope.getUser();
  $scope.Logout = function(){
    GetDataService.Signout().then(function(res){
      if(res.result==1){
        localStorage.clear();
        window.location="/sign-in";
      }
    });
  };
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Agreement page controller
app.controller('AgreementController',['$scope','$http','$document','YaraBaseUrl','APPService','GetDataService','$rootScope',function($scope,$http,$document,YaraBaseUrl,APPService,GetDataService,$rootScope){
  // checking yaraId is organizer signup for first time
  var id= sessionStorage.getItem('YaraId');
  if(id== undefined || id== '' || id == null){
    // checking yaraId is organizer signup last step
    var invit = $('#verId').val();
    if(invit ==undefined || invit== '' || invit == null)
      window.location.replace("/sign-in");
  }
  $scope.signup=function(){
    if($scope.agree){
      var invitId = $('#verId').val();
      if(invitId != undefined && invitId != '' && invitId != null){
        sessionStorage.setItem('verId',$('#verId').val());
        sessionStorage.setItem('emailId',$("#emailId").val());
        window.location.replace("/sign-up-profile");
      }else{
       $('#loading').show();
        $http({
          method:'GET',
          url:YaraBaseUrl.url+'/agreement_okay/',
          params:{
            id:id,
          }
        })
        .then(function success(response){
          $scope.data=response.data;
                    if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0 ){
                        if($scope.data.admin != undefined && $scope.data.admin!=null){
                          $scope.adminemail=$scope.data.admin;
                          $scope.adminname=$scope.data.name;
                          $scope.admincompany=$scope.data.company;
                          $scope.emailinvaite=$scope.email;
                          $('#myModal-invite').modal('show');
                        }
                        $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                        $scope.isSignup=true;
          }else{
            //$scope.title="Signup invitation send";
            sessionStorage.setItem('YaraId','');
            sessionStorage.setItem('YaraSent',$scope.data.message);
            window.location="/sign-up";
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
        $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                $scope.data.error=GetDataService.errorMsg[0];
        }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
        });
      }
    }
  };
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//signup step1 controller
app.controller('SignupController',['$scope','$http','$document','vcRecaptchaService','YaraBaseUrl','APPService','GetDataService','$rootScope',function($scope,$http,$document,vcRecaptchaService,YaraBaseUrl,APPService,GetDataService,$rootScope){
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
  localStorage.removeItem('joininfo');
  $scope.hideSignupform=false;
  $("#email").focus();
  $scope.title="Signup for Voris Identity";
  $scope.isSignup=true;
  $scope.shownav=false;
  $scope.key=YaraBaseUrl.captcha_key;
  $scope.adminemail='';
  $scope.emailinvaite='';
  var s = sessionStorage.getItem('YaraSent');
  if(s!=undefined && s!=null && s!=''){
    $scope.title=s;
    $scope.isSignup=false;  
    $scope.hideSignupform=false;
    sessionStorage.setItem('YaraSent','');
    var e = sessionStorage.getItem('yaraemail');
    $scope.email = e;
    sessionStorage.clear();
  }
  $scope.signup=function(fromsignup){
      $('#loading').show();
      $scope.adminemail='';
      $scope.emailinvaite='';
      $scope.adminname='';
      $scope.admincompany='';
      if(fromsignup.$valid){ // add to check captcha vcRecaptchaService.getResponse() != ""
        $scope.data="waiting for data";
        $scope.errormsg=false;
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/verify_email/',
          data:{
            source:'web',
            email:$scope.email
          }
        })
        .then(function success(response){
          $scope.data=response.data;
                    if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.isSignup=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0 ){
                        if($scope.data.admin != undefined && $scope.data.admin!=null){
                          $scope.adminemail=$scope.data.admin;
                          $scope.adminname=$scope.data.name;
                          $scope.admincompany=$scope.data.company;
                          $scope.emailinvaite=$scope.email;
                          var info = {
                            adminemail:$scope.data.admin,
                            adminname:$scope.data.name,
                            admincompany:$scope.data.company,
                            emailinvaite:$scope.email
                          }
                          localStorage.setItem('joininfo',angular.toJson(info));
                          window.location="/join-organization";
                        }
                        $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                        $scope.isSignup=true;
                        $('#loading').hide();
                        $('#container').fadeIn();
                    }else if($scope.data.result==1){
                      window.location="/agreement";
                      sessionStorage.setItem('YaraId',$scope.data.id);
                      sessionStorage.setItem('yaraemail',$scope.email);
                    }
        },function error(response){
        $scope.data={};
        $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.error=GetDataService.errorMsg[1];
                 }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
      }
  };
  $scope.requestAdmin = function(){
    $scope.hideSignupform=false;
    $('#loading').show();
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/join_request/',
          data:{
            email:$scope.emailinvaite,
            admin:$scope.adminemail,
            name:$scope.adminname,
            company:$scope.admincompany
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.isSignup=true;
                        $scope.data.error=GetDataService.errorMsg[1];
          }
          else if( $scope.data.result===1 ){
            $scope.hideSignupform=true;
            $scope.isSignup=false;
          }
          else{
              $scope.errormsg=true;
              $scope.data.error=$scope.data.message;
              $scope.isSignup=true;
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.error=GetDataService.errorMsg[1];
                 }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };
}]);
//signup step1 controller
app.controller('JoinOrganizationController',['$scope','$http','$document','vcRecaptchaService','YaraBaseUrl','APPService','GetDataService','$rootScope',function($scope,$http,$document,vcRecaptchaService,YaraBaseUrl,APPService,GetDataService,$rootScope){
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
    if(angular.fromJson(localStorage.getItem('joininfo'))==undefined)
    {
      window.location="/sign-up";
    }
    $scope.isSendrequest=false;
    $scope.joininfo = angular.fromJson(localStorage.getItem('joininfo'));
    $scope.requestAdmin = function(){
      $('#loading').show();
      $http({
          method:'POST',
          url:YaraBaseUrl.url+'/join_request/',
          data:{
            email:$scope.joininfo.emailinvaite,
            admin:$scope.joininfo.adminemail,
            name:$scope.joininfo.adminname,
            company:$scope.joininfo.admincompany
          }
        }).then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.isSignup=true;
                        $scope.data.error=GetDataService.errorMsg[1];
          }
          else if( $scope.data.result===1 ){
            $scope.isSendrequest=true;
          }
          else{
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                        $scope.isSignup=true;
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.error=GetDataService.errorMsg[1];
                 }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
    };
    // href=YaraBaseUrl.yara
    $scope.redirecttoSignup = function(){
      localStorage.removeItem('joininfo');
      window.location="/sign-up";
    };
    $scope.redirecttoYara = function(){
      localStorage.removeItem('joininfo');
      window.location.href=YaraBaseUrl.yara;
    };
}]);
// Report Bug controller
app.controller('ReportBugController',['$scope','$http','$document','$filter','YaraBaseUrl','fileReader','$anchorScroll','$location','GetDataService','$rootScope',function($scope,$http,$document,$filter,YaraBaseUrl,fileReader,$anchorScroll,$location,GetDataService,$rootScope){
  document.title='YARA - Report Bug';
  $scope.Createbug = function(){
    // sending multipart request, image file is send alone with data so its a multipart request
    $('#loading').show();
    var fd = new FormData();
    fd.append('issue_description',$scope.bugabt);
    var s=1;
    if($scope.isContactable)
      s=0;
    fd.append('contact_me',s);
    angular.forEach($scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID),function(model,key){
      fd.append('screen_shot',model.file);
    });
    var len=$scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('screen_shot','');
    }
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/report_bug/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      $scope.data=response.data;
      //console.log($scope.data);
      if($scope.data.result==null || $scope.data.result== undefined){
        $scope.errormsg=true;
        $scope.data.error=GetDataService.errorMsg[1];
      }else if($scope.data.result==0){
        $scope.errormsg=true;
        $scope.data.error=$scope.data.message;
      }else{  
        $('#myModal-success').modal('show');
        $scope.errormsg=true;
        $scope.data.error=$scope.data.message;
        $scope.bugabt="";
        $scope.submitted=false;
        $scope.isContactable=true;
        angular.forEach($scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID),function(model,key){
          model.setType(4);
        });
      }
      $('#loading').hide();
      $('#container').fadeIn();
    },function error(response){
          $scope.data={};
          //console.log(response);
           $scope.errormsg=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                   $scope.data.error=GetDataService.errorMsg[0];
                   }
                   else{
                      $scope.data.error=GetDataService.errorMsg[1];
                   }
          }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
    });
  };
  $scope.resetImg =function(){
    if( $scope.reportbug.screenPic.$invalid){
      angular.forEach($scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID),function(model,key){
            model.setType(4);
      });
      $scope.reportbug.screenPic.$setValidity('minsizeval',true);
    }
  };
  //image upload code
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.screenPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function () {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID).length;
    ////console.log(len);
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.reportbug.screenPic.$setValidity('minsizeval',false);
          }else{
            fileReader.readAsDataUrl(model.file, $scope).then(function(result) {
              $scope.Imgsrc = result;
            });
            $scope.reportbug.screenPic.$setValidity('minsizeval',true);
          }
        }
      });
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.screenPic.getFiles($scope.screenPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.Imgsrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//signup level2 Controller
app.controller('Signuplevel2Controller',['$scope','$http','$document','$filter','YaraBaseUrl','fileReader','$anchorScroll','$location','GetDataService','$timeout','APPService','$rootScope',function($scope,$http,$document,$filter,YaraBaseUrl,fileReader,$anchorScroll,$location,GetDataService,$timeout,APPService,$rootScope){
  $("#pwd_id").focus();
    //validate and scroll to error on sumbit in step1
   $scope.errorscroll1 =function(){
   $timeout(function(){
    if($scope.signup2Form.pwd.$invalid || $scope.signup2Form.cnfpwd.$invalid){
    }else if(($filter('isEmpty')($scope.country) || $scope.country=='') ){
      APPService.scrollJquery('country_dropdown');
      //$("body").animate({scrollTop: $('#country_dropdown').offset().top-100}, "slow");
     // //console.log('let scroll');
    }else if(($scope.states.length>0 && ($filter('isEmpty')($scope.state) || $scope.state==''))){
      //$("body").animate({scrollTop: $('#state_dropdown').offset().top-100}, "slow");
       APPService.scrollJquery('state_dropdown');
    }
  },100);
  };
  //social link validation and changeing url
  $scope.checkScocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.cmpyweb.length!=7){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.cmpytwitter.length!=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.cmpyfb.length!=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.cmpylink.length!=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.cmpypinterest.length!=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.cmpytumblr.length!=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.cmpygithub.length!=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.cmpyinstagram.length!=26){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
    if(flag==1){
      $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
  }
  //before adding socail link checking to enable add button
  $scope.checkScocialDisabled= function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>7){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb))
        flag=1;
      else
        flag=0;
    }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>26){
      flag=1; 
    }
    if(flag==1){
      $scope.isSocialSave=true;
    }else{
      $scope.isSocialSave=false;
    }
  };
  //watch when socail link changes
  $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
    $scope.checkScocialDisabled();
  });
  // get countries list
  $scope.getCountries=function(){
    $scope.countries=[];
    $http({method:'GET',
          url:YaraBaseUrl.url+'/location_track/'
        }).then(function success(response){
          $scope.countries=response.data.countries;
          ////console.log($filter('filter')( $scope.countries,response.data.country,true));
          var c = $filter('filter')( $scope.countries,response.data.country,true);
          angular.forEach(c,function(val){
            if(response.data.country == val.name){
              $scope.changeCountry(val,val.country_code);
            }
          });
        });  
  };
  //get country dial codes
  $scope.getDialCode=function(){
    $http({method:'GET',
        url:'/dial_code_json' 
      }).then(function success(response){
        $scope.dailcode=response.data;
      });
  };
  $scope.country={};
  $scope.phDailCode="";
  $scope.phdialreq=true;
  //country is changed
  $scope.changeCountry=function(c,k){
    $scope.states=[];
    $scope.state='';
     $("#menutitlestate").text('Select State/Province'); 
     $("#menutitlestatesearch").val(''); 
     $( "#country_dropdown #primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
    $scope.statesearch='';
    $scope.phDailCode="";
    if(c==''){
      c={};
      $scope.states=[];
      $scope.country=c;
      $("#menutitle").text('Select Country'); 
      $("#menutitlesearch").val('');
      $scope.countrysearch='';
    }else{
      $scope.country=c;
      $scope.Addrline1='';
      $scope.Addrline2='';
      $scope.city='';
      $scope.pincode='';
      $("#menutitle").text($scope.country.name); 
      $("#menutitlesearch").val($scope.country.name);
      $http({method:'GET',
        url:YaraBaseUrl.url+'/location_track/',
        params:{
          country:c.name
        }
      }).then(function success(response){
        $scope.states=response.data.occasions;
      });     
      if($scope.dailcode[k]=='')
        $scope.phdialreq=false;
      else
        $scope.phdialreq=true;
      if($scope.dailcode[k].indexOf('and')<0)
        $scope.phDailCode=$scope.dailcode[k];
      else{
         $scope.phDailCode=$scope.dailcode[k].split('and')[0];
      }
      if($scope.phDailCode!='' && $scope.phDailCode.indexOf('+')<0){
        $scope.phDailCode ="+"+$scope.phDailCode;
      }
      $scope.Addrline1='';
      $scope.Addrline2='';
      $scope.city='';
      $scope.pincode='';
    } 
   
  };
  $scope.states=[];
  $scope.state='';
  //state changed
  $scope.changeState=function(s){
    if(s==''){
      s={};
      $scope.state=s;
      $("#menutitlestate").text("Select State/Province"); 
      $("#menutitlestatesearch").val('');
      $scope.statesearch=''; 
    }else{
      $scope.state=s;
      $("#menutitlestate").text($scope.state); 
      $("#menutitlestatesearch").val($scope.state); 
    }
     $scope.Addrline1='';
      $scope.Addrline2='';
      $scope.city='';
      $scope.pincode='';
    $( "#state_dropdown #primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
    });
  };
  $scope.countrySearch = function(){
     return $scope.countrysearch;
  };
  //dropdown functionality
  angular.element($('#country_dropdown #primary_nav_wrap ul li')).on('click',function(){
      $("#menutitlesearch").show();
      $("#menutitle").hide();
      $("#menutitlesearch").focus();
      $("#country_dropdown img").removeClass();
      $("#country_dropdown img").addClass('caret02'); 
      $( "#country_dropdown #primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  angular.element($('#state_dropdown #primary_nav_wrap ul li')).on('click',function(){
    $("#menutitlestatesearch").show();
    $("#menutitlestate").hide();
    $("#menutitlestatesearch").focus();
    $("#state_dropdown img").removeClass();
    $("#state_dropdown img").addClass('caret02');
    $( "#state_dropdown  #primary_nav_wrap ul li ul").css({
      display:'list-item',
      color: '#000',
      'z-index':100
    });
  });
  $document.on('click',function(event){
        var $trigger = $("#country_dropdown #primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $("#menutitlesearch").css('display')!='none'){
           $( "#country_dropdown #primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
          });
         $("#menutitlesearch").hide();
         $("#menutitle").show();
        // //console.log($("#menutitlesearch").css('display')); 
         if($("#menutitle").text()!="Select Country"){
            $("#menutitlesearch").val($("#menutitle").text());
            $scope.countrysearch=$("#menutitle").text();
            $scope.countrydata=$filter('custom')($scope.countries,$scope.countrysearch);
           ////console.log($scope.countrydata);
           $scope.$apply();
         }
        $("#menutitlesearch").trigger('input');
         $("#country_dropdown img").removeClass();
         $("#country_dropdown img").addClass('caret01'); 
        }
        var $trigger = $("#state_dropdown #primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $("#menutitlestatesearch").css('display')!='none' ){
           $( "#state_dropdown #primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
        });
        $("#menutitlestatesearch").hide();
        $("#menutitlestate").show(); 
         // $("#menutitlestatesearch").val($("#menutitlestate").text());
         if($("#menutitlestate").text()!="Select State/Province"){
            $("#menutitlestatesearch").val($("#menutitlestate").text());
            $scope.statesearch=$("#menutitlestate").text();
            $scope.statedata=$filter('custom')($scope.country,$scope.statesearch);
           ////console.log($scope.countrydata);
           $scope.$apply();
         }
         $("#state_dropdown img").removeClass();
         $("#state_dropdown img").addClass('caret01'); 
        }   
  });
  $scope.getCountries();
  $scope.getDialCode();
  //inital values for social links
  setTimeout(function (){
    $scope.cmpytumblr=$scope.Tcmpytumblr ='';
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
  }, 1000);
  //save links 
  $scope.saveSocials =function(){
    $scope.typeofchange='save';
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpytumblr = $scope.Tcmpytumblr;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
    $scope.checkScocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
      $scope.checkScocialDisabled();
       setTimeout(function (){
         $('#'+$scope.social_type+'_id').focus();
         var len= $('#'+$scope.social_type+'_id').val().length;
         $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
    }, 1000);
     
  });
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      $scope.Tcmpyweb =$scope.cmpyweb;
      $scope.Tcmpyfb = $scope.cmpyfb;
      $scope.Tcmpytwitter = $scope.cmpytwitter;
      $scope.Tcmpylink = $scope.cmpylink;
      $scope.Tcmpypinterest =  $scope.cmpypinterest;
      $scope.Tcmpytumblr = $scope.cmpytumblr;
      $scope.Tcmpygithub = $scope.cmpygithub;
      $scope.Tcmpyinstagram =  $scope.cmpyinstagram;
      $scope.checkScocials();
    }
   // $('#'+$scope.social_type+'_id').removeAttr('autofocus');
  });
  //setting croped image
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }else if($scope.cropType=='profilePic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  //reset while crop image cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc="";
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1="";
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }else if($scope.cropType=='profilePic'){
      $scope.imageSrc="";
      angular.forEach($scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  /* image Upload */
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.coverimg.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.profilePic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    $scope.cropPic='';
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.signup3Form.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.cmpyimageSrc="";
          }else{
            $scope.signup3Form.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.signup3Form.cmpylogo.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                  $scope.cmpyimageSrc = result;
                }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == height){
                  $scope.signup3Form.cmpylogo.$setValidity('ratioval',true);
                  $scope.cmpyimageSrc = result;
                }else{
                  $scope.signup3Form.cmpylogo.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.cmpyimageSrc="";
                }*/
              }else{
                $scope.signup3Form.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.cmpyimageSrc="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('cover image change');
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.signup3Form.coverimg.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc1="";
          }else{
            $scope.signup3Form.coverimg.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // //console.log(width+'X'+height);
              if(width >= 2048 && height >= 1024 ){
                $scope.signup3Form.coverimg.$setValidity('minDimension',true);
                if(width ==2048  && height == 1024 ){
                  $scope.imageSrc1 = result;
                }else{
                  $scope.cropType='coverimg';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:500,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == (height*2)){
                  $scope.signup3Form.coverimg.$setValidity('ratioval',true);
                  $scope.imageSrc1 = result;
                }else{
                  $scope.signup3Form.coverimg.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.signup3Form.coverimg.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc1="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
    len =$scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('cover image change');
      angular.forEach($scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.signup4Form.profilePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.signup4Form.profilePic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 512 && height >= 512 ){
                $scope.signup4Form.profilePic.$setValidity('minDimension',true);
                if(width ==512  && height == 512 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropPic='profile';
                  $scope.cropType='profilePic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.05);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == height){
                  $scope.signup4Form.profilePic.$setValidity('ratioval',true);
                  $scope.imageSrc = result;
                }else{
                  $scope.signup4Form.profilePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.signup4Form.profilePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.cmpyimageSrc="";
    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1="";
    }
    len =$scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  //reset validation for optional images on submit
  $scope.resetCoverimg= function(){
        if($scope.signup3Form.coverimg.$invalid){
            $scope.signup3Form.coverimg.$setValidity('minsizeval',true);
            $scope.signup3Form.coverimg.$setValidity('minDimension',true);
            $scope.signup3Form.coverimg.$setValidity('ratioval',true);
            $scope.imageSrc1 = "";
            var len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
            if(len>0 ){
             angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
             });
            }
        }
  };
  $scope.resetProfilepic= function(){
      if($scope.signup4Form.profilePic.$invalid){
            $scope.signup4Form.profilePic.$setValidity('minsizeval',true);
            $scope.signup4Form.profilePic.$setValidity('minDimension',true);
            $scope.signup4Form.profilePic.$setValidity('ratioval',true);
            $scope.imageSrc1 = "";
            var len =$scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID).length;
            if(len>0 ){
             angular.forEach($scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
             });
            }
        }
  };
  $anchorScroll();
  $scope.signuplevel2=function(form){
      $scope.nxtstep='signupstep2';   
      $anchorScroll(0);
  };
  $scope.signuplevel3=function(form){
      $scope.nxtstep='signupstep3';   
      $anchorScroll(0);
  };
  $scope.checkEvntLogo= function(form){
    if($scope.signup3Form.cmpylogo.$invalid){
            $scope.signup3Form.cmpylogo.$setValidity('minsizeval',true);
            $scope.signup3Form.cmpylogo.$setValidity('minDimension',true);
            $scope.signup3Form.cmpylogo.$setValidity('ratioval',true);
            $scope.cmpyimageSrc = "";
    }
    // if(form.$valid && !$scope.cmpyimageSrc){
    //   $anchorScroll(0);
    // }
    // if(form.$invalid && !$scope.cmpyimageSrc){
    //   $timeout(function(){
    //     $anchorScroll(0);
    //   },500);
    // }    
     $timeout(function(){
         if((form.$invalid && !$scope.cmpyimageSrc)||(form.$valid && !$scope.cmpyimageSrc)){      
            APPService.scrollJquery('logo');
        }
        else if(form.$invalid && $scope.cmpyimageSrc){
            APPService.scrollJquery('cmpyid');
        }
      },100);
  };
  $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };
  //final signup creation
  $scope.signuplevel4=function(form){
    var res = $scope.Pname.split(" ");
    $scope.middileName = "";
    $scope.first_name = "";
    $scope.middle_name = "";
    $scope.last_name = "";
    $scope.middileNameMax = false;
    $scope.lastNameMax = false;
    $scope.firstNameMax = false;
    var len=0;
    if(res[0].trim().length<=20)
    {
          if(res[res.length-1].trim().length<=20)
          {
              for(i=1;i<res.length-1;i++ ){
                if(res[i]!=""){
                  $scope.middileName = $scope.middileName + " "+res[i].trim();
                  len = len+res[i].trim().length;
                }
              }
              if(len<=30){
                     $scope.first_name = res[0].trim();
                     $scope.middle_name=$scope.middileName;
                     $scope.last_name = res[res.length-1].trim();
              }
              else{
                  $scope.lastNameMax = false;
                  $scope.middileNameMax = true;
                  $scope.firstNameMax = false;              }
          }
          else{
                  $scope.lastNameMax = true;
                  $scope.middileNameMax = false;
                  $scope.firstNameMax = false;
          }
    }
    else{
      $scope.firstNameMax = true;
      $scope.lastNameMax = false;
      $scope.middileNameMax = false;
    }
    $('#loading').show();     
    //multipart request
    var fd = new FormData();
    // fd.append('source','web');
    fd.append('email',$('#orgEmail').val());
    fd.append('verification_id',$('#verId').val());
    fd.append('password',$scope.pwd);
    fd.append('company_name',$scope.cmpyTitle);
    fd.append('company_email',$scope.companyEmail);
    fd.append('company_phone',$scope.phDailCode+' '+$scope.cmpyphone);
    fd.append('address_line1',$scope.Addrline1);
    if($scope.Addrline2 == null || $scope.Addrline2 == undefined)
        $scope.Addrline2='';
    fd.append('address_line2',$scope.Addrline2);
    fd.append('city',$scope.city);
    fd.append('country',$scope.country.name);
    fd.append('state',$scope.state);
    fd.append('zip',$scope.pincode);
    fd.append('about_company',$scope.cmpyabt);
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('logo',model.file);
    });
    angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
      fd.append('cover_image',model.file);
    });
    var len=$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('cover_image','');
    }
    var temp=[{
        'social_provider': 'Website',
        'link': $scope.cmpyweb
      },{
        'social_provider': 'Twitter',
        'link': $scope.cmpytwitter
      },{
        'social_provider': 'Facebook',
        'link': $scope.cmpyfb
      },{
        'social_provider': 'LinkedIn',
        'link':$scope.cmpylink
      },{
        'social_provider': 'Pinterest',
        'link': $scope.cmpypinterest
      },{
        'social_provider': 'Tumblr',
        'link': 'https://'+$scope.cmpytumblr+'.tumblr.com'
      },{
        'social_provider': 'GitHub',
        'link': $scope.cmpygithub
      },{
        'social_provider': 'Instagram',
        'link': $scope.cmpyinstagram
      }
      ];
      fd.append('social_providers',angular.toJson(temp));
      angular.forEach($scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID),function(model,key){
        fd.append('profile_picture',model.file);
      });
      len=$scope.profilePic.getFiles($scope.profilePic.FILE_TYPES.VALID).length;
      if(len==0){
        fd.append('profile_picture','');
      }
      fd.append('first_name',$scope.first_name);
      fd.append('middle_name',$scope.middle_name);
      fd.append('last_name',$scope.last_name);
      fd.append('designation',$scope.PDesg);
      $scope.data={};
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/signup/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==null || $scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
            //console.log($scope.data);
        }else if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
           //console.log($scope.data);
        }else{  
        localStorage.setItem("Logininfo",JSON.stringify({isloggedin:true,access_key:$scope.data.access_key,token:$scope.data.token,interests:$scope.data.interests,created_at:new Date(),privilege_level:'ADMIN'}));
          $scope.shownav=true;
            window.location = "/setup-timezone";
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };  
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// signup profile final step controller
app.controller('Signuplevel3Controller',['$scope','$http','YaraBaseUrl','fileReader','$anchorScroll','$location','GetDataService','$rootScope',function($scope,$http,YaraBaseUrl,fileReader,$anchorScroll,$location,GetDataService,$rootScope){
  $('#pwd_id').focus();
  $anchorScroll();
  // checking for verification id from server is present or not
  var id=sessionStorage.getItem('verId');
  if(id==undefined || id== '' || id == null){
    window.location='/sign-up';
  }
  var verId=sessionStorage.getItem('verId');
  $('#email').val(sessionStorage.getItem('emailId'));
  // reset validation for optional image
  $scope.resetProfilepic= function(){
    if($scope.signup3Form.pofilePic.$invalid){
            $scope.signup3Form.pofilePic.$setValidity('minsizeval',true);
            $scope.signup3Form.pofilePic.$setValidity('minDimension',true);
            $scope.signup3Form.pofilePic.$setValidity('ratioval',true);
            $scope.imageSrc1 = "";
            var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
            if(len>0 ){
             angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
             });
            }
          }
  };
  //setting croped image
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='profilePic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  //reset while crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='profilePic'){
      $scope.imageSrc="";
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image uploading
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.pofilePic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.cropPic='';
    var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
    if(len>0){
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.signup3Form.pofilePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.signup3Form.pofilePic.$setValidity('minsizeval',true);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=512  && height >= 512 ){
                $scope.signup3Form.pofilePic.$setValidity('minDimension',true);
                if(width ==512  && height == 512 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropPic='profile';
                  $scope.cropType='profilePic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.05);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.signup3Form.pofilePic.$setValidity('ratioval',true);
                  $scope.imageSrc = result;
                }else{
                  $scope.signup3Form.pofilePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.signup3Form.pofilePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  $scope.nameValidation = function(){
      if($scope.Pname ==undefined ||$scope.Pname==''){
        return true;
      }
      var res = $scope.Pname.split(" ");
      $scope.middileName = "";
      $scope.first_name = "";
      $scope.middle_name = "";
      $scope.last_name = "";
      $scope.middileNameMax = false;
      $scope.lastNameMax = false;
      $scope.firstNameMax = false;
      $scope.showMinwords = false;
        var len=0;
      if(res.length<2){
         $scope.showMinwords = true;
         return true;
      }
      else if(res[0].trim().length<=20)
      {
            if(res[res.length-1].trim().length<=20)
            {
                for(i=1;i<res.length-1;i++ ){
                  if(res[i]!=""){
                    $scope.middileName = $scope.middileName + " "+res[i].trim();
                    len = len+res[i].trim().length;
                  }
                }
                if(len<=30){
                       $scope.first_name = res[0].trim();
                       $scope.middle_name=$scope.middileName;
                       $scope.last_name = res[res.length-1].trim();
                }
                else{
                    $scope.lastNameMax = false;
                    $scope.middileNameMax = true;
                    $scope.firstNameMax = false;   
                      // console.log($scope.firstNameMax);
                      // console.log($scope.middileNameMax);
                      // console.log($scope.lastNameMax);
                      return true;
             }
            }
            else{
                    $scope.lastNameMax = true;
                    $scope.middileNameMax = false;
                    $scope.firstNameMax = false;
                      // console.log($scope.firstNameMax);
                      // console.log($scope.middileNameMax);
                      // console.log($scope.lastNameMax);
                      return true;


            }
      }
      else{return false;}
  };
  $scope.Pname = "";
  //creating signup
  $scope.signupForm= function(){
      var len=0;
      $('#loading').show();
      //multipart request
      var fd = new FormData();
      fd.append('verification_id',verId);
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
        fd.append('profile_picture',model.file);
      });
      len=$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
        if(len==0){
          fd.append('profile_picture','');
        }
      fd.append('first_name',$scope.first_name);
      fd.append('middle_name',$scope.middle_name);
      fd.append('last_name',$scope.last_name);
      fd.append('designation',$scope.PDesg);
      fd.append('password',$scope.pwd);
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/invitation_signup/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==null || $scope.data.result== undefined){
          $scope.errormsg=true;
          $scope.data.error=GetDataService.errorMsg[1];
        }else if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
        }else{  
          sessionStorage.setItem('invitId','');
          localStorage.setItem("Logininfo",JSON.stringify({isloggedin:true,access_key:$scope.data.access_key,token:$scope.data.token,interests:$scope.data.interests,created_at:new Date(),privilege_level:'Team Member'}));
          $scope.shownav=true;
          window.location = "/setup-timezone";
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
          $scope.data={};
           $scope.errormsg=true;
          if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                $scope.data.error=GetDataService.errorMsg[1];
              }
          }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Forgot password step1 controller
app.controller('ForgotPWDController',['$scope','$http','YaraBaseUrl','vcRecaptchaService','$anchorScroll','GetDataService','$rootScope',function($scope,$http,YaraBaseUrl,vcRecaptchaService,$anchorScroll,GetDataService,$rootScope){
  $anchorScroll();
  $scope.title="Reset your Voris Identity Password";
  $scope.isforgotpwd=true;
  $scope.shownav=false;
  $scope.errormsg=false;
  $("#email").focus();
  if(sessionStorage.getItem('data')==undefined){
    sessionStorage.setItem('data','val');
  }
  $scope.key=YaraBaseUrl.captcha_key; // assign google key for captcha
  $scope.forgotpwd=function(fromforgotpwd){   
      if(fromforgotpwd.$valid ){
        $('#loading').show();
        $scope.data="waiting for data";
        $scope.errormsg=false;
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/forgot_password/',
          data:{
            email:$scope.email
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          //console.log($scope.data);
          if($scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
          }if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.data.error=$scope.data.message;
          }else{
            $scope.title="Reset password invitation send";
            $scope.isforgotpwd=false;
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
        //console.log(response);
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.error=GetDataService.errorMsg[1];
                 }
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
      }
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//forgot password controller for step2
app.controller('ForgotPWD1Controller',['$scope','$http','YaraBaseUrl','GetDataService','$rootScope',function($scope,$http,YaraBaseUrl,GetDataService,$rootScope){
  $scope.isforgotpwd=true;
  $scope.errormsg=false;
  $("#pwd_id").focus();
  $scope.resetpwd=function(fromresetpwd){
      if(fromresetpwd.$valid ){
        $('#loading').show();
        $scope.data="waiting for data";
        $scope.errormsg=false;
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/forgot_password/',
          data:{
            token:$('#forgotToken').val(),
            new:$scope.pwd,
            confirm:$scope.cnfpwd
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          //console.log($scope.data);
          if($scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
          }
          if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.data.error=$scope.data.message;
          }
          if($scope.data.result==1){
            window.location = "/sign-in";
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
          $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                }
               else{
                  $scope.data.error=GetDataService.errorMsg[1];
               }
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
      }
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//APP password reset controller
app.controller('APPResetPWDCtrl',['$scope','$http','YaraBaseUrl','GetDataService','$rootScope',function($scope,$http,YaraBaseUrl,GetDataService,$rootScope){
  $scope.is_reset=false;
  $scope.isforgotpwd=true;
  $scope.errormsg=false;
  $("#pwd_id").focus();
  $scope.resetpwd=function(fromresetpwd){
      if(fromresetpwd.$valid ){
        $('#loading').show();
        $scope.data="waiting for data";
        $scope.errormsg=false;
        $http({
          method:'POST',
          url:YaraBaseUrl.url.replace('web','app')+'/forgot_password/',
          data:{
            token:$('#forgotToken').val(),
            new:$scope.pwd,
            confirm:$scope.cnfpwd
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if($scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
          }
          if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.data.error=$scope.data.message;
          }
          if($scope.data.result==1){
            $scope.is_reset=true;
          }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
          $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                 $scope.data.error=GetDataService.errorMsg[0];
                 }
                 else{
                    $scope.data.error=GetDataService.errorMsg[1];
                 }
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
      }
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Listing event Package controller
app.controller('EventPackageController',['$scope','APPService','YaraBaseUrl','$http','$location','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,GetDataService,$rootScope){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  document.title='YARA - Packages';
  $scope.Packageslist=[];
  GetDataService.getEventPackage().then(function(res){
    $('#loading').show();
    if(res.result==1){
      $scope.Packageslist=res.event_packages;
      $scope.userOffset = res.uo;
      $('#loading').hide();
      $('#container').fadeIn();
    }
  });
  $scope.setOffset = function(d){return GetDataService.userOffsetTime(d,$scope.userOffset);};
  $scope.service=APPService;
  $scope.getExpiredDate=function(d){
    var date=  $scope.setOffset(d);
    date.setMonth(date.getMonth()+5);
    return date;
  };
  $scope.createEvent = function(ep_code){
    localStorage.removeItem('selEventsData');
    localStorage.removeItem('selectedEventId');
    $('#loading').show();
        var request = window.indexedDB.open("yaraDB9.db",1);
        request.onsuccess = function(event){
          $scope.db=event.target.result;
          $scope.clearDb();
        };
        request.onerror = function(event){
              console.log("error");
        };
        request.onupgradeneeded = function(event){
          $scope.db=event.target.result;
          $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
        };
        var redirectionInfo = {
          locPlace:false,
          locManual:false,
          eventInfo:false,
          eventDetails:false,
          eventConfirm:false,
          eventReady:false,
          eventTrack:false,
          eventPromo:false,
          eventGk:false,
          eventPin:false,
          editlocPlace:false,
          locmanualPlace:false,
          editeventInfo:false,
          editeventDetails:false
        };
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('epData','{"ep_code":"'+ep_code+'"}');
    $('#loading').hide();
    $('#container').fadeIn();
  };
  $scope.clearDb = function(){
      var transaction = $scope.db.transaction(["locInfo"], "readwrite");
      // create an object store on the transaction
      var objectStore = transaction.objectStore("locInfo");
      // clear all the data out of the object store
      var objectStoreRequest = objectStore.clear();
      objectStoreRequest.onsuccess = function(event){
        window.location = "/create-event-location";
      };
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//New Event page controller 
app.controller('NewEventController',['$scope','APPService','YaraBaseUrl','$http','$location','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,GetDataService,$rootScope){
  GetDataService.getEventPackage().then(function(res){
    $('#loading').show();
    if(res.result==1){
      $scope.Packageslist=res.event_packages;
      $('#loading').hide();
      $('#container').fadeIn();
    }
  });
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  $scope.service =APPService;
  // Saving EP code in local before redirecting to event page
  $scope.createEvent = function(ep_code){
    localStorage.removeItem('selEventsData');
    localStorage.removeItem('selectedEventId');
    var redirectionInfo = {
          locPlace:false,
          locManual:false,
          eventInfo:false,
          eventDetails:false,
          eventConfirm:false,
          eventReady:false,
          eventTrack:false,
          eventPromo:false,
          eventGk:false,
          eventPin:false,
          editlocPlace:false,
          locmanualPlace:false,
          editeventInfo:false,
          editeventDetails:false
        };
    var request = window.indexedDB.open("yaraDB9.db",1);
    request.onsuccess = function(event){
      $scope.db=event.target.result;
      $scope.clearDb();
    };
    request.onerror = function(event){
          console.log("error");
    };
    request.onupgradeneeded = function(event){
      $scope.db=event.target.result;
      $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
    };    
    localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
    localStorage.setItem('epData','{"ep_code":"'+ep_code+'"}');
  };
  $scope.clearDb = function(){
      var transaction = $scope.db.transaction(["locInfo"], "readwrite");
      // create an object store on the transaction
      var objectStore = transaction.objectStore("locInfo");
      // clear all the data out of the object store
      var objectStoreRequest = objectStore.clear();
      objectStoreRequest.onsuccess = function(event){
        window.location = "/create-event-location";
      };
  };
  // Sending Yara key
  $scope.yaraKey = function(){
    $('#loading').show();
    $scope.errorMsg = "";
    $scope.invalid=false;
    if($scope.yarakey.length===19){
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/ep_activation/',
        data:{
          ep_code:$scope.yarakey
        }
      }).then(function success(response){
        if(response.data.result==1){
          window.location="/packages"
        }else if(response.data.result==0){
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.wrongKey = true;
              $scope.errorMsg = response.data.message;
            $('#myModal-invalid').modal('show');        
        }
        else if(response.data.result==-1){
                if($rootScope.online==false)
                {
                    if($rootScope.online==false)
                    {
                        $scope.data.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.data.error=GetDataService.errorMsg[1];
                    }                 
                }
                else{
                  $scope.errorMsg=GetDataService.errorMsg[1];
               }
        }
      });
    }
    else{
        $scope.invalid=true;
        $('#loading').hide();
        $('#container').fadeIn();
        $('#myModal-invalid').modal('show');        
      }
  };
  // transfer package to other user -currently feature is disabled
  $scope.transferPackage = function(ep_code){
    for(var i=0;i<$scope.Packageslist.length;i++){
      if($scope.Packageslist[i].ep_code==ep_code){
       sessionStorage.setItem('selTransfPack',angular.toJson($scope.Packageslist[i]));
        break;
      }
    }
    window.location = "/transfer_package";
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Transfer Package controller - Currently this feature is disabled
app.controller('TransferController',['$scope','APPService','YaraBaseUrl','$http','$location','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,GetDataService,$rootScope){
  if(sessionStorage.getItem('selTransfPack')!= undefined){
    $scope.EPdata=sessionStorage.getItem('selTransfPack');
    $scope.EPdata=angular.fromJson($scope.EPdata);
  }else{
    window.location = "/new_event";
  }
  $scope.packageTransfer =function(){
     $scope.successStatus=false;
     $scope.errorStatus=false;
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/ep_transfer/',
        data:{
          ep_code:$scope.EPdata.ep_code,
          recipient_email:$scope.recpEmail        
        }
      }).then(function success(response){
        //console.log(response.data);
        if(response.data.result==0){
          $scope.errorStatus=true;
          $scope.msg=response.data.message;
        }else{
          $scope.successStatus=false;
          $scope.msg=response.data.message;
        }
      });
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Bespoke Controller when attendes > 2500
app.controller('BespokeController',['$scope','APPService','YaraBaseUrl','$http','$location','$anchorScroll','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,$anchorScroll,GetDataService,$rootScope){
  $scope.BespokeCreate = function(){
      $('#loading').show();
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/bespoke/',
        data:{
          full_name:$scope.BespokeName,
          email:$scope.BeEmail,
          phone_number:$scope.BePhone,
          company_name:$scope.BeCmpy,
          event_name:$scope.BeEvent
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==1){
          $scope.bespoke=false;
          $scope.errormsg=false;
        }else{
           $scope.errormsg=true;
           $scope.data.error=$scope.data.message
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
        $scope.data={};
        //console.log(response);
        $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }          
        }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
      }); 
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Purchase event page controller
app.controller('BuyNewEventController',['$scope','APPService','YaraBaseUrl','$http','$location','$anchorScroll','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,$anchorScroll,GetDataService,$rootScope){
  
  $scope.eventtypes=APPService.typedata;
  $scope.selectedval=0;
  $scope.DelegatesNum=0;
  $scope.price=1.99;
  $scope.bespoke=false;
  $scope.minmsg=false;
  $scope.bespoke_redirect=false;
  $scope.selectedtype= function(selectedtypeid){
    $scope.selectedval=selectedtypeid;
  };
  $scope.errormsg=false;
  document.title='YARA - Buy Event';
  $scope.getPriceDetails = function(){
      $scope.errormsg=false;
      $scope.minmsg = false;
      $scope.bespoke_redirect=false;
      if($scope.DelegatesNum==null || $scope.DelegatesNum==undefined || $scope.DelegatesNum==''){
          $scope.minmsg = true;
      }
      if($scope.DelegatesNum!=''&& $scope.DelegatesNum!=null && $scope.DelegatesNum!=undefined ){
        // $scope.delegateCout=$scope.DelegatesNum;
        $('#countId').val($scope.DelegatesNum);
        $scope.Dprice=false;
        $('#loading').show();
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/package_price/',
          data:{
            count:$scope.DelegatesNum
          }
        }).then(function success(response){
          $scope.data=response.data;
          if($scope.data.result==1){
            $scope.bespoke_redirect=$scope.data.bespoke_redirect;
            if($scope.data.bespoke_redirect){
              window.location="/bespoke";
            }
            else{
                  $scope.Dprice_att=$scope.data.price;
                  $scope.Dcurr=$scope.data.symbol;
                  $scope.Dtax=$scope.data.tax;
                  $scope.Dtotal=$scope.Dtax+$scope.Dprice_att;
                  $scope.Dprice=true;
                  $('#loading').hide();
                  $('#container').fadeIn();
            }
          }else if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.data.error=$scope.data.message;
            $('#loading').hide();
            $('#container').fadeIn();
          }
        },function error(response){
          $scope.data={};
          $scope.errormsg=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }          
          }else
            $scope.data.error=GetDataService.errorMsg[1];
           $('#loading').hide();
           $('#container').fadeIn();
        });
      }else if(Number($scope.DelegatesNum) >=$scope.maxDelegateno){
       $scope.Dprice=false;
        $scope.Dprice_att=0;
        $scope.Dcurr='';
        $scope.Dtax=0;
        $scope.Dtotal=0;
      }else if($scope.DelegatesNum===''){
        $scope.minmsg = true;
      }
  };
  $scope.checkOut=function(){
        $http({
          method:'POST',
          url:'/checkout/',
          data:{
            count:$scope.DelegatesNum,
            item:1
          }
        }).then(function success(response){
          // $scope.data=response.data;
          // if($scope.data.result==1){
          //   $scope.bespoke_redirect=$scope.data.bespoke_redirect;
          //   if($scope.data.bespoke_redirect){
          //     window.location="/bespoke";
          //   }
          //   else{
          //         $scope.Dprice_att=$scope.data.price;
          //         $scope.Dcurr=$scope.data.symbol;
          //         $scope.Dtax=$scope.data.tax;
          //         $scope.Dtotal=$scope.Dtax+$scope.Dprice_att;
          //         $scope.Dprice=true;
          //         $('#loading').hide();
          //         $('#container').fadeIn();
          //   }
          // }else if($scope.data.result==0){
          //   $scope.errormsg=true;
          //   $scope.data.error=$scope.data.message;
          //   $('#loading').hide();
          //   $('#container').fadeIn();
          // }
        },function error(response){
          $scope.data={};
          $scope.errormsg=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }          
          }else
            $scope.data.error=GetDataService.errorMsg[1];
           $('#loading').hide();
           $('#container').fadeIn();
        });
  };
  $scope.checkEmpty = function(dno){
    $scope.minmsg = false;
    if($scope.DelegatesNum==null || $scope.DelegatesNum==undefined || $scope.DelegatesNum=='' || dno<50){
          $scope.minmsg = true;
      }
  }
  // $scope.buy_package = function(){
  //     if($scope.DelegatesNum >= 50){
  //         window.location="/bespoke";
  //       }
  // };
  // looking the changes in DelegatesNum
  $scope.$watch('DelegatesNum', function(newval,oldval){
    if (newval!=undefined && oldval!=undefined) {
            $scope.Dprice=false; 
            $scope.bespoke_redirect=false;     
    }
  });
  // $scope.buyeventform =function(form){
  //   if(form.$valid){
  //     $http({
  //       method:'POST',
  //       url:YaraBaseUrl.url+'/user_package/',
  //       data:{
  //         number_of_attendee:$scope.attendCount,
  //         cost:$scope.price,
  //         payment_type:'Netbanking',
  //         payment_status:'SUCCESS'
  //       }
  //     }).then(function success(response){
  //       //console.log(response.data);
  //         localStorage.setItem('epData',angular.toJson(response.data));
  //         //$location.path('/CreateNewEvent');
  //         window.location = "/create-event";
  //     });
  //   }
  // };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.filter('rangeval', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<=total; i++) {
      input.push(i);
    }
    return input;
  };
});
// Event Package Topup Controller
app.controller('TopupController',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$document','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$document,$rootScope){
  if(GetDataService.getPrivilege(9)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.eventcode = selectedval;
  if(selectedval=== undefined || selectedval === null || !$scope.privilege)
  {
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.currentval.number_of_attendee=0;
  GetDataService.getPackage($scope.currentval.event_code).then(function(res){
    if(res.result==1){
      $scope.currentval.number_of_attendee=res.event_packages.number_of_attendee;
    }
  });
  $scope.maincall=function (delCount) {
    $scope.delcount=delCount;
    if (delCount>24) {
      $scope.showMincount=false;
    }
  };
  $scope.getPriceDetails = function(delCount){
    $scope.errStatus=false;
    $scope.showMincount= false;
    if($scope.delegateCount!=''&& $scope.delegateCount!=null && $scope.delegateCount!=undefined && delCount>24 ){
      $('#loading').show();
      $('#countId').val($scope.delegateCount);
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/topup_price/',
        data:{
          count:$scope.delegateCount,
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==1){
          $scope.Dprice=true;
          $scope.Dprice_att=$scope.data.price;
          $scope.Dcurr=$scope.data.symbol;
          $scope.Dtax=$scope.data.tax;
          $scope.Dtotal=$scope.data.tax + $scope.Dprice_att;
          $scope.topup02=true;
          $scope.pkgInfo=false;
        }else if($scope.data.result==0){
          $scope.errStatus=true;
          $scope.errorMsg=$scope.data.message;
        }
         $('#loading').hide();
         $('#container').fadeIn();
        },function error(response){
        $scope.data={};
        $scope.errStatus=true;
        $scope.pkgInfo=true;
        if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.errorMsg=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.errorMsg=GetDataService.errorMsg[1];
                  }          
        }else
          $scope.errorMsg=GetDataService.errorMsg[1];
         $('#loading').hide();
         $('#container').fadeIn();
      });
    }
    else{
      $scope.showMincount= true;
      $scope.pkgInfo=true;
    }
  };
}]);
//Account Page Controller
app.controller('AccountController',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$document','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$document,$rootScope){
  //checking privilege and options based on privilege
  if(GetDataService.getPrivilege(8)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  //get countries list
  $scope.getCountries=function(){
    $scope.countries=[];
    $http({method:'GET',
          url:YaraBaseUrl.url+'/location_track/'
        }).then(function success(response){
          if(response.data != null && response.data != undefined)
            $scope.countries=response.data.countries;
        });     
  };
  // get country dial code
  $scope.getDialCode=function(){
      $http({method:'GET',
          url:'/dial_code_json' 
        }).then(function success(response){
          $scope.dailcode=response.data;
        });
  };
  $scope.country={};
  $scope.phDailCode="";
  $scope.phdialreq=true;
  //filter states result start chars
  $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };
  //changed country where 'c' is current country data, 'k' is country code 
  $scope.changeCountry=function(c,k){
    $scope.states=[];
    $scope.state='';
     $("#menutitlestate").text('Select State/Province'); 
     $("#menutitlestatesearch").val('');
     $scope.Addrline1='';
     $scope.Addrline2='';
     $scope.city='';
     $scope.pincode=''; 
     $( "#country_dropdown #primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
      $scope.statesearch='';
     $scope.phDailCode="";
     
      if(c==''){
        c={};
        $scope.states=[];
        $scope.country=c;
        $("#menutitle").text('Select Country'); 
        $("#menutitlesearch").val('');
        $scope.countrysearch='';
      }else{
        $scope.country=c;
        $http({method:'GET',
          url:YaraBaseUrl.url+'/location_track/',
          params:{
            country:c.name
          }
        }).then(function success(response){
          $scope.states=response.data.occasions;
      });
        $("#menutitle").text($scope.country.name); 
        $("#menutitlesearch").val($scope.country.name);
        if($scope.dailcode[k]=='')
          $scope.phdialreq=false;
        else
          $scope.phdialreq=true;
        if($scope.dailcode[k].indexOf('and')<0)
          $scope.phDailCode=$scope.dailcode[k];
        else{
           $scope.phDailCode=$scope.dailcode[k].split('and')[0];
        }
        if($scope.phDailCode!='' && $scope.phDailCode.indexOf('+')<0){
          $scope.phDailCode ="+"+$scope.phDailCode;
        }
        
       // //console.log($scope.dailcode);
       // //console.log(k);
        /*for(var i=0;i<$scope.dailcode.length;i++){
          ////console.log($scope.dailcode[i].code);
          if(k==$scope.dailcode[i].code ){
           // //console.log($scope.dailcode[i]);
            $scope.phDailCode=$scope.dailcode[i].dial_code;
            break;
          }
        }*/
        //$scope.curentDail=$filter($scope.dailcode,k);
        
      } 
     
    };
    $scope.state={};
    // when state is changed and 's' is partical selected state data
    $scope.changeState=function(s){
      if(s==''){
        s={};
        $scope.state=s;
        $("#menutitlestate").text("Select State/Province"); 
        $("#menutitlestatesearch").val('');
        $scope.statesearch=''; 
      }else{
        $scope.state=s;
        $("#menutitlestate").text($scope.state); 
        $("#menutitlestatesearch").val($scope.state); 
      }
      $scope.Addrline1='';
        $scope.Addrline2='';
        $scope.city='';
        $scope.pincode='';
      $( "#state_dropdown #primary_nav_wrap ul li ul").hide({
        display:'none',
        color: 'none',
        background: '#fff',
        'z-index':100
      });
    };
    $scope.countrySearch = function(){
       return $scope.countrysearch;
    };
    //dropdown functionality
    angular.element($('#country_dropdown #primary_nav_wrap ul li')).on('click',function(){
        $("#menutitlesearch").show();
        $("#menutitle").hide();
        $("#menutitlesearch").focus();
        $("#country_dropdown img").removeClass();
        $("#country_dropdown img").addClass('caret02'); 
        $( "#country_dropdown #primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
    });
    angular.element($('#state_dropdown #primary_nav_wrap ul li')).on('click',function(){
      $("#menutitlestatesearch").show();
      $("#menutitlestate").hide();
      $("#menutitlestatesearch").focus();
      $("#state_dropdown img").removeClass();
      $("#state_dropdown img").addClass('caret02');
      $( "#state_dropdown  #primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
    });
    $document.on('click',function(event){
            var $trigger = $("#country_dropdown #primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length && $("#menutitlesearch").css('display')!='none'){
             $( "#country_dropdown #primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
        });
             $("#menutitlesearch").hide();
           $("#menutitle").show();
          // //console.log($("#menutitlesearch").css('display')); 
           if($("#menutitle").text()!="Select Country"){
              $("#menutitlesearch").val($("#menutitle").text());
              $scope.countrysearch=$("#menutitle").text();
              $scope.countrydata=$filter('custom')($scope.countries,$scope.countrysearch);
             ////console.log($scope.countrydata);
             $scope.$apply();
           }
          $("#menutitlesearch").trigger('input');
           $("#country_dropdown img").removeClass();
           $("#country_dropdown img").addClass('caret01'); 
          }
          var $trigger = $("#state_dropdown #primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length && $("#menutitlestatesearch").css('display')!='none' ){
             $( "#state_dropdown #primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
        });
            $("#menutitlestatesearch").hide();
           $("#menutitlestate").show(); 
           // $("#menutitlestatesearch").val($("#menutitlestate").text());
           if($("#menutitlestate").text()!="Select State/Province"){
              $("#menutitlestatesearch").val($("#menutitlestate").text());
              $scope.statesearch=$("#menutitlestate").text();
              $scope.statedata=$filter('custom')($scope.states,$scope.statesearch);
             ////console.log($scope.countrydata);
             $scope.$apply();
           }
           $("#state_dropdown img").removeClass();
           $("#state_dropdown img").addClass('caret01'); 
          }   
    });
    $scope.getCountries();
    $scope.getDialCode();
    //setting account details if admin company details is displayed
    $scope.setCurrentVal = function(){
      if($scope.currtuser!=undefined){
        $scope.pname=$scope.currtuser.full_name;
        $scope.PDesg=$scope.currtuser.designation;
        $scope.imageSrc=$scope.currtuser.profile_picture;
        if($scope.privilege){
          $scope.cmpyimageSrc=$scope.currtuser.company.logo;
          $scope.imageSrc1=$scope.currtuser.company.cover_image;
          $scope.cmpyabt=$scope.currtuser.company.description;
          $scope.cmpyweb =$scope.Tcmpyweb;
          $scope.cmpytwitter=$scope.Tcmpytwitter;
           $scope.cmpylink=$scope.Tcmpylink;
           $scope.cmpyfb=$scope.Tcmpyfb;
           $scope.cmpytumblr=$scope.Tcmpytumblr;
           $scope.cmpyinstagram=$scope.Tcmpyinstagram;
           $scope.cmpygithub=$scope.Tcmpygithub;
           $scope.cmpypinterest=$scope.Tcmpypinterest;
          angular.forEach($scope.currtuser.company.social_providers,function(s){
                          if(s.social_provider=="Website")
                             $scope.Tcmpyweb=$scope.cmpyweb=s.link;
                          else if(s.social_provider=="Twitter")
                              $scope.Tcmpytwitter=$scope.cmpytwitter=s.link;
                          else if(s.social_provider=="LinkedIn")
                              $scope.Tcmpylink=$scope.cmpylink=s.link;
                          else if(s.social_provider=="Facebook")
                             $scope.Tcmpyfb=$scope.cmpyfb=s.link;
                          else if(s.social_provider=="Pinterest")
                             $scope.Tcmpypinterest=$scope.cmpypinterest=s.link;
                          else if(s.social_provider=="GitHub")
                            $scope.Tcmpygithub=$scope.cmpygithub=s.link;
                          else if(s.social_provider=="Instagram")
                             $scope.Tcmpyinstagram=$scope.cmpyinstagram=s.link;
                          else if(s.social_provider=="Tumblr")
                             $scope.Tcmpytumblr=$scope.cmpytumblr=s.link.replace('https://','').replace('.tumblr.com','');
                           //  //console.log($scope.Tcmpytumblr);                          
          });
          /*$scope.cmpytumblr=$scope.Tcmpytumblr =$scope.currtuser.company.tumblr;
          $scope.cmpyweb =$scope.Tcmpyweb=$scope.currtuser.company.website;
          $scope.cmpyfb = $scope.Tcmpyfb=$scope.currtuser.company.facebook;
          $scope.cmpytwitter = $scope.Tcmpytwitter=$scope.currtuser.company.twitter;
          $scope.cmpylink = $scope.Tcmpylink=$scope.currtuser.company.linkedin;
          $scope.cmpypinterest =  $scope.Tcmpypinterest=$scope.currtuser.company.pinterest;
          $scope.cmpygithub = $scope.Tcmpygithub=$scope.currtuser.company.github;
          $scope.cmpyinstagram =  $scope.Tcmpyinstagram=$scope.currtuser.company.instagram;*/
          var s=['company-website','twitter','facebook','linkedin','pinterest','tumblr','git-hub','instagram'];
          for(var i=0;i<s.length;i++){
            $scope.social_type=s[i];
            $scope.checkScocials();
          }
          $scope.social_type='';
          $scope.country.name=$scope.currtuser.company.country;
          $scope.countrysearch=$scope.currtuser.company.country;
          $http({method:'GET',
            url:YaraBaseUrl.url+'/location_track/',
            params:{
              country:$scope.country.name
            }
          }).then(function success(response){
            $scope.states=response.data.occasions;
          });
          $scope.state=$scope.currtuser.company.state; 
          $("#menutitle").text($scope.currtuser.company.country); 
          $("#menutitlesearch").val($scope.currtuser.company.country);
          $("#menutitlestate").text($scope.currtuser.company.state); 
          $("#menutitlestatesearch").val($scope.currtuser.company.state);
          $scope.statesearch=$("#menutitlestate").text();
          $scope.statedata=$filter('custom')($scope.states,$scope.statesearch);
          $scope.Addrline1=$scope.currtuser.company.address_line1;
          $scope.Addrline2=$scope.currtuser.company.address_line2;
          $scope.city=$scope.currtuser.company.city;
          $scope.pincode=$scope.currtuser.company.zip;
          var ph=$scope.currtuser.company.company_phone;
          ph=ph.split(' ');
          $scope.phDailCode=ph[0];
          $scope.cmpyphone=ph[1];
          $scope.cmpyTitle=$scope.currtuser.company.company_name;
          $scope.companyEmail=$scope.currtuser.company.company_email;
          $scope.publicChange();
          $scope.contactChanges();
        }
      }
      // check for any changes in values
      $scope.profileChanges();
    };
    // check socails link
    $scope.checkScocials = function(){
      var flag=0;
      if($scope.social_type=='company-website' && $scope.cmpyweb.length!=7){
        flag=1;
      }else if($scope.social_type=='twitter' && $scope.cmpytwitter.length!=20){
        flag=1; 
      }else if($scope.social_type=='facebook' && $scope.cmpyfb.length!=25){
        flag=1; 
      }else if($scope.social_type=='linkedin' && $scope.cmpylink.length!=25){
        flag=1; 
      }else if($scope.social_type=='pinterest' && $scope.cmpypinterest.length!=26){
        flag=1; 
      }else if($scope.social_type=='tumblr' && $scope.cmpytumblr.length>0){
        flag=1; 
      }else if($scope.social_type=='git-hub' && $scope.cmpygithub.length!=19){
        flag=1; 
      }else if($scope.social_type=='instagram' && $scope.cmpyinstagram.length!=26){
        flag=1; 
      }
      var currId= GetDataService.getSocailId($scope.social_type);
      if(flag==1){
        $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
      }else{
        $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
    // check socails link before enable add button
    $scope.checkScocialDisabled= function(){
      var flag=0;
      if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>=7){
        if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb) || $scope.Tcmpyweb.length==7)
          flag=1;
        else
          flag=0;
      }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>=20){
        flag=1; 
      }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>=25){
        flag=1; 
      }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>=25){
        flag=1; 
      }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>=26){
        flag=1; 
      }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>=0){
        flag=1; 
      }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>=19){
        flag=1; 
      }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>=26){
        flag=1; 
      }
      if(flag==1){
        $scope.isSocialSave=true;
      }else{
        $scope.isSocialSave=false;
      }
    };
    // assign values of social links
    setTimeout(function (){
    $scope.cmpytumblr=$scope.Tcmpytumblr;
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
    }, 1000);
    // save socail links
    $scope.saveSocials =function(){
      $scope.typeofchange='save';
      $scope.cmpyweb =$scope.Tcmpyweb;
      $scope.cmpyfb = $scope.Tcmpyfb;
      $scope.cmpytwitter = $scope.Tcmpytwitter;
      $scope.cmpylink = $scope.Tcmpylink;
      $scope.cmpypinterest =  $scope.Tcmpypinterest;
      $scope.cmpytumblr = $scope.Tcmpytumblr;
      $scope.cmpygithub = $scope.Tcmpygithub;
      $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
      $scope.checkScocials();
      $('#myModal-social').modal('hide');
    }; 
    $('#myModal-social').on('show.bs.modal', function (e) {
        $scope.typeofchange='';
        $scope.checkScocialDisabled();
         setTimeout(function (){
           $('#'+$scope.social_type+'_id').focus();
           var len= $('#'+$scope.social_type+'_id').val().length;
           $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
      }, 1000);
       
    });
    $('#myModal-social').on('hidden.bs.modal', function (e) {
      if($scope.typeofchange != 'save'){
        $scope.Tcmpyweb =$scope.cmpyweb;
        $scope.Tcmpyfb = $scope.cmpyfb;
        $scope.Tcmpytwitter = $scope.cmpytwitter;
        $scope.Tcmpylink = $scope.cmpylink;
        $scope.Tcmpypinterest =  $scope.cmpypinterest;
        $scope.Tcmpytumblr = $scope.cmpytumblr;
        $scope.Tcmpygithub = $scope.cmpygithub;
        $scope.Tcmpyinstagram =  $scope.cmpyinstagram;
        $scope.checkScocials();
        $scope.publicChange();
      }
     // $('#'+$scope.social_type+'_id').removeAttr('autofocus');
    });
    $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
      $scope.checkScocialDisabled();
      ////console.log($scope.isSocialSave);
       $scope.publicChange();
    });
    // fetching current user data
    $scope.getUser= function(){
      GetDataService.getCurrtUser().then(function(res){
        $scope.currtuser=res.user_data;
       // //console.log($scope.currtuser);
         $scope.setCurrentVal();
         $('#loading').hide();
      });
    };

    $scope.getUser();
    // before window is unloaded check for changes are made
    window.onbeforeunload = function (event) {
      if($scope.profChange || $scope.CmpyUpdate || $scope.cmpySocialUP){
        var message = 'Do you want to discard changes?';
        if (typeof event == 'undefined') {
          event = window.event;
        }
        if (event) {
          event.returnValue = message;
        }
        
          return message;
      }
    }
    //watching cmpy info changed
    $scope.$watchCollection('[cmpyimageSrc,imageSrc1,cmpyabt]',function(){
     $scope.publicChange();
     // //console.log($scope.profChange);
    });
    // cmpy info compare with for changes
    $scope.publicChange =function(){
      $scope.cmpySocialUP=false;
      var s=['Website','Twitter','Linkedin','Facebook','Pinterest','Github','Instagram','Tumblr'];
      if($scope.currtuser!=undefined && $scope.currtuser.company != undefined){
        if($scope.cmpyimageSrc!=$scope.currtuser.company.logo)
          $scope.cmpySocialUP=true;
        if($scope.imageSrc1!=$scope.currtuser.company.cover_image)
          $scope.cmpySocialUP=true;
        if($scope.cmpyabt!=$scope.currtuser.company.description)
          $scope.cmpySocialUP=true;
        var ss =$scope.currtuser.company.social_providers;
        angular.forEach(s,function(l){
          var f = ($filter('filter')(ss,{social_provider:l}));
          if(f.length>0){
            if(f[0].social_provider=="Website" && $scope.Tcmpyweb != f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Twitter" && $scope.Tcmpytwitter!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Linkedin" && $scope.Tcmpylink!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Facebook" && $scope.Tcmpyfb!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Pinterest" && $scope.Tcmpypinterest!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Github" && $scope.Tcmpygithub!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Instagram" && $scope.Tcmpyinstagram!=f[0].link)
              $scope.cmpySocialUP=true;
            else if(f[0].social_provider=="Tumblr" && ('https://' + $scope.Tcmpytumblr+'.tumblr.com')!=f[0].link){
              $scope.cmpySocialUP=true;
             // //console.log(('https://' + $scope.Tcmpytumblr+'.tumblr.com')!=f[0].link)
             ////console.log(('https://' + $scope.Tcmpytumblr+'.tumblr.com')+ '  -  ' +f[0].link +'  - '+ $scope.cmpySocialUP)
            }
          }else{
            if(l=="Website" && $scope.Tcmpyweb.length>7)
              $scope.cmpySocialUP=true;
            else if(l=="Twitter" && $scope.Tcmpytwitter.length>20)
              $scope.cmpySocialUP=true;
            else if(l=="Linkedin" && $scope.Tcmpylink.length>25)
              $scope.cmpySocialUP=true;
            else if(l=="Facebook" && $scope.Tcmpyfb.length>25)
              $scope.cmpySocialUP=true;
            else if(l=="Pinterest" && $scope.Tcmpypinterest.length>26)
              $scope.cmpySocialUP=true;
            else if(l=="Github" && $scope.Tcmpygithub.length>19)
              $scope.cmpySocialUP=true;
            else if(l=="Instagram" && $scope.Tcmpyinstagram.length>26)
              $scope.cmpySocialUP=true;
            else if(l=="Tumblr" && $scope.Tcmpytumblr.length>0)
              $scope.cmpySocialUP=true;
          }    
        });
      }
    }; 
    //checking profile info changed
    $scope.profileChanges = function(){
      $scope.profChange=false;
      if($scope.currtuser!=undefined){
        if($scope.pname!=$filter('capitalize')($scope.currtuser.full_name,true)){
          $scope.profChange=true;
        }
        if($scope.PDesg!=$scope.currtuser.designation){
          $scope.profChange=true;
        }
        if($scope.imageSrc!=$scope.currtuser.profile_picture){
          $scope.profChange=true;
        }
      }
    };
    //watching profile info changed
    $scope.$watchCollection('[pname,PDesg,imageSrc]',function(){
      $scope.profileChanges();
     // //console.log($scope.profChange);
    });
    //checking company contact detail changes
    $scope.contactChanges=function(){
      $scope.CmpyUpdate=false;
      if($scope.currtuser!=undefined && $scope.currtuser.company != undefined){
        var ph=$scope.currtuser.company.company_phone;
        ph=ph.split(' ');
        if($scope.companyEmail!=$scope.currtuser.company.company_email)
          $scope.CmpyUpdate=true;
        if($scope.cmpyTitle!=$scope.currtuser.company.company_name)
          $scope.CmpyUpdate=true;
        if($scope.phDailCode!=ph[0])
          $scope.CmpyUpdate=true;
        if( $scope.cmpyphone!=ph[1])
          $scope.CmpyUpdate=true;
        if($scope.pincode!=$scope.currtuser.company.zip)
          $scope.CmpyUpdate=true;
        if($scope.city!=$scope.currtuser.company.city)
          $scope.CmpyUpdate=true;
        if($scope.Addrline2!=$scope.currtuser.company.address_line2)
          $scope.CmpyUpdate=true;
        if( $scope.Addrline1!=$scope.currtuser.company.address_line1)
          $scope.CmpyUpdate=true;
        if($scope.country.name!=$scope.currtuser.company.country)
          $scope.CmpyUpdate=true;
        if($scope.state!=$scope.currtuser.company.state)
          $scope.CmpyUpdate=true;
      }
    };
    //watching cmpy contact info changed
    $scope.$watchCollection('[country.name,state,Addrline1,Addrline2,city,pincode,phDailCode,cmpyphone,cmpyTitle,companyEmail]',function(){
      $scope.contactChanges();
    })
    $scope.errorScroll =function(){
           $timeout(function(){
             if(!$scope.cmpyimageSrc && $scope.cmpypublicform.$valid || $scope.submitted1 && !$scope.cmpyimageSrc){      
                APPService.scrollJquery('img-cmpylogo');
            }
            else if(($scope.cmpyabt == '' || $scope.cmpyabt == undefined)){
                APPService.scrollJquery('cmbtext');
            }
          },100);
    };
    $scope.erroe3page=function () {
      $timeout(function(){
            if($scope.state==''){      
                APPService.scrollJquery('state_dropdown');
            }
          },100);
    }
    // api to update company info, type is company public or contact info
    $scope.cover_img=$scope.logo_img=0;
    $scope.cmpyUpdate =function(type){
      $('#loading').show();
      if($scope.imageSrc1=="")
        $scope.imageSrc1=$scope.currtuser.company.cover_image;
      if($scope.cmpyimageSrc=="")
        $scope.cmpyimageSrc=$scope.currtuser.company.logo;
       var fd = new FormData();
      //  fd.append('password',$scope.pwd);
        fd.append('company_name',$scope.cmpyTitle);
        fd.append('company_email',$scope.companyEmail);
        fd.append('company_phone',$scope.phDailCode+' '+$scope.cmpyphone);
        fd.append('address_line1',$scope.Addrline1);
        if($scope.Addrline2 == null || $scope.Addrline2 == undefined)
            $scope.Addrline2='';
        fd.append('address_line2',$scope.Addrline2);
        fd.append('city',$scope.city);
        fd.append('country',$scope.country.name);
        fd.append('state',$scope.state);
        fd.append('zip',$scope.pincode);
        fd.append('about_company',$scope.cmpyabt);
        angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
          fd.append('logo',model.file);
          $scope.logo_img=1;
        });
        var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
        if(len==0){
          fd.append('logo','');
        }
        //fd.append('logo', $scope.cmpylogo);
        angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
          fd.append('cover_image',model.file);
          $scope.cover_img=1;
        });
         len=$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
        if(len==0){
          fd.append('cover_image','');
        }
        fd.append('new_logo', $scope.logo_img);
        fd.append('new_cover_image', $scope.cover_img);

        var temp=[{
          'social_provider': 'Website',
          'link': $scope.cmpyweb
        },{
          'social_provider': 'Twitter',
          'link': $scope.cmpytwitter
        },{
          'social_provider': 'Facebook',
          'link': $scope.cmpyfb
        },{
          'social_provider': 'LinkedIn',
          'link':$scope.cmpylink
        },{
          'social_provider': 'Pinterest',
          'link': $scope.cmpypinterest
        },{
          'social_provider': 'Tumblr',
          'link':'https://' + $scope.cmpytumblr+'.tumblr.com'
        },{
          'social_provider': 'GitHub',
          'link': $scope.cmpygithub
        },{
          'social_provider': 'Instagram',
          'link': $scope.cmpyinstagram
        }
        ];
       fd.append('social_providers',angular.toJson(temp));
        //fd.append('cover_image',$scope.coverimg);
        /*fd.append('website',$scope.cmpyweb);
        fd.append('facebook',$scope.cmpyfb);
        fd.append('twitter',$scope.cmpytwitter);
        fd.append('linkedin',$scope.cmpylink);
        fd.append('pinterest',$scope.cmpypinterest);
        fd.append('tumblr',$scope.cmpytumblr);
        fd.append('github',$scope.cmpygithub);
        fd.append('instagram',$scope.cmpyinstagram);  */
        ////console.log(fd);
        $scope.data={};
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/company_edit/',
          data:fd,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function success(response){
          $scope.data=response.data;
          //console.log($scope.data);
          if($scope.data.result==null || $scope.data.result== undefined){
            if(type=='public')
              $scope.errormsg1=true;
            if(type=='contact')
              $scope.errormsg2=true;
              $scope.data.error=GetDataService.errorMsg[1];
              //console.log($scope.data);
          }else if($scope.data.result==0){
             if(type=='public')
              $scope.errormsg1=true;
            if(type=='contact')
              $scope.errormsg2=true;
            $scope.data.error=$scope.data.message;
             //console.log($scope.data);
          }else{  
            if(type=='public')
              $scope.errormsg1=true;
            if(type=='contact')
              $scope.errormsg2=true;
            $scope.data.error=$scope.data.message;
            $scope.getUser();
            $scope.submitted1=false;
            $scope.submitted2=false;
          }
         $('#loading').hide();
        $('#container').fadeIn();
        },function error(response){

          $scope.data={};
          console.log(response);
            if(type=='public')
              $scope.errormsg1=true;
            if(type=='contact')
              $scope.errormsg2=true;
          if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
          }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
        });
    };
    //reset password reset pop fields
    $scope.resetChangevalues = function(){
      $scope.RPerrormsg=false;
      $scope.RP=false;
      $scope.RPsubmitted=false;
      $scope.oldpwd='';
      $scope.pwd='';
      $("#pwd_strength_div").hide();
      $scope.cnfpwd='';
    };
    //password strength shown on changes
    $scope.$watch('pwd',function(newval){
      if(newval!='')
       $("#pwd_strength_div").show();
    },true);
    //reset password api call
    $scope.resetpwd=function(){
        $('#loading').show();
          $scope.data="waiting for data";
          $scope.errormsg=false;
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/reset_password/',
            data:{
              old:$scope.oldpwd,
              new:$scope.pwd,
              confirm:$scope.cnfpwd
            }
          })
          .then(function success(response){
            $scope.data=response.data;
            if($scope.data.result==0){
              $scope.RPerrormsg=true;
              $scope.data.error=$scope.data.message;
            }else{
               $scope.RPerrormsg=false;
               $scope.RP=true;
            }
            $('#loading').hide();
        $('#container').fadeIn();
          },function error(response){
            $scope.data={};
          //console.log(response);
           $scope.RPerrormsg=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }                
          }else
          $scope.data.error=GetDataService.errorMsg[1];
         $('#loading').hide();
         $('#container').fadeIn();
        });
    };
    // reset validation for optional images
    $scope.resetProfilepic= function(){
      if($scope.profileform.pofilePic.$invalid){
        $scope.profileform.pofilePic.$setValidity('minsizeval',true);
        $scope.profileform.pofilePic.$setValidity('minDimension',true);
        $scope.profileform.pofilePic.$setValidity('ratioval',true);
        $scope.imageSrc =$scope.currtuser.profile_picture;
        var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
        if(len>0 ){
          angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
            model.setType(4);
          });
        }
      }
    };
    //setting croped img
    $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }else if($scope.cropType=='pofilePic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
         model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  //reset when crop is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc=$scope.currtuser.company.logo;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1=$scope.currtuser.company.cover_image;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }else if($scope.cropType=='pofilePic'){
      $scope.imageSrc=$scope.currtuser.profile_picture;
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
         model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image is uploaded
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.pofilePic.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.coverimg.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    $scope.cropPic='';
    var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
    if(len>0){
      angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.profileform.pofilePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc=$scope.currtuser.profile_picture;
          }else{
            $scope.profileform.pofilePic.$setValidity('minsizeval',true);
           // //console.log(model.file);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=512  && height >= 512 ){
                $scope.profileform.pofilePic.$setValidity('minDimension',true);
                if(width ==512  && height == 512){
                  $scope.imageSrc=result;
                }else{
                  $scope.cropPic='profile';
                  $scope.cropType='pofilePic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    }
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.05);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == height){
                  $scope.profileform.pofilePic.$setValidity('ratioval',true);
                  
                }else{
                  $scope.profileform.pofilePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc=$scope.currtuser.profile_picture;
                }*/
              }else{
                $scope.profileform.pofilePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc=$scope.currtuser.profile_picture;
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
     var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.cmpypublicform.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.cmpyimageSrc=$scope.currtuser.company.logo;
          }else{
            $scope.cmpypublicform.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.cmpypublicform.cmpylogo.$setValidity('minDimension',true);
                 if(width ==1024  && height == 1024 ){
                   $scope.cmpyimageSrc = result;
                 }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    exportZoom: 1.25,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == height){
                  $scope.cmpypublicform.cmpylogo.$setValidity('ratioval',true);
                   $('#crop-image').modal('show');
                   $scope.cropImg=result;
                  $scope.cmpyimageSrc = result;
                }else{
                  $scope.cmpypublicform.cmpylogo.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.cmpyimageSrc=$scope.currtuser.company.logo;
                }*/
              }else{
                $scope.cmpypublicform.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.cmpyimageSrc=$scope.currtuser.company.logo;
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('cover image change');
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);

        }else{
          if(model.file.size > 5242880){
            $scope.cmpypublicform.coverimg.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc1=$scope.currtuser.company.cover_image;
          }else{
            $scope.cmpypublicform.coverimg.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // //console.log(width+'X'+height);
              if(width >= 2048 && height >= 1024 ){
                $scope.cmpypublicform.coverimg.$setValidity('minDimension',true);
                 if(width == 2048 && height == 1024 ){
                  $scope.imageSrc1 = result;
                 }else{
                  $scope.cropType='coverimg';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    }
                  });
                  $('.image-editor').cropit('imageSrc', result);

                  $('.image-editor').cropit('previewSize', {width:500,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
                /*if(width == (height*2)){
                  $scope.cmpypublicform.coverimg.$setValidity('ratioval',true);
                   $('#crop-image').modal('show');
                   $scope.cropImg=result;
                  $scope.imageSrc1 = result;
                }else{
                  $scope.cmpypublicform.coverimg.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1=$scope.currtuser.company.cover_image;
                }*/
              }else{
                $scope.cmpypublicform.coverimg.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc1=$scope.currtuser.company.cover_image;
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc=$scope.currtuser.profile_picture;
    }
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.cmpyimageSrc=$scope.currtuser.company.logo;
    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1=$scope.currtuser.company.cover_image;
    }
  });
  $scope.$on('$dropletError', function () {
   ////console.log('something Went wrong');
  });
  $scope.errormsg=false;
  //update profile api call
  $scope.UpdateProfile =  function(){
    $('#loading').show();
     var fd =new FormData();
    fd.append('full_name',$scope.pname);
    fd.append('designation',$scope.PDesg);
    angular.forEach($scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID),function(model,key){
      fd.append('profile_picture',model.file);
    });
    len=$scope.pofilePic.getFiles($scope.pofilePic.FILE_TYPES.VALID).length;
      if(len==0){
        fd.append('profile_picture','');
      }
    $http({method:'POST',
      url:YaraBaseUrl.url+'/organizer_edit/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                        $scope.getUser();
                    }
          $('#loading').hide();
         $('#container').fadeIn();
        //$scope.getPreferences();
        },function error(response){
       // $('#invite').modal('hide');
        $scope.data={};
        //console.log(response);
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
  };
  $scope.scrollTop = function(){
        $('#loading').show();
        $anchorScroll();
        $timeout(function() {
          $('#loading').hide();
        }, 200);
        $timeout(function() {
          $('textarea').each(function() {
              h(this);
          });
        }, 500);  
  };
  function h(e) {
       $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
   }
   $('textarea').each(function () {
     h(this);
   }).on('input', function () {
     h(this);
   });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Account Page Controller
app.controller('SettingsController',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$document','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$document,$rootScope){
  //checking privilege and options based on privilege
  if(GetDataService.getPrivilege(8)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  // list of all timezones
  $scope.showTzlist = false;
  $scope.getTimezones = function(){
    $('#loading').show();
    GetDataService.getTimezone().then(function(response){
      if(response.result==1){
        $scope.timeZones = response.timezones;
        $scope.currentTimeZone = response.current_timezone;
        $scope.selectedTimeZone = response.current_timezone;
        $scope.is24Hours = response.is_time_format_24;
        $('#loading').hide();
        $('#container').fadeIn();
      }
    });
  };
  $scope.getTimezones();
  $scope.showTimeZones = function(){
    $scope.showTzlist = true;
  };
  $scope.selectTimeZone = function(tz){
    $scope.selectedTimeZone = tz;
    $scope.showTzlist = false;
  };
  $scope.logindata=angular.fromJson(localStorage.getItem('Logininfo'));
  $scope.saveTimeZone =function(){
            $http({
                    method:'POST',
                    url:YaraBaseUrl.url+'/timezone-list/',
                    data:{current_timezone:$scope.selectedTimeZone,
                      is_time_format_24:$scope.is24Hours}
                }).then(function success(response){
                  if(response.data.result==1){
                      localStorage.setItem("is_time_format_24",$scope.is24Hours);
                      if ($scope.logindata.user_type=='Sponsor' || $scope.logindata.user_type=='Exhibitor') {
                            var  dashboardUrl = "showcase-dashboard";
                            localStorage.setItem('dashboardUrl',dashboardUrl);
                            $scope.logindata.user_offset=$scope.is24Hours;
                            localStorage.setItem('Logininfo',angular.toJson($scope.logindata));
                            window.location='/showcase-dashboard'; 
                            
                      }else if($scope.logindata.user_type=='Collaborator'){
                            var  dashboardUrl = "collaborator-dashboard";
                            localStorage.setItem('dashboardUrl',dashboardUrl);
                            $scope.logindata.user_offset=$scope.is24Hours;
                            localStorage.setItem('Logininfo',angular.toJson($scope.logindata));
                            window.location='/collaborator-dashboard'; 
                            
                      }else if($scope.logindata.user_type=="Admin"){
                        window.location='/happyhelp-dashboard'; 
                      }else{
                            var  dashboardUrl = "dashboard";
                            localStorage.setItem('dashboardUrl',dashboardUrl);
                            window.location="/dashboard";
                          }
                     }
                     else if(response.data.result==0){
                       $scope.errorStatus=true;
                        $scope.msg=response.data.message;
                     }
                },function failed(response){
                if(response.status==-1 || response.data==null){
                }
            }); 
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Follower Page controller
app.controller('FollowCtrl',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$rootScope){
  $scope.followers =[];
  $scope.err=false;
  document.title='YARA - Followers';
  GetDataService.getFollow().then(function(res){
    if(res.result==1){
      $scope.followers=res.followers;
      angular.forEach($scope.followers,function(f){
        f.full_name=f.first_name;
        if(f.middle_name!='')
          f.full_name+=' '+f.middle_name;
        if(f.last_name!='')
          f.full_name+=' '+f.last_name;
      });
    }else if(res.result==0){
       $scope.err=true;
       $scope.msg=res.message;
    }else{
    }
    $('#loading').hide();
    $('#container').fadeIn();
  });
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// bills controller api
app.controller('BillsCtrl',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$rootScope){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(GetDataService.getPrivilege(14)=='Admin')
    $scope.privilege=true;
  else
  window.location="/dashboard";
  document.title='YARA - Bills';
  $scope.service = APPService;
  $scope.setOffset = function(d){return GetDataService.userOffsetTime(d,$scope.userOffset);};
  // for safari browser Download option is hidden
  $scope.browser=$rootScope.browser;
  //fetching bill
  $scope.getBills= function(){
    $scope.billerror=false;
    $('#loading').show();
    GetDataService.getAllBills().then(function(res){
      if(res.result == 1){
        $scope.billList=res.bills;
      }else{
        $scope.billerror=true;
        $scope.billmsg=res.message;
      }
      $('#loading').hide();
      $('#container').fadeIn();
    });
  };
  $scope.getBills();
  // fetching bills email preference
  $scope.getPreferences= function(){
    GetDataService.getPreference().then(function(res){
      if(res.result==1){
          $scope.userOffset = res.uo;
          $scope.emailprf=res.preferences;
          $scope.resetsetting();
      }
    });
  };
  $scope.getPreferences();
  // reset email setting fields
  $scope.resetsetting=function(){
    $scope.EmailPr1='';
    $scope.EmailPr2='';
    $scope.EmailPr3='';
    $scope.EmailPr4='';
   // $scope.errormsg=false;
    angular.forEach($scope.emailprf,function(p){
      if(p.preference=='preference1')
        $scope.EmailPr1=p.email;
      if(p.preference=='preference2')
        $scope.EmailPr2=p.email;
      if(p.preference=='preference3')
        $scope.EmailPr3=p.email;
      if(p.preference=='preference4')
        $scope.EmailPr4=p.email;
    });
     $scope.settingChange();
  };
  //watching changes in email ids
  $scope.$watchCollection('[EmailPr1,EmailPr2,EmailPr3,EmailPr4]',function(){
    $scope.settingChange();
    $scope.errormsg=false;
  });
  // before window close check for email id changes in prefernces
  window.onbeforeunload = function (event) {
    if($scope.setting && $scope.emailChange){
      var message = 'Do you want to discard changes?';
      if (typeof event == 'undefined') {
        event = window.event;
      }
      if (event) {
        event.returnValue = message;
      }
      
        return message;
    }
  }
  //checking changes in email preferences
  $scope.settingChange= function(){
    $scope.emailChange=false;
    if($scope.emailprf != undefined){
      var ex = $filter('filter')($scope.emailprf,{preference:'preference1'},true);
      ex1 = $filter('filter')($scope.emailprf,{email:$scope.EmailPr1},true);
     // //console.log(ex);
      if(ex.length>0 && $scope.EmailPr1 != ex[0].email && ex1.length<=0)
          $scope.emailChange=true;
      else if(ex.length<=0 && $scope.EmailPr1!='' && ex1.length<=0)
          $scope.emailChange=true;
      ex = $filter('filter')($scope.emailprf,{preference:'preference2'},true);
      ex1 = $filter('filter')($scope.emailprf,{email:$scope.EmailPr2},true);
      if(ex.length>0 && $scope.EmailPr2 != ex[0].email && ex1.length<=0)
          $scope.emailChange=true;
      else if(ex.length<=0 && $scope.EmailPr2!='' && ex1.length<=0)
          $scope.emailChange=true;
      ex = $filter('filter')($scope.emailprf,{preference:'preference3'},true);
      ex1 = $filter('filter')($scope.emailprf,{email:$scope.EmailPr3},true);
      if(ex.length>0 && $scope.EmailPr3 != ex[0].email && ex1.length<=0)
          $scope.emailChange=true;
      else if(ex.length<=0 && $scope.EmailPr3!='' && ex1.length<=0)
          $scope.emailChange=true;
      ex = $filter('filter')($scope.emailprf,{preference:'preference4'},true);
      ex1 = $filter('filter')($scope.emailprf,{email:$scope.EmailPr4},true);
      if(ex.length>0 && $scope.EmailPr4 != ex[0].email && ex1.length<=0)
          $scope.emailChange=true;
      else if(ex.length<=0 && $scope.EmailPr4!='' && ex1.length<=0)
          $scope.emailChange=true;
    }
  }
  //setting emails api call 
  $scope.setSettings = function(){
      var dt=[];
      if($scope.EmailPr1!='' || $filter('filter')($scope.emailprf,{preference:'preference1'},true).length>0){
        var t={};
        t.email=$scope.EmailPr1;
        t.preference='preference1';
        var ex = $filter('filter')($scope.emailprf,{email:$scope.EmailPr1},true);
        var ex1 = $filter('filter')(dt,{email:$scope.EmailPr1},true);
        if(ex.length<=0 && (ex1.length <=0 ||  (ex1.length > 0 && $scope.EmailPr1=="")))
        dt.push(t);
      }
      if($scope.EmailPr2!='' || $filter('filter')($scope.emailprf,{preference:'preference2'},true).length>0){
        var t={};
        t.email=$scope.EmailPr2;
        t.preference='preference2';
        var ex = $filter('filter')($scope.emailprf,{email:$scope.EmailPr2},true);
        var ex1 = $filter('filter')(dt,{email:$scope.EmailPr2},true);
        if(ex.length<=0  &&  (ex1.length <=0 ||  (ex1.length > 0 && $scope.EmailPr2=="")))
          dt.push(t);
      }
      if($scope.EmailPr3!='' || $filter('filter')($scope.emailprf,{preference:'preference3'},true).length>0){
        var t={};
        t.email=$scope.EmailPr3;
        t.preference='preference3';
        var ex = $filter('filter')($scope.emailprf,{email:$scope.EmailPr3},true);
        var ex1 = $filter('filter')(dt,{email:$scope.EmailPr3},true);
        if(ex.length<=0  &&  (ex1.length <=0 ||  (ex1.length > 0 && $scope.EmailPr3=="")))
        dt.push(t);
      }
      if($scope.EmailPr4!='' || $filter('filter')($scope.emailprf,{preference:'preference4'},true).length>0){
        var t={};
        t.email=$scope.EmailPr4;
        t.preference='preference4';
        var ex = $filter('filter')($scope.emailprf,{email:$scope.EmailPr4},true);
        var ex1 = $filter('filter')(dt,{email:$scope.EmailPr4},true);
        if(ex.length<=0  &&  (ex1.length <=0 ||  (ex1.length > 0 && $scope.EmailPr4=="")))
        dt.push(t);
      }
      if(dt.length>0){
        $('#loading').show();
          $http({
          method:'POST',
          url:YaraBaseUrl.url+'/preference/',
          data:{
            preferences:dt
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                    }
          $('#loading').hide();
         $('#container').fadeIn();
        $scope.getPreferences();
        dt=[];
        },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
      }
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Admin page controller
app.controller('AdminCtrl',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$rootScope',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$rootScope){
  //checking privilege only admin can access
  if(GetDataService.getPrivilege(1)=='Admin')
    $scope.privilege=true;
  else
    window.location="/dashboard";
  document.title='YARA - Team';
  $scope.service=APPService;
  //fetching organizer list
  $scope.getOrganizer= function(){
    $('#loading').show();
    GetDataService.getOrganizer({target:'current_company'}).then(function(res){
      if(res.result==1){
        $scope.organizerlist=res.organizers;
        $('#loading').hide();
       $('#container').fadeIn();
      }
    });
  };
  $scope.getOrganizer();
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  //fetch current user details
  $scope.getUser= function(){
    GetDataService.getCurrtUser().then(function(res){
      $scope.currtuser=res.user_data;
    });
  };
  $scope.getUser();
  //before Delete User
  $scope.DeleteMember = function(data){
    $scope.Dname=data.full_name;
    $scope.Demail=data.username;
    $scope.DT=false;
    $scope.errormsg2=false;
  };
  // Enable members
  $scope.EnableMember=function(member) {
    $scope.enname=member.full_name;
    $scope.enemail=member.username;
    $scope.ET=false;
  }
  // Enable member api
  $scope.ManageEnableMember=function () {
    $('#loading').show();
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/organizer/enable/',
          data:{
            email:$scope.enemail,
          }
        })
        .then(function success(response){
          console.log(response)
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg2=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg2=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.ET=true;
                      $scope.getOrganizer();
                    }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
  }
  // revoke member api call
  $scope.revokeMember = function(){
    $('#loading').show();
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/organizer/disable/',
          data:{
            email:$scope.Demail,
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg2=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg2=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.DT=true;
                      $scope.getOrganizer();
                    }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
  };
  // before convert member, data is user data and 'as' convertion type
  $scope.convertMember = function(data,as){
    $scope.Cname=data.full_name;
    $scope.Cemail=data.username;
    $scope.Cas=as;
    $scope.CT=false;
    $scope.errormsg1=false;
  };
  // convert user api call
  $scope.setMember = function(){
    $('#loading').show();
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/privilege/',
          data:{
            email:$scope.Cemail,
            to:$scope.Cas
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg1=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg1=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.CT=true;
                      $scope.getOrganizer();
                    }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
  };
  // reset invite popup
  $scope.invitereset =function(){
    $scope.invitaT=false;
    $scope.Email='';
    $scope.submitted=false;
    $scope.errormsg=false;
  };
  $scope.invitemail=function () {
    $scope.data=""
  }
  //invite api call
  $scope.inviteMember = function(){
    $scope.errormsg=false;
    var dm=$scope.currtuser.username.split('@');
    var ckdm=$scope.Email.split('@');
    var ex = $filter('filter')($scope.organizerlist,{username:$scope.Email},true);
    if(ckdm[1]==dm[1] && ex.length<=0){
       $('#loading').show();
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/invitation/',
          data:{
            email:$scope.Email,
            invite_as:$scope.inviteAs
          }
        })
        .then(function success(response){
          $scope.data=response.data;
          if( $scope.data.result==undefined || $scope.data.result==null){
                        $scope.errormsg=true;
                        $scope.data.error=GetDataService.errorMsg[1];
                    }else if($scope.data.result==0){
                      $scope.errormsg=true;
                        $scope.data.error=$scope.data.message;
                    }else{
                      $scope.invitaT=true;
                    }
          $('#loading').hide();
          $('#container').fadeIn();
        },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
       $('#loading').hide();
       $('#container').fadeIn();
      });
    }else if(ex.length>0){
      $scope.errormsg=true;
      $scope.data={};
      $scope.data.error=GetDataService.errorMsg[3];
    }else if(ckdm[1]!=dm[1]){
      $scope.errormsg=true;
      $scope.data={};
      $scope.data.error=GetDataService.errorMsg[4];
    }
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Assets Controller
app.controller('AssetsController',['$scope','APPService','YaraBaseUrl','$http','$location','$filter','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,$filter,GetDataService,$rootScope){
    document.title='YARA - Assets';
    $scope.speakerData=[];
    $scope.sponsorData=[];
    $scope.ExhibitorData=[];
    $scope.err=false;
    $scope.sc=$scope;
    // redirecting based on event is_active, a means is_active and c is event_code
    $scope.Event =function(a,c){
      $('#loading').show();
        GetDataService.getEvent(c).then(function(res){
          if(res.result==1){
            angular.forEach(res.events,function(e){
              localStorage.setItem('selEventsData',angular.toJson(e));
            });
            localStorage.setItem('selectedEventId',c);
            if(a)
              window.location="/event";
            else{
              localStorage.setItem('ArcEventId',c);
              localStorage.removeItem('selectedEventId');
              window.location="/archived-event";
            }
          }
          $('#loading').hide();
          $('#container').fadeIn();
        });
    };
    //fetching assest api
    GetDataService.getAssets().then(function(res){
      if(res.result==1){
        $scope.speakerData=res.special_delegates;
        $scope.sponsorData=res.sponsors;
        $scope.ExhibitorData=res.exhibitors;
        angular.forEach($scope.speakerData,function(sp){ // speaker combination of full name for easy search
          sp.full_name=sp.first_name;
          if(sp.middle_name!='')
            sp.full_name+=' '+sp.middle_name;
          if(sp.last_name!='')
            sp.full_name+=' '+sp.last_name;
        });
      }else{
        $scope.err=true;
        $scope.msg=res.message;
      }
      $('#loading').hide();
      $('#container').fadeIn();
    });
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
// Events Listing page controller
app.controller('EventsController',['$scope','APPService','YaraBaseUrl','$http','$location','$filter','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,$filter,GetDataService,$rootScope){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(GetDataService.getPrivilege()=='Admin'){
      $scope.privilege=true;
  }
  else{
      $scope.privilege=false;
  }
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.eventsdata=[];
  $scope.shownav=true;
  document.title='YARA - Events';
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  //fetching events data
  $scope.errorstatus=false;
  GetDataService.getEvents().then(function(res){
    $('#loading').show();
      if(res.result==1){
          $('#loading').hide();
          $('#container').fadeIn();
          $scope.eventsdata=res.events;
          $scope.setOffset = function(d, offset) {
              return GetDataService.userOffsetTime(d, offset);
          }; 
      }else{
          $scope.errorstatus=true;
      }
  });
  $scope.redirectInfo = function(eventName){
        localStorage.removeItem('infoPageErrors');
        var infoPageErrors = {
          errorNum:1,
          heading:eventName,
          subHeading:"",
          description:""
        };
        localStorage.setItem('infoPageErrors',angular.toJson(infoPageErrors));
        window.location = "/info";
  };
  //redirect event based on is_active , selval is event code and flag is active
  $scope.selectedtype=function(selval,flag){
    $scope.selectedval=selval;
     if(!flag){
          localStorage.setItem('selectedEventId',selval);
          localStorage.removeItem('ArcEventId');
          for(var i=0;i<$scope.eventsdata.length;i++){ 
            if($scope.eventsdata[i].event_code==selval){
                var eventReadyRedirection = {
                  "eventready":false,
                  "tracks":false,
                  "gk":false,
                  "promote":false,
                  "pin":false
                };
                localStorage.setItem('selEventsData',angular.toJson($scope.eventsdata[i]));
                if($scope.eventsdata[i].is_track_setup==false ) {
                  localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
                  if($scope.privilege==false){
                      $scope.redirectInfo($scope.eventsdata[i].name);
                  }else
                  {
                    window.location = "/event-ready";
                  }
                }
                else if($scope.eventsdata[i].kits.GateKeeper.confirmed==false){
                  eventReadyRedirection.eventready=true;
                  eventReadyRedirection.tracks=true;
                  localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
                  if($scope.privilege==false){
                      $scope.redirectInfo($scope.eventsdata[i].name);
                    }else
                    {
                      window.location = "/event-setup-gatekeeper";
                    }
                }
                else if($scope.eventsdata[i].kits.GateKeeper.confirmed==true && $scope.eventsdata[i].is_private==true && $scope.eventsdata[i].kits['Pin To Pulse'].confirmed==false ){
                  eventReadyRedirection.eventready=true;
                  eventReadyRedirection.tracks=true;
                  eventReadyRedirection.gk=true;
                  localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
                  if($scope.privilege==false){
                      $scope.redirectInfo($scope.eventsdata[i].name);
                    }else
                    {
                      window.location = "/posting-pin";
                    }                    
                }
                else if($scope.eventsdata[i].kits.GateKeeper.confirmed==true && $scope.eventsdata[i].is_private==false && $scope.eventsdata[i].kits.Promote.confirmed==false){
                  eventReadyRedirection.eventready=true;
                  eventReadyRedirection.tracks=true;
                  eventReadyRedirection.gk=true;
                  localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
                  if($scope.privilege==false){
                      $scope.redirectInfo($scope.eventsdata[i].name);
                    }else
                    {
                         window.location = "/event-setup-promotion";
                    }
                }
                else{
                    window.location = "/event";
                }
            }
          }
     }else{
      localStorage.removeItem('selectedEventId');
      localStorage.setItem('ArcEventId',selval);
      for(var i=0;i<$scope.archivedEvents.length;i++){
        if($scope.archivedEvents[i].event_code==selval){
            localStorage.setItem('ArcEventsData',angular.toJson($scope.archivedEvents[i]));
            window.location="/archived-event";  
        }
      }
     }
  };
  var jsonstr='';
  $scope.getdata=function(str){
   jsonstr=angular.fromJson(JSON.parse(str.replace(/'/g,'"')));
   return jsonstr;
  };
  $scope.archivedevent=function () {
    $('#loading').show();
    GetDataService.getarchived().then(function(res){
        if(res.result==1){
            $('#loading').hide();
            $('#container').fadeIn();
            $scope.archivedEvents=res.events;
        }
    });
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Archived Event Controller
app.controller('ArchivedEventController',['$scope','APPService','YaraBaseUrl','$http','$location','$filter','GetDataService','$rootScope','$timeout','$anchorScroll',function($scope,APPService,YaraBaseUrl,$http,$location,$filter,GetDataService,$rootScope,$timeout,$anchorScroll){
  //getting event id from loacl data
  // $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  var selectedval=localStorage.getItem('ArcEventId');
  if(selectedval=== undefined || selectedval === null || selectedval == '' )
  {
       window.location = "/events";
  }
  $scope.archivedevents=JSON.parse(localStorage.getItem('ArcEventsData'));
  console.log($scope.archivedevents);
   document.title='YARA - '+$scope.archivedevents.short_name+' - Archived Event';
  $scope.exhibitors = [];
  $scope.sponsers = [];
  $scope.Archivedtab = function() {
    $scope.tabelement = [
        { 'group_tittle': 'General', 'id':'general' },
        { 'group_tittle': 'Sessions', 'id':'session'},
        { 'group_tittle': 'Exhibitors', 'id':'exhibitor' },
        { 'group_tittle': 'Sponsors', 'id':'sponser' },
        { 'group_tittle': 'Collaborators', 'id':'collabrator' },
        { 'group_tittle': 'Media', 'id':'media'},
        { 'group_tittle':"Delegates",'id':10},
    ];
    if ($scope.archivedevents.sp_people.length != 0) {
        for (var i = 0; i < $scope.archivedevents.sp_people.length; i++) {
            $scope.tabelement.push($scope.archivedevents.sp_people[i]);
        };
    };
    $scope.dbutton = ($scope.tabelement.length - 3);
    $timeout(function() {
        if ($(".slider").length > 0) {
            $(".slider").diyslider({
                width: "100%", // width of the slider
                height: "51px", // height of the slider
                minSlides: 2, // number of slides you want it to display at once
                loop: false, // disable looping on slides
                moveSlides: 1,
            });
        }
    }, 100);
  };
  $scope.Archivedtab(); 
  $scope.eventOffset =  $scope.archivedevents.eo;
  $scope.currentPinImage='';
  // $scope.params = {
  //     offset:0,
  //     limit:10,
  //     type:10,
  //     initialize_ticket:1
  //   };
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  //media
  $scope.getmedia=function () {
    GetDataService.getGalleryArchived({archived:1,event_code:selectedval}).then(function(res){
        if (res.result==1) {  
            $.each(res.data[0].pins, function(i,item){
            var itemurl= item.url
            var getext=itemurl.split('.').pop();
            var urlres=itemurl.replace('.'+getext, '_Q1.'+getext);
                if(res.data[0].pins[i].url!=null){
                // $("<img class='imgflikr' />").attr("src", item.url).appendTo("#flickrbox").wrap("<div class='imagesflickr'><a title='"+i+"' rel='prettyPhoto[flickrgallery]' href='"+item.url+"'></a></div>").mouseover(function() {
                  $("<img class='imgflikr' />").attr("src", urlres).appendTo("#flickrbox").wrap("<div class='imagesflickr'><a  rel='prettyPhoto[flickrgallery]' href='"+urlres+"'></a></div>").mouseover(function() {
                    $(this).css("filter","alpha(opacity=70)");
                    $(this).css("-moz-opacity",".70");
                    $(this).css("opacity",".70");
                  }).mouseout(function(){
                     $(this).css("filter","alpha(opacity=1)");
                    $(this).css("-moz-opacity","1");
                    $(this).css("opacity","1");
                    });
                }
            });
            $("a[rel^='prettyPhoto']").prettyPhoto({modal: true, social_tools:"", deeplinking: false});
        $scope.imagesPins = res.data[0].pins;
        }else{
        };    

    });
  };
  $scope.getmedia();
  function selectPin(opt){
    $scope.currentPinImage=opt;
  }
  // getting ticket code
  $scope.getTickets = function(){
    GetDataService.getTickets(selectedval).then(function(res){
      if(res.result == 1){
        $scope.ticketList=res.tickets;
        // console.log($scope.ticketList);
        $scope.ticket=$scope.ticketList[0].ticket_code;
        $('#loading').hide();
      }
    });
  };
  $scope.getTickets();
  //sponsers
  $scope.sponsersdata=function() {
        $('#loading').show();
         GetDataService.getSponsors(selectedval).then(function(res)
         {
              if(res.result==1){
                  $scope.sponsers=res.data;
                  $('#loading').hide();
              }
          });
  };
  //exhibitors
  $scope.exhibitordata=function () {
    $('#loading').show();
         GetDataService.getExhibitors(selectedval).then(function(res){
          $scope.exhibitors=res.data;
          $('#loading').hide();
         });
  };
  //get colobraters
  $scope.collobraterdata=function () {
    $('#loading').show();
        GetDataService.getCollaborators(selectedval).then(function(res){
                if (res.result==1) {
                  $scope.collobraters=res.data;
                  $scope.permissionlist=[ 'People',
                              'GateKeeper',
                              'AdSpace',
                              'Schedule',
                              'SpeakerEngage',
                              'FileBank',
                              'Sponsors',
                              'Exhibitors',
                              'ShowCase',
                              'Coupons',
                              'Vote',
                              'VenueGreet',
                              'FloorMap',
                              'WiFi Spots'];
                  $('#loading').hide();
                };
        });
  };
  $scope.permission=function (list) {
    $scope.per=list;
    console.log($scope.per)
  }
  $scope.selectTicket=function (lis){
    $scope.ticket=lis.ticket_code;
    $scope.ticketName=lis.name;
    $scope.peopleList = [];
      $scope.EndList=false;
      $scope.blockScroll = false;
      $scope.params =   {
        offset:0,
        limit:50,
        type: $scope.seltab,
        ticket_code:$scope.ticket,
        initialize_ticket:0,
        event_code:$scope.archivedevents.event_code,
        s:1
      };
      $scope.getAllpeople();
  }
  $scope.dayid=function (d) {
    $scope.dayids=d.dayID;
    $anchorScroll();
  }
  $scope.pn=0;
   //sessions
  $scope.listallSessions = function(){
    $('#loading').show();
      var  param = {
          bs:1,
          event_code:selectedval
      };
      GetDataService.getallSessions(param).then(function(res){
          if(res.result==1){
            $scope.allv=res;
            $scope.sessions=res.sessions;
            $('#loading').hide();
          }
      });
  };
  $scope.dechipereve=function (code) {
    localStorage.setItem('selecteddecEventId',code);
    window.location = "/decipher-event";        
  }
  $scope.seltab=$scope.tabelement[0].id;
  $scope.selecttab = function(tab){
    $scope.seltab=tab.id;
    if (tab.id=='session') {
      $scope.listallSessions();
    }else if(tab.id=="exhibitor"){
      $scope.exhibitordata();
    }else if(tab.id=="sponser"){
      $scope.sponsersdata();
    }else if(tab.id=="collabrator"){
      $scope.collobraterdata();
    }else if (typeof tab.id=="number") {
      console.log(tab.id);
      $scope.idfortab=tab.group_tittle;
      $scope.ticket=$scope.ticketList[0].ticket_code;
      $scope.ticketName=$scope.ticketList[0].name;
      $scope.peopleList = [];
      $scope.EndList=false;
      $scope.blockScroll = false;
      $scope.params =   {
        offset:0,
        limit:50,
        type:tab.id,
        initialize_ticket:0,
        ticket_code:$scope.ticket,
        event_code:$scope.archivedevents.event_code,
        s:1
      };
      $scope.getAllpeople();
    };
  };
  $scope.getAllpeople = function(){
    // $('#loading').show();
      if($scope.EndList==false){
            $scope.blockScroll = true;
            GetDataService.getPeopleInfo($scope.params).then(function(res)
            {
                if(res.result==1){
                    $scope.blockScroll = false;
                    $scope.peopleList=$scope.peopleList.concat(res.delegates);
                    $scope.EndList=res.end;     
                    // $('#loading').hide();
                }
            });
        }
  };
  $scope.addMoreItems = function(){
    // console.log($scope.params);
    // console.log($scope.ticket);
      if(!$scope.EndList && $scope.params!=undefined && ($scope.searchPeople==undefined || $scope.searchPeople.length==0) ){
              console.log($scope.ticket);

         $scope.params.ticket_code = $scope.ticket;
         $scope.params.offset =  $scope.params.limit;
         $scope.params.limit =  $scope.params.limit+50;  
         $scope.params.type =  $scope.seltab;
         $scope.getAllpeople();
      }
      else if($scope.ticket!=undefined && $scope.params!=undefined){
           $scope.getSearchPeople();
      }
  };
  $scope.getSearchPeople = function(){
      if($scope.reachEnd==false && $scope.searchParam!=undefined)
      {
          $scope.blockScroll = true;
          GetDataService.getPeoplesearchInfo($scope.searchParam).then(function(res)
          {
              if(res.result==1){
                  $scope.blockScroll = false;
                 $scope.peopleList=$scope.peopleList.concat(res.search_data);
                  $scope.reachEnd = res.end;
                  $scope.searchCall=false;
                  if(res.end==false){
                      var offset = $scope.peopleList.length;
                      $scope.searchParam.offset = offset;
                      $scope.searchParam.limit = offset+50;
                  }
              }
          });
      }
  }; 
  $scope.$watch('searchPeople', function(newval,oldval){
      console.log("searchPeople newval->"+newval);
      console.log("searchPeople oldval->"+oldval);
      if (newval!=undefined &&newval!=null && newval.length>0 && $scope.ticket!=undefined) {
            $scope.searchParam={};
            $scope.searchParam.q = newval;
            $scope.searchParam.event_code = $scope.archivedevents.event_code;
            $scope.searchParam.ticket_code = $scope.ticket;
            $scope.searchParam.on =  $scope.seltab;
            $scope.searchParam.limit = 50;
            $scope.searchParam.offset = 0;
            $scope.searchParam.day_id = null;
            $scope.searchParam.s = 1;
            $scope.peopleList = [];
            $scope.reachEnd = false;
            $scope.searchCall=true;
            $scope.getSearchPeople();
      }
      else if ((newval==undefined ||newval==''||newval==null) && oldval!=undefined && $scope.ticket!=undefined){
              $scope.peopleList = [];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.ticket;
              $scope.params.initialize_ticket = 0;
              $scope.params.limit = 50;
              $scope.params.offset = 0;
              $scope.searchCall=false;
              $scope.getAllpeople();
      }
    },true);   
    $scope.removeSearch = function(){
      $scope.searchPeople='';
      $scope.searchCall=false;
    };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Event Page controller
app.controller('EventController',['$scope','YaraBaseUrl','$http','$location','APPService','GetDataService','$rootScope','$filter',function($scope,YaraBaseUrl,$http,$location,APPService,GetDataService,$rootScope,$filter){
  // getting privilege based on options is viewed
  if(GetDataService.getPrivilege(7)=='Admin')
    $scope.privilege=true;
  else
     $scope.privilege=false;
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.clearLocalStorage = function(){
      localStorage.removeItem('camImage');
      localStorage.removeItem('editSession');
      localStorage.removeItem('eventdayid');
      localStorage.removeItem('sessId');
      localStorage.removeItem('dcode');
      localStorage.removeItem('ecode');
      localStorage.removeItem('addressComp');
      localStorage.removeItem('epData');
      localStorage.removeItem('lat');
      localStorage.removeItem('lng');
      localStorage.removeItem('placeName');
      localStorage.removeItem('redirectionInfo');
      localStorage.removeItem('timeZone');
      localStorage.removeItem('country');
      localStorage.removeItem('phonInfo');
      localStorage.removeItem('isEventPrvt');
      localStorage.removeItem('tabid');
      localStorage.removeItem('ticketTabinfo');
      localStorage.removeItem('delegateIdinfo');
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      localStorage.removeItem('spEdit');
      localStorage.removeItem('eventReadyRedirection');
      localStorage.removeItem('Addata');
      localStorage.removeItem('slotInfo');
      localStorage.removeItem('Addate');
      localStorage.removeItem('Adtime');
      localStorage.removeItem('ArcEventsData');
      localStorage.removeItem('dechipereventsdata');
      localStorage.removeItem('latandLong');
      localStorage.removeItem('ArcEventsData');
      localStorage.removeItem('ArcEventId');
      localStorage.removeItem('session');     
      localStorage.removeItem('tabcode');
      localStorage.removeItem('redirectPpl');
      localStorage.removeItem('session');

  };
  $scope.clearLocalStorage();
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.allowIssue=true;
  document.title='YARA - '+$scope.currentval.name;
  var days=$scope.currentval.days;
  //time offset 
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  $scope.s_date=s_date;
  $scope.e_date=e_date;
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  $scope.happyHelp =function(){
   sessionStorage.setItem('redirectFrom','Event');
    window.location="/happyhelp";
  };
  $scope.redirectInfo = function(){
        localStorage.removeItem('infoPageErrors');
        var infoPageErrors = {
          errorNum:2,
          heading:$scope.currentval.name,
          subHeading:"",
          description:""
        };
        localStorage.setItem('infoPageErrors',angular.toJson(infoPageErrors));
        window.location = "/info";
  };
  // checking gatekeeper is setup
  $scope.checkGatekeeper =function(){
    if($scope.currentval.gate_keeper==0)
    {
      if($scope.privilege==false){
          $scope.redirectInfo();
      }
      else{
        localStorage.setItem('setupGk',true);
        window.location="/event/setup-gatekeeper";
      }
    }
    else{
        window.location="/event/gatekeeper";
      }
  };  
  $scope.managesecurity=function () {
    localStorage.removeItem('securityredirect');
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Pulse Controller
app.controller('EventPulseController',['$scope','YaraBaseUrl','fileReader','$http','$location','GetDataService','$filter','APPService','$rootScope','$timeout',function($scope,YaraBaseUrl,fileReader,$http,$location,GetDataService,$filter,APPService,$rootScope,$timeout){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
 $scope.disableBtn = true;
 $scope.minLength = 50;
 $scope.isImageUploaded = false;
  // getting event details from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - App Pulse';
  $scope.service=APPService;
  $scope.UsedPin=0;
  //time offset 
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  //fetching pulse data
  var usertype=localStorage.getItem('user_type');
  $scope.getPulse=function(){
   $('#loading').show();   
   GetDataService.getPulse($scope.currentval.event_code).then(function(res){
      if(res.result==1){
         // $scope.pulsedata=res.company_posts;
          console.log(res);
          $scope.UsedPin=res.post_count;
          $scope.pulseAct = res.event_activation_time;
          $scope.pulseAppData=res.posts;
          $scope.userOffset = res.uo;
          $('#loading').hide();
          $('#container').fadeIn();
       }
   });
  };
  // check is dasboard pulse is active
  $scope.isAvaliable =function(){
    if(new Date()<$scope.setOffset($scope.currentval.start_date,$scope.currentval.eo))
      return false;
    else
      return true;
  };
  // tab switch based on Active
  if(!$scope.isAvaliable())
    $scope.currtTab='App';
  else
    $scope.currtTab='Dashboard';
  // check pulse active 
  $scope.isActive = function(){
    var d = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    d.setDate(d.getDate()-7);
    if(new Date()<d)
      return false;
    else
      return true;
  };
  $scope.isActive();
  $scope.getPulse();
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
      $scope.imageSrc = imageData;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop is cancel
  $scope.resetCropImg =function(){
      $scope.imageSrc = "";
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
      $('.image-editor').cropit('imageSrc', '');
  };
  /* image Upload */
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.plusePic.allowedExtensions(['png', 'jpg', 'jpeg']);    
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    //$('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      $scope.disableBtn = false;
      $scope.minLength = 0;
       $scope.isImageUploaded = true;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.postform.plusePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.postform.plusePic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.postform.plusePic.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                   $scope.imageSrc = result;
                 }else{
                  $('.image-editor').cropit({
                    exportZoom: 1.25,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.postform.plusePic.$setValidity('ratioval',true);
                  $scope.imageSrc = result;
                }else{
                  $scope.postform.plusePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.postform.plusePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
    $timeout(function() {
      $scope.lodinghide=true;
    }, 2000);
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  //reset validation on Image
  $scope.resetImg = function (){
     if($scope.postform.plusePic.$invalid){
              $scope.postform.plusePic.$setValidity('minsizeval',true);
              $scope.postform.plusePic.$setValidity('minDimension',true);
              $scope.postform.plusePic.$setValidity('ratioval',true);
              $scope.imageSrc = "";
       }
  };
  //before deleting post
  $scope.delPost =function(p){
    $scope.currDelPost=p;
    $scope.deldata={};
  };
  // delete post api call
  $scope.delPostform= function(){
    $('#loading').show();
     $http({method:'POST',
        url:YaraBaseUrl.url+'/post_edit/',
        data:{
          opp : 'delete',
          post_code:$scope.currDelPost.post_code
        }
      }).then(function success(response){
        $scope.deldata=response.data;
          if($scope.deldata.result==0){
              $scope.deldata.error=$scope.deldata.message;
          }else if($scope.deldata.result==1) {
              $('#pulse-delete').modal('hide');
              $scope.getPulse();
          }else{
              $scope.deldata.result=0;
              $scope.deldata.error=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
      },function error(response){
          //console.log(response);
          $scope.deldata.result=0;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.deldata.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.deldata.error=GetDataService.errorMsg[1];
                  }          
          }else
            $scope.deldata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
        });
  };
  // looking the changes in modal text
  $scope.$watch('posttxt', function(newval,oldval){
    if (newval!=undefined && newval.length>50) {
      $scope.disableBtn = false;
      $scope.minLength = 50;
      //console.log($scope.disableBtn,$scope.minLength);
    }
    else{
        if($scope.isImageUploaded==false){ 
          $scope.disableBtn = true;
          $scope.minLength = 50;
       } 
    }
  },true);
  // While removing uploaded image
  $scope.removeImg = function(){
      $scope.disableBtn = true;
      $scope.minLength = 50;
      $scope.isImageUploaded = false;
  }
  // adding post api call
  $scope.addpost=function(form){
    $('#loading').show();
    var fd =new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    fd.append('text',$scope.posttxt);
    angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
    });
    var len=$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('image','');
    }
    $http({method:'POST',
      url:YaraBaseUrl.url+'/post/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      $scope.data=response.data;
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
        }else {
            $scope.imageSrc = "";
            $scope.posttxt="";
            $scope.submitted=false;
            angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
            });
            $('#myModal01').modal('hide');
            $scope.getPulse();
        }
        $('#loading').hide();
    },function error(response){
        //console.log(response);
        $scope.errorstatus=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.errormsg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.errormsg=GetDataService.errorMsg[1];
              }          
        }else
          $scope.errormsg=GetDataService.errorMsg[1];
          $('#loading').hide();
      });
  };
  $scope.resetPluse =function(){
      $scope.imageSrc = "";
      $scope.posttxt="";
      $scope.submitted=false;
      $scope.errorstatus=false;
      $scope.disableBtn = true;
       $scope.minLength = 50;
       $scope.isImageUploaded = false;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ShowcasePulse Controller
app.controller('ShowcasePulseController',['$scope','YaraBaseUrl','fileReader','$http','$location','GetDataService','$filter','APPService','$rootScope','$timeout',function($scope,YaraBaseUrl,fileReader,$http,$location,GetDataService,$filter,APPService,$rootScope,$timeout){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
 $scope.disableBtn = true;
 $scope.minLength = 50;
 $scope.isImageUploaded = false;
  // getting event details from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/showcase-dashboard";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - App Pulse';
  $scope.service=APPService;
  $scope.UsedPin=0;
  $scope.viewDaysPost = '';
  //time offset 
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  $scope.viewPost = function(dayPulseInfo){
    // console.log(dayPulseInfo);
    $scope.selectedDayid = dayPulseInfo.day_id;
    $scope.viewDaysPost =  dayPulseInfo.day_id;
    $scope.dayName = dayPulseInfo.day_name;
    $scope.pulseDate = dayPulseInfo.start_time;
    $scope.selectedDayinfo = dayPulseInfo;
  };
  //fetching pulse data
  var usertype=localStorage.getItem('user_type');
  $scope.getPulse=function(){
   $('#loading').show();   
   GetDataService.getPulse($scope.currentval.event_code).then(function(res){
      if(res.result==1){
          $scope.showcasePulsedata=res;
          if(res.showcase_pin_info!=null){
            $scope.currentDayId = res.showcase_pin_info.current_day_post_details.day_id;
            $scope.viewPost(res.showcase_pin_info.current_day_post_details);
          }
          // $scope.UsedPin=res.post_count;
          // $scope.pulseAct = res.event_activation_time;
          // $scope.pulseAppData=res.posts;
          $scope.userOffset = res.uo;
          $('#loading').hide();
          $('#container').fadeIn();
       }
   });
  };

  // check is dasboard pulse is active
  // $scope.isAvaliable =function(){
  //   // if(new Date()<$scope.setOffset($scope.currentval.start_date,$scope.currentval.eo))
  //   //   return false;
  //   // else
  //     return false;
  // };
  // tab switch based on Active
  // if(!$scope.isAvaliable())
  //   $scope.currtTab='App';
  // else
  //   $scope.currtTab='Dashboard';
  // check pulse active 
  // $scope.isActive = function(){
  //   var d = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  //   d.setDate(d.getDate()-7);
  //   if(new Date()<d)
  //     return false;
  //   else
  //     return true;
  // };
  // $scope.isActive();
  $scope.getPulse();
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
      $scope.imageSrc = imageData;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop is cancel
  $scope.resetCropImg =function(){
      $scope.imageSrc = "";
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
      $('.image-editor').cropit('imageSrc', '');
  };
  /* image Upload */
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.plusePic.allowedExtensions(['png', 'jpg', 'jpeg']);    
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    //$('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      $scope.disableBtn = false;
      $scope.minLength = 0;
       $scope.isImageUploaded = true;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.postform.plusePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.postform.plusePic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.postform.plusePic.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                   $scope.imageSrc = result;
                 }else{
                  $('.image-editor').cropit({
                    exportZoom: 1.25,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.postform.plusePic.$setValidity('ratioval',true);
                  $scope.imageSrc = result;
                }else{
                  $scope.postform.plusePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.postform.plusePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });

    }
    $timeout(function() {
      $scope.lodinghide=true;
    }, 2000);
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  //reset validation on Image
  $scope.resetImg = function (){
     if($scope.postform.plusePic.$invalid){
              $scope.postform.plusePic.$setValidity('minsizeval',true);
              $scope.postform.plusePic.$setValidity('minDimension',true);
              $scope.postform.plusePic.$setValidity('ratioval',true);
              $scope.imageSrc = "";
       }
  };
  //before deleting post
  $scope.delPost =function(p){
    $scope.currDelPost=p;
    $scope.deldata={};
  };
  // delete post api call
  $scope.delPostform= function(){
    $('#loading').show();
     $http({method:'POST',
        url:YaraBaseUrl.url+'/post_edit/',
        data:{
          opp : 'delete',
          post_code:$scope.currDelPost.post_code
        }
      }).then(function success(response){
        $scope.deldata=response.data;
          if($scope.deldata.result==0){
              $scope.deldata.error=$scope.deldata.message;
          }else if($scope.deldata.result==1) {
              $('#pulse-delete').modal('hide');
              $scope.getPulse();
          }else{
              $scope.deldata.result=0;
              $scope.deldata.error=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
      },function error(response){
          //console.log(response);
          $scope.deldata.result=0;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.deldata.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.deldata.error=GetDataService.errorMsg[1];
                  }          
          }else
            $scope.deldata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
        });
  };
  // looking the changes in modal text
  $scope.$watch('posttxt', function(newval,oldval){
    if (newval!=undefined && newval.length>50) {
      $scope.disableBtn = false;
      $scope.minLength = 50;
      //console.log($scope.disableBtn,$scope.minLength);
    }
    else{
        if($scope.isImageUploaded==false){ 
          $scope.disableBtn = true;
          $scope.minLength = 50;
       } 
    }
  },true);
  // While removing uploaded image
  $scope.removeImg = function(){
      $scope.disableBtn = true;
      $scope.minLength = 50;
      $scope.isImageUploaded = false;
  }
  // adding post api call
  $scope.addpost=function(form){
    $('#loading').show();
    var fd =new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    fd.append('text',$scope.posttxt);
    fd.append('day',$scope.showcasePulsedata.showcase_pin_info.current_day_post_details.day_id);
    angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
    });
    var len=$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('image','');
    }
    $http({method:'POST',
      url:YaraBaseUrl.url+'/post/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      $scope.data=response.data;
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
        }else {
            $scope.imageSrc = "";
            $scope.posttxt="";
            $scope.submitted=false;
            angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
            });
            $('#myModal01').modal('hide');
            $scope.getPulse();
        }
        $('#loading').hide();
    },function error(response){
        //console.log(response);
        $scope.errorstatus=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.errormsg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.errormsg=GetDataService.errorMsg[1];
              }          
        }else
          $scope.errormsg=GetDataService.errorMsg[1];
          $('#loading').hide();
      });
  };
  $scope.resetPluse =function(){
      $scope.imageSrc = "";
      $scope.posttxt="";
      $scope.submitted=false;
      $scope.errorstatus=false;
      $scope.disableBtn = true;
      $scope.minLength = 50;
      $scope.isImageUploaded = false;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
      $('#myModal01').modal('show');
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Activities Controller
app.controller('ActivitieseController',['$scope','YaraBaseUrl','fileReader','$http','$location','GetDataService','$filter','APPService','$rootScope',function($scope,YaraBaseUrl,fileReader,$http,$location,GetDataService,$filter,APPService,$rootScope){
 $scope.disableBtn = true;
 $scope.minLength = 50;
 $scope.isImageUploaded = false;
  // getting event details from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.is_time_format_24 = localStorage.getItem('is_time_format_24');
  document.title='YARA - '+$scope.currentval.short_name+' - App Pulse';
  $scope.service=APPService;
  $scope.UsedPin=0;
  //time offset 
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  //fetching pulse data
  var usertype=localStorage.getItem('user_type');
  $scope.getPulse=function(){
    $('#loading').show();
     $scope.pulsedata=[];
     if (usertype==null) {
      console.log(usertype);
      GetDataService.getShowCaseActivity($scope.currentval.event_code).then(function(res1){
          if(res1.result==1){
            $scope.pulsedata=res1.showcase_activities;
            $scope.userOffset = res1.uo
            console.log($scope.pulsedata);
            $('#loading').hide();
            $('#container').fadeIn();
         /*   angular.forEach($filter('filter')(res1.showcase_activities,{role:'Collaborator'}),function(p){
                p.created_at =p.activity_time;
               $scope.pulsedata.push(p);
            });*/       
          }else{
            $('#loading').hide();
           // //console.log($scope.pulsedata);
          }
        });
     };
     GetDataService.getPulse($scope.currentval.event_code).then(function(res){
          $scope.UsedPin=res.organizer_post_count;
          $scope.pulseAct = res.event_activation_time;
          $scope.pulseAppData=res.posts;
         $scope.userOffset = res.uo;
     });
  };
  // check is dasboard pulse is active
  $scope.isAvaliable =function(){
    if(new Date()<$scope.setOffset($scope.currentval.start_date,$scope.currentval.eo))
      return false;
    else
      return true;
  };
  // tab switch based on Active
  if(!$scope.isAvaliable())
    $scope.currtTab='App';
  else
    $scope.currtTab='Dashboard';
  // check pulse active 
  $scope.isActive = function(){
    var d = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    d.setDate(d.getDate()-7);
    if(new Date()<d)
      return false;
    else
      return true;
  };
  $scope.isActive();
  $scope.getPulse();
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
      $scope.imageSrc = imageData;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop is cancel
  $scope.resetCropImg =function(){
      $scope.imageSrc = "";
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
      $('.image-editor').cropit('imageSrc', '');
  };
  /* image Upload */
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.plusePic.allowedExtensions(['png', 'jpg', 'jpeg']);    
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    //$('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len>0 ){
      $scope.disableBtn = false;
      $scope.minLength = 0;
       $scope.isImageUploaded = true;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.postform.plusePic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.postform.plusePic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.postform.plusePic.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                   $scope.imageSrc = result;
                 }else{
                  $('.image-editor').cropit({
                    exportZoom: 1.25,
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.postform.plusePic.$setValidity('ratioval',true);
                  $scope.imageSrc = result;
                }else{
                  $scope.postform.plusePic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.postform.plusePic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
        });
        }
        }
      });
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  //reset validation on Image
  $scope.resetImg = function (){
     if($scope.postform.plusePic.$invalid){
              $scope.postform.plusePic.$setValidity('minsizeval',true);
              $scope.postform.plusePic.$setValidity('minDimension',true);
              $scope.postform.plusePic.$setValidity('ratioval',true);
              $scope.imageSrc = "";
       }
  };
  //before deleting post
  $scope.delPost =function(p){
    $scope.currDelPost=p;
    $scope.deldata={};
  };
  // delete post api call
  $scope.delPostform= function(){
    $('#loading').show();
     $http({method:'POST',
        url:YaraBaseUrl.url+'/post_edit/',
        data:{
          opp : 'delete',
          post_code:$scope.currDelPost.post_code
        }
      }).then(function success(response){
        $scope.deldata=response.data;
          if($scope.deldata.result==0){
              $scope.deldata.error=$scope.deldata.message;
          }else if($scope.deldata.result==1) {
              $('#pulse-delete').modal('hide');
              $scope.getPulse();
          }else{
              $scope.deldata.result=0;
              $scope.deldata.error=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
      },function error(response){
          $scope.deldata.result=0;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.deldata.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.deldata.error=GetDataService.errorMsg[1];
                  }          
          }else
            $scope.deldata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
        });
  };
  // looking the changes in modal text
  $scope.$watch('posttxt', function(newval,oldval){
    if (newval!=undefined && newval.length>50) {
      $scope.disableBtn = false;
      $scope.minLength = 50;
      //console.log($scope.disableBtn,$scope.minLength);
    }
    else{
        if($scope.isImageUploaded==false){ 
          $scope.disableBtn = true;
          $scope.minLength = 50;
       } 
    }
  },true);
  // While removing uploaded image
  $scope.removeImg = function(){
      $scope.disableBtn = true;
      $scope.minLength = 50;
      $scope.isImageUploaded = false;
  }
  // adding post api call
  $scope.addpost=function(form){
    $('#loading').show();
    var fd =new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    fd.append('text',$scope.posttxt);
    angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
    });
    var len=$scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('image','');
    }
    $http({method:'POST',
      url:YaraBaseUrl.url+'/post/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      $scope.data=response.data;
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
        }else {
            $scope.imageSrc = "";
            $scope.posttxt="";
            $scope.submitted=false;
            angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
              model.setType(4);
            });
            $('#myModal01').modal('hide');
            $scope.getPulse();
        }
        $('#loading').hide();
    },function error(response){
        //console.log(response);
        $scope.errorstatus=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.errormsg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.errormsg=GetDataService.errorMsg[1];
              }          
        }else
          $scope.errormsg=GetDataService.errorMsg[1];
          $('#loading').hide();
      });
  };
  $scope.resetPluse =function(){
      $scope.imageSrc = "";
      $scope.posttxt="";
      $scope.submitted=false;
      $scope.errorstatus=false;
      $scope.disableBtn = true;
       $scope.minLength = 50;
       $scope.isImageUploaded = false;
      angular.forEach($scope.plusePic.getFiles($scope.plusePic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// store Controller 
app.controller('StoreController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','$document','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,$document,$rootScope){
  $scope.setTitle =function(p){
    document.title='YARA - '+p;
  }
  // only admin can access this page
  if(GetDataService.getPrivilege(13)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
   $scope.adspaceCount='';
  $scope.ecode=parseInt(localStorage.getItem('ecode'));
  $scope.dcode=parseInt(localStorage.getItem('dcode'));   
  console.log($scope.dcode);
  if (!isNaN($scope.ecode) && !isNaN( $scope.dcode)) {
    GetDataService.getAvilabileslots({event_code:$scope.ecode,day_id:$scope.dcode}).then(function(res){
      console.log(res);
      if(res.result==1){
        $scope.maxSlotstoBuy=res.slot_details.can_buy;
      }
   }); 
     // fetching events list
    $scope.getEventsData = function(){
    GetDataService.getEvent($scope.ecode).then(function(res){
        if(res.result==1){
          $scope.eventsdata=res.events;
          $scope.currentval=$scope.eventsdata[0];
          for (var i = 0; i < $scope.currentval.days.length; i++) {
            if ($scope.currentval.days[i].dayID==$scope.dcode) {
              $scope.selectDay=$scope.currentval.days[i];
              $scope.evofset=$scope.currentval.eo;
              console.log($scope.selectDay);
              break;
            }
          }
         }else{
          $scope.errorstatus=true;
        }
      });
    };
    $scope.getEventsData();
  }
  GetDataService.getEvents().then(function(res){
        if(res.result==1){
            $scope.allevent=res.events;
            $scope.eventOffset = $scope.allevent.eo;
            console.log($scope.allevent);
            $('#loading').hide();
            $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);};  
             $scope.checkdate=function (st, ed, off) {
              return GetDataService.startend(st, ed, off);
            }
        }else{
            $scope.errorstatus=true;
            /*if(res.message=="Anonymous user")
              window.location="sign-in";*/
        }
  });
  $scope.AdPacks=[
   { "price":5 , "showtick":false }, 
   { "price":10 , "showtick":false  }, 
   { "price":15 , "showtick":false  }, 
   { "price":20 , "showtick":false } 
   ];
  //console.log($scope.AdPacks);
  $scope.currentdate=new Date();
  $scope.checkdate=function(d){
    if(!d.is_active)
      return false;
    var date=new Date(d.end_date);
    var ds;
    var d1=$filter('date')(date,'yyyy-MM-dd');
    angular.forEach(d.days,function(d,key){
      var d2=new Date(key);
      d2=$filter('date')(d2,'yyyy-MM-dd');
      if(d1==d2)
        ds=d.endtime;
    });
    if(ds==undefined || ds==null || ds=='')
      return false;
    var endtime = ds.split(' ');
    var time =endtime[0].split(':');
    if(endtime[1]=='PM'){
      time[0]=Number(time[0])+12;
    }
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    if( date>=$scope.currentdate){
      return true;
    }else{
      return false;
    }
  };
  // get adspace price details
  $scope.getPriceDetails = function(countval){
      $scope.ShowPrice=false;
      $('#loading').show();
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add_price/',
        data:{
          count:countval
        }
      }).then(function success(response){
        $scope.data=response.data;
        //console.log($scope.data);
        if($scope.data.result==1){
          $scope.ShowPrice=true;
          $scope.adPrice=$scope.data.price;
          $scope.adCurr=$scope.data.symbol;
          // $scope.adTax=$scope.data.tax;
          $scope.adTax=0;
          $scope.adTotal= $scope.adPrice + $scope.adTax ;
        }else{
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
        }
        $('#loading').hide();
      },function error(response){
        $scope.data={};
        //console.log(response);
        $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }          
        }else
          $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
      });
  };
  $scope.SelEvent='';
  $scope.dates=[];
  $scope.service=APPService;
  $scope.SelDate='';
  window.onunload = function(){};
  window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};
  // when event is selected
  $scope.selectEvent = function(e){
    $scope.SelEvent=e.event_code;
    // console.log(e)
    localStorage.setItem('ecode',e.event_code);
    // var st_date=$filter('date')(e.start_date,'yyyy-MM-dd');
    // var ed_date=$filter('date')(e.end_date,'yyyy-MM-dd');
    // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
    // $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
    // $scope.SelDate='';
    // if($scope.dates.length==1){
    //   $scope.selectDate($scope.dates[0]);
    // }
    $scope.evofset=e.eo;
    $scope.dates=e.days;
    if (e.days.length==1) {
      $scope.SelDate=e.days[0].startTime;
      localStorage.setItem('dcode',e.days[0].dayID);
    }
  };
  // when adspace date is selected
  $scope.selectDate = function(d){
    $scope.SelDate=d.startTime;
    localStorage.setItem('dcode',d.dayID);
  };
  $scope.subtitle='';
  $scope.changeSubtype=function(c,index){
    $scope.adspaceCount = c;
    $('#countId').val(c);
    $('#dayId').val($scope.dcode);
    $scope.AdPacks=[
     { "price":5 , "showtick":false }, 
     { "price":10 , "showtick":false  }, 
     { "price":15 , "showtick":false  }, 
     { "price":20 , "showtick":false }    
    ];
    $scope.AdPacks[index].showtick=true;
   $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".subtitle").show();
    if(c==''){
      $scope.subtitle=c;
      $(".subtitle").text('Select Pack'); 
    }else{
      $scope.getPriceDetails(c);
      $scope.subtitle=c;
      $(".subtitle").text(c); 
    } 
  };
  $(document).on('click','.subtype_dropdown .primary_nav_wrap ul li',function(){
      $(".subtype_dropdown img").removeClass();
      $(".subtype_dropdown img").addClass('caret02'); 
      $( ".subtype_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".subtype_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".subtype_dropdown img").removeClass();
         $(".subtype_dropdown img").addClass('caret01'); 
        }   
  });
  // redirect to checkout page
  $scope.PayAdSpace =function(){
    $scope.buyAdSpace();
    var s={
      event_code:$scope.SelEvent,
      number_of_adds:$scope.subtitle,
      day:$scope.SelDate
    };
    sessionStorage.setItem('AdDetails',angular.toJson(s));
    var t={};
    t.val=$scope.adPrice;
    t.currency=$scope.adCurr;
    sessionStorage.setItem('priceData',angular.toJson(t));
    window.location="/cc-checkout"; 
  }
  //purchase adspace api need to call after payment is done
  $scope.buyAdSpace = function(){
    $scope.errormsg=false;
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/buy_add/',
        data:{
          event_code:$scope.eventcode,
          number_of_adds:$scope.subtitle,
          purchased_for:$scope.seldayInfo.dayID
        }
      }).then(function success(response){
        $scope.data=response.data;
        //console.log($scope.data);
        if($scope.data.result==null || $scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
            //console.log($scope.data);
        }else if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
        }else{  
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
          $scope.SelEvent='' ;
          $scope.SelDate = '' ;
          $scope.subtitle='' ;
          $scope.submitted=false;
          $scope.dates=[];
          $(".subtitle").text('Select Pack');
        }
       
      },function error(response){
        $scope.data={};
        //console.log(response);
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        
      });
  };
  //validate and scroll to error
  $scope.errorScroll = function(){
    if($scope.SelEvent == '')
      APPService.scrollJquery('Eventerror');
    else if( $scope.SelDate == '')
      APPService.scrollJquery('daterror');
    else
      window.location="/store-adspace-buy"; 
  };
  //validate and scroll to error
  $scope.errorScrollBuy = function(){
    if($scope.SelEvent == '')
      APPService.scrollJquery('Eventerror');
    else if( $scope.SelDate == '')
      APPService.scrollJquery('daterror');
    else
      window.location="/checkout"; 
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Adspace Controller
app.controller('EventAdSpaceController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$document','$timeout','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$document,$timeout,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  //getting event data from local
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }
  if (window.location.pathname=="/event/create-adspace") {
    var getredirection =localStorage.getItem('adspaceRedirection')
    if (getredirection=='yes') {
      window.location = "/event";
      localStorage.removeItem('adspaceRedirection');
    }    
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - Adspace';
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  $scope.currentLocalTime = function(){
    // $('#loading').show();
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
      if (res.result == 1) {
         // $('#loading').hide();
         // $('#container').fadeIn();
         $scope.timeNow= $scope.setOffset(res.local_time_now,0);
         $scope.timeNowTmzone = res.local_time_now;
         console.log(res);
         $scope.localTimeNow = new Date();
         // get time diff
         $scope.lesstime($scope.setOffset($scope.currentval.days[0].endTime, $scope.currentval.eo));
         // end time diff
      }
    });
  };
  $scope.currentLocalTime();
  $scope.lesstime = function(end) {
      var currentdate = new Date($scope.timeNow);
      var newdate = end;
      var diff = Math.abs(currentdate - newdate);
      var diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
      $scope.threetimediff=false;
      if (diffDays == 0) {
          var timediff = newdate.getTime() - currentdate.getTime();
          var hour = Math.floor((timediff % 86400000) / 3600000);
          var min = Math.round(((timediff % 86400000) % 3600000) / 60000);
          if (hour <= 1) {
              if (min<=30) {
                $scope.threetimediff = true;
              }              
          }
      }
  };
  $scope.isactiveDecipher = function(){
      $scope.showDecipher = false;
      var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
      diff /= 60;  
      var eventTime = $scope.setOffset($scope.timeNowTmzone,Math.abs(Math.round(diff)));
      if(eventTime>$scope.setOffset($scope.currentval.end_date,($scope.currentval.eo+360))){
        $scope.showDecipher = true;
      }      
  };    
  $scope.isSlotAvilabile = function(time){
      var slotAvilabile = true;
      var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
      diff /= 60;  
      var eventTime = $scope.setOffset($scope.timeNowTmzone,Math.abs(Math.round(diff)));
      if(eventTime>=$scope.setOffset(time,$scope.currentval.eo)){
        slotAvilabile = false;
      }
      return slotAvilabile;
  };
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  if(window.location.pathname!="/event/create-adspace"){
    if(localStorage.getItem('dcode')!=undefined){
       var dayId = localStorage.getItem('dcode');
       for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
            if($scope.eventDaysInfo[i].dayID==Number(dayId)){
              $scope.seltab=$scope.eventDaysInfo[i].dayID;
              $scope.seldayInfo=$scope.eventDaysInfo[i];
              $scope.expday=$scope.eventDaysInfo[i].isDayActive;
              break;
            }
        };
    }
    else{
      $scope.seltab=$scope.eventDaysInfo[0].dayID;
      $scope.expday=$scope.eventDaysInfo[0].isDayActive;
      $scope.seldayInfo=$scope.eventDaysInfo[0];
    }
  }
  if (GetDataService.getPrivilege()=="Admin") {
     $scope.admincheck=true;
   }
   else{
     $scope.admincheck=false;
   }
  $scope.selectedDay='';
  $scope.subtitle='';
  $scope.datetitle='';
  $scope.listBtnTitle=[];
  //fetching add button title
  GetDataService.getAdBtnTitle().then(function(res){
    $scope.listBtnTitle = res.objects;
    $scope.btnLinkTitle=$scope.listBtnTitle[0].tittle;
  });
  //redirect to store 
  $scope.ForwordStore =function(){
    localStorage.setItem('ecode',$scope.currentval.event_code);
    localStorage.setItem('dcode',$scope.seldayInfo.dayID);
    sessionStorage.setItem('redirectFromAd',angular.toJson($scope.currentval));
    window.location="/store-adspace-buy";
  };
  $scope.getSlot = function(d){
      $('#loading').show();
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
              $scope.timeNow= $scope.setOffset(res.local_time_now,0);
              $scope.timeNowTmzone = res.local_time_now;
              $scope.localTimeNow = new Date();
              GetDataService.getAdspace({event_code:$scope.currentval.event_code,day_id:d}).then(function(res){
                if(res.result==1){
                    $scope.reachSlotlimit=false;
                    $scope.timeSlotData=res.ad_slots;
                    $scope.eventOffset = res.eo;
                    $scope.maxSlots = res.max_slots;
                    $scope.slotInterval = res.slot_interval_in_minutes;
                    $scope.adspaceSlots = res.add_purchased_count;
                    $scope.allocatedSlotsCount = res.current_add_count;
                    // console.log(res);
                    $scope.isactiveDecipher();
                    $scope.deliverdAds = [];
                    $scope.nonDeliverdAds = [];
                    $scope.adSlots = $scope.timeSlotData;
                    angular.forEach($scope.timeSlotData,function(value,key){
                      if($scope.timeSlotData[key].is_used==true){
                          if($scope.timeSlotData[key].ads.is_pushed){
                              $scope.deliverdAds.push($scope.timeSlotData[key]);
                          }
                          else{
                            $scope.nonDeliverdAds.push($scope.timeSlotData[key]);
                          }
                      }
                    });          
                    if(res.add_purchased_count>0){
                      var reachLimit = res.add_purchased_count-res.current_add_count;  
                      if(reachLimit==0){
                        $scope.reachSlotlimit=true;
                      }
                    }
                    $('#loading').hide();
                    $('#container').fadeIn();
                }
                else{
                    $('#loading').hide();
                    $('#container').fadeIn();
                }
              });
          }
      });     
  };
  if(window.location.pathname=="/event/create-adspace"){
      var dayId = localStorage.getItem('dcode');
      console.log(Number(dayId));
      console.log($scope.eventDaysInfo);
      // $scope.currentLocalTime();
      for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
          if($scope.eventDaysInfo[i].dayID==Number(dayId)){
            $scope.seltab=$scope.eventDaysInfo[i].dayID;
            $scope.seldayInfo=$scope.eventDaysInfo[i];
            $scope.expday=$scope.eventDaysInfo[i].isDayActive;
            break;
          }
      };
      $scope.getSlot(dayId);  
  }
  // when the user trying to purchase new set of ads slots
  // check its reaached limit or not
  $scope.buyAds = function(){
      if($scope.maxSlots!=$scope.allocatedSlotsCount){
          $scope.ForwordStore();
      }
  };
  //getting adspace
  $scope.getAdspace = function(){
    $('#loading').show();
    GetDataService.getAdspace({event_code:$scope.currentval.event_code,day_id:d}).then(function(res){
      if(res.result==1){
          $scope.addsList=res.adds;
           $('#loading').hide();
          $('#container').fadeIn();
        }
    });
  };
  $scope.SelDate ='';
  $scope.subtitle='';
  //select day and fetching time slot
  $scope.selectDate = function(d){
    $scope.SelDate=d;
    $scope.subtitle='';
    $(".subtitle").text('Select Time Slot');
    $scope.getSlot(d);
  };
  // selection tab
  $scope.ADselecttab = function(d,key){
    localStorage.setItem('dcode',d.dayID);
    $scope.seltab=d.dayID;
    $scope.expday=d.isDayActive;
    $scope.seldayInfo=d;
    $scope.getSlot(d.dayID);
    $scope.lesstime(d.endTime);
  };
  $scope.f_Delivery ='all';
  $scope.viewAds = function(val){
      $scope.f_Delivery = val;
      if(val==true){
          $scope.timeSlotData = $scope.deliverdAds
      }
      else if(val==false){
          $scope.timeSlotData = $scope.nonDeliverdAds;
      }else if (val=='all') {
          $scope.timeSlotData = $scope.adSlots;
          console.log($scope.timeSlotData, "fdhty")
      }
  };
  var Addate=sessionStorage.getItem('dcode');
  var Adtime=sessionStorage.getItem('Adtime');
  if(Addate != '' && Addate != undefined && Addate != null){
    $scope.selectedDay=Addate;
    $scope.SelDate=Addate;
    $scope.getSlot(Addate);
    $scope.subtitle=Adtime;
    $(".subtitle").text($scope.subtitle); 
    sessionStorage.setItem('dcode','');
    sessionStorage.setItem('Adtime','');
  }else{
    var returnday=localStorage.getItem('dcode');
    if (window.location.pathname == "/event/adspace" && returnday!=null) {
        $scope.seltab=returnday;
        $scope.seldayid=returnday;
        for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
          if ($scope.eventDaysInfo[i].dayID==returnday) {
            $scope.expday=$scope.eventDaysInfo[i].isDayActive;
            $scope.movebutton=i;
          }
        }         
        $scope.getSlot(returnday);
        $timeout(function() {
          $scope.ddbt=$scope.movebutton+1
          if ($scope.ddbt>3) {
            $scope.forl=$scope.ddbt-3;
            for (var i = 0; i < $scope.forl; i++) {
              $(".slider").diyslider("move", "forth"); 
              $scope.dbutton--;
            }
          }
        }, 100);
    }else{
        $scope.getSlot($scope.seltab);
    }
  }
  //create time slot , d is day and time is slot time
  $scope.createSlot = function (d, time, c) {
    localStorage.setItem('dcode',d);
    localStorage.setItem('Adtime',time);
    localStorage.removeItem('adspaceRedirection');
    if(c!=undefined){
        localStorage.setItem('slotInfo',JSON.stringify(c));
    }
    else{
      localStorage.removeItem('slotInfo');
    }
    window.location="create-adspace";
  };
  $scope.revokeAdObj='';
  //before revoking slot , t is ad to revoke
  $scope.revokeAd = function (t) {
   $scope.revokeAdObj=t;
  };
  // revoke adspace api call
  $scope.DelAdspace =function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add_edit/',
        data:{
          opp : 'delete',
          add_code:$scope.revokeAdObj.ads.add_code,
          day_id:$scope.seltab,
          old_slot:$scope.revokeAdObj.slot_no,
          new_slot:''
        },
      }).then(function success(response){
        $scope.data2=response.data;
        if($scope.data2.result==null || $scope.data2.result== undefined){
            $scope.errormsg2=true;
            $scope.data2.error=GetDataService.errorMsg[1];
        }else if($scope.data2.result==0){
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
        }else{  
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
          $scope.getSlot($scope.seltab);
          $('#adspace-delete').modal('hide');
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
        $scope.data2={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data2.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data2.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data2.error=GetDataService.errorMsg[1];
        $('#adspace-delete').modal('hide');
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };
  $scope.editAdObj='';
  //before editing adspace timeslot , t is current adspace to edit
  $scope.editAd = function (t) {
    $scope.currentLocalTime();
    $scope.editAdObj=t;
  };
  // api to edit adspace
  $scope.EditAdspace =function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add_edit/',
        data:{
          opp : 'edit',
          add_code:$scope.editAdObj.ads.add_code,
          day_id:$scope.seltab,
          old_slot:$scope.editAdObj.slot_no,
          new_slot:$scope.subtitle.slot_no
        },
      }).then(function success(response){
        $scope.data2=response.data;
        if($scope.data2.result==null || $scope.data2.result== undefined){
            $scope.errormsg2=true;
            $scope.data2.error=GetDataService.errorMsg[1];
        }else if($scope.data2.result==0){
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
        }else{  
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
          $scope.getSlot($scope.seltab);
          $('#adspace-change').modal('hide');
        }
       $('#loading').hide();
       $('#container').fadeIn();
      },function error(response){
        $scope.data2={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data2.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data2.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data2.error=GetDataService.errorMsg[1];
         $('#adspace-delete').modal('hide');
         $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  $scope.urlchange = function() {
      if (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.weburl)) {
          $scope.urlrequired =false;
      } else{
          $scope.urlrequired = true;
      }
  };
  //api call to create adspace
  $scope.CreateAD =function (){
     $scope.errormsg=false;
     $('#loading').show();
     var fd = new FormData();
      fd.append('event_code',$scope.currentval.event_code);
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
      });
      var len=$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
      if(len==0){
        fd.append('image','');
      }
      fd.append('tittle',$scope.title);
      fd.append('url',$scope.weburl); 
      fd.append('day',localStorage.getItem('dcode'));
      if($scope.custom==true){
        fd.append('display_time',moment($scope.setOffset($scope.subtitle.display_time,$scope.eventOffset)).format("YYYY-MM-DD HH:mm"));
        fd.append('slot_no',$scope.subtitle.slot_no);
      }
      else{
        fd.append('display_time','');
        fd.append('slot_no',0);
      }
      fd.append('button_tittle',$scope.btnLinkTitle);  
      $scope.data={};
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==null || $scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
        }else if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
          $('#loading').hide();
          $('#container').fadeIn();
        }else if($scope.data.result==1){  
           $scope.errormsg=true;
           // $scope.data.error=$scope.data.message;
            localStorage.setItem("adspaceRedirection", 'yes')
            $scope.submitted=false;
            $scope.title='';
            $scope.weburl='';
            $scope.SelDate='';
            $scope.subtitle='';
            $(".subtitle").text('Select Time Slot');
            angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
               model.setType(4);
          });
            $scope.imageSrc ='';
            window.location="/event/adspace";
        }
      },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();        
      });
  }
  //image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.adPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  // change date
  $scope.changeSubtype=function(c){
   $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".subtitle").show();
    if(c==''){
      $scope.subtitle=c;
      $(".subtitle").text('Select Type'); 
    }else{
      $scope.subtitle=c;
      console.log(c);
      var seleDate='';
      if ($scope.is_time_format_24==true) {
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'HH:mm');
      }else{
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'hh:mm a');
      }
      $(".subtitle").text(seleDate);
    } 
  };
  if (localStorage.getItem('slotInfo')!= undefined && window.location.pathname == "/event/create-adspace" ) {
      $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
     $(".subtitle").show();
     var c = angular.fromJson(localStorage.getItem('slotInfo'));
     $scope.subtitle=c;
      var seleDate;
      if ($scope.is_time_format_24==true) {
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'HH:mm');
      }else{
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'hh:mm a');
      }
      // $(".subtitle").text(seleDate);
      $timeout(function() {
              $(".subtitle").text(seleDate);
          }, 100);
  }
  $(document).on('click','.subtype_dropdown .primary_nav_wrap ul li',function(){
      $(".subtype_dropdown img").removeClass();
      $(".subtype_dropdown img").addClass('caret02'); 
      $( ".subtype_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".subtype_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".subtype_dropdown img").removeClass();
         $(".subtype_dropdown img").addClass('caret01'); 
      }   
  });
  // change btn dropdown
  $scope.changeBtnLink=function(c){
   $( ".btnLink_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
    //  $(".subtitle").show();
    if(c==''){
      $scope.btnLinkTitle=c;
      $(".subtitle").text('Select Title'); 
    }else{
      $scope.btnLinkTitle=c;
    } 
  };
  $(document).on('click','.btnLink_dropdown .primary_nav_wrap ul li',function(){
      $(".btnLink_dropdown img").removeClass();
      $(".btnLink_dropdown img").addClass('caret02'); 
      $( ".btnLink_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".btnLink_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length ){
           $( ".btnLink_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".btnLink_dropdown img").removeClass();
         $(".btnLink_dropdown img").addClass('caret01'); 
      }   
  });
  // change date where c is date
  $scope.changeDate=function(c){
   $(".date_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
    $(".datetitle").show();
    if(c==''){
      $scope.datetitle=c;
      $(".datetitle").text('Select Day'); 
    }else{
      $scope.getTimeSlot(c);
      $scope.datetitle=c;
      $(".datetitle").text($scope.days[c].day_name); 
      $scope.subtitle='';
      $(".subtitle").text('Select Time Slot'); 
    } 
  };
  $(document).on('click','.date_dropdown .primary_nav_wrap ul li',function(){
      $(".date_dropdown img").removeClass();
      $(".date_dropdown img").addClass('caret02'); 
      $( ".date_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".date_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".datetitle").css('display')!='none'){
           $( ".date_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".date_dropdown img").removeClass();
         $(".date_dropdown img").addClass('caret01'); 
        }   
  });
  // validate adspace form and scroll to error
  $scope.errorscroll = function(){
    $scope.createForm.adPic.$setValidity('minsizeval',true);
    $scope.createForm.adPic.$setValidity('minDimension',true);
    $scope.createForm.adPic.$setValidity('ratioval',true);
    if($scope.title != undefined && $scope.title != '' && $scope.title != null && !$scope.imageSrc){
      $timeout(function(){
        APPService.scrollJquery('errorimg');
      },100);
    }
    // else if($scope.title != undefined && $scope.title != '' && $scope.title != null && $scope.weburl != undefined && $scope.weburl != '' && $scope.weburl != null && $scope.imageSrc && $scope.SelDate == ''){
    //   $timeout(function(){
    //     APPService.scrollJquery('dateError_id');
    //   },100);
    // }
  };
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='adPic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset when crop is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='adPic'){
       $scope.imageSrc="";
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // img upload
  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('logo image change');
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.createForm.adPic.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc="";
          }else{
            $scope.createForm.adPic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.createForm.adPic.$setValidity('minDimension',true);
                 if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='adPic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
              }else{
                $scope.createForm.adPic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
           
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Sharebox Controller
app.controller('EventShareboxController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','$rootScope','$timeout','$anchorScroll',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,$rootScope,$timeout,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  //getting event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - FileBank';
   //time offset 
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.currentLocalTime = function(){
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
      if (res.result == 1) {
         $scope.timeNow = res.local_time_now;
         $scope.localTimeNow = new Date();
      }
    });
  };
  // $scope.currentLocalTime();
  $scope.checkTimeNow = function(endTime){
    var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
    diff /= 60;  
    var eventTime = $scope.setOffset($scope.timeNow,Math.abs(Math.round(diff)));
    if(eventTime>$scope.setOffset(endTime,$scope.currentval.eo)){
      return false;
    }
    else{
        return true;
    }
  };
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  console.log($scope.eventDaysInfo);
  $scope.seltab=$scope.eventDaysInfo[0].dayID;
  $scope.expday=$scope.eventDaysInfo[0].isDayActive;
  $scope.dName= $scope.eventDaysInfo[0].dayTitle;
  $scope.dbutton=($scope.eventDaysInfo.length-3);
            $timeout(function(){
              if($(".slider").length>0){
                $(".slider").diyslider({
                    width: "100%", // width of the slider
                    height: "51px", // height of the slider
                     minSlides: 2, // number of slides you want it to display at once
                    loop: false, // disable looping on slides
                    moveSlides: 1,
                });
              }
            },100);
  // set Day Information
  $scope.setDayInfo =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayInfo();
  // select day tab
  $scope.selecttab = function(d){
    $scope.seltab=d.dayID;
    $scope.expday=d.isDayActive;
    $scope.dName=d.dayTitle;
    $scope.alternative=false;
  };
  $scope.totallist="";
  $scope.listallSessions = function(){
      var  param = {
          bs:1,
          event_code:$scope.currentval.event_code
      };
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
             $scope.timeNow = res.local_time_now;
             $scope.localTimeNow = new Date();
                  GetDataService.getallSessions(param).then(function(res){
                      if(res.result==1){
                       $scope.sessionData = res.sessions;
                       $scope.eo = res.eo;
                       $scope.totallist=$scope.sessionData;
                       $scope.attach=[];
                       $scope.notattach=[];
                       for (var i = 0; i < $scope.sessionData.length; i++) {
                          if ($scope.sessionData[i].session_type==true) {
                            if ($scope.sessionData[i].file_bank.session_files.length==0) {
                                $scope.notattach.push($scope.sessionData[i]);
                             }else{
                              $scope.attach.push($scope.sessionData[i]);
                             }
                          }
                       };
                       console.log($scope.attach, $scope.notattach)
                      }
                  });
                  $("#loading").hide();
           }
      });        
  };
  $scope.listallSessions();
  // $scope.maxfile=1;
  // /* file Upload */
  // $scope.$on('$dropletReady', function whenDropletReady() {
  //   $scope.sharefiles.allowedExtensions(['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx']);
  //   $scope.sharefiles.useArray(false);
  // });
  // // $scope.$on('$dropletInvalid', function whenDropletReady() {
  // // });
  // $scope.$on('$dropletFileAdded',function (prov,arg){
  //   var len =$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
  //   if(len>1){
  //     $scope.statusdisable=false;
  //     angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
  //          model.setType(4);
  //     });
  //     $scope.sam=$scope.extmi=false;
  //     $scope.dd=true;
  //    // //console.log($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID));

  //     // angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
  //     //   if(key>=$scope.maxfile){
  //     //     model.setType(1);
  //     //   }else{
  //     //     if(model.file.size > 52428800){
  //     //     //  $scope.signup3Form.sharefiles.$setValidity('minsizeval',false);
  //     //       model.setType(1);
  //     //     }else{
  //     //       //$scope.signup3Form.sharefiles.$setValidity('minsizeval',true);
  //     //     }
  //     //   }
  //     // });
  //   }else {
  //     //   angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
  //     //     if(model.file.size > 100000000){
            
  //     //     }else{
            
  //     //     }        
  //     // });
  //       for (var i = 0; i < $scope.totallist.length; i++) {
  //         if ($scope.uploadcode==$scope.totallist[i].session_code) {
           
  //           angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
  //              if ($scope.totallist[i].uploaded_file_size+model.file.size>100000000) {
  //               $scope.youhave=100000000-$scope.totallist[i].uploaded_file_size;
  //               $scope.sizefile=false;
  //               $scope.statusdisable=$scope.sss=$scope.sam=$scope.extmi=true;
  //              }else{
  //               $scope.sss=$scope.sizefile=true;
  //               $scope.sam=true;
  //               $scope.extmi=$scope.dd=$scope.statusdisable=false;
  //              }
  //           })
  //           for (var j = 0; j < 5; j++) {              
  //             if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[0].file.name == $scope.totallist[i].file_bank.session_files[j].file_name) {
  //               $scope.statusdisable=true;
  //               $scope.sss=false;
  //               $scope.extmi=$scope.sizefile=true;
  //             };
  //           };
  //         };
  //     };
  //   }         
  // });
  // $scope.showdat=function () {
  //   $scope.sam=$scope.extmi;
  // };
  // $scope.closefile=function () {
  //   // var len =$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
  //   $scope.statusdisable=false;
  //   //   if(len==1){
  //   //     $scope.statusdisable1="";
  //   //     $scope.valuses="";
  //   // }else if (len>1) {
  //   //   $scope.valuses="At a time upload one file";  
  //   //   $scope.exesting="";
  //   // };
  // }; 
  // $scope.$on('$dropletError', function () {
  //  //console.log('something Went wrong');
  // });
  // $scope.session=$scope;
  // $scope.session.file=[];
  // // $scope.$on('$dropletFileDeleted', function () {
  // //   $scope.sharefiles.deleteFiles($scope.sharefiles.FILE_TYPES.DELETED) 
  // //  });
  // //upload file , code means session code
  // $scope.uploadFile = function(code){
  //   $scope.uploadcode=code;
  //   if($scope.session.file[code] != undefined)
  //     $scope.maxfile=$scope.session.file[code].length;
  //   else
  //     $scope.maxfile=1;
  // };
  
  /* file Upload */
  $scope.zerofile=true
  $scope.$on('$dropletReady', function whenDropletReady() {
      $scope.sharefiles.allowedExtensions(['xlsx', 'xlsm', 'xlsb', 'xls', 'xml', 'xla', 'xlw', 'pdf', 'doc', 'docx', 'csv', 'txt']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
    // $('#uploadfile').modal('hide');
  });
 $scope.$on('$dropletFileAdded', function(prov, arg) {
     var size = 0;
     $scope.varfile=[];
     $scope.sss = $scope.sizefile=$scope.maxfive= true;
     $scope.statusdisable=false;
     var len = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
     if (len > 0) {
         angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID), function(model, key) {
             size += $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[key].file.size;
             if (model.file.size==0 || key >= $scope.maxfile) {
                if (model.file.size==0) {
                  $scope.zerofile=false;
                }else{
                  $scope.maxfive=false;
                }
                 model.setType(4);
             } else {
                 if (($scope.uploadFilesize.uploaded_file_size + size) > 50000000) {
                     $scope.sizefile = false;
                     $scope.statusdisable=true;
                 } else {
                     $scope.sizefile = true;
                 }  
             }
         });
         if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length>1) {
           for (var i = 0; i < $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length-1; i++) {
             if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length-1].file.name == $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name) {
              $scope.existfilename = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name;
              $scope.sss = false;
              $scope.statusdisable=true;
             }
          }
         }
        
         for (var j = 0; j < $scope.uploadFilesize.file_bank.session_files.length; j++) {
             for (var i = 0; i < $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length; i++) {
                 if ($scope.uploadFilesize.file_bank.session_files[j].file_name == $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name) {
                     $scope.existfilename = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name;
                     $scope.sss = false;
                     $scope.statusdisable=true;
                 }
             }
         }
         console.log($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length, $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID));
         
     }
 });

 $scope.$on('$dropletFileDeleted', function() {
     var size1 = 0;

     $scope.sss = $scope.sizefile=$scope.zerofile=$scope.maxfive = true;
     $scope.statusdisable=false;
     var len = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
     if (len > 0) {
         angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID), function(model, key) {
             size1 += $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[key].file.size;
             if (key >= $scope.maxfile) {
                 model.setType(4);
             } else {
                 if (($scope.uploadFilesize.uploaded_file_size + size1) > 100000000) {
                     $scope.sizefile = false;
                     $scope.statusdisable=true;
                 } else {
                     $scope.sizefile = true;
                 }
             }
         });
         for (var j = 0; j < $scope.uploadFilesize.file_bank.session_files.length; j++) {
             for (var i = 0; i < $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length; i++) {
                 if ($scope.uploadFilesize.file_bank.session_files[j].file_name == $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name) {
                     $scope.existfilename = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name;
                     $scope.sss = false;
                     $scope.statusdisable=true;
                 }
             }
         }
        if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length>1) {
           for (var i = 0; i < $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length-1; i++) {
             if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length-1].file.name == $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name) {
              $scope.existfilename = $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name;
              $scope.sss = false;
              $scope.statusdisable=true;
             }
          }
         }

     }

 });


  $scope.$on('$dropletError', function() {
      // //console.log('something Went wrong');
  });
  $scope.session = $scope;
  $scope.session.file = [];
  $scope.showdat=function () {
    $scope.zerofile=true;
  }
  //upload file , code means session code
  $scope.uploadFile = function(code, uploadFilesize) {
      $scope.uploadcode = code;
      $scope.uploadFilesize=uploadFilesize;
      $scope.maxfile = 5-$scope.uploadFilesize.file_bank.session_files.length;
      $scope.sessionname=uploadFilesize.tittle;
      // if ($scope.session.file[code] != undefined)
      //     $scope.maxfile = 5 - $scope.session.file[code].length;
      // else
      //     $scope.maxfile = 5;
  };

  // adding file to session,files is array of files
  $scope.addFileSession =function(files){
    console.log($scope.filedata)
    var filedata=new FormData();
    $scope.description={};
    if($scope.session.file[$scope.uploadcode] == undefined)
      $scope.session.file[$scope.uploadcode]=[];
     angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
        $scope.session.file[$scope.uploadcode].push(model.file);
        filedata.append(key,model.file);
        // filedata.append(model.file,$scope.filedata[key].discription);
        model.setType(4);
        // var obje={
        //   [model.file.name]:$scope.filedata[key].discription
        // }
        $scope.description[model.file.name]=$scope.filedata[key].discription;
        // $scope.description.push(obje);
      });
        filedata.append('session_code',$scope.uploadcode);
        console.log("lhdfgk",$scope.description);
        filedata.append('description',angular.toJson($scope.description));

        $('#loading').show();
     $http({
          method:'POST',
          url:YaraBaseUrl.url+'/file_upload/',
          data:filedata,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
          }).then(function success (response) {
              $('#loading').hide();
            if(response.data.result==1){
              $anchorScroll();
               // if (response.data.files_existing !=0) {
               //    $scope.exist=false;
               // }else{
                $scope.nextarea=false;
                $scope.listallSessions();
                $scope.filedata=[];
               // }
              }else if(response.data.result==0){
                  $('#uploadfile').modal('hide');
                  $scope.messages=response.data.message;
              }
          },function error(response){
          })
    ////console.log($scope.session.file[$scope.uploadcode].getFiles($scope.session.file[$scope.uploadcode].FILE_TYPES.VALID));
    // $('#uploadfile').modal('hide');
   
    ////console.log($scope.session.file[$scope.uploadcode]);
  };
  $scope.nextstep=function () {
    $anchorScroll();
    if ($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length!==0) {
      $('#uploadfile').modal('hide');
      $scope.nextarea=$scope.exist=true;
    console.log($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length);
    $scope.filedata=[]
    for (var i = 0; i < $scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length; i++) {
        var fulldata={'filevalue':$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID)[i].file.name,'discription':""};
        $scope.filedata.push(fulldata);
      }
    };
    console.log($scope.filedata)
  };
  $scope.cancelmodel = function() {
      $('#uploadfile').modal('hide');
      $scope.dd = false;
      $scope.zerofile=true;
      angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID), function(model, key) {
          model.setType(4);
      });
      $scope.filedata=[];
  };

  //file delete
  $scope.revokepop=function (code, name) {
    $scope.share_box_code=code;
    $scope.fname=name;
  }
  $scope.fdelete=function  (code) {
     $scope.sessioncode=code;
     $http({method:'POST',
        url:YaraBaseUrl.url+'/file_upload_edit/',
        data:{
          share_box_code:$scope.sessioncode,
          opp:'delete'
        }
      }).then(function success (response) {
          if(response.data.result==1){
            $scope.listallSessions();
            }else if(response.data.result==0){
              console.log(response.data.message)
            }
        },function error(response){
          console.log(response);
        })
  };
  //show all datas
  $scope.allsession="gp-black";
  $scope.shaowall=function () {
    $scope.listallSessions();
    $scope.allsession="gp-black";
    $scope.showblack=$scope.attachshowblack="gp-blue";
  };
  //attach file
  $scope.alternative=false;
  $scope.attachfile=function () {
    $scope.sessionData=[] 
    $scope.attachshowblack="gp-black";
    $scope.showblack=$scope.allsession="gp-blue";
    $scope.alternative=true;
    $scope.fileattach="file attached";
    for (var i = 0; i < $scope.totallist.length; i++) {
      if ($scope.totallist[i].file_bank.session_files!=0) {
        $scope.sessionData.push($scope.totallist[i]);
      };
    };
  }
  //not attach file 
  $scope.notattachfile=function () {
    $scope.sessionData=[]
    $scope.showblack="gp-black";
    $scope.attachshowblack=$scope.allsession="gp-blue";   
    $scope.alternative=true;
    $scope.fileattach="not file attached"; 
    for (var i = 0; i < $scope.totallist.length; i++) {
      if ($scope.totallist[i].file_bank.session_files==0) {
        $scope.sessionData.push($scope.totallist[i]);
      };
    };
  }
  $scope.show=function (val) {
    if (val!=0) {
      $scope.valuses="At a time upload one file";   
    };
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.controller('VisitPassController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }
  localStorage.removeItem('camImage');
  if(localStorage.getItem('creategatepass')==undefined){
      window.location="/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.validateMail = function(){ 
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test($scope.email))  
    {  
      return true;
    }else{
      return false;  
    }      
  };
  $scope.checkAccount=function(){
    $scope.emailvalid=  $scope.validateMail();
    if($scope.emailvalid){
      $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/gate_pass_check/',
              data:{
                event_code:$scope.currentval.event_code,
                email:$scope.email
              }
          }).then(function success(response){
            if(response.data.result==1){
               

                if(response.data.gate_pass_check_date.redirect){
                  localStorage.setItem('printGatepass',angular.toJson(response.data.gate_pass_check_date));
                  window.location="/event/create-gatepass";
                }
                else if(response.data.gate_pass_check_date.redirect==false){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.pdfUrl = response.data.gate_pass_check_date.gate_pass_url;
                  $('#myModal-download').modal('show');
                }
            }else if(response.data.result==0){
              $scope.gatepass.error = response.data.message;
              $scope.gatepass.errormsg = true;

              $('#loading').hide();
            $('#container').fadeIn();
            }
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
    }
  };
  $scope.closeModal = function(){
    $scope.email="";
    $('#myModal-download').modal('hide');
    window.location="/event/gatekeeper";
  };
  $scope.cancelVg=function () {
    localStorage.removeItem('creategatepass');
  }
  $scope.vistorGatepass= function(){
    localStorage.removeItem('printGatepass');
   window.location = "/event/create-gatepass";
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  };
}]);
app.controller('GatepassController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll','$timeout','$window',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll,$timeout,$window){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }
  if(localStorage.getItem('creategatepass')==undefined){
    window.location="/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.specPeople = $scope.currentval.sp_people;
    var dele = {
      group_tittle:"Delegates", 
      id:10,
      single_entity_tittle:"Delegate"
    };
  // $scope.there=false;
  // for (var i = 0; i < $scope.specPeople.length; i++) {
  //   if ($scope.specPeople[i].group_tittle=="Delegates") {
  //     $scope.there=true;
  //   }
  // }
  // if ($scope.there==false) {
    $scope.specPeople=$scope.specPeople.concat(dele);
  // }
   $scope.visitPass=true;
   if(localStorage.getItem('printGatepass')!=null){
      $scope.visitPass=false;
      $scope.gatePassinfo=angular.fromJson(localStorage.getItem('printGatepass'));
      $scope.full_name=$scope.gatePassinfo.full_name;
      $scope.designation=$scope.gatePassinfo.designation;
      $scope.company_name=$scope.gatePassinfo.company_name;
      $scope.imageSrc = $scope.gatePassinfo.profile_picture;
      $scope.email = $scope.gatePassinfo.email;
   }
  //selection of ticket 
  $scope.ticketSel = function(ticket_code){
    $scope.selectTicketval = ticket_code;
        for (var i = 0; i <$scope.ticketsdata.length; i++) {
              if($scope.ticketsdata.ticket_code==ticket_code){
                break;
              }
        }
  };
  // email validation
  $scope.emailFormat = /^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/;
  // fetching tickets
  $scope.allTickets = function(){
    $('#loading').show();
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets;  
              $('#loading').hide();
              $('#container').fadeIn();
              if( $scope.visitPass==false) {  
                $scope.ticketSel($scope.gatePassinfo.ticket_code);
              }
          }
      });
  };
  $scope.allTickets();
  // selection of delegate types
  $scope.selectDelType = function(spid){
    $scope.selectedDelval = spid;
    for (var i = 0; i <$scope.specPeople.length; i++) {
        if($scope.specPeople.id==spid){
          break;
        }
    }
  };
  if($scope.visitPass==false) {  
      $scope.selectDelType($scope.gatePassinfo.delegate_type);
  }
  $scope.checkImage = function(){
    $('#take-picture').modal('hide');
    if(localStorage.getItem('camImage')!=undefined){
      $scope.imageSrc = localStorage.getItem('camImage');
      $scope.iswebCamimg=true;
      }
  };
  $scope.removeCamImg = function(){
    $scope.imageSrc=null;
    $scope.iswebCamimg=false;
    localStorage.removeItem('camImage');
  };
  $scope.cancelcreategatepass=function () {
    localStorage.removeItem('creategatepass');
  }
  // --------------------------------------------------------image-----------------
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='floorPic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='floorPic'){
      $scope.imageSrc="";
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
      $scope.floorPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
      var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
      if(len>0 ){
        angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
          console.log("test", model.file.size)
          if(key!=(len-1)){
            model.setType(4);
          }else{
            if(model.file.size > 5242880){
              $scope.gatepassForm.floorPic.$setValidity('minsizeval',false);
              model.setType(4);
              $scope.imageSrc="";
            }else{
              $scope.gatepassForm.floorPic.$setValidity('minsizeval',true);

            fileReader.readAsDataUrl(model.file, $scope)
          .then(function(result) {
             GetDataService.getImgDimensions(result,function(width, height) {
                if(width >=512  && height >= 512 ){
                  $scope.gatepassForm.floorPic.$setValidity('minDimension',true);
                    // $scope.imageSrc = result;
                   if(width ==512 && height == 512 ){
                    $scope.imageSrc = result;
                  }else{
                    $scope.cropType='floorPic';
                    $('.image-editor').cropit({
                      imageBackground: true,
                      imageBackgroundBorderWidth: 20,
                      imageState: {
                        src: result,
                      },
                    });
                    $('.image-editor').cropit('imageSrc', result);
                    $('.image-editor').cropit('previewSize', {width:250,height:250});
                    $('.image-editor').cropit('exportZoom', 2.40);
                    $('#crop-image').modal('show');
                  }
                  /*if(width == height){
                    $scope.gatepassForm.floorPic.$setValidity('ratioval',true);
                   
                  }else{
                    $scope.gatepassForm.floorPic.$setValidity('ratioval',false);
                    model.setType(4);
                    $scope.imageSrc="";
                  }*/
                }else{
                  $scope.gatepassForm.floorPic.$setValidity('minDimension',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }
                $scope.$apply();
            });
              //$scope.imageSrc = result;
          });
          }
          }
        });

      }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  // ------------------------------end image-------------------------------------------
  //  error scroll
  $scope.scrollToError = function(){
    $timeout(function() {
      if ($scope.submitted && $scope.selectedDelval==undefined ) {
        APPService.scrollJquery('spdel');
      }else if ($scope.submitted && $scope.selectTicketval==undefined ) {
        APPService.scrollJquery('selticket');
      }
    }, 100);
  };
  $scope.generateGatePass = function(){
    $('#loading').show();
    var fd=new FormData();
    fd.append('delegate_type',$scope.selectedDelval);
    fd.append('ticket_code',$scope.selectTicketval);
    fd.append('company_name',$scope.company_name);
    fd.append('full_name',$scope.full_name);
    fd.append('designation',$scope.designation);
    if($scope.visitPass==true || $scope.gatePassinfo.profile_picture==null){
        if($scope.iswebCamimg)
        {
          fd.append('profile_picture',GetDataService.dataURItoBlob($scope.imageSrc));
        }
        else
        {
            angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
                fd.append('profile_picture',model.file);
              });
              var len=$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
              if(len==0){
                fd.append('profile_picture','');
            }
        }
    }
    else{
            fd.append('profile_picture',$scope.gatePassinfo.profile_picture);
    }
    if($scope.visitPass==true){
        fd.append('yara_user_code','');
    }
    else{
        fd.append('yara_user_code',$scope.gatePassinfo.yara_user_code);
    }
    fd.append('email',$scope.email);
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/gate_pass/custom/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
      })
    .then(function success(response){
      $scope.data=response.data;
        $('#loading').hide();
        $('#container').fadeIn();
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
        }else if($scope.data.result==1){
            localStorage.removeItem('printGatepass');  
            localStorage.removeItem('creategatepass');
            $scope.pdfUrl = $scope.data.gate_pass_url;
            console.log($scope.pdfUrl);
            $('#myModal-download').modal('show');
        }
        
    },function error(response){
         $scope.errorstatus=true;
         $scope.shownav=false;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.errormsg=GetDataService.errorMsg[0];
                }
                else{
                    $scope.errormsg=GetDataService.errorMsg[1];
                }                
        }else
        $scope.errormsg=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };
  $scope.closeModal = function(){
    $('#myModal-download').modal('hide');
        window.location="/event/gatekeeper";
  };
  $scope.takePicture=false;
  $scope.showCam=function(){
   // $scope.takePicture=true;
  };
  $scope.hideCamera = function(){
       $scope.takePicture=false;
       $('#captureImg').hide();
  };
  // ---------------------------------------------gatepass cameraa----------------------   
  $scope.checkWebcamneeded = function(){
    console.log("reach here");
    // var showCam=false;
    //   if($scope.gatePassinfo.profile_picture==null){
    //     return showCam=true;
    //   }
    //   else{
         console.log($rootScope.browser);
          // browserName = "Safari";

       //if($rootScope.browser=='Chrome'){
              // $scope.iswebcamWork=false;
            // $timeout(function(){
              if($rootScope.browser!="Safari"){
                    navigator.getUserMedia = ( navigator.getUserMedia || // use the proper vendor prefix
                                       navigator.webkitGetUserMedia ||
                                       navigator.mozGetUserMedia ||
                                       navigator.msGetUserMedia);
                    // Check that the browser supports getUserMedia.
                    // If it doesn't show an alert, otherwise continue.
                    if (navigator.getUserMedia) {
                      // Request the camera.
                      // navigator.getUserMedia(
                      //   // Constraints
                      //   {
                      //     video: true
                      //   },
                      //   // Success Callback
                      //   function(localMediaStream) {
                      //     // console.log('The following error occurred when trying to use getUserMedia: ' );
                      //     $scope.iswebcamWork=true;
                      //     console.log("1"+$scope.iswebcamWork);

                      //   },
                      //   // Error Callback
                      //   function(err) {
                      //     // Log the error to the console.
                      //     $scope.iswebcamWork=false;
                      //     console.log("2"+$scope.iswebcamWork);
                      //     return $scope.iswebcamWork;
                      //   }
                      // );
                        // $('#captureImg').show();
                        $scope.takePicture=true;
                                                    // $('#cam-notsupport').modal('show');

                        // return $scope.iswebcamWork=true;
                    }
                    else {
                      // alert('Sorry, your browser does not support getUserMedia');
                            $timeout(function(){

                            $('#cam-notsupport').show();
                            },100);
                            $scope.iswebcamWork=false;
                                console.log("3"+$scope.iswebcamWork);
                                // return $scope.iswebcamWork;
                    }
                }
                else{
                        $timeout(function(){
                        $('#cam-notsupport').show();
                        },100);
                      // return $scope.iswebcamWork=false;

                }
              // },3000);
        // }
        // else{
        //           $scope.iswebcamWork=false;
        //           console.log("4"+$scope.iswebcamWork);
        // }
        // return showCam;
      // }
        // if(($scope.iswebcamWork&&($scope.gatePassinfo.profile_picture==null ||$scope.gatePassinfo.profile_picture==undefined))|| ($scope.iswebcamWork && $scope.visitPass==true) )
        // {
        //   return true;
        // }else{
        //   return false;
        // }
  };
  // ---------------------------------------------end gatepass cameraa----------------------   
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Gatekeeper Controller
app.controller('EventGatekeeperController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll','$timeout',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll,$timeout){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // getting privilege based on options is viewed
  if(GetDataService.getPrivilege(5)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  //getting event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  }
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  // precheckin time
  $scope.preCheckinTime=function(){
    angular.forEach($scope.pre_checkin_data,function(value,key){
          if($scope.seltab==$scope.pre_checkin_data[key].day_id)
          {
             $scope.gatePassHour=$scope.pre_checkin_data[key].pre_checkin_time;
             $scope.checkinStarted=$scope.pre_checkin_data[key].checkin_started;
          }
        });
  };
  $scope.gatekeeperInfo = function(){
    GetDataService.gatekeeperInfo($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.img = res.gate_pass_logo;
        $scope.pre_checkin_data = res.pre_checkin_data;
          if(window.location.pathname=="/event/setup-gatekeeper"){
              angular.forEach($scope.eventDaysInfo,function(value,key){
                  angular.forEach($scope.pre_checkin_data,function(v,k){
                          if($scope.eventDaysInfo[key].dayID == $scope.pre_checkin_data[k].day_id){
                              $scope.eventDaysInfo[key].checkinStarted = $scope.pre_checkin_data[k].checkin_started;
                              $scope.eventDaysInfo[key].preCheckinTime = $scope.pre_checkin_data[k].pre_checkin_time;
                              $scope.GK.TimeSel[$scope.eventDaysInfo[key].dayID]=$scope.pre_checkin_data[k].pre_checkin_time;
                          }
                  });
              });
          }
        $scope.preCheckinTime();
        $('#loading').hide();
       $('#container').fadeIn();
      }
    });
  };
  $scope.gatekeeperInfo();
  $scope.cancelEditLogo = function(){
    console.log("cancelEditLogo");
    console.log($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.INVALID));
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.INVALID),function(model,key){
                console.log(model);
                console.log(key);
                model.setType(4);
            });
  };
  // change logo
  $scope.logoChange = function(){

    $scope.GKlogoform.$valid=true;
    // $scope.GKlogoform.$setUntouched();
    $scope.imageSrc=$scope.img;
    // $scope.cancelEditLogo();
  };
  // reassign after setting day names
  $scope.setDayName =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayName();
  //selecting tabs
  var gatetabs=localStorage.getItem('gatetab');
  $scope.tabsid=false;
  for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
    if ($scope.eventDaysInfo[i].dayID==gatetabs) {
      $scope.seltab=gatetabs;
      $scope.gettb=gatetabs;
      $scope.isDayActive=$scope.eventDaysInfo[i].isDayActive;
      $scope.tabsid=true;
      $scope.movebutton=i;
      $scope.day_title=$scope.eventDaysInfo[i].dayTitle;
    }
  }
  if ($scope.tabsid==false) {
    $scope.seltab=$scope.eventDaysInfo[0].dayID;
    $scope.isDayActive=$scope.eventDaysInfo[0].isDayActive;
    $scope.gettb=$scope.eventDaysInfo[0].dayID;
    $scope.day_title=$scope.eventDaysInfo[0].dayTitle;
  }
  $timeout(function() {
      $scope.ddbt=$scope.movebutton+1
      if ($scope.ddbt>3) {
        $scope.forl=$scope.ddbt-3;
        for (var i = 0; i < $scope.forl; i++) {
          $(".slider").diyslider("move", "forth"); 
          $scope.dbutton--;
        }
    }
  }, 100);
  $scope.gatecodedownlode=function () {
    GetDataService.getgatekeepercode($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.gatecodeDownload=res;
      }
    });
  };
  if(window.location.pathname!="/event/setup-gatekeeper"){
       localStorage.removeItem('setupGk');
  }
  else if(window.location.pathname=="/event/setup-gatekeeper"){
        if( localStorage.getItem('setupGk')==undefined){
            window.location = '/events';
        }
       $scope.gatecodedownlode();
  }
  $scope.params ={
    event_code:$scope.currentval.event_code,
    day_id:$scope.seltab,
    offset:0,
    limit:50
  };
  $scope.inc=0;
  $scope.gatecodedownlode=function () {
    GetDataService.getgatekeepercode($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.gatecodeDownload=res;
        $('#gatepass-download').modal('show');
      }
    });
  }
  $scope.selecttab = function(d){
    $scope.day_title=d.dayTitle;
    $scope.EndList=false;
    localStorage.setItem("gatetab", d.dayID);
    $scope.seltab=d.dayID;
    $scope.preCheckinTime();
    $scope.isDayActive=d.isDayActive;
    $scope.gatekeeperList = [];
    $scope.params ={
        event_code:$scope.currentval.event_code,
        day_id:$scope.seltab,
        offset:0,
        limit:50
      };
    if($scope.params.offset==0){
        $scope.gatekeeperPeopleinformation();
    }
  };
  $scope.gatekeeperList = [];
  $scope.EndList=false;
  $scope.blockScroll=false;
  $scope.searchCall=false
  $scope.gatekeeperPeopleinformation = function(){ 
      if($scope.EndList==false && $scope.searchCall==false && $scope.blockScroll==false){
            $scope.blockScroll=true;
            $scope.searchCall=false;
            GetDataService.gatekeeperPeopleinfo($scope.params).then(function(res){
              if(res.result==1){
                  $scope.gatekeeperList=$scope.gatekeeperList.concat(res.gate_keeper_data);
                  $scope.EndList = res.end;
                  $scope.blockScroll=false;
                  $scope.totalAppUsers=res.event_users;
                  $scope.checkInUsers=res.checked_in_user;
                  $scope.notCheckInUsers=res.not_checked_in_user;
              }
            });
      }
  };
  $scope.gatekeeperPeopleinformation();
  //pagination infinite scrolling =
  $scope.paginationGk = function(){
    if($scope.searchPeople!=undefined && $scope.searchPeople.length>0 &&!$scope.EndList && $scope.params!=undefined){
      $scope.getSearchPeople();
    }
    else if(!$scope.EndList && $scope.params!=undefined){
       $scope.params.day_id = $scope.seltab;
       $scope.params.offset =  $scope.params.limit;
       $scope.params.limit =  $scope.params.limit+50;  
       $scope.gatekeeperPeopleinformation();
    }
  };
  $scope.creategatepass=function () {
     localStorage.setItem("creategatepass", true);
  };
  $scope.$watch('searchPeople', function(newval,oldval){
      if (newval!=undefined &&newval!=null && newval.length>0) {
            $scope.searchParam={};
            $scope.searchParam.q =  $scope.searchPeople;
            $scope.searchParam.event_code = $scope.currentval.event_code;
            $scope.searchParam.ticket_code = "";
            $scope.searchParam.on = null;
            $scope.searchParam.limit = 50;
            $scope.searchParam.offset = 0;
            $scope.searchParam.day_id = $scope.seltab;
            $scope.gatekeeperList = [];
            $scope.reachEnd = false;
            $scope.searchCall=true;
            $scope.getSearchPeople();
      }
      else if ((newval==undefined ||newval==''||newval==null) && oldval!=undefined){
              $scope.EndList=false;
              $scope.gatekeeperList = [];
              $scope.searchCall=false;
              $scope.params ={
                  event_code:$scope.currentval.event_code,
                  day_id:$scope.seltab,
                  offset:0,
                  limit:50
              };
              $scope.gatekeeperPeopleinformation();
      }
  },true);
  $scope.getSearchPeople = function(){
      if($scope.reachEnd==false && $scope.searchParam!=undefined && $scope.blockScroll==false)
      {
            $scope.blockScroll = true;
            $scope.searchCall=true;
            GetDataService.getPeoplesearchInfo($scope.searchParam).then(function(res)
            {
              if(res.result==1){
                 $scope.gatekeeperList=$scope.gatekeeperList.concat(res.search_data);
                  $scope.blockScroll = false;
                  $scope.searchCall=false;
                  $scope.reachEnd = res.end;
                  if(res.end==false){
                      var offset = $scope.gatekeeperList.length;
                      $scope.searchParam.offset = offset;
                      $scope.searchParam.limit = offset+50;
                  }

              }
            });
      }
  };
  // check in 
  $scope.checkIn = function(gkInfo){
        $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/checkin/',
              data:{
                yara_user_code:gkInfo.yara_user_code,
                event_code:$scope.currentval.event_code,
                day_id:$scope.seltab
              }
          }).then(function success(response){
            $scope.checkIntime=response.data;
            if(response.data.result==1){
                $scope.gatekeeperList = [];
                $scope.EndList=false;
                $scope.params ={
                    event_code:$scope.currentval.event_code,
                    day_id:$scope.seltab,
                    offset:0,
                    limit:50
                  };
                if($scope.params.offset==0){
                    $scope.gatekeeperPeopleinformation();
                    // Check-in

                }
            }else if($scope.checkIntime.result==0){
              $scope.checkIntime.error = $scope.checkIntime.message;
              $('#Check-in').modal('show');
              // console.log($scope.);
            }else{
              $scope.checkIntime.error= GetDataService.errorMsg[1];
            }
            $('#loading').hide();
            $('#container').fadeIn();
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
  };
  $scope.GK=$scope;
  // reset optional img validation
  $scope.resetImg =function(){
    $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',true);
    $scope.GKlogoform.cmpylogo.$setValidity('minDimension',true);
    $scope.GKlogoform.cmpylogo.$setValidity('ratioval',true);
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
          model.setType(4);
        });
    }
  };
  var pre_checkin_times = [];
  // save entry time for the event
  $scope.saveGKtime = function(){
      angular.forEach($scope.GK.TimeSel,function(value,key){
        var chkinTime = {
          day_id:key,
          pre_checkin_time:value
        };
        pre_checkin_times.push(chkinTime);
      });
      $scope.setupStep='step2';
  };
  // update the entry time for a day
  $scope.saveEntryTime = function(){
        $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/gate_pass/pre_checkin_time/',
              data:{
                pre_checkin_time:$scope.gatePassHour,
                event_code:$scope.currentval.event_code,
                day_id:$scope.seltab
              }
          }).then(function success(response){
            $scope.checkIntime=response.data;
            if(response.data.result==1){
                $('#gatepass-manage-time').modal('hide');
                $scope.gatekeeperInfo();
            }else if($scope.checkIntime.result==0){
              $scope.checkIntime.error = $scope.checkIntime.message;
            }else{
              $scope.checkIntime.error= GetDataService.errorMsg[1];
            }
            $('#loading').hide();
            $('#container').fadeIn();
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
  };
  // setup gatekeeper api call
  $scope.GKsetupDone  =function(){
    $scope.errormsg1=false;
    var fd= new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    fd.append('pre_checkin_times',JSON.stringify(pre_checkin_times));
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('logo',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('logo','');
    }
    $http({method:'POST',
                 url:YaraBaseUrl.url+'/gate_pass/',
                 data:fd,
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
          }).then(function success(response){
              $scope.cdata=response.data;
              if($scope.cdata.result==1){
                $scope.currentval.gate_keeper=1;
                localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                window.location="/event/gatekeeper";
              }else if($scope.cdata.result==0){
                $scope.errormsg1=true;
                $scope.cdata.error=$scope.cdata.message;
              }else{
                $scope.errormsg1=true;
                $scope.cdata.error=GetDataService.errorMsg[1];
              }
          },function error(response){
            $scope.cdata={};
             $scope.errormsg1=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.cdata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.cdata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.cdata.error=GetDataService.errorMsg[1];
        }); 
  };
  $scope.isCroping=false;
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
    $scope.isCroping=false;
  };
  // reset crop cancel img
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc="";
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $scope.isCroping=false;
    $('.image-editor').cropit('imageSrc', '');
  };
  //img upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.imageSrc='';
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
         $scope.isCroping=true;
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
             $scope.isCroping=false;
          }else{
            $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.GKlogoform.cmpylogo.$setValidity('minDimension',true);
                $scope.isCroping=true;
                if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                  $scope.isCroping=false;
                }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  
                }
              }else{
                $scope.GKlogoform.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
        });
        }
        }
      });

    }
    $timeout(function() {
      $scope.lodinghide=true;
    }, 2000);
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  $scope.updateLogo = function(){
    $('#loading').show();
    var fd= new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('logo',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('logo','');
    }
    $http({method:'POST',
             url:YaraBaseUrl.url+'/gate_pass/logo/',
             data:fd,
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
      }).then(function success(response){
          if(response.data.result==1){
            $('#gatepass-add-logo').modal('hide');
            angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
                model.setType(4);
            });
            $scope.gatekeeperInfo();
          }else if(response.data.result==0){
            $scope.errormsg1=true;
            // $scope.cdata.error=$scope.cdata.message;
          }
          $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
        $scope.cdata={};
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.cdata.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.cdata.error=GetDataService.errorMsg[1];
                }                    
        }else
        $scope.cdata.error=GetDataService.errorMsg[1];
    }); 
  };
  $scope.removeimgBtn = false;
  $scope.removeBtn = true;
  $scope.changeimgBtn = false;
  $scope.changeBtn = true;
  $scope.$watch('imageSrc',function(){
    // console.log($scope.imageSrc);
    // removeimgBtn = false;
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0){
      $scope.removeimgBtn = true;
      $scope.removeBtn = false;
      $scope.changeimgBtn = true;
      $scope.changeBtn = false;
    }
    else if($scope.imageSrc!=''){
        $scope.removeimgBtn = false;
        $scope.removeBtn = true;
        $scope.changeimgBtn = false;
        $scope.changeBtn = true;
          // disableSave = true
    }
    else if($scope.imageSrc==''){
        $scope.removeimgBtn = false;
        $scope.removeBtn = false;
        $scope.changeimgBtn = false;
        $scope.changeBtn = false;
          // disableSave = true
    }
    if($scope.img==$scope.imageSrc||$scope.imageSrc==''){
      $scope.disableSave=true;
    }
    else{
        $scope.disableSave=false;
    }
    
  },true);
  $scope.removeImg = function(){
      $scope.imageSrc='';
  };

  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ticket Controller
app.controller('EventTicketsController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','$timeout','$rootScope','$anchorScroll',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,$timeout,$rootScope,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // get evetn data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  if(localStorage.getItem('redirectPpl')==1){
        $scope.currTab='ticket';
        localStorage.removeItem('redirectPpl')
  }
  else{
      $scope.currTab='ticket';
  }
  var daysInfo = $scope.currentval.days;
  document.title='YARA - '+$scope.currentval.short_name+' - Ticket';
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.currentLocalTime = function(){
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
      if (res.result == 1) {
         $scope.currentDate = $filter('date')($scope.setOffset(res.local_time_now,0),'yyyy-MM-dd');
         console.log($scope.currentDate);
      }
    });
  };
  $scope.currentLocalTime();
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  // console.log(st_date)
  // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  // $scope.dayscount=0
  // $scope.countdays=[]
  // for (var i = 0; i < $scope.currentval.days.length; i++) {
  //   // if ($scope.currentval.days[i].is_day_active==1) {
  //      var selda=$filter('date')($scope.currentval.days[i].startTime,'yyyy-MM-dd');
  //      console.log(selda)
  //      $scope.countdays.push(selda);
  //      $scope.dayscount++;
  //   // }
  // }
  $scope.betdays=function () {
   var start = new Date(st_date),
    end = new Date(ed_date);
    var between = $scope.getDates(start, end);
    $scope.dates=between;
  };
  // This function doing this work.
  $scope.getDates=function(start, end) {
      var datesArray = [];
      var startDate = new Date(start);
      while (startDate <= end) {
          datesArray.push($filter('date')(new Date(startDate), 'yyyy-MM-dd'));
          startDate.setDate(startDate.getDate() + 1);
      }
      return datesArray;
  }
  $scope.betdays();
  // $scope.dates=APPService.Dateslist($scope.countdays[0],$scope.dayscount);
  // console.log("days",$scope.dates, $scope.countdays)
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  // reassign after setting day names
  $scope.setDayName =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayName();
  //check day name is setted or not
  if ($scope.dates.length==1){
    $scope.createTicketTab=$scope.days[$scope.dates[0]].dayID;
  }
  if($scope.days[$scope.dates[0]].dayTitle=='Day 1')
    $scope.editedDay=false;
  else
    $scope.editedDay=true;
  // select dates while creating ticket
  $scope.selectedtype = function(d, day){
    // $scope.ticketNameedit=false;
    if($scope.selectedval.indexOf(d)>=0){
      $scope.selectedval.splice($scope.selectedval.indexOf(d),1);
    }else{
      $scope.selectedval.push(d);
    }
    var s = $filter('orderBy')($scope.selectedval);
    if(s.length>0)
    $scope.createTicketTab=day[s[0]].dayID;
    if($scope.selectedval.length>3){$scope.dbutton=$scope.selectedval.length-3;}
  };
  //tab selection in create ticket
  $scope.ADselecttab = function(d){
    $scope.createTicketTab=d;  
  };
  $scope.errscroll = function() {
      $timeout(function() {
        if ($scope.submitted && $scope.SelColor=='' && $scope.ticketname.length>=2) {
          APPService.scrollJquery('ticketcolor');
        }
      }, 100);
  }
  // check ticket access , 't' is ticket code and 'd' is ticket data
  $scope.ticketDays = function(t,d){
    var food='',acc='',msg='',days='';
    $scope.ds.food={};
    $scope.ds.acc={};
    $scope.ds.msg={};
    angular.forEach(d,function(dl,key){
      // var d1 = new Date(dl.day);
      var d1= $filter('date')($scope.setOffset(dl.day,$scope.currentval.eo),'yyyy-MM-dd');
      if($scope.dates.indexOf(d1)>=0){
        pos = $scope.dates.indexOf(d1) + 1;
        days +='Day '+pos+', ';
        if(dl.food_coupon){
          food +='Day '+pos+', ';
        } 
        if(dl.messaging){
          msg +='Day '+pos+', ';
        } 
        if(dl.tracks.length>0){
          acc +='Day '+pos+', ';
        }
      }
    });
    if(food == '')
      food='No'+', ';
     if(acc == '')
      acc='No'+', ';
     if(msg == '')
      msg='No'+', ';
     if(days == '')
      days='No'+', ';
    $scope.ds.food[t]=food.slice(0,-2);
    $scope.ds.acc[t]=acc.slice(0,-2);
    $scope.ds.msg[t]=msg.slice(0,-2);
    return days.slice(0,-2);
  }; 
  $scope.ds=$scope;
  $scope.ticketType='';
  $scope.tckUpdate='';
  //fetching tickets
  $scope.getTickets=function(){
    $('#loading').show();
      GetDataService.getTickets($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          $scope.ticketsdata=res.tickets;
          $scope.firsTicketname = $scope.ticketsdata[0].name;
        }
      });
    $('#loading').hide();
    $('#container').fadeIn();
  };
  //fetching ticket colors
  $scope.getTicketColors=function(val){
      GetDataService.getTicketColors($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          $scope.colorCodes=res.color_codes;
          if(val!='')
            $scope.colorCodes[0]=val;
        }
      });
  };
  $scope.dayselect=function () {
    // $scope.ticketNameedit=false;
  };
  //set ticket color
  $scope.setColor = function(c){
    $scope.SelColor=c;
    // $scope.ticketNameedit=false;
  };
  $scope.addfocus=function () {
    $timeout(function(){
      $('.daynameid').focus();
    },500);
  }
  $scope.modifyTicket="";
  // Editing the name of "All AccessTicket"
  $scope.editTicketName = function(ticketname,ticket){
    $scope.requiredError=false;
    $scope.errortrack=false;
    $scope.invalidTKname=false;
    $scope.modifyTicket= ticketname;
    $scope.ticketInfo= ticket;
    $('#all-access-edit').modal('show');
    $scope.disableedit=true;
    $timeout(function(){
      $('#modifyTicketid').focus();
    },500);        
  };
  $scope.saveTicketname=function(modifyTic){
    $scope.requiredError=false;
    if(modifyTic==undefined|| modifyTic.length===0){
      $scope.requiredError=true;
    }
    else {
        $scope.firsTicketname = modifyTic;
        // $scope.ticketsdata[0].name = modifyTic;
        $('#loading').hide();
        $http({method:'POST',
            url:YaraBaseUrl.url+'/ticket_edit/',
            data:{
              ticket_code:$scope.ticketInfo.ticket_code,
              opp:'edit',
              ticket_name:modifyTic,
              all_day_access:true
            }
          }).then(function success(response){
            $scope.resDelTicket=response.data;
            if($scope.resDelTicket.result==1){
              $scope.errortrack=false;
              $scope.getTickets();
              $scope.delname='';
              $scope.deltcode='';
              $('#all-access-edit').modal('hide');
            }else if($scope.resDelTicket.result==0){
              $scope.resDelTicket.error = $scope.resDelTicket.message;
              $scope.errortrack=true;
            }else{
              $scope.resDelTicket.error= GetDataService.errorMsg[1];
            }
            $('#loading').hide();
            $('#container').fadeIn();
          },function error(response){
                $scope.resDelTicket={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.resDelTicket.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.resDelTicket.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.resDelTicket.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
    }
  };
  $scope.getTickets();
  $scope.ticketnamechange=function (ticketname) {
    // $scope.ticketNameedit=false;
    $scope.invalidTKname=false;
    if (ticketname!=undefined) {
      var tkname=ticketname.toLowerCase();
      var regExp1 = /^ticket[0-9][0-9]*$/;
      var regExp2 = /^ticket[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp3 = /^ticket no[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp4 = /^ticket no[0-9][0-9]*$/;
      if (tkname=="ticket" || tkname=="ticket no") {
        $scope.invalidTKname=true;
      }else if (regExp1.test(tkname)||regExp2.test(tkname)||regExp3.test(tkname)||regExp4.test(tkname)){
        $scope.invalidTKname=true;
      }
    }
    
    // angular.forEach($scope.ticketsdata,function(t){
    //     if(t.ticket_code==$scope.ticode){
    //       if ($scope.ticketname==t.name) {
    //         $scope.ticketNameedit=true;
    //       }else{
    //         $scope.ticketNameedit=false;
    //       }         
    //    }
    //   });
  };

  // creation type update or create and val if ticket update
  $scope.TicketsType=function(type,val, dat){
    // console.log(dat);
    // console.log(type);
    // console.log(val);
    $anchorScroll();
    if(type!='update'){
      $scope.ticketBtnName = "Add Ticket";
      $scope.ticketHeaderName = "Create New Ticket";
      $scope.ticketNameedit=false;
      $scope.getTicketColors('');
    }
    $scope.respticket={};
    $scope.ticketType=type;
    $scope.tckUpdate=val;
    $scope.selectedval=[];
    $scope.ds.Food={};
    $scope.ds.Msg={};
    $scope.ds.Acc={};
    $scope.ds.SS={};
    $scope.tstep=false;
    $scope.ticketname='';
    $scope.SelColor='';
    $scope.submitted=false;
    if($scope.dates.length==1){
      $scope.selectedval.push($scope.dates[0]);
    }
    if(type=='update'){
      $scope.ticketBtnName = "Edit Ticket";
      $scope.ticketHeaderName = "Edit Ticket";
      $scope.ticketNameedit=true;
       $scope.selectedval=[];
       $scope.ticode=val;
      angular.forEach($scope.ticketsdata,function(t){
        if(t.ticket_code==val){
          $scope.ticketname=t.name;
          $scope.getTicketColors(t.color_code);
          $scope.SelColor=t.color_code;
          angular.forEach(t.days,function(d){
            var d1= $filter('date')($scope.setOffset(d.day,$scope.currentval.eo),'yyyy-MM-dd');
            if($scope.dates.indexOf(d1)>=0){
                $scope.selectedval.push(d1);
                $scope.ds.Food[d1]=d.food_coupon;
                $scope.ds.Msg[d1]=d.messaging;
                if(d.tracks.length<=0){
                  $scope.ds.Acc[d1]=false;
                }else{
                  $scope.ds.Acc[d1]=true;
                  for(var j=0;j<$scope.tracks.length;j++){
                    if(d.tracks.indexOf($scope.tracks[j].name)>=0){
                      $scope.ds.SS[d1+$scope.tracks[j].track_code]=true;
                    }
                  }
                }
            }
          });
          var s = $filter('orderBy')($scope.selectedval);
          if(s.length>0)
             $scope.createTicketTab=dat[s[0]].dayID;
          if($scope.selectedval.length>3)
             $scope.dbutton=$scope.selectedval.length-3;
        }
      });
    }
    $timeout(function(){
      $('#ticketnameid').focus();
    },300);
  };
  //before deleting ticket , 't' is ticket data
  $scope.cnfrDelete = function(t){
    $scope.delname=t.name;
    $scope.deltcode=t.ticket_code;
    $scope.resDelTicket={};
  };
  // ticket delete api call
  $scope.deleteTicket =function(){
    $('#loading').hide();
    $http({method:'POST',
        url:YaraBaseUrl.url+'/ticket_edit/',
        data:{
          ticket_code:$scope.deltcode,
          opp:'delete',
          event_code:$scope.currentval.event_code
        }
      }).then(function success(response){
        $scope.resDelTicket=response.data;
        if($scope.resDelTicket.result==1){
          $scope.getTickets();
          $scope.delname='';
          $scope.deltcode='';
          $('#myModal-ticket').modal('hide');
        }else if($scope.resDelTicket.result==0){
          $scope.resDelTicket.error = $scope.resDelTicket.message;
        }else{
          $scope.resDelTicket.error= GetDataService.errorMsg[1];
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
            $scope.resDelTicket={};
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.resDelTicket.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.resDelTicket.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.resDelTicket.error=GetDataService.errorMsg[1];
          $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  // create and update ticket api call
  $scope.addtickets=function(form){
    if(form.$valid){
      $('#loading').show();
      $scope.daysdata1='[';
      var asdays=0;
      var tempday=[];
      angular.forEach($scope.selectedval,function(d,$index){
        $scope.daysdata='{"day":"'+$scope.days[d].dayID+'",';
        $scope.daysdata+='"food_coupon":'+(($scope.ds.Food[d]==undefined)? false : $scope.ds.Food[d])+',';
        $scope.daysdata+='"messaging":'+(($scope.ds.Msg[d]==undefined)? false : $scope.ds.Msg[d])+',';
        $scope.ds.Acc[d]=(($scope.ds.Acc[d]==undefined)? false : $scope.ds.Acc[d]);
        if($scope.ds.Acc[d]){
          $scope.daysdata+='"tracks":[';
          var temp=[];
          for(var j=0;j<$scope.tracks.length;j++){
            $scope.ds.SS[d+$scope.tracks[j].track_code]= (($scope.ds.SS[d+$scope.tracks[j].track_code]==undefined)? false : $scope.ds.SS[d+$scope.tracks[j].track_code]);
            if($scope.ds.SS[d+$scope.tracks[j].track_code]){
              temp.push($scope.tracks[j].track_code);
            }
          }
          for(var j=0;j<temp.length;j++){
            if(j!=0)
              $scope.daysdata+=',';
            $scope.daysdata+='"'+temp[j]+'"';
          }
          $scope.daysdata+=']';
        }else{
          $scope.daysdata+='"tracks":[]';
        }
        $scope.daysdata+="}";
        tempday.push($scope.daysdata);
      });
      for(var i=0;i<tempday.length;i++){
          if(i!=0)
            $scope.daysdata1+=',';
          $scope.daysdata1+=tempday[i];
      }
      $scope.daysdata1+="]";
      console.log("data",angular.fromJson($scope.daysdata1))
      if($scope.ticketType=='create'){
      $http({method:'POST',
        url:YaraBaseUrl.url+'/ticket/',
        data:{
          event_code:$scope.currentval.event_code,
          color_code:$scope.SelColor,
          ticket_name:$scope.ticketname,
          all_day_access:false,
          days:angular.fromJson($scope.daysdata1)
        }
      }).then(function success(response){
        $scope.respticket=response.data;
        if($scope.respticket.result==1){
          $scope.getTickets();
          $scope.tstep=true;
          $scope.selectedval=[];
          $scope.SelColor='';
          $scope.ticketname='';
          $scope.submitted=false;
        }else if($scope.respticket.result==0){
            $scope.respticket.error=$scope.respticket.message;
        }else{
          $scope.respticket.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
            $scope.respticket={};
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.respticket.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.respticket.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.respticket.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
      
    }else if($scope.ticketType=='update'){
      $http({method:'POST',
        url:YaraBaseUrl.url+'/ticket_edit/',
        data:{
          ticket_code:$scope.tckUpdate,
          opp:'edit',
          event_code:$scope.currentval.event_code,
          color_code:$scope.SelColor,
          ticket_name:$scope.ticketname,
          all_day_access:false,
          days:angular.fromJson($scope.daysdata1)
        }
      }).then(function success(response){
        $scope.respticket=response.data;
        if($scope.respticket.result==1){
          $scope.getTickets();
          $scope.tstep=true;
          $scope.ticketType='';
          $scope.selectedval=[];
          $scope.SelColor='';
          $scope.ticketname='';
          $scope.submitted=false;
        }else if($scope.respticket.result==0){
            $scope.respticket.error=$scope.respticket.message;
        }else{
          $scope.respticket.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
            $scope.respticket={};
            //console.log(response);
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.respticket.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.respticket.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.respticket.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
    }else{
      $('#loading').hide();
          $('#container').fadeIn();
    }

    }
  };
  //fetching tracks
  $scope.getTracks=function(){
    $('#loading').show();
    GetDataService.getTracks($scope.currentval.event_code).then(function(res){
       if(res.result==1){
        $scope.tracks=res.tracks;
        $('#loading').hide();
          $('#container').fadeIn();
      }
    });
  };
  $scope.getTracks();
  $scope.SelDaysTrack=[];
  // select track days while creating
  $scope.TrackDays=function(d){
    if($scope.SelDaysTrack.indexOf(d)>=0){
      $scope.SelDaysTrack.splice($scope.SelDaysTrack.indexOf(d),1);
    }else{
       $scope.SelDaysTrack.push(d);
    }
  };
  $scope.trackType='';
  $scope.trackUpdateVal='';
  // selecting create or update track type
  $scope.createTrack = function(type,val){
    $scope.submittedTrack=false;
    $scope.trackdata={};
    $scope.SelDaysTrack=[];
    $scope.trackname="";
    $scope.addtracks=true;
    $scope.trackType=type;
    $scope.trackUpdateVal=val;
    $scope.editstatus=false;
    if($scope.dates.length==1){
      $scope.SelDaysTrack.push($scope.dates[0]);
    }
    if(type=='update'){
      $scope.SelDaysTrack=[];
      $scope.editstatus=true;
      $scope.tcode=val;
      angular.forEach($scope.tracks,function(t){
        if(val==t.track_code){
          $scope.trackname = t.name;
          $scope.SelDaysTrack=t.days;
        }
      });
    }
    $timeout(function(){
      $('#tracknameid').focus();
    },300);
  };
  $scope.ticketchange=function () {
    angular.forEach($scope.tracks,function(t){
        if($scope.tcode==t.track_code){
          if ($scope.trackname==t.name) {
            $scope.editstatus=true;
          }else{
            $scope.editstatus=false;
          }
        }
      });
  };
  // update or create ticket api call
  $scope.addtrack=function(form){
    $scope.trackConfr=0;
    $('#loading').show();
    $scope.invalidTrack = false;
    var regExp4 = /^track[1-9][0-9]*$/;
    var regExp5 = /^track[^a-zA-Z0-9][0-9][0-9]*$/;
    var track = $scope.trackname.toLowerCase();
    if($scope.trackname.toLowerCase() =="track"){
      $scope.invalidTrack=true;
       $('#loading').hide();
        $('#container').fadeIn();
    }
    else if(regExp4.test(track) || regExp5.test(track)){
      $scope.invalidTrack=true;
       $('#loading').hide();
        $('#container').fadeIn();
    }
    if($scope.trackType=='create' && $scope.invalidTrack==false){
        var tracks = [];
        tracks.push($scope.trackname);
        $http({method:'POST',
          url:YaraBaseUrl.url+'/track/',
          data:{
            event_code:$scope.currentval.event_code,
            name:tracks,
            track_based:1
          }
        }).then(function success(response){
        $scope.trackdata=response.data;
        if($scope.trackdata.result==1){
          $scope.addtracks=false;
          $scope.trackname="";
          $scope.SelDaysTrack=[];
          $scope.getTracks();
        }else if($scope.trackdata.result == 0 ){
          $scope.trackdata.error=$scope.trackdata.message;
        }else {
          $scope.trackdata.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
            $scope.trackdata={};
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.trackdata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.trackdata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.trackdata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
    }else if($scope.trackType=='update' && $scope.invalidTrack==false){
      $http({method:'POST',
        url:YaraBaseUrl.url+'/track_edit/',
        data:{
          track_code:$scope.trackUpdateVal,
          opp:'edit',
          name:$scope.trackname,
        }
      }).then(function success(response){
        $scope.trackdata=response.data;
        //console.log($scope.trackdata);
        if($scope.trackdata.result==1){
          $scope.addtracks=false;
          $scope.trackname="";
          $scope.SelDaysTrack=[];
          $scope.getTracks();
        }else if($scope.trackdata.result == 0 ){
          $scope.trackdata.error=$scope.trackdata.message;
        }else {
          $scope.trackdata.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
            $scope.trackdata={};
            //console.log(response);
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.trackdata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.trackdata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.trackdata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
    }
  };
  $scope.deltrackname='';
  $scope.deltrackcode='';
  // before deleting track
  $scope.cnrfTrackDel = function(tt){
    $scope.deltrackname=tt.name;
    $scope.deltrackcode=tt.track_code;
     $scope.delTrackdata={};
  };
  // api delete track
  $scope.deleteTrack =function(){
    $('#loading').show();
    $http({method:'POST',
        url:YaraBaseUrl.url+'/track_edit/',
        data:{
          track_code:$scope.deltrackcode,
          name:$scope.deltrackname,
          opp:'delete',
          event_code:$scope.currentval.event_code
        }
      }).then(function success(response){
        $scope.delTrackdata=response.data;
        if($scope.delTrackdata.result==1){
          $scope.getTracks();
          $scope.deltrackname='';
          $scope.deltrackcode='';
          $('#myModal-track').modal('hide');
        }else if($scope.delTrackdata.result==0){
          $scope.delTrackdata.error=$scope.delTrackdata.message;
        }else{
          $scope.delTrackdata.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
            $scope.delTrackdata={};
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.delTrackdata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.delTrackdata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.delTrackdata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  // checking duplicates in day name
  $scope.checkDayname=function(ind){
        $scope.duplicateDayname=false;
        var arr = [];
        angular.forEach($scope.ds.duplicates,function(value,key){
         $scope.ds.duplicates[key]=false;
        });
        angular.forEach($scope.ds.dayname,function(value,key){
          if($scope.ds.dayname[key]!=undefined){
              var info={
                dayname:$scope.ds.dayname[key],
                date:key,
              }
              arr.push(info);
          }
        });
        arr = arr.sort(function(a, b){
            var x = a.dayname.toLowerCase();
            var y = b.dayname.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        var sorted_arr = arr;
        for (var i = 0; i < arr.length - 1; i++) {
            if (sorted_arr[i + 1].dayname.toLowerCase() == sorted_arr[i].dayname.toLowerCase()) {
                  $scope.ds.duplicates[sorted_arr[i+1].date]=true;
                  $scope.duplicateDayname = true;
            }
        } 
         angular.forEach($scope.ds.dayname,function(value,key){          
          if ($scope.ds.dayname[key] != undefined) {
            var main='invalidDYname'+ind;
            $scope[main]=false;
            $scope.initialticket=false;
            // $scope.invalidDYname[ind] = false;
             var dyname = $scope.ds.dayname[key].toLowerCase();
             var regExp1 = /^day[0-9][0-9]*$/;
             var regExp2 = /^day[^a-zA-Z0-9][0-9][0-9]*$/;
             var regExp3 = /^day no[^a-zA-Z0-9][0-9][0-9]*$/;
             var regExp4 = /^day no[0-9][0-9]*$/;
             if (dyname == "day" || dyname == "day no") {
                 $scope[main] = true;
                 $scope.initialticket=true;
             } else if (regExp1.test(dyname) || regExp2.test(dyname) || regExp3.test(dyname) || regExp4.test(dyname)) {
                 $scope[main] = true;
                 $scope.initialticket=true;
             }
         }
        });
  };
  // creating day names
  $scope.createDayName = function(){
    var eventDayNames = [];
    angular.forEach($scope.ds.dayname,function(value,key){
        var dayName= {
          'day_name':value,
          'day_id':$scope.days[key].dayID
        };
        eventDayNames.push(dayName);
    });
    $('#loading').show();
    $http({method:'POST',
            url:YaraBaseUrl.url+'/event_days/',
              data:{
                days:eventDayNames,
                event_code:$scope.currentval.event_code
              }
      }).then(function success(response){
        $scope.DayNamedata=response.data;
        if($scope.DayNamedata.result==1){
          $scope.addDayName=false;
          $scope.submitted1=false;
          $scope.editedDay=true;
          var i=0;
          angular.forEach($scope.dates,function(d){
            $scope.days[d].dayTitle=$scope.ds.dayname[d];
            i++;
          });
          angular.forEach($scope.dates,function(d){
              angular.forEach($scope.eventDaysInfo,function(value,key){
                if(d==$scope.eventDaysInfo[key].date){
                  $scope.eventDaysInfo[key].dayTitle=$scope.days[d].dayTitle;
                }

              });
          });
          localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
        }else if($scope.DayNamedata.result==0){
          $scope.DayNamedata.error=$scope.DayNamedata.message;
        }else{
          $scope.DayNamedata.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
            $scope.DayNamedata={};
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.DayNamedata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.DayNamedata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.DayNamedata.error=GetDataService.errorMsg[1];
            $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  // before edit day name
  $scope.editDay = function(d){
    $scope.dayNamexist = false;
    $scope.onlyDay = false;
    $scope.currtDayED=d;
    $scope.edSubmitted=false;
    $scope.edDayname=$scope.days[$scope.currtDayED].dayTitle;
    $scope.edDayNamedata={};
    $timeout(function(){
      $('#edDayname').focus();
    },500);
  }; 
  // Checking day name exist or not while editing
  $scope.checkDaycontain = function(dName){
    $scope.dayNamexist = false;
    angular.forEach($scope.currentval.days,function(value,key){
      if(key!==$scope.currtDayED && $scope.currentval.days[key].day_name===dName){
        $scope.dayNamexist = true;
      }
    });
  };
  // api edit day name
  $scope.editDayName = function(){
    var res = $scope.edDayname.split(" ");
    if(res.length===1 && res[0].toLowerCase()==="day"){
          $scope.onlyDay = true;
    }
    else{
          var ed=[];
          $('#loading').show();
          var edname = {
            'day_name':$scope.edDayname,
            'day_id':$scope.days[$scope.currtDayED].dayID,
          };
          ed.push(edname);
            $http({method:'POST',
              url:YaraBaseUrl.url+'/event_days/',
              data:{
                days:ed,
                event_code:$scope.currentval.event_code
              }
            }).then(function success(response){
              $scope.edDayNamedata=response.data;
              if($scope.edDayNamedata.result==1){
                $scope.days[$scope.currtDayED].dayTitle=$scope.edDayname;
                angular.forEach($scope.currentval.days,function(value, key){
                  // console.log($scope.currentval.days, value, key)
                      if($scope.currentval.days[key].dayID ==$scope.days[$scope.currtDayED].dayID){
                        $scope.currentval.days[key].dayTitle = $scope.edDayname;
                      }
                      // angular.forEach($scope.eventDaysInfo,function(value,key){
                      //   if(d==$scope.eventDaysInfo[key].date){
                      //     $scope.eventDaysInfo[key].dayTitle=$scope.days[d].dayTitle;
                      //   }
                      // });
                });
                // console.log("dsbjg",$scope.currentval)
                // $scope.currentval.days=$scope.eventDaysInfo;
                // console.log($scope.currentval)
                localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                $('#loading').hide();
                $('#myModal-Dayname').modal('hide');
              }else if($scope.edDayNamedata.result==0){
                $scope.edDayNamedata.error=$scope.edDayNamedata.message;
                $scope.dayNamexist=true;
              }else{
                $scope.edDayNamedata.error=GetDataService.errorMsg[1];
              }
              $('#loading').hide();
                $('#container').fadeIn();
            },function error(response){
                  $scope.edDayNamedata={};
                  if(response.status==-1 || response.data==null){
                          if($rootScope.online==false)
                          {
                              $scope.edDayNamedata.error=GetDataService.errorMsg[0];
                          }
                          else{
                              $scope.edDayNamedata.error=GetDataService.errorMsg[1];
                          }                          
                  }else
                  $scope.edDayNamedata.error=GetDataService.errorMsg[1];
                  $('#loading').hide();
                $('#container').fadeIn();
            });
      }
  }; 
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.controller('EventPeopleController',['$scope','fileReader','$location','$http','YaraBaseUrl','GetDataService','$filter','APPService','$timeout','$rootScope','$anchorScroll',function($scope,fileReader,$location,$http,YaraBaseUrl,GetDataService,$filter,APPService,$timeout,$rootScope,$anchorScroll){
  $scope.dashUrl = GetDataService.dashboardUrl();
  $scope.deleTypeinfo = {
    id:10,
    group_tittle:'Delegates',
    single_entity_tittle:'Delegate'
  };
  $scope.f_sort = 1;
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }  
  //time offset 
  $scope.setOffset = function(d,offset){
    if(d!=undefined){
      return GetDataService.userOffsetTime(d,offset);
    }
  };
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  // fetch event details from local
  $scope.isFocusDemo=true;
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
      var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
      var st_date=$filter('date')(s_date,'yyyy-MM-dd');
      var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
     $scope.betdays=function () {
       var start = new Date(st_date),
        end = new Date(ed_date);
        var between = $scope.getDates(start, end);
        $scope.dates=between;
     }
    // This function doing this work.
    $scope.getDates=function(start, end) {
        var datesArray = [];
        var startDate = new Date(start);
        while (startDate <= end) {
            datesArray.push($filter('date')(new Date(startDate), 'yyyy-MM-dd'));
            startDate.setDate(startDate.getDate() + 1);
        }
        return datesArray;
    }
    $scope.betdays();
    $scope.convertingPeoplelist = [];
    $scope.delegateDetails = $scope.currentval.sp_people[0];
    $scope.specPeople = [];
     angular.forEach($scope.currentval.sp_people,function(value,k){
        if($scope.currentval.sp_people[k].id!=10){
          $scope.specPeople.push($scope.currentval.sp_people[k]);
          $scope.convertingPeoplelist.push($scope.currentval.sp_people[k]);
        }
     });   
    if(window.location.pathname=="/event/people"){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        // localStorage.removeItem('delegateIdinfo');
        localStorage.removeItem('delegateTosp');
        localStorage.removeItem('convertSp');
        localStorage.removeItem('editSpInfo');
        localStorage.removeItem('spEdit');
    }
    var redirect=angular.fromJson(localStorage.getItem('redirectionInfo'));
    if(window.location.pathname!="/event/people" && redirect==null){
        window.location='/event';
    } 
    if(window.location.pathname=="/event/add-special-delegate"){
        if(redirect.speaker==false|| redirect.speaker==null){
            window.location='/event';
        }
    }
    else if(window.location.pathname=="/event/add-delegate"){
        if(redirect.delegate==false|| redirect.delegate==null){
            window.location='/event';
        }
    } 
    else if(window.location.pathname=="/event/upload-bulk-list"){
        if(redirect.bulk==false || redirect.bulk==null){
            window.location='/event';
        }
    } 
    $scope.diffDays = $scope.currentval.date_diff; 
    if(localStorage.getItem('sort')!==null){
      $scope.f_sort = localStorage.getItem('sort');
    }
    else{
      $scope.f_sort = 1;
    }
    $scope.currentLogin=angular.fromJson(localStorage.getItem('Logininfo')); 
  }
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  }
  // check privilege
  if(GetDataService.getPrivilege()=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  // $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.headerTitle="People";
  //check socail link which are active
  $scope.checkScocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.cmpyweb.length!=7){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.cmpytwitter.length!=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.cmpyfb.length!=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.cmpylink.length!=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.cmpypinterest.length!=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.cmpytumblr.length!=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.cmpygithub.length!=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.cmpyinstagram.length!=26){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
    if(flag==1){
      $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
    
  };
  //check socail link valid and enable add button
  $scope.checkScocialDisabled= function(){
    var flag=0; 
    if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>=7 ){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb) ){
        flag=1;
      }else if($scope.Tcmpyweb.length==7){
        flag=1;
      }else{
        flag=0;      
      } 
    }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>=26){
      flag=1; 
    }

      if (flag == 1) {
          $scope.isSocialSave = true;
      } else {
          $scope.isSocialSave = false;
      }
    // var currId= GetDataService.getSocailId($scope.social_type);
    // if(flag==1){
    //   $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    // }else{
    //   $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    // }`
  };
  //watch changes in social link
  $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
    $scope.checkScocialDisabled();
  });
  setTimeout(function (){
    $scope.cmpytumblr=$scope.Tcmpytumblr;
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
  }, 1000);
  //save socail links
  $scope.saveSocials =function(){
    $scope.typeofchange='save';
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpytumblr = $scope.Tcmpytumblr;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
    $scope.checkScocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
      // $scope.checkScocialDisabled();
       setTimeout(function (){
         $('#'+$scope.social_type+'_id').focus();
         var len= $('#'+$scope.social_type+'_id').val().length;
         $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
    }, 1000);
  });
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      $scope.Tcmpyweb =$scope.cmpyweb;
      $scope.Tcmpyfb = $scope.cmpyfb;
      $scope.Tcmpytwitter = $scope.cmpytwitter;
      $scope.Tcmpylink = $scope.cmpylink;
      $scope.Tcmpypinterest =  $scope.cmpypinterest;
      $scope.Tcmpytumblr = $scope.cmpytumblr;
      $scope.Tcmpygithub = $scope.cmpygithub;
      $scope.Tcmpyinstagram =  $scope.cmpyinstagram;
    }
   // $('#'+$scope.social_type+'_id').removeAttr('autofocus');
  });
  var delegateTypeInfo = angular.fromJson(localStorage.getItem('delegateIdinfo')); 
  $scope.ListPeoples=[];
  $scope.EndList=false;
  if(delegateTypeInfo!=undefined){
    $scope.f_user = delegateTypeInfo.id;
    $scope.f_username = delegateTypeInfo.single_entity_tittle;
  }
  else{
    $scope.f_user = 10;
    $scope.f_username = 'Delegate';
  }
  $scope.params =   {
    offset:0,
    limit:0,
    type:$scope.f_user,
    initialize_ticket:1,
    event_code:$scope.currentval.event_code,
    s:$scope.f_sort
  };
  // -------------------------------------- integration of new people structure------------------------------------
  // initial loading will pass offset=0,limit=50,ticketcode=null searchquery = null type = [10,11,12] includespecialtypepeople=true, initilizeticket=true,eventcode
  // fetch all people info with special types ,tickets info , list people
  $scope.tickets = function(){
    $scope.delegateStep = 'step1';
    $scope.UpStep='step1';
    if($scope.ticketsdata.length>1){
      $scope.delegateStep = 'step1';
      $scope.UpStep='step1';
    }
    $scope.ticketval="";
    // pre select ticket value
    if(angular.fromJson(localStorage.getItem('ticketTabinfo'))!=undefined){
      var ticketInformation = angular.fromJson(localStorage.getItem('ticketTabinfo'))
      $scope.ticktselected=ticketInformation.ticketCode;
      $scope.seltab=ticketInformation.ticketCode;
      $scope.ticketinValid=ticketInformation.ticketinValid;
    }
    else{
        $scope.ticktselected=$scope.ticketsdata[0].ticket_code;
        $scope.seltab=$scope.ticketsdata[0].ticket_code;
        $scope.ticketinValid=$scope.ticketsdata[0].is_validity_over;
    }
    $scope.ListPeoples=[];
    $scope.EndList=false;
    $scope.params.ticket_code = $scope.seltab;
    $scope.params.initialize_ticket = 0;
    $scope.params.limit = 50;
    $scope.params.offset = 0;
    $scope.getAllpeople();
    $scope.ticket_name=$scope.ticketsdata[0].name;
    //selecting ticket if ticket preforward from different page
    var t = sessionStorage.getItem('TicketSelected');
    if(t!=undefined){
      $scope.ticktselected=t;
      sessionStorage.removeItem('TicketSelected');
    }
    //setting scroll to default and calling delegate api
    //setting tab buttons and tab
    $scope.dbutton=($scope.ticketsdata.length-3);
    $timeout(function(){
      if($(".slider").length>0){
        $(".slider").diyslider({
            width: "100%", // width of the slider
            height: "51px", // height of the slider
             minSlides: 2, // number of slides you want it to display at once
            loop: false, // disable looping on slides
            moveSlides: 1,
        });
      }
    },100); 
    var tid=angular.fromJson(localStorage.getItem('ticketTabinfo'));
    if(angular.fromJson(localStorage.getItem('ticketTabinfo'))!=undefined && angular.fromJson(localStorage.getItem('ticketTabinfo'))!=null){
          $scope.freshtab=true;
          for (var i = 0; i < $scope.ticketsdata.length; i++) {
            if ($scope.ticketsdata[i].ticket_code==tid.ticketCode) {
                $scope.seltab=tid.ticketCode;
                $scope.tottab=i
                $scope.freshtab=false;
                $scope.ticketinValid = tid.ticketinValid;
              }
          } 
    }
    if ($scope.freshtab) {
      $scope.seltab=$scope.ticketsdata[0].ticket_code;
    }
    $timeout(function() {
      $scope.ddbt=$scope.tottab+1
      if ($scope.ddbt>3) {
        $scope.forl=$scope.ddbt-3;
        for (var i = 0; i < $scope.forl; i++) {
          $(".slider").diyslider("move", "forth"); 
          $scope.dbutton--;
      }
    }
    }, 100);  
  };
  // -----------------------integrating search -----------------------------------
  $scope.$watch('searchPeople', function(newval,oldval){
      if (newval!=undefined &&newval!=null && newval.length>0 ) {
            $scope.searchParam={};
            $scope.searchParam.q = newval;
            $scope.searchParam.event_code = $scope.currentval.event_code;
            $scope.searchParam.ticket_code = $scope.seltab;
            $scope.searchParam.on = $scope.f_user;
            $scope.searchParam.limit = 50;
            $scope.searchParam.offset = 0;
            $scope.searchParam.day_id = null;
            $scope.searchParam.s = $scope.f_sort;
            $scope.ListPeoples = [];
            $scope.reachEnd = false;
            $scope.searchCall=true;
            $scope.getSearchPeople();
      }
      else if ((newval==undefined ||newval==''||newval==null) && oldval!=undefined){
              $scope.ListPeoples = [];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.limit = 50;
              $scope.params.offset = 0;
              $scope.searchCall=false;
              $scope.getAllpeople();
      }
  },true);
  // search people
  $scope.getSearchPeople = function(){
    if($scope.reachEnd==false && $scope.searchParam!=undefined )
    {
          $scope.blockScroll = true;
          GetDataService.getPeoplesearchInfo($scope.searchParam).then(function(res)
          {
            if(res.result==1){
                $scope.blockScroll = false;
               $scope.ListPeoples=$scope.ListPeoples.concat(res.search_data);
                $scope.searchCall=false;
                $scope.reachEnd = res.end;
                if(res.end==false){
                    var offset = $scope.ListPeoples.length;
                    $scope.searchParam.offset = offset;
                    $scope.searchParam.limit = offset+50;
                }
            }
          });
    }
  };
  // -----------------------End integrating search -------------------------------
  $scope.removeSearch = function(){
    $scope.searchPeople='';
    $scope.searchCall=false;
  };
  //fetching all people
  $scope.getAllpeople = function(){
    $('#loading').hide();
      if($scope.EndList==false){
        $scope.blockScroll = true;
        GetDataService.getPeopleInfo($scope.params).then(function(res){
            if(res.result==1){
                $scope.blockScroll = false;
                $scope.ListPeoples=$scope.ListPeoples.concat(res.delegates);
                $scope.EndList=res.end;
                if($scope.params.initialize_ticket==1){
                  $scope.ticketsdata = res.tickets;
                  $scope.tickets();
                }
                $scope.delegateDetails = $scope.deleTypeinfo;
                if(res.event_package_info.number_of_attendee != undefined)
                {
                    $scope.number_of_attendee_added=res.event_package_info.number_of_attendee_added;
                    $scope.number_of_attendee=res.event_package_info.number_of_attendee;
                }
            }
        });
      }
  };
  if(window.location.pathname!="event/add-special-delegate"){
      $scope.getAllpeople();
  }
  // End fetch all people info with special types ,tickets info , list people
  // -------------------------------------- End integration of new people structure------------------------------------
  // fetching tickets
  $scope.allTickets = function(){
    $scope.ticketsdata=[];
    $('#loading').show();
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets;  
              $('#loading').hide();
              $('#container').fadeIn();
            }
      });
  };
  // $scope.allTickets();  
  // fetch updated tickets
  $scope.avilabileTickets = function(){
    GetDataService.getAvilabileTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.updatedTicketsdata=res.tickets;  
            }
      });
  };
  $scope.sortingOption = function(sort){
    $anchorScroll();
    localStorage.setItem('sort',sort);
    $scope.EndList=false;
    $scope.params.ticket_code = $scope.seltab;
    $scope.params.initialize_ticket = 0;
    $scope.params.offset = 0;
    $scope.params.limit = 50;
    $scope.params.type = $scope.f_user;
    $scope.reachEnd = false;
    $scope.f_sort = sort;
    $scope.params.s=sort;
    $scope.ListPeoples=[];
    if($scope.searchPeople!=undefined||$scope.searchPeople!=null){
        $scope.getSearchPeople();
    }
    else{
          $scope.getAllpeople();
    }
  };
  //setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='SpkPic'){
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  //reset crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='SpkPic'){
       $scope.imageSrc1="";
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  //Upload img and doc
  $scope.$on('$dropletReady', function whenDropletReady() {
    if($scope.sharefiles != undefined)
    $scope.sharefiles.allowedExtensions(['xlsx', 'xls', 'csv', 'txt']);
    if($scope.SpkPic != undefined)
    $scope.SpkPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.cropPic='';
    if($scope.sharefiles != undefined){
    var len =$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
      if(len>0 ){
       //console.log($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID));
        angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
          if(key<len-1){
            model.setType(4);
          }else{
            if(model.file.size > 52428800){
            //  $scope.signup3Form.sharefiles.$setValidity('minsizeval',false);
              model.setType(4);
            }else{
              //$scope.signup3Form.sharefiles.$setValidity('minsizeval',true);
            }
          }
        });
      }
    }
    if($scope.SpkPic != undefined){
    len =$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('cover image change');
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.speakerForm.SpkPic.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc1="";
          }else{
            $scope.speakerForm.SpkPic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // //console.log(width+'X'+height);
              if(width >= 512 && height >= 512 ){
                $scope.speakerForm.SpkPic.$setValidity('minDimension',true);
                if(width ==512  && height == 512 ){
                  $scope.imageSrc1   = result;
                }else{
                  $scope.cropPic='profile';
                  $scope.cropType='SpkPic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.05);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.speakerForm.SpkPic.$setValidity('ratioval',true);
                  $scope.imageSrc1 = result;
                }else{
                  $scope.speakerForm.SpkPic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.speakerForm.SpkPic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc1="";
              }
              $scope.$apply();
          });
        });
        }
        }
      });
    }
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
   if($scope.SpkPic != undefined){
    len =$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1="";
    }
  }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  $scope.searchScrollCall=false;
  // reset value and calling delegate api when tab is switched 
  $scope.selecttab = function(t){
    $scope.seltab=t.ticket_code;
    $scope.ticketinValid=t.is_validity_over;
    var ticketTabinfo = {
      ticketCode:$scope.seltab,
      ticketinValid:$scope.ticketinValid
    }
    localStorage.setItem('ticketTabinfo',angular.toJson(ticketTabinfo));
    $scope.ListFrom = 0;
    $scope.ListTo = 10;
    $scope.ListPeoples=[];
    $scope.EndList=false;
    $scope.params.ticket_code = t.ticket_code;
    $scope.params.initialize_ticket = 0;
    $scope.params.limit = 50;
    $scope.params.offset = 0;
    $scope.getAllpeople();
  };
  // while listing , 't' is ticket code and 'd' is ticket data
  $scope.ticketDays = function(t,d){
    var food='',acc='',msg='',days='';
    $scope.ds.food={};
    $scope.ds.acc={};
    $scope.ds.msg={};
    angular.forEach(d,function(dl,key){
      var d1 = new Date(dl.day);
      d1= $filter('date')(d1,'yyyy-MM-dd');
      pos = $scope.dates.indexOf(d1) + 1;
     
      days +='Day '+pos+', ';
      if(dl.food_coupon){
        food +='Day '+pos+', ';
      } 
      if(dl.messaging){
        msg +='Day '+pos+', ';
      } 
      if(dl.tracks.length>0){
        acc +='Day '+pos+', ';
      }
    });
    $scope.ds.food[t]=food.slice(0,-2);
    $scope.ds.acc[t]=acc.slice(0,-2);
    $scope.ds.msg[t]=msg.slice(0,-2);
    return days.slice(0,-2);
  }; 
  $scope.ds=$scope;
  $scope.ticktselected='';
  //when ticket is changed 
  $scope.changetselect=function(t){
    var ticketTabinfo = {
      ticketCode:t.ticket_code,
      ticketinValid:t.is_validity_over
    }
    localStorage.setItem('ticketTabinfo',angular.toJson(ticketTabinfo));
    $scope.ticket_name=t.name;
    $scope.ticktselected=t.ticket_code;
    $scope.ticketinValid=t.is_validity_over;
  };
  $scope.isExists_user=0;
  // view options are selected and reset values and calling api
  $scope.fliterPeopleList =function(spPl){
      localStorage.setItem('delegateIdinfo',angular.toJson(spPl));
      $scope.f_user = spPl.id;
      $scope.f_username = spPl.single_entity_tittle;
      $scope.ListPeoples=[];
      $scope.EndList=false;
      $scope.params.ticket_code = $scope.seltab;
      $scope.params.initialize_ticket = 0;
      $scope.params.offset = 0;
      $scope.params.limit = 50;
      $scope.params.type = $scope.f_user;
      if($scope.params.offset==0){
          $scope.getAllpeople();  
      }
  };
 //ticket is stored before redirection
  $scope.preSelectTicket = function(t,url,delegateIdinfo){
      var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo')); 
      if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
      }
      if(url == 'add-delegate'){
        redirectionInfo.delegate=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));
      }
      else if(url == 'add-special-delegate'){
        redirectionInfo.speaker=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));

      }
      else if(url == 'upload-bulk-list'){
        redirectionInfo.bulk=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));
      }
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      sessionStorage.setItem('TicketSelected',t);
      window.location=url;
  };
  // $scope.number_of_attendee_added=$scope.currentval.number_of_attendee_added;
  // $scope.number_of_attendee=$scope.currentval.number_of_attendee;
  $scope.addMoreItems = function(){
    if(!$scope.EndList && ($scope.searchPeople==undefined || $scope.searchPeople.length==0)){
       $scope.params.ticket_code = $scope.seltab;
       $scope.params.offset =  $scope.params.limit;
       $scope.params.limit =  $scope.params.limit+50;  
       $scope.params.type = $scope.f_user;
       $scope.getAllpeople();
    }
    else{
         $scope.getSearchPeople();
    }
  }; 
  $scope.blockCreation=false;
   $scope.userData=null;
  // while adding speaker checking email is exists or not
  $scope.checkEmail=function(mail){
    var convertSp= localStorage.getItem('convertSp');
    var editSpInfo= localStorage.getItem('editSpInfo');
    var spEdit= localStorage.getItem('spEdit');
    // console.log("reach here");
    // console.log(convertSp);
    // console.log(editSpInfo);
    // console.log(spEdit);
    if(spEdit!="true"){
      console.log("reach inside");
      $scope.isExists_user=0;
      // $scope.is_Appspeaker=false;
      $scope.blockCreation=false;
      $scope.spname='';
      $scope.imageSrc1 = '';
      $scope.spkdesg = '';
      $scope.spkcmpy ='';
      $scope.spkabt = '';
      $scope.Tcmpyweb='';
      $scope.Tcmpyfb ='';
      $scope.Tcmpytwitter = '';
      $scope.Tcmpylink = '';
      $scope.Tcmpypinterest =  '';
      $scope.Tcmpytumblr = '';
      $scope.Tcmpygithub = '';
      $scope.Tcmpyinstagram =  '';
      $timeout(function(){
        $scope.checkScocialDisabled();
        $scope.saveSocials();
        $scope.updateSocials();
      },1000);
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) && !(spEdit=="true") ){  
          $('#loading').show();
          $http({method:'POST',
                  url:YaraBaseUrl.url+'/sp-delegate/sp_delegate_validate/',
                    data:{
                      email:mail,
                      event_code:$scope.currentval.event_code
                    }
            }).then(function success(response){
              $scope.direct=1;
              if(response.data.result==1){
                $anchorScroll();
                $scope.mailInfo=response.data;
                $scope.userData=response.data.user_data;
                if($scope.userData!=undefined){
                  $scope.spname =  $scope.userData.full_name;
                  $scope.spkdesg = $scope.userData.designation;
                  $scope.spkcmpy = $scope.userData.company_name;
                  // $scope.spkabt = $scope.userData.description;
                  $scope.imageSrc1 = $scope.userData.profile_picture;
                  window.setTimeout( function() {
                          $("textarea").height( $("textarea")[0].scrollHeight );
                  }, 500);
                  if($scope.userData.socials!=undefined && $scope.userData.socials.length>0){
                    angular.forEach($scope.userData.socials,function(s){
                          // console.log(s.link);
                          // console.log(s.social_provider);
                          if(s.social_provider=="Website")
                             $scope.Tcmpyweb=s.link;
                          else if(s.social_provider=="Tumblr")
                             $scope.Tcmpytumblr=s.link;
                          else if(s.social_provider=="Twitter")
                              $scope.Tcmpytwitter=s.link;
                          else if(s.social_provider=="LinkedIn")
                              $scope.Tcmpylink=s.link;
                          else if(s.social_provider=="Facebook")
                             $scope.Tcmpyfb=s.link;
                          else if(s.social_provider=="Pinterest")
                             $scope.Tcmpypinterest=s.link;
                          else if(s.social_provider=="GitHub")
                            $scope.Tcmpygithub=s.link;
                          else if(s.social_provider=="Instagram")
                             $scope.Tcmpyinstagram=s.link;
                    });
                    $timeout(function(){
                        $scope.checkScocialDisabled();
                        $scope.saveSocials();
                        $scope.updateSocials();
                      }
                    ,1000);
                  }
                }
                else{
                  $scope.userData=null;
                }
                $('#loading').hide();
                $('#container').fadeIn();
              }else if(response.data.result==0){
                $scope.spname='';
                $scope.imageSrc1 = '';
                $scope.Tcmpyweb='';
                $scope.Tcmpyfb ='';
                $scope.Tcmpytwitter = '';
                $scope.Tcmpylink = '';
                $scope.Tcmpypinterest =  '';
                $scope.Tcmpytumblr = '';
                $scope.Tcmpygithub = '';
                $scope.Tcmpyinstagram =  '';
                $scope.spkdesg = '';
                $scope.spkcmpy ='';
                $scope.spkabt = '';
                $timeout(function(){
                        $scope.checkScocialDisabled();
                        $scope.saveSocials();
                        $scope.updateSocials();
                },1000);
                $scope.errorMsg = response.data.message;
                $scope.blockCreation=true;
                $('#loading').hide();
                $('#container').fadeIn();
              }
            },function error(response){
                  if(response.status==-1 || response.data==null){
                          if($rootScope.online==false){
                              $scope.showerror=GetDataService.errorMsg[0];
                          }
                          else{
                              $scope.showerror=GetDataService.errorMsg[1];
                          }                    
                  }else
                  $scope.showerror=GetDataService.errorMsg[1];
                  $('#loading').hide();
                  $('#container').fadeIn();
            });
      }
    }
  };
  // manage ticket
  $scope.manageTicket = function(){
    localStorage.setItem('redirectPpl',1);
    window.location="/event/ticket"
  };
  $scope.existsData={};
  // checking Duplicates email ids while creating delegate step2
  $scope.checkDuplicates = function(){
    var returnVal = true;
    var found_at;
    for(var i = 0; i < $scope.ds.emailDel.length; i++){
      if($scope.ds.emailDel[i]!= ''){
        var len = ($filter('filter')($scope.ds.emailDel,$scope.ds.emailDel[i])).length;
        if(len>1){
          returnVal = false;
          found_at=$scope.ds.emailDel.indexOf($scope.ds.emailDel[i],i+1);
          break;
        }
      }
    }
    if(found_at != undefined && found_at !=null)
    APPService.scrollJquery('email_'+found_at)
    return returnVal;
  };
  //checking delegate while edit delegate ,'pos' is position and 'e' is email id
  $scope.delegateCheck= function(pos,e){
    $('#loading').show();
    $scope.ds.exError[pos].status=false;
    var emailsval=[e];
    $http({method:'POST',
      url:YaraBaseUrl.url+'/delegate/',
      data:{
        emails:emailsval,
        ticket_code:$scope.ticktselected
      }
    }).then(function success(response){
      $('#loading').hide();
      $('#container').fadeIn();
      var Data=response.data;
      if(Data.result==1){
        if(Data.invited_emails.length>0){
          $scope.ds.exError[pos].status=true;
          $scope.ds.exError[pos].msg=2;
        }
        else if(Data.non_account_emails.length>0){
            // $scope.ds.eLists.splice(pos,1);
            if(window.location.pathname=="/event/upload-bulk-list"){
              $scope.ds.eLists.splice(pos,1);
              $scope.ds.eLists.splice(pos,0,Data.non_account_emails[0]);
            }
            else{
                // ------normal adding----
                  $scope.foundDelegate.non_account_emails.splice(pos,1,Data.non_account_emails[0]);
                  $scope.ds.eListDis[pos]=true;
                // ------end normal adding----
            }
        }
        else if(Data.delegate_account_emails.length>0){
           if(window.location.pathname=="/event/upload-bulk-list"){
              // $scope.ds.eListDis[pos]=true;
              $scope.account.push(Data.delegate_account_emails[0]);
              $scope.deleteDelegate(pos);
              $scope.ds.eListDis[pos]=true;
              // $scope.ds.eListDis = [];
              // angular.forEach(eListDis,function(v,k){
              //     if(k!=pos){
              //       $scope.ds.eListDis.push(v);
              //     }
              //   });
            }
            else{
              var eListDis = $scope.ds.eListDis;
              $scope.ds.eListDis = [];
              angular.forEach(eListDis,function(v,k){
                  if(k!=pos){
                    $scope.ds.eListDis.push(v);
                  }
                });
              // ------normal adding----
              // $scope.ds.eListDis[pos]=true;
              $scope.foundDelegate.delegate_account_emails.push(Data.delegate_account_emails[0]);
              $scope.foundDelegate.non_account_emails.splice(pos,1);
              $scope.ds.eList.splice(pos,1);
              // ------end normal adding----
            }
        }
        else if(Data.conflict_invited_emails.length>0){
          $scope.ds.exError[pos].status=true;
          $scope.ds.exError[pos].msg=3;
        }
      }else if(Data.result==0){
        $scope.ds.exError[pos].status=true;
        $scope.ds.exError[pos].msg=4;
        $scope.errorMsg=$scope.existsData.message;
      }else {
        $scope.ds.exError[pos].status=true;
        $scope.ds.exError[pos].msg=1;
      }
    },function error(response){
      $scope.ds.exError[pos].status=true;
      //console.log(response);
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.ds.exError[pos].msg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.ds.exError[pos].msg=GetDataService.errorMsg[1];
              }      
      }else
        $scope.ds.exError[pos].msg=GetDataService.errorMsg[1];
    });
    /*if($scope.isExists_user==0)
      $scope.delegateStep='step2';
    else
      $scope.delegateStep='step3';*/
  };
  // before adding delegate, checking delegates2
  $scope.delegateAdd = function(){
    $scope.addDelgData={};
     $scope.foundDelegate={};
     $scope.delegateAddemails = [];
     angular.forEach($scope.ds.emailDel,function(e,key){
        var validMail = $scope.validateMail(e)
        if(validMail ==true){
          $scope.delegateAddemails.push(e);
        }
     });
    $http({method:'POST',
      url:YaraBaseUrl.url+'/delegate/',
      data:{
        emails:$scope.delegateAddemails,
        ticket_code:$scope.ticktselected
      }
    }).then(function success(response){
      // $scope.existsData=response.data;
      if(response.data.result==1){
        $scope.foundDelegate=response.data;
        $scope.userOffset = response.data.uo;
        var leng = $scope.foundDelegate.total_emails_len;   
        // $scope.countEmails();
        if(leng>1){
           $scope.ds.eList = [];
           $scope.ds.eListDis = [];
           $scope.ds.eListDeleted = [];
           $scope.delegateStep='step3';
         }
         else{
                  $scope.invitedAppuserActive=true;
                  $scope.invitedAppuser = [];
                  $scope.invitedUser = [];    
                  $scope.checkoutAppuserActive=true;
                  $scope.checkoutAppuser = [];
                  $scope.checkoutUser = [];
                  $scope.delegateStep='step4';
                  if($scope.foundDelegate.invited_emails.length>0){
                     if($scope.foundDelegate.invited_emails[0].account_email){
                      $scope.invitedAppuser = $scope.foundDelegate.invited_emails;
                      $scope.invitedAppuserActive=false;
                     }
                     else{
                         $scope.invitedUser = $scope.foundDelegate.invited_emails;
                     }
                   }
                  if($scope.foundDelegate.delegate_account_emails.length>0){
                     if($scope.foundDelegate.delegate_account_emails[0].account_email){
                      $scope.checkoutAppuser = $scope.foundDelegate.delegate_account_emails[0];
                      $scope.checkoutAppuserActive=false;
                     }
                     // else if($scope.foundDelegate.delegate_account_emails.length>0){
                     //     $scope.checkoutUser = $scope.$scope.foundDelegate.non_account_emails;
                     // }
                  }
                  else if($scope.foundDelegate.non_account_emails.length>0){
                         console.log($scope.foundDelegate.non_account_emails);
                         $scope.checkoutUser = $scope.foundDelegate.non_account_emails;
                  } 
                  // if($scope.foundDelegate.checkout_emails.length>0){
                  //    if($scope.foundDelegate.checkout_emails[0].username){
                  //     $scope.checkoutAppuser = $scope.foundDelegate.checkout_emails;
                  //     $scope.checkoutAppuserActive=false;
                  //    }
                  //    else{
                  //        $scope.checkoutUser = $scope.foundDelegate.checkout_emails;
                  //    }
                  // }
         }

      }else if($scope.existsData.result==0){
        $scope.existsData.error=$scope.existsData.message;
      }else {
        $scope.existsData.error=GetDataService.errorMsg[1];
      }
    },function error(response){
      $scope.existsData={};
      //console.log(response);
      if(response.status==-1 || response.data==null){
            if($rootScope.online==false)
            {
                $scope.existsData.error=GetDataService.errorMsg[0];
            }
            else{
                $scope.existsData.error=GetDataService.errorMsg[1];
            }      
      }else
        $scope.existsData.error=GetDataService.errorMsg[1];
    });
    /*if($scope.isExists_user==0)
      $scope.delegateStep='step2';
    else
      $scope.delegateStep='step3';*/
    $anchorScroll();
  };
  $scope.validateMail = function(mail){
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(mail))  
    {  
      return true;
    }  
      return false;  
  };
  $scope.addSingleDelegate = function(email){
      var final_email=[];
      $('#loading').show();
      final_email.push(email);
        $http({method:'POST',
        url:YaraBaseUrl.url+'/delegate/add/',
        data:{
          emails:final_email,
          ticket_code:$scope.ticktselected,
          validate:true
        }
      }).then(function success(response){
        $scope.addDelgData=response.data;
        if($scope.addDelgData.result==1){
          window.location="people";
        }else if($scope.addDelgData.result==0){
            $scope.addDelgData.error=$scope.addDelgData.message;
        }else {
          $scope.addDelgData.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
      },function error(response){
        $scope.addDelgData={};
        if(response.status==-1 || response.data==null){
            if($rootScope.online==false)
            {
                $scope.addDelgData.error=GetDataService.errorMsg[0];
            }
            else{
                $scope.addDelgData.error=GetDataService.errorMsg[1];
            }      
        }else
          $scope.addDelgData.error=GetDataService.errorMsg[1];
        $('#loading').hide();
      });
  }
  $scope.addDelgData={};
  // create delegate form
  $scope.delegateCreateFrom = function(){
      var em=[];
      var final_email=[];
      $('#loading').show();
       final_email = final_email.concat($scope.ds.eList);
        if($scope.foundDelegate.delegate_account_emails!=undefined && $scope.foundDelegate.delegate_account_emails.length>0){
          angular.forEach($scope.foundDelegate.delegate_account_emails,function(e){
            em.push(e.email);
          });
          final_email = final_email.concat(em);
        }
        $http({method:'POST',
          url:YaraBaseUrl.url+'/delegate/add/',
          data:{
            emails:final_email,
            ticket_code:$scope.ticktselected,
            validate:true
          }
        }).then(function success(response){
          $scope.addDelgData=response.data;
          if($scope.addDelgData.result==1){
            window.location="people";
          }else if($scope.addDelgData.result==0){
              $scope.addDelgData.error=$scope.addDelgData.message;
          }else {
            $scope.addDelgData.error=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
        },function error(response){
          $scope.addDelgData={};
          if(response.status==-1 || response.data==null){
            $scope.addDelgData.error=GetDataService.errorMsg[0];
          }else
            $scope.addDelgData.error=GetDataService.errorMsg[1];
          $('#loading').hide();
        });
  };
  // 
  $scope.countEmails = function(){
    var length=0;
     // length = length +$scope.foundDelegate.acc_exists_emails.Admin.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Collaborator.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Delegate.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Exhibitor.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Organizer.length;
     // // length = length +$scope.foundDelegate.acc_exists_emails.Sails_Executive.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Sponsor.length;
     length = length +$scope.foundDelegate.other_account_emails.length;
     length = length +$scope.foundDelegate.delegate_account_emails.length;
     length = length +$scope.foundDelegate.non_account_emails.length;
     length = length +$scope.foundDelegate.non_account_emails.length;


     // length = length +$scope.foundDelegate.checkout_emails.length;
     // length = length +$scope.foundDelegate.duplicate_emails.length;
     // length = length +$scope.foundDelegate.invited_emails.length;
     length = length +$scope.foundDelegate.conflict_invited_emails.length;
     return length;
  }
  //bulk upload delete checked delegates
  $scope.DelCheck = function(){
    var del=[];
    var Bdel=[];
    var Ndel=[];
    var BNdel=[];
    if($scope.account!=undefined ){
      angular.forEach($scope.ds.eListboxD,function(v,key){
        if(!v){
          del.push($scope.account[key]);
        }
      });
      angular.forEach(del,function(v){
       Bdel.push(false);
      });
      $scope.ds.eListboxD=Bdel;
      $scope.account=del;
    }
    angular.forEach($scope.ds.eListbox,function(v,key){
      if(!v){
        Ndel.push($scope.ds.eList[key]);
      }
    });
     angular.forEach(Ndel,function(v){
       BNdel.push(false);
      });
      $scope.ds.eListbox=BNdel;
    //$scope.ds.eListbox=[];
    $scope.ds.eList=Ndel;
    $scope.ds.eLists=Ndel;
  };
  // bulkupload delete delegate
  $scope.deleteDelegate = function(index){
    $scope.ds.eListDeleted[index] = true;
  };
  //bulk upload delete delegate by position
  $scope.DelDelegate = function(pos){
    var BNdel=[];
     angular.forEach($scope.ds.eListbox,function(v,k){
      if(k !=pos)
       BNdel.push(v);
     });
    $scope.ds.eListbox=BNdel;
    $scope.ds.eList.splice(pos,1);
    $scope.ds.eLists.splice(pos,1);
    var eListDis = $scope.ds.eListDis;
    var exError = $scope.ds.exError;
    // console.log($scope.ds.exError);
    $scope.ds.eListDis = [];
    $scope.ds.exError = [];
    angular.forEach(eListDis,function(v,k){
        if(k!=pos){
          $scope.ds.eListDis.push(v);
          $scope.ds.exError.push(exError[k]);
        }
      });
  };
  //bulk upload delete delegate by position
  $scope.DelDelegateList = function(pos){
    var BNdel=[];
     angular.forEach($scope.ds.eListboxD,function(v,k){
      if(k !=pos)
       BNdel.push(v);
     });
    $scope.ds.eListboxD=BNdel;
    $scope.account.splice(pos,1);
  };
  //bulk upload select delegate all based on attendee count
  $scope.allselCheck = function(){
   // //console.log($scope.selAllList);
    if($scope.selAllList){
      var total=$scope.number_of_attendee - $scope.number_of_attendee_added;
      var dtotal=total;
      if($scope.account!=undefined ){
        dtotal=Math.abs(total - $scope.account.length);
        angular.forEach($scope.ds.eListboxD,function(v,key){
          if(key<total){
            $scope.ds.eListboxD[key]=true;
          }else{
            $scope.ds.eListboxD[key]=false;
          }
        });
      }
     // //console.log(dtotal);
      angular.forEach($scope.ds.eListbox,function(v,key){
        if(key<dtotal){
            $scope.ds.eListbox[key]=true;
          }else{
            $scope.ds.eListbox[key]=false;
          }
      });
    }else{
      if($scope.account!=undefined ){
        angular.forEach($scope.ds.eListboxD,function(v,key){
            $scope.ds.eListboxD[key]=false;
        });
      }
      angular.forEach($scope.ds.eListbox,function(v,key){
            $scope.ds.eListbox[key]=false;
      });
    }
  };
  // check whether to select all is true or false 
  $scope.changeCheck=function(newval){
      var total=$scope.number_of_attendee - $scope.number_of_attendee_added;
      var tot=$scope.ds.eList.length;
      var trueTotal= ($filter('FilterBoolObj')($scope.ds.eListbox,true)).length;
      if($scope.account!=undefined ){
        tot=tot+ $scope.account.length;
        trueTotal= trueTotal + ($filter('FilterBoolObj')($scope.ds.eListboxD,true)).length;
      }
      if(total>tot){
        if(trueTotal == tot)
         $scope.selAllList=true;
        else
        $scope.selAllList=false; 
      }else{
        var realtot = Math.abs(total - tot );
        if(trueTotal == realtot)
         $scope.selAllList=true;
        else
        $scope.selAllList=false; 
      }
  };
  //final step bulk upload delegate
  $scope.delegateBulkFrom = function(){
    var account_exists_emails = [];
    var non_account_emails = [];
    angular.forEach($scope.account,function(value,key){
          if($scope.account[key].email!=undefined && $scope.ds.eListboxD[key]==true){
              account_exists_emails.push($scope.account[key].email);
            }
    });
    angular.forEach($scope.ds.eLists,function(value,key){
      if($scope.ds.eListbox[key]==true && $scope.ds.eListDeleted[key]==false){
          non_account_emails.push($scope.ds.eLists[key]);
        }
    });    
    var emails = {"delegate_account_emails":account_exists_emails,
                  "non_account_emails":non_account_emails};
    $http({method:'POST',
     url:YaraBaseUrl.url+'/invite/',
     data:{
      event_code:$scope.currentval.event_code,
      ticket_code:$scope.ticktselected,
      emails: emails
     }
    })
    .then(function success(response){
      $scope.addDelgData=response.data;
      if($scope.addDelgData.result==1){
        $("#successMsg").modal("show");
        // $("#inactiveEvent").modal("show");
      }else if($scope.addDelgData.result==0){
          $scope.addDelgData.error=$scope.addDelgData.message;
      }else {
        $scope.addDelgData.error=GetDataService.errorMsg[1];
      }
    },function error(response){
      $scope.addDelgData={};
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.addDelgData.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.addDelgData.error=GetDataService.errorMsg[1];
              }      
      }else
        $scope.addDelgData.error=GetDataService.errorMsg[1];
    });
  };
  // while edit delegate inputbox focuse
  $scope.InboxFocus =  function(id){
    setTimeout(function(){
    $('#'+id).focus();
    },500);
  };
  $scope.ChecklistUpdate =  function(){
    $scope.UpStep='step4';
  };
  $scope.selType='';
  $scope.selUpdateUser='';
  // select create or update speaker, currently speaker update is not present
  $scope.changeType = function(type,val){
      $scope.selUpdateUser=val;
      $scope.isExists_user=0;
      if(type=='create'){
          $scope.spname="";
          $scope.SPKemail="";
          $scope.spkabt="";
          $scope.SpkPic="";
          $scope.SPKweb="";
          $scope.SPKfb="";
          $scope.SPKtwitter="";
          $scope.SPKlin="";
          $scope.ticketval="";
          $scope.spkdesg="";
          $scope.spkcmpy="";
          $scope.btntxt="ADD";
      }else if(type=='update'){
          $scope.prtSPVal='ADDSP';
          $scope.btntxt="UPDATE";
          angular.forEach($scope.SpkData,function(sp){
              if(sp.username==val){
                  $scope.spname=(sp.first_name+' '+sp.middle_name+' '+sp.last_name).trim();
                  $scope.SPKemail=sp.contact_email;
                  $scope.spkabt=sp.description;
                  $scope.SpkPic="";
                  $scope.imageSrc1=sp.profile_picture;
                  $scope.SPKweb=sp.website;
                  $scope.SPKfb=sp.facebook;
                  $scope.SPKtwitter=sp.twitter;
                  $scope.SPKlin=sp.linkedin;
                  $scope.spkdesg=sp.designation;
                  $scope.spkcmpy=sp.company_name;
                  angular.forEach($scope.ticketsdata,function(t){
                      if(t.name==sp.ticket_name){
                          $scope.ticketval=t.ticket_code+"";
                      }
                  });
              }
          });
         
      }
  };
  //create speaker form
  $scope.addSpeaker=function(form){ 
    if ($scope.cmpytumblr==undefined) {
      $scope.cmpytumblr='';
    }
    $('#loading').show();
    $scope.notConnectedNet = false;
    var online = navigator.onLine;
    if(window.location.pathname=="/event/add-special-delegate" && localStorage.getItem('convertSp')){
        if($scope.convSpeakerInfo.using_yara ==true)
        {
          $scope.isExists_user = 1;
          $scope.SPKemail=$scope.convSpeakerInfo.email;
        }
        else{
            $scope.isExists_user = 0;
        }
    }
    if(window.location.pathname=="/event/add-special-delegate" && localStorage.getItem('spEdit')){
        if($scope.editSpInfo.using_yara ==true)
        {
          $scope.isExists_user = 1;
          $scope.SPKemail=$scope.editSpInfo.email;
        }
        else{
            $scope.isExists_user = 0;
        }
    }
    $scope.errormsg=false;
    var fd=new FormData();

    fd.append('event_code',$scope.currentval.event_code);
    fd.append('delegate_name',$scope.spname);
    fd.append('contact_email',$scope.SPKemail);
    fd.append('description',$scope.spkabt);
    angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
      fd.append('profile_picture',model.file);
    });
    var len=$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(($scope.imageSrc1!=null||$scope.imageSrc1!=undefined)&&len>0){
      fd.append('profile_picture',$scope.imageSrc1);
      fd.append('new_picture',1);
    }
    else if(len==0){
      fd.append('profile_picture','');
      fd.append('new_picture',0);
    }
    var temp=[{
      'social_provider': 'Website',
      'link': $scope.cmpyweb
    },{
      'social_provider': 'Twitter',
      'link': $scope.cmpytwitter
    },{
      'social_provider': 'Facebook',
      'link': $scope.cmpyfb
    },{
      'social_provider': 'LinkedIn',
      'link':$scope.cmpylink
    },{
      'social_provider': 'Pinterest',
      'link': $scope.cmpypinterest
    },{
      'social_provider': 'Tumblr',
      'link': $scope.cmpytumblr
    },{
      'social_provider': 'GitHub',
      'link': $scope.cmpygithub
    },{
      'social_provider': 'Instagram',
      'link': $scope.cmpyinstagram
    }
    ];
    fd.append('social_providers',angular.toJson(temp));
    fd.append('user_exists',$scope.isExists_user);
    fd.append('ticket_code',$scope.ticktselected);
    fd.append('designation',$scope.spkdesg);
    fd.append('company_name',$scope.spkcmpy);
    fd.append('delegate_type',$scope.delegateIdinfo.id);
    fd.append('direct',$scope.direct);
    if($scope.userData!=null){
        if($scope.userData.person_code!=null && $scope.userData.yara_user_code==null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'person_code':$scope.userData.person_code
          }
        }
        else if($scope.userData.person_code==null && $scope.userData.yara_user_code!=null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'yara_user_code':$scope.userData.yara_user_code
          }
        }
        else if($scope.userData.person_code!=null && $scope.userData.yara_user_code!=null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'person_code':$scope.userData.person_code,
            'yara_user_code':$scope.userData.yara_user_code
          }
        }
        fd.append('user_data',angular.toJson(dataUser));
    }
    else{
        fd.append('user_data',$scope.userData);
    }
    if($scope.selType=='create'){
        if($scope.isExists_user==1 && len>0){
          // fd.append('new_picture',1);
        }else{
          // fd.append('new_picture',0);
        }
        $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate/',
               data:fd,
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
        }).then(function success(response){
            $scope.cdata=response.data;
             $scope.data={};
            if($scope.cdata.result==1){
              var redirect =sessionStorage.getItem('redirect');
              if(redirect != undefined && redirect != '' && redirect != 'done'){
                sessionStorage.setItem('redirect','done');
                window.location=redirect;
              }else{
                $scope.prtSPVal='SPList';
              // history.replaceState(null, null, "/event/people");
              window.location="people";
             }
                //$scope.getSpeakers();
            }else if($scope.cdata.result==0){
              $scope.errormsg=true;
              $scope.data.error=$scope.cdata.message;
              $('#loading').hide();
              $('#container').fadeIn();
            }else{
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.errormsg=true;
              $scope.data.error=GetDataService.errorMsg[1];
            }
        },function error(response){
          $scope.data={};
          //console.log(response);
           $scope.errormsg1=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }                          
          }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
        }); 
    } else if($scope.selType=='update'){
        if($scope.SkpPic!='' && len>0){
          fd.append('new_picture',1);
        }
        else if($scope.imageSrc1!=null||$scope.imageSrc1!=undefined){
                fd.append('new_picture',0);
        }else{
          fd.append('new_picture',0);
        }
        var specdele=JSON.parse(localStorage.getItem('editSpInfo'))
        fd.append('opp','edit');
        fd.append('sp_delegate_code',specdele.sp_delegate_code);
        fd.append('sp_delegate_name',$scope.spname);
        // fd.append('username',$scope.selUpdateUser);
        $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate-edit/',
               data:fd,
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
        }).then(function success(response){
            $scope.udata=response.data;
            if($scope.udata.result==1){
                window.location="people";
            }else if($scope.udata.result==0){
              $scope.errormsg=true;
              $scope.data.error=$scope.cdata.message;
              $('#loading').hide();
              $('#container').fadeIn();
            }else{
               //console.log(response);
              $scope.errormsg=true;
              $scope.data.error=GetDataService.errorMsg[1];
              $('#loading').hide();
             $('#container').fadeIn();
            }
             
        }); 
    }
  };
  $scope.enableDisablepop = function(info,spCode,action){
      console.log(info);
            console.log(spCode);

      // var sp={
      //   invited_email:info,
      //   speaker_code:spCode
      // };
      if(action =="dis"){
        $scope.enaDisInfo = {
          head:"Disable",
          otherInfo:info,
          disable:true,
          type:'sp'
        };
        // ---------------checking possibile to disable sp delegate-------------
            $('#loading').show();
            $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate/validate_delegate_disable/',
               data:{
                  event_code:$scope.currentval.event_code,
                  person_code:spCode
               }
            }).then(function success(response){
                $scope.response=response;
                console.log($scope.response);
                if($scope.response.data.result==1){
                    $('#people-delete').modal('show');  
                    $('#loading').hide();
                    $('#container').fadeIn();
                }else if($scope.response.data.result==0){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.disableConflictInfo=$scope.response.data;
                  $('#disable-sp-conflict').modal('show');  
                  // $scope.errormsg=true;
                  // $scope.errmsg=$scope.response.message;
                }else{
                  $scope.errormsg=true;
                  $scope.errmsg=GetDataService.errorMsg[1];
                }
                $('#loading').hide();
                $('#container').fadeIn();
            },function error(response){
              $scope.errormsg=true;
              if(response.status==-1 || response.data==null){
                      if($rootScope.online==false)
                      {
                          $scope.errmsg=GetDataService.errorMsg[0];
                      }
                      else{
                          $scope.errmsg=GetDataService.errorMsg[1];
                      }                          
              }else
              $scope.errmsg=GetDataService.errorMsg[1];
            }); 
        // ----------------end checking possibile to disable sp delegate -------
      }
      else{
        $scope.enaDisInfo = {
            head:"Enable",
            otherInfo:info,
            disable:false,
            type:'sp'
        };
        $('#people-delete').modal('show');  
      }
      // $('#people-delete').modal('show');  
  };
  $scope.enableDisableSpeaker = function(sp){
    if(sp.disable){
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/sp-delegate/disable/',
           data:{
              event_code:$scope.currentval.event_code,
              person_code:sp.otherInfo.person_code,
              delegate_type:$scope.f_user
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
                $('#disable-sp-conflict').modal('hide');  
             }
            $('#loading').hide();
            $('#container').fadeIn();
          }); 
    }
    else{
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/sp-delegate/enable/',
           data:{
               event_code:$scope.currentval.event_code,
               person_code:sp.otherInfo.person_code,
               delegate_type:$scope.f_user
           }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
  };
  // resend  invitation mail  modal
  $scope.resendMail = function(userInfo){
      $scope.errormsg=false;
      $scope.errmsg='';
      $scope.userInfo = userInfo;
      $('#people-invite').modal('show');  
  };
  // resend  invitation mail  
  $scope.sendMail = function(mail){
      $('#loading').show();
      $http({
             method:'POST',
             url:YaraBaseUrl.url+'/resend_invitation/',
              data:{
                event_code:$scope.currentval.event_code,
                email:mail
               }
      }).then(function success(response){
          $scope.response=response.data;
           $scope.data={};
          if($scope.response.result==1){
              $scope.ListPeoples=[];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.offset = 0;
              $scope.params.limit = 50;
              $scope.params.type = $scope.f_user;
              if($scope.params.offset==0){
                  $scope.getAllpeople();  
              }
              $('#people-invite').modal('hide');
          }else if($scope.response.result==0){
            $('#loading').hide();
            $scope.errormsg=true;
            $scope.errmsg=$scope.response.message;
          }else{
            $scope.errormsg=true;
            $scope.errmsg=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
      },function error(response){
        $scope.data={};
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                          
        }else
        $scope.data.error=GetDataService.errorMsg[1];
      }); 
  };
  // selection of convertion form delegate to any special delegate
  $scope.selectedType = function(cnvrtInfo){
    $scope.selectedval=cnvrtInfo.id;
      for(var i=0; i< $scope.convertingPeoplelist.length ;i++){
        if(cnvrtInfo.id==$scope.convertingPeoplelist[i].id){
          // $scope.subtypelist=$scope.eventtypes[i].sub_type;
          // $scope.subtitle=''; 
          break;
        }
      }
    localStorage.setItem('delegateIdinfo',angular.toJson(cnvrtInfo));
  };
  $scope.changeTicket = function(u){
      $scope.selectedval='';
      $('#loading').show();
      GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:u.email}).then(function(res){
        if(res.result==1){
              $scope.updatedTicketsdata=res.tickets;  
              $scope.seleDelInfo = u;
              $scope.changingTickets=[];
              $scope.seleDelInfo = u;
              $scope.aviTicketInfo = res;
              angular.forEach($scope.updatedTicketsdata,function(value,key){
                if($scope.updatedTicketsdata[key].ticket_code!=$scope.seltab){
                  $scope.changingTickets.push($scope.updatedTicketsdata[key]);
                }
              });
              $('#loading').hide();
              $('#container').fadeIn();
              $('#change-ticket').modal('show');
        }
      });
  };
  $scope.selectedTicketType = function(chngTicket){
    $scope.selectedval=chngTicket.ticket_code;
      for(var i=0; i< $scope.changingTickets.length ;i++){
        if(chngTicket.ticket_code==$scope.changingTickets[i].ticket_code){
          // $scope.subtypelist=$scope.eventtypes[i].sub_type;
          // $scope.subtitle=''; 
          break;
        }
      }
  };
  $scope.ticketChange=function(tktCode){
    $('#loading').show();
    $http({
           method:'POST',
           url:YaraBaseUrl.url+'/user_ticket/',
            data:{
              email:$scope.seleDelInfo.email,
              ticket_code:tktCode
             }
    }).then(function success(response){
        $scope.response=response.data;
         $scope.data={};
        if($scope.response.result==1){
              $scope.ListPeoples=[];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.offset = 0;
              $scope.params.limit = 50;
              $scope.params.type = $scope.f_user;
              if($scope.params.offset==0){
                  $scope.getAllpeople();  
              }
              $('#change-ticket').modal('hide');
        }else if($scope.response.result==0){
          $('#loading').hide();
          $scope.errormsg=true;
          $scope.errmsg=$scope.response.message;
        }else{
          $scope.errormsg=true;
          $scope.errmsg=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
    },function error(response){
      $scope.data={};
       $scope.errormsg1=true;
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }                          
      }else
      $scope.data.error=GetDataService.errorMsg[1];
    }); 
  };
  $scope.redirectToPeople = function(){
        window.location="/event/people";
  }
  $scope.deleagteConvertion = function(){
        window.location="/event/add-special-delegate";
  };
  $scope.editSP = function(sp){
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      localStorage.removeItem('editSpInfo');
      localStorage.removeItem('spEdit');
      localStorage.setItem('editSpInfo',angular.toJson(sp));
      localStorage.setItem('spEdit',true);
      var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo'));
      if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
      } 
      redirectionInfo.speaker=true;
      localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
      window.location="/event/add-special-delegate";
  };
  // convert delegate to speaker
  $scope.delToSpeaker = function(info){
    $scope.selectedval='';
    localStorage.removeItem('delegateTosp');
    localStorage.removeItem('convertSp');
    localStorage.removeItem('editSpInfo');
    localStorage.removeItem('spEdit');
    localStorage.setItem('delegateTosp',angular.toJson(info));
    localStorage.setItem('convertSp',true);
    var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo'));
    if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
    } 
    redirectionInfo.speaker=true;
    localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
  };
  // Feting data for converting delegate to speaker
  $scope.convtoSpeaker=function(){
    $scope.direct=0;
    $scope.ticketsdata = [];
    $scope.convSpeakerInfo=angular.fromJson(localStorage.getItem('delegateTosp')); 
    console.log($scope.convSpeakerInfo);
    GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:$scope.convSpeakerInfo.email}).then(function(res){
      if(res.result==1){
                $scope.ticketsdata=res.tickets; 
                if($scope.convSpeakerInfo.using_yara==true){
                  $scope.SPKemail = $scope.convSpeakerInfo.invited_email;
                   $scope.spname =  $scope.convSpeakerInfo.full_name;
                    $scope.spkdesg = $scope.convSpeakerInfo.designation;
                    $scope.spkcmpy = $scope.convSpeakerInfo.company_name;
                    $scope.imageSrc1 = $scope.convSpeakerInfo.profile_picture;
                    $scope.disableName=false;
                }
                else{
                      $scope.SPKemail = $scope.convSpeakerInfo.invited_email;
                      $scope.disableName=false;
                      $scope.checkEmail($scope.SPKemail);
                }
      }
    });
  };
  // scroll when special people miss image
  $scope.errorScroll = function(){
    // console.log($scope.imageSrc1==undefined, $scope.wordlength  )
    if($scope.speakerForm.$invalid==false && !$scope.imageSrc1 && $scope.wordlength==false){
      $timeout(function(){
             APPService.scrollJquery('spimage');
      },100);
    }else if ($scope.wordlength) {
      $timeout(function(){
             APPService.scrollJquery('fullname');
      },100);
    }
  };
  // Feting data for  editing special delegate
  $scope.editSpecialDelegate=function(){
      $scope.direct=0;
      $('#loading').show();
      $scope.ticketsdata = [];
      $scope.editSpInfo=angular.fromJson(localStorage.getItem('editSpInfo')); 
      if($scope.editSpInfo!=undefined){
        GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:$scope.editSpInfo.email}).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets; 
              $scope.SPKemail = $scope.editSpInfo.invited_email;
              $scope.spname =  $scope.editSpInfo.full_name;
              $scope.spkdesg = $scope.editSpInfo.designation;
              $scope.spkcmpy = $scope.editSpInfo.company_name;
              $scope.spkabt =  $scope.editSpInfo.description;
              $scope.imageSrc1 = $scope.editSpInfo.profile_picture;
              $scope.disableName=false;
              window.setTimeout( function() {
                  $("textarea").height( $("textarea")[0].scrollHeight );
              }, 500);
              if($scope.editSpInfo.sp_social_providers!=null){
                angular.forEach($scope.editSpInfo.sp_social_providers,function(s){
                  if(s.social_provider=="Website")
                     $scope.Tcmpyweb=s.link;
                  else if(s.social_provider=="Tumblr")
                     $scope.Tcmpytumblr=s.link;
                  else if(s.social_provider=="Twitter")
                      $scope.Tcmpytwitter=s.link;
                  else if(s.social_provider=="LinkedIn")
                      $scope.Tcmpylink=s.link;
                  else if(s.social_provider=="Facebook")
                     $scope.Tcmpyfb=s.link;
                  else if(s.social_provider=="Pinterest")
                     $scope.Tcmpypinterest=s.link;
                  else if(s.social_provider=="GitHub")
                    $scope.Tcmpygithub=s.link;
                  else if(s.social_provider=="Instagram")
                     $scope.Tcmpyinstagram=s.link;
                });

                $timeout(function(){
                    $scope.checkScocialDisabled();
                  }
                ,1000);
              }
              $('#loading').hide();
              $('#container').fadeIn();
           }
        });
      }
  };
  $scope.disableMail = false;
  if(window.location.pathname=="/event/add-special-delegate" && localStorage.getItem('spEdit')){
    $scope.disableMail = localStorage.getItem('spEdit');
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.selType='update';
    $scope.editSpecialDelegate();
  }
  else if(window.location.pathname=="/event/add-special-delegate" && localStorage.getItem('convertSp')){
    $scope.disableMail = localStorage.getItem('convertSp');
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.selType='create';
    $scope.convtoSpeaker();
  }
  else if(window.location.pathname=="/event/add-special-delegate"){
    $scope.selType='create';
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.ticketsdata = [];
    $scope.allTickets();  
    // console.log($scope.delegateIdinfo.id);
  }
  //uploading bulk emails and fetching emails
  $scope.getEmails=function(form){
    //$('#loading').fadeIn();
    $scope.percent = '25%';
    $('div.progressbars-decipher.progress_bulk_upload.progress_single').animate({width: $scope.percent }, 2000, function() {
                //  // //console.log(mainobj);
      $('div.progressbars-decipher.progress_bulk_upload.progress_single').children("span").css("opacity", "1");  
    });
    $('#progress-loader').show(); 
    $scope.ds.eLists=[];
    $scope.ds.eList=[];
    $scope.EmailList=[];
    $scope.EmailDuplicates=[];
    $scope.EmailInvited=[];
    var fd=new FormData();
    angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
      fd.append('email_file',model.file);
      $scope.currentfile=model.file.name;
    });
    fd.append('ticket_code',$scope.ticktselected);
    // $scope.UpStep='step3';
    //  $scope.EmailList = ['a@gmail.com','asds@gmail.com','a@gmail.com','asadasda@gmail.com','aasdasd@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com'
        //                ,'a@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','asdasd@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','asadasdkkk@gmail.com'];
    // $scope.ds.eList=$scope.EmailList;                        
    ////console.log($scope.EmailList.length);
    //fd.append('users',$scope.fileUpload);
    $scope.errormsg1=false;
    $http({method:'POST',
        url:YaraBaseUrl.url+'/invite/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        console.log(response);
        if(response.data.result == 1){
          $scope.account=response.data.emails.delegate_account_emails;
          $scope.EmailList=response.data.emails.non_account_emails;
          $scope.conflictInvitedEmails=response.data.emails.conflict_invited_emails;
          $scope.ds.eLists=response.data.emails.non_account_emails;
          console.log($scope.ds.eLists);
          $scope.EmailInvited=response.data.emails.invited_emails;
          $scope.totalCount=response.data.emails.delegate_account_emails_len+response.data.emails.non_account_emails_len;
          $scope.percent = '25%';
          $('div.progressbars-decipher.progress_bulk_upload.progress_single').animate({width: '100%' }, 2000, function() {
                      //  // //console.log(mainobj);
            $scope.percent = '100%';
            $scope.$apply();
            $('div.progressbars-decipher.progress_bulk_upload.progress_single').children("span").css("opacity", "1");  
           $timeout(function(){
              $scope.UpStep='step3';
              $scope.$apply();
              ////console.log($scope);
              $('#progress-loader').hide(); 
            },800);
            
          });
          //
        }else if(response.data.result == 0){
          $('#progress-loader').hide();
          console.log(response);
          $scope.errormsg1=true;
          $scope.errorMsg=response.data.message;
          // if($scope.data.emails!=undefined){
          //     if ( $scope.data.emails.checkout_emails !=undefined && $scope.data.emails.checkout_emails.length <=0){
          //      $scope.errorMsg=GeneraltDataService.errorMsg[5];
          //    }
          //  }
        }else{
          $scope.errormsg1=true;
          $scope.errorMsg=GetDataService.errorMsg[1];
          //console.log(response);
          $('#progress-loader').hide();
        }
        
        $('#loading').fadeOut(function(){
          $('body').css('overflow','auto');
        });
      },function error(response){
        $('#progress-loader').hide();
        $scope.data={};
        //console.log(response);
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.errorMsg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.errorMsg=GetDataService.errorMsg[1];
              }
        }else
        $scope.errorMsg=GetDataService.errorMsg[1];
        $('#loading').fadeOut(function(){
          $('body').css('overflow','auto');
        });
      });
  };
  $scope.enaDisablePop= function(dele,disEnb){
    console.log(dele);
    if(disEnb =="dis"){
      $scope.enaDisInfo = {
        head:"Disable",
        otherInfo:dele,
        disable:true,
        type:'del'
      };
    }
    else{
      $scope.enaDisInfo = {
          head:"Enable",
          otherInfo:dele,
          disable:false,
          type:'del'
        };
    }
    $('#people-delete').modal('show');        
  };
  $scope.disEnable = function(enaDisInformation){
    if(enaDisInformation.disable){
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/delegate/disable/',
           data:{
               event_code:$scope.currentval.event_code,
               email:enaDisInformation.otherInfo.invited_email,
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
    else{
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/delegate/enable/',
           data:{
               event_code:$scope.currentval.event_code,
               email:enaDisInformation.otherInfo.invited_email,
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
  };
  $scope.reditoPeople = function(){
    window.location="/event/people";
  }
  $scope.topUpPackage = function(){
    window.location = "/topup";
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
  $scope.updateSocials = function(){
    var s=['company-website','twitter','facebook','linkedin','pinterest','tumblr','git-hub','instagram'];
    for(var i=0;i<s.length;i++){
      var flag=0;
      if(s[i]=='company-website' && $scope.cmpyweb.length>8){
        flag=1;
      }else if(s[i]=='twitter' && $scope.cmpytwitter.length>20){
        flag=1; 
      }else if(s[i]=='facebook' && $scope.cmpyfb.length>25){
        flag=1; 
      }else if(s[i]=='linkedin' && $scope.cmpylink.length>25){
        flag=1; 
      }else if(s[i]=='pinterest' && $scope.cmpypinterest.length>26){
        flag=1; 
      }else if(s[i]=='tumblr' && $scope.cmpytumblr.length>0){
        flag=1; 
      }else if(s[i]=='git-hub' && $scope.cmpygithub.length>19){
        flag=1; 
      }else if(s[i]=='instagram' && $scope.cmpyinstagram.length>26){
        flag=1; 
      }
      var currId= GetDataService.getSocailId(s[i]);
      if(flag==1){
        $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
  }
  if (window.location.pathname=="/event/add-special-delegate" && localStorage.getItem('editSpInfo')!=null) {
    $timeout(function() {$scope.updateSocials();}, 1000);
  }  
}]);
//security Controller
app.controller('EventSecurityController',['$scope','$location','$filter','$http','YaraBaseUrl','APPService','vcRecaptchaService','GetDataService','$rootScope',function($scope,$location,$filter,$http,YaraBaseUrl,APPService,vcRecaptchaService,GetDataService,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // fetch event details from local
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);};
  if(selectedval=== undefined || selectedval === null){
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Security';
  }
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  $scope.key=YaraBaseUrl.captcha_key;
  //Send emergency notification msg
  $scope.sendMessage = function(){
    $http({method:'POST',
      url:YaraBaseUrl.url+'/emergency_notification/',
      data:{
        event_code:$scope.currentval.event_code,
        message:$scope.emgmsg,
        title:$scope.subject
      }
    }).then(function success(response){
      console.log(response.data);
      $scope.data=response.data;
      if($scope.data.result==1){
          console.log($scope.data);
           $scope.errormsg1=true;
          $scope.data.error=$scope.data.message;
          $scope.emgmsg='';
          $scope.subject='';
          $scope.submitted=false;
          $('#myModal-notification').modal('show');

      }
      if($scope.data.result==null || $scope.data.result== undefined){
          $scope.errormsg1=true;
          $scope.data.error=GetDataService.errorMsg[1];
          //console.log($scope.data);
      }else if($scope.data.result==0){
          $scope.errormsg1=true;
          $scope.data.error=$scope.data.message;
         //console.log($scope.data);
      }else{  
        // $scope.errormsg1=true;
        // $scope.data.error=$scope.data.message;
        // $scope.emgmsg='';
        // $scope.subject='';
        // $scope.submitted=false;
      }
     
    },function error(response){
      $scope.data={};
      //console.log(response);
          $scope.errormsg1=true;
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }                
      }else
      $scope.data.error=GetDataService.errorMsg[1];
      
    });      
  };
  $scope.wipeEvent = function(){
    console.log(selectedval);
    $http({method:'POST',
      url:YaraBaseUrl.url+'/event_edit/',
      data:{
        event_code:$scope.currentval.event_code,
        opp:'wipe'
      }
    }).then(function success(response){
      console.log(response.data);
      $scope.data=response.data;
       if($scope.data.result==null || $scope.data.result== undefined){
          $scope.errormsg1=true;
          $scope.data.error=GetDataService.errorMsg[1];
          //console.log($scope.data);
      }else if($scope.data.result==0){
          $scope.errormsg1=true;
          $scope.data.error=$scope.data.message;
         //console.log($scope.data);
      }else if($scope.data.result==1){  
        // $scope.errormsg1=true;
        // $scope.data.message=$scope.data.message;
        // $scope.emgmsg='';
        window.location='/events';
        // $scope.subject='';
        // $scope.submitted=false;
      }
     
    },function error(response){
      $scope.data={};
      //console.log(response);
          $scope.errormsg1=true;
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }
      }else
      $scope.data.error=GetDataService.errorMsg[1];
      
    });
  };
  $scope.wipeshown = function() {
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
              $scope.localTimeNow = res.local_time_now;
               var currentdate=GetDataService.userOffsetTime($scope.localTimeNow, 0);
               var eventstart=GetDataService.userOffsetTime($scope.currentval.activation_at, $scope.currentval.eo);
               console.log(currentdate, eventstart)
               if (eventstart<currentdate){
                  $scope.eventhappen=true;
               }else{
                  $scope.eventhappen=false;
               }
          }
      });
  }
  $scope.wipeshown();
  $scope.notification=function () {
    window.location = "/event";  
    localStorage.setItem("securityredirect","yes")
  }
  var redirect=localStorage.getItem('securityredirect');
  if (redirect=='yes') {
    window.location='/events';
    localStorage.removeItem('securityredirect');
  }
 // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.controller('EventKitsController',['$scope','YaraBaseUrl','$http','$location','GetDataService','$rootScope',function($scope,YaraBaseUrl,$http,$location,GetDataService,$rootScope){
  // fetch event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata); 
  document.title='YARA - '+$scope.currentval.short_name+' - Kits'; 
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  $scope.setOffset = function(d){ return GetDataService.userOffsetTime(d,$scope.currentval.eo); };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);   
// Collabrator controller                                                                                 
app.controller('EventCollabratorsController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$rootScope','$anchorScroll','$timeout',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$rootScope,$anchorScroll,$timeout){
  $scope.headerTitle="Collaborator";
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // fetching local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Collabrators'; 
  }
  $scope.locationHref=window.location.pathname;
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.s=APPService;
    // collaborator search 
  $scope.collaboratorsearch="";
  $scope.searchoncollaborator = function(c) {
    return (c.first_name.toLowerCase() + c.middle_name.toLowerCase() + c.last_name.toLowerCase() + c.role.toLowerCase()).indexOf($scope.collaboratorsearch) >= 0;
  };
  $scope.setOffset = function(d,offset){ return GetDataService.userOffsetTime(d,offset); };
  $scope.selectedPermission=[];
  //selecting permissions, "val" is permission and "currval" means is permission selected before or not
  //per collabaroter 5 permission 
  $scope.selpermission=function(val,currval){
    if(!currval){
        $scope.selectedPermission.push(val);
        if($scope.selectedPermission.length>5){
          $scope.selectedPermission.splice(0,1);
        }
    }else{ 
     $scope.selectedPermission.splice($scope.selectedPermission.indexOf(val),1);
    }
    return !currval;
  };
  $scope.Cdata=[];
  $scope.scrollTop=function(){
      $anchorScroll();
      $scope.createcoll=false;
  };
  // fetch collabrators
  $scope.getCollabrators = function(){
      $('#loading').show();
      GetDataService.getCollaborators($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          console.log(res);
              $scope.Cdata=res.data;
              $scope.uo = res.uo;
              $('#loading').hide();
              $('#container').fadeIn();
        }
      });
  };
  // fetch package
  $scope.getPackage = function(){
      $('#loading').show();
      GetDataService.getPackage($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          $scope.packagedata=res.event_packages;
          $('#loading').hide();
          $('#container').fadeIn();
        }
      });
  };
  // $scope.getPackage();
  $scope.createcoll=false;
  $scope.getCollabrators();
  $scope.selType='';
  $scope.Colluser='';

  $scope.backfun = function(){
      $scope.createcoll=false;
  }
  $scope.namecoll='';
  $scope.deleteuser='';
  // revoke collaborator , 'f' means first_name , 'm' means middle_name and 'l' means last_name
  // 'u' means collaborator  data
  $scope.setrevoke=function(f,m,l,u){
      $scope.namecoll=(f+' '+m+' '+l).trim();
      $scope.deleteuser=u;
  };
  //assign scope to bind dynamic variable to scope in html
  $scope.CS=$scope;
  //select type create and update collaborator 
  //type=create or update
  //val - while update val need to update
  // permissionlist - list of permission 
  $scope.ChangeType = function(type,val,permissionlist){
      $scope.errormsg=false;
      GetDataService.getCollaboratorPermission($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.selType=type;
              $scope.Datevalid=false;
              $scope.permissionlist=res.available_kits;
              if(type=='create'){
                  $scope.selectedPermission=[];
                  $scope.collName="";
                  $scope.role="";
                  $scope.email="";
                  $scope.Title="Collaborator Details";
                  $scope.submitted = false;
                  $scope.btntxt="Submit";
                  $anchorScroll();
              } else if(type=='update'){
                  $scope.Title="Update Collaborator Details";
                  $scope.selectedPermission=[];
                  $scope.Colluser=val;
                  $scope.btntxt="Save";
                  $scope.submitted = false;
                  $anchorScroll();
                  $scope.collName=( $scope.Colluser.first_name+" "+ $scope.Colluser.middle_name+" "+  $scope.Colluser.last_name).trim();
                  $scope.role= $scope.Colluser.role;
                  $scope.email= $scope.Colluser.contact_email;
                  angular.forEach( $scope.Colluser.permissions,function(p){
                      $scope.selectedPermission.push(p);
                      if($scope.permissionlist.indexOf(p)<0){
                        $scope.permissionlist.push(p);
                      }
                  });                       
              }
              $scope.createcoll=true;
          }
      });
      $timeout(function(){$('#collobrator_name').focus();},500);
  };
  $scope.Datevalid=false;
  //validate data and scroll to error 
  $scope.validateDates = function (){
      var i=false;
      angular.forEach($scope.dates,function(d){
        if($scope.CS.SelDates[d]){
          i=true;
        }
      });
      if(i)
       $scope.Datevalid=true;
      else
       $scope.Datevalid=false; 
     if($scope.collform.$valid){
      if(!$scope.alldayaccess && !$scope.Datevalid)
        APPService.scrollJquery('errorDate');
     }
  };
  // clear selected dates
  $scope.clearDates= function (){
    angular.forEach($scope.dates,function(d){
      $scope.CS.SelDates[d]=false;
    });
  };
  // api create and update collaborator
  $scope.addcollfrom=function(){
    $scope.errormsg=false;
    $('#loading').show();
      if($scope.selType=='create'){
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/collaborator/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     collaborator_name:$scope.collName,
                     role:$scope.role,
                     contact_email:$scope.email,
                     permissions:angular.toJson($scope.selectedPermission)
                 }
          }).then(function success(response){
            $scope.cdata=response.data;
             if($scope.cdata.result==1){
                $scope.createcoll=false;
                 $scope.getCollabrators();
                 $("#myModal-alart-collaborator").modal('show')
             }
             else if($scope.cdata.result==0){
                   $scope.errormsg=true;
                   $scope.showerror =response.data.message;
             }
             $('#loading').hide(); 
          },function error(response){
              $scope.data={};
              $scope.errormsg=true;
              if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                   $scope.showerror=GetDataService.errorMsg[0];
                   }
                   else{
                      $scope.showerror=GetDataService.errorMsg[1];
                   }
              }
              else{
              $scope.showerror=GetDataService.errorMsg[1];
            }
          });  
      } else if($scope.selType=='update'){
         $http({method:'POST',
                 url:YaraBaseUrl.url+'/collaborator_edit/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     collaborator_name:$scope.collName,
                     role:$scope.role,
                     contact_email:$scope.email,
                     permissions:angular.toJson($scope.selectedPermission),
                     username:$scope.Colluser.username,
                     opp:'edit'
                 }
          }).then(function success(response){
             $scope.udata=response.data;
             if($scope.udata.result==1){
                $scope.createcoll=false;
                 $scope.getCollabrators();
             }
              $('#loading').hide(); 
          }); 
      }
      $anchorScroll();
  };
  // delete collaborator api
  $scope.DelColl = function(){
     $http({method:'POST',
               url:YaraBaseUrl.url+'/collaborator_edit/',
               data:{
                   event_code:$scope.currentval.event_code,
                   username:$scope.deleteuser,
                   opp:'delete'
               }
        }).then(function success(response){
           $scope.ddata=response.data;
           if($scope.ddata.result==1){
               $scope.getCollabrators();
               $('#myModal-collaborator').modal('hide');
           }
            $('#loading').hide(); 
        }); 
  };
  $scope.collActivities = function(c){
      $scope.collabratorAct = c;
      $('#myModal-activities').modal('show'); 
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ShowCase Controller
app.controller('EventShowCaseController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$rootScope,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="ShowCase";
  //fetch event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.is_time_format_24 = localStorage.getItem('is_time_format_24');
    document.title='YARA - '+$scope.currentval.short_name+' - ShowCase';
  }
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset); };
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}    
  // switch view option,val means selected option
  $scope.SwtichTab = function(val){
    $scope.current=val;
    $scope.search='';
    if(val=='All'){
      $scope.getSponsor();
      $scope.getExhibitor();
    }else if(val=='sponsor'){
      $scope.getSponsor();
    }else{
      $scope.getExhibitor();
    } 
    $anchorScroll();
  }
  $scope.service=APPService;
  //set user before showing actives
  // r -role
  //u - userdata
  $scope.userActivites=function(spoExhibitorAct){
    $scope.listActivites=spoExhibitorAct;
    $("#showcase-Activity").modal('show');
    // $scope.currUser=u;
  };
  //fetching activites
  // $scope.Activites =function(){
  //    GetDataService.getShowCaseActivity($scope.currentval.event_code).then(function(res1){
  //         if(res1.result==1){
  //           $scope.listActivites=res1.showcase_activities;
  //         }
  //       });
  //  };
  //  $scope.Activites();
   //before revoking show case user
   //uname - username of revoke user
   //permission - permission enable or disable
   //type - sponosr or exhibitor
  $scope.ShowCase_revoke =  function(uname,type, status){
    $scope.Runame=uname;
    $scope.Rtype=type;
    if (status) {
      $scope.Rpermission="revoke";
    }else{
      $scope.Rpermission="enable";
    }
    console.log($scope.Runame,$scope.Rpermission,$scope.Rtype)
    $scope.ShowCase_Permission($scope.Runame,$scope.Rpermission,$scope.Rtype);
  };
  // revoke user
  // $scope.revokeShowCase =  function(){
  //    $scope.ShowCase_Permission($scope.Runame,$scope.Rpermission,$scope.Rtype);
  // };
  // api to set permission for showcase user
  $scope.ShowCase_Permission = function(uname,permission,type){
    var showcase_type = 2;
    if(type=='sp'){
        showcase_type=1;
    }
    if(permission=='enable'){
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'enable',
                     showcase_type:showcase_type,
                     showcase:true
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                if(type=='sp'){
                  $scope.getSponsor();
                }else{
                  $scope.getExhibitor();
                }
             }
          });
    }else if(permission == 'revoke'){
        $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'revoke',
                     showcase_type:showcase_type,
                     showcase:true
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $('#showcase-delete').modal('hide');
                if(type=='sp'){
                  $scope.getSponsor();
                }else{
                  $scope.getExhibitor();
                }
             }else{
                  $scope.getSponsor();
             }
            // $('#showcase-delete').modal('hide');
          });
    }

  }
  //fetching sponsor
  $scope.getSponsor = function(){
      $('#loading').show();
      GetDataService.getSponsors($scope.currentval.event_code).then(function(res){
        if(res.result==1){
           $scope.SPdata=res.data;
           $('#loading').hide();
           $('#container').fadeIn();
         }
      });
  };
  //fetching exhibitor
  $scope.getExhibitor = function(){
      $('#loading').show();
      GetDataService.getExhibitors($scope.currentval.event_code).then(function(res){
          if(res.result==1){
            $scope.EXdata=res.data;
             $('#loading').hide();
             $('#container').fadeIn();
          }
      });
  };
  $scope.getSponsor();  
  $scope.getExhibitor();
  // resend mail
  // $scope.resendMail = function(email,showcase_code,showcase_type){
  //   $scope.resendemail=email;
  //   $scope.showcasecode=showcase_code;
  //   $scope.showcasetype=showcase_type;
  // };
  $scope.resend=function (email,showcase_code,showcase_type) {
    $scope.resendemail=email;
    $scope.showcasecode=showcase_code;
    $scope.showcasetype=showcase_type;
    $('#loading').show();
     $http({method:'POST',
           url:YaraBaseUrl.url+'/showcase_resend_invitation/',
           data:{
               event_code:$scope.currentval.event_code,
               showcase_code:$scope.showcasecode,
               email:$scope.resendemail,
               showcase_type:$scope.showcasetype
           }
    }).then(function success(response){
       $scope.data=response.data;
       if($scope.data.result==1){
          console.log("send mail");
          $("#showcase-mail").modal('show');
          $('#loading').hide();
       }
       else if($scope.data.result==0){
          console.log("error");
          $scope.errormsg=true;
          $scope.showerror=response.data.message;
          $('#loading').hide();
       }
    });
  }
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Promote Controller
app.controller('EventPromoteController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$rootScope){
  $scope.headerTitle="Promotion";
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  //fetching local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Promote';
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}  
  $scope.setOffset = function(d){ return GetDataService.userOffsetTime(d,$scope.currentval.eo); };
  $scope.chtype='';
  $scope.channelList=[];
  //fetching channels
  $scope.getChannel =function(){
    $('#loading').show();
     GetDataService.getPromotion($scope.currentval.event_code).then(function(res){
        if(res.result ==1){
          $scope.channelList=res.booking_channel_data;
          console.log($scope.channelList);
          $('#loading').hide();
          $('#container').fadeIn();
        }
     });  
  }
  $scope.getChannel();
  $scope.urlvalid=true;  
  $scope.urlvalidation=function () {
    $scope.urlvalid=true; 
    $scope.promotedisable=false;
    if($scope.url.length>7){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{2}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.url)){
        $scope.urlvalid=false;
      }else{
        $scope.urlvalid=true;
      }
    }
  };
  //select type create or update channel
  //type- create or update
  //c- channel need to update
  $scope.ChannelType = function(type,c){
    $scope.promotedisable=false;
    $scope.title='Add';
    $scope.chtype=type;
    $scope.urltitle='';
    $scope.url='';
    $scope.errstatus=false;
    $scope.showfrom=true;
    if(type=='update'){
      $scope.promotedisable=true;
      $scope.title='Update';
      $scope.urltitle=c.tittle;
      $scope.url=c.url;
      $scope.upCode=c.booking_channel_code;
      $scope.urlvalid=false;
    }
    $timeout(function(){$('#urltitle').focus();},100);
  };
  //create or update channel api call
  $scope.SendData =function(){
    $('#loading').show();
    if($scope.chtype=='create'){
      $http({method:'POST',
                 url:YaraBaseUrl.url+'/booking_channel/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     tittle:$scope.urltitle,
                     url:$scope.url
                 }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
                $scope.showfrom=false;
                $scope.submitted=false;
                $scope.getChannel();
             }else if($scope.data.result==0){
                $scope.errstatus=true;
                $scope.errmsg=$scope.data.message;
             }else{
                $scope.errstatus=true;
                $scope.errmsg=GetDataService.errorMsg[1];
             }
             $('#loading').hide();
             $('#container').fadeIn();
          },function error(response){
            $scope.errstatus=true;
            if(response.status==-1 || response.data==null){
                    $scope.errmsg=GetDataService.errorMsg[0];
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
         });
    }else if($scope.chtype=='update'){
      $('#loading').show();
      $http({method:'POST',
                 url:YaraBaseUrl.url+'/booking_channel_edit/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     tittle:$scope.urltitle,
                     url:$scope.url,
                     booking_channel_code:$scope.upCode,
                     opp:'edit'
                 }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
                $scope.getChannel();
                $scope.showfrom=false;
             }else if($scope.data.result==0){
                $scope.errstatus=true;
                $scope.errmsg=$scope.data.message;
             }else{
                $scope.errstatus=true;
                $scope.errmsg=GetDataService.errorMsg[1];
             }
             $('#loading').hide();
             $('#container').fadeIn();
          },function error(response){
            $scope.errstatus=true;
            if(response.status==-1 || response.data==null){
                    $scope.errmsg=GetDataService.errorMsg[0];
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
         });
    }
  };
  // before delete channel
  //n- channel url
  //code- channel data
  $scope.delChannel = function(n,code){
    $scope.delCode=code.booking_channel_code;
    $scope.delUrltitle=n;
    $scope.errstatus=false;
  };
  //api delete channel
  $scope.deleteChannel = function(){
    $('#loading').show();
    $http({method:'POST',
                 url:YaraBaseUrl.url+'/booking_channel_edit/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     booking_channel_code:$scope.delCode,
                     opp:'delete'
                 }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
                $scope.getChannel();
                $('#adspace-delete').modal('hide');
             }else if($scope.data.result==0){
                $scope.errstatus=true;
                $scope.errmsg=$scope.data.message;
             }else{
                $scope.errstatus=true;
                $scope.errmsg=GetDataService.errorMsg[1];
             }
             $('#loading').hide();
          },function error(response){
            $scope.errstatus=true;
            if(response.status==-1 || response.data==null){
                    $scope.errmsg=GetDataService.errorMsg[0];
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
         });
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//sponsor controller
app.controller('EventSponsorController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$anchorScroll','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$anchorScroll,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Sponsors";
  //fetch from local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Sponsor';
    $scope.dashboardsUrl = GetDataService.dashboardUrl();
  }
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  $scope.locationHref=window.location.pathname;
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.spMail = "";
  $scope.spMailList = [];
  $scope.duplicates = [];
  $scope.duplicateMail=false;
  $anchorScroll();
  //sponser search
  $scope.sponsersearch="";
  $scope.searchonsponser = function(s) {
    return (s.name.toLowerCase() + s.sponsorship_type.toLowerCase() + s.rank).indexOf($scope.sponsersearch.toLowerCase()) >= 0;
  };
   // sprting for sponser
  $scope.sort="name";
  $scope.sorting_list=function(sortorder) {
    if (sortorder==0) {
      $scope.sort="name";
    }else{
      $scope.sort="rank"
    }
    $anchorScroll();
  };
  //check socail data
  $scope.checkSocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.SPweb.length>8){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.SPtwitter.length>20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.SPfb.length>25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.SPlin.length>25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.SPpinterest.length>26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.SPtumblr.length>0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.SPgithub.length>19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.SPinstagram.length>26){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
          console.log("reach");
          console.log(currId);

    if(flag==1){
      $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
  }
  $scope.checkScocialDisabled= function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>=7){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb)){
          flag=1;              
      }else if($scope.Tcmpyweb.length==7){
        flag=1;      }
      else{
        flag=0;          
      }
    }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>=26){
      flag=1; 
    }
    // $timeout(function(){
      if(flag==1){
        $scope.isSocialSave=true;
      }else{
        $scope.isSocialSave=false;
      }
    // }, 500);    
  };
  //watch when socail link changes
  $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
    $scope.checkScocialDisabled();
  });
  // update socail link 
  $scope.updateSocials = function(){
    var s=['company-website','twitter','facebook','linkedin','pinterest','tumblr','git-hub','instagram'];
    for(var i=0;i<s.length;i++){
      var flag=0;
      if(s[i]=='company-website' && $scope.SPweb.length>8){
        flag=1;
      }else if(s[i]=='twitter' && $scope.SPtwitter.length>20){
        flag=1; 
      }else if(s[i]=='facebook' && $scope.SPfb.length>25){
        flag=1; 
      }else if(s[i]=='linkedin' && $scope.SPlin.length>25){
        flag=1; 
      }else if(s[i]=='pinterest' && $scope.SPpinterest.length>26){
        flag=1; 
      }else if(s[i]=='tumblr' && $scope.SPtumblr.length>0){
        flag=1; 
      }else if(s[i]=='git-hub' && $scope.SPgithub.length>19){
        flag=1; 
      }else if(s[i]=='instagram' && $scope.SPinstagram.length>26){
        flag=1; 
      }
      var currId= GetDataService.getSocailId(s[i]);
      if(flag==1){
        $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
  };
  // save social links
  $scope.saveSocials =function(){
    $scope.updatedisable=false;
    $scope.typeofchange='save';
    $scope.SPweb =$scope.Tcmpyweb;
    $scope.SPfb = $scope.Tcmpyfb;
    $scope.SPtwitter = $scope.Tcmpytwitter;
    $scope.SPlin = $scope.Tcmpylink;
    $scope.SPpinterest =  $scope.Tcmpypinterest;
    $scope.SPtumblr = $scope.Tcmpytumblr;
    $scope.SPgithub = $scope.Tcmpygithub;
    $scope.SPinstagram =  $scope.Tcmpyinstagram;
    $scope.checkSocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
  });
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
      $scope.checkScocialDisabled();
       setTimeout(function (){
         $('#'+$scope.social_type+'_id').focus();
         var len= $('#'+$scope.social_type+'_id').val().length;
         $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
    }, 1000);
  });
  //assign socail link
  function assignsocial(){
      $scope.Tcmpyweb =$scope.SPweb;
      $scope.Tcmpyfb = $scope.SPfb;
      $scope.Tcmpytwitter = $scope.SPtwitter;
      $scope.Tcmpylink = $scope.SPlin;
      $scope.Tcmpypinterest =  $scope.SPpinterest;
      $scope.Tcmpytumblr = $scope.SPtumblr;
      $scope.Tcmpygithub = $scope.SPgithub;
      $scope.Tcmpyinstagram =  $scope.SPinstagram;
  }
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      assignsocial();
      $scope.updateSocials();
    }
  });
  //set croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // cancel crop img
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc="";
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // img upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
    ////console.log('start');
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.updatedisable=false;
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.sponsorform.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.sponsorform.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.sponsorform.cmpylogo.$setValidity('minDimension',true);
                
                if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
              }else{
                $scope.sponsorform.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
           // $scope.imageSrc = result;
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  $scope.s=APPService;
  //fetching sponsor  api
  $scope.getSponsor = function(){
    $('#loading').show();
    $scope.SPdata=[];
    GetDataService.getSponsors($scope.currentval.event_code).then(function(res){
        if(res.result==1){
            $scope.anyenable=res.any_enabled;
            console.log($scope.anyenable)
            $scope.SPdata=res.data;
            $('#loading').hide();
          $('#container').fadeIn();
        }
    });
  };
  // Fetching all event locations if exists
  $scope.eventLocations = function(){
    $scope.showLoc = false;
    GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
        if(res.result==1){
            $scope.evtLoc=res.data;
            if($scope.evtLoc.length>0)
            {
              $scope.showLoc = true;
            }
        }
        else{
             $scope.showLoc = false;
        }
    });
  };
  $scope.locationClick = function(el){
    $scope.spoLocation = el.location; 
    $scope.showLoclist=false;
    $scope.updatedisable=false;
  };
  $scope.isValidLoc=false;
  $scope.locValidation=function(locName){
    $scope.updatedisable=false;
    if(locName!='' && locName!=undefined && locName!=null){
      $scope.isValidLoc=false;
      $scope.isValidLoc = GetDataService.validateLocation(locName);
    }
    console.log($scope.isValidLoc);
  };  
  //error validation and scroll to error
  $scope.errorScroll = function(){
    if($scope.invalidSPname==false && $scope.diplicte==false && $scope.sponsorform.$valid && !$scope.imageSrc){
     $timeout(function(){
      console.log($scope.spMail.length, $scope.spMail)
        APPService.scrollJquery('errorImg');
      },100);
    }else if ($scope.invalidSPname) { 
      $timeout(function(){
        APPService.scrollJquery('sponsorname');
      },100);
    }else if ($scope.invalidSPname==false && $scope.invalidMail ||  $scope.invalidSPname==false && $scope.diplicte || $scope.invalidSPname==false && $scope.spMail.length==0 || $scope.spMailList.length==0 && $scope.spMail.length==0) {
      $timeout(function(){
        APPService.scrollJquery('sponserid');
      },100);
    }
  };
  $scope.getSponsor();
  $scope.selectUpdateVal="";   
  $scope.SPtype="";
  $scope.cancelscroll=function () {
     $anchorScroll();   
  };
  $scope.countmails = false;
  $scope.addEmail = function(code){
    $scope.diplicte=false;
     $('#sponserid').focus();
     var mails = {
         mailSp: $scope.spMail,
         dupe: false
     };
     if (code == undefined) {
         if ($scope.emailcountsam <= 10) {
             $scope.spMailList.push(mails);
             $scope.duplicates.push(false);
             if ($scope.SPtype == 'update') {
                 $scope.checkEmaildeletion($scope.spMail, 'add');
             }
             $scope.spMail = "";
             $scope.checkMail();
             $scope.countmails = false;
         } else {
             $scope.countmails = true;
         }
     } else {
         if (isNaN($scope.emailcountsam) == true || $scope.emailcountsam < 9 || $scope.emailcountsam == undefined) {
             $scope.spMailList.push(mails);
             $scope.duplicates.push(false);
             if ($scope.SPtype == 'update') {
                 $scope.checkEmaildeletion($scope.spMail, 'add');
             }
             $scope.spMail = "";
             $scope.checkMail();
             $scope.countmails = false;
             $scope.emailcountsam++;
         } else {
             $scope.countmails = true;
         }
     }
  };
  $scope.dupemail=function () {
    $scope.diplicte=false;
    $scope.updatedisable=false;
    for (var i = 0; i < $scope.spMailList.length; i++) {
      if ($scope.spMailList[i].mailSp==$scope.spMail) {
        $scope.diplicte=true;
      }
    }
    console.log($scope.diplicte)
  }
  $scope.validateMail = function(mail){
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(mail))  
    {  
      return true;
    }  
      return false;  
  };
  $scope.checkMail=function(ind, value){
        $scope.duplicateMail=false;
              var arr = [];
              angular.forEach($scope.spMailList,function(value,key){
                if($scope.spMailList[key]!=undefined){
                    var info={
                      mail:$scope.spMailList[key].mailSp,
                      key:key,
                    }
                    arr.push(info);
                    $scope.duplicates[key]=false;
                }
              });
          arr = arr.sort(function(a, b){
              var x = a.mail.toLowerCase();
              var y = b.mail.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
              var sorted_arr = arr;
              for (var i = 0; i < arr.length - 1; i++) {
                  if (sorted_arr[i + 1].mail.toLowerCase() == sorted_arr[i].mail.toLowerCase()) {
                       $scope.duplicates[sorted_arr[i+1].key]=true;
                        $scope.duplicateMail = true;
                        // $timeout(function(){
                        //   APPService.scrollJquery('dupe');
                        // },100);
                  }
              }
            if (ind!=undefined && value!=undefined) {
              var main='invalidmails'+ind;
              $scope[main]=false;
              if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(value))  
              {  
                $scope[main]=false
              }else{
                $scope[main]=true
              }
            }
  };
  $scope.removeEmail=function(mailInfo,index){
    if ($scope.defaultcode==10) {
      $scope.spMailList.splice(index,1);
      $scope.duplicates.splice(index,1);
      if($scope.SPtype=='update'){
        $scope.checkEmaildeletion(mailInfo.mailSp,'rev');
      }
      $scope.countmails=true;
    }else{
      $scope.spMailList.splice(index,1);
      $scope.duplicates.splice(index,1);
      if($scope.SPtype=='update'){
        $scope.checkEmaildeletion(mailInfo.mailSp,'rev');
      }
      if ($scope.emailcountsam>$scope.defaultcode) {
        $scope.emailcountsam--;
        $scope.countmails=false;
      }
    }
    $scope.checkMail();
    $scope.dupemail();
  };
  // checking deletion of existing email
  $scope.checkEmaildeletion = function(mail,type){
      angular.forEach($scope.preferenceInfo,function(value,key){
          if($scope.preferenceInfo[key].email ==mail){
              if(type=='add'){
                    $scope.preferenceInfo[key].is_deleted=0;
              }
              else{
                  $scope.preferenceInfo[key].is_deleted=1;
              }
          }
      });
  };
  // select type create or update sponsor type
  $scope.changeSP=function(type,val, emailval, isenabled){
    $scope.emailcountsam=emailval;
    $scope.defaultcode=emailval;
    $anchorScroll();
    $scope.spoLocation="";
    $scope.spMailList=[];
    $scope.spMail="";;
    $scope.eventLocations();
    $timeout(function(){$('#sponsorname').focus();},500);
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
     $scope.SPtype=type;
     $scope.submitted=true;
     $scope.updatedisable=false;
     $scope.error=false;
     $scope.selectval=[];
     $scope.Updateday=[];
     if(type=='create'){
        $scope.SPTitle='Add Sponsor';
        $scope.rank="";
        $scope.desc="";
        //$scope.cmpylogo="";
        $scope.name="";
        $scope.SPweb="";
        $scope.SPtwitter="";
        $scope.SPlin="";
        $scope.SPfb="";
        $scope.email="";
        $scope.createSp=true;
        $scope.btntxt="Submit";
        $scope.SPpinterest='';
        $scope.SPtumblr='';
        $scope.SPgithub='';
        $scope.SPinstagram='';
        $scope.imgrequired=true;
        $scope.imageSrc='';
        $scope.locationCode='';
        $scope.SPSHType='';
        $scope.spMail = "";
        $scope.spMailList = [];
        $scope.duplicates = [];
        $scope.duplicateMail=false;
        $scope.invalidMail=false;
        $scope.preferenceInfo = [];
        $scope.showcaseEnable=0;
        assignsocial();
        $scope.updateSocials();
     } else if(type=='update'){
       $scope.updatedisable=true;
       $scope.createSp=true;
       $scope.error=false;
       $scope.imgrequired=false;
       $scope.selectUpdateVal=val;
       $scope.SPTitle='Update Sponsor';
       $scope.btntxt="Save";
       $scope.SPpinterest='';
       $scope.SPtumblr='';
        $scope.SPgithub='';
        $scope.SPinstagram='';
        if (isenabled) {
        $scope.showcaseEnable=1;
       }else{
        $scope.showcaseEnable=0;
       }
       angular.forEach($scope.SPdata,function(sp){
                if(sp.username==val){
                    $scope.rank=sp.rank;
                    $scope.desc=sp.description;
                    $scope.name=sp.name;
                    angular.forEach(sp.social_providers,function(s){
                      if(s.social_provider=="Website")
                         $scope.SPweb=s.link;
                      else if(s.social_provider=="Twitter")
                          $scope.SPtwitter=s.link;
                      else if(s.social_provider=="LinkedIn")
                          $scope.SPlin=s.link;
                      else if(s.social_provider=="Facebook")
                         $scope.SPfb=s.link;
                      else if(s.social_provider=="Pinterest")
                         $scope.SPpinterest=s.link;
                      else if(s.social_provider=="GitHub")
                        $scope.SPgithub=s.link;
                      else if(s.social_provider=="Instagram")
                         $scope.SPinstagram=s.link;
                      else if(s.social_provider=="Tumblr")
                         $scope.SPtumblr=s.link;
                    });
                    $scope.email=sp.email;
                    $scope.picChange=0;
                    $scope.SPSHType=sp.sponsorship_type;
                    $scope.imageSrc=sp.profile_picture;
                    $scope.restImage=sp.profile_picture;
                    if (sp.location!=null) {
                      $scope.spoLocation=sp.location.location_name;
                    }                    
                    if(sp.days!= undefined){
                      if(sp.days.length==$scope.dayscount){
                          $scope.alldayaccess=true;
                      }else{
                          $scope.alldayaccess=false;
                          $scope.selectval=$scope.Updateday=sp.days;
                      }
                    }
                    $scope.sponsor_code = sp.sponsor_code;
                    // emails
                    $scope.spMail = "";
                    $scope.spMailList = [];
                    $scope.duplicates = [];
                    $scope.duplicateMail=false;
                    $scope.invalidMail=false;
                    $scope.preferenceInfo = [];
                    angular.forEach(sp.preferences,function(value,key){
                        console.log(sp.preferences[key].email);
                        $scope.spMail = sp.preferences[key].email;
                        // $scope.preferenceInfo.push(sp.preferences[key]);
                        var forDeleteEmails={
                          "email":sp.preferences[key].email,
                          "preference":sp.preferences[key].preference,
                          "is_deleted":0
                        };
                        $scope.preferenceInfo.push(forDeleteEmails);
                        $scope.addEmail();
                    });
                    console.log($scope.preferenceInfo);

                }
        });
        assignsocial();
        $scope.updateSocials();
     }
      $timeout(function() {
          $('textarea').each(function() {
              h(this);
          });
      }, 500);
  };
  $scope.selectval=[];
  //select date of sponsoring, d - date
  $scope.selectedtype = function(d){
    if($scope.selectval.indexOf(d)>=0){
      $scope.selectval.splice($scope.selectval.indexOf(d),1);
    }else{
      $scope.selectval.push(d);
    } 
  };
  // check track name 
  $scope.invalidSPname=false;
  $scope.checkSponsername=function () {
    $scope.invalidSPname=false;
    $scope.updatedisable=false;
    if ($scope.name!=undefined) {
      var sponsername=$scope.name.toLowerCase();
      var regExp4 = /^sponsor[1-9][0-9]*$/;
      var regExp5 = /^sponsor[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp6 = /^sponsor no[^a-zA-Z0-9][0-9][0-9]*$/;
      if (sponsername=="sponsor") {
        $scope.invalidSPname=true;
      }else if (regExp4.test(sponsername) || regExp5.test(sponsername) || regExp6.test(sponsername)) {
        $scope.invalidSPname=true;
      }
    }    
  };
  //create or update sponsor api
  $scope.addAttendForm= function(){
    $('#loading').show();
    var mails = {
                mailSp:$scope.spMail,
                dupe:false
    };
    $scope.spMailList.push(mails);
    $scope.duplicates.push(false);
    if($scope.SPtype=='update'){
        $scope.checkEmaildeletion($scope.spMail,'add');
    }
    $scope.spMail="";
    $scope.checkMail();
    $scope.existLocation=false;
    if($scope.showLoc){
        angular.forEach($scope.evtLoc,function(value,key){
              if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                $scope.existLocation=true;
                $scope.locationCode=$scope.evtLoc[key].location_code
              }
        });
    }
    var preference = [];
    var preferenceCount = 0;
    angular.forEach($scope.spMailList,function(value,key){
          var validMail=$scope.validateMail($scope.spMailList[key].mailSp);
          if(validMail==true){
            preferenceCount++;
            var emailInfo = {
              'email':$scope.spMailList[key].mailSp,
              'preference':preferenceCount
            }
              preference.push(emailInfo);
          }
    });
    if($scope.SPtype=='update'){
          angular.forEach($scope.preferenceInfo,function(value,key){

              if($scope.preferenceInfo[key].is_deleted==1){
                        var forDeleteEmails={
                          'email':$scope.preferenceInfo[key].email,
                          'preference':Number($scope.preferenceInfo[key].preference),
                          'is_deleted':1
                        };
                        preference.push($scope.preferenceInfo[key]);
              }
          });                  
    }
    var fd=new FormData();
    fd.append('event_code',$scope.currentval.event_code); 
    fd.append('rank',$scope.rank);
    fd.append('description',$scope.desc);
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('profile_picture',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('profile_picture','');
    }
    //fd.append('profile_picture',$scope.cmpylogo);
    var temp=[{
      'social_provider': 'Website',
      'link': $scope.SPweb
    },{
      'social_provider': 'Twitter',
      'link': $scope.SPtwitter
    },{
      'social_provider': 'Facebook',
      'link': $scope.SPfb
    },{
      'social_provider': 'LinkedIn',
      'link':$scope.SPlin
    },{
      'social_provider': 'Pinterest',
      'link': $scope.SPpinterest
    },{
      'social_provider': 'Tumblr',
      'link': $scope.SPtumblr
    },{
      'social_provider': 'GitHub',
      'link': $scope.SPgithub
    },{
      'social_provider': 'Instagram',
      'link': $scope.SPinstagram
    }
    ];
   fd.append('social_providers',angular.toJson(temp));
   fd.append('sponsor_name',$scope.name);
   fd.append('showcase_enable',$scope.showcaseEnable); 
   fd.append('preferences',angular.toJson(preference));
   fd.append('sponsorship_type',$scope.SPSHType);
   // fd.append('showcase',false);
   if ($scope.spoLocation != '') {
      if($scope.locationCode!=null && $scope.locationCode!=undefined && $scope.locationCode!=''){
         fd.append('location',$scope.locationCode);
      }
      else{
          fd.append('location',$scope.spoLocation);
      }
   }
   fd.append('is_location_exist',$scope.existLocation);
   var selecteddays=[];
   if($scope.alldayaccess==false){
       selecteddays=$scope.selectval;
   }else{
       selecteddays=$scope.dates;
   }
   if($scope.alldayaccess==false && selecteddays.length==0){
       selecteddays=$scope.dates;
   }
   fd.append('days',angular.toJson(selecteddays));
   if($scope.SPtype=='create'){
       $http({method:'POST',
              url:YaraBaseUrl.url+'/sponsor/',
              data:fd,
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
       }).then(function success(response){
           $scope.cdata=response.data;
           console.log(response);
           if($scope.cdata.result==1){
              $scope.createSp=false;
               $scope.getSponsor();
               // if ($scope.anyenable==false) {
                  // if ($scope.showcaseEnable==1) {
                  //   $("#myModal-sponsor").modal('show');
                  //  }
               // }               
           }else{
            $scope.error=true;
            $scope.errormsg=$scope.cdata.message;
            $('#loading').hide();
           }
       });
   }else if($scope.SPtype=='update'){
       fd.append('sponsor_code',$scope.sponsor_code);
       fd.append('opp','edit');
       var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
       if(len<=0){
         $scope.picChange=0;
        }else{
          $scope.picChange=1;
        }
       fd.append('new_picture',$scope.picChange);
       $http({method:'POST',
              url:YaraBaseUrl.url+'/sponsor_edit/',
              data:fd,
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
       }).then(function success(response){
            $scope.udata=response.data;
           if($scope.udata.result==1){
              $scope.createSp=false;
              $scope.spoLocation="";
               $scope.getSponsor();
           }else{
            $scope.error=true;
            $scope.errormsg=$scope.udata.message;
            $('#loading').hide();
           }
       });
   }
  };
  $scope.nameSP='';
  $scope.deleteuser='';
  // before revoke sponosr
  $scope.setrevoke=function(n,u,sponsor_code){
      $scope.nameSP=(n).trim();
      $scope.deleteuser=sponsor_code;
  };
  //delete sponsor
  $scope.delSponsor=function(){
     $http({method:'POST',
             url:YaraBaseUrl.url+'/sponsor_edit/',
             data:{
                 opp:'delete',
                 event_code:$scope.currentval.event_code,
                 sponsor_code:$scope.deleteuser
             }
      }).then(function success(response){
          if(response.data.result==1){
              $scope.getSponsor();
          }
      });
  };
  $scope.resendMail = function(email,showcase_code){
    $scope.emailid=email;
    $('#loading').show();
    $http({method:'POST',
           url:YaraBaseUrl.url+'/showcase_resend_invitation/',
           data:{
               event_code:$scope.currentval.event_code,
               showcase_code:showcase_code,
               email:email,
               showcase_type:1
           }
    }).then(function success(response){
       $scope.data=response.data;
       if($scope.data.result==1){
          console.log("send mail");
          $('#loading').hide();
          $("#modal-resendMail").modal('show');
       }
       else if($scope.data.result==0){
          console.log("error");
          $scope.errormsg=true;
          $scope.showerror=response.data.message;
          $('#loading').hide();
       }
    });
  };
  //disable sponsor 
  $scope.disablesponsor=function (code, name, disable, type) {
    $scope.associate=false;
    $scope.spocode=code;
    $scope.sponame=name;
    if (disable) {
      $scope.per="disable"
    }else{
      $scope.per="enable"
    }
    $scope.type=type;
    console.log($scope.per)
    // $scope.ShowCase_Permission($scope.spocode, $scope.per, $scope.type);
  };
  $scope.DisSponser=function () {
    $scope.ShowCase_Permission($scope.spocode, $scope.per, $scope.type);
  }
  // sponsor enable disable api
  $scope.ShowCase_Permission = function(uname,permission,type){
    var showcase_type = 2;
    if(type=='sp'){
        showcase_type=1;
    }
    if(permission=='enable'){
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'enable',
                     showcase_type:showcase_type,
                     showcase:false
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                if(type=='sp'){
                  $scope.getSponsor();
                }
                $('#myModal-sponsor-enable').modal('hide');
                // if ($scope.ddata.message_sent==true) {
                //   $("#myModal-sponsor").modal("show");
                // }
             }
          });
    }else if(permission == 'disable'){
        $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'revoke',
                     showcase_type:showcase_type,
                     showcase:false
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                if(type=='sp'){
                  $scope.getSponsor();
                }
                $('#myModal-sponsor-enable').modal('hide');
                $scope.associate=false;
             }else if ($scope.ddata.result==0) {
                $scope.associatesponsor=$scope.ddata.message;
                $scope.associate=true;
             }
          });
    }
  };
  function h(e) {
    $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
   }
   $('textarea').each(function () {
     h(this);
   }).on('input', function () {
     h(this);
   });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Exhibitor api 
app.controller('EventExhibitorController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$document','$timeout','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$document,$timeout,$rootScope,$anchorScroll){
  $scope.headerTitle="Exhibitor";
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // get local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Exhibitor';
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  // var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  // var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  // $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);}; 
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.betdays=function () {
   var start = new Date(st_date),
    end = new Date(ed_date);
    var between = $scope.getDates(start, end);
    $scope.dates=between;
  };
  // This function doing this work.
  $scope.getDates=function(start, end) {
      var datesArray = [];
      var startDate = new Date(start);
      while (startDate <= end) {
          datesArray.push($filter('date')(new Date(startDate), 'yyyy-MM-dd'));
          startDate.setDate(startDate.getDate() + 1);
      }
      return datesArray;
  };
  // $scope.betdays();
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  }); 
  $scope.dates = $scope.eventDaysInfo;  
  console.log($scope.dates);
  // search for exhibitor
  $scope.exhibitorsearch="";
  $scope.searchonexhibitor = function(s) {
    return (s.name.toLowerCase()).indexOf($scope.exhibitorsearch) >= 0;
  };
  // check socail links
  $scope.checkSocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.EXweb.length>7){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.EXtwitter.length>20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.EXfb.length>25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.EXlin.length>25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.EXpinterest.length>26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.EXtumblr.length>0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.EXgithub.length>19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.EXinstagram.length>26){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
    if(flag==1){
      $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
  };
  // check socail link time of update
  $scope.updateSocials = function(){
    var s=['company-website','twitter','facebook','linkedin','pinterest','tumblr','git-hub','instagram'];
    for(var i=0;i<s.length;i++){
      var flag=0;
      if(s[i]=='company-website' && $scope.EXweb.length>7){
        flag=1;
      }else if(s[i]=='twitter' && $scope.EXtwitter.length>20){
        flag=1; 
      }else if(s[i]=='facebook' && $scope.EXfb.length>25){
        flag=1; 
      }else if(s[i]=='linkedin' && $scope.EXlin.length>25){
        flag=1; 
      }else if(s[i]=='pinterest' && $scope.EXpinterest.length>26){
        flag=1; 
      }else if(s[i]=='tumblr' && $scope.EXtumblr.length>0){
        flag=1; 
      }else if(s[i]=='git-hub' && $scope.EXgithub.length>19){
        flag=1; 
      }else if(s[i]=='instagram' && $scope.EXinstagram.length>26){
        flag=1; 
      }
      var currId= GetDataService.getSocailId(s[i]);
      if(flag==1){
        $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
  };
  $scope.checkScocialDisabled= function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>=7){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb)){
        flag=1;        
      }else if($scope.Tcmpyweb.length==7){
        flag=1;      }
      else{
        flag=0;
      }
    }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>=26){
      flag=1; 
    }
    if(flag==1){
      $scope.isSocialSave=true;
    }else{
      $scope.isSocialSave=false;
    }
  };
  //watch when socail link changes
  $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
    $scope.checkScocialDisabled();
  });
  // save social links
  $scope.saveSocials =function(){
    $scope.exhibitordisable=false;
    $scope.typeofchange='save';
    $scope.EXweb =$scope.Tcmpyweb;
    $scope.EXfb = $scope.Tcmpyfb;
    $scope.EXtwitter = $scope.Tcmpytwitter;
    $scope.EXlin = $scope.Tcmpylink;
    $scope.EXpinterest =  $scope.Tcmpypinterest;
    $scope.EXtumblr = $scope.Tcmpytumblr;
    $scope.EXgithub = $scope.Tcmpygithub;
    $scope.EXinstagram =  $scope.Tcmpyinstagram;
    $scope.checkSocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
  });
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
      $scope.checkScocialDisabled();
       setTimeout(function (){
         $('#'+$scope.social_type+'_id').focus();
         var len= $('#'+$scope.social_type+'_id').val().length;
         $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
    }, 1000);
  });
  // assign social links
  function assignsocial(){
      $scope.Tcmpyweb =$scope.EXweb;
      $scope.Tcmpyfb = $scope.EXfb;
      $scope.Tcmpytwitter = $scope.EXtwitter;
      $scope.Tcmpylink = $scope.EXlin;
      $scope.Tcmpypinterest =  $scope.EXpinterest;
      $scope.Tcmpytumblr = $scope.EXtumblr;
      $scope.Tcmpygithub = $scope.EXgithub;
      $scope.Tcmpyinstagram =  $scope.EXinstagram;
  }
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      assignsocial();
      $scope.updateSocials();
    }
  });
  $scope.selectval=[];
  // select exhibiting days
  $scope.selectedtype = function(d){
    $scope.disexhi=false;
    $scope.exhibitordisable=false;
    if($scope.selectval.indexOf(d.dayID)>=0){
      $scope.selectval.splice($scope.selectval.indexOf(d.dayID),1);
    }else{
      $scope.selectval.push(d.dayID);
    }
    if ($scope.selectval.length==0) {
      $scope.disexhi=true;
    }
  };
  // set croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // croped img cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc="";
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
   // //console.log('start');
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    ////console.log()
    $scope.exhibitordisable=false;
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.exhibitorform.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc="";
          }else{
            $scope.exhibitorform.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.exhibitorform.cmpylogo.$setValidity('minDimension',true);
                
                if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
              }else{
                $scope.exhibitorform.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
           // $scope.imageSrc = result;
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
   ////console.log('something Went wrong');
  });
  $scope.s=APPService;
  // fetch exhibitor
  $scope.getExhibitor = function(){
    $('#loading').show();
    GetDataService.getExhibitors($scope.currentval.event_code).then(function(res){
      if(res.result==1){
          $scope.EXdata=res.data;
          $('#loading').hide();
          $('#container').fadeIn();
      }
    });
  };
  // $scope.selectExhibitDay = function(dayId){
  //     angular.forEach($scope.eventDaysInfo,function(value,key){
  //       if(dayId==$scope.eventDaysInfo[key].dayID){
  //           return $scope.eventDaysInfo[key].startTime;
  //       }
  //     });
  // };
   // check exhibitor name
  $scope.invalidExname=false;
  $scope.checkExhibitorname=function () {
    $scope.invalidExname=false;
    $scope.exhibitordisable=false;
    if ($scope.name!=undefined) {
      var exhibitorname=$scope.name.toLowerCase();
      var regExp4 = /^exhibitor[1-9][0-9]*$/;
      var regExp5 = /^exhibitor[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp6 = /^exhibitor no[^a-zA-Z0-9][0-9][0-9]*$/;
      if (exhibitorname=="exhibitor") {
        $scope.invalidExname=true;
      }else if (regExp4.test(exhibitorname) || regExp5.test(exhibitorname) || regExp6.test(exhibitorname)) {
        $scope.invalidExname=true;
      }
    }    
  };
  // Fetching all event locations if exists
  $scope.eventLocations = function(){
    $scope.showLoc = false;
    GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
        if(res.result==1){
            $scope.evtLoc=res.data;
            console.log($scope.evtLoc);
            $scope.showLoc = true;
        }
        else{
             $scope.showLoc = false;
        }
    });
  };
  $scope.eventLocations();
  $scope.isValidLoc=false;
  $scope.locValidation=function(locName){
    $scope.exhibitordisable=false;
    $scope.isValidLoc=false;
    $scope.isValidLoc = GetDataService.validateLocation(locName);
  };
  // $scope.getLocName=function(lcode){
  //   var location="";
  //   for (var i = $scope.evtLoc.length - 1; i >= 0; i--) {
  //     if($scope.evtLoc[i].location_code===lcode){
  //         location=$scope.evtLoc[i].location;
  //         break;
  //     }
  //   };
  //   return location;
  // };
  $scope.locationClick = function(el){
    $scope.spoLocation = el.location; 
    $scope.showLoclist=false;
    $scope.exhibitordisable=false;
  };
  $scope.spMail = "";
  $scope.spMailList = [];
  $scope.duplicates = [];
  $scope.duplicateMail=false;
  $scope.countmails=false;
  $scope.addEmail = function(code) {
    $scope.diplicte=false;
      $('#exhifocus').focus();
      var mails = {
          mailSp: $scope.spMail,
          dupe: false
      };
      if (code==undefined) {
        if ($scope.emailcountsam <= 10) {
          $scope.spMailList.push(mails);
          $scope.duplicates.push(false);
          if ($scope.EXType == 'update') {
              $scope.checkEmaildeletion($scope.spMail, 'add');
          }
          $scope.spMail = "";
          $scope.checkMail();
          $scope.countmails=false;
  
        }else{
          $scope.countmails=true;
        }
      }else{
        if ($scope.emailcountsam == undefined || $scope.emailcountsam < 9 || isNaN($scope.emailcountsam) == true) {
          $scope.spMailList.push(mails);
          $scope.duplicates.push(false);
          if ($scope.EXType == 'update') {
              $scope.checkEmaildeletion($scope.spMail, 'add');
          }
          $scope.spMail = "";
          $scope.checkMail();
          $scope.countmails=false;
          if (code!=undefined) {
            $scope.emailcountsam++;
          }
        }else{
          $scope.countmails=true;
        }
      }
  };
  $scope.dupemail=function () {
    $scope.diplicte=false;
    $scope.exhibitordisable=false;
    for (var i = 0; i < $scope.spMailList.length; i++) {
      if ($scope.spMailList[i].mailSp==$scope.spMail) {
        $scope.diplicte=true;
      }
      
    }
  }
  $scope.validateMail = function(mail){
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(mail))  
    {  
      return true;
    }  
      return false;  
  };
  $scope.checkMail=function(ind, value){
        $scope.duplicateMail=false;
              var arr = [];
              angular.forEach($scope.spMailList,function(value,key){
                if($scope.spMailList[key]!=undefined){
                    var info={
                      mail:$scope.spMailList[key].mailSp,
                      key:key,
                    }
                    arr.push(info);
                    $scope.duplicates[key]=false;
                }
              });

          arr = arr.sort(function(a, b){
              var x = a.mail.toLowerCase();
              var y = b.mail.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
              var sorted_arr = arr;
              for (var i = 0; i < arr.length - 1; i++) {
                  if (sorted_arr[i + 1].mail.toLowerCase() == sorted_arr[i].mail.toLowerCase()) {
                       $scope.duplicates[sorted_arr[i+1].key]=true;
                        $scope.duplicateMail = true;
                        // $timeout(function(){
                        //   APPService.scrollJquery('dupe');
                        // },100);
                  }
              }
        if (ind!=undefined && value!=undefined) {
              var main='invalidmails'+ind;
              $scope[main]=false;
              if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(value))  
              {  
                $scope[main]=false;
              }else{
                $scope[main]=true;
              }
            }
  };
  $scope.removeEmail=function(mailInfo,index){
    if ($scope.defaultcode==10) {
      $scope.spMailList.splice(index,1);
      $scope.duplicates.splice(index,1);
      if($scope.EXType=='update'){
        $scope.checkEmaildeletion(mailInfo.mailSp,'rev');
      }
      $scope.countmails=true;
    }else{
      $scope.spMailList.splice(index,1);
      $scope.duplicates.splice(index,1);
      if($scope.EXType=='update'){
        $scope.checkEmaildeletion(mailInfo.mailSp,'rev');
      }
      if ($scope.emailcountsam>$scope.defaultcode) {
        $scope.emailcountsam--;
        $scope.countmails=false;
      }
    }  
    $scope.checkMail();
    $scope.dupemail();
  };
  // checking deletion of existing email
  $scope.checkEmaildeletion = function(mail,type){
      angular.forEach($scope.preferenceInfo,function(value,key){
          if($scope.preferenceInfo[key].email ==mail){
              if(type=='add'){
                    $scope.preferenceInfo[key].is_deleted=0;
              }
              else{
                  $scope.preferenceInfo[key].is_deleted=1;
              }
          }
      });
  };
  // validate and error scrolling
  $scope.errorScroll = function(){
      if($scope.invalidExname==false && $scope.diplicte==false && $scope.exhibitorform.$valid && !$scope.imageSrc){
       $timeout(function(){
          APPService.scrollJquery('errorImg');
        },100);
      }else if($scope.invalidExname){
        $timeout(function(){
          APPService.scrollJquery('exhibiname');
        },100);
      }else if ($scope.invalidExname==false && $scope.invalidMail ||  $scope.invalidExname==false && $scope.diplicte || $scope.invalidExname==false && $scope.spMail.length==0) {
        $timeout(function(){
          APPService.scrollJquery('exhifocus');
        },100);
      }
  };
  $scope.getExhibitor();
  $scope.scroll=function () {
    $anchorScroll(); 
  };
  $scope.EXType='';
  $scope.EXUpdateVal='';
  $scope.Updateday=[];
  // select create or update exhibitor 
  $scope.ChangeType=function(type,val,emailval, isenabled){ 
    $scope.emailcountsam=emailval;
    $scope.defaultcode=emailval;
    $scope.checkSocials();
    $scope.eventLocations();
    $anchorScroll(); 
    $timeout(function(){$('#exhibiname').focus();},500);
    $scope.exhibitordisable=false;
    $scope.spoLocation="";
      $scope.EXType=type;
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
      if(len>0 ){
        angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
          model.setType(4);
        });
      }
      $scope.imageSrc="";
      $scope.submitted=true;
      $scope.selectval=[];
      $scope.error=false;
      if(type=='create'){
        $scope.desc="";
        $scope.name="";
        $scope.locationCode='';
        $scope.EXweb="";
        $scope.EXfb="";
        $scope.EXtwitter="";
        $scope.email="";
        $scope.EXlin="";
        $scope.EXloc ="";
        $scope.Updateday=[];
        $scope.createEx=true;
        $scope.alldayaccess=true;
        $scope.btntxt="Submit";
        $scope.imgrequired=true;
        $scope.imageSrc='';
        $scope.EXpinterest='';
        $scope.EXtumblr='';
        $scope.EXgithub='';
        $scope.EXinstagram='';
        $scope.spMail = "";
        $scope.spMailList = [];
        $scope.duplicates = [];
        $scope.duplicateMail=false;
        $scope.invalidMail=false;
        $scope.preferenceInfo = [];
        $scope.showcaseEnable=0;
        $scope.Title="Add New Exhibitor";
        assignsocial();
        $scope.updateSocials();
      } else if(type=='update'){
          $scope.exhibitordisable=true;
          $scope.EXUpdateVal=val;
          $scope.imgrequired=false;
          $scope.createEx=true;
          $scope.btntxt="Save";
          $scope.Title="Update Exhibitor";
          $scope.picChange=0;
          $scope.EXpinterest='';
          $scope.Updateday=[];
          $scope.EXtumblr='';
          $scope.EXgithub='';
          $scope.EXinstagram='';
          if (isenabled) {
           $scope.showcaseEnable=1;
          }else{
           $scope.showcaseEnable=0;
          }
          angular.forEach($scope.EXdata,function(ex){
                  if(ex.username==val){
                      $scope.desc=ex.description;
                      $scope.name=ex.name;
                      angular.forEach(ex.social_providers,function(s){
                        if(s.social_provider=="Website")
                           $scope.EXweb=s.link;
                        else if(s.social_provider=="Twitter")
                            $scope.EXtwitter=s.link;
                        else if(s.social_provider=="LinkedIn")
                            $scope.EXlin=s.link;
                        else if(s.social_provider=="Facebook")
                           $scope.EXfb=s.link;
                        else if(s.social_provider=="Pinterest")
                           $scope.EXpinterest=s.link;
                        else if(s.social_provider=="GitHub")
                          $scope.EXgithub=s.link;
                        else if(s.social_provider=="Instagram")
                           $scope.EXinstagram=s.link;
                        else if(s.social_provider=="Tumblr")
                           $scope.EXtumblr=s.link;
                          
                      });
                      $scope.spoLocation=ex.location.location_name;
                      angular.forEach($scope.evtLoc,function(value,key){
                            if($scope.evtLoc[key].location_code===ex.location){
                              $scope.locationClick($scope.evtLoc[key]);
                            }
                      });
                     /* $scope.EXweb=ex.website;
                      $scope.EXfb=ex.facebook;
                      $scope.EXtwitter=ex.twitter;*/
                      // $scope.email=ex.contact_email;
                      /*$scope.EXlin=ex.linkedin;*/
                      // $scope.EXloc =ex.location;
                      $scope.imageSrc=ex.profile_picture;
                      $scope.restImage=ex.profile_picture;
                      if(ex.days.length==$scope.dayscount){
                          $scope.alldayaccess=true;
                      }else{
                          $scope.alldayaccess=false;
                          $scope.selectval = [];
                          angular.forEach(ex.days,function(value,key){
                              $scope.selectval.push(ex.days[key].day_id)
                          });
                          $scope.Updateday=$scope.selectval;
                      }
                      $scope.exhibitor_code = ex.exhibitor_code;
                      // emails
                      $scope.spMail = "";
                      $scope.spMailList = [];
                      $scope.duplicates = [];
                      $scope.duplicateMail=false;
                      $scope.invalidMail=false;
                      $scope.preferenceInfo = [];
                      angular.forEach(ex.preferences,function(value,key){
                          $scope.spMail = ex.preferences[key].email;
                          var forDeleteEmails={
                            "email":ex.preferences[key].email,
                            "preference":ex.preferences[key].preference,
                            "is_deleted":0
                          };
                          $scope.preferenceInfo.push(forDeleteEmails);  
                          $scope.addEmail();
                      });
                  }
          });
          assignsocial();
          $scope.updateSocials();
      }
      $timeout(function() {
        $('textarea').each(function() {
            h(this);
        });
      }, 500);

  };
  $scope.exbialldayaccess=function () {
    if ($scope.alldayaccess==false) {
      $scope.disexhi=true;
    }else{
      $scope.disexhi=false;
    }
  };
  // create or update exhibitor api
  $scope.addAttendForm= function(){
    var mails = {
              mailSp:$scope.spMail,
              dupe:false
    };
    $scope.spMailList.push(mails);
    $scope.duplicates.push(false);
    if($scope.EXType=='update'){
        $scope.checkEmaildeletion($scope.spMail,'add');
    }
    $scope.checkMail();
    $scope.existLocation=false;
    if($scope.showLoc){
        angular.forEach($scope.evtLoc,function(value,key){
              if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                $scope.existLocation=true;
                $scope.locationCode=$scope.evtLoc[key].location_code
              }
        });
    }
    var preference = [];
    var preferenceCount = 0;
    angular.forEach($scope.spMailList,function(value,key){
          var validMail=$scope.validateMail($scope.spMailList[key].mailSp);
          if(validMail==true){
            preferenceCount++;
            var emailInfo = {
              'email':$scope.spMailList[key].mailSp,
              'preference':preferenceCount
            }
              preference.push(emailInfo);
          }
    });
    if($scope.EXType=='update'){
      angular.forEach($scope.preferenceInfo,function(value,key){
          if($scope.preferenceInfo[key].is_deleted==1){
            var forDeleteEmails={
              'email':$scope.preferenceInfo[key].email,
              'preference':Number($scope.preferenceInfo[key].preference),
              'is_deleted':1
            };
            preference.push($scope.preferenceInfo[key]);
          }
      });
    }
    var fd=new FormData();
    fd.append('event_code',$scope.currentval.event_code); 
    fd.append('showcase_enable',$scope.showcaseEnable); 
    fd.append('description',$scope.desc);
    // fd.append('showcase',false);
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('profile_picture',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('profile_picture','');
    }
    fd.append('exhibitor_name',$scope.name);
    var temp=[{
      'social_provider': 'Website',
      'link': $scope.EXweb
    },{
      'social_provider': 'Twitter',
      'link': $scope.EXtwitter
    },{
      'social_provider': 'Facebook',
      'link': $scope.EXfb
    },{
      'social_provider': 'LinkedIn',
      'link':$scope.EXlin
    },{
      'social_provider': 'Pinterest',
      'link': $scope.EXpinterest
    },{
      'social_provider': 'Tumblr',
      'link': $scope.EXtumblr
    },{
      'social_provider': 'GitHub',
      'link': $scope.EXgithub
    },{
      'social_provider': 'Instagram',
      'link': $scope.EXinstagram
    }
    ];
    fd.append('social_providers',angular.toJson(temp));
    fd.append('preferences',angular.toJson(preference));
    if($scope.locationCode!=null && $scope.locationCode!=undefined && $scope.locationCode!=''){
           fd.append('location',$scope.locationCode);
     }
     else{
          fd.append('location',$scope.spoLocation);
     }
     fd.append('is_location_exist',$scope.existLocation);
     var selecteddays=[];
     if($scope.alldayaccess==false){
         selecteddays=$scope.selectval;
     }else{
        // selecteddays=$scope.dates;
        angular.forEach($scope.dates,function(value,key){
              if($scope.dates[key].isDayActive==1){
                selecteddays.push($scope.dates[key].dayID);
              }
        });
     }
     if($scope.alldayaccess==false && selecteddays.length==0){
         angular.forEach($scope.dates,function(value,key){
              if($scope.dates[key].isDayActive==1){
                selecteddays.push($scope.dates[key].dayID);
              }
        });
     }
     $('#loading').show();
     console.log(selecteddays);
     console.log(angular.toJson(selecteddays));
     fd.append('days',angular.toJson(selecteddays));
     if($scope.EXType=='create'){
      $http({method:'POST',
        url:YaraBaseUrl.url+'/exhibitor/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.spMail='';
         $scope.cdata=response.data;
             if($scope.cdata.result==1){
                $scope.spoLocation = "";
                $scope.createEx=false;
                 $scope.getExhibitor();
                 // if ($scope.showcaseEnable==1) {
                 //  $('#myModal-exhibitor-disable').modal('show');
                 // }
                 $anchorScroll(); 
             }else{
              $scope.error=true;
              $scope.errormsg=$scope.cdata.message;
             }
             $('#loading').hide();
      });
     }
     else  if($scope.EXType=='update'){
         fd.append('exhibitor_code',$scope.exhibitor_code);
         fd.append('opp','edit');
         var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
         if(len<=0){
           $scope.picChange=0;
          }else{
            $scope.picChange=1;
          }
         fd.append('new_picture',$scope.picChange);
         $http({method:'POST',
                url:YaraBaseUrl.url+'/exhibitor_edit/',
                data:fd,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
         }).then(function success(response){
             $scope.udata=response.data;
             if($scope.udata.result==1){
                $scope.spoLocation = "";
                $scope.createEx=false;
                 $scope.getExhibitor();
                 $anchorScroll(); 
             }else{
              $scope.error=true;
              $scope.errormsg=$scope.udata.message;
             }
             $('#loading').hide();
         });
     }
  };
  $scope.nameEX='';
  $scope.deleteuser='';
  // before revoking exhibitor , 'n' - exhibitor name and u- user data to delete
  $scope.setrevoke=function(n,u,exhibitor_code){
      $scope.nameEX=(n).trim();
      $scope.deleteuser=exhibitor_code;
  };
  // api to delete user
  $scope.DelEx = function(){
    $http({method:'POST',
             url:YaraBaseUrl.url+'/exhibitor_edit/',
             data:{
                 opp:'delete',
                 event_code:$scope.currentval.event_code,
                 exhibitor_code:$scope.deleteuser
             }
      }).then(function success(response){
          if(response.data.result==1){
              $scope.getExhibitor();
              $('#myModal-exhibitor').modal('hide');
          }
      });  
  };
  $scope.resendMail = function(email,showcase_code){
    $scope.resendemailid=email;
      $('#loading').show();
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_resend_invitation/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:showcase_code,
                     email:email,
                     showcase_type:2
                 }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
              $('#loading').hide();
              $('#modal-resendMail').modal('show')
             }
             else if($scope.data.result==0){
                $scope.errormsg=true;
                $scope.showerror=response.data.message;
             }
          });
  };
  // enable sponsor
  // $scope.enablesponsor=function (code, name, disable, type) {
  //   $scope.spocode=code;
  //   $scope.sponame=name;
  //   $scope.per=disable;
  //   $scope.type=type;
  // }
  //disable sponsor 
  $scope.disablesponsor=function (code, name, disable, type) {
    $scope.spocode=code;
    $scope.sponame=name;
    if (disable) {
      $scope.per="disable";
    }else{
      $scope.per="enable";
    }
    $scope.type=type;
    // $scope.ShowCase_Permission($scope.spocode, $scope.per, $scope.type);
  }
  $scope.DisSponser=function() {
    $scope.ShowCase_Permission($scope.spocode, $scope.per, $scope.type);
  }
  $scope.ShowCase_Permission = function(uname,permission,type){
    var showcase_type = 2;
    if(permission=='enable'){
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'enable',
                     showcase_type:showcase_type,
                     showcase:false
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                  $scope.getExhibitor();
                  $('#myModal-exhibitor-enable').modal('hide');
                  // if ($scope.ddata.message_sent==true) {
                  //   $("#myModal-exhibitor-disable").modal('show');
                  // }
             }
          });
    }else if(permission == 'disable'){
        $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'revoke',
                     showcase_type:showcase_type,
                     showcase:false
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                  $('#myModal-exhibitor-enable').modal('hide');
                  $scope.getExhibitor();
             }
          });
    }
  };
  function h(e) {
    $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
   }
   $('textarea').each(function () {
     h(this);
   }).on('input', function () {
     h(this);
   });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Happy help controller before selecting event and after selecting event
app.controller('HappyhelpController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$anchorScroll','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$anchorScroll,$rootScope){
  document.title='YARA - HappyHelp';
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  $scope.Eventlist=[];
  $scope.s=APPService;
  $scope.key=YaraBaseUrl.captcha_key;
  $scope.issue=false;
  // check it got redirected from inside event
  var s = sessionStorage.getItem('redirectFrom');
  var evtId='';
  $scope.rdEvent=false;
  if(s=='Event'){
    $scope.issue=true;
    sessionStorage.setItem('redirectFrom','');
    evtId=localStorage.getItem('selectedEventId');
    $scope.rdEvent=true;
  };
  // fetching event details
  GetDataService.getEvents().then(function(res){
    if(res.result==1){
      $scope.Eventlist=res.events;
      // console.log($scope.Eventlist);
      var filterEvent = ($filter('filter')($scope.Eventlist,{'is_active':true}));
      // pre selection of event
      if(filterEvent.length>0)
        $scope.selectedval=filterEvent[0].event_code;
      if($scope.rdEvent)
        $scope.selectedval=evtId;
        $('#loading').hide();
      //$scope.Eventlist=angular.fromJson(localStorage.getItem('eventsdata')).events;
    }else{
      $scope.errorstatus=true;
    }
  });
  $scope.setOffset = function(d){ return GetDataService.userOffsetTime(d,$scope.userOffset); };
  // check event is achived or not, d - date
  $scope.checkdate=function(d){
    var date=new Date(d.end_date);
    var ds;
    var d1= $filter('date')(date,'yyyy-MM-dd');

    angular.forEach(d.days,function(d,key){
      var d2=new Date(key);
      d2= $filter('date')(d2,'yyyy-MM-dd');
      if(d1==d2)
        ds=d.endtime;
    });
    ////console.log(ds);
    //var ds=d.days[date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()].endtime;
    if(ds==undefined || ds==null || ds=='')
      return false;
    var endtime = ds.split(' ');
    var time =endtime[0].split(':');
    if(endtime[1]=='PM'){
      time[0]=Number(time[0])+12;
    }
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    var e = moment(date).add(48,'hours');
    var a = moment();
    if(e>=a){
      ////console.log(new Date(d.end_date)+"-true-");
      return true;
    }else{
    //  //console.log($filter('date')(d.end_date)+"-false");
      return false;
    }
  };
  // when event is selected in happy help
  $scope.changeEvent = function(eventcode){
    $scope.selectedval = eventcode;
  };
  $scope.issuesList=[];
  //fetching issues
  $scope.getAllIssues = function(){
    GetDataService.getAllIssues().then(function(res){
      if(res.result==1){
        $scope.issuesList=res.issues;
        // console.log(res);
       // $scope.valView=i;
        if($scope.inView){
          angular.forEach($scope.issuesList,function(v){
            if(v.issue_code == $scope.valView.issue_code){
              $scope.valView=v;
            }
          });
        }
      }
    });
  };
  $scope.getAllIssues();
  $scope.subtitle='';
  // pre-define issues
  $scope.defIssueslist=["Raise a ticket to this event "
                        ,"Feedback"
                        ,"Bug Report"
                        ,"General Enquiry"
                        ,"Bills and Payments"
                        ,"Sales Related"
                        ,"Other"];
  // select pre-define issues, 's' - selected issue
  $scope.Selectsubtype =function(s){
    $scope.subtitle =s;
  };
  $scope.selectedval=0;
  // api call for pre defined issue
  $scope.createIssue = function(){
    /*var title='';
    title=$scope.subtitle;
    if($scope.subtitle == 'Other'){
      title=$scope.othertopic;
    }*/
    var fd;
    if($scope.showEvent){
     $scope.selectedval=''; 
     fd={
        issue_name:$scope.subtitle,
        description:$scope.issuedesc,
        issue_sub_type:$scope.subtitle
      };
    }else{
      fd={
        event_code:$scope.selectedval,
        issue_name:$scope.subtitle,
        description:$scope.issuedesc,
        issue_sub_type:$scope.subtitle
      };
    }
    $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/',
      data:fd
    }).then(function success(response){
      $scope.res=response.data;
      if($scope.res.result==1){
        $scope.subtitle='';
        $scope.selectedval=0;
        $scope.issuedesc="";
        $scope.othertopic="";
        $scope.errorStatus=false;
        $scope.submitted=false;
        $scope.getAllIssues();
        $anchorScroll(0);
        // $scope.issue=false;
        $scope.rdEvent=false;
        $scope.captchaInvalid=true;
        location.reload();
      }else if($scope.res.result==0){
          $scope.errorStatus=true;
          $scope.errormsg=$scope.res.message;
      }else{
        $scope.errorStatus=true;
        $scope.errormsg=GetDataService.errorMsg[1];
      }
    },function error(response){
         $scope.errorStatus=true;
        if(response.status==-1 || response.data==null){
                $scope.errormsg=GetDataService.errorMsg[0];
                if($rootScope.online==false)
                {
                    $scope.errormsg=GetDataService.errorMsg[0];
                }
                else{
                    $scope.errormsg=GetDataService.errorMsg[1];
                }
        }else
        $scope.errormsg=GetDataService.errorMsg[1];
    });
  };
  // on issue click showing complete details of issue, i- issue value
  $scope.setView = function(i){
    $scope.valView=i;
    $scope.inView=true;
    $anchorScroll();
  };
  $scope.scrollanchar=function () {
    $anchorScroll();  
  };
  // api to reply to issue
  $scope.replyForm =function(){
    $('#loading').show();
    $scope.replyRes={};
    $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/user_responds/',
      data:{
        issue_code:$scope.valView.issue_code,
        responds:$scope.posttxt
      }
    }).then(function success(response){
      $scope.replyRes=response.data;
      if($scope.replyRes.result==1){
        $('#happyReply').modal('hide');
        $scope.posttxt='';
        $scope.getAllIssues();
        $scope.replySubmitted=false;
        $('#loading').hide();
      }else if($scope.replyRes.result==0){
          $scope.replyRes.result=0;
          $scope.replyRes.error=$scope.replyRes.message;
      }else{
        $scope.replyRes.result=0;
        $scope.replyRes.error=GetDataService.errorMsg[1];
      }
    },function error(response){
         $scope.replyRes.result=0;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.replyRes.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.replyRes.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.replyRes.error=GetDataService.errorMsg[1];
    });
  }
  $scope.ishelpful=function (responseCode) {
    $('#loading').show();
     $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/helpfull/',
      data:{
        issue_code:$scope.valView.issue_code,
        is_helpfull:true,
        response_code:responseCode
      }
    }).then(function (res) {
      if (res.data.result==1) {
        $scope.getAllIssues();
        $('#loading').hide();
      }else{
        $('#loading').hide();
      }
    })
  };
  $scope.issueClosed=function (statusclose) {
      $('#loading').show();
     $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/update_issue/',
      data:{
        issue_code:$scope.valView.issue_code,
        status:statusclose
      }
    }).then(function (res) {
      if (res.data.result==1) {
        $scope.getAllIssues();
        $('#loading').hide();
      }else{
        $('#loading').hide();
      }
    })
  };
 // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// floor map controller
app.controller('EventFloorMapController',['$scope','$http','YaraBaseUrl','$location','GetDataService','fileReader','$timeout','APPService','$rootScope','$anchorScroll',function($scope,$http,YaraBaseUrl,$location,GetDataService,fileReader,$timeout,APPService,$rootScope,$anchorScroll){
  $scope.headerTitle="FloorMap";
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // fetching local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
      window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - FloorMap';
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  //fetching floor map data
  $scope.getFloor=function(){
      GetDataService.getFloorMap($scope.currentval.event_code).then(function(res){
        if(res.result==1){
           $scope.floordata=res.floor_maps;
           $('#loading').hide();
           $('#container').fadeIn();        }
      });
  };
  $scope.getFloor();
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='floorPic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='floorPic'){
      $scope.imageSrc="";
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.floorPic.allowedExtensions(['png', 'jpg', 'jpeg']);
   // //console.log('start');
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });

  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.floormapform.floorPic.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
          }else{
            $scope.floormapform.floorPic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=600  && height >= 600 ){
                $scope.floormapform.floorPic.$setValidity('minDimension',true);
                  $scope.imageSrc = result;
                 /*if(width ==600 && height == 600 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='floorPic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.40);
                  $('#crop-image').modal('show');
                }*/
                /*if(width == height){
                  $scope.floormapform.floorPic.$setValidity('ratioval',true);
                 
                }else{
                  $scope.floormapform.floorPic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.floormapform.floorPic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            //$scope.imageSrc = result;
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  // reset fields
  $scope.resetfields = function(){
    $anchorScroll();
    $scope.submitted=true;
    $scope.floorname='';
    $scope.imageSrc='';
    $scope.errorstatus=false
    $timeout(function(){$('#floorname').focus();},500);
    var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('logo image change');
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
  };
  $scope.closing=function  () {
    $anchorScroll();
    $scope.errorstatus=false;
  }
  // revoke before floor map , 'f' is floor data
  $scope.setrevoke = function(f){
    $scope.floorname=f.floor_name;
    $scope.floorCode=f.floor_map_code;
  };
  // delete floor map api
  $scope.DelFM = function(){
    $('#loading').show();
    $http({method:'POST',
             url:YaraBaseUrl.url+'/floor_map_edit/',
             data:{
                 opp:'delete',
                 event_code:$scope.currentval.event_code,
                 floor_map_code:$scope.floorCode
             }
      }).then(function success(response){
          if(response.data.result==1){
              $scope.getFloor();
              $('#myModal-exhibitor').modal('hide');
          }
      });  
  };
  // floor map name check 
  $scope.checkFloormapname=function () {
    $scope.invalidFMname=false;
    $scope.errorstatus=false;
    if ($scope.floorname!=undefined) {
      var floormapname=$scope.floorname.toLowerCase();
      var regExp4 = /^floor map[0-9][0-9]*$/;
      var regExp5 = /^floor map[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp1 = /^floormap[0-9][0-9]*$/;
      var regExp2 = /^floormap[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp6 = /^(?:1st|[1-9][0-9]st|2nd|[1-9][0-9]nd|3rd|[1-9][0-9]rd|4th|[1-9][0-9]th)*$/;
      var regExp7 = /^(?:1st floormap|[1-9][0-9]st floormap|2nd floormap|[1-9][0-9]nd floormap|3rd floormap|[1-9][0-9]rd floormap|4th floormap|[1-9][0-9]th floormap)*$/;
      var regExp8 = /^(?:1st floor map|[1-9][0-9]st floor map|2nd floor map|[1-9][0-9]nd floor map|3rd floor map|[1-9][0-9]rd floor map|4th floor map|[1-9][0-9]th floor map)*$/;
      var mapexp1 = /^map[0-9][0-9]*$/;
      var mapexp2 = /^map[^a-zA-Z0-9][0-9][0-9]*$/;
      var mapexp3 = /^(?:1st map|[1-9][0-9]st map|2nd map|[1-9][0-9]nd map|3rd map|[1-9][0-9]rd map|4th map|[1-9][0-9]th map)*$/;
      if (floormapname=="floormap" || floormapname=="floor map" || floormapname=="map") {
        $scope.invalidFMname=true;
      }else if (regExp4.test(floormapname) || regExp5.test(floormapname) || regExp1.test(floormapname) || regExp2.test(floormapname) || regExp6.test(floormapname) || regExp7.test(floormapname) || regExp8.test(floormapname)) {
        $scope.invalidFMname=true;
      }else if (mapexp1.test(floormapname) || mapexp2.test(floormapname) || mapexp3.test(floormapname)) {
        $scope.invalidFMname=true;
      }
    }    
  }
  $scope.checkFloormapedit=function () {
    $scope.invalidFMedit=false;
    $scope.errorstatus=false;
    if ($scope.floormapedit!=undefined) {
      var floormapname=$scope.floormapedit.toLowerCase();
      var regExp4 = /^floor map[0-9][0-9]*$/;
      var regExp5 = /^floor map[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp1 = /^floormap[0-9][0-9]*$/;
      var regExp2 = /^floormap[^a-zA-Z0-9][0-9][0-9]*$/;
      var regExp6 = /^(?:1st|[1-9][0-9]st|2nd|[1-9][0-9]nd|3rd|[1-9][0-9]rd|4th|[1-9][0-9]th)*$/;
      var regExp7 = /^(?:1st floormap|[1-9][0-9]st floormap|2nd floormap|[1-9][0-9]nd floormap|3rd floormap|[1-9][0-9]rd floormap|4th floormap|[1-9][0-9]th floormap)*$/;
      var regExp8 = /^(?:1st floor map|[1-9][0-9]st floor map|2nd floor map|[1-9][0-9]nd floor map|3rd floor map|[1-9][0-9]rd floor map|4th floor map|[1-9][0-9]th floor map)*$/;
      var mapexp1 = /^map[0-9][0-9]*$/;
      var mapexp2 = /^map[^a-zA-Z0-9][0-9][0-9]*$/;
      var mapexp3 = /^(?:1st map|[1-9][0-9]st map|2nd map|[1-9][0-9]nd map|3rd map|[1-9][0-9]rd map|4th map|[1-9][0-9]th map)*$/;
      if (floormapname=="floormap" || floormapname=="floor map" || floormapname=="map") {
        $scope.invalidFMedit=true;
      }else if (regExp4.test(floormapname) || regExp5.test(floormapname) || regExp1.test(floormapname) || regExp2.test(floormapname) || regExp6.test(floormapname) || regExp7.test(floormapname) || regExp8.test(floormapname)) {
        $scope.invalidFMedit=true;
      }else if (mapexp1.test(floormapname) || mapexp2.test(floormapname) || mapexp3.test(floormapname)) {
        $scope.invalidFMedit=true;
      }
    }    
  }
  //creating floor map
  $scope.addfloormap=function(){
    $('#loading').show();
    var fd=new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    //fd.append('image',$scope.floorPic);
    angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
      });
      var len=$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
      if(len==0){
        fd.append('image','');
      }
    fd.append('floor_name',$scope.floorname);
    $http({method:'POST',
      url:YaraBaseUrl.url+'/floor_map/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      $scope.data=response.data;
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
            // $timeout(function(){
            //   APPService.scrollJquery('floorname');
            // },100);
        }else{
            $scope.createFM=false;
            $scope.getFloor();
            $scope.resetfields();
        }
        $('#loading').hide();
        $('#container').fadeIn();
    },function error(response){
        $scope.errorstatus=true;
        $scope.shownav=false;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.errormsg=GetDataService.errorMsg[0];
                }
                else{
                    $scope.errormsg=GetDataService.errorMsg[1];
                }                
        }else
        $scope.errormsg=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
    });
  }; 
  //edit floor map
  $scope.setedit=function (no) {
    $scope.fmapcode=no.floor_map_code;
    $scope.floormapedit=no.floor_name;
  }
  $scope.editfloormap=function () {
      $('#loading').show();
      $http({method:'POST',
             url:YaraBaseUrl.url+'/floor_map_edit/',
             data:{
                 opp:'edit',
                 floor_name:$scope.floormapedit,
                 floor_map_code:$scope.fmapcode
             }
      }).then(function success(response){
          if(response.data.result==1){
              $scope.getFloor();
              $scope.floormapedit="";
              $('#floor_map').modal('hide');
          }else{
            $scope.errorstatus=true;
            $('#loading').hide();
          }
      });  
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// Venue Greet Controller
app.controller('VenueGreetController',['$scope','$http','YaraBaseUrl','$location','GetDataService','$rootScope','$timeout',function($scope,$http,YaraBaseUrl,$location,GetDataService,$rootScope,$timeout){
  $scope.headerTitle="VenueGreet";
  // select event local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - VenueGreet';
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  $scope.greetList=[];
  $scope.spdelegate=$scope.currentval.sp_people;
  var delegate = {
          group_tittle: "Delegates",
          id: 10,
          single_entity_tittle: "Delegate"
  };
  $scope.spdelegate.push(delegate);
  $scope.getspDelegatename = function(id){
      for (var i = $scope.spdelegate.length - 1; i >= 0; i--) {
          if ($scope.spdelegate[i].id==id) {
              return $scope.spdelegate[i].group_tittle;
              break;
          };
      };
  }; 
  // fetch venue greet
  $scope.getVenueGreet =function(){
    $('#loading').show();
    GetDataService.getVenueGreet($scope.currentval.event_code).then(function(res){
        if(res.result==1){
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.greetList=res.geo_circles; 
              $scope.foundDeg=false;
              $scope.foundSK=false;
              $scope.create=true;
              $scope.hideSK=false;
              $scope.hideDeg=false;
              $scope.lists=[]
              if($scope.greetList.length>0){
                // determine for avalible to create another venue greet or not
                for (var i = 0; i < $scope.greetList.length; i++) {
                  for (var j = 0; j < $scope.greetList[i].message_for.length; j++) {
                    $scope.lists.push($scope.greetList[i].message_for[j]);
                  }
                }
                if ($scope.spdelegate.length==$scope.lists.length) {
                  $scope.create=false; 
                }
              }
        }
    });
  };
  $scope.getVenueGreet();
  $scope.addGreet = function(){
    $scope.venue_greet=true;
    $scope.attendval=[];
    $timeout(function() {
      $('textarea').each(function() {
          h(this);
      });
    }, 100);
  };
  $scope.attendval=[];
  $scope.attendspdel=function(sp) {
    $scope.specialdel=sp;
    var i=$scope.attendval.indexOf(sp.id);
    if (i>-1) {
      $scope.attendval.splice(i, 1);
    }else{
      $scope.attendval.push(sp.id);
    }
    if ($scope.attendval.length>0) {
      $scope.attendDeg=true;
    }else{
      $scope.attendDeg=false;
    }
  };
  $scope.checkval=function(sps) {
    $scope.vsl=false;
    for (var i = 0; i < $scope.attendval.length; i++) {
      if ($scope.attendval[i]==sps.id) {
        $scope.vsl=true;
      }
    }
    return $scope.vsl
  };
  // create venue greet msg api
  $scope.addGreetMsg = function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/geo_circle/',
        data:{
          event_code:$scope.currentval.event_code,
          message_for:$scope.attendval,
          message:$scope.msg
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
          $('#loading').hide();
          $('#container').fadeIn();
        }else if($scope.data.result==1){
          $scope.submitted =false;
          $scope.venue_greet=false;
          $scope.errormsg=false;
          $scope.msg='';
          $scope.getVenueGreet();  
          $scope.attendSK=false;
          $scope.attendDeg=false;
          $scope.attendval=[];
          $('#loading').hide();
          $('#container').fadeIn();
        }
      },function error(response){
            $scope.data={};
            $scope.errormsg=true;
            if(response.status==-1 || response.data==null){
                    $scope.data.error=GetDataService.errorMsg[0];
            }else
            $scope.data.error=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
        });
  };
  // before deleting venue greetmsg, 'c' - venuegreet msg
  $scope.setDel = function(c){
    $scope.DelCode=c;
  }
  // delete venue greetmsg api
  $scope.delGreetMsg = function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/geo_circle_edit/',
        data:{
          event_code:$scope.currentval.event_code,
          opp:'delete',
          geo_circle_code:$scope.DelCode
        }
      }).then(function success(response){
        $scope.data=response.data;
        ////console.log($scope.data);
        if($scope.data.result==0){
          $scope.errormsg1=true;
          $scope.data.error=$scope.data.message;
          $('#loading').hide();
          $('#container').fadeIn();
        }else if($scope.data.result==1){
          $scope.errormsg1=false;
          $scope.getVenueGreet(); 
          $('#loading').hide();
          $('#container').fadeIn();
          $('#venue_delete').modal('hide');
        }
      },function error(response){
            $scope.data={};
            $scope.errormsg1=true;
            if(response.status==-1 || response.data==null){
                    $scope.data.error=GetDataService.errorMsg[0];
                    if($rootScope.online==false)
                    {
                        $scope.data.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.data.error=GetDataService.errorMsg[1];
                    }
            }else
            $scope.data.error=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
        });
  };
  $scope.clearveniue=function () {
    $scope.msg="";
    $scope.attendval=[];
    $timeout(function() {
    $('textarea').each(function() {
        h(this);
      });
    }, 100);
  }
  function h(e) {
      $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
   }
   $('textarea').each(function () {
     h(this);
   }).on('input', function () {
     h(this);
   });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }  
}]);
// Wifi Controller
app.controller('EventWifiController',['$scope','$http','YaraBaseUrl','$location','GetDataService','$timeout','APPService','$rootScope',function($scope,$http,YaraBaseUrl,$location,GetDataService,$timeout,APPService,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Wifi Spots";
  // fetching data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
   // $location.path('/Events');
      window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.admCntrycode=$scope.currentval.phone_number.split(" ", 1);
    $scope.spPeople = $scope.currentval.sp_people;
    var addDelegate = {
      group_tittle:"Delegates",
      id:10,
      single_entity_tittle:"Delegate"
    };
    $scope.spPeople.push(addDelegate);
    console.log($scope.spPeople)
    // making all the  feilds to false
    $scope.defaultSelection = function(){
      console.log("reach here");
      console.log( $scope.spPeople);
      for (var i = $scope.spPeople.length - 1; i >= 0; i--) {
        $scope.spPeople[i].clicked=false;
      };
    };
    $scope.defaultSelection();
    console.log($scope.spPeople);
    document.title='YARA - '+$scope.currentval.short_name+' - WiFi';
  }
  $scope.selectedpeople=[];
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;} 
  $scope.forAll=false;
  $scope.forPeople=false;
  $scope.forTickets=false;
  //fetching wifi data
  $scope.getWifiData=function(){
    $('#loading').show();
      $scope.WifiData=[];
      GetDataService.getWifi($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.WifiData=res.wifi_data;
              $scope.WifiInfo=res;
              $scope.selectedpeople=[];
              $scope.assigntickets=[]; 
              if($scope.WifiData.length>0){
                $scope.forAll=res.for_all;
                $scope.forPeople=res.for_people;
                $scope.forTickets=res.for_tickets;
              }
              // looking for already assigned tickets, one ticket for one wifi
              angular.forEach($scope.WifiData,function(w){ 
                  angular.forEach(w.tickets,function(t){
                  $scope.assigntickets.push(t.ticket_code);
                  });
                  angular.forEach(w.people_types,function(t){
                  $scope.selectedpeople.push(t);
                  });
              });
              // console.log($scope.selectedpeople.length);
              // console.log( $scope.spPeople.length);
              $('#loading').hide();
              $('#container').fadeIn();
          }
      });
  };
  $scope.getWifiData();
  $scope.ticktselected=[];
  // when ticket is selected , 'currval' - boolean already add or not
  // 'val' - selected ticket data 
  $scope.changetselect=function(currval,val){
    if(currval==false){
        $scope.ticktselected.push(val);
    }else{
        var temp=[];
        for(var i=0;i<$scope.ticktselected.length;i++){
            if($scope.ticktselected[i]!=val){
                temp.push($scope.ticktselected[i]);
            }
        }
        $scope.ticktselected=temp;
        //$scope.ticktselected.splice($scope.ticktselected.indexOf(val),1);
    }
      return !currval;
  };
  $scope.spTypeSelection = function(sp)
  {
    // console.log(sp);
    for (var i = $scope.spPeople.length - 1; i >= 0; i--) {
      // $scope.spPeople[i].clicked=false;
      if($scope.spPeople[i].id==sp.id){
          if(sp.clicked==false){
            $scope.spPeople[i].clicked=true;
            $scope.peopleMissing=false;
          }
          else{
            $scope.spPeople[i].clicked=false;
          }
      }
    };
    console.log($scope.spPeople);

  };

  // selecting create or update wifi 
  // 'type' -  create or update
  // 'val' - selected wifi while update
  $scope.ChangesWifi=function(type,val){
      GetDataService.getTickets($scope.currentval.event_code).then(function(res){
          $scope.ticketsdata=res.tickets; 
          // console.log($scope.ticketsdata);
          angular.forEach($scope.ticketsdata,function(t){
             /// //console.log($scope.assigntickets.indexOf(t.ticket_code));
              if(0<=$scope.assigntickets.indexOf(t.ticket_code)){
                  t.isAssigned=true;
              }else{
                  t.isAssigned=false;
              } 
          });
      });
      $scope.tranWifiType=type;
     if(type=='create'){
         $scope.WifiTitle="Create New WiFi Spot";
         $scope.btntxt="ADD";
         $scope.createwifi=true;
         $scope.wifiname="";
         $scope.wifiSSID="";
         $scope.wifipwd="";
         $scope.admName=undefined;
         $scope.admPh=undefined;
         $scope.WifiUser ='';
         $scope.reqPhone = false;
         $scope.reqName = false; 
         $scope.ticktselected=[];

         $scope.tempticket=[];
         $scope.removeSel=function (item) {
            $scope.selstatus=false;
            for (var i = 0; i < $scope.selectedpeople.length; i++) {
              if (item==$scope.selectedpeople[i]) {
                $scope.selstatus=true;
              }
            }
            if ($scope.selstatus) {
              return false;
            }else{
              return true;
            }
          }
     }else if(type=='update'){
         $scope.selectedWifi_code=val;
         $scope.ticktselected=[];
         $scope.WifiTitle="Update WiFi Spot";
         $scope.createwifi=true;
         $scope.btntxt="Update";
         angular.forEach($scope.WifiData,function(w){
                if(w.wifi_code==val){
                    console.log(w);
                    $scope.wifiSSID=w.ssid;
                    // $scope.wifipwd="";
                    if(w.admin_name==""){$scope.admName = undefined;}
                    else{$scope.admName=w.admin_name;}
                    $scope.wifipwd = w.password;
                    var phoneinfo = w.admin_phone.split(" ");
                    console.log(phoneinfo);
                    console.log(phoneinfo[0]);
                    if(phoneinfo.length==2){
                      if (phoneinfo[1]=="") {
                        $scope.admPh=undefined;
                      }else{
                        $scope.admPh=phoneinfo[1];
                      }
                       $scope.admCntrycode=phoneinfo[0];
                    }
                    else{
                      if(w.admin_phone!=""){
                        $scope.admPh = w.admin_phone;
                      }
                      else{
                        $scope.admPh = undefined;
                      }
                    }
                    // $scope.admPh=w.admin_phone;
                    $scope.defaultSelection();
                    if( $scope.WifiInfo.for_people==true){
                        $scope.WifiUser = 'People';
                        console.log(w.people_types);
                        for (var i = $scope.spPeople.length - 1; i >= 0; i--) {
                            for (var j = w.people_types.length - 1; j >= 0; j--) {
                                  if($scope.spPeople[i].id==w.people_types[j]){
                                    $scope.spPeople[i].clicked=true;
                                  }
                            }
                        };
                        $scope.removeSel=function (item) {
                        $scope.selstatus=false;
                        for (var i = 0; i < $scope.selectedpeople.length; i++) {
                          if (item==$scope.selectedpeople[i]) {
                            $scope.selstatus=true;
                          }
                        }
                        if ($scope.selstatus) {
                          return true;
                        }else{
                          return true;
                        }
                      }
                    }

                    else if($scope.WifiInfo.for_tickets==true){
                      $scope.WifiUser = 'Ticket';
                      angular.forEach(w.tickets,function(t){
                        $scope.ticktselected.push(t.ticket_code);
                      });
                    }
                    else if($scope.WifiInfo.for_all==true){
                      $scope.WifiUser = 'forall';
                    }
                }
        });
        $scope.tempticket=$scope.ticktselected;
     }
     $timeout(function() {
          $('#wifiadd').focus();
      }, 100)
  };
  // delete wifi api call
  $scope.deleteWifi=function(wifi){
    console.log(wifi)
    $scope.fname=wifi.ssid;
    $scope.wificode=wifi.wifi_code
    console.log($scope.fname, $scope.wificode);
  }
  $scope.wifirevoke=function () {
    $http({method:'POST',
             url:YaraBaseUrl.url+'/wifi_edit/',
             data:{
                 opp : 'delete',
                 wifi_code: $scope.wificode,
                 event_code:$scope.currentval.event_code
             }
      }).then(function success(response){
          if(response.data.result==1){
                $scope.forAll=false;
                $scope.forPeople=false;
                $scope.forTickets=false;
              $scope.getWifiData();
              $("#wifi-delete").modal('hide');
          }
      }); 
  }
  // creating wifi api call
  $scope.addWifi=function(){ 
    $scope.ticketMissing=false;
    $scope.peopleMissing=false;
    console.log("reach");
    var selecPeopleId = [];
    var forall=0;
    var fortickets = 0;
    if($scope.WifiUser=='People'){
        for (var i = $scope.spPeople.length - 1; i >= 0; i--) {
        if($scope.spPeople[i].clicked==true)
        {
              selecPeopleId.push($scope.spPeople[i].id);
        }
      };
    };
    if($scope.WifiUser=='People'){
        forall=0;
        fortickets = 0;
        if(selecPeopleId.length==0){
           $scope.peopleMissing=true;
        }
    }
    else if($scope.WifiUser=='forall'){
        forall=1;
        fortickets = 0;
    }
    else if($scope.WifiUser=='Ticket'){
        forall=0;
        fortickets = 1;
        if($scope.ticktselected.length==0){
            $scope.ticketMissing=true;
        }
    }
    var phoneNum='';
    console.log($scope.admPh);
    if($scope.admPh!=undefined && $scope.admPh!='' && $scope.admPh!=null){
      phoneNum=$scope.admCntrycode+' '+$scope.admPh;
    }
    if($scope.admName==undefined || $scope.admName=='' || $scope.admPh==null){
        $scope.admName = "";
    }
    if($scope.ticketMissing==false && $scope.peopleMissing==false){
        if($scope.tranWifiType=='create'){
            $http({method:'POST',
                   url:YaraBaseUrl.url+'/wifi/',
                   data:{
                       event_code:$scope.currentval.event_code,
                       connection_name:$scope.wifiname,
                       ssid:$scope.wifiSSID,
                       password:$scope.wifipwd,
                       admin_name:$scope.admName,
                       admin_phone: phoneNum,
                       ticket_codes:$scope.ticktselected,
                       for_tickets:fortickets,
                       for_all:forall,
                       people_type:selecPeopleId
                   }
            }).then(function success(response){
                if(response.data.result==1){
                    $scope.createwifi=false;
                    $scope.forAll=false;
                    $scope.forPeople=false;
                    $scope.forTickets=false;
                    $scope.getWifiData();
                    $scope.errorStatus=false;
                    $scope.admName=undefined;
                    $scope.admPh=undefined;
                }
                else if(response.data.result==0){
                        $scope.errorStatus=true;
                        $scope.msg=response.data.message;
                        // $timeout(function(){
                        //   APPService.scrollJquery('wifiadd');
                        // },100);
                }
            });
        }
        else if($scope.tranWifiType=='update'){
            $http({method:'POST',
                   url:YaraBaseUrl.url+'/wifi_edit/',
                   data:{
                       opp : 'edit',
                       event_code:$scope.currentval.event_code,
                       wifi_code: $scope.selectedWifi_code,
                       connection_name:$scope.wifiname,
                       ssid:$scope.wifiSSID,
                       password:$scope.wifipwd,
                       admin_name:$scope.admName,
                       admin_phone: phoneNum,
                       ticket_codes:$scope.ticktselected,
                       for_tickets:fortickets,
                       for_all:forall,
                       people_type:selecPeopleId
                   }
            }).then(function success(response){
                if(response.data.result==1){
                    $scope.createwifi=false;
                    $scope.getWifiData();
                    $scope.errorStatus=false;
                    $scope.admName=undefined;
                    $scope.admPh=undefined;
                }
                else if(response.data.result==0){
                        $scope.errorStatus=true;
                        $scope.msg=response.data.message;
                        // $timeout(function(){
                        //   APPService.scrollJquery('wifiadd');
                        // },100);
                }
            });
        }
    }
  }; 
  $scope.errorScroll = function(){
    if($scope.reqPhone||$scope.reqName){
        $timeout(function(){
            APPService.scrollJquery('adnameId');
          },100);
    }
   else if($scope.admName!=undefined||$scope.admName||$scope.admName!=null){
      if($scope.wordlength||$scope.firstNameMaxLength||$scope.middleNameMaxLength||$scope.lastNameMaxLength){
           $timeout(function(){
            APPService.scrollJquery('adnameId');
          },100);
      }
    }
  };
  $scope.fullNameCheck = function(){
      if($scope.admName!=undefined||$scope.admName||$scope.admName!=null){
        if($scope.wordlength||$scope.firstNameMaxLength||$scope.middleNameMaxLength||$scope.lastNameMaxLength){
            $scope.errorScroll();
            return false;
        }
        else{
          return true;
        }
      }
      else{   
            return true;
      }
  };
  $scope.ticketAvilabile = function(tckt){
      console.log(tckt);
      // return true;
      if($scope.tranWifiType=='update'){
          if(tckt.isAssigned==false && tckt.is_validity_over==true){
            return false
          }
          else{
            return true;
          }
      }
      else{
          if(tckt.isAssigned==true || tckt.is_validity_over==true){
            return false
          }
          else{
            return true;
          }
      }

  };
  $scope.reqPhone = false;
  $scope.reqName = false; 
  $scope.$watchCollection('[admPh,admName]', function(values){ 
              // console.log($scope.admName);
              // console.log($scope.admPh);
              // if(!$scope.admName){
              //         console.log("empty string");
              // }
      if(($scope.admPh!=undefined||$scope.admPh!=null)&&($scope.admName==undefined||!$scope.admName||$scope.admName==null)){
          $scope.reqPhone = false;
          $scope.reqName = true;
          console.log("1");
      }
      else if(($scope.admPh==undefined||$scope.admPh==null)&&($scope.admName==undefined||!$scope.admName||$scope.admName==null)){
          $scope.reqPhone = false;
          $scope.reqName = false;
          console.log("2");
      }
      else if(($scope.admPh==undefined||$scope.admPh==null)&&($scope.admName!=undefined||$scope.admName||$scope.admName!=null)){
          $scope.reqPhone = true;
          $scope.reqName = false;
          console.log("3");
      }
      else if(($scope.admPh!=undefined||$scope.admPh!=null)&&($scope.admName!=undefined||$scope.admin_name||$scope.admName!=null)){
          $scope.reqPhone = false;
          $scope.reqName = false;   
          console.log("4");
      }   
  });
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// after event is created ,page show event is ready
app.controller('EventReadyCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$q','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$q,$rootScope){
    var eventReadyRedirection=angular.fromJson(localStorage.getItem('eventReadyRedirection'));
    if(eventReadyRedirection==undefined||eventReadyRedirection.eventready==true){
      window.location="/dashboard";
    }
    // selEventsData,selectedEventId
    $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);};
    $timeout(function() {
        $scope.checkdate=function (st, ed, off) {
          console.log(st,ed,off);
         return GetDataService.startend(st, ed, off);
        }
     }, 500);
    var selectedval=localStorage.getItem('selectedEventId');
    if(selectedval=== undefined || selectedval === null){
        window.location = "/events";
    }else{
      GetDataService.getEvent(selectedval).then(function(res){
        $('#loading').show();
        if(res.result==1){
            console.log(res);
            $scope.eventsdata=res.events;
            $scope.currentval=$scope.eventsdata[0];
            console.log($scope.currentval);
            $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
            $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
            localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
            $('#loading').hide();
            $('#container').fadeIn();
        }
      });  
    }
    $scope.gotoTrack=function(){
          eventReadyRedirection.eventready=true;
          localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
          window.location="/event-tracks";
    }
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
//  required Gatekeeper after event is created
app.controller('UseGatekeeperCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$rootScope){
  var eventReadyRedirection=angular.fromJson(localStorage.getItem('eventReadyRedirection'));
  if(eventReadyRedirection==undefined||eventReadyRedirection.gk==true){
    window.location="/events";
  }    
  $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);}; 
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }else{
    var selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson(selevntdata);
    $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  }
  $scope.s=APPService;
  // setup gatekeeper api call
  $scope.EventSetup =  function(b){
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/event_kit/',
        data:{
          event_code:$scope.currentval.event_code,
          kit:'GateKeeper',
          is_enabled:b
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.errmsg=$scope.data.message;
        }else if($scope.data.result==1){  
            eventReadyRedirection.gk=true;
            localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
            if($scope.currentval.is_private==true){
                  window.location="/posting-pin";
            }
            else{
              window.location="/event-setup-promotion";
            }   
       }
      },function error(response){
            $scope.errormsg=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.errmsg=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.errmsg=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            //$('#loading').hide();
            //$('#container').fadeIn();
        });
  }
}]);
// Messaging required after event created, currently not using this
app.controller('UseMessagingCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService){
  var d = localStorage.getItem('CreatedEventDetails');
  var e =angular.fromJson( localStorage.getItem('CreatedEventData'));
  $scope.loc="/events";
  if(d == undefined || d== null){
      window.location.replace("/events");
  }else{
    $scope.data = angular.fromJson(d);
    $scope.data.event_activation_time=e.event_activation_time;
    if(!$scope.data.is_private && e.kits.Promote != undefined)
       $scope.loc="/event-setup-promotion";
  }
  $scope.s=APPService;
  //set messaging is required or not
  $scope.EventSetup =  function(b){
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/event_kit/',
        data:{
          event_code:e.event_code,
          kit:'Messaging',
          is_enabled:b
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.errmsg=$scope.data.message;
        }else{ 
          $scope.cdate = angular.fromJson(d);
          if($scope.cdate.is_private){
            localStorage.removeItem('CreatedEventDetails');
             window.location.replace("/events");
          }else{ 
            window.location.replace($scope.loc);
          }
        }
      },function error(response){
            //console.log(response);
            $scope.errormsg=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.errmsg=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.errmsg=GetDataService.errorMsg[1];
                    }
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            //$('#loading').hide();
            //$('#container').fadeIn();
        });
   
  }
}]);
// After Event created Promotion
app.controller('UsePromotionCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$rootScope){
  var eventReadyRedirection=angular.fromJson(localStorage.getItem('eventReadyRedirection'));
  if(eventReadyRedirection==undefined||eventReadyRedirection.promote==true){
    window.location="/dashboard";
  }  
  $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);}; 
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }else{
    var selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson(selevntdata);
    $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  }
  $scope.s=APPService;
  // api to set use promotion  where b is boolean
  $scope.EventSetup =  function(b){
     $http({
        method:'POST',
        url:YaraBaseUrl.url+'/event_kit/',
        data:{
          event_code:$scope.currentval.event_code,
          kit:'Promote',
          is_enabled:b
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.errmsg=$scope.data.message;
        }else if($scope.data.result==1){
                localStorage.removeItem('redirectionInfo');
                localStorage.removeItem('phonInfo');
                localStorage.removeItem('lng');
                localStorage.removeItem('lat');
                localStorage.removeItem('isEventPrvt');
                localStorage.removeItem('epData');
                localStorage.removeItem('country');
                eventReadyRedirection.promote=true;
                eventReadyRedirection.pin=true;
                localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
              GetDataService.getEvent(selectedval).then(function(res){
                  if(res.result==1){
                      $scope.eventsdata=res.events;
                      $scope.currentval=$scope.eventsdata[0];
                      localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                      window.location.replace("/event");
                  }
              });   
              // $scope.clearDb();
             

        }
      },function error(response){
            $scope.errormsg=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                     $scope.errmsg=GetDataService.errorMsg[0];
                     }
                     else{
                        $scope.errmsg=GetDataService.errorMsg[1];
                     }
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            //$('#loading').hide();
            //$('#container').fadeIn();
        });
   
  }
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// After Event created pulse enableand disable
app.controller('pinCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$rootScope){
  var eventReadyRedirection=angular.fromJson(localStorage.getItem('eventReadyRedirection'));
  if(eventReadyRedirection==undefined||eventReadyRedirection.pin==true){
      window.location="/dashboard";
  }  
  $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);}; 
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/events";
  }else{
    var selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson(selevntdata);
    $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  }
  // api to set use promotion  where b is boolean
  $scope.EventSetup =  function(b){
    // window.location.replace("/event");
     $http({
        method:'POST',
        url:YaraBaseUrl.url+'/setup-event-pinTopulse/',
        data:{
          event_code:$scope.currentval.event_code,
          is_enabled:b
        }
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.errmsg=$scope.data.message;
        }
        else if($scope.data.result==1){
              localStorage.removeItem('redirectionInfo');
              localStorage.removeItem('phonInfo');
              localStorage.removeItem('lng');
              localStorage.removeItem('lat');
              localStorage.removeItem('isEventPrvt');
              localStorage.removeItem('epData');
              localStorage.removeItem('country');
              GetDataService.getEvent(selectedval).then(function(res){
                  if(res.result==1){
                      console.log(res);
                      $scope.eventsdata=res.events;
                      $scope.currentval=$scope.eventsdata[0];
                      console.log($scope.currentval);
                      localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                      window.location.replace("/event");
                  }
              });  
        }
      },function error(response){
            $scope.errormsg=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                     $scope.errmsg=GetDataService.errorMsg[0];
                     }
                     else{
                        $scope.errmsg=GetDataService.errorMsg[1];
                     }
            }else
            $scope.errmsg=GetDataService.errorMsg[1];
            //$('#loading').hide();
            //$('#container').fadeIn();
        });
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
/* Collaborator Dashboard*/

app.controller('CollaboratorDashboardCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$rootScope){
  // $('#data').val(angular.toJson({"access_key":"e0aed17a-2392-4bad-9670-0cff8b310957","token":"4b8-9c0655871c1b000ab6bd","role":"Collaborator","result":1,"event_data":{"end_date":"2016-04-28","event_sub_type":"Education","name":"National Event 2016","short_name":"NE '16","created_at":"2016-04-20","is_active":true,"days":{"2016-04-28":{"endtime":"12:00","day_name":"Day 4","id":20160428,"starttime":"10:00"},"2016-04-25":{"endtime":"19:00","day_name":"Day 1","id":20160425,"starttime":"10:00"},"2016-04-27":{"endtime":"19:00","day_name":"Day 3","id":20160427,"starttime":"10:00"},"2016-04-26":{"endtime":"19:00","day_name":"Day 2","id":20160426,"starttime":"10:00"}},"created_by":"dev@voris.co.in","start_date":"2016-04-25","kits":{"GateKeeper":{"status":true,"confirmed":true},"Collaborators":{"status":true,"confirmed":true},"Exhibitors":{"status":true,"confirmed":true},"People Management":{"status":true,"confirmed":true},"Sponsors":{"status":true,"confirmed":true},"Vote":{"status":true,"confirmed":true},"GeoCircle":{"status":true,"confirmed":true},"Coupons":{"status":true,"confirmed":true},"FloorMap":{"status":true,"confirmed":true},"Messaging":{"status":true,"confirmed":true},"Promote":{"status":false,"confirmed":false},"ShareBox":{"status":true,"confirmed":true},"Speaker Engage":{"status":true,"confirmed":true}},"number_of_attendee":1000,"event_code":76322,"event_type":"Conference","event_logo":"https://yara-storage.s3.amazonaws.com/event/76322/event_log/201604200706290cpyPr43FG.png","agenda_image":"","is_private":true,"description":"dsfjjjjjjjjjjjjjjjjjjjj sdasjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"},"permissions":["GateKeeper","Tickets","Floor Map","SpeakerEngage","Vote"]}));
  $scope.permission = GetDataService.permission;
  $scope.selectedPermission = [];
  $scope.setOffset = function(d,offset){ return GetDataService.userOffsetTime(d,offset); };
  var d= $('#data').val();
  // if(d == undefined || d=='' || d==null){
  //   // window.location=YaraBaseUrl.yara;
  // }
  
  if(d!=undefined && d!=null &&d!=''){
      var s=d;
      var json = JSON.stringify(eval("(" + s + ")"));
      s=JSON.parse(json);
      localStorage.setItem("Logininfo",JSON.stringify(s));
      var  dashboardUrl = "collaborator-dashboard";
      localStorage.setItem('dashboardUrl',dashboardUrl);
      window.location.replace("/collaborator-dashboard"); 
  }
  if(angular.fromJson( localStorage.getItem('Logininfo'))!=undefined){
      $scope.collabratorInfo=angular.fromJson(localStorage.getItem('Logininfo'));
      if($scope.collabratorInfo.user_offset=="empty"){
        window.location="/settings";
      }
      else{
            GetDataService.eventInfo(Number($scope.collabratorInfo.event_code)).then(function(res){
              if(res.result==1){
                 $scope.currentval =  res.event_data;
                 console.log( $scope.currentval);
                 $scope.collabaroterPermission = $scope.collabratorInfo.permissions;
                   $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
                    $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
                    angular.forEach($scope.collabaroterPermission,function(v,k){
                            angular.forEach($scope.permission,function(value,key){
                                  if($scope.collabaroterPermission[k].toLowerCase()==key.toLowerCase()){
                                        var permissions = {
                                          'name':key,
                                          'url':$scope.permission[key]
                                        };
                                        $scope.selectedPermission.push(permissions);
                                 }
                              
                            });

                    });
                localStorage.setItem('selectedPermission',JSON.stringify($scope.selectedPermission));
                localStorage.setItem('selEventsData',JSON.stringify(res.event_data));
                localStorage.setItem('selectedEventId',Number($scope.collabratorInfo.event_code));
              }

            });
      }
  }
  // else{
  //       // event related data is place  $('#data') by server
  //       var d= $('#data').val();
  //       if(d == undefined || d=='' || d==null){
  //         window.location=YaraBaseUrl.yara;
  //       }
  //       var s=d;
  //       var json = JSON.stringify(eval("(" + s + ")"));
  //       s=JSON.parse(json);
  //       localStorage.setItem("Logininfo",JSON.stringify(s));
  //       console.log(s);
  //       window.location.replace("/collaborator-dashboard"); 
  // }
    // checking gatekeeper is setup
 $scope.checkGatekeeper =function(){
      if($scope.collabratorInfo.user_offset!="empty"){
         if($scope.currentval.gate_keeper==0){
            localStorage.removeItem('infoPageErrors');
            var infoPageErrors = {
              errorNum:2,
              heading:$scope.currentval.name,
              subHeading:"",
              description:""
            };
            localStorage.setItem('infoPageErrors',angular.toJson(infoPageErrors));
            window.location = "/info";
          }
          else{
              window.location="/collaborator/gatekeeper";
          }
      }
  };
  // collaborator dashboard logout api call
  $scope.Logout = function(){
    GetDataService.Signout().then(function(res){
      if(res.result==1){
        localStorage.clear();
        window.location=YaraBaseUrl.yara;
      }
    });
  };
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
/* Showcase Dashboard*/

app.controller('ShowcaseDashboardCtrl',['$scope','APPService','fileReader','$timeout','YaraBaseUrl','$http','GetDataService','$rootScope',function($scope,APPService,fileReader,$timeout,YaraBaseUrl,$http,GetDataService,$rootScope){
  // =============================showcase dashboard ========================
    $scope.setOffset = function(d,offset){ return GetDataService.userOffsetTime(d,offset); };
    var d= $('#data').val();
    // if(d == undefined || d=='' || d==null){
    //   // window.location=YaraBaseUrl.yara;
    // }
    // console.log(d);
    if(d!=undefined && d!=null &&d!=''){
        // console.log(d);
        var s=d;
        var json = JSON.stringify(eval("(" + s + ")"));
        s=JSON.parse(json);
        localStorage.setItem("Logininfo",JSON.stringify(s));
        var  dashboardUrl = "showcase-dashboard";
        localStorage.setItem('dashboardUrl',dashboardUrl);  
        window.location.replace('/showcase-dashboard'); 
    }
    if(angular.fromJson( localStorage.getItem('Logininfo'))!=undefined){
        $scope.sponExhibInfo=angular.fromJson(localStorage.getItem('Logininfo'));
        if($scope.sponExhibInfo.user_offset=="empty"){
          window.location="/settings";
        }
        else{
              GetDataService.eventInfo(Number($scope.sponExhibInfo.event_code)).then(function(res){
                if(res.result==1){
                  $scope.currentval =  res.event_data;
                  $scope.s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
                  $scope.e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
                  localStorage.setItem('selEventsData',JSON.stringify(res.event_data));
                  localStorage.setItem('selectedEventId',Number($scope.sponExhibInfo.event_code));
                }

              });
        }
    }
  // permission list for showcase user
  $scope.permission={
    'Pin':'/showcase/app-pulse',
    'Coupons':'/event/coupon',
    'Validate Coupon':'/event/validate-coupon'
  };
  //logout showcase user
  $scope.Logout = function(){
      GetDataService.Signout().then(function(res){
        //console.log(res);
        if(res.result==1){
          localStorage.clear();
          window.location=YaraBaseUrl.yara;
        }
      });
  };
}]);
// Error Message Controller  for server side error
app.controller('ErrorMsgController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$rootScope){
  $scope.errMsgList=[];
  $scope.ds=$scope;
  // adding error message
  $scope.AddErrorMsg =function(){
    $scope.keyval=0;
    angular.forEach($scope.errMsgList,function(e,key){
      $scope.keyval=key;
    });
    ++$scope.keyval;
    if($scope.keyval>1){
      $http({
            method:'POST',
            url:YaraBaseUrl.url+'/ui_message/',
            data:{
              opp : 'add',
              key:Number($scope.keyval),
              value:$scope.msg
            }
        }).then(function success(response){
            //console.log(response);
            $timeout(function(){$scope.getErrormsg();},1000);
             $scope.showadd=false;
             $scope.msg='';
        },function failed(response){
            if(response.status==-1 || response.data==null){
                //$scope.errMsgList=[];
               // return {result:0,message:'You Are Not Connected to the Internet.'};
            }
           // $scope.errMsgList=[];
           // return {result:0,message:'Something went wrong'};
        });  
    }
  };
  // update error msg
  $scope.UpdateErrorMsg =function(code){
    $scope.ds.errordis[code]=true;
    ////console.log($scope.ds.error[code]);
    $http({
            method:'POST',
            url:YaraBaseUrl.url+'/ui_message/',
            data:{
              opp : 'edit',
              key:Number(code),
              value:$scope.ds.error[code]
            }
        }).then(function success(response){
            //console.log(response);
             $scope.getErrormsg();
        },function failed(response){
            if(response.status==-1 || response.data==null){
                $scope.errMsgList=[];
               // return {result:0,message:'You Are Not Connected to the Internet.'};
            }
            $scope.errMsgList=[];
           // return {result:0,message:'Something went wrong'};
        });  
  };
  // fetching error msg
  $scope.getErrormsg =function(){
     $http({
            method:'GET',
            url:YaraBaseUrl.url+'/ui_message/'
        }).then(function success(response){
            $scope.errMsgList= response.data.ui_messages;
        },function failed(response){
            if(response.status==-1 || response.data==null){
                $scope.errMsgList=[];
               // return {result:0,message:'You Are Not Connected to the Internet.'};
            }
            $scope.errMsgList=[];
           // return {result:0,message:'Something went wrong'};
        });    
  };
  $scope.getErrormsg();
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// For selecting time zone 
app.controller('timeZoneController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$rootScope){
    $scope.showTzlist = false;
    $scope.getTimezones = function(){
        $('#loading').show();
        GetDataService.getTimezone().then(function(response){
          if(response.result==1){
              $scope.timeZones = response.timezones;
              $scope.currentTimeZone = response.current_timezone;
              $scope.selectedTimeZone = response.current_timezone;
              $scope.is24Hours = response.is_time_format_24;
              $scope.fullName = response.user_full_name;
              $('#loading').hide();
              $('#container').fadeIn();
          }
        
        });
    };
    $scope.getTimezones();
    $scope.showTimeZones = function(){
    $scope.showTzlist = true;
    };
    $scope.selectTimeZone = function(tz){
        $scope.selectedTimeZone = tz;
        $scope.showTzlist = false;
    };
    $scope.Pname = "";
    $scope.middileNameMax = false;
    $scope.lastNameMax = false;
    $scope.firstNameMax = false;
    $scope.saveTimeZone =function(){
            $('#loading').show();
            $http({
                    method:'POST',
                    url:YaraBaseUrl.url+'/timezone-list/',
                    data:{current_timezone:$scope.selectedTimeZone,
                      is_time_format_24:$scope.is24Hours}
                }).then(function success(response){
                  if(response.data.result==1){
                     
                            window.location="/dashboard";
                        $('#loading').hide();
                        $('#container').fadeIn();
                     }
                     else{
                       $scope.errorStatus=true;
                        $scope.msg=response.data.message;
                        $('#loading').hide();
                        $('#container').fadeIn();
                     }
                },function failed(response){
                    if(response.status==-1 || response.data==null){
                    }
                }); 
    };
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
app.controller('eventLocationController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$rootScope){
    // check EP_code in localstorage ,to create event code is need 
    if(localStorage.getItem('epData')!= undefined && localStorage.getItem('epData')!= ''){
      $scope.EPdata=localStorage.getItem('epData');
      $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
    }
    else{
      window.location.replace("/packages");
    }
    var redirection = angular.fromJson(localStorage.getItem("redirectionInfo"));
    $scope.db;
    $scope.hideLocation=false;
    // getting address from map
    $scope.saveMap = function(){
        $scope.hideLocation=true;
        $scope.noAddress=false;
        $scope.addLine1 = "";
        $scope.addLine2 = "";
        $scope.city = "";
        $scope.state = "";
        $scope.country = "";
        $scope.zipCode = "";
        $scope.searchVal = "";
        $scope.venue = "";
        var addressInfo=angular.fromJson(localStorage.getItem('addressComp'));
        if(localStorage.getItem('placeName')!=null){
         $scope.venue = localStorage.getItem('placeName');
        }
        angular.forEach(addressInfo,function(value,key){

            if(addressInfo[key].types[0]=="street_number"){
              $scope.addLine1 += addressInfo[key].long_name +",";
            }
            else if(addressInfo[key].types[0]=="route"){

              $scope.addLine1 += addressInfo[key].long_name +",";
            }
            else if(addressInfo[key].types[0]=="sublocality_level_2"){

              $scope.addLine2 += addressInfo[key].long_name;
            }
            else if(addressInfo[key].types[0]=="sublocality_level_1"){

              $scope.addLine2 = addressInfo[key].long_name+",";
            }
            else if(addressInfo[key].types[0]=="locality"){

              $scope.addLine2 += addressInfo[key].long_name;
            }
            else if(addressInfo[key].types[0]=="administrative_area_level_2"){

              $scope.city = addressInfo[key].long_name;
            }
            else if(addressInfo[key].types[0]=="administrative_area_level_1"){

              $scope.state = addressInfo[key].long_name;
            }
            else if(addressInfo[key].types[0]=="country"){

              $scope.country = addressInfo[key].long_name;
              $scope.country_short_name = addressInfo[key].short_name;
            }
            else if(addressInfo[key].types[0]=="postal_code"){

              $scope.zipCode = addressInfo[key].long_name;
            }
        });
        localStorage.removeItem('addressComp');
        localStorage.removeItem('placeName');
        if($scope.addLine1=='' || $scope.city=='' || $scope.state=='' || $scope.country=='' || $scope.zipCode==''|| $scope.venue==''){
          $scope.noAddress=true;
        }
    };
    $scope.getDialCode=function(){
          $http({method:'GET',
              url:'../dial_code_json' 
            }).then(function success(response){
              $scope.dailcode=response.data;
              console.log($scope.dailcode);
            });
    };
    $scope.getDialCode();
    // Manual location redirection
    $scope.manualLocation = function(){
      if(redirection!=null && redirection.locPlace && redirection.editlocPlace){
         redirection.editeventInfo=true;
      }
      localStorage.setItem("redirectionInfo",JSON.stringify(redirection));
      window.location = "/create-event-set-location-manually";
    };
    // saving address info to indexdb
    $scope.saveLocinfo = function(){
        var locInfo = {
          'venu': $scope.venue,
          "addLine1":$scope.addLine1,
          "addLine2":$scope.addLine2,
          "city":$scope.city,
          "state":$scope.state,
          "country":$scope.country,
          "zipCode":$scope.zipCode,
          "shortName":$scope.country_short_name,
          "geoloc":{
                      "lat":localStorage.getItem("lat"),
                      "lng":localStorage.getItem("lng")
                  }
          };
          localStorage.setItem("latandLong",JSON.stringify({lat:localStorage.getItem("lat"),lng:localStorage.getItem("lng")}));
          redirection.locPlace = true;
          // ----------------------------country code------------------------------
                if($scope.dailcode[$scope.country_short_name]=='')
                  $scope.phdialreq=false;
                else
                  $scope.phdialreq=true;
                if($scope.dailcode[$scope.country_short_name].indexOf('and')<0){
                  $scope.phDailCode=$scope.dailcode[$scope.country_short_name];
                }
                else{
                   $scope.phDailCode=$scope.dailcode[$scope.country_short_name].split('and')[0];
                }
                if($scope.phDailCode!='' && $scope.phDailCode.indexOf('+')<0){
                  $scope.phDailCode ="+"+$scope.phDailCode;
                }
                var phone={
                        phDailCode:$scope.phDailCode,
                        phdialreq:$scope.phdialreq
                }
                localStorage.setItem("phonInfo",JSON.stringify(phone));
          // ----------------------------country code------------------------------
          localStorage.setItem('country',$scope.country);
          $scope.addtoIndexdb(locInfo);  
    };
    $scope.clearDb = function(){
      console.log("empty");
      var transaction = $scope.db.transaction(["locInfo"], "readwrite");
      // create an object store on the transaction
      var objectStore = transaction.objectStore("locInfo");

      // clear all the data out of the object store
      var objectStoreRequest = objectStore.clear();
      objectStoreRequest.onsuccess = function(event){
          console.log("empty");
      };
    };
    $scope.addtoIndexdb = function(locVal){
        var request = window.indexedDB.open("yaraDB9.db",1);
        request.onsuccess = function(event){
          $scope.db=event.target.result;
          console.log("db created success");
          console.log(event);

          $scope.addlocInfo(locVal);
        };
        request.onerror = function(event){
              console.log("error");

        };
        request.onupgradeneeded = function(event){
            console.log("new db");
          $scope.db=event.target.result;

          $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
        };
    }; 
    // editing location
    if(redirection!=null && redirection.locPlace && !redirection.editlocPlace){
          window.location="/dashboard";
    }
    else if(redirection!=null && redirection.locPlace && redirection.editlocPlace){
      $scope.hideLocation=true;
      $scope.noAddress=false;
      $scope.eventInformation = [];
      $scope.keyVal = [];
      var countUp = function(){
        $scope.timeInMs+= 500;
        $timeout(countUp, 500);  
      }
      $timeout(countUp, 500);
      // index db start
      var request = window.indexedDB.open("yaraDB9.db",1);
      request.onsuccess = function(event){
        $scope.db=event.target.result;
        console.log("db created success");
        console.log(event);
        $scope.getAllinfo();
      };
      request.onerror = function(event){
            console.log("error");
      };
      request.onupgradeneeded = function(event){
         console.log("new db");
         $scope.db=event.target.result;
         $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
      };
      $scope.getAllinfo=function(){
          console.log("calling index db");
          var transaction =$scope.db.transaction(["locInfo"],"readonly");
          var objectStore = transaction.objectStore("locInfo");
          var request = objectStore.openCursor();
          request.onsuccess = function(event){
                   var cursor = event.target.result;
                  if(cursor) {
                    $scope.eventInformation.push(cursor.value);
                    $scope.keyVal.push(cursor.key);
                    cursor.continue();
                  } else {
                        console.log("no more results");
                  }
          };
          transaction.oncomplete = function (event){
            $scope.eventLoc = $scope.eventInformation[2].location;
            console.log($scope.keyVal);
           // $scope.eventInfo = $scope.eventInformation[4];
           // $scope.creatingEventdetails = $scope.eventInformation[2];
            $scope.displayInfo();
          };
      };
      //  end index db 
    }
    $scope.displayInfo = function(){
      console.log( $scope.eventLoc);

              $scope.addLine1 = $scope.eventLoc.addLine1;
              $scope.addLine2 = $scope.eventLoc.addLine2;
              $scope.city = $scope.eventLoc.city;
              $scope.state = $scope.eventLoc.state;
              $scope.country = $scope.eventLoc.country;
              $scope.zipCode = $scope.eventLoc.zipCode;
              $scope.venue = $scope.eventLoc.venu;
              $scope.country_short_name = $scope.eventLoc.shortName;
              localStorage.setItem("lat",$scope.eventLoc.geoloc.lat);
              localStorage.setItem("lng",$scope.eventLoc.geoloc.lng);
    };
    $scope.addlocInfo = function(locInfo){
      if(redirection!=null && redirection.locPlace && redirection.editlocPlace){
         redirection.editeventInfo=true;
      } 
      var transaction = $scope.db.transaction(["locInfo"],"readwrite");
      var objectStore = transaction.objectStore("locInfo");
      var request = objectStore.put({itemId: "location", location:locInfo});
      request.onsuccess = function(event){
        localStorage.setItem("redirectionInfo",JSON.stringify(redirection));
        window.location.href = "/create-event-info";
      };
    };
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
app.controller('EventTracksController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$rootScope){
    
    var eventReadyRedirection=angular.fromJson(localStorage.getItem('eventReadyRedirection'));
    if(eventReadyRedirection==undefined||eventReadyRedirection.tracks==true){
      window.location="/dashboard";
    }
    $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);}; 
    var selectedval=localStorage.getItem('selectedEventId');
    if(selectedval=== undefined || selectedval === null)
    {
        window.location = "/events";
    }else{
      var selevntdata=localStorage.getItem('selEventsData');
      $scope.currentval=angular.fromJson(selevntdata);
      $scope.trackName = "";
      $scope.trackList = [];
      $scope.duplicates = [];
      $scope.duplicateTrack=false;
    }
    //  adding track to the created event
    $scope.addTrackname = function(){
          $scope.validTrack=false;
          $scope.invalidTrack=false;
          $scope.invalidTracknum=false;
          // var regExp1 = /^track\W+[1-9][0-9]*|0$/;
          // var regExp2 = /^track\W+/;
          // var regExp3 = /^track/;
          var regExp4 = /^track[1-9][0-9]*$/;
          // var regExp5 = /^track_[1-9][0-9]*|0$/;
          var regExp5 = /^track[^a-zA-Z0-9][0-9][0-9]*$/;
          var track = $scope.trackName.toLowerCase();

          if($scope.trackName.toLowerCase() =="track"){
            $scope.invalidTrack=true;
            $scope.validTrack=true;
          }
          // if(regExp1.test(track) ||regExp2.test(track) ||regExp3.test(track) ||regExp4.test(track) ||regExp5.test(track)){
          //   console.log("invalid");
          //     $scope.invalidTrack=true;
          //     $scope.validTrack=true;
          // }
          else if(regExp4.test(track) || regExp5.test(track)){
              console.log("invalid");
              $scope.invalidTrack=true;
              $scope.validTrack=true;
          }
          if($scope.validTrack==false){                     
                        var trk = {
                          trackNme:$scope.trackName,
                          dupe:false
                        }
                $scope.trackList.push(trk);
                $scope.duplicates.push(false);
                $scope.checkTrackname();
                $scope.trackName ='';
          }
          $('#text-focus').focus();
    };
    $scope.deleteTrack =function(index){
            $scope.trackList.splice(index,1);
            $scope.duplicates.splice(index,1);
            $scope.checkTrackname();
    };
    $scope.trackfocus=function() {      
      $timeout(function() {
          $('#text-focus').focus();
      }, 100);
    }
    // checking duplicates track
    $scope.checkTrackname=function(){
        $scope.duplicateTrack=false;
              var arr = [];
              angular.forEach($scope.trackList,function(value,key){
                if($scope.trackList[key]!=undefined){
                    var info={
                      track:$scope.trackList[key].trackNme,
                      key:key,
                    }
                    arr.push(info);
                    $scope.duplicates[key]=false;
                }
              });

          arr = arr.sort(function(a, b){
              var x = a.track.toLowerCase();
              var y = b.track.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
              // console.log(arr);
              var sorted_arr = arr;
              for (var i = 0; i < arr.length - 1; i++) {
                // console.log(sorted_arr[i + 1].dayname+"==="+sorted_arr[i].dayname);
                  if (sorted_arr[i + 1].track.toLowerCase() == sorted_arr[i].track.toLowerCase()) {

                       $scope.duplicates[sorted_arr[i+1].key]=true;
                        $scope.duplicateTrack = true;
                        // $timeout(function(){
                        //   APPService.scrollJquery('dupe');
                        // },100);
                  }
              }
    };
    $scope.tracknamecheck=function (ind, tkname) {
          $scope.trackvalue=false;
          var main='invalidTrack'+ind;
          $scope[main]=false;
          $scope.tkname=tkname;
          var regExp4 = /^track[1-9][0-9]*$/;
          var regExp5 = /^track[^a-zA-Z0-9][0-9][0-9]*$/;
          var track = $scope.tkname.toLowerCase();

          if($scope.tkname.toLowerCase() =="track"){
            $scope[main]=true;
            $scope.trackvalue=true;
          }
          else if(regExp4.test(track) || regExp5.test(track)){
              $scope[main]=true;
              $scope.trackvalue=true;
          }
    }
    $scope.saveTrack = function(){
        $('#loading').show();
        if($scope.trackName.length>0){
          $scope.addTrackname();
        }
        var tracks = [];
              angular.forEach($scope.trackList,function(value,key){
                
                  if($scope.trackList[key].trackNme!=""){
                    tracks.push($scope.trackList[key].trackNme);
                  }
              });
        if($scope.duplicateTrack==false && tracks.length>0){             
              $http({method:'POST',
                url:YaraBaseUrl.url+'/track/',
                data:{
                  event_code:$scope.currentval.event_code,
                  name:tracks,
                  track_based:1
                }
              }).then(function success(response){
                console.log(response);
                $scope.trackdata=response.data;
                if($scope.trackdata.result==1){
                    eventReadyRedirection.tracks = true;
                    // editEventDetails.eventReady = false;
                    localStorage.setItem("eventReadyRedirection",JSON.stringify(eventReadyRedirection));
                    window.location = "/event-setup-gatekeeper";
                }else if($scope.trackdata.result == 0 ){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.trackdata.error=$scope.trackdata.message;
                }else {
                  $scope.trackdata.error=GetDataService.errorMsg[1];
                }
              },function error(response){
                    $scope.trackdata={};
                    $('#loading').hide();
                    $('#container').fadeIn();
                    if(response.status==-1 || response.data==null){
                                  if($rootScope.online==false)
                                  {
                                       $scope.trackdata.error=GetDataService.errorMsg[0];
                                   }
                                   else{
                                      $scope.trackdata.error=GetDataService.errorMsg[1];
                                   }
                    }else
                    $scope.trackdata.error=GetDataService.errorMsg[1];
              });
        }
        else if($scope.duplicateTrack==false && tracks.length==0 && $scope.trackList.length==0){
            // $('#loading').hide();
            // $('#container').fadeIn();
            $scope.defaultTracks(0);
        }
        else if($scope.trackList.length>0 && tracks.length==0 ){
            $('#loading').hide();
            $('#container').fadeIn();
        }
    };
    //saving track enabled or not
    $scope.defaultTracks=function(val)
    {
          $http({method:'POST',
            url:YaraBaseUrl.url+'/track/',
            data:{
              event_code:$scope.currentval.event_code,
              track_based:val
            }
          }).then(function success(response)
          {
               console.log(response);
              $scope.trackdata=response.data;
              if($scope.trackdata.result==1){
                      eventReadyRedirection.tracks=true;
                      localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
                      window.location = "/event-setup-gatekeeper";
                    // }
              }else if($scope.trackdata.result == 0 ){
                $scope.trackdata.error=$scope.trackdata.message;
              }else {
                $scope.trackdata.error=GetDataService.errorMsg[1];
              }
        },function error(response){
              $scope.trackdata={};
              if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                       $scope.trackdata.error=GetDataService.errorMsg[0];
                   }
                   else{
                      $scope.trackdata.error=GetDataService.errorMsg[1];
                   }
              }else
              $scope.trackdata.error=GetDataService.errorMsg[1];
        });
    };
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
app.controller('SessionEngageController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$document','$timeout','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$document,$timeout,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // $scope.headerTitle="Schedule";
  //getting selected event data from local data
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}
  if(selectedval=== undefined || selectedval === null)
  {
        window.location.replace("/events");
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name + '- Session Engage';
  localStorage.removeItem('sessId');
  localStorage.removeItem('editSession');
  //time offset 
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.currentLocalTime = function(){
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
      if (res.result == 1) {
         $scope.timeNow = res.local_time_now;
         $scope.localTimeNow = new Date();
      }
    });
  };
  $scope.currentLocalTime();
  $scope.checkTimeNow = function(endTime){
    var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
    diff /= 60;  
    var eventTime = $scope.setOffset($scope.timeNow,Math.abs(Math.round(diff)));
    if(eventTime>$scope.setOffset(endTime,$scope.currentval.eo)){
      return false;
    }
    return true;
  };
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  console.log($scope.eventDaysInfo);
  $scope.seltab=$scope.eventDaysInfo[0].dayID;
  $scope.expday=$scope.eventDaysInfo[0].isDayActive;
  $scope.dbutton=($scope.eventDaysInfo.length-3);
            $timeout(function(){
              if($(".slider").length>0){
                $(".slider").diyslider({
                    width: "100%", // width of the slider
                    height: "51px", // height of the slider
                     minSlides: 2, // number of slides you want it to display at once
                    loop: false, // disable looping on slides
                    moveSlides: 1,
                });
              }
            },100);

  // set Day Information
  $scope.setDayInfo =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayInfo();
  $scope.dates={};
  $scope.dayscount=Object.keys($scope.currentval.days).length;
  var d = APPService.Dateslist(st_date,$scope.dayscount);
  $scope.service=APPService;
  angular.forEach(d,function(d){
    $scope.dates[d]=$scope.currentval.days[d];
  });

   $scope.sessionData =[];
  $scope.exScope=$scope;
  // select day tab
  $scope.selecttab = function(d){
    console.log(d);
    $scope.seltab=d.dayID;
    $scope.expday=d.isDayActive;
  };
  $scope.seslist="";
  $scope.listallSessions = function(){
      $('#loading').show();
      var  param = {
          bs:0,
          event_code:$scope.currentval.event_code
      };
      GetDataService.getallSessions(param).then(function(res){
          console.log($scope.currentval.event_code);
          if(res.result==1){
           console.log(res);
           $scope.sessionList = res.sessions;
           $scope.eo = res.eo;
           $('#loading').hide();  
           $('#container').fadeIn();
        }
      });
  };
  $scope.listallSessions();
  $scope.sessionEngage=function(index,code, status, speakerengage) {
       $('#loading').show();

    // $scope.disable="Enable"; 
    $scope.sessionname=status;
    $scope.sessioncode=code;
    $scope.speaker_engage=speakerengage; 
    $scope.satuschange(index,code, speakerengage);
    // if ($scope.speaker_engage==true) {
    //   $scope.disable="Disable";
    // }else{
    //   $scope.disable="Enable";
    // }
  };
  // $scope.disablesessionencage=function (code, status, speakerengage) {
  //   $scope.sessionname=status;
  //   $scope.disable="Disable";
  //   $scope.sessioncode=code;
  //   $scope.speaker_engage=speakerengage;
  // };
  //enable disable api intergation
  $scope.filtersort=function (status) {
    $scope.sorts=status;
  }

  $scope.satuschange=function (index,code, speakerengage) {
    if (speakerengage==true) {
      $scope.speakerengage=false;
    }else {
      $scope.speakerengage=true;      
    }
    $http({
          method:'POST',
          url:YaraBaseUrl.url+'/speaker_engage/',
          data:{
            event_code:$scope.currentval.event_code,
            session_code:code,
            speaker_engage:$scope.speakerengage, 
            day_id:$scope.seltab
          }
        })
        .then(function success(response){       
          if(response.data.result==1){
                 // $scope.sessionList[index].is_speaker_engage =  speakerengage;
                $scope.listallSessions();
              //  $('#loading').hide();  
              // $('#container').fadeIn();
          }
        },function error(response){
          console.log(response);
        });
  }; 
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.controller('EventCupponValidationCtrl',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$document','$timeout','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$document,$timeout,$rootScope){
  var event_code=localStorage.getItem('selectedEventId');
  if(event_code == undefined || event_code=='' || event_code==null)
    window.location='/showcase-dashboard';
    $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  $scope.currentval=angular.fromJson(localStorage.getItem('selEventsData'));
  $scope.spPeople = $scope.currentval.sp_people;
  var addDelegate = {
    group_tittle:"Delegates",
    id:10,
    single_entity_tittle:"Delegate"
  };
  $scope.spPeople.push(addDelegate);
  $timeout(function(){$('#dcid').focus();},500);
  $scope.showdatas=true;
  $scope.validateCoupon=function () {
    $scope.showerror = false;
    $('#loading').show();
    var params={
          event_code:$scope.currentval.event_code,
          delegate_code:$scope.usercode
        };
    GetDataService.delegateCoupons(params).then(function(response){
        console.log(response);
        if(response.result==1){
             $scope.showdatas=false;
             $scope.shockvalue=response;  
             $scope.pass=response.user_data;   
             for (var i = $scope.spPeople.length - 1; i >= 0; i--) {
                if($scope.spPeople[i].id==response.user_data.delegate_type){
                    $scope.delegateType = $scope.spPeople[i].single_entity_tittle;
                }
              };         
             $('#loading').hide();
             $('#container').fadeIn();
        }else if(response.result==0){
              $scope.showerror = true;
              $scope.errmsg = response.message;
              $('#loading').hide();
              $('#container').fadeIn();
        }
    });
  };
  $scope.reedeemCoupon=function (code) {
    $http({
            method:'POST',
            url:YaraBaseUrl.url+'/coupon_zone/',
            data:{
              event_code:$scope.currentval.event_code,
              delegate_code:$scope.usercode,
              coupon_code:code
            }
          })
          .then(function success(response){       
            if(response.data.result==1){
                $scope.validateCoupon();
            }
          },function error(response){
            console.log(response);
          });
  };
  $scope.Logout = function(){
    GetDataService.Signout().then(function(res){
      //console.log(res);
      if(res.result==1){
        localStorage.clear();
        window.location=YaraBaseUrl.yara;
      }
    });
  };
}]);
app.filter("imagefilterQ2", function () {
  return function (url) {
    var result=url;
    if(url!=undefined||url!=null){
      var getext=url.split('.').pop();
      var urlcopy=url;
      result=url.replace('.'+getext, '_Q2.'+getext);
    }
    return result;
  }
});
app.filter("imagefilterQ1", function () {
  return function (url) {
    var result=url;
    if(url!=undefined||url!=null){
      var getext=url.split('.').pop();
      var urlcopy=url;
      result=url.replace('.'+getext, '_Q1.'+getext);
    }
    return result;
  }
});
// general page controller
app.controller('EventGeneralController',['$scope','fileReader','$timeout','$location','$filter','GetDataService','$http','YaraBaseUrl','APPService','$rootScope',function($scope,fileReader,$timeout,$location,$filter,GetDataService,$http,YaraBaseUrl,APPService,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  //fetch event details
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.pintopulse = $scope.currentval.kits['Pin To Pulse']
    document.title='YARA - '+$scope.currentval.short_name+' - General';
    $scope.showMap = false;
  }
  //time offset 
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  if(GetDataService.getPrivilege(12)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  $scope.key=YaraBaseUrl.captcha_key;
  $scope.service=APPService;
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  // set Day Information
  $scope.setDayInfo =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayInfo();
  // check social details
  $scope.checkSocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.eventweb.length>7){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.eventtwitter.length!=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.eventfb.length!=25){
      flag=1; 
    }else if($scope.social_type=='phone' && $scope.eventph!=undefined && $scope.eventph.length!=0){
      flag=1; 
    }else if($scope.social_type=='message' && $scope.eventemail!=undefined && $scope.eventemail.length!=0){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
    if(flag==1){
       $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
  }
  //validate and update link
  $scope.updateSocials = function(){
    var s=['company-website','twitter','facebook','phone','message'];
    for(var i=0;i<s.length;i++){
      var flag=0;
       if(s[i]=='company-website' && $scope.eventweb.length>7){
      flag=1;
    }else if(s[i]=='twitter' && $scope.eventtwitter.length!=20){ 
      flag=1; 
    }else if(s[i]=='facebook' && $scope.eventfb.length!=25){
      flag=1; 
    }else if(s[i]=='phone' && $scope.eventph!=undefined && $scope.eventph.length!=0){
      flag=1; 
    }else if(s[i]=='message' && $scope.eventemail!=undefined && $scope.eventemail.length!=0){
      flag=1; 
    }
    var currId= GetDataService.getSocailId(s[i]);
      if(flag==1){
         $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
  };
  // save socail ids
  $scope.saveSocials =function(){
    $scope.eventph=$scope.Teventph;
    $scope.eventweb=$scope.Teventweb;
    $scope.eventfb=$scope.Teventfb;
    $scope.eventtwitter=$scope.Teventtwitter;
    $scope.eventemail=$scope.TeventEmail;
    $scope.checkSocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
  });
  //assign prev value on cancel
  function assignsocial(){
    $scope.Teventph=$scope.eventph;
    $scope.TeventEmail=$scope.eventemail;
    $scope.Teventweb=$scope.eventweb;
    $scope.Teventfb=$scope.eventfb;
    $scope.Teventtwitter=$scope.eventtwitter;
    //$scope.$apply();
  }
  //on social link popup hidden
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      assignsocial();
      $scope.checkSocials();
    }
  });
  // window before close checking for changes and alert
  window.onbeforeunload = function (event) {
      if($scope.infoUpdate || $scope.contactUpdate ){
        var message = 'Do you want to discard changes?';
        if (typeof event == 'undefined') {
          event = window.event;
        }
        if (event) {
          event.returnValue = message;
        }
        
          return message;
      }
  }
  $scope.infoUpdate=false;
  //check for data change in general page info
  $scope.changeInfo = function(){
    $scope.infoUpdate=false;
    if($scope.currentval.short_name !=  $scope.evtshrtname)
      $scope.infoUpdate=true;
    if($scope.currentval.description != $scope.evtdesc)
      $scope.infoUpdate=true;
    if($scope.currentval.agenda_image!= $scope.imageSrc1)
      $scope.infoUpdate=true;
    if($scope.currentval.event_logo != $scope.cmpyimageSrc)
      $scope.infoUpdate=true;
  };
  $scope.$watchCollection('[evtshrtname,evtdesc,imageSrc1,cmpyimageSrc]',function(){
    $scope.changeInfo();
  });
  $scope.contactUpdate=false;
  // checking for contact information changes
  $scope.changeContact = function(){
    $scope.contactUpdate=false;
    // if(!$scope.isEventPrvt){
      if($scope.currentval.phone_number != $scope.phDailCode+' '+$scope.eventph)
        $scope.contactUpdate=true;
      if($scope.currentval.website != $scope.eventweb)
       $scope.contactUpdate=true;
      if($scope.currentval.facebook != $scope.eventfb)
       $scope.contactUpdate=true;
      if($scope.currentval.twitter != $scope.eventtwitter)
       $scope.contactUpdate=true;
      if($scope.currentval.email != $scope.eventemail)
       $scope.contactUpdate=true;
    // }
  };
  //watching for value changes
  $scope.$watchCollection('[phDailCode,eventph,eventweb,eventfb,eventtwitter,eventemail]',function(){
    $scope.changeContact();
  });
  $scope.cmpyimageSrc=$scope.currentval.event_logo;
  $scope.imageSrc1=$scope.currentval.agenda_image;
  $scope.searchloc={
    latitude:$scope.currentval.latitude,
    longitude:$scope.currentval.longitude
  };
  $scope.evtname=$scope.currentval.name;
  $scope.evtshrtname=$scope.currentval.short_name;
  $scope.evtcatg=$scope.currentval.event_type;
  $scope.evtsubcatg=$scope.currentval.event_sub_type;
  $scope.evtdesc=$scope.currentval.description;
  var startDate = $filter('date')($scope.currentval.start_date );
  $scope.evntstartdate=  $scope.setOffset(startDate,$scope.currentval.eo);
  $scope.evntenddate= $scope.setOffset($filter('date')($scope.currentval.end_date),$scope.currentval.eo); 
  $scope.dayscount=Object.keys($scope.currentval.days).length;
  var d = APPService.Dateslist($scope.currentval.start_date,$scope.dayscount);
  $scope.venu=$scope.currentval.venue;
  $scope.addrline1=$scope.currentval.address_line1;
  $scope.addrline2=$scope.currentval.address_line2;
  $scope.addrline2=($scope.addrline2=="undefined")? '':$scope.addrline2;
  $scope.venucity=$scope.currentval.city;
  $scope.venustate=$scope.currentval.state;
  $scope.venucountry=$scope.currentval.country;
  $scope.venupincode=$scope.currentval.zip;
  $scope.isEventPrvt=$scope.currentval.is_private;
  // if(!$scope.isEventPrvt){
  var ph=$scope.currentval.phone_number;
  ph=ph.split(' ');
  $scope.phDailCode=ph[0];
  $scope.eventph=ph[1];
  $scope.phdialreq=true;
  if(ph[0].length>8){
  $scope.phDailCode='';
  $scope.eventph=ph[0];
  $scope.phdialreq=false;
  }
  $scope.eventemail=$scope.currentval.email;
  $scope.eventweb=$scope.currentval.website;
  $scope.eventfb=$scope.currentval.facebook;
  $scope.eventtwitter=$scope.currentval.twitter;
  assignsocial();
  $scope.updateSocials();
  // }  
  $scope.dates=[];
  angular.forEach($scope.datelisting,function(d){
      angular.forEach(d,function(date,key){
        $scope.dates.push(key);
      });
  });
  $scope.changeInfo();
  $scope.changeContact();
  $scope.typechange='';
  // validate and scroll to error page
  $scope.errorscroll =  function(){
    if($scope.infoForm.$invalid && ($scope.evtdesc=="" ||$scope.evtdesc==undefined ||$scope.evtdesc==null)){
       $timeout(function(){
             APPService.scrollJquery('eventdesc');
       },100);
    }
    else if($scope.infoForm.$valid && $scope.cmpyimageSrc==""){
       $timeout(function(){
             APPService.scrollJquery('logo_error');
       },100);
    }
  };
  // $scope.imageSrc1
  $scope.removedAgendaImanage==0;
  $scope.$watch('imageSrc1', function(newval,oldval){
     if($scope.imageSrc1==''){
          // fd.append('new_agenda_image',1);
          $scope.removedAgendaImanage=1;
        }
  },true);
  // api call for update info
  $scope.updateinfo = function(type){
    $('#loading').show();
    $scope.typechange=type;
      if($scope.imageSrc1=="")
       $scope.imageSrc1=$scope.currentval.agenda_image;
       var fd = new FormData();
       fd.append('opp','edit');
        fd.append('event_code',$scope.currentval.event_code);
        if(type=='info'){
        fd.append('short_name',$scope.evtshrtname);
        fd.append('description', $scope.evtdesc);
        fd.append('website',$scope.currentval.website);
        fd.append('facebook',$scope.currentval.facebook);
        fd.append('twitter',$scope.currentval.twitter);
        fd.append('email',$scope.currentval.email);  
         fd.append('phone_number',$scope.currentval.phone_number);
          var logoChange=false;
        angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
          fd.append('event_logo',model.file);
          logoChange=true;
        });
        var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
        if(len==0){
          fd.append('event_logo','');
          fd.append('new_event_logo',0);
        }
        else{
          fd.append('new_event_logo',1);
        }
        //fd.append('logo', $scope.cmpylogo);
        // $scope.imageSrc1
        var coverChange=false;
        angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
          fd.append('agenda_image',model.file);
          coverChange=true;
        });
         len=$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
        if(len==0){
          fd.append('agenda_image','');
          if($scope.removedAgendaImanage==1){
            fd.append('new_agenda_image',1);
          }else{
            fd.append('new_agenda_image',0);
          }
        }{
            if($scope.removedAgendaImanage==0 || len>0){
               fd.append('new_agenda_image',1);
            }
        }
        }else{
          fd.append('short_name',$scope.currentval.short_name);
        fd.append('description', $scope.currentval.description);
        fd.append('phone_number',$scope.phDailCode+' '+$scope.eventph);
       
        //fd.append('cover_image',$scope.coverimg);
        fd.append('website',$scope.eventweb);
        fd.append('facebook',$scope.eventfb);
        fd.append('twitter',$scope.eventtwitter);
        fd.append('email',$scope.eventemail);  
        }
        $scope.data={};
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/event_edit/',
          data:fd,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function success(response){
          $scope.data=response.data;
          //console.log($scope.data);
          if($scope.data.result==null || $scope.data.result== undefined){
              $scope.errormsg=true;
              $scope.data.error=GetDataService.errorMsg[1];
              //console.log($scope.data);
          }else if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.data.error=$scope.data.message;
             //console.log($scope.data);
          }else if($scope.data.result==1){
              $scope.errormsg=true;
              $scope.data.error=$scope.data.message;
              GetDataService.getEvent(selectedval).then(function(res){
                if(res.result==1){
                  $scope.eventsdata=res.events;
                  $scope.currentval=$scope.eventsdata[0];
                  localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                  if(type=='info'){
                      $scope.currentval.short_name=$scope.evtshrtname;
                      $scope.currentval.description= $scope.evtdesc;
                      $scope.cmpyimageSrc=$scope.currentval.event_logo;
                      $scope.imageSrc1=$scope.currentval.agenda_image;
                      $scope.changeInfo();
                  }else{
                      $scope.currentval.phone_number=$scope.phDailCode+' '+$scope.eventph;
                      $scope.currentval.website=$scope.eventweb;
                      $scope.currentval.facebook=$scope.eventfb;
                      $scope.currentval.twitter=$scope.eventtwitter;
                      $scope.currentval.email=$scope.eventemail;
                      $scope.changeContact();
                  }
                  $('#loading').hide();  
                  $('#container').fadeIn();
                }
              });  
          }
        },function error(response){
          $scope.data={};
          //console.log(response);
           $scope.errormsg=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }                
          }else
          $scope.data.error=GetDataService.errorMsg[1];
        });
  };
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }else if($scope.cropType=='coverimg'){  
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.cmpyimageSrc=$scope.currentval.event_logo;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1=$scope.currentval.agenda_image;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.coverimg.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
     var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.infoForm.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.cmpyimageSrc=$scope.currentval.event_logo;
          }else{
            $scope.infoForm.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
            GetDataService.getImgDimensions(result,function(width, height) {
                if(width >=1024  && height >= 1024 ){
                  $scope.infoForm.cmpylogo.$setValidity('minDimension',true);
                  if(width ==1024  && height == 1024){
                    $scope.cmpyimageSrc=result;
                  }else{
                      $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                  
                  }
                  /*if(width == height){
                    $scope.profileform.pofilePic.$setValidity('ratioval',true);
                    
                  }else{
                    $scope.profileform.pofilePic.$setValidity('ratioval',false);
                    model.setType(4);
                    $scope.imageSrc=$scope.currtuser.profile_picture;
                  }*/
                }else{
                  $scope.infoForm.cmpylogo.$setValidity('minDimension',false);
                  model.setType(4);
                 $scope.cmpyimageSrc=$scope.currentval.event_logo;
                }
                $scope.$apply();
            });
            
        });
        }
        }
      });
    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);

        }else{
          if(model.file.size > 5242880){
            $scope.infoForm.coverimg.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc1=$scope.currentval.agenda_image;
          }else{
            $scope.infoForm.coverimg.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 1024 && height >= 1024 ){
                $scope.infoForm.coverimg.$setValidity('minDimension',true);
                 if(width == 1024 && height == 1024 ){
                  $scope.imageSrc1 = result;
                 }else{
                  $scope.cropType='coverimg';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  $timeout(function() {
                    $scope.lodinghide=true;
                  }, 2000);
                }
              }else{
                $scope.infoForm.coverimg.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc1=$scope.currentval.agenda_image;
              }
              $scope.$apply();
          });
            
        });
        }
        }
      });
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.cmpyimageSrc=$scope.currentval.event_logo;
    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1=$scope.currentval.agenda_image;
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  // get refund price while cancel image
  $scope.getRefund =function(){
    $scope.refundAvilabile = false;
      $http({
          method:'POST',
          url:YaraBaseUrl.url+'/event_cancel_refund/',
          data:{
            event_code:$scope.currentval.event_code
          },
        }).then(function success(response){
          $scope.data1=response.data;
          //console.log($scope.data1);
          if($scope.data1.result==null || $scope.data1.result== undefined){
              $scope.errormsg1=true;
              $scope.data1.error=GetDataService.errorMsg[1];
          }else if($scope.data1.result==0){
            $scope.errormsg1=true;
            $scope.data1.error=$scope.data1.message;
          }else if($scope.data1.result==1){ 
            // console.log($scope.data1.refund) ;
            $timeout(function(){$('#reason_id').focus();},1000);

            if($scope.data1.refund!==0){
              $scope.refundAvilabile = true;
            }

             $scope.errormsg1=true;
            $scope.data1.error=$scope.data1.message;
            $scope.evtcls=true;
          }
         
        },function error(response){
          $scope.data1={};
          //console.log(response);
           $scope.errormsg1=true;
          if(response.status==-1 || response.data==null){
                  $scope.data1.error=GetDataService.errorMsg[0];
          }else
          $scope.data1.error=GetDataService.errorMsg[1];
          
        });
  };
  //checking the length of reason in canceling event
  $scope.reasonLength = function(rsn){
    $scope.enableCancel = false;
    console.log($scope.enableCancel);
    if(rsn==undefined ||rsn==null || rsn=='' || rsn.trim().length<=10){
        $scope.enableCancel = true;
      }
  };
  // scroll error
  $scope.errscroll=function () {
    $scope.showerr=true
    $timeout(function() {
      if ($scope.enableCancel==true) {
        APPService.scrollJquery('reason_id');
      }
    }, 100);
  }
  //cancel image conformation
  $scope.DelEvent =function(){
    // console.log("reach")
    $('#loading').show();
      $http({
          method:'POST',
          url:YaraBaseUrl.url+'/event_edit/',
          data:{
            event_code:$scope.currentval.event_code,
            reason:$scope.reason,
            opp:'cancel'
          },
        }).then(function success(response){
          $scope.data2=response.data;
          // console.log($scope.data2);
          if($scope.data2.result==null || $scope.data2.result== undefined){
              $scope.errormsg2=true;
              $scope.data2.error=GetDataService.errorMsg[1];
              $('#loading').hide();  
              $('#container').fadeIn();
          }else if($scope.data2.result==0){
            $scope.errormsg2=true;
            $scope.data2.error=$scope.data2.message;
            $('#loading').hide();  
            $('#container').fadeIn();
          }else if($scope.data2.result==1){  
            $scope.errormsg2=true;
            $scope.data2.error=$scope.data2.message;
            localStorage.removeItem('selEventsData','');
            localStorage.removeItem('selectedEventId','');
            window.location="/events"
          }
         
        },function error(response){
          $scope.data2={};
          //console.log(response);
           $scope.errormsg2=true;
          if(response.status==-1 || response.data==null){
                  $scope.data2.error=GetDataService.errorMsg[0];
                  if($rootScope.online==false)
                  {
                      $scope.data2.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data2.error=GetDataService.errorMsg[1];
                  }                
          }else
          $scope.data2.error=GetDataService.errorMsg[1];
          
        });
  };
  $scope.onchange=function(){
      $scope.step1='location';
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
app.controller('EventDecipherCtrl', ['$scope', 'APPService', 'YaraBaseUrl', '$http', '$filter', '$location', 'GetDataService', 'fileReader', '$document', '$timeout', '$rootScope','$anchorScroll', function($scope, APPService, YaraBaseUrl, $http, $filter, $location, GetDataService, fileReader, $document, $timeout, $rootScope,$anchorScroll) {
  var deceventcode=parseInt(localStorage.getItem('selecteddecEventId'));
  console.log(deceventcode);
  // $scope.deeventsdata=angular.fromJson(localStorage.getItem('dechipereventsdata')).events;
  $scope.decifier=function () {
    GetDataService.getDecipherEventsDash().then(function(res){
        if(res.result==1){
            for (var i = 0; i < res.events.length; i++) {
              if (res.events[i].event_code==deceventcode) {
                $scope.dechipertotdata=res.events[i]; 
                $scope.setOffset = function(d, offset) {
                  return GetDataService.userOffsetTime(d, offset);
                };            
                $scope.checkdate=function (st, ed, off) {
                  return GetDataService.startend(st, ed, off);
                }
                $scope.currentval=$scope.dechipertotdata;
              }
            }
        }
    });
  };
  $scope.decifier();
  // for (var i = 0; i < $scope.deeventsdata.length; i++) {
  //   if (deceventcode==$scope.deeventsdata[i].event_code) {
  //     $scope.dechipertotdata=$scope.deeventsdata[i];
  //     console.log($scope.dechipertotdata)
  //   }
  // }
  document.title='YARA - DeCipher-Events';
  GetDataService.getDechiperdashboard(deceventcode).then(function(res){
      if (res.result==1) {
        $('#loading').hide();
        $scope.dechiper=res.decipher_data; 
      // graph value
      function dotime(i, consume) {
         $timeout(function() {
          console.log(consume)
             var tt = document.createElement('div'),
                 leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
                 topOffset = -2;
             tt.className = 'ex-tooltip';
             document.body.appendChild(tt);

             var data = {
                 "yScale": "linear",
                 "xScale": "time",
                 "main": [{
                     "data": consume
                 }]
             };
              var opts = {
                 "dataFormatX": function(x) {
                     return d3.time.format('%H:%M').parse(x); },
                 "tickFormatX": function(x) {
                     return d3.time.format('%I:%M')(x); },
                 "mouseover": function(d, i) {
                     var pos = $(this).offset();
                     $(tt).text(d3.time.format('%I:%M')(d.x) + ': ' + d.y)
                         .css({ top: topOffset + pos.top, left: pos.left + leftOffset })
                         .show();
                 },
                 "mouseout": function(x) {
                     $(tt).hide();
                 }
             };
             var example = "#example" + i;
             var myChart = new xChart('line-dotted', data, example, opts);
         }, 1000);
     }
      
      for (var i = 0; i < $scope.dechiper.gatekeeper.length; i++) {
        var consume=$scope.dechiper.gatekeeper[i].checkin_data
        dotime(i, consume);
      };
      };
  })
  //gate keeper chart 
 
  // activate jprogress
  $timeout(function(){
    $(".progressbars-decipher").jprogress();
    $(".progressbarsone").jprogress({
        background: "#FF2D55"
    });
  }, 1000);
  // adspace view option
  $scope.filterdname=function (val) {
    $scope.dyanme=val;
    $anchorScroll();
  }
}]);
app.controller('ManageLocationController',['$scope','YaraBaseUrl','$http','$location','GetDataService','$rootScope','$timeout','$anchorScroll',function($scope,YaraBaseUrl,$http,$location,GetDataService,$rootScope,$timeout,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Location";
  // fetch event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata); 
  document.title='YARA - '+$scope.currentval.short_name+' - Location'; 
  $scope.setOffset = function(d){ return GetDataService.userOffsetTime(d,$scope.currentval.eo); };
  // Fetching all event locations if exists
  $scope.eventLocations = function(){
      $('#loading').show();
      GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              var datasname=res.data;
              $scope.evtLoc=[];
              for (var i = 0; i < datasname.length; i++) {
                var total=datasname[i].sponsors+datasname[i].exhibitions+datasname[i].sessions
                var full=datasname[i];
                full.total=total;
                $scope.evtLoc.push(full);
              }
              console.log($scope.evtLoc)
              $('#loading').hide();
              $('#container').fadeIn();
          }
          else if(res.result==0){
                $scope.evtLoc=[];
                $scope.showerror=res.message;
                $('#loading').hide();
                $('#container').fadeIn();
          }
      });
  };
  $scope.eventLocations();
  $scope.selectRenameLoc = function(locInfo,index){
    $scope.locations = [];
    $scope.locDupe=false;
    $scope.errormsg=false;
    angular.forEach($scope.evtLoc,function(value,key){
      if($scope.evtLoc[key].location_code!=locInfo.location_code){
        $scope.locations.push($scope.evtLoc[key]);
      }
  });
  $scope.locInfo = locInfo;
  $scope.locationName = locInfo.location;
  };
  $scope.addedLocation = function(){
      $scope.locationName = "";
      $scope.locDupe=false;
      $scope.errormsg=false;
  };
  $scope.renameLocation = function(){
        $scope.locDupe = $scope.checkDuplicateLocations($scope.locations,$scope.locationName);
        if(!$scope.locDupe){
            $('#loading').show();
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/event_location/rename/',
              data:{
                location_code:$scope.locInfo.location_code,
                location_name:$scope.locationName,
                event_code:$scope.currentval.event_code
              },
            }).then(function success(response){
                console.log(response.data);
                if(response.data.result==1 ){
                  $('#location-title').modal('hide');
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.eventLocations();
                }else if(response.data.result==0){
                    $scope.errormsg=true;
                    $scope.showerror=response.data.message;
                    $('#loading').hide();
                    $('#container').fadeIn();
                }
              },function error(response){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.data={};
                   $scope.errormsg=true;
                  if(response.status==-1 || response.data==null){
                      if($rootScope.online==false)
                      {
                       $scope.showerror=GetDataService.errorMsg[0];
                       }
                       else{
                          $scope.showerror=GetDataService.errorMsg[1];
                       }
                  }
                  else{
                      $scope.showerror=GetDataService.errorMsg[1];
                  }
              });  
        }
  };
  $scope.sorting_list=function(sortorder) {
    if (sortorder==0) {
      $scope.sort="location";
    }else{
      $scope.sort="-total"
    }
    $anchorScroll();
  }
  $scope.saveLoc = function(){

        $scope.locDupe = $scope.checkDuplicateLocations($scope.evtLoc,$scope.addlocation);
        if(!$scope.locDupe){
          $('#loading').show();
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/event_location/',
            data:{
              event_code:$scope.currentval.event_code,
              location_name:$scope.addlocation,
            },
          }).then(function success(response){
              // console.log(response.data);
              if(response.data.result==1 ){
                $scope.addlocation="";
                $('#location-title-add').modal('hide');
                $('#loading').hide();
                $('#container').fadeIn();
                $scope.eventLocations();
                $anchorScroll();
              }else if(response.data.result==0){
                  $scope.errormsg=true;
                  $scope.showerror=response.data.message;
                  $('#loading').hide();
                  $('#container').fadeIn();              }
          },function error(response){
                $('#loading').hide();
                $('#container').fadeIn();
                $scope.data={};
                console.log(response);
                 $scope.errormsg=true;
                if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                     $scope.showerror=GetDataService.errorMsg[0];
                     }
                     else{
                        $scope.showerror=GetDataService.errorMsg[1];
                     }
                }
                else{
                     $scope.showerror=GetDataService.errorMsg[1];
                }
          });  
        }
  };
  $scope.isValidLoc=false;
  $scope.locValidation=function(locName){
    $scope.req=false;
    $scope.isValidLoc=false;
    $scope.isValidLoc = GetDataService.validateLocation(locName);
    console.log($scope.isValidLoc);
  };
  $scope.selectRevokeLoc = function(locInfo){
    $scope.locInfo = locInfo;
    $scope.locationName = locInfo.location;
  };
  $scope.revokeLocation = function(){
        console.log($scope.locationName);
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/event_location/revoke/',
          data:{
            location_code:$scope.locInfo.location_code,
          },
        }).then(function success(response){
            console.log(response.data);
            if(response.data.result==1 ){
              $scope.eventLocations();
              $('#myModal-location').modal('hide');
            }else if(response.data.result==0){
                $scope.errormsg=true;
                $scope.showerror=response.data.message;
            }
          },function error(response){
              $scope.data={};
              console.log(response);
               $scope.errormsg=true;
              if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                   $scope.showerror=GetDataService.errorMsg[0];
                   }
                   else{
                      $scope.showerror=GetDataService.errorMsg[1];
                   }
              }
              else{
              $scope.showerror=GetDataService.errorMsg[1];
            }
          });  
  };
  $scope.duplicates = [];
  // check duplicate Locations
  $scope.checkDuplicateLocations=function(locations,locationName){
        var duplicateLoc=false;
        for (var i = locations.length - 1; i >= 0; i--) {
                if(locations[i].location.toLowerCase()==locationName.toLowerCase()){
                    duplicateLoc=true;
                    break;
                }
        };
        return duplicateLoc;
  };
  // focus on popup text box
  $('#location-title-add').on('show.bs.modal', function (e) {
       setTimeout(function (){
         $('#managelocation').focus();
    }, 1000);
  });
  $('#location-title').on('show.bs.modal', function (e) {
       setTimeout(function (){
         $('#manage_location').focus();
    }, 1000);
  });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]); 
// dechipher controller
app.controller('EventsDechiperController',['$scope','APPService','YaraBaseUrl','$http','$location','$filter','GetDataService','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$location,$filter,GetDataService,$rootScope){
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(GetDataService.getPrivilege(3)=='Admin')
    $scope.privilege=true;
  else
     $scope.privilege=false;
  $scope.eventsdata=[];
    $scope.shownav=true;
    document.title='YARA - Events';
  $scope.errorstatus=false;
  GetDataService.getDecipherEvents().then(function(res){
      if(res.result==1){
          // localStorage.setItem('dechipereventsdata',angular.toJson(res));
          $scope.eventsdata=res.events;
          $scope.setOffset = function(d, offset) {
              return GetDataService.userOffsetTime(d, offset);
          }; 
          console.log($scope.eventsdata);
          // $scope.eventOffset = $scope.eventsdata.eo;
          // console.log($scope.eventOffset);
          $("#loading").hide();
      }else{
          $scope.errorstatus=true;
          /*if(res.message=="Anonymous user")
            window.location="sign-in";*/
      }
  });
  $scope.deciph=function (selval) {
    localStorage.setItem('selecteddecEventId',selval);
    for(var i=0;i<$scope.eventsdata.length;i++)
          { 
            if($scope.eventsdata[i].event_code==selval)
            {
                localStorage.setItem('selEventsData',angular.toJson($scope.eventsdata[i]));
                window.location = "/decipher-event";

            }
          }
  };
  var jsonstr='';
  $scope.getdata=function(str){
   jsonstr=angular.fromJson(JSON.parse(str.replace(/'/g,'"')));
   return jsonstr;
  };
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};  
  $scope.checkdate=function (st, ed, off) {return GetDataService.startend(st, ed, off);};
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ----------------------------------Collabrator dashboard-------------------
app.controller('CollabratorPeopleController',['$scope','fileReader','$location','$http','YaraBaseUrl','GetDataService','$filter','APPService','$timeout','$rootScope','$anchorScroll',function($scope,fileReader,$location,$http,YaraBaseUrl,GetDataService,$filter,APPService,$timeout,$rootScope,$anchorScroll){
  $scope.dashUrl = GetDataService.dashboardUrl();
  $scope.deleTypeinfo = {
    id:10,
    group_tittle:'Delegates',
    single_entity_tittle:'Delegate'
  };
  $scope.f_sort = 1;
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }  
  //time offset 
  $scope.setOffset = function(d,offset){
    if(d!=undefined){
      return GetDataService.userOffsetTime(d,offset);
    }
  };
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  // fetch event details from local
  $scope.isFocusDemo=true;
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/collaborator-dashboard";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
      var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
      var st_date=$filter('date')(s_date,'yyyy-MM-dd');
      var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
     $scope.betdays=function () {
       var start = new Date(st_date),
        end = new Date(ed_date);
        var between = $scope.getDates(start, end);
        $scope.dates=between;
     }
    // This function doing this work.
    $scope.getDates=function(start, end) {
        var datesArray = [];
        var startDate = new Date(start);
        while (startDate <= end) {
            datesArray.push($filter('date')(new Date(startDate), 'yyyy-MM-dd'));
            startDate.setDate(startDate.getDate() + 1);
        }
        return datesArray;
    }
    $scope.betdays();
    $scope.convertingPeoplelist = [];
    $scope.delegateDetails = $scope.currentval.sp_people[0];
    $scope.specPeople = [];
     angular.forEach($scope.currentval.sp_people,function(value,k){
        if($scope.currentval.sp_people[k].id!=10){
          $scope.specPeople.push($scope.currentval.sp_people[k]);
          $scope.convertingPeoplelist.push($scope.currentval.sp_people[k]);
        }
     });   
    if(window.location.pathname=="/collaborator/people"){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        // localStorage.removeItem('delegateIdinfo');
        localStorage.removeItem('delegateTosp');
        localStorage.removeItem('convertSp');
        localStorage.removeItem('editSpInfo');
        localStorage.removeItem('spEdit');
    }
    var redirect=angular.fromJson(localStorage.getItem('redirectionInfo')); 
    if(window.location.pathname=="/collaborator/add-special-delegate"){
        if(redirect.speaker==false|| redirect.speaker==null){
            window.location='/collaborator-dashboard';
        }
    }
    else if(window.location.pathname=="/collaborator/add-delegate"){
        if(redirect.delegate==false|| redirect.delegate==null){
            window.location='/collaborator-dashboard';
        }
    } 
    else if(window.location.pathname=="/collaborator/upload-bulk-list"){
        if(redirect.bulk==false|| redirect.bulk==null){
            window.location='/collaborator-dashboard';
        }
    } 
    $scope.diffDays = $scope.currentval.date_diff; 
    if(localStorage.getItem('sort')!==null){
      $scope.f_sort = localStorage.getItem('sort');
    }
    else{
      $scope.f_sort = 1;
    }
    $scope.currentLogin=angular.fromJson(localStorage.getItem('Logininfo')); 
  }
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  }
  // check privilege
  if(GetDataService.getPrivilege()=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  // $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.headerTitle="People";
  //check socail link which are active
  $scope.checkScocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.cmpyweb.length!=7){
      flag=1;
    }else if($scope.social_type=='twitter' && $scope.cmpytwitter.length!=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.cmpyfb.length!=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.cmpylink.length!=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.cmpypinterest.length!=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.cmpytumblr.length!=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.cmpygithub.length!=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.cmpyinstagram.length!=26){
      flag=1; 
    }
    var currId= GetDataService.getSocailId($scope.social_type);
    if(flag==1){
      $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    }
    
  };
  //check socail link valid and enable add button
  $scope.checkScocialDisabled= function(){
    var flag=0; 
    if($scope.social_type=='company-website' && $scope.Tcmpyweb.length>=7 ){
      if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.Tcmpyweb) ){
        flag=1;
      }else if($scope.Tcmpyweb.length==7){
        flag=1;
      }else{
        flag=0;      
      } 
    }else if($scope.social_type=='twitter' && $scope.Tcmpytwitter.length>=20){
      flag=1; 
    }else if($scope.social_type=='facebook' && $scope.Tcmpyfb.length>=25){
      flag=1; 
    }else if($scope.social_type=='linkedin' && $scope.Tcmpylink.length>=25){
      flag=1; 
    }else if($scope.social_type=='pinterest' && $scope.Tcmpypinterest.length>=26){
      flag=1; 
    }else if($scope.social_type=='tumblr' && $scope.Tcmpytumblr.length>=0){
      flag=1; 
    }else if($scope.social_type=='git-hub' && $scope.Tcmpygithub.length>=19){
      flag=1; 
    }else if($scope.social_type=='instagram' && $scope.Tcmpyinstagram.length>=26){
      flag=1; 
    }

      if (flag == 1) {
          $scope.isSocialSave = true;
      } else {
          $scope.isSocialSave = false;
      }
    // var currId= GetDataService.getSocailId($scope.social_type);
    // if(flag==1){
    //   $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    // }else{
    //   $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
    // }`
  };
  //watch changes in social link
  $scope.$watchCollection('[Tcmpyweb,Tcmpytwitter,Tcmpyfb,Tcmpylink,Tcmpypinterest,Tcmpytumblr,Tcmpygithub,Tcmpyinstagram]', function(newValues){
    $scope.checkScocialDisabled();
  });
  setTimeout(function (){
    $scope.cmpytumblr=$scope.Tcmpytumblr;
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
  }, 1000);
  //save socail links
  $scope.saveSocials =function(){
    $scope.typeofchange='save';
    $scope.cmpyweb =$scope.Tcmpyweb;
    $scope.cmpyfb = $scope.Tcmpyfb;
    $scope.cmpytwitter = $scope.Tcmpytwitter;
    $scope.cmpylink = $scope.Tcmpylink;
    $scope.cmpypinterest =  $scope.Tcmpypinterest;
    $scope.cmpytumblr = $scope.Tcmpytumblr;
    $scope.cmpygithub = $scope.Tcmpygithub;
    $scope.cmpyinstagram =  $scope.Tcmpyinstagram;
    $scope.checkScocials();
    $('#myModal-social').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
      // $scope.checkScocialDisabled();
       setTimeout(function (){
         $('#'+$scope.social_type+'_id').focus();
         var len= $('#'+$scope.social_type+'_id').val().length;
         $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
    }, 1000);
  });
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      $scope.Tcmpyweb =$scope.cmpyweb;
      $scope.Tcmpyfb = $scope.cmpyfb;
      $scope.Tcmpytwitter = $scope.cmpytwitter;
      $scope.Tcmpylink = $scope.cmpylink;
      $scope.Tcmpypinterest =  $scope.cmpypinterest;
      $scope.Tcmpytumblr = $scope.cmpytumblr;
      $scope.Tcmpygithub = $scope.cmpygithub;
      $scope.Tcmpyinstagram =  $scope.cmpyinstagram;
    }
   // $('#'+$scope.social_type+'_id').removeAttr('autofocus');
  });
  var delegateTypeInfo = angular.fromJson(localStorage.getItem('delegateIdinfo')); 
  $scope.ListPeoples=[];
  $scope.EndList=false;
  if(delegateTypeInfo!=undefined){
    $scope.f_user = delegateTypeInfo.id;
    $scope.f_username = delegateTypeInfo.single_entity_tittle;
  }
  else{
    $scope.f_user = 10;
    $scope.f_username = 'Delegate';
  }
  $scope.params =   {
    offset:0,
    limit:0,
    type:$scope.f_user,
    initialize_ticket:1,
    event_code:$scope.currentval.event_code,
    s:$scope.f_sort
  };
  // -------------------------------------- integration of new people structure------------------------------------
  // initial loading will pass offset=0,limit=50,ticketcode=null searchquery = null type = [10,11,12] includespecialtypepeople=true, initilizeticket=true,eventcode
  // fetch all people info with special types ,tickets info , list people
  $scope.tickets = function(){
    $scope.delegateStep = 'step1';
    $scope.UpStep='step1';
    if($scope.ticketsdata.length>1){
      $scope.delegateStep = 'step1';
      $scope.UpStep='step1';
    }
    $scope.ticketval="";
    // pre select ticket value
    if(angular.fromJson(localStorage.getItem('ticketTabinfo'))!=undefined){
      var ticketInformation = angular.fromJson(localStorage.getItem('ticketTabinfo'))
      $scope.ticktselected=ticketInformation.ticketCode;
      $scope.seltab=ticketInformation.ticketCode;
      $scope.ticketinValid=ticketInformation.ticketinValid;
    }
    else{
        $scope.ticktselected=$scope.ticketsdata[0].ticket_code;
        $scope.seltab=$scope.ticketsdata[0].ticket_code;
        $scope.ticketinValid=$scope.ticketsdata[0].is_validity_over;
    }
    $scope.ListPeoples=[];
    $scope.EndList=false;
    $scope.params.ticket_code = $scope.seltab;
    $scope.params.initialize_ticket = 0;
    $scope.params.limit = 50;
    $scope.params.offset = 0;
    $scope.getAllpeople();
    $scope.ticket_name=$scope.ticketsdata[0].name;
    //selecting ticket if ticket preforward from different page
    var t = sessionStorage.getItem('TicketSelected');
    if(t!=undefined){
      $scope.ticktselected=t;
      sessionStorage.removeItem('TicketSelected');
    }
    //setting scroll to default and calling delegate api
    //setting tab buttons and tab
    $scope.dbutton=($scope.ticketsdata.length-3);
    $timeout(function(){
      if($(".slider").length>0){
        $(".slider").diyslider({
            width: "100%", // width of the slider
            height: "51px", // height of the slider
             minSlides: 2, // number of slides you want it to display at once
            loop: false, // disable looping on slides
            moveSlides: 1,
        });
      }
    },100); 
    var tid=angular.fromJson(localStorage.getItem('ticketTabinfo'));
    if(angular.fromJson(localStorage.getItem('ticketTabinfo'))!=undefined && angular.fromJson(localStorage.getItem('ticketTabinfo'))!=null){
          $scope.freshtab=true;
          for (var i = 0; i < $scope.ticketsdata.length; i++) {
            if ($scope.ticketsdata[i].ticket_code==tid.ticketCode) {
                $scope.seltab=tid.ticketCode;
                $scope.tottab=i
                $scope.freshtab=false;
                $scope.ticketinValid = tid.ticketinValid;
              }
          } 
    }
    if ($scope.freshtab) {
      $scope.seltab=$scope.ticketsdata[0].ticket_code;
    }
    $timeout(function() {
      $scope.ddbt=$scope.tottab+1
      if ($scope.ddbt>3) {
        $scope.forl=$scope.ddbt-3;
        for (var i = 0; i < $scope.forl; i++) {
          $(".slider").diyslider("move", "forth"); 
          $scope.dbutton--;
      }
    }
    }, 100);  
  };
  // -----------------------integrating search -----------------------------------
  $scope.$watch('searchPeople', function(newval,oldval){
      if (newval!=undefined &&newval!=null && newval.length>0 ) {
            $scope.searchParam={};
            $scope.searchParam.q = newval;
            $scope.searchParam.event_code = $scope.currentval.event_code;
            $scope.searchParam.ticket_code = $scope.seltab;
            $scope.searchParam.on = $scope.f_user;
            $scope.searchParam.limit = 50;
            $scope.searchParam.offset = 0;
            $scope.searchParam.day_id = null;
            $scope.searchParam.s = $scope.f_sort;
            $scope.ListPeoples = [];
            $scope.reachEnd = false;
            $scope.searchCall=true;
            $scope.getSearchPeople();
      }
      else if ((newval==undefined ||newval==''||newval==null) && oldval!=undefined){
              $scope.ListPeoples = [];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.limit = 50;
              $scope.params.offset = 0;
              $scope.searchCall=false;
              $scope.getAllpeople();
      }
  },true);
  // search people
  $scope.getSearchPeople = function(){
    if($scope.reachEnd==false && $scope.searchParam!=undefined )
    {
          $scope.blockScroll = true;
          GetDataService.getPeoplesearchInfo($scope.searchParam).then(function(res)
          {
            if(res.result==1){
                $scope.blockScroll = false;
               $scope.ListPeoples=$scope.ListPeoples.concat(res.search_data);
                $scope.searchCall=false;
                $scope.reachEnd = res.end;
                if(res.end==false){
                    var offset = $scope.ListPeoples.length;
                    $scope.searchParam.offset = offset;
                    $scope.searchParam.limit = offset+50;
                }
            }
          });
    }
  };
  // -----------------------End integrating search -------------------------------
  $scope.removeSearch = function(){
    $scope.searchPeople='';
    $scope.searchCall=false;
  };
  //fetching all people
  $scope.getAllpeople = function(){
    $('#loading').hide();
      if($scope.EndList==false){
        $scope.blockScroll = true;
        GetDataService.getPeopleInfo($scope.params).then(function(res){
            if(res.result==1){
                $scope.blockScroll = false;
                $scope.ListPeoples=$scope.ListPeoples.concat(res.delegates);
                $scope.EndList=res.end;
                if($scope.params.initialize_ticket==1){
                  $scope.ticketsdata = res.tickets;
                  $scope.tickets();
                }
                $scope.delegateDetails = $scope.deleTypeinfo;
                if(res.event_package_info.number_of_attendee != undefined)
                {
                    $scope.number_of_attendee_added=res.event_package_info.number_of_attendee_added;
                    $scope.number_of_attendee=res.event_package_info.number_of_attendee;
                }
            }
        });
      }
  };
  if(window.location.pathname!="event/add-special-delegate"){
      $scope.getAllpeople();
  }
  // End fetch all people info with special types ,tickets info , list people
  // -------------------------------------- End integration of new people structure------------------------------------
  // fetching tickets
  $scope.allTickets = function(){
    $scope.ticketsdata=[];
    $('#loading').show();
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets;  
              $('#loading').hide();
              $('#container').fadeIn();
            }
      });
  };
  // $scope.allTickets();  
  // fetch updated tickets
  $scope.avilabileTickets = function(){
    GetDataService.getAvilabileTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.updatedTicketsdata=res.tickets;  
            }
      });
  };
  $scope.sortingOption = function(sort){
    $anchorScroll();
    localStorage.setItem('sort',sort);
    $scope.EndList=false;
    $scope.params.ticket_code = $scope.seltab;
    $scope.params.initialize_ticket = 0;
    $scope.params.offset = 0;
    $scope.params.limit = 50;
    $scope.params.type = $scope.f_user;
    $scope.reachEnd = false;
    $scope.f_sort = sort;
    $scope.params.s=sort;
    $scope.ListPeoples=[];
    if($scope.searchPeople!=undefined||$scope.searchPeople!=null){
        $scope.getSearchPeople();
    }
    else{
          $scope.getAllpeople();
    }
  };
  //setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='SpkPic'){
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  //reset crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='SpkPic'){
       $scope.imageSrc1="";
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  //Upload img and doc
  $scope.$on('$dropletReady', function whenDropletReady() {
    if($scope.sharefiles != undefined)
    $scope.sharefiles.allowedExtensions(['xlsx', 'xls', 'csv', 'txt']);
    if($scope.SpkPic != undefined)
    $scope.SpkPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.cropPic='';
    if($scope.sharefiles != undefined){
    var len =$scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID).length;
      if(len>0 ){
       //console.log($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID));
        angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
          if(key<len-1){
            model.setType(4);
          }else{
            if(model.file.size > 52428800){
            //  $scope.signup3Form.sharefiles.$setValidity('minsizeval',false);
              model.setType(4);
            }else{
              //$scope.signup3Form.sharefiles.$setValidity('minsizeval',true);
            }
          }
        });
      }
    }
    if($scope.SpkPic != undefined){
    len =$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      ////console.log('cover image change');
      angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.speakerForm.SpkPic.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc1="";
          }else{
            $scope.speakerForm.SpkPic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // //console.log(width+'X'+height);
              if(width >= 512 && height >= 512 ){
                $scope.speakerForm.SpkPic.$setValidity('minDimension',true);
                if(width ==512  && height == 512 ){
                  $scope.imageSrc1   = result;
                }else{
                  $scope.cropPic='profile';
                  $scope.cropType='SpkPic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 2.05);
                  $('#crop-image').modal('show');
                }
                /*if(width == height){
                  $scope.speakerForm.SpkPic.$setValidity('ratioval',true);
                  $scope.imageSrc1 = result;
                }else{
                  $scope.speakerForm.SpkPic.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.speakerForm.SpkPic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc1="";
              }
              $scope.$apply();
          });
        });
        }
        }
      });
    }
    }
  });
  $scope.$on('$dropletFileDeleted', function () {
   if($scope.SpkPic != undefined){
    len =$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1="";
    }
  }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  $scope.searchScrollCall=false;
  // reset value and calling delegate api when tab is switched 
  $scope.selecttab = function(t){
    $scope.seltab=t.ticket_code;
    $scope.ticketinValid=t.is_validity_over;
    var ticketTabinfo = {
      ticketCode:$scope.seltab,
      ticketinValid:$scope.ticketinValid
    }
    localStorage.setItem('ticketTabinfo',angular.toJson(ticketTabinfo));
    $scope.ListFrom = 0;
    $scope.ListTo = 10;
    $scope.ListPeoples=[];
    $scope.EndList=false;
    $scope.params.ticket_code = t.ticket_code;
    $scope.params.initialize_ticket = 0;
    $scope.params.limit = 50;
    $scope.params.offset = 0;
    $scope.getAllpeople();
  };
  // while listing , 't' is ticket code and 'd' is ticket data
  $scope.ticketDays = function(t,d){
    var food='',acc='',msg='',days='';
    $scope.ds.food={};
    $scope.ds.acc={};
    $scope.ds.msg={};
    angular.forEach(d,function(dl,key){
      var d1 = new Date(dl.day);
      d1= $filter('date')(d1,'yyyy-MM-dd');
      pos = $scope.dates.indexOf(d1) + 1;
     
      days +='Day '+pos+', ';
      if(dl.food_coupon){
        food +='Day '+pos+', ';
      } 
      if(dl.messaging){
        msg +='Day '+pos+', ';
      } 
      if(dl.tracks.length>0){
        acc +='Day '+pos+', ';
      }
    });
    $scope.ds.food[t]=food.slice(0,-2);
    $scope.ds.acc[t]=acc.slice(0,-2);
    $scope.ds.msg[t]=msg.slice(0,-2);
    return days.slice(0,-2);
  }; 
  $scope.ds=$scope;
  $scope.ticktselected='';
  //when ticket is changed 
  $scope.changetselect=function(t){
    var ticketTabinfo = {
      ticketCode:t.ticket_code,
      ticketinValid:t.is_validity_over
    }
    localStorage.setItem('ticketTabinfo',angular.toJson(ticketTabinfo));
    $scope.ticket_name=t.name;
    $scope.ticktselected=t.ticket_code;
    $scope.ticketinValid=t.is_validity_over;
  };
  $scope.isExists_user=0;
  // view options are selected and reset values and calling api
  $scope.fliterPeopleList =function(spPl){
      localStorage.setItem('delegateIdinfo',angular.toJson(spPl));
      $scope.f_user = spPl.id;
      $scope.f_username = spPl.single_entity_tittle;
      $scope.ListPeoples=[];
      $scope.EndList=false;
      $scope.params.ticket_code = $scope.seltab;
      $scope.params.initialize_ticket = 0;
      $scope.params.offset = 0;
      $scope.params.limit = 50;
      $scope.params.type = $scope.f_user;
      if($scope.params.offset==0){
          $scope.getAllpeople();  
      }
  };
 //ticket is stored before redirection
  $scope.preSelectTicket = function(t,url,delegateIdinfo){
      var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo')); 
      if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
      }
      if(url == 'add-delegate'){
        redirectionInfo.delegate=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));
      }
      else if(url == 'add-special-delegate'){
        redirectionInfo.speaker=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));

      }
      else if(url == 'upload-bulk-list'){
        redirectionInfo.bulk=true;
        localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        localStorage.setItem('delegateIdinfo',angular.toJson(delegateIdinfo));
      }
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      sessionStorage.setItem('TicketSelected',t);
      window.location=url;
  };
  // $scope.number_of_attendee_added=$scope.currentval.number_of_attendee_added;
  // $scope.number_of_attendee=$scope.currentval.number_of_attendee;
  $scope.addMoreItems = function(){
    if(!$scope.EndList && ($scope.searchPeople==undefined || $scope.searchPeople.length==0)){
       $scope.params.ticket_code = $scope.seltab;
       $scope.params.offset =  $scope.params.limit;
       $scope.params.limit =  $scope.params.limit+50;  
       $scope.params.type = $scope.f_user;
       $scope.getAllpeople();
    }
    else{
         $scope.getSearchPeople();
    }
  }; 
  $scope.blockCreation=false;
   $scope.userData=null;
  // while adding speaker checking email is exists or not
  $scope.checkEmail=function(mail){
    var convertSp= localStorage.getItem('convertSp');
    var editSpInfo= localStorage.getItem('editSpInfo');
    var spEdit= localStorage.getItem('spEdit');
    // console.log("reach here");
    // console.log(convertSp);
    // console.log(editSpInfo);
    // console.log(spEdit);
    if(spEdit!="true"){
      console.log("reach inside");
      $scope.isExists_user=0;
      // $scope.is_Appspeaker=false;
      $scope.blockCreation=false;
      $scope.spname='';
      $scope.imageSrc1 = '';
      $scope.spkdesg = '';
      $scope.spkcmpy ='';
      $scope.spkabt = '';
      $scope.Tcmpyweb='';
      $scope.Tcmpyfb ='';
      $scope.Tcmpytwitter = '';
      $scope.Tcmpylink = '';
      $scope.Tcmpypinterest =  '';
      $scope.Tcmpytumblr = '';
      $scope.Tcmpygithub = '';
      $scope.Tcmpyinstagram =  '';
      $timeout(function(){
        $scope.checkScocialDisabled();
        $scope.saveSocials();
        $scope.updateSocials();
      },1000);
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) && !(spEdit=="true") ){  
          $('#loading').show();
          $http({method:'POST',
                  url:YaraBaseUrl.url+'/sp-delegate/sp_delegate_validate/',
                    data:{
                      email:mail,
                      event_code:$scope.currentval.event_code
                    }
            }).then(function success(response){
              $scope.direct=1;
              if(response.data.result==1){
                $anchorScroll();
                $scope.mailInfo=response.data;
                $scope.userData=response.data.user_data;
                if($scope.userData!=undefined){
                  $scope.spname =  $scope.userData.full_name;
                  $scope.spkdesg = $scope.userData.designation;
                  $scope.spkcmpy = $scope.userData.company_name;
                  // $scope.spkabt = $scope.userData.description;
                  $scope.imageSrc1 = $scope.userData.profile_picture;
                  window.setTimeout( function() {
                          $("textarea").height( $("textarea")[0].scrollHeight );
                  }, 500);
                  if($scope.userData.socials!=undefined && $scope.userData.socials.length>0){
                    angular.forEach($scope.userData.socials,function(s){
                          // console.log(s.link);
                          // console.log(s.social_provider);
                          if(s.social_provider=="Website")
                             $scope.Tcmpyweb=s.link;
                          else if(s.social_provider=="Tumblr")
                             $scope.Tcmpytumblr=s.link;
                          else if(s.social_provider=="Twitter")
                              $scope.Tcmpytwitter=s.link;
                          else if(s.social_provider=="LinkedIn")
                              $scope.Tcmpylink=s.link;
                          else if(s.social_provider=="Facebook")
                             $scope.Tcmpyfb=s.link;
                          else if(s.social_provider=="Pinterest")
                             $scope.Tcmpypinterest=s.link;
                          else if(s.social_provider=="GitHub")
                            $scope.Tcmpygithub=s.link;
                          else if(s.social_provider=="Instagram")
                             $scope.Tcmpyinstagram=s.link;
                    });
                    $timeout(function(){
                        $scope.checkScocialDisabled();
                        $scope.saveSocials();
                        $scope.updateSocials();
                      }
                    ,1000);
                  }
                }
                else{
                  $scope.userData=null;
                }
                $('#loading').hide();
                $('#container').fadeIn();
              }else if(response.data.result==0){
                $scope.spname='';
                $scope.imageSrc1 = '';
                $scope.Tcmpyweb='';
                $scope.Tcmpyfb ='';
                $scope.Tcmpytwitter = '';
                $scope.Tcmpylink = '';
                $scope.Tcmpypinterest =  '';
                $scope.Tcmpytumblr = '';
                $scope.Tcmpygithub = '';
                $scope.Tcmpyinstagram =  '';
                $scope.spkdesg = '';
                $scope.spkcmpy ='';
                $scope.spkabt = '';
                $timeout(function(){
                        $scope.checkScocialDisabled();
                        $scope.saveSocials();
                        $scope.updateSocials();
                },1000);
                $scope.errorMsg = response.data.message;
                $scope.blockCreation=true;
                $('#loading').hide();
                $('#container').fadeIn();
              }
            },function error(response){
                  if(response.status==-1 || response.data==null){
                          if($rootScope.online==false){
                              $scope.showerror=GetDataService.errorMsg[0];
                          }
                          else{
                              $scope.showerror=GetDataService.errorMsg[1];
                          }                    
                  }else
                  $scope.showerror=GetDataService.errorMsg[1];
                  $('#loading').hide();
                  $('#container').fadeIn();
            });
      }
    }
  };
  // manage ticket
  $scope.manageTicket = function(){
    localStorage.setItem('redirectPpl',1);
    window.location="/collaborator/ticket"
  };
  $scope.existsData={};
  // checking Duplicates email ids while creating delegate step2
  $scope.checkDuplicates = function(){
    var returnVal = true;
    var found_at;
    for(var i = 0; i < $scope.ds.emailDel.length; i++){
      if($scope.ds.emailDel[i]!= ''){
        var len = ($filter('filter')($scope.ds.emailDel,$scope.ds.emailDel[i])).length;
        if(len>1){
          returnVal = false;
          found_at=$scope.ds.emailDel.indexOf($scope.ds.emailDel[i],i+1);
          break;
        }
      }
    }
    if(found_at != undefined && found_at !=null)
    APPService.scrollJquery('email_'+found_at)
    return returnVal;
  };
  //checking delegate while edit delegate ,'pos' is position and 'e' is email id
  $scope.delegateCheck= function(pos,e){
    $('#loading').show();
    $scope.ds.exError[pos].status=false;
    var emailsval=[e];
    $http({method:'POST',
      url:YaraBaseUrl.url+'/delegate/',
      data:{
        emails:emailsval,
        ticket_code:$scope.ticktselected
      }
    }).then(function success(response){
      $('#loading').hide();
      $('#container').fadeIn();
      var Data=response.data;
      if(Data.result==1){
        if(Data.invited_emails.length>0){
          $scope.ds.exError[pos].status=true;
          $scope.ds.exError[pos].msg=2;
        }
        else if(Data.non_account_emails.length>0){
            // $scope.ds.eLists.splice(pos,1);
            if(window.location.pathname=="/collaborator/upload-bulk-list"){
              $scope.ds.eLists.splice(pos,1);
              $scope.ds.eLists.splice(pos,0,Data.non_account_emails[0]);
            }
            else{
                // ------normal adding----
                  $scope.foundDelegate.non_account_emails.splice(pos,1,Data.non_account_emails[0]);
                  $scope.ds.eListDis[pos]=true;
                // ------end normal adding----
            }
        }
        else if(Data.delegate_account_emails.length>0){
           if(window.location.pathname=="/collaborator/upload-bulk-list"){
              $scope.ds.eListDis[pos]=true;
              $scope.account.push(Data.delegate_account_emails[0]);
              $scope.deleteDelegate(pos);
              $scope.ds.eListDis[pos]=true;
            }
            else{
              var eListDis = $scope.ds.eListDis;
              $scope.ds.eListDis = [];
              angular.forEach(eListDis,function(v,k){
                  if(k!=pos){
                    $scope.ds.eListDis.push(v);
                  }
                });
              // ------normal adding----
              // $scope.ds.eListDis[pos]=true;
              $scope.foundDelegate.delegate_account_emails.push(Data.delegate_account_emails[0]);
              $scope.foundDelegate.non_account_emails.splice(pos,1);
              $scope.ds.eList.splice(pos,1);
              // ------end normal adding----
            }
        }
        else if(Data.conflict_invited_emails.length>0){
          $scope.ds.exError[pos].status=true;
          $scope.ds.exError[pos].msg=3;
        }
      }else if(Data.result==0){
        $scope.ds.exError[pos].status=true;
        $scope.ds.exError[pos].msg=4;
        $scope.errorMsg=$scope.existsData.message;
      }else {
        $scope.ds.exError[pos].status=true;
        $scope.ds.exError[pos].msg=1;
      }
    },function error(response){
      $scope.ds.exError[pos].status=true;
      //console.log(response);
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.ds.exError[pos].msg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.ds.exError[pos].msg=GetDataService.errorMsg[1];
              }      
      }else
        $scope.ds.exError[pos].msg=GetDataService.errorMsg[1];
    });
    /*if($scope.isExists_user==0)
      $scope.delegateStep='step2';
    else
      $scope.delegateStep='step3';*/
  };
  // before adding delegate, checking delegates2
  $scope.delegateAdd = function(){
    $scope.addDelgData={};
     $scope.foundDelegate={};
     $scope.delegateAddemails = [];
     angular.forEach($scope.ds.emailDel,function(e,key){
        var validMail = $scope.validateMail(e)
        if(validMail ==true){
          $scope.delegateAddemails.push(e);
        }
     });
    $http({method:'POST',
      url:YaraBaseUrl.url+'/delegate/',
      data:{
        emails:$scope.delegateAddemails,
        ticket_code:$scope.ticktselected
      }
    }).then(function success(response){
      // $scope.existsData=response.data;
      if(response.data.result==1){
        $scope.foundDelegate=response.data;
        $scope.userOffset = response.data.uo;
        var leng = $scope.foundDelegate.total_emails_len;   
        // $scope.countEmails();
        if(leng>1){
            $scope.ds.eList = [];
            $scope.ds.eListDis = [];
           $scope.ds.eListDeleted = [];
           $scope.delegateStep='step3';
         }
         else{
                  $scope.invitedAppuserActive=true;
                  $scope.invitedAppuser = [];
                  $scope.invitedUser = [];    
                  $scope.checkoutAppuserActive=true;
                  $scope.checkoutAppuser = [];
                  $scope.checkoutUser = [];
                  $scope.delegateStep='step4';
                  if($scope.foundDelegate.invited_emails.length>0){
                     if($scope.foundDelegate.invited_emails[0].account_email){
                      $scope.invitedAppuser = $scope.foundDelegate.invited_emails;
                      $scope.invitedAppuserActive=false;
                     }
                     else{
                         $scope.invitedUser = $scope.foundDelegate.invited_emails;
                     }
                   }
                  if($scope.foundDelegate.delegate_account_emails.length>0){
                     if($scope.foundDelegate.delegate_account_emails[0].account_email){
                      $scope.checkoutAppuser = $scope.foundDelegate.delegate_account_emails[0];
                      $scope.checkoutAppuserActive=false;
                     }
                     // else if($scope.foundDelegate.delegate_account_emails.length>0){
                     //     $scope.checkoutUser = $scope.$scope.foundDelegate.non_account_emails;
                     // }
                  }
                  else if($scope.foundDelegate.non_account_emails.length>0){
                         console.log($scope.foundDelegate.non_account_emails);
                         $scope.checkoutUser = $scope.foundDelegate.non_account_emails;
                  } 
                  // if($scope.foundDelegate.checkout_emails.length>0){
                  //    if($scope.foundDelegate.checkout_emails[0].username){
                  //     $scope.checkoutAppuser = $scope.foundDelegate.checkout_emails;
                  //     $scope.checkoutAppuserActive=false;
                  //    }
                  //    else{
                  //        $scope.checkoutUser = $scope.foundDelegate.checkout_emails;
                  //    }
                  // }
         }

      }else if($scope.existsData.result==0){
        $scope.existsData.error=$scope.existsData.message;
      }else {
        $scope.existsData.error=GetDataService.errorMsg[1];
      }
    },function error(response){
      $scope.existsData={};
      //console.log(response);
      if(response.status==-1 || response.data==null){
            if($rootScope.online==false)
            {
                $scope.existsData.error=GetDataService.errorMsg[0];
            }
            else{
                $scope.existsData.error=GetDataService.errorMsg[1];
            }      
      }else
        $scope.existsData.error=GetDataService.errorMsg[1];
    });
    /*if($scope.isExists_user==0)
      $scope.delegateStep='step2';
    else
      $scope.delegateStep='step3';*/
    $anchorScroll();
  };
  $scope.validateMail = function(mail){
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test(mail))  
    {  
      return true;
    }  
      return false;  
  };
  $scope.addSingleDelegate = function(email){
      var final_email=[];
      $('#loading').show();
      final_email.push(email);
        $http({method:'POST',
        url:YaraBaseUrl.url+'/delegate/add/',
        data:{
          emails:final_email,
          ticket_code:$scope.ticktselected,
          validate:true
        }
      }).then(function success(response){
        $scope.addDelgData=response.data;
        if($scope.addDelgData.result==1){
          window.location="people";
        }else if($scope.addDelgData.result==0){
            $scope.addDelgData.error=$scope.addDelgData.message;
        }else {
          $scope.addDelgData.error=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
      },function error(response){
        $scope.addDelgData={};
        if(response.status==-1 || response.data==null){
            if($rootScope.online==false)
            {
                $scope.addDelgData.error=GetDataService.errorMsg[0];
            }
            else{
                $scope.addDelgData.error=GetDataService.errorMsg[1];
            }      
        }else
          $scope.addDelgData.error=GetDataService.errorMsg[1];
        $('#loading').hide();
      });
  }
  $scope.addDelgData={};
  // create delegate form
  $scope.delegateCreateFrom = function(){
      var em=[];
      var final_email=[];
      $('#loading').show();
       final_email = final_email.concat($scope.ds.eList);
        if($scope.foundDelegate.delegate_account_emails!=undefined && $scope.foundDelegate.delegate_account_emails.length>0){
          angular.forEach($scope.foundDelegate.delegate_account_emails,function(e){
            em.push(e.email);
          });
          final_email = final_email.concat(em);
        }
        $http({method:'POST',
          url:YaraBaseUrl.url+'/delegate/add/',
          data:{
            emails:final_email,
            ticket_code:$scope.ticktselected,
            validate:true
          }
        }).then(function success(response){
          $scope.addDelgData=response.data;
          if($scope.addDelgData.result==1){
            window.location="people";
          }else if($scope.addDelgData.result==0){
              $scope.addDelgData.error=$scope.addDelgData.message;
          }else {
            $scope.addDelgData.error=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
        },function error(response){
          $scope.addDelgData={};
          if(response.status==-1 || response.data==null){
            $scope.addDelgData.error=GetDataService.errorMsg[0];
          }else
            $scope.addDelgData.error=GetDataService.errorMsg[1];
          $('#loading').hide();
        });
  };
  // 
  $scope.countEmails = function(){
    var length=0;
     // length = length +$scope.foundDelegate.acc_exists_emails.Admin.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Collaborator.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Delegate.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Exhibitor.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Organizer.length;
     // // length = length +$scope.foundDelegate.acc_exists_emails.Sails_Executive.length;
     // length = length +$scope.foundDelegate.acc_exists_emails.Sponsor.length;
     length = length +$scope.foundDelegate.other_account_emails.length;
     length = length +$scope.foundDelegate.delegate_account_emails.length;
     length = length +$scope.foundDelegate.non_account_emails.length;
     length = length +$scope.foundDelegate.non_account_emails.length;


     // length = length +$scope.foundDelegate.checkout_emails.length;
     // length = length +$scope.foundDelegate.duplicate_emails.length;
     // length = length +$scope.foundDelegate.invited_emails.length;
     length = length +$scope.foundDelegate.conflict_invited_emails.length;
     return length;
  }
  //bulk upload delete checked delegates
  $scope.DelCheck = function(){
    var del=[];
    var Bdel=[];
    var Ndel=[];
    var BNdel=[];
    if($scope.account!=undefined ){
      angular.forEach($scope.ds.eListboxD,function(v,key){
        if(!v){
          del.push($scope.account[key]);
        }
      });
      angular.forEach(del,function(v){
       Bdel.push(false);
      });
      $scope.ds.eListboxD=Bdel;
      $scope.account=del;
    }
    angular.forEach($scope.ds.eListbox,function(v,key){
      if(!v){
        Ndel.push($scope.ds.eList[key]);
      }
    });
     angular.forEach(Ndel,function(v){
       BNdel.push(false);
      });
      $scope.ds.eListbox=BNdel;
    //$scope.ds.eListbox=[];
    $scope.ds.eList=Ndel;
    $scope.ds.eLists=Ndel;
  };
    // bulkupload delete delegate
  $scope.deleteDelegate = function(index){
    $scope.ds.eListDeleted[index] = true;
  };
  //bulk upload delete delegate by position
  $scope.DelDelegate = function(pos){
    var BNdel=[];
     angular.forEach($scope.ds.eListbox,function(v,k){
      if(k !=pos)
       BNdel.push(v);
     });

    $scope.ds.eListbox=BNdel;
    $scope.ds.eList.splice(pos,1);
    $scope.ds.eLists.splice(pos,1)
  };
  //bulk upload delete delegate by position
  $scope.DelDelegateList = function(pos){
    var BNdel=[];
     angular.forEach($scope.ds.eListboxD,function(v,k){
      if(k !=pos)
       BNdel.push(v);
     });
    $scope.ds.eListboxD=BNdel;
    $scope.account.splice(pos,1);
  };
  //bulk upload select delegate all based on attendee count
  $scope.allselCheck = function(){
   // //console.log($scope.selAllList);
    if($scope.selAllList){
      var total=$scope.number_of_attendee - $scope.number_of_attendee_added;
      var dtotal=total;
      if($scope.account!=undefined ){
        dtotal=Math.abs(total - $scope.account.length);
        angular.forEach($scope.ds.eListboxD,function(v,key){
          if(key<total){
            $scope.ds.eListboxD[key]=true;
          }else{
            $scope.ds.eListboxD[key]=false;
          }
        });
      }
     // //console.log(dtotal);
      angular.forEach($scope.ds.eListbox,function(v,key){
        if(key<dtotal){
            $scope.ds.eListbox[key]=true;
          }else{
            $scope.ds.eListbox[key]=false;
          }
      });
    }else{
      if($scope.account!=undefined ){
        angular.forEach($scope.ds.eListboxD,function(v,key){
            $scope.ds.eListboxD[key]=false;
        });
      }
      angular.forEach($scope.ds.eListbox,function(v,key){
            $scope.ds.eListbox[key]=false;
      });
    }
  };
  // check whether to select all is true or false 
  $scope.changeCheck=function(newval){
      var total=$scope.number_of_attendee - $scope.number_of_attendee_added;
      var tot=$scope.ds.eList.length;
      var trueTotal= ($filter('FilterBoolObj')($scope.ds.eListbox,true)).length;
      if($scope.account!=undefined ){
        tot=tot+ $scope.account.length;
        trueTotal= trueTotal + ($filter('FilterBoolObj')($scope.ds.eListboxD,true)).length;
      }
      if(total>tot){
        if(trueTotal == tot)
         $scope.selAllList=true;
        else
        $scope.selAllList=false; 
      }else{
        var realtot = Math.abs(total - tot );
        if(trueTotal == realtot)
         $scope.selAllList=true;
        else
        $scope.selAllList=false; 
      }
  };
  //final step bulk upload delegate
  $scope.delegateBulkFrom = function(){
    var account_exists_emails = [];
    var non_account_emails = [];
    angular.forEach($scope.account,function(value,key){
          if($scope.account[key].email!=undefined && $scope.ds.eListboxD[key]==true){
              account_exists_emails.push($scope.account[key].email);
            }
    });
    angular.forEach($scope.ds.eLists,function(value,key){
      if($scope.ds.eListbox[key]==true && $scope.ds.eListDeleted[key]==false){
          non_account_emails.push($scope.ds.eLists[key]);
        }
    });    
    var emails = {"delegate_account_emails":account_exists_emails,
                  "non_account_emails":non_account_emails};
    $http({method:'POST',
     url:YaraBaseUrl.url+'/invite/',
     data:{
      event_code:$scope.currentval.event_code,
      ticket_code:$scope.ticktselected,
      emails: emails
     }
    })
    .then(function success(response){
      $scope.addDelgData=response.data;
      if($scope.addDelgData.result==1){
        $("#successMsg").modal("show");
      }else if($scope.addDelgData.result==0){
          $scope.addDelgData.error=$scope.addDelgData.message;
      }else {
        $scope.addDelgData.error=GetDataService.errorMsg[1];
      }
    },function error(response){
      $scope.addDelgData={};
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.addDelgData.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.addDelgData.error=GetDataService.errorMsg[1];
              }      
      }else
        $scope.addDelgData.error=GetDataService.errorMsg[1];
    });
  };
  // while edit delegate inputbox focuse
  $scope.InboxFocus =  function(id){
    setTimeout(function(){
    $('#'+id).focus();
    },500);
  };
  $scope.ChecklistUpdate =  function(){
    $scope.UpStep='step4';
  };
  $scope.selType='';
  $scope.selUpdateUser='';
  // select create or update speaker, currently speaker update is not present
  $scope.changeType = function(type,val){
      $scope.selUpdateUser=val;
      $scope.isExists_user=0;
      if(type=='create'){
          $scope.spname="";
          $scope.SPKemail="";
          $scope.spkabt="";
          $scope.SpkPic="";
          $scope.SPKweb="";
          $scope.SPKfb="";
          $scope.SPKtwitter="";
          $scope.SPKlin="";
          $scope.ticketval="";
          $scope.spkdesg="";
          $scope.spkcmpy="";
          $scope.btntxt="ADD";
      }else if(type=='update'){
          $scope.prtSPVal='ADDSP';
          $scope.btntxt="UPDATE";
          angular.forEach($scope.SpkData,function(sp){
              if(sp.username==val){
                  $scope.spname=(sp.first_name+' '+sp.middle_name+' '+sp.last_name).trim();
                  $scope.SPKemail=sp.contact_email;
                  $scope.spkabt=sp.description;
                  $scope.SpkPic="";
                  $scope.imageSrc1=sp.profile_picture;
                  $scope.SPKweb=sp.website;
                  $scope.SPKfb=sp.facebook;
                  $scope.SPKtwitter=sp.twitter;
                  $scope.SPKlin=sp.linkedin;
                  $scope.spkdesg=sp.designation;
                  $scope.spkcmpy=sp.company_name;
                  angular.forEach($scope.ticketsdata,function(t){
                      if(t.name==sp.ticket_name){
                          $scope.ticketval=t.ticket_code+"";
                      }
                  });
              }
          });
         
      }
  };
  //create speaker form
  $scope.addSpeaker=function(form){ 
    if ($scope.cmpytumblr==undefined) {
      $scope.cmpytumblr='';
    }
    $('#loading').show();
    $scope.notConnectedNet = false;
    var online = navigator.onLine;
    if(window.location.pathname=="/collaborator/add-special-delegate" && localStorage.getItem('convertSp')){
        if($scope.convSpeakerInfo.using_yara ==true)
        {
          $scope.isExists_user = 1;
          $scope.SPKemail=$scope.convSpeakerInfo.email;
        }
        else{
            $scope.isExists_user = 0;
        }
    }
    if(window.location.pathname=="/collaborator/add-special-delegate" && localStorage.getItem('spEdit')){
        if($scope.editSpInfo.using_yara ==true)
        {
          $scope.isExists_user = 1;
          $scope.SPKemail=$scope.editSpInfo.email;
        }
        else{
            $scope.isExists_user = 0;
        }
    }
    $scope.errormsg=false;
    var fd=new FormData();

    fd.append('event_code',$scope.currentval.event_code);
    fd.append('delegate_name',$scope.spname);
    fd.append('contact_email',$scope.SPKemail);
    fd.append('description',$scope.spkabt);
    angular.forEach($scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID),function(model,key){
      fd.append('profile_picture',model.file);
    });
    var len=$scope.SpkPic.getFiles($scope.SpkPic.FILE_TYPES.VALID).length;
    if(($scope.imageSrc1!=null||$scope.imageSrc1!=undefined)&&len>0){
      fd.append('profile_picture',$scope.imageSrc1);
      fd.append('new_picture',1);
    }
    else if(len==0){
      fd.append('profile_picture','');
      fd.append('new_picture',0);
    }
    var temp=[{
      'social_provider': 'Website',
      'link': $scope.cmpyweb
    },{
      'social_provider': 'Twitter',
      'link': $scope.cmpytwitter
    },{
      'social_provider': 'Facebook',
      'link': $scope.cmpyfb
    },{
      'social_provider': 'LinkedIn',
      'link':$scope.cmpylink
    },{
      'social_provider': 'Pinterest',
      'link': $scope.cmpypinterest
    },{
      'social_provider': 'Tumblr',
      'link': $scope.cmpytumblr
    },{
      'social_provider': 'GitHub',
      'link': $scope.cmpygithub
    },{
      'social_provider': 'Instagram',
      'link': $scope.cmpyinstagram
    }
    ];
    fd.append('social_providers',angular.toJson(temp));
    fd.append('user_exists',$scope.isExists_user);
    fd.append('ticket_code',$scope.ticktselected);
    fd.append('designation',$scope.spkdesg);
    fd.append('company_name',$scope.spkcmpy);
    fd.append('delegate_type',$scope.delegateIdinfo.id);
    fd.append('direct',$scope.direct);
    if($scope.userData!=null){
        if($scope.userData.person_code!=null && $scope.userData.yara_user_code==null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'person_code':$scope.userData.person_code
          }
        }
        else if($scope.userData.person_code==null && $scope.userData.yara_user_code!=null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'yara_user_code':$scope.userData.yara_user_code
          }
        }
        else if($scope.userData.person_code!=null && $scope.userData.yara_user_code!=null){
          var dataUser = {
            'profile_picture':$scope.userData.profile_picture,
            'person_code':$scope.userData.person_code,
            'yara_user_code':$scope.userData.yara_user_code
          }
        }    
        fd.append('user_data',angular.toJson(dataUser));
    }
    else{
        fd.append('user_data',$scope.userData);
    }
    if($scope.selType=='create'){
        if($scope.isExists_user==1 && len>0){
          // fd.append('new_picture',1);
        }else{
          // fd.append('new_picture',0);
        }
        $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate/',
               data:fd,
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
        }).then(function success(response){
            $scope.cdata=response.data;
             $scope.data={};
            if($scope.cdata.result==1){
              var redirect =sessionStorage.getItem('redirect');
              if(redirect != undefined && redirect != '' && redirect != 'done'){
                sessionStorage.setItem('redirect','done');
                window.location=redirect;
              }else{
                $scope.prtSPVal='SPList';
              // history.replaceState(null, null, "/collaborator/people");
              window.location="people";
             }
                //$scope.getSpeakers();
            }else if($scope.cdata.result==0){
              $scope.errormsg=true;
              $scope.data.error=$scope.cdata.message;
              $('#loading').hide();
              $('#container').fadeIn();
            }else{
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.errormsg=true;
              $scope.data.error=GetDataService.errorMsg[1];
            }
        },function error(response){
          $scope.data={};
          //console.log(response);
           $scope.errormsg1=true;
          if(response.status==-1 || response.data==null){
                  if($rootScope.online==false)
                  {
                      $scope.data.error=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.data.error=GetDataService.errorMsg[1];
                  }                          
          }else
          $scope.data.error=GetDataService.errorMsg[1];
          $('#loading').hide();
        }); 
    } else if($scope.selType=='update'){
        if($scope.SkpPic!='' && len>0){
          fd.append('new_picture',1);
        }
        else if($scope.imageSrc1!=null||$scope.imageSrc1!=undefined){
                fd.append('new_picture',0);
        }else{
          fd.append('new_picture',0);
        }
        var specdele=JSON.parse(localStorage.getItem('editSpInfo'))
        fd.append('opp','edit');
        fd.append('sp_delegate_code',specdele.sp_delegate_code);
        fd.append('sp_delegate_name',$scope.spname);
        // fd.append('username',$scope.selUpdateUser);
        $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate-edit/',
               data:fd,
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
        }).then(function success(response){
            $scope.udata=response.data;
            if($scope.udata.result==1){
                window.location="people";
            }else if($scope.udata.result==0){
              $scope.errormsg=true;
              $scope.data.error=$scope.cdata.message;
              $('#loading').hide();
              $('#container').fadeIn();
            }else{
               //console.log(response);
              $scope.errormsg=true;
              $scope.data.error=GetDataService.errorMsg[1];
              $('#loading').hide();
             $('#container').fadeIn();
            }
             
        }); 
    }
  };
  $scope.enableDisablepop = function(info,spCode,action){
      console.log(info);
            console.log(spCode);

      // var sp={
      //   invited_email:info,
      //   speaker_code:spCode
      // };
      if(action =="dis"){
        $scope.enaDisInfo = {
          head:"Disable",
          otherInfo:info,
          disable:true,
          type:'sp'
        };
        // ---------------checking possibile to disable sp delegate-------------
            $('#loading').show();
            $http({method:'POST',
               url:YaraBaseUrl.url+'/sp-delegate/validate_delegate_disable/',
               data:{
                  event_code:$scope.currentval.event_code,
                  person_code:spCode
               }
            }).then(function success(response){
                $scope.response=response;
                console.log($scope.response);
                if($scope.response.data.result==1){
                    $('#people-delete').modal('show');  
                    $('#loading').hide();
                    $('#container').fadeIn();
                }else if($scope.response.data.result==0){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.disableConflictInfo=$scope.response.data;
                  $('#disable-sp-conflict').modal('show');  
                  // $scope.errormsg=true;
                  // $scope.errmsg=$scope.response.message;
                }else{
                  $scope.errormsg=true;
                  $scope.errmsg=GetDataService.errorMsg[1];
                }
                $('#loading').hide();
                $('#container').fadeIn();
            },function error(response){
              $scope.errormsg=true;
              if(response.status==-1 || response.data==null){
                      if($rootScope.online==false)
                      {
                          $scope.errmsg=GetDataService.errorMsg[0];
                      }
                      else{
                          $scope.errmsg=GetDataService.errorMsg[1];
                      }                          
              }else
              $scope.errmsg=GetDataService.errorMsg[1];
            }); 
        // ----------------end checking possibile to disable sp delegate -------
      }
      else{
        $scope.enaDisInfo = {
            head:"Enable",
            otherInfo:info,
            disable:false,
            type:'sp'
        };
        $('#people-delete').modal('show');  
      }
      // $('#people-delete').modal('show');  
  };
  $scope.enableDisableSpeaker = function(sp){
    if(sp.disable){
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/sp-delegate/disable/',
           data:{
              event_code:$scope.currentval.event_code,
              person_code:sp.otherInfo.person_code,
              delegate_type:$scope.f_user
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
                $('#disable-sp-conflict').modal('hide');  
             }
            $('#loading').hide();
            $('#container').fadeIn();
          }); 
    }
    else{
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/sp-delegate/enable/',
           data:{
               event_code:$scope.currentval.event_code,
               person_code:sp.otherInfo.person_code,
               delegate_type:$scope.f_user
           }
          }).then(function success(response){
             $scope.data=response.data;
             if($scope.data.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
  };
  // resend  invitation mail  modal
  $scope.resendMail = function(userInfo){
      $scope.errormsg=false;
      $scope.errmsg='';
      $scope.userInfo = userInfo;
      $('#people-invite').modal('show');  
  };
  // resend  invitation mail  
  $scope.sendMail = function(mail){
      $('#loading').show();
      $http({
             method:'POST',
             url:YaraBaseUrl.url+'/resend_invitation/',
              data:{
                event_code:$scope.currentval.event_code,
                email:mail
               }
      }).then(function success(response){
          $scope.response=response.data;
           $scope.data={};
          if($scope.response.result==1){
              $scope.ListPeoples=[];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.offset = 0;
              $scope.params.limit = 50;
              $scope.params.type = $scope.f_user;
              if($scope.params.offset==0){
                  $scope.getAllpeople();  
              }
              $('#people-invite').modal('hide');
          }else if($scope.response.result==0){
            $('#loading').hide();
            $scope.errormsg=true;
            $scope.errmsg=$scope.response.message;
          }else{
            $scope.errormsg=true;
            $scope.errmsg=GetDataService.errorMsg[1];
          }
          $('#loading').hide();
      },function error(response){
        $scope.data={};
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                          
        }else
        $scope.data.error=GetDataService.errorMsg[1];
      }); 
  };
  // selection of convertion form delegate to any special delegate
  $scope.selectedType = function(cnvrtInfo){
    $scope.selectedval=cnvrtInfo.id;
      for(var i=0; i< $scope.convertingPeoplelist.length ;i++){
        if(cnvrtInfo.id==$scope.convertingPeoplelist[i].id){
          // $scope.subtypelist=$scope.eventtypes[i].sub_type;
          // $scope.subtitle=''; 
          break;
        }
      }
    localStorage.setItem('delegateIdinfo',angular.toJson(cnvrtInfo));
  };
  $scope.changeTicket = function(u){
      $scope.selectedval='';
      $('#loading').show();
      GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:u.email}).then(function(res){
        if(res.result==1){
              $scope.updatedTicketsdata=res.tickets;  
              $scope.seleDelInfo = u;
              $scope.changingTickets=[];
              $scope.seleDelInfo = u;
              $scope.aviTicketInfo = res;
              angular.forEach($scope.updatedTicketsdata,function(value,key){
                if($scope.updatedTicketsdata[key].ticket_code!=$scope.seltab){
                  $scope.changingTickets.push($scope.updatedTicketsdata[key]);
                }
              });
              $('#loading').hide();
              $('#container').fadeIn();
              $('#change-ticket').modal('show');
        }
      });
  };
  $scope.selectedTicketType = function(chngTicket){
    $scope.selectedval=chngTicket.ticket_code;
      for(var i=0; i< $scope.changingTickets.length ;i++){
        if(chngTicket.ticket_code==$scope.changingTickets[i].ticket_code){
          // $scope.subtypelist=$scope.eventtypes[i].sub_type;
          // $scope.subtitle=''; 
          break;
        }
      }
  };
  $scope.ticketChange=function(tktCode){
    $('#loading').show();
    $http({
           method:'POST',
           url:YaraBaseUrl.url+'/user_ticket/',
            data:{
              email:$scope.seleDelInfo.email,
              ticket_code:tktCode
             }
    }).then(function success(response){
        $scope.response=response.data;
         $scope.data={};
        if($scope.response.result==1){
              $scope.ListPeoples=[];
              $scope.EndList=false;
              $scope.params.ticket_code = $scope.seltab;
              $scope.params.initialize_ticket = 0;
              $scope.params.offset = 0;
              $scope.params.limit = 50;
              $scope.params.type = $scope.f_user;
              if($scope.params.offset==0){
                  $scope.getAllpeople();  
              }
              $('#change-ticket').modal('hide');
        }else if($scope.response.result==0){
          $('#loading').hide();
          $scope.errormsg=true;
          $scope.errmsg=$scope.response.message;
        }else{
          $scope.errormsg=true;
          $scope.errmsg=GetDataService.errorMsg[1];
        }
        $('#loading').hide();
    },function error(response){
      $scope.data={};
       $scope.errormsg1=true;
      if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.data.error=GetDataService.errorMsg[0];
              }
              else{
                  $scope.data.error=GetDataService.errorMsg[1];
              }                          
      }else
      $scope.data.error=GetDataService.errorMsg[1];
    }); 
  };
  $scope.redirectToPeople = function(){
        window.location="/collaborator/people";
  }
  $scope.deleagteConvertion = function(){
        window.location="/collaborator/add-special-delegate";
  };
  $scope.editSP = function(sp){
      localStorage.removeItem('delegateTosp');
      localStorage.removeItem('convertSp');
      localStorage.removeItem('editSpInfo');
      localStorage.removeItem('spEdit');
      localStorage.setItem('editSpInfo',angular.toJson(sp));
      localStorage.setItem('spEdit',true);
      var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo'));
      if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
      } 
      redirectionInfo.speaker=true;
      localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
      window.location="/collaborator/add-special-delegate";
  };
  // convert delegate to speaker
  $scope.delToSpeaker = function(info){
    $scope.selectedval='';
    localStorage.removeItem('delegateTosp');
    localStorage.removeItem('convertSp');
    localStorage.removeItem('editSpInfo');
    localStorage.removeItem('spEdit');
    localStorage.setItem('delegateTosp',angular.toJson(info));
    localStorage.setItem('convertSp',true);
    var redirectionInfo=angular.fromJson(localStorage.getItem('redirectionInfo'));
    if(redirectionInfo==null){
        var redirectionInfo= {
          delegate:false,
          speaker:false,
          bulk:false
        };
    } 
    redirectionInfo.speaker=true;
    localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
  };
  // Feting data for converting delegate to speaker
  $scope.convtoSpeaker=function(){
    $scope.direct=0;
    $scope.ticketsdata = [];
    $scope.convSpeakerInfo=angular.fromJson(localStorage.getItem('delegateTosp')); 
    console.log($scope.convSpeakerInfo);
    GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:$scope.convSpeakerInfo.email}).then(function(res){
      if(res.result==1){
                $scope.ticketsdata=res.tickets; 
                if($scope.convSpeakerInfo.using_yara==true){
                  $scope.SPKemail = $scope.convSpeakerInfo.invited_email;
                   $scope.spname =  $scope.convSpeakerInfo.full_name;
                    $scope.spkdesg = $scope.convSpeakerInfo.designation;
                    $scope.spkcmpy = $scope.convSpeakerInfo.company_name;
                    $scope.imageSrc1 = $scope.convSpeakerInfo.profile_picture;
                    $scope.disableName=false;
                }
                else{
                      $scope.SPKemail = $scope.convSpeakerInfo.invited_email;
                      $scope.disableName=false;
                      $scope.checkEmail($scope.SPKemail);
                }
      }
    });
  };
  // scroll when special people miss image
  $scope.errorScroll = function(){
    // console.log($scope.imageSrc1==undefined, $scope.wordlength  )
    if($scope.speakerForm.$invalid==false && !$scope.imageSrc1 && $scope.wordlength==false){
      $timeout(function(){
             APPService.scrollJquery('spimage');
      },100);
    }else if ($scope.wordlength) {
      $timeout(function(){
             APPService.scrollJquery('fullname');
      },100);
    }
  };
  // Feting data for  editing special delegate
  $scope.editSpecialDelegate=function(){
      $scope.direct=0;
      $('#loading').show();
      $scope.ticketsdata = [];
      $scope.editSpInfo=angular.fromJson(localStorage.getItem('editSpInfo')); 
      if($scope.editSpInfo!=undefined){
        GetDataService.getAvilabileTickets({event_code:$scope.currentval.event_code,email:$scope.editSpInfo.email}).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets; 
              $scope.SPKemail = $scope.editSpInfo.invited_email;
              $scope.spname =  $scope.editSpInfo.full_name;
              $scope.spkdesg = $scope.editSpInfo.designation;
              $scope.spkcmpy = $scope.editSpInfo.company_name;
              $scope.spkabt =  $scope.editSpInfo.description;
              $scope.imageSrc1 = $scope.editSpInfo.profile_picture;
              $scope.disableName=false;
              window.setTimeout( function() {
                  $("textarea").height( $("textarea")[0].scrollHeight );
              }, 500);
              if($scope.editSpInfo.sp_social_providers!=null){
                angular.forEach($scope.editSpInfo.sp_social_providers,function(s){
                  if(s.social_provider=="Website")
                     $scope.Tcmpyweb=s.link;
                  else if(s.social_provider=="Tumblr")
                     $scope.Tcmpytumblr=s.link;
                  else if(s.social_provider=="Twitter")
                      $scope.Tcmpytwitter=s.link;
                  else if(s.social_provider=="LinkedIn")
                      $scope.Tcmpylink=s.link;
                  else if(s.social_provider=="Facebook")
                     $scope.Tcmpyfb=s.link;
                  else if(s.social_provider=="Pinterest")
                     $scope.Tcmpypinterest=s.link;
                  else if(s.social_provider=="GitHub")
                    $scope.Tcmpygithub=s.link;
                  else if(s.social_provider=="Instagram")
                     $scope.Tcmpyinstagram=s.link;
                });

                $timeout(function(){
                    $scope.checkScocialDisabled();
                  }
                ,1000);
              }
              $('#loading').hide();
              $('#container').fadeIn();
           }
        });
      }
  };
  $scope.disableMail = false;
  if(window.location.pathname=="/collaborator/add-special-delegate" && localStorage.getItem('spEdit')){
    $scope.disableMail = localStorage.getItem('spEdit');
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.selType='update';
    $scope.editSpecialDelegate();
  }
  else if(window.location.pathname=="/collaborator/add-special-delegate" && localStorage.getItem('convertSp')){
    $scope.disableMail = localStorage.getItem('convertSp');
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.selType='create';
    $scope.convtoSpeaker();
  }
  else if(window.location.pathname=="/collaborator/add-special-delegate"){
    $scope.selType='create';
    $scope.delegateIdinfo = angular.fromJson(localStorage.getItem('delegateIdinfo'));
    $scope.ticketsdata = [];
    $scope.allTickets();  
    // console.log($scope.delegateIdinfo.id);
  }
  //uploading bulk emails and fetching emails
  $scope.getEmails=function(form){
    //$('#loading').fadeIn();
    $scope.percent = '25%';
    $('div.progressbars-decipher.progress_bulk_upload.progress_single').animate({width: $scope.percent }, 2000, function() {
                //  // //console.log(mainobj);
      $('div.progressbars-decipher.progress_bulk_upload.progress_single').children("span").css("opacity", "1");  
    });
    $('#progress-loader').show(); 
    $scope.ds.eLists=[];
    $scope.ds.eList=[];
    $scope.EmailList=[];
    $scope.EmailDuplicates=[];
    $scope.EmailInvited=[];
    var fd=new FormData();
    angular.forEach($scope.sharefiles.getFiles($scope.sharefiles.FILE_TYPES.VALID),function(model,key){
      fd.append('email_file',model.file);
      $scope.currentfile=model.file.name;
    });
    fd.append('ticket_code',$scope.ticktselected);
    // $scope.UpStep='step3';
    //  $scope.EmailList = ['a@gmail.com','asds@gmail.com','a@gmail.com','asadasda@gmail.com','aasdasd@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com'
        //                ,'a@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','asdasd@gmail.com','a@gmail.com','a@gmail.com','a@gmail.com','asadasdkkk@gmail.com'];
    // $scope.ds.eList=$scope.EmailList;                        
    ////console.log($scope.EmailList.length);
    //fd.append('users',$scope.fileUpload);
    $scope.errormsg1=false;
    $http({method:'POST',
        url:YaraBaseUrl.url+'/invite/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        // $scope.data=response.data.emails;
        $scope.data=response.data;
        if(response.data.result == 1){
          $scope.account=response.data.emails.delegate_account_emails;
          $scope.EmailList=response.data.emails.non_account_emails;
          $scope.conflictInvitedEmails=response.data.emails.conflict_invited_emails;
          $scope.ds.eLists=response.data.emails.non_account_emails;
          $scope.EmailInvited=response.data.emails.invited_emails;
          $scope.totalCount=response.data.emails.delegate_account_emails_len+response.data.emails.non_account_emails_len;
          $scope.percent = '25%';
          $('div.progressbars-decipher.progress_bulk_upload.progress_single').animate({width: '100%' }, 2000, function() {
                      //  // //console.log(mainobj);
            $scope.percent = '100%';
            $scope.$apply();
            $('div.progressbars-decipher.progress_bulk_upload.progress_single').children("span").css("opacity", "1");  
           $timeout(function(){
              $scope.UpStep='step3';
              $scope.$apply();
              ////console.log($scope);
              $('#progress-loader').hide(); 
            },800);
            
          });
          //
        }else if(response.data.result == 0){
          $('#progress-loader').hide();
          $scope.errormsg1=true;
          $scope.errorMsg=response.data.message;

          // if($scope.data.emails!=undefined){
          //     if ( $scope.data.emails.checkout_emails !=undefined && $scope.data.emails.checkout_emails.length <=0){
          //      $scope.errorMsg=GeneraltDataService.errorMsg[5];
          //    }
          //  }
        }else{
          $scope.errormsg1=true;
          $scope.errorMsg=GetDataService.errorMsg[1];
          //console.log(response);
          $('#progress-loader').hide();
        }
        
        $('#loading').fadeOut(function(){
          $('body').css('overflow','auto');
        });
      },function error(response){
        $('#progress-loader').hide();
        $scope.data={};
        //console.log(response);
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
              if($rootScope.online==false)
              {
                  $scope.errorMsg=GetDataService.errorMsg[0];
              }
              else{
                  $scope.errorMsg=GetDataService.errorMsg[1];
              }
        }else
        $scope.errorMsg=GetDataService.errorMsg[1];
        $('#loading').fadeOut(function(){
          $('body').css('overflow','auto');
        });
      });
  };
  $scope.enaDisablePop= function(dele,disEnb){
    console.log(dele);
    if(disEnb =="dis"){
      $scope.enaDisInfo = {
        head:"Disable",
        otherInfo:dele,
        disable:true,
        type:'del'
      };
    }
    else{
      $scope.enaDisInfo = {
          head:"Enable",
          otherInfo:dele,
          disable:false,
          type:'del'
        };
    }
    $('#people-delete').modal('show');        
  };
  $scope.disEnable = function(enaDisInformation){
    if(enaDisInformation.disable){
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/delegate/disable/',
           data:{
               event_code:$scope.currentval.event_code,
               email:enaDisInformation.otherInfo.invited_email,
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
    else{
        $('#loading').show();
        $http({method:'POST',
           url:YaraBaseUrl.url+'/delegate/enable/',
           data:{
               event_code:$scope.currentval.event_code,
               email:enaDisInformation.otherInfo.invited_email,
           }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $scope.searchPeople='';
                $scope.searching=false;
                $scope.ListPeoples=[];
                $scope.EndList=false;
                $scope.params.ticket_code = $scope.seltab;
                $scope.params.initialize_ticket = 0;
                $scope.params.offset = 0;
                $scope.params.limit = 50;
                $scope.params.type = $scope.f_user;
                if($scope.params.offset==0){
                    $scope.getAllpeople();  
                }
                $('#people-delete').modal('hide');
             }
              $('#loading').hide();
          }); 
    }
  };
  $scope.reditoPeople = function(){
    window.location="/collaborator/people";
  }
  $scope.topUpPackage = function(){
    window.location = "/topup";
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
  $scope.updateSocials = function(){
    var s=['company-website','twitter','facebook','linkedin','pinterest','tumblr','git-hub','instagram'];
    for(var i=0;i<s.length;i++){
      var flag=0;
      if(s[i]=='company-website' && $scope.cmpyweb.length>8){
        flag=1;
      }else if(s[i]=='twitter' && $scope.cmpytwitter.length>20){
        flag=1; 
      }else if(s[i]=='facebook' && $scope.cmpyfb.length>25){
        flag=1; 
      }else if(s[i]=='linkedin' && $scope.cmpylink.length>25){
        flag=1; 
      }else if(s[i]=='pinterest' && $scope.cmpypinterest.length>26){
        flag=1; 
      }else if(s[i]=='tumblr' && $scope.cmpytumblr.length>0){
        flag=1; 
      }else if(s[i]=='git-hub' && $scope.cmpygithub.length>19){
        flag=1; 
      }else if(s[i]=='instagram' && $scope.cmpyinstagram.length>26){
        flag=1; 
      }
      var currId= GetDataService.getSocailId(s[i]);
      if(flag==1){
        $('.'+currId).removeClass("bootstrap-font-icon-gray").addClass("bootstrap-font-icon-black");
    }else{
      $('.'+currId).removeClass("bootstrap-font-icon-black").addClass("bootstrap-font-icon-gray");
      }
    }
  }
  if (window.location.pathname=="/collaborator/add-special-delegate" && localStorage.getItem('editSpInfo')!=null) {
    $timeout(function() {$scope.updateSocials();}, 1000);
  }  
}]);
//Gatekeeper Controller for collabartor
app.controller('CollaboratorGatekeeperController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll','$timeout',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll,$timeout){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  // getting privilege based on options is viewed
  if(GetDataService.getPrivilege(5)=='Admin')
    $scope.privilege=true;
  else
    $scope.privilege=false;
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  //getting event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/collaborator-dashboard";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.selectedPermission=angular.fromJson(localStorage.getItem('selectedPermission'));
  $scope.peopleMange=false;
  for (var i = $scope.selectedPermission.length - 1; i >= 0; i--) {
    if($scope.selectedPermission[i].name=="People"){
      $scope.peopleMange=true;
      break;
    }
  }
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  }
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  // precheckin time
  $scope.preCheckinTime=function(){
    angular.forEach($scope.pre_checkin_data,function(value,key){
          if($scope.seltab==$scope.pre_checkin_data[key].day_id)
          {
             $scope.gatePassHour=$scope.pre_checkin_data[key].pre_checkin_time;
             $scope.checkinStarted=$scope.pre_checkin_data[key].checkin_started;
          }
        });
  };
  $scope.gatekeeperInfo = function(){
    GetDataService.gatekeeperInfo($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.img = res.gate_pass_logo;
        $scope.pre_checkin_data = res.pre_checkin_data;
        $scope.preCheckinTime();
        $('#loading').hide();
       $('#container').fadeIn();
      }
    });
  };
  $scope.gatekeeperInfo();
  // change logo
  $scope.logoChange = function(){
    $scope.imageSrc=$scope.img;
  };
  // reassign after setting day names
  $scope.setDayName =function(){
    angular.forEach($scope.dates,function(d){
        angular.forEach($scope.eventDaysInfo,function(value,key){
          if(d==$scope.eventDaysInfo[key].date){
            $scope.days[d]=$scope.eventDaysInfo[key];
          }
        });
    });
  };
  $scope.setDayName();
  //selecting tabs
  var gatetabs=localStorage.getItem('gatetab');
  $scope.tabsid=false;
  for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
    if ($scope.eventDaysInfo[i].dayID==gatetabs) {
      $scope.seltab=gatetabs;
      $scope.gettb=gatetabs;
      $scope.isDayActive=$scope.eventDaysInfo[i].isDayActive;
      $scope.tabsid=true;
      $scope.movebutton=i;
      $scope.day_title=$scope.eventDaysInfo[i].dayTitle;
    }
  }
  if ($scope.tabsid==false) {
    $scope.seltab=$scope.eventDaysInfo[0].dayID;
    $scope.isDayActive=$scope.eventDaysInfo[0].isDayActive;
    $scope.gettb=$scope.eventDaysInfo[0].dayID;
    $scope.day_title=$scope.eventDaysInfo[0].dayTitle;
  }
  $timeout(function() {
      $scope.ddbt=$scope.movebutton+1
      if ($scope.ddbt>3) {
        $scope.forl=$scope.ddbt-3;
        for (var i = 0; i < $scope.forl; i++) {
          $(".slider").diyslider("move", "forth"); 
          $scope.dbutton--;
        }
    }
  }, 100);
  $scope.gatecodedownlode=function () {
    GetDataService.getgatekeepercode($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.gatecodeDownload=res;
      }
    });
  };
  $scope.params ={
    event_code:$scope.currentval.event_code,
    day_id:$scope.seltab,
    offset:0,
    limit:50
  };
  $scope.inc=0;
  $scope.gatecodedownlode=function () {
    GetDataService.getgatekeepercode($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.gatecodeDownload=res;
        $('#gatepass-download').modal('show');
      }
    });
  }
  $scope.selecttab = function(d){
    $scope.day_title=d.dayTitle;
    $scope.EndList=false;
    localStorage.setItem("gatetab", d.dayID);
    $scope.seltab=d.dayID;
    $scope.preCheckinTime();
    $scope.isDayActive=d.isDayActive;
    $scope.gatekeeperList = [];
    $scope.params ={
        event_code:$scope.currentval.event_code,
        day_id:$scope.seltab,
        offset:0,
        limit:50
      };
    if($scope.params.offset==0){
        $scope.gatekeeperPeopleinformation();
    }
  };
  $scope.gatekeeperList = [];
  $scope.EndList=false;
  $scope.blockScroll=false;
  $scope.searchCall=false
  $scope.gatekeeperPeopleinformation = function(){ 
      if($scope.EndList==false && $scope.searchCall==false && $scope.blockScroll==false){
            $scope.blockScroll=true;
            $scope.searchCall=false;
            GetDataService.gatekeeperPeopleinfo($scope.params).then(function(res){
              if(res.result==1){
                  $scope.gatekeeperList=$scope.gatekeeperList.concat(res.gate_keeper_data);
                  $scope.EndList = res.end;
                  $scope.blockScroll=false;
                  $scope.totalAppUsers=res.event_users;
                  $scope.checkInUsers=res.checked_in_user;
                  $scope.notCheckInUsers=res.not_checked_in_user;
              }
            });
      }
  };
  $scope.gatekeeperPeopleinformation();
  //pagination infinite scrolling =
  $scope.paginationGk = function(){
    if($scope.searchPeople!=undefined && $scope.searchPeople.length>0 &&!$scope.EndList && $scope.params!=undefined){
      $scope.getSearchPeople();
    }
    else if(!$scope.EndList && $scope.params!=undefined){
       $scope.params.day_id = $scope.seltab;
       $scope.params.offset =  $scope.params.limit;
       $scope.params.limit =  $scope.params.limit+50;  
       $scope.gatekeeperPeopleinformation();
    }
  };
  $scope.creategatepass=function () {
     localStorage.setItem("creategatepass", true);
  };
  $scope.$watch('searchPeople', function(newval,oldval){
      if (newval!=undefined &&newval!=null && newval.length>0) {
            $scope.searchParam={};
            $scope.searchParam.q =  $scope.searchPeople;
            $scope.searchParam.event_code = $scope.currentval.event_code;
            $scope.searchParam.ticket_code = "";
            $scope.searchParam.on = null;
            $scope.searchParam.limit = 50;
            $scope.searchParam.offset = 0;
            $scope.searchParam.day_id = $scope.seltab;
            $scope.gatekeeperList = [];
            $scope.reachEnd = false;
            $scope.searchCall=true;
            $scope.getSearchPeople();
      }
      else if ((newval==undefined ||newval==''||newval==null) && oldval!=undefined){
              $scope.EndList=false;
              $scope.gatekeeperList = [];
              $scope.searchCall=false;
              $scope.params ={
                  event_code:$scope.currentval.event_code,
                  day_id:$scope.seltab,
                  offset:0,
                  limit:50
              };
              $scope.gatekeeperPeopleinformation();
      }
  },true);
  $scope.getSearchPeople = function(){
      if($scope.reachEnd==false && $scope.searchParam!=undefined && $scope.blockScroll==false)
      {
            $scope.blockScroll = true;
            $scope.searchCall=true;
            GetDataService.getPeoplesearchInfo($scope.searchParam).then(function(res)
            {
              if(res.result==1){
                 $scope.gatekeeperList=$scope.gatekeeperList.concat(res.search_data);
                  $scope.blockScroll = false;
                  $scope.searchCall=false;
                  $scope.reachEnd = res.end;
                  if(res.end==false){
                      var offset = $scope.gatekeeperList.length;
                      $scope.searchParam.offset = offset;
                      $scope.searchParam.limit = offset+50;
                  }

              }
            });
      }
  };
  // check in 
  $scope.checkIn = function(gkInfo){
        $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/checkin/',
              data:{
                yara_user_code:gkInfo.yara_user_code,
                event_code:$scope.currentval.event_code,
                day_id:$scope.seltab
              }
          }).then(function success(response){
            $scope.checkIntime=response.data;
            if(response.data.result==1){
                $scope.gatekeeperList = [];
                $scope.EndList=false;
                $scope.params ={
                    event_code:$scope.currentval.event_code,
                    day_id:$scope.seltab,
                    offset:0,
                    limit:50
                  };
                if($scope.params.offset==0){
                    $scope.gatekeeperPeopleinformation(1);
                }
            }else if($scope.checkIntime.result==0){
              $scope.checkIntime.error = $scope.checkIntime.message;
              $('#Check-in').modal('show');
            }else{
              $scope.checkIntime.error= GetDataService.errorMsg[1];
            }
            $('#loading').hide();
            $('#container').fadeIn();
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
  };
  $scope.GK=$scope;
  // reset optional img validation
  $scope.resetImg =function(){
    $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',true);
    $scope.GKlogoform.cmpylogo.$setValidity('minDimension',true);
    $scope.GKlogoform.cmpylogo.$setValidity('ratioval',true);
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
          model.setType(4);
        });
    }
  };
  var pre_checkin_times = [];
  // save entry time for the event
  $scope.saveGKtime = function(){
      angular.forEach($scope.GK.TimeSel,function(value,key){
        var chkinTime = {
          day_id:key,
          pre_checkin_time:value
        };
        pre_checkin_times.push(chkinTime);
      });
      $scope.setupStep='step2';
  };
  // update the entry time for a day
  $scope.saveEntryTime = function(){
        $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/gate_pass/pre_checkin_time/',
              data:{
                pre_checkin_time:$scope.gatePassHour,
                event_code:$scope.currentval.event_code,
                day_id:$scope.seltab
              }
          }).then(function success(response){
            $scope.checkIntime=response.data;
            if(response.data.result==1){
                $('#gatepass-manage-time').modal('hide');
                $scope.gatekeeperInfo();
            }else if($scope.checkIntime.result==0){
              $scope.checkIntime.error = $scope.checkIntime.message;
            }else{
              $scope.checkIntime.error= GetDataService.errorMsg[1];
            }
            $('#loading').hide();
            $('#container').fadeIn();
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
  };
  // setup gatekeeper api call
  $scope.GKsetupDone  =function(){
    $scope.errormsg1=false;
    var fd= new FormData();
    fd.append('event_code',$scope.currentval.event_code);
    fd.append('pre_checkin_times',JSON.stringify(pre_checkin_times));
    angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('logo',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('logo','');
    }
    $http({method:'POST',
                 url:YaraBaseUrl.url+'/gate_pass/',
                 data:fd,
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
          }).then(function success(response){
              $scope.cdata=response.data;
              if($scope.cdata.result==1){
                $scope.currentval.gate_keeper=1;
                localStorage.setItem('selEventsData',angular.toJson($scope.currentval));
                window.location="/event/gatekeeper";
              }else if($scope.cdata.result==0){
                $scope.errormsg1=true;
                $scope.cdata.error=$scope.cdata.message;
              }else{
                $scope.errormsg1=true;
                $scope.cdata.error=GetDataService.errorMsg[1];
              }
          },function error(response){
            $scope.cdata={};
             $scope.errormsg1=true;
            if(response.status==-1 || response.data==null){
                    if($rootScope.online==false)
                    {
                        $scope.cdata.error=GetDataService.errorMsg[0];
                    }
                    else{
                        $scope.cdata.error=GetDataService.errorMsg[1];
                    }                    
            }else
            $scope.cdata.error=GetDataService.errorMsg[1];
        }); 
  };
  $scope.isCroping=false;
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
    $scope.isCroping=false;
  };
  // reset crop cancel img
  $scope.resetCropImg =function(){
    if($scope.cropType=='cmpylogo'){
      $scope.imageSrc="";
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $scope.isCroping=false;
    $('.image-editor').cropit('imageSrc', '');
  };
  //img upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.imageSrc='';
    $scope.cmpylogo.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
         $scope.isCroping=true;
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',false);
            model.setType(4);
            $scope.imageSrc="";
             $scope.isCroping=false;
          }else{
            $scope.GKlogoform.cmpylogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.GKlogoform.cmpylogo.$setValidity('minDimension',true);
                $scope.isCroping=true;
                if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                  $scope.isCroping=false;
                }else{
                  $scope.cropType='cmpylogo';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                  
                }
              }else{
                $scope.GKlogoform.cmpylogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
        });
        }
        }
      });

    }
    $timeout(function() {
      $scope.lodinghide=true;
    }, 2000);
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  $scope.updateLogo = function(){
    $('#loading').show();
    var fd= new FormData();
    fd.append('event_code',$scope.currentval.event_code);
     angular.forEach($scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID),function(model,key){
      fd.append('logo',model.file);
    });
    var len=$scope.cmpylogo.getFiles($scope.cmpylogo.FILE_TYPES.VALID).length;
    if(len==0){
      fd.append('logo','');
    }
    $http({method:'POST',
             url:YaraBaseUrl.url+'/gate_pass/logo/',
             data:fd,
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
      }).then(function success(response){
          if(response.data.result==1){
            $('#gatepass-add-logo').modal('hide');
            $scope.gatekeeperInfo();
          }else if(response.data.result==0){
            $scope.errormsg1=true;
            // $scope.cdata.error=$scope.cdata.message;
          }
          $('#loading').hide();
          $('#container').fadeIn();
      },function error(response){
        $scope.cdata={};
         $scope.errormsg1=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.cdata.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.cdata.error=GetDataService.errorMsg[1];
                }                    
        }else
        $scope.cdata.error=GetDataService.errorMsg[1];
    }); 
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  } 
}]);
app.controller('CollaboratorVisitPassController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/collaborator-dashboard";
  }
  localStorage.removeItem('camImage');
  if(localStorage.getItem('creategatepass')==undefined){
      window.location="/collaborator-dashboard";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.validateMail = function(){ 
   if (/^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/.test($scope.email))  
    {  
      return true;
    }else{
      return false;  
    }      
  };
  $scope.checkAccount=function(){
    $scope.emailvalid=  $scope.validateMail();
    if($scope.emailvalid){
      $('#loading').show();
        $http({
              method:'POST',
              url:YaraBaseUrl.url+'/gate_pass_check/',
              data:{
                event_code:$scope.currentval.event_code,
                email:$scope.email
              }
          }).then(function success(response){
            if(response.data.result==1){
               

                if(response.data.gate_pass_check_date.redirect){
                  localStorage.setItem('printGatepass',angular.toJson(response.data.gate_pass_check_date));
                  window.location="/collaborator/create-gatepass";
                }
                else if(response.data.gate_pass_check_date.redirect==false){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.pdfUrl = response.data.gate_pass_check_date.gate_pass_url;
                  $('#myModal-download').modal('show');
                }
            }else if(response.data.result==0){
              $scope.gatepass.error = response.data.message;
              $scope.gatepass.errormsg = true;

              $('#loading').hide();
            $('#container').fadeIn();
            }
          },function error(response){
                $scope.checkIntime={};
                if(response.status==-1 || response.data==null){
                        if($rootScope.online==false)
                        {
                            $scope.checkIntime.error=GetDataService.errorMsg[0];
                        }
                        else{
                            $scope.checkIntime.error=GetDataService.errorMsg[1];
                        }                    
                }else
                $scope.checkIntime.error=GetDataService.errorMsg[1];
              $('#loading').hide();
              $('#container').fadeIn();
          });
    }
  };
  $scope.closeModal = function(){
    $scope.email="";
    $('#myModal-download').modal('hide');
    window.location="/collaborator/gatekeeper";
  };
  $scope.cancelVg=function () {
    localStorage.removeItem('creategatepass');
  }
  $scope.vistorGatepass= function(){
    localStorage.removeItem('printGatepass');
   window.location = "/collaborator/create-gatepass";
  }
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  };
}]);
app.controller('CollaboratorGatepassController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$rootScope','$anchorScroll','$timeout','$window',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$rootScope,$anchorScroll,$timeout,$window){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
      window.location = "/collaborator-dashboard";
  }
  if(localStorage.getItem('creategatepass')==undefined){
    window.location="/collaborator-dashboard";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.specPeople = $scope.currentval.sp_people;
    var dele = {
      group_tittle:"Delegates", 
      id:10,
      single_entity_tittle:"Delegate"
    };
  // $scope.there=false;
  // for (var i = 0; i < $scope.specPeople.length; i++) {
  //   if ($scope.specPeople[i].group_tittle=="Delegates") {
  //     $scope.there=true;
  //   }
  // }
  // if ($scope.there==false) {
    $scope.specPeople=$scope.specPeople.concat(dele);
  // }
   $scope.visitPass=true;
   if(localStorage.getItem('printGatepass')!=null){
      $scope.visitPass=false;
      $scope.gatePassinfo=angular.fromJson(localStorage.getItem('printGatepass'));
      $scope.full_name=$scope.gatePassinfo.full_name;
      $scope.designation=$scope.gatePassinfo.designation;
      $scope.company_name=$scope.gatePassinfo.company_name;
      $scope.imageSrc = $scope.gatePassinfo.profile_picture;
      $scope.email = $scope.gatePassinfo.email;
   }
  //selection of ticket 
  $scope.ticketSel = function(ticket_code){
    $scope.selectTicketval = ticket_code;
        for (var i = 0; i <$scope.ticketsdata.length; i++) {
              if($scope.ticketsdata.ticket_code==ticket_code){
                break;
              }
        }
  };
  // email validation
  $scope.emailFormat = /^[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,63}$/;
  // fetching tickets
  $scope.allTickets = function(){
    $('#loading').show();
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $scope.ticketsdata=res.tickets;  
              $('#loading').hide();
              $('#container').fadeIn();
              if( $scope.visitPass==false) {  
                $scope.ticketSel($scope.gatePassinfo.ticket_code);
              }
          }
      });
  };
  $scope.allTickets();
  // selection of delegate types
  $scope.selectDelType = function(spid){
    $scope.selectedDelval = spid;
    for (var i = 0; i <$scope.specPeople.length; i++) {
        if($scope.specPeople.id==spid){
          break;
        }
    }
  };
  if($scope.visitPass==false) {  
      $scope.selectDelType($scope.gatePassinfo.delegate_type);
  }
  $scope.checkImage = function(){
    $('#take-picture').modal('hide');
    if(localStorage.getItem('camImage')!=undefined){
      $scope.imageSrc = localStorage.getItem('camImage');
      $scope.iswebCamimg=true;
      }
  };
  $scope.removeCamImg = function(){
    $scope.imageSrc=null;
    $scope.iswebCamimg=false;
    localStorage.removeItem('camImage');
  };
  $scope.cancelcreategatepass=function () {
    localStorage.removeItem('creategatepass');
  }
  // --------------------------------------------------------image-----------------
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='floorPic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset crop img is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='floorPic'){
      $scope.imageSrc="";
      angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
      $scope.floorPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
      var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
      if(len>0 ){
        angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
          console.log("test", model.file.size)
          if(key!=(len-1)){
            model.setType(4);
          }else{
            if(model.file.size > 5242880){
              $scope.gatepassForm.floorPic.$setValidity('minsizeval',false);
              model.setType(4);
              $scope.imageSrc="";
            }else{
              $scope.gatepassForm.floorPic.$setValidity('minsizeval',true);

            fileReader.readAsDataUrl(model.file, $scope)
          .then(function(result) {
             GetDataService.getImgDimensions(result,function(width, height) {
                if(width >=512  && height >= 512 ){
                  $scope.gatepassForm.floorPic.$setValidity('minDimension',true);
                    // $scope.imageSrc = result;
                   if(width ==512 && height == 512 ){
                    $scope.imageSrc = result;
                  }else{
                    $scope.cropType='floorPic';
                    $('.image-editor').cropit({
                      imageBackground: true,
                      imageBackgroundBorderWidth: 20,
                      imageState: {
                        src: result,
                      },
                    });
                    $('.image-editor').cropit('imageSrc', result);
                    $('.image-editor').cropit('previewSize', {width:250,height:250});
                    $('.image-editor').cropit('exportZoom', 2.40);
                    $('#crop-image').modal('show');
                  }
                  /*if(width == height){
                    $scope.gatepassForm.floorPic.$setValidity('ratioval',true);
                   
                  }else{
                    $scope.gatepassForm.floorPic.$setValidity('ratioval',false);
                    model.setType(4);
                    $scope.imageSrc="";
                  }*/
                }else{
                  $scope.gatepassForm.floorPic.$setValidity('minDimension',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }
                $scope.$apply();
            });
              //$scope.imageSrc = result;
          });
          }
          }
        });

      }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  // //console.log('something Went wrong');
  });
  // ------------------------------end image-------------------------------------------
  //  error scroll
  $scope.scrollToError = function(){
    $timeout(function() {
      if ($scope.submitted && $scope.selectedDelval==undefined ) {
        APPService.scrollJquery('spdel');
      }else if ($scope.submitted && $scope.selectTicketval==undefined ) {
        APPService.scrollJquery('selticket');
      }
    }, 100);
  };
  $scope.generateGatePass = function(){
    $('#loading').show();
    var fd=new FormData();
    fd.append('delegate_type',$scope.selectedDelval);
    fd.append('ticket_code',$scope.selectTicketval);
    fd.append('company_name',$scope.company_name);
    fd.append('full_name',$scope.full_name);
    fd.append('designation',$scope.designation);
    if($scope.visitPass==true || $scope.gatePassinfo.profile_picture==null){
        if($scope.iswebCamimg)
        {
          fd.append('profile_picture',GetDataService.dataURItoBlob($scope.imageSrc));
        }
        else
        {
            angular.forEach($scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID),function(model,key){
                fd.append('profile_picture',model.file);
              });
              var len=$scope.floorPic.getFiles($scope.floorPic.FILE_TYPES.VALID).length;
              if(len==0){
                fd.append('profile_picture','');
            }
        }
    }
    else{
            fd.append('profile_picture',$scope.gatePassinfo.profile_picture);
    }
    if($scope.visitPass==true){
        fd.append('yara_user_code','');
    }
    else{
        fd.append('yara_user_code',$scope.gatePassinfo.yara_user_code);
    }
    fd.append('email',$scope.email);
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/gate_pass/custom/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
      })
    .then(function success(response){
      $scope.data=response.data;
        $('#loading').hide();
        $('#container').fadeIn();
        if($scope.data.result==0){
            $scope.errorstatus=true;
            $scope.errormsg=$scope.data.message;
        }else if($scope.data.result==1){
            localStorage.removeItem('printGatepass');  
            localStorage.removeItem('creategatepass');
            $scope.pdfUrl = $scope.data.gate_pass_url;
            console.log($scope.pdfUrl);
            $('#myModal-download').modal('show');
        }
        
    },function error(response){
         $scope.errorstatus=true;
         $scope.shownav=false;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.errormsg=GetDataService.errorMsg[0];
                }
                else{
                    $scope.errormsg=GetDataService.errorMsg[1];
                }                
        }else
        $scope.errormsg=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };
  $scope.closeModal = function(){
    $('#myModal-download').modal('hide');
        window.location="/collaborator/gatekeeper";
  };
  $scope.takePicture=false;
  $scope.showCam=function(){
   // $scope.takePicture=true;
  };
  $scope.hideCamera = function(){
       $scope.takePicture=false;
       $('#captureImg').hide();
  };
  // ---------------------------------------------gatepass cameraa----------------------   
  $scope.checkWebcamneeded = function(){
    console.log("reach here");
    // var showCam=false;
    //   if($scope.gatePassinfo.profile_picture==null){
    //     return showCam=true;
    //   }
    //   else{
         console.log($rootScope.browser);
          // browserName = "Safari";

       //if($rootScope.browser=='Chrome'){
              // $scope.iswebcamWork=false;
            // $timeout(function(){
              if($rootScope.browser!="Safari"){
                    navigator.getUserMedia = ( navigator.getUserMedia || // use the proper vendor prefix
                                       navigator.webkitGetUserMedia ||
                                       navigator.mozGetUserMedia ||
                                       navigator.msGetUserMedia);
                    // Check that the browser supports getUserMedia.
                    // If it doesn't show an alert, otherwise continue.
                    if (navigator.getUserMedia) {
                      // Request the camera.
                      // navigator.getUserMedia(
                      //   // Constraints
                      //   {
                      //     video: true
                      //   },
                      //   // Success Callback
                      //   function(localMediaStream) {
                      //     // console.log('The following error occurred when trying to use getUserMedia: ' );
                      //     $scope.iswebcamWork=true;
                      //     console.log("1"+$scope.iswebcamWork);

                      //   },
                      //   // Error Callback
                      //   function(err) {
                      //     // Log the error to the console.
                      //     $scope.iswebcamWork=false;
                      //     console.log("2"+$scope.iswebcamWork);
                      //     return $scope.iswebcamWork;
                      //   }
                      // );
                        // $('#captureImg').show();
                        $scope.takePicture=true;
                                                    // $('#cam-notsupport').modal('show');

                        // return $scope.iswebcamWork=true;
                    }
                    else {
                      // alert('Sorry, your browser does not support getUserMedia');
                            $timeout(function(){

                            $('#cam-notsupport').show();
                            },100);
                            $scope.iswebcamWork=false;
                                console.log("3"+$scope.iswebcamWork);
                                // return $scope.iswebcamWork;
                    }
                }
                else{
                        $timeout(function(){
                        $('#cam-notsupport').show();
                        },100);
                      // return $scope.iswebcamWork=false;

                }
              // },3000);
        // }
        // else{
        //           $scope.iswebcamWork=false;
        //           console.log("4"+$scope.iswebcamWork);
        // }
        // return showCam;
      // }
        // if(($scope.iswebcamWork&&($scope.gatePassinfo.profile_picture==null ||$scope.gatePassinfo.profile_picture==undefined))|| ($scope.iswebcamWork && $scope.visitPass==true) )
        // {
        //   return true;
        // }else{
        //   return false;
        // }
  };
  // ---------------------------------------------end gatepass cameraa----------------------   
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//Adspace Controller
app.controller('CollaboratorAdSpaceController',['$scope','APPService','YaraBaseUrl','$http','$filter','$location','GetDataService','fileReader','$document','$timeout','$rootScope',function($scope,APPService,YaraBaseUrl,$http,$filter,$location,GetDataService,fileReader,$document,$timeout,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  //getting event data from local
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location = "/collaborator-dashboard";
  }
  if (window.location.pathname=="/collaborator/create-adspace") {
    var getredirection =localStorage.getItem('adspaceRedirection')
    if (getredirection=='yes') {
      window.location = "/collaborator-dashboard";
      localStorage.removeItem('adspaceRedirection');
    }    
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - Adspace';
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset);};
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  }
  $scope.currentLocalTime = function(){
    // $('#loading').show();
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
      if (res.result == 1) {
         // $('#loading').hide();
         // $('#container').fadeIn();
         $scope.timeNow= $scope.setOffset(res.local_time_now,0);
         $scope.timeNowTmzone = res.local_time_now;
         // console.log(res);
         $scope.localTimeNow = new Date();
         // get time diff
         $scope.lesstime($scope.setOffset($scope.currentval.days[0].endTime, $scope.currentval.eo));
         // end time diff
      }
    });
  };
  $scope.currentLocalTime();
  $scope.lesstime = function(end) {
      var currentdate = new Date($scope.timeNow);
      var newdate = end;
      var diff = Math.abs(currentdate - newdate);
      var diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
      $scope.threetimediff=false;
      if (diffDays == 0) {
          var timediff = newdate.getTime() - currentdate.getTime();
          var hour = Math.floor((timediff % 86400000) / 3600000);
          var min = Math.round(((timediff % 86400000) % 3600000) / 60000);
          if (hour <= 1) {
              if (min<=30) {
                $scope.threetimediff = true;
              }              
          }
      }
  };
  $scope.isactiveDecipher = function(){
      $scope.showDecipher = false;
      var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
      diff /= 60;  
      var eventTime = $scope.setOffset($scope.timeNowTmzone,Math.abs(Math.round(diff)));
      if(eventTime>$scope.setOffset($scope.currentval.end_date,($scope.currentval.eo+360))){
        $scope.showDecipher = true;
      }      
  };    
  $scope.isSlotAvilabile = function(time){
      var slotAvilabile = true;
      var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
      diff /= 60;  
      var eventTime = $scope.setOffset($scope.timeNowTmzone,Math.abs(Math.round(diff)));
      if(eventTime>=$scope.setOffset(time,$scope.currentval.eo)){
        slotAvilabile = false;
      }
      return slotAvilabile;
  };
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selectedval=[];
  $scope.s=APPService;
  $scope.days={};
  $scope.eventDaysInfo=[]
  angular.forEach($scope.currentval.days,function(value,key){
      var eventDaysInfo = {
        dayID:$scope.currentval.days[key].dayID,
        dayTitle:$scope.currentval.days[key].dayTitle,
        dstOffset:$scope.currentval.days[key].dstOffset,
        isDayActive:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
  if(window.location.pathname!="/collaborator/create-adspace"){
    if(localStorage.getItem('dcode')!=undefined){
       var dayId = localStorage.getItem('dcode');
       for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
            if($scope.eventDaysInfo[i].dayID==Number(dayId)){
              $scope.seltab=$scope.eventDaysInfo[i].dayID;
              $scope.seldayInfo=$scope.eventDaysInfo[i];
              $scope.expday=$scope.eventDaysInfo[i].isDayActive;
              break;
            }
        };
    }
    else{
      $scope.seltab=$scope.eventDaysInfo[0].dayID;
      $scope.expday=$scope.eventDaysInfo[0].isDayActive;
      $scope.seldayInfo=$scope.eventDaysInfo[0];
    }
  }
  if (GetDataService.getPrivilege()=="Admin") {
     $scope.admincheck=true;
   }
   else{
     $scope.admincheck=false;
   }
  $scope.selectedDay='';
  $scope.subtitle='';
  $scope.datetitle='';
  $scope.listBtnTitle=[];
  //fetching add button title
  GetDataService.getAdBtnTitle().then(function(res){
    $scope.listBtnTitle = res.objects;
    $scope.btnLinkTitle=$scope.listBtnTitle[0].tittle;
  });
  //redirect to store 
  $scope.ForwordStore =function(){
    localStorage.setItem('ecode',$scope.currentval.event_code);
    localStorage.setItem('dcode',$scope.seldayInfo.dayID);
    sessionStorage.setItem('redirectFromAd',angular.toJson($scope.currentval));
    window.location="/store-adspace-buy";
  };
  $scope.getSlot = function(d){
      $('#loading').show();
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
              $scope.timeNow= $scope.setOffset(res.local_time_now,0);
              $scope.timeNowTmzone = res.local_time_now;
              $scope.localTimeNow = new Date();
              GetDataService.getAdspace({event_code:$scope.currentval.event_code,day_id:d}).then(function(res){
                if(res.result==1){
                    $scope.reachSlotlimit=false;
                    $scope.timeSlotData=res.ad_slots;
                    $scope.eventOffset = res.eo;
                    $scope.maxSlots = res.max_slots;
                    $scope.slotInterval = res.slot_interval_in_minutes;
                    $scope.adspaceSlots = res.add_purchased_count;
                    $scope.allocatedSlotsCount = res.current_add_count;
                    // console.log($scope.allocatedSlotsCount);
                    $('#loading').hide();
                    $('#container').fadeIn();
                    $scope.isactiveDecipher();
                    $scope.deliverdAds = [];
                    $scope.nonDeliverdAds = [];
                    $scope.adSlots = $scope.timeSlotData;
                    angular.forEach($scope.timeSlotData,function(value,key){
                      if($scope.timeSlotData[key].is_used==true){
                          if($scope.timeSlotData[key].ads.is_pushed){
                              $scope.deliverdAds.push($scope.timeSlotData[key]);
                          }
                          else{
                            $scope.nonDeliverdAds.push($scope.timeSlotData[key]);
                          }
                      }
                    });          
                    if(res.add_purchased_count>0){
                      var reachLimit = res.add_purchased_count-res.current_add_count;  
                      if(reachLimit==0){
                        $scope.reachSlotlimit=true;
                      }
                    }
                }
              });
          }
      });     
  };
  if(window.location.pathname=="/collaborator/create-adspace"){
      var dayId = localStorage.getItem('dcode');
      console.log(Number(dayId));
      console.log($scope.eventDaysInfo);
      // $scope.currentLocalTime();
      for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
          if($scope.eventDaysInfo[i].dayID==Number(dayId)){
            $scope.seltab=$scope.eventDaysInfo[i].dayID;
            $scope.seldayInfo=$scope.eventDaysInfo[i];
            $scope.expday=$scope.eventDaysInfo[i].isDayActive;
            break;
          }
      };
      $scope.getSlot(dayId);  
  }
  // when the user trying to purchase new set of ads slots
  // check its reaached limit or not
  $scope.buyAds = function(){
      if($scope.maxSlots!=$scope.allocatedSlotsCount){
          $scope.ForwordStore();
      }
  };
  //getting adspace
  $scope.getAdspace = function(){
    $('#loading').show();
    GetDataService.getAdspace({event_code:$scope.currentval.event_code,day_id:d}).then(function(res){
      if(res.result==1){
          $('#loading').hide();
          $('#container').fadeIn();
          $scope.addsList=res.adds;
        }
    });
  };
  $scope.SelDate ='';
  $scope.subtitle='';
  //select day and fetching time slot
  $scope.selectDate = function(d){
    $scope.SelDate=d;
    $scope.subtitle='';
    $(".subtitle").text('Select Time Slot');
    $scope.getSlot(d);
  };
  // selection tab
  $scope.ADselecttab = function(d,key){
    localStorage.setItem('dcode',d.dayID);
    $scope.seltab=d.dayID;
    $scope.expday=d.isDayActive;
    $scope.seldayInfo=d;
    $scope.getSlot(d.dayID);
    $scope.lesstime(d.endTime);
  };
  $scope.f_Delivery ='all';
  $scope.viewAds = function(val){
      $scope.f_Delivery = val;
      if(val==true){
          $scope.timeSlotData = $scope.deliverdAds
      }
      else if(val==false){
          $scope.timeSlotData = $scope.nonDeliverdAds;
      }else if (val=='all') {
          $scope.timeSlotData = $scope.adSlots;
          console.log($scope.timeSlotData, "fdhty")
      }
  };
  var Addate=sessionStorage.getItem('dcode');
  var Adtime=sessionStorage.getItem('Adtime');
  if(Addate != '' && Addate != undefined && Addate != null){
    $scope.selectedDay=Addate;
    $scope.SelDate=Addate;
    $scope.getSlot(Addate);
    $scope.subtitle=Adtime;
    $(".subtitle").text($scope.subtitle); 
    sessionStorage.setItem('dcode','');
    sessionStorage.setItem('Adtime','');
  }else{
    var returnday=localStorage.getItem('dcode');
    if (window.location.pathname == "/collaborator/adspace" && returnday!=null) {
        $scope.seltab=returnday;
        $scope.seldayid=returnday;
        for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
          if ($scope.eventDaysInfo[i].dayID==returnday) {
            $scope.expday=$scope.eventDaysInfo[i].isDayActive;
            $scope.movebutton=i;
          }
        }         
        $scope.getSlot(returnday);
        $timeout(function() {
          $scope.ddbt=$scope.movebutton+1
          if ($scope.ddbt>3) {
            $scope.forl=$scope.ddbt-3;
            for (var i = 0; i < $scope.forl; i++) {
              $(".slider").diyslider("move", "forth"); 
              $scope.dbutton--;
            }
          }
        }, 100);
    }else{
        $scope.getSlot($scope.seltab);
    }
  }
  //create time slot , d is day and time is slot time
  $scope.createSlot = function (d, time, c) {
    localStorage.setItem('dcode',d);
    localStorage.setItem('Adtime',time);
    localStorage.removeItem('adspaceRedirection');
    if(c!=undefined){
        localStorage.setItem('slotInfo',JSON.stringify(c));
    }
    else{
      localStorage.removeItem('slotInfo');
    }
    window.location="create-adspace";
  };
  $scope.revokeAdObj='';
  //before revoking slot , t is ad to revoke
  $scope.revokeAd = function (t) {
   $scope.revokeAdObj=t;
  };
  // revoke adspace api call
  $scope.DelAdspace =function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add_edit/',
        data:{
          opp : 'delete',
          add_code:$scope.revokeAdObj.ads.add_code,
          day_id:$scope.seltab,
          old_slot:$scope.revokeAdObj.slot_no,
          new_slot:''
        },
      }).then(function success(response){
        $scope.data2=response.data;
        if($scope.data2.result==null || $scope.data2.result== undefined){
            $scope.errormsg2=true;
            $scope.data2.error=GetDataService.errorMsg[1];
        }else if($scope.data2.result==0){
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
        }else{  
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
          $scope.getSlot($scope.seltab);
          $('#adspace-delete').modal('hide');
        }
        $('#loading').hide();
        $('#container').fadeIn();
      },function error(response){
        $scope.data2={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data2.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data2.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data2.error=GetDataService.errorMsg[1];
        $('#adspace-delete').modal('hide');
        $('#loading').hide();
        $('#container').fadeIn();
      });
  };
  $scope.editAdObj='';
  //before editing adspace timeslot , t is current adspace to edit
  $scope.editAd = function (t) {
    $scope.currentLocalTime();
    $scope.editAdObj=t;
  };
  // api to edit adspace
  $scope.EditAdspace =function(){
    $('#loading').show();
    $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add_edit/',
        data:{
          opp : 'edit',
          add_code:$scope.editAdObj.ads.add_code,
          day_id:$scope.seltab,
          old_slot:$scope.editAdObj.slot_no,
          new_slot:$scope.subtitle.slot_no
        },
      }).then(function success(response){
        $scope.data2=response.data;
        if($scope.data2.result==null || $scope.data2.result== undefined){
            $scope.errormsg2=true;
            $scope.data2.error=GetDataService.errorMsg[1];
        }else if($scope.data2.result==0){
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
        }else{  
          $scope.errormsg2=true;
          $scope.data2.error=$scope.data2.message;
          $scope.getSlot($scope.seltab);
          $('#adspace-change').modal('hide');
        }
       $('#loading').hide();
       $('#container').fadeIn();
      },function error(response){
        $scope.data2={};
         $scope.errormsg2=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data2.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data2.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data2.error=GetDataService.errorMsg[1];
         $('#adspace-delete').modal('hide');
         $('#loading').hide();
          $('#container').fadeIn();
      });
  };
  $scope.urlchange = function() {
      if (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.weburl)) {
          $scope.urlrequired =false;
      } else{
          $scope.urlrequired = true;
      }
  };
  //api call to create adspace
  $scope.CreateAD =function (){
     $scope.errormsg=false;
     $('#loading').show();
     var fd = new FormData();
      fd.append('event_code',$scope.currentval.event_code);
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
        fd.append('image',model.file);
      });
      var len=$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
      if(len==0){
        fd.append('image','');
      }
      fd.append('tittle',$scope.title);
      fd.append('url',$scope.weburl); 
      fd.append('day',localStorage.getItem('dcode'));
      if($scope.custom==true){
        fd.append('display_time',moment($scope.setOffset($scope.subtitle.display_time,$scope.eventOffset)).format("YYYY-MM-DD HH:mm"));
        fd.append('slot_no',$scope.subtitle.slot_no);
      }
      else{
        fd.append('display_time','');
        fd.append('slot_no',0);
      }
      fd.append('button_tittle',$scope.btnLinkTitle);  
      $scope.data={};
      $http({
        method:'POST',
        url:YaraBaseUrl.url+'/add/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        if($scope.data.result==null || $scope.data.result== undefined){
            $scope.errormsg=true;
            $scope.data.error=GetDataService.errorMsg[1];
            $('#loading').hide();
            $('#container').fadeIn();
        }else if($scope.data.result==0){
          $scope.errormsg=true;
          $scope.data.error=$scope.data.message;
          $('#loading').hide();
          $('#container').fadeIn();
        }else if($scope.data.result==1){
           $scope.errormsg=true;
           // $scope.data.error=$scope.data.message;
            localStorage.setItem("adspaceRedirection", 'yes')
            $scope.submitted=false;
            $scope.title='';
            $scope.weburl='';
            $scope.SelDate='';
            $scope.subtitle='';
            $(".subtitle").text('Select Time Slot');
            angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
               model.setType(4);
          });
            $scope.imageSrc ='';
            window.location="/collaborator/adspace";
        }
       // $('#loading').hide();
      },function error(response){
        $scope.data={};
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                if($rootScope.online==false)
                {
                    $scope.data.error=GetDataService.errorMsg[0];
                }
                else{
                    $scope.data.error=GetDataService.errorMsg[1];
                }                
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();        
      });
  }
  //image upload
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.adPic.allowedExtensions(['png', 'jpg', 'jpeg']);
  });
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  // change date
  $scope.changeSubtype=function(c){
   $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".subtitle").show();
    if(c==''){
      $scope.subtitle=c;
      $(".subtitle").text('Select Type'); 
    }else{
      $scope.subtitle=c;
      console.log(c);
      var seleDate='';
      if ($scope.is_time_format_24==true) {
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'HH:mm');
      }else{
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'hh:mm a');
      }
      $(".subtitle").text(seleDate);
    } 
  };
  if (localStorage.getItem('slotInfo')!= undefined && window.location.pathname == "/collaborator/create-adspace" ) {
      $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
     $(".subtitle").show();
     var c = angular.fromJson(localStorage.getItem('slotInfo'));
     $scope.subtitle=c;
      var seleDate;
      if ($scope.is_time_format_24==true) {
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'HH:mm');
      }else{
         seleDate=$filter('date')($scope.setOffset(c.display_time,$scope.currentval.eo),'hh:mm a');
      }
      // $(".subtitle").text(seleDate);
      $timeout(function() {
              $(".subtitle").text(seleDate);
          }, 100);
  }
  $(document).on('click','.subtype_dropdown .primary_nav_wrap ul li',function(){
      $(".subtype_dropdown img").removeClass();
      $(".subtype_dropdown img").addClass('caret02'); 
      $( ".subtype_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".subtype_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".subtype_dropdown img").removeClass();
         $(".subtype_dropdown img").addClass('caret01'); 
      }   
  });
  // change btn dropdown
  $scope.changeBtnLink=function(c){
   $( ".btnLink_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
    //  $(".subtitle").show();
    if(c==''){
      $scope.btnLinkTitle=c;
      $(".subtitle").text('Select Title'); 
    }else{
      $scope.btnLinkTitle=c;
    } 
  };
  $(document).on('click','.btnLink_dropdown .primary_nav_wrap ul li',function(){
      $(".btnLink_dropdown img").removeClass();
      $(".btnLink_dropdown img").addClass('caret02'); 
      $( ".btnLink_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".btnLink_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length ){
           $( ".btnLink_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".btnLink_dropdown img").removeClass();
         $(".btnLink_dropdown img").addClass('caret01'); 
      }   
  });
  // change date where c is date
  $scope.changeDate=function(c){
   $(".date_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
    $(".datetitle").show();
    if(c==''){
      $scope.datetitle=c;
      $(".datetitle").text('Select Day'); 
    }else{
      $scope.getTimeSlot(c);
      $scope.datetitle=c;
      $(".datetitle").text($scope.days[c].day_name); 
      $scope.subtitle='';
      $(".subtitle").text('Select Time Slot'); 
    } 
  };
  $(document).on('click','.date_dropdown .primary_nav_wrap ul li',function(){
      $(".date_dropdown img").removeClass();
      $(".date_dropdown img").addClass('caret02'); 
      $( ".date_dropdown .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".date_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".datetitle").css('display')!='none'){
           $( ".date_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".date_dropdown img").removeClass();
         $(".date_dropdown img").addClass('caret01'); 
        }   
  });
  // validate adspace form and scroll to error
  $scope.errorscroll = function(){
    $scope.createForm.adPic.$setValidity('minsizeval',true);
    $scope.createForm.adPic.$setValidity('minDimension',true);
    $scope.createForm.adPic.$setValidity('ratioval',true);
    if($scope.title != undefined && $scope.title != '' && $scope.title != null && !$scope.imageSrc){
      $timeout(function(){
        APPService.scrollJquery('errorimg');
      },100);
    }
    // else if($scope.title != undefined && $scope.title != '' && $scope.title != null && $scope.weburl != undefined && $scope.weburl != '' && $scope.weburl != null && $scope.imageSrc && $scope.SelDate == ''){
    //   $timeout(function(){
    //     APPService.scrollJquery('dateError_id');
    //   },100);
    // }
  };
  // setting croped img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='adPic'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // reset when crop is cancel
  $scope.resetCropImg =function(){
    if($scope.cropType=='adPic'){
       $scope.imageSrc="";
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // img upload
  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('logo image change');
      angular.forEach($scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.createForm.adPic.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc="";
          }else{
            $scope.createForm.adPic.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.createForm.adPic.$setValidity('minDimension',true);
                 if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='adPic';
                  $('.image-editor').cropit({
                    imageBackground: true,
                    imageBackgroundBorderWidth: 20,
                    imageState: {
                      src: result,
                    },
                  });
                  $('.image-editor').cropit('imageSrc', result);
                  $('.image-editor').cropit('previewSize', {width:250,height:250});
                  $('.image-editor').cropit('exportZoom', 4.096);
                  $('#crop-image').modal('show');
                }
              }else{
                $scope.createForm.adPic.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
           
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.adPic.getFiles($scope.adPic.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
  });
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ShowCase Controller
app.controller('CollaboratorShowCaseController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$rootScope){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="ShowCase";
  //fetch event data from local
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null){
       window.location = "/collaborator-dashboard";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.is_time_format_24 = localStorage.getItem('is_time_format_24');
    document.title='YARA - '+$scope.currentval.short_name+' - ShowCase';
    $scope.selectedPermission=angular.fromJson(localStorage.getItem('selectedPermission'));
    $scope.exhbitorMange=false;
    $scope.sponserMange=false;
    for (var i = $scope.selectedPermission.length - 1; i >= 0; i--) {
        if($scope.selectedPermission[i].name=="Exhibitors"){
          $scope.exhbitorMange=true;
        }
        if($scope.selectedPermission[i].name=="Sponsors"){
          $scope.sponserMange=true;
        }
    };
  }
  $scope.setOffset = function(d,offset){return GetDataService.userOffsetTime(d,offset); };
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}    
  // switch view option,val means selected option
  $scope.SwtichTab = function(val){
    $scope.current=val;
    $scope.search='';
    if(val=='All'){
      $scope.getSponsor();
      $scope.getExhibitor();
    }else if(val=='sponsor'){
      $scope.getSponsor();
    }else{
      $scope.getExhibitor();
    } 
    $anchorScroll();
  }
  $scope.service=APPService;
  //set user before showing actives
  // r -role
  //u - userdata
  $scope.userActivites=function(spoExhibitorAct){
    $scope.listActivites=spoExhibitorAct;
    $("#showcase-Activity").modal('show');
    // $scope.currUser=u;
  };
  //fetching activites
  // $scope.Activites =function(){
  //    GetDataService.getShowCaseActivity($scope.currentval.event_code).then(function(res1){
  //         if(res1.result==1){
  //           $scope.listActivites=res1.showcase_activities;
  //         }
  //       });
  //  };
  //  $scope.Activites();
   //before revoking show case user
   //uname - username of revoke user
   //permission - permission enable or disable
   //type - sponosr or exhibitor
  $scope.ShowCase_revoke =  function(uname,type, status){
    $scope.Runame=uname;
    $scope.Rtype=type;
    if (status) {
      $scope.Rpermission="revoke";
    }else{
      $scope.Rpermission="enable";
    }
    console.log($scope.Runame,$scope.Rpermission,$scope.Rtype)
    $scope.ShowCase_Permission($scope.Runame,$scope.Rpermission,$scope.Rtype);
  };
  // revoke user
  // $scope.revokeShowCase =  function(){
  //    $scope.ShowCase_Permission($scope.Runame,$scope.Rpermission,$scope.Rtype);
  // };
  // api to set permission for showcase user
  $scope.ShowCase_Permission = function(uname,permission,type){
    var showcase_type = 2;
    if(type=='sp'){
        showcase_type=1;
    }
    if(permission=='enable'){
          $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'enable',
                     showcase_type:showcase_type,
                     showcase:true
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                if(type=='sp'){
                  $scope.getSponsor();
                }else{
                  $scope.getExhibitor();
                }
             }
          });
    }else if(permission == 'revoke'){
        $http({method:'POST',
                 url:YaraBaseUrl.url+'/showcase_permission/',
                 data:{
                     event_code:$scope.currentval.event_code,
                     showcase_code:uname,
                     opp:'revoke',
                     showcase_type:showcase_type,
                     showcase:true
                 }
          }).then(function success(response){
             $scope.ddata=response.data;
             if($scope.ddata.result==1){
                $('#showcase-delete').modal('hide');
                if(type=='sp'){
                  $scope.getSponsor();
                }else{
                  $scope.getExhibitor();
                }
             }
            // $('#showcase-delete').modal('hide');
          });
    }

  }
  //fetching sponsor
  $scope.getSponsor = function(){
      $('#loading').show();
      GetDataService.getSponsors($scope.currentval.event_code).then(function(res){
        if(res.result==1){
           $scope.SPdata=res.data;
           $('#loading').hide();
           $('#container').fadeIn();
         }
      });
  };
  //fetching exhibitor
  $scope.getExhibitor = function(){
      $('#loading').show();
      GetDataService.getExhibitors($scope.currentval.event_code).then(function(res){
          if(res.result==1){
            $scope.EXdata=res.data;
             $('#loading').hide();
             $('#container').fadeIn();
          }
      });
  };
  $scope.getSponsor();  
  $scope.getExhibitor();
  // resend mail
  // $scope.resendMail = function(email,showcase_code,showcase_type){
  //   $scope.resendemail=email;
  //   $scope.showcasecode=showcase_code;
  //   $scope.showcasetype=showcase_type;
  // };
  $scope.resend=function (email,showcase_code,showcase_type) {
    $scope.resendemail=email;
    $scope.showcasecode=showcase_code;
    $scope.showcasetype=showcase_type;
    $('#loading').show();
     $http({method:'POST',
           url:YaraBaseUrl.url+'/showcase_resend_invitation/',
           data:{
               event_code:$scope.currentval.event_code,
               showcase_code:$scope.showcasecode,
               email:$scope.resendemail,
               showcase_type:$scope.showcasetype
           }
    }).then(function success(response){
       $scope.data=response.data;
       if($scope.data.result==1){
          console.log("send mail");
          $("#showcase-mail").modal('show');
          $('#loading').hide();
       }
       else if($scope.data.result==0){
          console.log("error");
          $scope.errormsg=true;
          $scope.showerror=response.data.message;
          $('#loading').hide();
       }
    });
  }
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// ------------------------------------end Collabrator dashboard----------------------------
//storeaccess controller start
app.controller('StoreAccessCtrl',['$scope','GetDataService','$rootScope',function($scope,GetDataService,$rootScope){
    if (GetDataService.getPrivilege(2)=="Admin") {
     $scope.admincheck=true;
    }
    else{
     $scope.admincheck=false;
    }
    // not connected to internet
    if($rootScope.online == false){
    alert("You are not connected to internet");
    }
}]);
// storage acces controller end
//happy help dashboard control start
app.controller('HappyhelpDashboardCtrl',['$scope','fileReader','$timeout','$location','$filter','GetDataService','$http','YaraBaseUrl','APPService','$rootScope',function($scope,fileReader,$timeout,$location,$filter,GetDataService,$http,YaraBaseUrl,APPService,$rootScope){
  // get user
  $scope.getUser= function(){
      GetDataService.getCurrtUser().then(function(res){
        if (res.result==1) {
          $scope.currtuser=res.user_data;
          localStorage.setItem('selEventsData',JSON.stringify($scope.currtuser.user_type));
          if ($scope.currtuser.tz_offset==null) {
              window.location="/settings";
          }
        }else{
        }        
      });
    };
  $scope.getUser();
  //logout user
  $scope.Logout = function(){
    GetDataService.Signout().then(function(res){
      if(res.result==1){
        localStorage.clear();
        window.location="/sign-in";
      }
    });
  };
}]);
app.controller('InfoController',['$scope','YaraBaseUrl','$http','$location','GetDataService','$rootScope','$timeout',function($scope,YaraBaseUrl,$http,$location,GetDataService,$rootScope,$timeout){

  $scope.errorInfo=angular.fromJson(localStorage.getItem('infoPageErrors')); 
  $scope.gotoPrevpage = function(){
    console.log(document.referrer);
    window.location = document.referrer;
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]); 
app.controller('PaymentSuccessController',['$scope','YaraBaseUrl','$http','$location','GetDataService','$rootScope','$timeout',function($scope,YaraBaseUrl,$http,$location,GetDataService,$rootScope,$timeout){
  
  $scope.continueDashboard = function(){
      var paymentInfo= angular.fromJson(localStorage.getItem("paymentInfo"));
      if(paymentInfo.redirect_to=='top_up'){
            GetDataService.getEvent(paymentInfo.event_code).then(function(res){
                if(res.result==1){
                    console.log(res);
                    var eventsdata=res.events;
                    var currentval=eventsdata[0];
                    console.log(currentval);
                    localStorage.setItem('selEventsData',angular.toJson(currentval));
                    localStorage.setItem('selectedEventId',paymentInfo.event_code);
                    window.location="/event/people";
                }
            });
      }
      else if(paymentInfo.redirect_to=='ad'){
            GetDataService.getEvent(paymentInfo.event_code).then(function(res){
                if(res.result==1){
                    console.log(res);
                    var eventsdata=res.events;
                    var currentval=eventsdata[0];
                    console.log(currentval);
                    localStorage.setItem('selEventsData',angular.toJson(currentval));
                    localStorage.setItem('selectedEventId',paymentInfo.event_code);
                    localStorage.setItem('dcode',paymentInfo.day_id);
                    window.location="/event/adspace";
                }
            });
      }
      else{
            window.location="/packages";
      }
  };
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]); 