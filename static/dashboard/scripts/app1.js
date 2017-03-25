//some controller are separated from app.js due to date and time picker
//'mdPickers' is used for date Picker - https://github.com/alenaksu/mdPickers
// 'ngMaterialDatePicker' is used for time picker - http://logbon72.github.io/angular-material-datetimepicker/ 
// drag and drop - directives -https://parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
// 'use strict'; 
var app=angular.module('yara',['vcRecaptcha','ngRoute','Image-Upload','YaraService','YaraDirective','Credentails','ngMaterial','ngAnimate','ngAria','ngMaterialDatePicker','mdPickers','ngDroplet','ngLocalize','ngMap']);
//Locale data config - https://github.com/doshprompt/angular-localization
app.value('localeConf', {
    basePath: '/static/dashboard/languages',
    fileExtension: '.lang.json',
});
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
              console.log("1");
            window.location="/session-timeout";
          }
          else if(response.data!= null && response.data.result!= undefined && (response.data.result==14 )){
            localStorage.clear();
            sessionStorage.clear();
            sessionStorage.setItem('authSession',response.data.message);
            console.log(response);
            window.location="/app-account-signin";
          }
          else if(response.data!= null && response.data.result!= undefined ){
            resultRedirection(response);
          }
          return response;
        },
        'responseError': function(rejection) {
          // do something on error
          if(rejection.data!= null  &&rejection.data.result!= undefined && rejection.data.result==4){
             localStorage.clear();
              sessionStorage.clear();
              resultRedirection(rejection);
            // window.location="/session-timeout";
          }else if(rejection.data!= null && rejection.data.result!= undefined && (rejection.data.result==6 || rejection.data.result==7 || rejection.data.result==8 )){
            localStorage.clear();
             sessionStorage.clear();
             sessionStorage.setItem('authSession',rejection.data.message);
             resultRedirection(rejection);

            // window.location="/session-timeout";
          }
          return $q.reject(rejection);
        }
      };
    });
  });

 app.run(['$window','$anchorScroll','$rootScope',function($window,$anchorScroll,$rootScope) {
  // scroll to top when page is loaded
    $('html, body').animate({
        scrollTop: 0
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
    // $(document).ready(function(){
    // $('body').append("<div id=\"ads\" class=\"adsbygoogle facebook promote\"></div>");
    // if($('#ads').css('display')=='none'){
      // window.location="/content-blockers"
      // window.location.href = "content-blockers";
      
      
      //alert('Ad blocker is Enabled');
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
       var i;
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
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

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
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
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
if(browserName!="Firefox" && browserName!="Safari" && browserName!="Chrome" && browserName!="Opera" ){
  window.location="/error";
}else{
  if(browserName=="Firefox" && Number(majorVersion)<40){
    window.location="/error";
  }else if(browserName=="Safari" && Number(majorVersion)<9){
    window.location="/error";
  }else if(browserName=="Chrome" && Number(majorVersion)<45){
    window.location="/error";
  }else if(browserName=="Opera" && Number(majorVersion)<35){
    window.location="/error";
  }
}
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

$rootScope.online=navigator.onLine;

/*document.write(''
 +'Browser name  = '+browserName+'<br>'
 +'Full version  = '+fullVersion+'<br>'
 +'Major version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
)*/
}]);
//controller for event details
app.controller('CreateNewEventController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,$rootScope){
  // check EP_code in localstorage ,to create event code is need 
  if(localStorage.getItem('epData')!= undefined && localStorage.getItem('epData')!= ''){
    $scope.EPdata=localStorage.getItem('epData');
    $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
  }
  else{
    window.location.replace("/packages");
  }
  $anchorScroll();
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
    $scope.timeformaType = "HH:mm";
  }else{
    $scope.is_time_format_24=false;
    $scope.timeformaType = "hh:mm A";
  }
  var redirection = angular.fromJson(localStorage.getItem("redirectionInfo"));
  $scope.timeZone = angular.fromJson(localStorage.getItem("timeZone"));
  $scope.eventPrivate =localStorage.getItem('isEventPrvt');
  $scope.eventdays='';
  $scope.setOffset = function(d,offset){ return GetDataService.userOffsetTime(d,offset); };
  function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
  //suggest short name based on event name 
  $scope.suggestShrtName=function(){
    $scope.eventshrtname="";
    if($scope.eventname != '' && $scope.eventname != undefined){
        var n = $scope.eventname;
        var arr = n.split(' ');
        var str = [];
        var shrtname='';
        for(var i=0; i<arr.length ;i++ ){
          if(isNumber(arr[i])){
            str.push(arr[i]);
          }else if(/^[a-zA-Z0-9- ]*$/.test(arr[i].charAt(0))){
            str.push(arr[i].charAt(0));
          }
        }
        var len =str.length > 4 ? 4 : str.length;
        for(var i=0;i<len;i++){
          if(!isNumber(str[i])){
            shrtname+=str[i];
          }
        }
        var x='';
        var pos='';
        var pos1='';
        for(var i=0;i<str.length;i++){
          if(isNumber(str[i])){
            if(str[i].length == 4){
              pos=i;
            }else{
              pos1=i;
            }
          }
        }
        if(pos != ''){
          x+=" '"+str[pos].charAt(2)+str[pos].charAt(3);
        }else if(pos1!= '' && str[pos1].length>3){
          x+="-"+str[pos1].substring(0,3);
        }else if(pos1!=''){
          x+="-"+str[pos1];
        }
        if(arr.length==1){
          shrtname=arr[0];
        };
        if(shrtname.length>8){
          shrtname=shrtname.substring(0, 8);
        };
        $scope.eventshrtname=(shrtname.toUpperCase() + x);
    }
  };
  $scope.dates=[];
  $scope.dst =[];
  $scope.minDuration =[];
  var d= new Date( $scope.setOffset($scope.timeZone.localTime,0));
  // d.setDate(d.getDate()+1);
  d.setDate(d.getDate());
  // index db start
    if(redirection!=null && redirection.eventDetails && !redirection.editeventDetails && !redirection.eventInfo){
      window.location="/dashboard";
    }
    else if(redirection!=null && redirection.eventDetails && redirection.editeventDetails){
          $scope.eventEdit=true;
          $scope.td=$scope;
          $scope.s=APPService;
          $scope.td.datetime={};
          $scope.td.starttime={};
          $scope.td.endtime={};
          $scope.td.maxtime={};
          $scope.td.mintime={};
          $scope.eventInformation = [];
          $scope.keyVal = [];
          var countUp = function()
          {
                  $scope.timeInMs+= 500;
                  $timeout(countUp, 500);  
          }
          $timeout(countUp, 500);
          var request = window.indexedDB.open("yaraDB9.db",1);
          request.onsuccess = function(event){
            $scope.db=event.target.result;
            $scope.getAllinfo();
          };
          request.onerror = function(event){
                console.log("error");
          };
          request.onupgradeneeded = function(event){
           $scope.db=event.target.result;
           $scope.db.createObjectStore("locInfo", {keyPath: "itemId"});
          };
    }
    else{
          $timeout(function(){
            $('#eventname').focus();
          },500);
          $scope.eventEdit=false;
          $scope.currtdate=d;
          $scope.td=$scope;
          $scope.s=APPService;
          $scope.td.datetime={};
          $scope.td.starttime={};
          $scope.td.endtime={};
          $scope.td.maxtime={};
          $scope.td.mintime={};
          $scope.td.addingDay = {};
          $scope.td.eventstartdate=$filter('date')($scope.currtdate,'MMMM dd yyyy');
          $scope.dates.push($filter('date')($scope.currtdate,'yyyy-MM-dd'));
    }
    $scope.getAllinfo=function(){
        var transaction =$scope.db.transaction(["locInfo"],"readonly");
        var objectStore = transaction.objectStore("locInfo");
        var request = objectStore.openCursor();
        request.onsuccess = function(event){
          var cursor = event.target.result;
          if(cursor) {
            $scope.eventInformation.push(cursor.value);
            cursor.continue();
          } else {
                // console.log("no more results");
          }
        };
        transaction.oncomplete = function (event){
          $scope.eventLoc = $scope.eventInformation[0].evntdetails;
          $scope.displayInfo();
        };
    };
    $scope.displayInfo = function(){
      $scope.td=$scope;
      $scope.s=APPService;
      $scope.td.datetime={};
      $scope.td.starttime={};
      $scope.td.endtime={};
      $scope.td.maxtime={};
      $scope.td.mintime={};
      $scope.uploadCoverimg = false;
      $scope.uploadEventLogo = false;
      $scope.dst =[];
      var lat = localStorage.getItem("lat");
      var lng = localStorage.getItem("lng");
      angular.forEach($scope.eventLoc.dates,function  (value,key) {
          var evdate = $filter('date')(value,'yyyy-MM-dd');
          var timestamp = Math.round(new Date(evdate).getTime()/1000.0);
                
                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";
                $.getJSON(url, function (data){
                    $scope.dst[evdate] = data.dstOffset;
                });
       });
      $scope.currtdate= $scope.eventLoc.dates[0];
      $scope.evntDate = $scope.eventLoc.evntDate
      $scope.eventstartdate=$filter('date')($scope.currtdate,'MMMM dd yyyy');
      $scope.eventname = $scope.eventLoc.eventname;
      $scope.eventshrtname = $scope.eventLoc.eventshrtname;
      $scope.eventdesc = $scope.eventLoc.eventdesc;
      $scope.phDailCode = $scope.eventLoc.contact.dialcode;
      $scope.Teventph = $scope.eventLoc.contact.phone_no;
      $scope.TeventEmail = $scope.eventLoc.contact.eventemail;
      $scope.eventph=$scope.eventLoc.contact.phone_no;
      $scope.eventweb=$scope.eventLoc.contact.eventweb;
      $scope.eventfb=$scope.eventLoc.contact.eventfb;
      $scope.eventtwitter=$scope.eventLoc.contact.eventtwitter;
      $scope.eventemail=$scope.eventLoc.contact.eventemail;
      $scope.editimageSrc1 = $scope.eventLoc.coverimg;
      $scope.editimageSrc = $scope.eventLoc.event_logo;
      if($scope.editimageSrc1==''){
        $scope.uploadCoverimg = true;
      }
      $scope.td.starttime =  $scope.eventLoc.strattimes;
      $scope.td.endtime =  $scope.eventLoc.endtimes;
      $scope.dates=$scope.eventLoc.dates;
      window.setTimeout( function() {
          $("#create-event-details").height( $("textarea")[1].scrollHeight );
      }, 500);
      var socialTypes = ['company-website','twitter','facebook','phone','message'];
      $scope.validatetime();
      angular.forEach(socialTypes,function  (value,key) {
          $scope.social_type = value;
          $scope.checkSocials();
      });
    };
  //  end index db 
  $scope.getMinDate =function(date){
    date=new Date(date);
    if($filter('date')(new Date(),'yyyy-MM-dd')==$filter('date')(date,'yyyy-MM-dd'))
      date=new Date();
    return date;
  };
  $scope.td.datetime[$filter('date')($scope.currtdate,'yyyy-MM-dd')]=$scope.getMinDate($filter('date')($scope.currtdate,'yyyy-MM-dd')); 
  $scope.$watch('td.starttime',function(newval,oldval){
      angular.forEach(newval,function(d,key){
        if(oldval[key]!=undefined){
          if(d!=oldval[key]){
            if(d>$scope.td.endtime[key]){
                $scope.td.endtime[key]=d;
            }
          }
        }
      });
  },true);
  //when event start date is changed it reset dates, start_time and end_time
  $scope.$watch('td.eventstartdate',function(newval,old){
    // while adding new event details
    if(newval!=undefined && $scope.eventEdit==false){
      $scope.dates=[];
      newval = new Date(newval);
      var dd=$filter('date')(newval,'yyyy-MM-dd');                      
      $scope.dates.push(dd);
      var dt=new Date(dd);
      dt.setHours(10);
      dt.setMinutes(0);
      var dt1=new Date(dd);
      dt1.setHours(16);
      dt1.setMinutes(0);
      $scope.td.starttime[dd]=dt;
      $scope.td.endtime[dd]=dt1;
      $scope.td.maxtime[dd]=false;
      $scope.td.mintime[dd]=false;
      $scope.td.datetime[dd]=$scope.getMinDate(dd); 
      var timestamp = Math.round(new Date(dt).getTime()/1000.0);
      var lat = localStorage.getItem("lat");
      var lng = localStorage.getItem("lng");
      var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";
      $.getJSON(url, function (data){
               $scope.dst[dd] = data.dstOffset;
      });
    }
    if($scope.eventEdit==true && newval!=undefined && old!=undefined){
          $scope.dates=[];
          newval = new Date(newval);
          var dd=$filter('date')(newval,'yyyy-MM-dd');                      
          $scope.dates.push(dd);
          var dt=new Date(dd);
          dt.setHours(10);
          dt.setMinutes(0);
          var dt1=new Date(dd);
          dt1.setHours(16);
          dt1.setMinutes(0);
          $scope.td.starttime[dd]=dt;
          $scope.td.endtime[dd]=dt1;
          $scope.td.maxtime[dd]=false;
          $scope.td.mintime[dd]=false;
          $scope.td.datetime[dd]=$scope.getMinDate(dd); 
          var timestamp = Math.round(new Date(dt).getTime()/1000.0);
          var lat = localStorage.getItem("lat");
          var lng = localStorage.getItem("lng");
          var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";
          $.getJSON(url, function (data){
              $scope.dst[dd] = data.dstOffset;
          });
    }
  },true);
  // when editing event details
  $scope.editStartdate = function(newval){
    if($scope.eventEdit==true){
          $scope.dates=[];
          newval = new Date(newval);
          var dd=$filter('date')(newval,'yyyy-MM-dd');  
          var timestamp = Math.round(new Date(dd).getTime()/1000.0);
          var lat = localStorage.getItem("lat");
          var lng = localStorage.getItem("lng");
          var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";
          $.getJSON(url, function (data){
                   $scope.dst[dd] = data.dstOffset;
          });                    
          $scope.dates.push(dd);
          var dt=new Date(dd);
          dt.setHours(10);
          dt.setMinutes(0);
          var dt1=new Date(dd);
          dt1.setHours(16);
          dt1.setMinutes(0);
          $scope.td.starttime[dd]=dt;
          $scope.td.endtime[dd]=dt1;
          $scope.td.maxtime[dd]=false;
          $scope.td.mintime[dd]=false;
          $scope.td.datetime[dd]=$scope.getMinDate(dd); 
    }
  };
  $scope.datepop=true;
  //shows date picker
  $scope.showDatePicker = function(ev){
      $scope.datepop=false;
      $mdpDatePicker(ev, new Date($scope.eventstartdate),$scope.currtdate).then(function(selectedDate) {
        $scope.eventstartdate = $filter('date')(selectedDate,'MMMM dd yyyy');
        $scope.datepop=true;
      });
  };
  $scope.checkEventminDuration=function(){
    $scope.eventDurationMin=false;
    angular.forEach($scope.dates,function(d,key){
      $scope.minDuration[$scope.dates[key]]=false;
      if(($scope.td.endtime[$scope.dates[key]].getHours()-$scope.td.starttime[$scope.dates[key]].getHours())<2){
          $scope.minDuration[$scope.dates[key]]=true;
          $scope.eventDurationMin=true;
      }
      else if(($scope.td.endtime[$scope.dates[key]].getHours()-$scope.td.starttime[$scope.dates[key]].getHours())==2){
        if(Math.abs(($scope.td.endtime[$scope.dates[key]].getMinutes())-($scope.td.starttime[$scope.dates[key]].getMinutes()))<0){
          $scope.minDuration[$scope.dates[key]]=true;
          $scope.eventDurationMin=true;
        }
      }
    });
    if($scope.eventDurationMin && $scope.submitted2==true){
       $timeout(function(){
          APPService.scrollJquery('dateScroll');
        },100);
    }
    return $scope.eventDurationMin;
  };
  $scope.timeInvalid= false;
  $scope.addingDay=false;
  //check validate current date and time, add day to event dates
  $scope.addDay = function(){
    // $("#loading").show();
    var len = $scope.dates.length;
    var validatingTime=$scope.validatetime();
    console.log(validatingTime+"--- length--"+len)
    if(validatingTime==true &&validatingTime!=undefined){
      $scope.timeInvalid= true;
      $scope.addingDay=false;
      // $("#loading").hide();
      // $('#container').fadeIn();
    }
    else if(validatingTime==false &&validatingTime!=undefined){
      $scope.timeInvalid= false;
      if(len>=0 && len < 20){
        var d=new Date($scope.dates[len-1]);
        d.setDate(d.getDate()+1);
        var e=new Date($scope.dates[len-1]);
        e.setDate(e.getDate()+1);
        var dd=$filter('date')(d,'yyyy-MM-dd');
        var timestamp = Math.round(new Date(d).getTime()/1000.0);
        $scope.dstCheck(dd,timestamp);
        // var lat = localStorage.getItem("lat");
        // var lng = localStorage.getItem("lng");
        // var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          
        // $.getJSON(url, function (data) {
        //     $scope.dst[dd] = data.dstOffset;
            var prv=($scope.dates[$scope.dates.length-1]);
            d.setHours($scope.td.starttime[prv].getHours());
            d.setMinutes($scope.td.starttime[prv].getMinutes());
            $scope.dates.push(dd);
            $scope.td.starttime[dd]=d;
            e.setHours($scope.td.endtime[prv].getHours());
            e.setMinutes($scope.td.endtime[prv].getMinutes());
            $scope.td.endtime[dd]=e;
            $scope.td.datetime[dd]=$scope.getMinDate(dd); 
            $scope.addingDay=false;
            console.log("inside---"+validatingTime+"--- length--"+len)
            // $("#loading").hide();
            // $('#container').fadeIn();
            // $("#loadingDate").hide();
        // });  
      }
    }
  };
  $scope.dstCheck=function(dd,timestamp){
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          
        $.getJSON(url, function (data) {
            $scope.dst[dd] = data.dstOffset;
        });
  };
  //validate time picker
  $scope.validatetime= function(){
    if(redirection!=null && redirection.eventDetails && redirection.editeventDetails){
          return false;
    }
    else{
        if($scope.detailsform['evntstarttime'+$scope.dates[0]].$untouched){
          return true;
        }
        if($scope.detailsform['evntendtime'+$scope.dates[0]].$untouched){
          return true;
        }
        return false;
    }
  };
  $scope.timeValiadtion = function(){
      if($scope.evntDate=='single'){
        if(($scope.td.endtime[$scope.dates[0]].getHours()-$scope.td.starttime[$scope.dates[0]].getHours())<2)
        {
           return true;
        }
        return false;
      }
      else{
            return false;
      }
  };
  //pop's last day from dates
  $scope.deleteDay = function(){
    var len = $scope.dates.length;
    if(len>0){
      $scope.dates.pop();
    }
    $("#loadingDate").hide();
  };
  //build json structure of days with start_time, end_time and day_name with date as key
  $scope.getevntdayjson=function(datelists){ 
    var eventdays = [] ;
    for(var i=0;i<datelists.length;i++){
              dateTime = moment($scope.td.endtime[datelists[i]]).format("YYYY-MM-DD HH:mm");
              var days = {
                day_name:'Day '+(i+1),
                start_time: moment($scope.td.starttime[datelists[i]]).format("YYYY-MM-DD HH:mm"),
                end_time: moment($scope.td.endtime[datelists[i]]).format("YYYY-MM-DD HH:mm")
              };
              eventdays.push(days);
    }
    return eventdays;           
  };
  $scope.getevntdays=function(datelists){
    var evntdays='{';
    for(var i=0;i<datelists.length;i++){
      if(i!=0)
       evntdays +=',';
      evntdays+='"'+datelists[i]+'":{ "starttime":"'+$scope.td.starttime[datelists[i]].getHours()+":"+$scope.td.starttime[datelists[i]].getMinutes()+'","endtime":"'+$scope.td.endtime[datelists[i]].getHours()+":"+$scope.td.endtime[datelists[i]].getMinutes()+'","day_name":"Day '+(i+1)+'"}';
    }
    evntdays+="}";
    return evntdays;
  };
  $scope.pad = function (d){
    return (d < 10) ? '0' + d.toString() : d.toString();
  };
  $scope.removeCoverimg = function() {
    $scope.uploadCoverimg = true;
  };
  // to validate event name and start date
  $scope.evnetDetailsValidation=function() {
    $('#loading').show();
    var start_date = new Date($scope.eventstartdate);
    var dd=start_date.getDate();
    var mm=start_date.getMonth()+1;
    var yy=start_date.getFullYear();
    var newdate=yy+"-"+mm+"-"+dd;
    $scope.eventdays= $scope.getevntdayjson($scope.dates);
    var fd = new FormData();
    fd.append('name',$scope.eventname);
    fd.append('description',$scope.eventdesc);
    fd.append('start_date',$scope.eventdays[0].start_time);
    fd.append('c_code',$scope.phDailCode);
    fd.append('phone_no',$scope.eventph);
    fd.append('event_days',$scope.dates);
    fd.append('short_name',$scope.eventshrtname);
    fd.append('email',$scope.eventemail);
    fd.append('end_date',$scope.eventdays[$scope.eventdays.length-1].end_time);
    fd.append('timezone',$scope.timeZone.timezone);
    if($scope.eventEdit){
            // event logo updation
            if($scope.uploadEventLogo){
                if($scope.imgSrc){
                      fd.append('event_logo',GetDataService.dataURItoBlob($scope.imgSrc));
                  }
            }
            else
            {
                fd.append('event_logo',GetDataService.dataURItoBlob($scope.eventLoc.event_logo));
            }
            // event cover page updation 
            if($scope.uploadCoverimg && !$scope.imgSrc1){
                    fd.append('c_img','');
            }
            if(!$scope.uploadCoverimg){
                   fd.append('c_img',GetDataService.dataURItoBlob($scope.eventLoc.coverimg));
            }
            else if($scope.imgSrc1)
            {
                   fd.append('c_img',GetDataService.dataURItoBlob($scope.imgSrc1));
            }
    }
    else{
          if($scope.imageSrc)
          {
                  fd.append('event_logo',GetDataService.dataURItoBlob($scope.imageSrc));
          }
          if($scope.imageSrc1== undefined){
                 fd.append('c_img','');
          }
          else{
                 fd.append('c_img',GetDataService.dataURItoBlob($scope.imageSrc1));
            }
    }
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/event/validate/',
      data:fd,
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function success(response){
      if(response.data.result==1 ){
        // $scope.tabSelection(3);
        $scope.saveEventdetails();
      }else if(response.data.result==0){
        $scope.errormsg=true;
        $scope.showerror=response.data.message;
        $('#loading').hide();
        $('#container').fadeIn();
      }
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
  };
  // saving  all the details
  $scope.saveEventdetails = function(){
      var eventLogo;
      var coverImage;
      if($scope.eventEdit){
          // event logo updation
          if($scope.uploadEventLogo){
              if($scope.imgSrc){
                  eventLogo = $scope.imgSrc;
                }
          }
          else{
              eventLogo = $scope.eventLoc.event_logo;
          }
          // event cover page updation 
          if($scope.uploadCoverimg && !$scope.imgSrc1){
              coverImage = '';
          }
          if(!$scope.uploadCoverimg){
                coverImage = $scope.eventLoc.coverimg;
          }
          else if($scope.imgSrc1){
                coverImage = $scope.imgSrc1;
          }
      }
      else{
            if($scope.imageSrc){
                eventLogo = $scope.imageSrc;
            }
            if(!$scope.imageSrc1){
                  coverImage = '';
            }
            else{
                  coverImage = $scope.imageSrc1;
            }
      }
      $scope.eventdays= $scope.getevntdayjson($scope.dates);
      $scope.eventtimes= $scope.getevntdays($scope.dates);
      $scope.eventenddate=$scope.dates[$scope.dates.length-1];
      var contact = {
        "dialcode":$scope.phDailCode,
        "phone_no":$scope.eventph,
        "phone_number":$scope.phDailCode +' '+ $scope.eventph,
        "eventweb":$scope.eventweb,
        "eventfb":$scope.eventfb,
        "eventtwitter":$scope.eventtwitter,
        "eventemail":$scope.eventemail
      };
      var creatingEventdetails = {
        "eventname":$scope.eventname,
        "eventshrtname":$scope.eventshrtname,
        "eventdesc":$scope.eventdesc,
        "evntDate":$scope.evntDate,
        "eventstartdate":$scope.eventdays[0].start_time,
        "eventenddate":$scope.eventdays[$scope.eventdays.length-1].end_time,
        "event_logo":eventLogo,
        "coverimg":coverImage,
        "eventdays":$scope.eventdays,
        "contact":contact,
        "dates":$scope.dates,
        "eventtime":$scope.eventtimes,
        "strattimes":$scope.td.starttime,
        "endtimes":$scope.td.endtime,
      }
      // indexdb start
      var db;
      var request = window.indexedDB.open("yaraDB9.db",1);
      request.onsuccess = function(event){
        db=event.target.result;
        addlocInfo(creatingEventdetails);
        getAllinfo();
      };
      request.onerror = function(event){
            console.log("error");
      };
      request.onupgradeneeded = function(event){
        db=event.target.result;
        db.createObjectStore("locInfo", {keyPath: "itemId"});
      };
      function getAllinfo(){
          var transaction = db.transaction(["locInfo"],"readonly");
          var objectStore = transaction.objectStore("locInfo");
          var request = objectStore.openCursor();
          request.onsuccess = function(event){
                  var cursor = event.target.result;
                  if(cursor) {
                    cursor.continue();
                  }else {
                        console.log("no more results");
                  }
          };
      };
      function addlocInfo(locInfo){
        var transaction = db.transaction(["locInfo"],"readwrite");
        var objectStore = transaction.objectStore("locInfo");
        var request = objectStore.put({itemId: "evntdetails", evntdetails:locInfo});
        request.onsuccess = function(event){
              redirection.eventDetails =true;
              redirection.editlocPlace = false;
              redirection.locmanualPlace  = false;
              redirection.editeventInfo = false;
              redirection.editeventDetails = false;
              localStorage.setItem('redirectionInfo',angular.toJson(redirection));
              window.location = "/create-event-confirm";
        };
      };
      // indexdb end
  };
  $scope.Teventph="";
  $scope.TeventEmail="";
  $scope.Teventweb="";
  $scope.Teventfb="";
  $scope.Teventtwitter="";
  $scope.eventph="";
  $scope.eventweb="";
  $scope.eventfb="";
  $scope.eventtwitter="";
  $scope.eventemail="";  
  //validate socails link and switching img urls for active and none active
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
  };
  //called when socail link is saving;
  $scope.saveSocials =function(){
    $scope.eventph=$scope.Teventph;
    $scope.eventweb=$scope.Teventweb;
    $scope.eventfb=$scope.Teventfb;
    $scope.eventtwitter=$scope.Teventtwitter;
    $scope.eventemail=$scope.TeventEmail;
    $scope.checkSocials();
    $('#myModal-social').modal('hide');
    $('#myModal-social4').modal('hide');
  }; 
  $('#myModal-social').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
  });
  $('#myModal-social4').on('show.bs.modal', function (e) {
      $scope.typeofchange='';
  });
  function assignsocial(){
    $scope.Teventph=$scope.eventph;
    $scope.TeventEmail=$scope.eventemail;
    $scope.Teventweb=$scope.eventweb;
    $scope.Teventfb=$scope.eventfb;
    $scope.Teventtwitter=$scope.eventtwitter;
    $scope.$apply();
  }
  $('#myModal-social').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      assignsocial();
      $scope.checkSocials();
    }
  });
  $('#myModal-social4').on('hidden.bs.modal', function (e) {
    if($scope.typeofchange != 'save'){
      assignsocial();
      $scope.checkSocials();
    }
  });
  // foucs on social icons
  $scope.setFocus = function(type){
    if(type=='phone' && ($scope.phDailCode==null || $scope.phDailCode==undefined)){
        setTimeout(function (){
            $('#country_code').focus();
        }, 1000);
    }
    else
    {
      setTimeout(function (){
           $('#'+$scope.social_type+'_id').focus();
           var len= $('#'+$scope.social_type+'_id').val().length;
           if(len!=undefined && len>0){
                $('#'+$scope.social_type+'_id')[0].setSelectionRange(len, len);
           }
      }, 1000);
    }
  };
  //get country phone code from json
  $scope.getDialCode=function(){
    $http({method:'GET',
        url:'../dial_code_json' 
      }).then(function success(response){
        $scope.dailcode=response.data;
      });
  };
  $scope.phDailCode="";
  $scope.phDailCode="";
  $scope.phdialreq=true;
  $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };
  // $scope.getDialCode();
  // retreving phone info
  $scope.phoneInfo = function(){
      var phone =angular.fromJson(localStorage.getItem("phonInfo"));
      if(phone.phDailCode==undefined || phone.phDailCode==null){
      }
      else{
          $scope.phDailCode = phone.phDailCode;
      }
      $scope.phdialreq = phone.phdialreq;
  };
  //validate event step 2 and scroll to error
  $scope.errorScroll =function(){
    if(redirection!=null && redirection.eventDetails && redirection.editeventDetails){
            if($scope.uploadEventLogo){
                    if($scope.detailsform.evntlogoChange.$invalid){
                              $scope.detailsform.evntlogoChange.$setValidity('minsizeval',true);
                              $scope.detailsform.evntlogoChange.$setValidity('minDimension',true);
                              $scope.detailsform.evntlogoChange.$setValidity('ratioval',true);
                      }
                      if(!$scope.imageSrc){
                       $timeout(function(){
                          APPService.scrollJquery('evntlogoerredit');
                        },100);
                      }
                    //  $timeout(function(){
                    //   console.log("safdasdf");
                    //   if(!$scope.imgSrc){
                    //     APPService.scrollJquery('evntlogoerredit');
                    //   }
                    // },100);
            }
            $scope.detailsform['evntstarttime'+$scope.dates[0]].$untouched=false;
            $scope.detailsform['evntendtime'+$scope.dates[0]].$untouched = false;
      }
    else{  
          // $scope.detailsform.$valid==true &&
          if( $scope.eventname!=undefined && $scope.eventshrtname!=undefined && $scope.eventdesc!=undefined ){
            if($scope.imageSrc==undefined || $scope.imageSrc==''|| $scope.imageSrc==null){
             $timeout(function(){
                APPService.scrollJquery('evntlogoerr');
              },100);
            }
            else if($scope.detailsform.evntlogo.$invalid){
                $scope.detailsform.evntlogo.$setValidity('minsizeval',true);
                $scope.detailsform.evntlogo.$setValidity('minDimension',true);
                $scope.detailsform.evntlogo.$setValidity('ratioval',true);
                $scope.imageSrc1 = "";
                // $timeout(function(){
                //     APPService.scrollJquery('evntlogoerr');
                // },100);
            }

            else if($scope.detailsform['evntstarttime'+$scope.dates[0]].$untouched){
              $timeout(function(){
                  APPService.scrollJquery('evntstarttime'+$scope.dates[0]);
                },100);
            }
            else if($scope.detailsform['evntendtime'+$scope.dates[0]].$untouched){
              $timeout(function(){
                  APPService.scrollJquery('evntendtime'+$scope.dates[0]);
                },100);
            }
            else if($scope.TeventEmail=="" || $scope.TeventEmail==undefined){
                $timeout(function()
                {
                  APPService.scrollJquery('socialErremail');
                },100);
            }
            else if($scope.Teventph==""|| $scope.Teventph==undefined){
                $timeout(function(){
                  APPService.scrollJquery('socialErr');
                },100);
            }
           
          }
    }
  };
  $scope.invalidImage = function() {
    if($scope.eventEdit){
        if($scope.uploadEventLogo){
            if(!$scope.imgSrc){
                $timeout(function(){
                            APPService.scrollJquery('evntlogoerr');
                        },100);
                  return true;
              }
        }
        else if($scope.editimageSrc==''){
          return true;
        }
        else{
          return false;
        }
    }
    else{
          if($scope.imageSrc==undefined || $scope.imageSrc=='' || $scope.imageSrc==null){
              return true;
          }
          else{
            return false;
          }
    }
  };
  $scope.eventfb="https://www.facebook.com/";
  $scope.eventtwitter="https://twitter.com/";
  // setting crop image to blob and assign blob to upload img
  $scope.setCropImg =function(){
    var imageData = $('.image-editor').cropit('export');
    var blob = GetDataService.dataURItoBlob(imageData);
    if($scope.cropType=='evntlogo'){
      $scope.imageSrc = imageData;
      angular.forEach($scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1 = imageData;
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }
    else if($scope.cropType=='evntlogoChange'){
                  console.log("reach crop");

      $scope.imgSrc = imageData;
      angular.forEach($scope.evntlogoChange.getFiles($scope.evntlogoChange.FILE_TYPES.VALID),function(model,key){
             model.file=blob;
      });
    }
    else if($scope.cropType=='coverimgChange'){
      $scope.imgSrc1 = imageData;
      angular.forEach($scope.coverimgChange.getFiles($scope.coverimgChange.FILE_TYPES.VALID),function(model,key){
        model.file=blob;
      });
    }

    $('#crop-image').modal('hide');
    $('.image-editor').cropit('imageSrc', '');
  };
  // cancel crop image 
  $scope.resetCropImg =function(){
    if($scope.cropType=='evntlogo'){
      $scope.imageSrc = "";
      angular.forEach($scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID),function(model,key){
             model.setType(4);
      });
    }else if($scope.cropType=='coverimg'){
      $scope.imageSrc1 = "";
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    else if($scope.cropType=='evntlogoChange'){
      $scope.imgSrc = "";
      angular.forEach($scope.evntlogoChange.getFiles($scope.evntlogoChange.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    else if($scope.cropType=='coverimgChange'){
      $scope.imgSrc1 = "";
      angular.forEach($scope.coverimgChange.getFiles($scope.coverimgChange.FILE_TYPES.VALID),function(model,key){
        model.setType(4);
      });
    }
    $('.image-editor').cropit('imageSrc', '');
  };
  // image drop is ready and setting valid extension
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.evntlogo.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.coverimg.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.evntlogoChange.allowedExtensions(['png', 'jpg', 'jpeg']);
    $scope.coverimgChange.allowedExtensions(['png', 'jpg', 'jpeg']);
    // console.log("reach here");
  });
  // calling modal when invalid image is uploaded
  $scope.$on('$dropletInvalid', function whenDropletReady() {
    $('#myModal-invalid').modal('show');
  });
  // called when img is uploaded, validated and assigned for croping image
  $scope.$on('$dropletFileAdded',function (prov,arg){
    $scope.lodinghide=false;
    var len =$scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('logo image change');
      angular.forEach($scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.detailsform.evntlogo.$setValidity('minsizeval',false);
            // $scope.step4form.evntlogo.$setValidity('minsizeval',false);
            model.setType(4);
             $scope.imageSrc="";
          }else{
            $scope.detailsform.evntlogo.$setValidity('minsizeval',true);
            // $scope.step4form.evntlogo.$setValidity('minsizeval',true);

          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.detailsform.evntlogo.$setValidity('minDimension',true);
                // $scope.step4form.evntlogo.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                  $scope.imageSrc = result;
                }else{
                  $scope.cropType='evntlogo';
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
                  $scope.step2form.evntlogo.$setValidity('ratioval',true);
                  $scope.step4form.evntlogo.$setValidity('ratioval',true);
                   $scope.imageSrc = result;
                }else{
                  $scope.step2form.evntlogo.$setValidity('ratioval',false);
                  $scope.step4form.evntlogo.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }*/
              }else{
                $scope.detailsform.evntlogo.$setValidity('minDimension',false);
                // $scope.step4form.evntlogo.$setValidity('minDimension',false);
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
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('cover image change');
      angular.forEach($scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.detailsform.coverimg.$setValidity('minsizeval',false);
            // $scope.step4form.coverimg.$setValidity('minsizeval',false);
            $scope.imageSrc1="";
            model.setType(4);
          }else{
            $scope.detailsform.coverimg.$setValidity('minsizeval',true);
            // $scope.step4form.coverimg.$setValidity('minsizeval',true);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // console.log(width+'X'+height);
              if(width >= 1024 && height >= 1024 ){
                $scope.detailsform.coverimg.$setValidity('minDimension',true);
                // $scope.step4form.coverimg.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
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
                /*if(width == height){
                  $scope.step3form.coverimg.$setValidity('ratioval',true);
                  $scope.step4form.coverimg.$setValidity('ratioval',true);
                    $scope.imageSrc1 = result;
                }else{
                  $scope.step3form.coverimg.$setValidity('ratioval',false);
                  $scope.step4form.coverimg.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.detailsform.coverimg.$setValidity('minDimension',false);
                // $scope.step4form.coverimg.$setValidity('minDimension',false);
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
    len =$scope.evntlogoChange.getFiles($scope.evntlogoChange.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('cover image change');
      angular.forEach($scope.evntlogoChange.getFiles($scope.evntlogoChange.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.detailsform.evntlogoChange.$setValidity('minsizeval',false);
            // $scope.step4form.coverimg.$setValidity('minsizeval',false);
            $scope.imgSrc="";
            model.setType(4);
          }else{
            $scope.detailsform.evntlogoChange.$setValidity('minsizeval',true);
            // $scope.step4form.coverimg.$setValidity('minsizeval',true);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // console.log(width+'X'+height);
              if(width >= 1024 && height >= 1024 ){
                $scope.detailsform.evntlogoChange.$setValidity('minDimension',true);
                // $scope.step4form.coverimg.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                  $scope.imgSrc = result;
                }else{
                  $scope.cropType='evntlogoChange';
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
                  $scope.step3form.coverimg.$setValidity('ratioval',true);
                  $scope.step4form.coverimg.$setValidity('ratioval',true);
                    $scope.imageSrc1 = result;
                }else{
                  $scope.step3form.coverimg.$setValidity('ratioval',false);
                  $scope.step4form.coverimg.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.detailsform.evntlogoChange.$setValidity('minDimension',false);
                // $scope.step4form.coverimg.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imgSrc="";
              }
              $scope.$apply();
          });
          
        });
        }
        }
      });

    }
    len =$scope.coverimgChange.getFiles($scope.coverimgChange.FILE_TYPES.VALID).length;
    if(len>0 ){
      //console.log('cover image change');
      angular.forEach($scope.coverimgChange.getFiles($scope.coverimgChange.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.detailsform.coverimgChange.$setValidity('minsizeval',false);
            // $scope.step4form.coverimg.$setValidity('minsizeval',false);
            $scope.imgSrc1="";
            model.setType(4);
          }else{
            $scope.detailsform.coverimgChange.$setValidity('minsizeval',true);
            // $scope.step4form.coverimg.$setValidity('minsizeval',true);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
             // console.log(width+'X'+height);
              if(width >= 1024 && height >= 1024 ){
                $scope.detailsform.coverimgChange.$setValidity('minDimension',true);
                // $scope.step4form.coverimg.$setValidity('minDimension',true);
                if(width ==1024  && height == 1024 ){
                  $scope.imgSrc1 = result;
                }else{
                  $scope.cropType='coverimgChange';
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
                  $scope.step3form.coverimg.$setValidity('ratioval',true);
                  $scope.step4form.coverimg.$setValidity('ratioval',true);
                    $scope.imageSrc1 = result;
                }else{
                  $scope.step3form.coverimg.$setValidity('ratioval',false);
                  $scope.step4form.coverimg.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc1="";
                }*/
              }else{
                $scope.detailsform.coverimgChange.$setValidity('minDimension',false);
                // $scope.step4form.coverimg.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imgSrc1="";
              }
              $scope.$apply();
          });
          
        });
        }
        }
      });

    }

  });
  // called when img deleted
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
    len =$scope.coverimg.getFiles($scope.coverimg.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc1="";
    }
    len =$scope.evntlogoChange.getFiles($scope.evntlogoChange.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imgSrc="";
    }
    len =$scope.coverimgChange.getFiles($scope.coverimgChange.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imgSrc1="";
    }
  });
  // called when error while uplodaing img
  $scope.$on('$dropletError', function () {
   //console.log('something Went wrong');
  });
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
//End controller for event details
// Event info  selection controller
app.controller('EventInfoController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,$rootScope){
    // check EP_code in localstorage ,to create event code is need 
    if(localStorage.getItem('epData')!= undefined && localStorage.getItem('epData')!= ''){
      $scope.EPdata=localStorage.getItem('epData');
      $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
    }
    else{
      window.location.replace("/packages");
    }
    $('#loading').show();
    $anchorScroll();
    var redirection = angular.fromJson(localStorage.getItem("redirectionInfo"));
    $scope.latlan = function() {
        var param = {
            lat:localStorage.getItem('lat'),
            long:localStorage.getItem('lng')
        };
        GetDataService.eventLocalTz(param).then(function(res) {
          if (res.result==1) {
              localStorage.setItem('timeZone',JSON.stringify({timezone:res.timezone,localTime:res.local_time_now}));
              $scope.getEventTypes();
          }
        });
    }        
    $scope.latlan();
    $scope.selectedval=0;
    $scope.evntfreq='Annually';
    $scope.tabsel=1;
    $scope.eventdays='';
    $scope.isEventPrvt=false;
    $scope.s=APPService;
    $scope.datepop=true;
    $scope.subtypelist=[];
    $scope.getEventTypes = function(){
        GetDataService.getEventTypes().then(function(res) {
          if (res.result==1) {
              $scope.eventtypes = res.event_types;
              if(redirection!=null && redirection.eventInfo && !redirection.editeventInfo &&(!redirection.locPlace || !redirection.locManual))
              {
                  window.location="/dashboard";
              } 
              else if(redirection!=null && redirection.eventInfo && redirection.editeventInfo)
              {
                  $scope.eventInformation = [];
                  $scope.keyVal = [];
                    var countUp = function()
                     {
                            $scope.timeInMs+= 500;
                            $timeout(countUp, 500);  
                    }
                  $timeout(countUp, 500);
                  var request = window.indexedDB.open("yaraDB9.db",1);
                  request.onsuccess = function(event){
                    $scope.db=event.target.result;
                    $scope.getAllinfo();
                  };
                  request.onerror = function(event){
                        console.log("error");
                  };
                  request.onupgradeneeded = function(event){
                   $scope.db=event.target.result;
                   $scope.db.createObjectStore("locInfo", {keyPath: "itemId", autoIncrement: true});
                  };
              }
              $('#loading').hide();
              $('#container').fadeIn();
          }
        });
    };
    //select type of event and load sub types
    $scope.selectedtype= function(selectedtypeid){
      $(".subtitle").text('Select Type'); 
      $(".subtitlesearch").val('');
       $scope.subtitlesearch='';
      $scope.selectedval=selectedtypeid;
      for(var i=0; i< $scope.eventtypes.length ;i++){
        if(selectedtypeid==$scope.eventtypes[i].type_id){
          $scope.subtypelist=$scope.eventtypes[i].sub_type;
          $scope.subtitle='';
          break;
        }
      }
    }
    $scope.subtitle='';
    //when event sub type is selected
    $scope.changeSubtype=function(c){
     $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
     $(".subtitlesearch").hide();
        $(".subtitle").show();
      if(c==''){
        $scope.subtitle=c;
        $(".subtitle").text('Select Type'); 
        $(".subtitlesearch").val('');
       $scope.subtitlesearch='';
      }else{
        $scope.subtitle=c;
        $(".subtitle").text($scope.subtitle); 
        $(".subtitlesearch").val($scope.subtitle);
      } 
    };
    $(document).on('click','.country_dropdown .primary_nav_wrap ul li',function(){
        $(".menutitlesearch").show();
        $(".menutitle").hide();
        $(".menutitlesearch").focus();
        $(".country_dropdown img").removeClass();
        $(".country_dropdown img").addClass('caret02'); 
        $( ".country_dropdown .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
    });
    $(document).on('click','.subtype_dropdown .primary_nav_wrap ul li',function(){
        $(".subtitlesearch").show();
        $(".subtitle").hide();
        $(".subtitlesearch").focus();
        $(".subtype_dropdown img").removeClass();
        $(".subtype_dropdown img").addClass('caret02'); 
        $( ".subtype_dropdown .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
    });
    $(document).on('click','.state_dropdown .primary_nav_wrap ul li',function(){
      $(".menutitlestatesearch").show();
      $(".menutitlestate").hide();
      $(".menutitlestatesearch").focus();
      $(".state_dropdown img").removeClass();
      $(".state_dropdown img").addClass('caret02');
      $( ".state_dropdown  .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
    });
    $document.on('click',function(event){
          var $trigger = $(".country_dropdown .primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length && $(".menutitlesearch").css('display')!='none'){
             $( ".country_dropdown .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
            });
             $(".menutitlesearch").hide();
           $(".menutitle").show();
            // console.log($(".menutitlesearch").css('display')); 
           if($("#menutitle.menutitle").text()!="Select Country"){
             // $(".menutitlesearch").val('');
              $(".menutitlesearch").val($("#menutitle.menutitle").text());
              $scope.countrysearch=$("#menutitle.menutitle").text();
              $scope.countrydata=$filter('custom')($scope.countries,$scope.countrysearch);
             // console.log($scope.countrydata);
             $scope.$apply();
           }
          $(".menutitlesearch").trigger('input');
           $(".country_dropdown img").removeClass();
           $(".country_dropdown img").addClass('caret01'); 
          }
          var $trigger = $(".state_dropdown .primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length && $(".menutitlestatesearch").css('display')!='none' ){
             $( ".state_dropdown .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
            });
            $(".menutitlestatesearch").hide();
           $(".menutitlestate").show(); 
           // $(".menutitlestatesearch").val($(".menutitlestate").text());
           if($("#menutitlestate.menutitlestate").text()!="Select State/Province"){
              $(".menutitlestatesearch").val($("#menutitlestate.menutitlestate").text());
              $scope.statesearch=$("#menutitlestate.menutitlestate").text();
              $scope.statedata=$filter('custom')($scope.states,$scope.statesearch);
             //console.log($scope.countrydata);
             $scope.$apply();
           }
           $(".state_dropdown img").removeClass();
           $(".state_dropdown img").addClass('caret01'); 
          }
          var $trigger = $(".subtype_dropdown .primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
             $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
            });
            $(".subtitlesearch").hide();
           $(".subtitle").show();
            // console.log($(".menutitlesearch").css('display')); 
           if($("#subtitle.subtitle").text()!="Select Type"){
             // $(".menutitlesearch").val('');
              $(".subtitlesearch").val($("#subtitle.subtitle").text());
              $scope.subtitlesearch=$("#subtitle.subtitle").text();
              $scope.subtypedata=$filter('filter')($scope.subtypelist,$scope.subtitlesearch);
             //console.log($scope.countrydata);
             $scope.$apply();
           }
          $(".subtitlesearch").trigger('input');
           $(".subtype_dropdown img").removeClass();
           $(".subtype_dropdown img").addClass('caret01'); 
          }   
    });
    // saving the info page to local storage
    $scope.saveEventInfo = function(){
      var eventInfo = {
        "type_title":$scope.eventtypes[$scope.selectedval-1].type_title,
        "type_id":$scope.eventtypes[$scope.selectedval-1].type_id,
        "subtitle":$scope.subtitle,
        "isEventPrvt":$scope.isEventPrvt,
        "evntfreq":$scope.evntfreq,
        "selectedval":$scope.selectedval
      };
      var db;
      var request = window.indexedDB.open("yaraDB9.db",1);
      request.onsuccess = function(event){
        db=event.target.result;
        console.log("db created success");
        console.log(event);
        addlocInfo(eventInfo);
          getAllinfo();
      };
      request.onerror = function(event){
            console.log("error");
      };
      request.onupgradeneeded = function(event){
          console.log("new db");
        db=event.target.result;
        db.createObjectStore("locInfo", {keyPath: "itemId"});
      };
      function getAllinfo(){
          var transaction = db.transaction(["locInfo"],"readonly");
          var objectStore = transaction.objectStore("locInfo");
          var request = objectStore.openCursor();
          request.onsuccess = function(event){
                   var cursor = event.target.result;
                  if(cursor) {
                    console.log(cursor.value);
                    cursor.continue();
                  } else {
                                // console.log("no more results");
                  }
           };
      };
      function addlocInfo(eventInfo){
        var transaction = db.transaction(["locInfo"],"readwrite");
        var objectStore = transaction.objectStore("locInfo");
        var request = objectStore.put({itemId: "evntinfo", evntinfo:eventInfo});
        request.onsuccess = function(event){
          redirection.eventInfo =true;
          if(redirection!=null && redirection.eventInfo && redirection.editeventInfo){
                redirection.editeventDetails=true;
          }
          localStorage.setItem('isEventPrvt',$scope.isEventPrvt);
          localStorage.setItem('redirectionInfo',angular.toJson(redirection));
          window.location.href = "/create-event-details";
        };
      };     
    };
    // validate event step 1 and scroll to error
    $scope.errorScroll =function(){
      $timeout(function(){
          if($scope.selectedval==0 ){
            APPService.scrollJquery('selectedvalerr');
          }else if($scope.subtitle==''){
            APPService.scrollJquery('subtitleerr');
          }
      },100);
    };
    // index db start
    $scope.getAllinfo=function(){
        console.log("calling index db");
        var transaction =$scope.db.transaction(["locInfo"],"readonly");
        var objectStore = transaction.objectStore("locInfo");
        var request = objectStore.openCursor();
        request.onsuccess = function(event){
                 var cursor = event.target.result;
                if(cursor) {
                  $scope.eventInformation.push(cursor.value);
                  cursor.continue();
                } else {
                      // console.log("no more results");
                }
        };
        transaction.oncomplete = function (event){
          $scope.eventLoc = $scope.eventInformation[1].evntinfo;
          $scope.displayInfo();
        };
    };
    $scope.displayInfo = function(){
              $scope.isEventPrvt = $scope.eventLoc.isEventPrvt;
              $scope.evntfreq = $scope.eventLoc.evntfreq;
              $scope.selectedval = $scope.eventLoc.selectedval;
              $scope.selectedtype($scope.eventLoc.selectedval);
              $scope.changeSubtype($scope.eventLoc.subtitle);
    };
    //  end index db 
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
// End info location selection controller
//controller for creating coupon
app.controller('EventCouponController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,$rootScope){
  $scope.headerTitle="Coupons";
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  //getting selected event data from localstorage instead of calling server back for data
  var selectedval=localStorage.getItem('selectedEventId');
  var loginInfo = angular.fromJson(localStorage.getItem('Logininfo'));
  console.log(loginInfo.exhibiting_days);
  if(loginInfo.exhibiting_days!=undefined && loginInfo.user_type=="Exhibitor"){
      $scope.exhibitingDays = loginInfo.exhibiting_days;
      $scope.isExhibitor = true;
  }
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
    $scope.timeformaType = "HH:mm";
  }else{
    $scope.is_time_format_24=false;
    $scope.timeformaType = "hh:mm A";
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}  // cuppon search 
  $scope.cuponsearch="";
  // $scope.searchoncupon = function(c) {
  //   return (c.name.toLowerCase() + c.coupon_url_code.toLowerCase()).indexOf($scope.cuponsearch) >= 0;
  // };
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location.replace("/events");
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Coupon';
  }
  //time offset 
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  $scope.urlvalid = true;
  $scope.mainurl=false;
  $scope.urlvalidation = function() {
      if ($scope.couponUrl.length > 7) {
          if (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,253}(:[0-9]{1,5})?(\/.*)?$/.test($scope.couponUrl)) {
              $scope.urlvalid=$scope.mainurl= false;
          } else {
              $scope.urlvalid=$scope.mainurl= true;
          }
      }
  }
  // ------------------
  var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
  var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
  var st_date=$filter('date')(s_date,'yyyy-MM-dd');
  var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
  $scope.dates={};
  $scope.dayscount=Object.keys($scope.currentval.days).length;
  var d = APPService.Dateslist(st_date,$scope.dayscount);
  $scope.service=APPService;
  $scope.speakerEngage=true;
  $scope.notimeDiff = false;
  $scope.showTime=false;
  $scope.eventDaysInfo = [];
  //dayAvailableForCoupon - for exhbitor we are considering exhbiting  days only for coupon

  if($scope.isExhibitor==true){
    angular.forEach($scope.currentval.days,function(value,key){
          var eventDaysInfo = {
                  dayID:$scope.currentval.days[key].dayID,
                  dayTitle:$scope.currentval.days[key].dayTitle,
                  dstOffset:$scope.currentval.days[key].dstOffset,
                  isDayActive:$scope.currentval.days[key].is_day_active,
                  endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
                  startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
                  date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd'),
                  dayAvailableForCoupon:false
          };
          $scope.eventDaysInfo.push(eventDaysInfo);
          angular.forEach($scope.exhibitingDays,function(v,k){
            if($scope.currentval.days[key].dayID==$scope.exhibitingDays[k]){
                $scope.eventDaysInfo[key].dayAvailableForCoupon=true;
            }
            // else{
            //     var eventDaysInfo = {
            //       dayID:$scope.currentval.days[key].dayID,
            //       dayTitle:$scope.currentval.days[key].dayTitle,
            //       dstOffset:$scope.currentval.days[key].dstOffset,
            //       isDayActive:$scope.currentval.days[key].is_day_active,
            //       endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
            //       startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
            //       date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd'),
            //       dayAvailableForCoupon:false
            //     };
            //     $scope.eventDaysInfo.push(eventDaysInfo);
            // }
          });
        });
  }
  else{
        angular.forEach($scope.currentval.days,function(value,key){
            var eventDaysInfo = {
              dayID:$scope.currentval.days[key].dayID,
              dayTitle:$scope.currentval.days[key].dayTitle,
              dstOffset:$scope.currentval.days[key].dstOffset,
              isDayActive:$scope.currentval.days[key].is_day_active,
              endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
              startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
              date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd'),
              dayAvailableForCoupon:true
            };
            $scope.eventDaysInfo.push(eventDaysInfo);
        });
  }
  console.log($scope.eventDaysInfo);
  angular.forEach(d,function(d){
      angular.forEach($scope.eventDaysInfo,function(value,key){
        if(d==$scope.eventDaysInfo[key].date){
          $scope.dates[d]=$scope.eventDaysInfo[key];
        }
      });
  });
  $scope.expirationDayid=$scope.eventDaysInfo[$scope.eventDaysInfo.length-1].dayID;
  $scope.maxCouponTime=$scope.eventDaysInfo[$scope.eventDaysInfo.length-1].endTime;
  // -------------------------
  // var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  // var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  // $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  // $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selval=$scope.EXselval=$scope.dates[0];
  $scope.displaytime=$scope.expirytime=new Date(st_date);
  $scope.currentdate=new Date();
  $scope.s=APPService;
  $scope.subtitle='';
  $scope.edit_custom=false;
  $scope.couponfor='all';
  $scope.changeSubtype=function(c){
   $( ".subtype_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".subtitle").show();
    if(c=='' || c==undefined){
      $scope.subtitle=c;
      $(".subtitle").text('Select Date');
      $scope.subtitlevalue=true;
    }else{
      $scope.selectedDayinfo=c;
      $scope.subtitlevalue=false;
      if($scope.isExhibitor==true){$scope.isExpiry=true;}
      else{$scope.isExpiry=false;}  
      var coupDeliveryTime = $scope.checkTimeNow(c.startTime);
      $scope.minTime = new Date(coupDeliveryTime);
      console.log($scope.minTime);
      $scope.subtitle=coupDeliveryTime;
      $(".subtitle").text($filter('date')(coupDeliveryTime,'MMM dd, yyyy')); 
      $scope.time=new Date(coupDeliveryTime);
      $scope.selectexperydate=false;
      $scope.reachEndDate = false;
      $scope.mindatecoupon=coupDeliveryTime;
      if($scope.editCoupon==true){
        for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
              if($scope.eventDaysInfo[i].dayID == $scope.editCouponInfo.expiry_day_id){
                $scope.changeEDate($scope.eventDaysInfo[i]);
                $scope.selectexperydate=true;
              }
        };
      }
      if ($scope.selectexperydate==false) {
        $scope.changeEDate('');
      }
      $scope.avilabileTickets();
      // $scope.time.setMinutes($scope.time.getMinutes() +  30 );
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
  $scope.eDatetitle='';
  $scope.changeEDate=function(c){
    console.log(c)
   $( ".eDate_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".eDatetitle").show();
    if(c==''){
      $scope.eDatetitle=c;
      $(".eDatetitle").text('Select Date'); 
    }else{
      $scope.eDateInfo=c;
      if($scope.selectedDayinfo.dayID==$scope.eDateInfo.dayID){
          var expiryTime = new Date($scope.time);
          expiryTime.setMinutes(expiryTime.getMinutes() +  30 );
          $scope.eDatetitle=expiryTime;
          $(".eDatetitle").text($filter('date')(expiryTime,'MMM dd, yyyy')); 
          $scope.Etime=new Date(expiryTime);
      }
      else{
          $scope.eDatetitle=c.startTime;
          $(".eDatetitle").text($filter('date')(c.startTime,'MMM dd, yyyy')); 
          $scope.Etime=new Date(c.startTime);
      }

      // $scope.eDatetitle=c.startTime;
      // $(".eDatetitle").text($filter('date')(c.startTime,'MMM dd, yyyy')); 
      // $scope.Etime=new Date(c.startTime);
      // $scope.Etime.setMinutes($scope.Etime.getMinutes() +  30 );
        $scope.avilabileTickets();
    } 
  };
  $(document).on('click','.eDate_dropdown .primary_nav_wrap ul li',function(){
      $(".eDate_dropdown img").removeClass();
      $(".eDate_dropdown img").addClass('caret02'); 
      $( ".eDate_dropdown .primary_nav_wrap ul li ul").css({
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
        $trigger = $(".eDate_dropdown .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".eDate_dropdown .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".eDate_dropdown img").removeClass();
         $(".eDate_dropdown img").addClass('caret01'); 
        }   
  });
  //check coupon expiry time selected as above event end time
  $scope.$watch('Etime',function(newval,old){
    if($scope.Etime>$scope.maxCouponTime){
      $scope.Etime=$scope.maxCouponTime;
    }

  },true)
  $scope.addcup=function () {
    $scope.couponUrl=$scope.couponCode=$scope.CPname=$scope.CPdesc="";
    $scope.isExpiry=false;
    $scope.CustSubmit=false;
    $scope.couponfor=='all';
    $scope.Custtickets=[];
    $scope.isOnlineCoupon=true;
    $scope.attende=0;
    $scope.spoLocation='';
    $anchorScroll();
    $timeout(function() {
      $('textarea').each(function() {
          h(this);
      });
    }, 100); 
    $scope.changeSubtype();
    $scope.changeEDate('');
  };
  $scope.getTickets =function(){
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
      if(res.result == 1){
        $scope.ticketlist=res.tickets;
      }else{
        $scope.ticketlist=[];
      }
    });
  };
  $scope.avilabileTickets=function(){
    if($scope.isExpiry==true && $scope.eDateInfo!=undefined){
      $scope.expirationDayid=$scope.eDateInfo.dayID;
    }
    $('#loading').show();
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/custom_coupon/tickets/',
      data:{
          display_day_id:$scope.selectedDayinfo.dayID,
          expiry_day_id:$scope.expirationDayid,
          event_code:$scope.currentval.event_code
        }
    })
    .then(function success(response){
      if(response.data.result==1 ){
          $scope.ticketlist = response.data.ticket_data;
         $('#loading').hide();
         $('#container').fadeIn();
      }else if(response.data.result==0){
          $scope.errormsg=true;
          $scope.showerror=response.data.message;
          $('#loading').hide();
         $('#container').fadeIn();
      }
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
  };
  $scope.getCustomCoupon = function(){
    $('#loading').show();
    GetDataService.getCustomCoupon($scope.currentval.event_code).then(function(res){
      if(res.result==1){
        $scope.CUSTdata=res.custom_coupons;
        $scope.offsetEo=res.eo;
        $('#loading').hide();
        $('#container').fadeIn();
      }
    });
  };
  $scope.checkTimeNow = function(endTime){
    var diff =((new Date()).getTime() - $scope.localTimeNow.getTime()) / 1000;  
    diff /= 60;  
    var eventTime = $scope.setOffset($scope.timeNow,(Math.abs(Math.round(diff))+5));
    if(eventTime>endTime){
      console.log(eventTime);
      return eventTime;
    }
    else{
        console.log(eventTime);
        return endTime;
    }
  };
  GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
    if(res.result == 1){
        $scope.timeNow = res.local_time_now;
        $scope.localTimeNow = new Date();
        $scope.getCustomCoupon();
    }
  });
  $scope.getTickets();
  // remove coupon modal
  $scope.removeCouponModal= function(name,code){
    $scope.cuoponTitle = name;
    $scope.cuoponCode= code;      
  };
  $scope.removeCoupon = function(){
    $('#loading').show();
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/custom_coupon_edit/',
      data:{
          coupon_code:$scope.cuoponCode,
          opp:'delete'
        }
    })
    .then(function success(response){
      if(response.data.result==1 ){
          $('#adspace-delete').modal('hide');
         // $('#loading').hide();
         // $('#container').fadeIn();
         $scope.getCustomCoupon();
      }else if(response.data.result==0){
          $scope.errormsg=true;
          $scope.showerror=response.data.message;
          $('#loading').hide();
         $('#container').fadeIn();
      }
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
  };
  $scope.editCoupon =false;
  $scope.editCustomCoupon=function(coupon){
    $scope.Custtickets=[];
    $scope.editCoupon =true;
    $scope.mainurl= false;
    $scope.urlvalid=false;
    $scope.editCouponInfo=coupon;
    $scope.couponId = coupon.coupon_code;
    if(coupon.coupon_type==1){
      $scope.isOnlineCoupon=false;
      for (var i = $scope.evtLoc.length - 1; i >= 0; i--) {
        if($scope.evtLoc[i].location_code==coupon.location.location_code){
           $scope.locationClick($scope.evtLoc[i]);
        }
      };
    }
    else{
        $scope.isOnlineCoupon=true;
        $scope.couponUrl = coupon.coupon_url;
        $scope.couponCode = coupon.coupon_url_code;
    }
    $scope.CPname = coupon.name;
    $scope.CPdesc = coupon.description;
    // window.setTimeout( function() {
    // $("textarea").height( $("textarea")[0].scrollHeight );
    // }, 1000);
    if(coupon.for_all==true)
    {
      $scope.couponfor=='all';
    }
    else if(coupon.tickets.length>0){
        $scope.couponfor='ticket';
        for (var i = coupon.tickets.length - 1; i >= 0; i--) {
                $scope.custtickets(coupon.tickets[i]);
        };
    }
    else if(coupon.random!=null){
      $scope.couponfor='users';
      $scope.attende = coupon.random;
    }
    for (var i = $scope.eventDaysInfo.length - 1; i >= 0; i--) {
            if($scope.eventDaysInfo[i].dayID==coupon.display_day_id){
              $scope.changeSubtype($scope.eventDaysInfo[i]);
            }
            // if($scope.eventDaysInfo[i].dayID==coupon.expiry_day_id){
            //   $scope.changeEDate($scope.eventDaysInfo[i]);
            // }
    };
    $scope.time = $scope.setOffset(coupon.display_time,$scope.currentval.eo);

    if(coupon.expiry_time!=undefined||coupon.expiry_time!=null){
      $scope.Etime = $scope.setOffset(coupon.expiry_time,$scope.currentval.eo);
      $scope.isExpiry=true;
    }
    // $timeout(function(){
    //   $("textarea").height( $("textarea")[0].scrollHeight );
    // },100);
    // window.setTimeout( function() {
    // $("textarea").height( $("textarea")[0].scrollHeight );
    // }, 500);
    $scope.edit_custom=true;
    $scope.add_custom=true; 
    $timeout(function() {
      $('textarea').each(function() {
          h(this);
      });
    }, 100);  
  };  
  $scope.addCoupon = function(){
    $scope.edit_custom=true;
    $scope.add_custom=true; 
    $scope.add_food=true; 
  }; 
  // Fetching all event locations if exists
  $scope.eventLocations = function(){
    $scope.showLoc = false;
    GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
        if(res.result==1){
            $scope.evtLoc=res.data;
            if($scope.evtLoc.length>0)
            {
             console.log($scope.evtLoc);
              $scope.showLoc = true;
            }
        }
        else{
             $scope.showLoc = false;
        }
    });
  };
  $scope.eventLocations();
  $scope.locationClick = function(el){
    $scope.spoLocation = el.location; 
    $scope.showLoclist=false;
  };
  $scope.isValidLoc=false;
  $scope.locValidation=function(locName){
    $scope.req=false;
    $scope.isValidLoc=false;
    $scope.isValidLoc = GetDataService.validateLocation(locName);
  };
  $scope.reachEndDate = false;
  $scope.fromCouponDay = function(){
    return function(c){
      if($scope.selectedDayinfo!=undefined){
        if(c.dayID>=$scope.selectedDayinfo.dayID){
          console.log(c);
          if($scope.isExhibitor==true){
              if(c.dayID==$scope.selectedDayinfo.dayID){
                $scope.reachEndDate = false;
              }
              if(c.dayAvailableForCoupon==true && $scope.reachEndDate==false){
                console.log(c);
                return c;
              }
              else{
                $scope.reachEndDate = true;
              }
          }
          else{
              return c;
          }
        }
      }
    }
  };
  $scope.Custtickets=[];
  $scope.custtickets=function(val){
    if($scope.Custtickets.indexOf(val)>=0){
      $scope.Custtickets.splice($scope.Custtickets.indexOf(val),1);
    }else{
      $scope.Custtickets.push(val);
    }
  };
  $scope.Custusers=[];
  $scope.custusers = function(val){
    if($scope.Custusers.indexOf(val)>=0){
      $scope.Custusers.splice($scope.Custusers.indexOf(val),1);
    }else{
      $scope.Custusers.push(val);
    }
    checkpages('');
  };
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.numberOfPages=function(){
    if($scope.userlist !=undefined){
      return Math.ceil($scope.userlist.length/$scope.pageSize);
    }
    return 1;          
  };
  var checkpages = function(x){
    if(x=='selected' || $scope.filterlist=='selected'){
      $scope.currentPage = 0;
      $scope.totalpages=Math.ceil($scope.Custusers.length/$scope.pageSize);
    }else if(x=='unselected' || $scope.filterlist=='unselected'){
      $scope.currentPage = 0;
      //console.log($scope.userlist.length+' -'+$scope.Custusers.length);
      $scope.totalpages=Math.ceil(($scope.userlist.length-$scope.Custusers.length)/$scope.pageSize);
    }else{
      $scope.currentPage = 0;
      $scope.totalpages=$scope.numberOfPages();
    }
  };
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  };
  $scope.genRandom=function(){
    var arr=shuffleArray($scope.getUserCodes());
    arr=arr.splice(0,$scope.rVal);
    $scope.Custusers=arr;
  };
  $scope.getUserCodes =function() {
    var usercode=[];
    for(var i=0; i<$scope.userlist.length;i++){
      usercode.push($scope.userlist[i].user_code);
    }
    return usercode;
  };
  $scope.$watchCollection('[filterlist,Custusers]', function(newValues){
    checkpages(newValues[0]);
  });
  $scope.filteruser = function(u){
    if($scope.filterlist=='selected'){
      return $scope.Custusers.indexOf(u.user_code)>=0;
    }else if($scope.filterlist=='unselected'){
      return !($scope.Custusers.indexOf(u.user_code)>=0);
    }
      return true;
  };

  $scope.selectval=function(val){
      $scope.selval=val;
      var d1=new Date(val);
      d1.setHours($scope.displaytime.getHours());
      d1.setMinutes($scope.displaytime.getMinutes());
      $scope.displaytime=d1;
      $scope.time=$filter('date')(d1,'hh:mm a');
  };
  $scope.EXselectval=function(val){
      $scope.EXselval=val;
      var d1=new Date(val);  
      d1.setHours($scope.expirytime.getHours());
      d1.setMinutes($scope.expirytime.getMinutes());
      $scope.expirytime=d1;
      $scope.EXtime=$filter('date')(d1,'hh:mm a');
  };
  $scope.errorScroll = function(){
    // console.log($scope.CPform.$valid);
    //     console.log($scope.CPname);
    // console.log($scope.CPdesc);
    // deliverytime locationid
    // if($scope.CPform.$valid && $scope.couponfor=='users' && $scope.currentval.number_of_attendee < $scope.attende)
    if($scope.isOnlineCoupon==false && ($scope.spoLocation==undefined ||$scope.spoLocation==''||$scope.spoLocation==null)){
      $timeout(function(){
          APPService.scrollJquery('locationid');
        },100);
    }
    else if($scope.CPform.$valid && ($scope.selectedDayinfo==undefined|| $scope.selectedDayinfo==null||$scope.selectedDayinfo=='')){
        $timeout(function(){
          APPService.scrollJquery('deliverytimeid');
        },100);
    }
    else if($scope.CPform.$valid && !($scope.selectedDayinfo==undefined|| $scope.selectedDayinfo==null||$scope.selectedDayinfo=='') && $scope.isExpiry && ($scope.eDateInfo==undefined|| $scope.eDateInfo==null||$scope.eDateInfo=='')){
       $timeout(function(){
          APPService.scrollJquery('expiryid');
        },100);
    }
    if($scope.couponfor=='users' && $scope.currentval.number_of_attendee < $scope.attende)
      APPService.scrollJquery('attendeError');
    if($scope.couponfor=='ticket' && $scope.Custtickets.length<=0)
      APPService.scrollJquery('ticketError');
  };
  $scope.CustCoupon = function(){
    var onlinCoupon = 1;
    var cpUrl = null;
    var cpCode = null;
    var location =null;
    $scope.existLocation='';
    if($scope.isOnlineCoupon){
          onlinCoupon = 2;
          cpUrl=$scope.couponUrl;
          if($scope.couponCode!=undefined){
            cpCode=$scope.couponCode;
          }
    }
    else{
          location=$scope.spoLocation;
          $scope.existLocation=false;
          if($scope.showLoc){
                angular.forEach($scope.evtLoc,function(value,key){
                      if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                        $scope.existLocation=true;
                        location=$scope.evtLoc[key].location_code
                      }
                });
          }
    }
    var forAll=false;
    if($scope.couponfor=='all'){
      forAll=true;
      $scope.Custtickets=[];
      $scope.attende=0;
    }else if($scope.couponfor=='ticket'){
      $scope.attende=0;
    }else{
      $scope.Custtickets=[];
    }
    var expiryID=null;
    var expiry_time = null;
    if($scope.eDateInfo!=undefined && $scope.isExpiry){
        expiryID=$scope.eDateInfo.dayID;
        expiry_time=$filter('date')($scope.Etime,'yyyy-MM-dd HH:mm');
    }
    else{
       expiryID=null;
       expiry_time = null;
    }
    if($scope.editCoupon==false){
        $http({method:'POST',
          url:YaraBaseUrl.url+'/custom_coupon/',
          data:{
            event_code:$scope.currentval.event_code,
            name:$scope.CPname,
            coupon_type:onlinCoupon,
            description:$scope.CPdesc,
            display_time:$filter('date')($scope.time,'yyyy-MM-dd HH:mm'),
            for_all:forAll,
            random:$scope.attende ,
            tickets:$scope.Custtickets,
            expiry_time:expiry_time,
            is_location_exist:$scope.existLocation,
            location:location,
            coupon_url:cpUrl,
            coupon_url_code:cpCode,
            expiry_day_id:expiryID,
            display_day_id:$scope.selectedDayinfo.dayID
          }
        }).then(function success(response){
                console.log(response);
                if(response.data.result==1 ){
                    window.location="/event/coupon"
                   //  $('#adspace-delete').hide();
                   // $('#loading').hide();
                   // $('#container').fadeIn();

                }else if(response.data.result==0)
                {
                    
                    $scope.errormsg=true;
                    $scope.showerror=response.data.message;
                    // $('#loading').hide();
                   // $('#container').fadeIn();

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
    }
    else if($scope.editCoupon){
        $http({method:'POST',
          url:YaraBaseUrl.url+'/custom_coupon_edit/',
          data:{
            event_code:$scope.currentval.event_code,
            opp:"edit",
            name:$scope.CPname,
            coupon_type:onlinCoupon,
            description:$scope.CPdesc,
            display_time:$filter('date')($scope.time,'yyyy-MM-dd HH:mm'),
            for_all:forAll,
            random:$scope.attende ,
            tickets:$scope.Custtickets,
            expiry_time:expiry_time,
            is_location_exist:$scope.existLocation,
            location:location,
            coupon_url:cpUrl,
            coupon_url_code:cpCode,
            expiry_day_id:expiryID,
            display_day_id:$scope.selectedDayinfo.dayID,
            coupon_code:$scope.couponId

          }
        }).then(function success(response){
                console.log(response);
                if(response.data.result==1 ){
                    window.location="/event/coupon"
                   //  $('#adspace-delete').hide();
                   // $('#loading').hide();
                   // $('#container').fadeIn();

                }else if(response.data.result==0)
                {
                    
                    $scope.errormsg=true;
                    $scope.showerror=response.data.message;
                    // $('#loading').hide();
                   // $('#container').fadeIn();

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
   
}]);
//controller for Votes
app.controller('EventVoteController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$document','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$document,$rootScope,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Vote";
  var selectedval=localStorage.getItem('selectedEventId');
  // time format
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
    $scope.timeformaType = "HH:mm";
  }else{
    $scope.is_time_format_24=false;
    $scope.timeformaType = "hh:mm A";
  }
  $scope.locationHref=window.location.pathname;
  if(GetDataService.getPrivilege()=='Admin'){$scope.privilege=true;}
  else{$scope.privilege=false;}  // vote search
  $scope.votesearch="";
  $scope.searchonvore = function(q) {
    for (var i = 0; i < q.options.length; i++) {
      return (q.question.toLowerCase() + q.options[i].option.toLowerCase()).indexOf($scope.votesearch) >= 0;      
    }
  };
  if(selectedval=== undefined || selectedval === null)
  {
   // $location.path('/Events');
       window.location.replace("/events");
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Vote';
  }
   $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  // var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  // var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
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
  $scope.minTime = $scope.eventDaysInfo[0].startTime; 
  $scope.time = $scope.eventDaysInfo[0].startTime;
  $scope.SelDate=$scope.eventDaysInfo[0].dayID;
  $scope.expday=$scope.eventDaysInfo[0].isDayActive,
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
  $scope.dates=$scope.eventDaysInfo;
  $scope.voteBtn = "Create";
  // $scope.selectDate = function(d){
  //   $scope.SelDate=d.dayID;
  //   console.log(d);
  //   $scope.expday=d.isDayActive;
  //   $scope.minTime = d.startTime; 
  //   $scope.time = d.startTime;
  //    $scope.getVotes();
  // };
  $scope.selectDate=function(d){
    console.log($scope.voteData);
    $('#loading').show();
    $scope.voteData=[];
    console.log($scope.voteData);
    GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
            $scope.timeNow= $scope.setOffset(res.local_time_now,0);
            $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
            });
            $(".subtitle").show();
            if(d==''){
              $scope.subtitle=d;
              $(".subtitle").text('Select Event Day'); 
            }else{
                    // $scope.currentLocalTime();
                    $scope.SelDate=d.dayID;
                    if($scope.timeNow>d.startTime){
                      var newLoctime = new Date($scope.timeNow).setMinutes($scope.timeNow.getMinutes()+5);
                      newLoctime = new Date(newLoctime);
                        if($scope.voteBtn=="Update"){
                          $scope.minTime =  newLoctime; 
                          $scope.time = $scope.setOffset($scope.displayTime,$scope.currentval.eo);
                        }
                        else{
                            $scope.minTime = newLoctime; 
                            $scope.time = newLoctime;
                        }
                    }
                    else{
                      if($scope.voteBtn=="Update"){
                        $scope.minTime = d.startTime; 
                        $scope.time = $scope.setOffset($scope.displayTime,$scope.currentval.eo);
                      }
                      else{
                        $scope.minTime = d.startTime; 
                        $scope.time = d.startTime;
                      }
                    }
                    $scope.expday=d.isDayActive;
                    $scope.getVotes();
              $(".subtitle").text(d.dayTitle);
              $(".tracktitle").text('Select Track');  
            } 
            }
      });
  };
  $scope.selectDate($scope.eventDaysInfo[0]);
  $(document).on('click','.timeline-event-day .primary_nav_wrap ul li',function(){
      $(".timeline-event-day img").removeClass();
      $(".timeline-event-day img").addClass('caret02'); 
      $( ".timeline-event-day .primary_nav_wrap ul li ul").css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });
  $document.on('click',function(event){
    var $trigger = $(".timeline-event-day .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".timeline-event-day img").removeClass();
         $(".timeline-event-day img").addClass('caret01'); 
        }   
  });  
  $scope.voteData=[];
  $scope.Smart_delivery=false;
  $scope.SD_show=false;
  $scope.subtitle='';
  $scope.timeslots = []
  $scope.time=moment().hours(0).minutes(0);
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
      $(".subtitle").text('Select Event Day'); 
    }else{
      $scope.subtitle=c;
      $(".subtitle").text($filter('date')(c,'MMM dd, yyyy')); 
      $scope.time=moment(c).hours(0).minutes(0);
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
  // converting hours to minutes
  $scope.timeInminutes = function(dateTime,offset){
    var timeMinutes = 0;
    var res = dateTime.split(" ");
    // var dates = res[0].split("-");
    // console.log(res);
    if(res[1]!=undefined){
        var time = res[1].split(":");
    }
    if(res[1]!=undefined){
      var timeMinutes = parseInt(time[0])*60;
      timeMinutes=timeMinutes+parseInt(time[1])
      timeMinutes=timeMinutes+offset;
    }
    return timeMinutes;
  };
  $scope.getVotes = function(){
    $scope.voteData=[];
    if($scope.voteBtn!='Update' || $scope.checkstatus==true){
        $('#loading').show();
    }
    GetDataService.getVote({day_id:$scope.SelDate,event_code:$scope.currentval.event_code}).then(function(res){
        if(res.result==1){
            $scope.voteData=res.votes;
            $scope.eo =res.eo;
            if($scope.voteData.length>0){
              angular.forEach($scope.voteData,function(value,key){
                    $scope.voteData[key].displayMinutes = $scope.timeInminutes($scope.voteData[key].display_time,$scope.eo)
              });  
            }
            console.log($scope.voteData);
            // $scope.Smart_delivery=res.smart_delivery;
            // $scope.SD_show=res.show;
            $timeout(function(){
            $(".progressbars").jprogress();
            $(".progressbarsone").jprogress({
                background: "#FF2D55"
            });
            $('#loading').hide();
            $('#container').fadeIn(); 
          }, 500);
          $scope.checkstatus=false;
        }
    });
  };
  $scope.votecancel=function () {
      $scope.vote=$scope.errormsg=false
      $anchorScroll();
  };
  $scope.changepollQues=function () {
    $scope.errormsg=false;
  }
  // checking the display time interval is 30 minutes or not
  $scope.checkDisplayTime = function(){
    console.log($scope.time);
    $scope.createNewVote = false;
    var displayTime=$scope.timeInminutes(moment($scope.time).format("YYYY-MM-DD HH:mm"),0);
      angular.forEach($scope.voteData,function(value,key){
               // console.log($scope.voteData[key]);
               if( $scope.createNewVote==false  && $scope.voteBtn =="Create")
               {
                      if($scope.voteData[key].displayMinutes ==displayTime)
                      {
                          $scope.createNewVote=true;
                      }
                      else if($scope.voteData[key].displayMinutes<displayTime && ($scope.voteData[key].displayMinutes+30)>displayTime)
                      {
                            $scope.createNewVote=true;
                      }
                      else if($scope.voteData[key].displayMinutes>displayTime && ($scope.voteData[key].displayMinutes-30)<displayTime)
                      {
                            $scope.createNewVote=true;
                      }
               }
               else if($scope.createNewVote==false  && $scope.voteData[key].vote_code!=$scope.vote_code)
               {
                      if($scope.voteData[key].displayMinutes ==displayTime)
                      {
                          $scope.createNewVote=true;
                      }
                      else if($scope.voteData[key].displayMinutes<displayTime && ($scope.voteData[key].displayMinutes+30)>displayTime)
                      {
                            $scope.createNewVote=true;
                      }
                      else if($scope.voteData[key].displayMinutes>displayTime && ($scope.voteData[key].displayMinutes-30)<displayTime)
                      {
                            $scope.createNewVote=true;
                      }
               }
      });

    // console.log(displayTime);
    return $scope.createNewVote;
  };
  $scope.removeVoteInfo = function(dv){
    $scope.removeVote = dv;
    console.log(dv);
    // $scope.deleteVote();
  };
  $scope.deleteVote =  function(){
        $http({method:'POST',
        url:YaraBaseUrl.url+'/vote_edit/',
          data:{
            vote_code:$scope.removeVote.vote_code,
            day_id:$scope.removeVote.day_id,
            opp:'delete'
          }
        }).then(function success(response){
              if(response.data.result==1 ){
                $('#myModal-vote').modal('hide');
                $('#loading').modal('hide');
                $('#container').fadeIn();
                $scope.getVotes();
              }else if(response.data.result==0){
                  $scope.errormsg=true;
                  $scope.showerror=response.data.message;
                 $('#myModal-vote').modal('hide');
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
  //  check duplicates vote
  $scope.checkVote=function(){
        $scope.duplicateVote=false;
              var arr = [];
              angular.forEach($scope.vote_scope.optarray,function(value,key){
                console.log($scope.vote_scope.optarray[key]);
                if($scope.vote_scope.optarray[key]!=undefined && $scope.vote_scope.optarray[key]!="" && $scope.vote_scope.optarray[key]!=null){
                    var info={
                      vote:$scope.vote_scope.optarray[key],
                      key:key,
                    }
                    arr.push(info);
                    $scope.duplicates[key]=false;
                }
              });
          arr = arr.sort(function(a, b){
              var x = a.vote.toLowerCase();
              var y = b.vote.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
              var sorted_arr = arr;
              for (var i = 0; i < arr.length - 1; i++) {
                // console.log(sorted_arr[i + 1].dayname+"==="+sorted_arr[i].dayname);
                  if (sorted_arr[i + 1].vote.toLowerCase() == sorted_arr[i].vote.toLowerCase()) {

                       $scope.duplicates[sorted_arr[i+1].key]=true;
                        $scope.duplicateVote = true;
                        // $timeout(function(){
                        //   APPService.scrollJquery('dupe');
                        // },100);
                  }
              }
  };
  // forcreating new vote
  $scope.createVote = function(){
    $scope.vote=true;
    $scope.voteBtn = "Create";
    $scope.pollQues = '';
    $scope.displayTime='';
    $scope.duplicateVote = false;
    $scope.duplicates=[];
    $scope.vote_scope.optarray = [];
    // "voteId"
    setTimeout(function (){
            $('#voteId').focus();
        }, 1000);
    $anchorScroll();
    $('textarea').each(function () {
     h(this);
   });
  };
  // edit vote
  $scope.editVote = function(q){
    $scope.voteBtn = "Update";
    $scope.vote=true;
    $scope.duplicateVote = false;
    $scope.duplicates=[];
    $scope.vote_code = q.vote_code;
    $scope.displayTime = q.display_time;
    $scope.pollQues = q.question;
    $scope.SelDate = q.day_id;
    angular.forEach($scope.eventDaysInfo,function(value,key){
      if($scope.eventDaysInfo[key].dayID==q.day_id){
        $scope.selectDate($scope.eventDaysInfo[key]);
      }
    });
    $scope.vote_scope.optarray = [];
    angular.forEach(q.options,function(value,key){
      $scope.vote_scope.optarray.push(q.options[key].option);
    });
    $scope.time = $scope.setOffset(q.display_time,$scope.eo);
    $timeout(function() {
      $('textarea').each(function() {
          h(this);
      });
    }, 100);    
  };
  $scope.getVotes();
  $scope.vote_scope=$scope;
  $scope.vote_scope.optarray=[];
  $scope.optRequired=true;
  $scope.$watch('vote_scope.optarray',function(newval){
    console.log(newval);
    if(newval.length>0){
      var a=0;
      angular.forEach(newval,function(o){
        if(o!=undefined && o != '' && o != null){
          a++;
        }
      });
      if(a>=3)
        $scope.optRequired=false;
      else
        $scope.optRequired=true;
    }else
      $scope.optRequired=true;
  },true);
  $scope.addopt=function(){
    $scope.opt=$scope.opt+1;
    $scope.optarray.push($scope.opt);
  };
  $scope.errorScroll =function(){
    if($scope.duplicateVote){
            APPService.scrollJquery('optionRepeat');
    }
    if($scope.voteform.$valid && $scope.optRequired){
      APPService.scrollJquery('optionError');
    }
  };
  $scope.addpoll=function(form){
    $scope.checkstatus=true;
    console.log($scope.SelDate);
    $scope.optvalues=[];
    angular.forEach($scope.vote_scope.optarray,function(o){
      if(o!=undefined && o != '' && o != null){
         $scope.optvalues.push(o);
      }
    });
   $scope.displaytime='';
   /*if($scope.SD_show==true && $scope.Dtype=='SD' ){
      $http({method:'POST',
        url:YaraBaseUrl.url+'/smart_delivery/',
        data:{
          event_code:$scope.currentval.event_code,
          _for:'vote'
        }
    }).then(function success(response){
        console.log(response.data);
    });
   }*/
   if($scope.Dtype=='time'){
      console.log($scope.time);
      $scope.displaytime = $filter('date')($scope.time,'yyyy-MM-dd HH:mm');
     // console.log($scope.displaytime);
   } 
       // $scope.voteBtn = "Update";
       //  $scope.voteBtn = "Create";
        if($scope.voteBtn=="Create")
        {
          $http({method:'POST',
              url:YaraBaseUrl.url+'/vote/',
              data:{
                event_code:$scope.currentval.event_code,
                question:$scope.pollQues,
                options:$scope.optvalues,
                display_time:moment($scope.time).format("YYYY-MM-DD HH:mm"),
                day_id:$scope.SelDate
              }
          }).then(function success(response){
            console.log(response);
              if(response.data.result==1){
                $scope.pollQues='';
                $scope.submitted=false;
                $scope.optvalues=[];
                $scope.vote_scope.optarray=[];
                $scope.vote=false;
                $scope.getVotes();
              }
              else if(response.data.result==0)
              {
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
        }
        else if($scope.voteBtn=="Update"){
          $http({method:'POST',
              url:YaraBaseUrl.url+'/vote_edit/',
              data:{
                question:$scope.pollQues,
                options:$scope.optvalues,
                display_time:moment($scope.time).format("YYYY-MM-DD HH:mm"),
                day_id:$scope.SelDate,
                vote_code:$scope.vote_code,
                opp:"edit"
              }
          }).then(function success(response){
              if(response.data.result==1){
                $scope.pollQues='';
                $scope.submitted=false;
                $scope.optvalues=[];
                $scope.vote_scope.optarray=[];
                $scope.vote=false;
                $scope.getVotes();
              }
              else if(response.data.result==0)
              {
                  $scope.errormsg=true;
                  $scope.showerror=response.data.message;

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
app.filter('startFrom', function() {
    return function(input, start) {
      if(input != undefined){
        start = +start; //parse to int
        return input.slice(start);
      }
      return true;
    }
});
//Schedule controller
app.controller('TimelineController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpDatePicker','$mdpTimePicker','$interval','$timeout','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpDatePicker,$mdpTimePicker,$interval,$timeout,$rootScope,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Schedule";
  // if(localStorage.getItem('session')=='true' || localStorage.getItem('bsession')=='true'){
  //       localStorage.removeItem('bsession');
  //       localStorage.removeItem('session');
  //       window.location = "/dashboard";
  // }
  //getting selected event data from local data
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(selectedval=== undefined || selectedval === null)
  {
        window.location.replace("/events");
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  localStorage.removeItem('sessId');
  localStorage.removeItem('editSession');
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  };
  //time offset 
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  //local timing
  $scope.getLocaltime = function() {
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
              $scope.localTimeNow=res.local_time_now;
          }
      });
  };
  $scope.getLocaltime();
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
        is_day_active:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };             
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
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
  // list sessions and break sessions
  $scope.listallSessions = function(){
    $('#loading').show();
      var  param = {
          bs:1,
          event_code:$scope.currentval.event_code
      };
      GetDataService.getallSessions(param).then(function(res){
          $scope.sessionList = [];
          if(res.result==1){
            $scope.eo = res.eo;
            var sessions = res.sessions;
            angular.forEach(sessions,function(value,key){
                if(sessions[key].session_type ==true){
                      var sessionInfo = {
                          created_at:sessions[key].created_at,
                          created_by:sessions[key].created_by,
                          day_id:sessions[key].day_id,
                          description:sessions[key].description,
                          end_time:sessions[key].end_time,
                          eo:sessions[key].eo,
                          file_bank:sessions[key].file_bank,
                          is_speaker_engage:sessions[key].is_speaker_engage,
                          like_count:sessions[key].like_count,
                          location:sessions[key].location,
                          session_code:sessions[key].session_code,
                          session_type:sessions[key].session_type,
                          speakers:sessions[key].speakers,
                          sponsors:sessions[key].sponsors,
                          start_time:sessions[key].start_time,
                          tittle:sessions[key].tittle,
                          is_started:sessions[key].is_started,
                          track:sessions[key].track,
                          uploaded_file_size:sessions[key].uploaded_file_size,
                          sDate:$filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'EEEE,  MMMM d  y'),
                          timeFrom:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'h:mm a')),                          
                          timeTo:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'h:mm a'))
                      };
                      $scope.sessionList.push(sessionInfo);
                }
                else{
                      var sessionInfo = {
                          created_at:sessions[key].created_at,
                          created_by:sessions[key].created_by,
                          day_id:sessions[key].day_id,
                          end_time:sessions[key].end_time,
                          include_coupon:sessions[key].include_coupon,
                          location:sessions[key].location,
                          session_code:sessions[key].session_code,
                          session_type:sessions[key].session_type,
                          speakers:sessions[key].speakers,
                          sponsors:sessions[key].sponsors,
                          start_time:sessions[key].start_time,
                          tittle:sessions[key].tittle,
                          is_started:sessions[key].is_started,
                          sDate:$filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'EEEE,  MMMM d  y'),
                          timeFrom:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'h:mm a')),                          
                          timeTo:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'h:mm a'))
                      };
                      $scope.sessionList.push(sessionInfo);
                }
            }); 
           $('#loading').hide();
           $('#container').fadeIn();
          }
      });
  };
  $scope.listallSessions();
  // sorting 
  $scope.sort='';
  $scope.sorting = function(type){
    if(type==0){
        $scope.sort='';
        $anchorScroll();
    }
    else{
        $scope.sort='tittle';
        $anchorScroll();
    }
  };
  // pop up delete session
  $scope.popUp = function(sessionInfo,type)
  {
      $scope.sessionInfo = sessionInfo;
      $scope.sType = type;
  };
  // remove sessions
  $scope.sessiondelete=function (sessionCode,type,title) {
    $scope.sessioncode=sessionCode;
    $scope.sessiontype=type;
    $scope.sessiontitle=title;
  };
  $scope.breaksession=function(sessionCode,type,title) {
    $scope.sessioncode=sessionCode;
    $scope.sessiontype=type;
    $scope.sessiontitle=title;
  };
  $scope.removeSession = function(){
      if($scope.sessiontype==1){
            $('#loading').show();
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session_edit/',
              data:{
                  session_code:$scope.sessioncode,
                  opp:'Delete'
                }
            }).then(function success(response){
              console.log(response);
              if(response.data.result==1 ){
                  $('#schedule-revoke').modal('hide');
                  $scope.listallSessions();
                  $('#loading').hide();
                  $('#container').fadeIn();
              }else if(response.data.result==0){
                   

              }
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
      }
      else if($scope.sessiontype==0)
      {
            $('#loading').show();
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/break_session_edit/',
              data:{
                  session_code:$scope.sessioncode,
                  opp:'Delete'
                }
            }).then(function success(response){
              if(response.data.result==1 ){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.listallSessions();
                  $('#schedule-revoke').modal('hide');
              }else if(response.data.result==0){
             }
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
              $('#loading').hide();
              $('#container').fadeIn();
      }
  };
  // select day tab
  $scope.selecttab = function(d){
    $('#loading').show();
    $scope.seltab=d.dayID;
    $scope.expday=d.is_day_active;
    localStorage.setItem("eventdayid",JSON.stringify(d));
    $timeout(function(){
      $('#loading').hide();
      $('#container').fadeIn();
    }, 1500);
  };
  $scope.hideLoading = function(){
    
  };
  // day slider
  if(localStorage.getItem('eventdayid') != undefined) {
      var eventDayinfo = JSON.parse(localStorage.getItem('eventdayid'));
      $scope.seldat=false;
      for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
          if ($scope.eventDaysInfo[i].dayID == eventDayinfo.dayID) {
              $scope.selecttab(eventDayinfo);
              $scope.seldat=true;
              $scope.movebutton=i;
          }
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
      if ($scope.seldat=false) {
        $scope.seltab = $scope.eventDaysInfo[0].dayID;
        $scope.expday = $scope.eventDaysInfo[0].is_day_active;
      }
  } 
  else {
      $scope.seltab = $scope.eventDaysInfo[0].dayID;
      $scope.expday = $scope.eventDaysInfo[0].is_day_active;
      localStorage.setItem("eventdayid", JSON.stringify($scope.eventDaysInfo[0]));
  }
  // edit session
  $scope.editSessionInfo = function(sessInfo,editType){
    localStorage.setItem("sessId",sessInfo.session_code);
    localStorage.setItem("editSession",true);
    if(editType==1){
      localStorage.setItem('session',true);
      window.location="/event/schedule-session";
    }
    else if(editType==0)
    {
      localStorage.setItem('bsession',true);
      window.location="/event/schedule-break-session";
    }
  };
  $scope.getTracks=function(){
    GetDataService.getTracks().then(function(res){
       if(res.result==1){
        $scope.tracks=res.tracks;
      }
    });
  };
  // To add sessions
  $scope.sessionAdd = function(type){
    if(type==1){
        localStorage.removeItem('bsession');
        localStorage.setItem('session',true);
        window.location="/event/schedule-session"
    }
    else{
          localStorage.removeItem('session');
          localStorage.setItem('bsession',true);
          window.location="/event/schedule-break-session"
    }
  };
  //fetching tickets
  $scope.getTickets=function(){
    // $('#loading').show();
      GetDataService.getTickets($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          $scope.ticketsdata=res.tickets;
          $scope.firsTicketname = $scope.ticketsdata[0].name;
        }
      });
    // $('#loading').hide();
    // $('#container').fadeIn();
  };       
  $scope.getTickets();
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// create session controller
app.controller('CreateTimelineCtrl',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval','$timeout','$document','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval,$timeout,$document,$rootScope){
      if(localStorage.getItem('session')==undefined){
           window.location="/events";
      }
      // get event details from local storage
      var selectedval=localStorage.getItem('selectedEventId');
      if(selectedval=== undefined || selectedval === null)
      {
           window.location.replace("/events");
      }
      $scope.selevntdata=localStorage.getItem('selEventsData');
      $scope.currentval=angular.fromJson($scope.selevntdata);
      $scope.btnName = "Add Session";
      $scope.timeformat=localStorage.getItem('is_time_format_24');
      if ($scope.timeformat=='true') {
        $scope.is_time_format_24=true;
        $scope.timeformaType = "HH:mm";
      }else{
        $scope.is_time_format_24=false;
        $scope.timeformaType = "hh:mm A";
      }
      //time offset 
      $scope.setOffset = function(d,offset){
        return GetDataService.userOffsetTime(d,offset);
      };
      $scope.specPeople = $scope.currentval.sp_people;
      $scope.convertingPeoplelist = $scope.specPeople;
      document.title='YARA - '+$scope.currentval.short_name+' - Schedule';
      var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
      var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
      var st_date=$filter('date')(s_date,'yyyy-MM-dd');
      var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
      $scope.dates={};
      $scope.dayscount=Object.keys($scope.currentval.days).length;
      var d = APPService.Dateslist(st_date,$scope.dayscount);
      $scope.service=APPService;
      $scope.speakerEngage=false;
      $scope.notimeDiff = false;
      $scope.showTime=false;
      $scope.eventDaysInfo = [];
      angular.forEach($scope.currentval.days,function(value,key){
          var eventDaysInfo = {
            dayID:$scope.currentval.days[key].dayID,
            dayTitle:$scope.currentval.days[key].dayTitle,
            dstOffset:$scope.currentval.days[key].dstOffset,
            endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
            startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
            date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
          };
          $scope.eventDaysInfo.push(eventDaysInfo);
      });
      angular.forEach(d,function(d){
          angular.forEach($scope.eventDaysInfo,function(value,key){
            if(d==$scope.eventDaysInfo[key].date){
              $scope.dates[d]=$scope.eventDaysInfo[key];
            }
          });
      });
      var startdTime,endTime;
          angular.forEach($scope.currentval.days,function(value,key){

            if($scope.currentval.start_date==$scope.currentval.days[key].startTime)
            {
               startdTime = $scope.currentval.days[key].startTime;
               endTime = $scope.currentval.days[key].endTime;
            }
      });
      $scope.EvtStart=$scope.setOffset(startdTime,$scope.currentval.eo);
      $scope.EvtEnd=$scope.setOffset(endTime,$scope.currentval.eo);
      $scope.subtitle='';
      // select track
      $scope.tracktitle='';
      $scope.trackSelected=false;
      $scope.changeTrack=function(c){
       // console.log(c);
       $( ".timeline-event-track .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: 'none',
        background: '#fff',
        'z-index':100
       });
          $(".tracktitle").show();
        if(c==''){
          $scope.tracktitle=c;
          $(".tracktitle").text('Select Track'); 
        }else{
          $scope.tracktitle=c.track_code;
          $scope.trackInfo=c;
          $scope.trackSelected=true;
          $(".tracktitle").text(c.name); 
        } 
      };
       $(document).on('click','.timeline-event-track .primary_nav_wrap ul li',function(){
          $(".timeline-event-track img").removeClass();
          $(".timeline-event-track img").addClass('caret02'); 
          $( ".timeline-event-track .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#000',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-track .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length){
               $( ".timeline-event-track .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: '#333',
              background: '#333',
              'z-index':100
          });
             $(".timeline-event-track img").removeClass();
             $(".timeline-event-track img").addClass('caret01'); 
            }   
      });
      // end select track
      // --------------------------------sponser-----------------
      $scope.changeSponser=function(c){
       $( ".timeline-event-sponser .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: '#333',
        background: '#333',
        'z-index':100
       });
          $(".sponsertitle").show();
        if(c==''){
          $scope.sponsertitle=c;
          $(".sponsertitle").text('Select sponser'); 
        }else{
          $scope.sponsertitle=c.sponsor_code;
          $scope.sponserInfo=c;
          console.log(c.name);
          $timeout(function() {
            $(".sponsertitle").text(c.name).addClass("color-black");
          }, 50);          
        } 
      };
       $(document).on('click','.timeline-event-sponser .primary_nav_wrap ul li',function(){
          $(".timeline-event-sponser img").removeClass();
          $(".timeline-event-sponser img").addClass('caret02'); 
          $( ".timeline-event-sponser .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#333',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-sponser .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length){
               $( ".timeline-event-sponser .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: '#333',
              // background: '#333',
              'z-index':100
          });
             $(".timeline-event-sponser img").removeClass();
             $(".timeline-event-sponser img").addClass('caret01'); 
            }   
      });
      // --------------------------------end sponser--------------------
      $scope.noSpeaker=true;
      // event_day_accessories
      $scope.selectspeaker=function(dayid,trackCode) {
        $scope.noSpeaker= false;
        $('#loading').show();
        var param = {
            item:'sp',
            day_id:dayid,
            track_code:trackCode
        };
       GetDataService.eventDayAccessories(param).then(function(res){
          if(res.result==1){
            $('#loading').hide();
            $('#container').fadeIn();
            $scope.SpkData=res.sp_data;
            var speakerDataIndex = [];
            if($scope.SpkData.length==0){
              $scope.noSpeaker= true;
            }
            //edit
            $scope.addedSpeker = [];
            if (localStorage.getItem('editSession') == "true" && $scope.editSessInfo != undefined && $scope.SpkData.length>0) {
                angular.forEach($scope.SpkData, function(value, key) {
                    angular.forEach($scope.editSessInfo.speakers, function(v, k) {
                        if ($scope.editSessInfo.speakers[k].speaker_code == $scope.SpkData[key].delegate_code) {
                            $scope.addedSpeker.push($scope.SpkData[key]);
                            speakerDataIndex.push(key);
                        }

                    });
                });
                for (var i = speakerDataIndex.length - 1; i >= 0; i--) {
                          $scope.SpkData.splice(speakerDataIndex[i],1);
                };
            }
          }
       });
      };
      // --------------------------------selection of day--------------------
      $scope.changeSubtype=function(c){
       $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: 'none',
        background: '#fff',
        'z-index':100
       });
          $(".subtitle").show();
        if(c==''){
          $scope.subtitle=c;
          $(".subtitle").text('Select Event Day'); 
        }else{
          
          $scope.showTime=true;
          $scope.selectedDayinfo = c;
          $scope.subtitle=c.dayTitle;
          $scope.EvtEnd=$scope.setOffset(c.endTime, $scope.currentval.eo);
          var startTimeloc=$scope.setOffset(c.startTime, $scope.currentval.eo);
          var Localtime= $scope.setOffset($scope.localTimeNow,0);
          if (startTimeloc<Localtime) {
            // $scope.starttime=$scope.Bstarttime=Localtime;
            // $scope.EvtStart=Localtime;
              var newLoctime = new Date(Localtime).setMinutes(Localtime.getMinutes()+5);
              newLoctime = new Date(newLoctime);
              if(newLoctime<$scope.EvtEnd){
                $scope.starttime=$scope.Bstarttime=newLoctime;
                $scope.EvtStart=newLoctime;
              }
              else{
                $scope.starttime=$scope.Bstarttime=Localtime;
                $scope.EvtStart=Localtime;
              }
          }else{
            $scope.starttime=$scope.Bstarttime=startTimeloc;
            $scope.EvtStart=startTimeloc;
          }
          $scope.endtime=$scope.Bendtime=$scope.setOffset(c.endTime, $scope.currentval.eo);
          $(".subtitle").text(c.dayTitle);
          // $scope.tracktitle='';
          // $(".tracktitle").text('Select Track');  
          $scope.sessionform.starttime.$untouched=false;
          $scope.sessionform.endtime.$untouched=false;
        } 
        // $scope.selectspeaker(c.dayID);
      };
      $(document).on('click','.timeline-event-day .primary_nav_wrap ul li',function(){
          $(".timeline-event-day img").removeClass();
          $(".timeline-event-day img").addClass('caret02'); 
          $( ".timeline-event-day .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#000',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-day .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
               $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: 'none',
              background: '#fff',
              'z-index':100
          });
             $(".timeline-event-day img").removeClass();
             $(".timeline-event-day img").addClass('caret01'); 
            }   
      });
      // --------------------------------end selection of day--------------------
      $scope.addtrack=function(form){
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
        if ($scope.invalidTrack==false) {
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
            $scope.trackname="";
            $scope.SelDaysTrack=[];
            $scope.getTracks($scope.eventDaysInfo[0].dayID);
            $('#add-new-track').modal('hide');
                  }else if($scope.trackdata.result==0){
                    $scope.errormsgtrack=true;
                    $scope.errdata=$scope.trackdata.message;
                    $scope.already_exist=true;
                  }else{
                    $scope.errormsgtrack=true;
                    $scope.data.error=GetDataService.errorMsg[1];
                  }
              },function error(response){
                $scope.trackdata={};
                 $scope.errormsgtrack=true;
                if(response.status==-1 || response.data==null){
                        $scope.trackdata.error=GetDataService.errorMsg[0];
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
      };
      // add/edit new session 
      $scope.addSession = function(){
          // $('#loading').show();
          var selSpeakers = [];

          angular.forEach($scope.addedSpeker,function(value,key)
          {
            selSpeakers.push($scope.addedSpeker[key].delegate_code);
          });
          $scope.existLocation=0;
          if($scope.showLoc){
              angular.forEach($scope.evtLoc,function(value,key){
                    if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                      $scope.existLocation=1;
                      $scope.locationCode=$scope.evtLoc[key].location_code
                    }
              });
          }
          var location = $scope.spoLocation;
          if($scope.existLocation==1){
            location = $scope.locationCode;
          }
          var speaker_engage=false;
          if($scope.speakerEngage==true){
            speaker_engage = true;
          }
          var spcode;
          var spoInfo = [];
          if($scope.sponserInfo!=undefined){
            spcode=$scope.sponserInfo.sponsor_code;
            spoInfo.push(spcode);
          }
        
          if(localStorage.getItem('editSession')=="true")
          {
              $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session_edit/',
              data:{
                  event_code:$scope.currentval.event_code,
                  tittle:$scope.stitle,
                  speakers:selSpeakers,
                  track:$scope.trackInfo.track_code,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  description:$scope.sDesc,
                  sponsors:spoInfo,
                  speaker_engage:speaker_engage,
                  session_code:$scope.editSessInfo.session_code,
                  day_id:$scope.selectedDayinfo.dayID,
                  opp:'Edit'
                }
            }).then(function success(response){
              if(response.data.result==1 ){
                  localStorage.removeItem('bsession');
                  localStorage.removeItem('session');
                  window.location="/event/schedule";
              }else if(response.data.result==0){
                $scope.errormsg=true;
                $scope.showerror = response.data.message;
                $('#loading').hide();
                $('#container').fadeIn();
              }
            },function error(response){
                $scope.data={};
                console.log(response);
                 $scope.errormsg=true;
                 $('#loading').hide();
                 $('#container').fadeIn();
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
          else
          {
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session/',
              data:{
                  event_code:$scope.currentval.event_code,
                  tittle:$scope.stitle,
                  speakers:selSpeakers,
                  track:$scope.trackInfo.track_code,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  description:$scope.sDesc,
                  sponsors:spoInfo,
                  speaker_engage:speaker_engage,
                  day_id:$scope.selectedDayinfo.dayID
                }
            }).then(function success(response){
              console.log(response);
              if(response.data.result==1 ){
                    localStorage.removeItem('bsession');
                    localStorage.removeItem('session');
                window.location="/event/schedule";
                localStorage.setItem('tabcode',$scope.selectedDayinfo.dayID);
              }else if(response.data.result==0){
                   $scope.errormsg=true;
                   $scope.showerror=response.data.message;
                   $('#loading').hide();
                   $('#container').fadeIn();
              }
            },function error(response){
                $scope.data={};
                 $scope.errormsg=true;
                 $('#loading').hide();
                 $('#container').fadeIn();
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
      // end add/edit new session 
      // fetch all sponsers for the current event
      $scope.getSponsor = function(){
        GetDataService.getSponsors($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $scope.SPdata=res.data;
                console.log($scope.SPdata);
                // console.log($scope.editSessInfo.sponsors[0].sponsor_code);
                // eidt session
                if(localStorage.getItem('editSession')=="true"&& $scope.editSessInfo!=undefined){

                  // angular.forEach($scope.SPdata,function(value,key){
                      for (var i = $scope.SPdata.length - 1; i >= 0; i--) {
                      
                        // angular.forEach($scope.editSessInfo.sponsors,function(v,k){
                           if($scope.editSessInfo.sponsors[0].sponsor_code==$scope.SPdata[i].sponsor_code)
                            {
                              // console.log("reach here", $scope.SPdata[i]);
                                $scope.changeSponser($scope.SPdata[i]);
                                break;
                            }  

                        // });
                  };
                  // });
                }
                // end edit session
            }
        });
      };
      // selection of locations
      $scope.locationClick = function(el){
        console.log(el);
        $scope.spoLocation = el.location; 
        $scope.showLoclist=false;
      };
      $scope.isValidLoc=false;
      $scope.locValidation=function(locName){
        $scope.req=false;
        $scope.isValidLoc=false;
        $scope.isValidLoc = GetDataService.validateLocation(locName);
      };
      // end selection of location
      // Fetching all event locations if exists
      $scope.eventLocations = function(){
       $scope.showLoc = false;
        GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $scope.evtLoc=res.data;
                if($scope.evtLoc.length>0)
                {
                  $scope.showLoc = true;
                  // eidt session
                      if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){

                        // $scope.editSessInfo = angular.fromJson(localStorage.getItem('sessInfo'));
                        angular.forEach($scope.evtLoc,function(value,key){
                            if($scope.editSessInfo.location.location_code==$scope.evtLoc[key].location_code)
                            {
                                $scope.locationClick($scope.evtLoc[key]);
                                $scope.starttime = $scope.setOffset($scope.editSessInfo.start_time, $scope.currentval.eo);
                                $scope.endtime = $scope.setOffset($scope.editSessInfo.end_time, $scope.currentval.eo);
                            }

                        });

                      }
                  // end edit session
                }
            }
            else{
                 $scope.showLoc = false;
            }
        });
      };
      $scope.getTracks = function(){
          // ----- get all tracks ----------
          GetDataService.getTracks($scope.currentval.event_code).then(function(res){
            if(res.result==1){
              $scope.tracks=res.tracks;
              // end edit session
              if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                angular.forEach($scope.tracks,function(value,key){
                    if($scope.editSessInfo.track.track_code==$scope.tracks[key].track_code)
                    {
                        $scope.changeTrack($scope.tracks[key]);
                    }
                });
              }
              // end edit session
            }
          });
          // ------End get all tracks -------
      };
      // speaker add 
      $scope.addedSpeker = [];
      $scope.speakerAdd = function(spk,index){
        $scope.showSp = false;
        $scope.addedSpeker.push(spk);
        $scope.SpkData.splice(index,1);
      };
      // end speaker add
      // speaker remove 
      $scope.removeSpeaker = function(spk,index){
        $scope.SpkData.push(spk);
        $scope.addedSpeker.splice(index,1);
      };
      // end speaker remove
      // scroll to error position
      $scope.errorScroll =function(){
         $('#loading').show();
         // $timeout(function(){
          if($scope.addedSpeker.length==0 && $scope.sessionform.$valid){
                  APPService.scrollJquery('speaker_id');
          }
          else if($scope.subtitle==''){
            APPService.scrollJquery('subtitleerr');
          }
        // },300);
      };
      $scope.displayError = function(){
        $scope.submitted=true;
        $('#loading').hide();
        $('#container').fadeIn();   
      };
      $scope.speakertitle='';
      $scope.SelSpeaker=[];
      // end edit session
      $scope.addSpeaker= function (){
        var redirectionInfo= {
              delegate:false,
              speaker:true,
              bulk:false
            };
            localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        sessionStorage.setItem('redirect','/event/schedule-session');
         window.location.replace("/event/add-speaker");
      };
      $scope.dstapp=false; 
      $scope.$watchCollection('[starttime,endtime]', function(newValues){
              var timestamp = Math.round(new Date($scope.starttime).getTime()/1000.0);
                 var lat = $scope.currentval.latitude;
                 var lng = $scope.currentval.longitude;
                 var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          

                 $.getJSON(url, function (data) {
                          console.log(data);
                          if (data.dstOffset!=0 &&  data.dstOffset!=undefined)
                          {
                            $scope.dstapp=true;
                          }
                 });
      })
      // For fetching special delegate according to tracks and day
      $scope.$watchCollection('[selectedDayinfo,trackInfo]', function(newValues){
        console.log($scope.selectedDayinfo);
        console.log($scope.trackInfo);
        if($scope.selectedDayinfo!=undefined && $scope.trackInfo!=undefined ){
            $scope.selectspeaker($scope.selectedDayinfo.dayID,$scope.trackInfo.track_code);
        }

      });
      // Checking the selscted location contain any other session in the selected time  
      $scope.$watchCollection('[selectedDayinfo,starttime,endtime,spoLocation,stitle,addedSpeker.length,trackInfo]', function(newValues){
        $scope.notimeDiff = false;
        $scope.notimeDiff1 = false;
        // console.log($scope.selectedDayinfo);
        // console.log($scope.trackInfo);
        // if($scope.selectedDayinfo!=undefined && $scope.trackInfo!=undefined ){
        //     $scope.selectspeaker($scope.selectedDayinfo.dayID,$scope.trackInfo.track_code);
        // }
        if($scope.endtime>$scope.EvtEnd){
          $scope.endtime=$scope.EvtEnd;
        }
        if($scope.selectedDayinfo!=undefined && $scope.sessionform.starttime.$untouched==false && $scope.sessionform.endtime.$untouched==false )
        {
            if($scope.starttime.getHours()== $scope.endtime.getHours() ){
                var diff = $scope.endtime.getMinutes() - $scope.starttime.getMinutes();
                if(diff<0){
                  $scope.notimeDiff1 = true;
                }
                else if(diff<5 && diff>=0){
                    $scope.notimeDiff = true;
                }
            }else if ($scope.starttime.getHours()>$scope.endtime.getHours()) {
               $scope.notimeDiff1 = true;
            }
        }
        $scope.locationExist=0;
        $scope.locCode = '';
        if($scope.spoLocation!=undefined){
              angular.forEach($scope.evtLoc,function(value,key){
                    if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                      $scope.locationExist=1;
                      // $scope.locationKey=key;
                      $scope.locCode = $scope.evtLoc[key].location_code;
                    }
              });
        }
        var selSpeakers = [];
          angular.forEach($scope.addedSpeker,function(value,key)
          {
            selSpeakers.push($scope.addedSpeker[key].delegate_code);
          });
          // console.log(selSpeakers.length);
        if( $scope.selectedDayinfo!=undefined && $scope.sessionform.starttime.$untouched==false && $scope.sessionform.endtime.$untouched==false && $scope.stitle!=undefined && $scope.trackInfo!=undefined && $scope.addedSpeker.length>0){
          $('#loading').show();
          if(localStorage.getItem('editSession')=="true")
          {
            var session_code=Number(localStorage.getItem('sessId'));
          }
          else{
              var session_code=localStorage.getItem('sessId');
          }
            $scope.pastTime=0;
            $scope.sessionSttime= $filter('date')( $scope.starttime,'hh:mm a');
            $scope.sessionEndtime= $filter('date')( $scope.endtime,'hh:mm a');
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/location_validate/',
              data:{
                  event_code:$scope.currentval.event_code,
                  session_name:$scope.stitle.toLowerCase(),
                  location_code:$scope.locCode,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  for:'Session',
                  speaker_code:selSpeakers,
                  track_code:$scope.trackInfo.track_code,
                  session_code:session_code,
                  day_id:$scope.selectedDayinfo.dayID

                }
            })
            .then(function success(response){
              $('#loading').hide();
              $('#container').fadeIn();
              if(response.data.result==1 ){
                      $scope.speakers_conflict = response.data.speakers_conflict;
                      $scope.location_conflicts = response.data.location_conflicts;
                      $scope.session_duplicate = response.data.session_duplicate;
                      $scope.pastTime = response.data.time_conflict;
                      $timeout(function(){
                           if($scope.location_conflicts.length>0){
                            APPService.scrollJquery('locationdupe_id');
                          }
                          else if ($scope.session_duplicate==true) {
                              APPService.scrollJquery('sessiondupe_id');
                          }
                        },300);
              }else if(response.data.result==0){
                      $scope.speakers_conflict = response.data.speakers_conflict;
                      $scope.location_conflicts = response.data.location_conflicts;
                      $scope.session_duplicate = response.data.session_duplicate;
                      $scope.pastTime = response.data.time_conflict;
                      $scope.showerror = response.data.message;
                      $timeout(function(){
                          if ($scope.pastTime==1) {
                              APPService.scrollJquery('timesec');
                          }
                          else if ($scope.session_duplicate==true) {
                              APPService.scrollJquery('sessiondupe_id');
                          }
                          else if($scope.location_conflicts!=undefined && $scope.location_conflicts.length>0){
                            APPService.scrollJquery('locationdupe_id');
                          }
                          
                        },300);
              }
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
        }
      });
      $(window).click(function() {
         if($scope.showLoclist==true){
           $scope.showLoclist = false;
           $("#locationdropdown").hide();
         }
         if($scope.showSp==true){
            $scope.showSp=false;
            $("#speakerdropdown").hide();
         }          
      });
      $('#location_id').click(function(event){
        event.stopPropagation();
        $("#locationdropdown").show();
      });
      $('#locationinputid').on('input', function() {
      $("#locationdropdown").show();
      });
      $('#speakerid').click(function(event){
        event.stopPropagation();
        $("#speakerdropdown").show();
      });
      $('#speakerinputid').on('input', function() {
      $("#speakerdropdown").show();
      });
      // End checking the selscted location contain any other session in the selected time  
      $scope.cancelSessionCreation = function(){
            localStorage.removeItem('bsession');
            localStorage.removeItem('session');
            window.location = "/event/schedule";
      };
      // for adding sponser need to add redirection details
      $scope.addSponser = function(){
        window.location="/event/sponsor";
      };
      $scope.getSessionRequirements = function(){
          GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
              $('#loading').show();
              if(res.result == 1){
                  $scope.localTimeNow=res.local_time_now;
                  // Get all tracks
                  GetDataService.getTracks($scope.currentval.event_code).then(function(res){
                          if(res.result==1){
                                $scope.tracks=res.tracks;
                                //date get while adding new session
                                $scope.dateset=JSON.parse(localStorage.getItem('eventdayid'));
                                if($scope.dateset==null|| $scope.dateset==undefined){
                                   window.location = "/event/schedule";
                                }
                                if (localStorage.getItem('editSession')=="true" ) {
                                      var  param = {
                                          session_code:localStorage.getItem('sessId'),
                                          event_code:$scope.currentval.event_code
                                      };
                                      GetDataService.getSessionInfo(param).then(function(res){
                                          if(res.result==1){
                                                $scope.editSessInfo = res.sessions[0];
                                                $scope.stitle = $scope.editSessInfo.tittle;
                                                $scope.sDesc = $scope.editSessInfo.description;  
                                                $scope.speakerEngage = $scope.editSessInfo.is_speaker_engage;
                                                window.setTimeout( function() {
                                                                  $("textarea").height( $("textarea")[0].scrollHeight );
                                                              }, 500);
                                                 angular.forEach($scope.currentval.days,function(value,key){
                                                    if($scope.currentval.days[key].dayID ==$scope.editSessInfo.day_id ){
                                                      $scope.changeSubtype($scope.currentval.days[key]);
                                                    }
                                                 });
                                                  angular.forEach($scope.tracks,function(value,key){
                                                      if($scope.editSessInfo.track.track_code==$scope.tracks[key].track_code)
                                                      {
                                                          console.log($scope.editSessInfo.track.track_code);
                                                          console.log($scope.tracks[key].track_code);
                                                          $scope.changeTrack($scope.tracks[key]);
                                                      }
                                                  });
                                                // $scope.getTracks();
                                                $scope.eventLocations();
                                                $scope.getSponsor();
                                                $scope.btnName = "Update Session";
                                          }
                                      });
                                }else{
                                      angular.forEach($scope.currentval.days,function(value,key){
                                          if($scope.currentval.days[key].dayID==$scope.dateset.dayID){
                                              $scope.changeSubtype($scope.currentval.days[key]);
                                          }
                                      });
                                      // $scope.getTracks();
                                      $scope.eventLocations();
                                      $scope.getSponsor();
                                }
                                $('#loading').hide();
                                $('#container').fadeIn();
                          }
                  });
              }
          });
      };
      $scope.getSessionRequirements();
      // not connected to internet
      if($rootScope.online == false){
        alert("You are not connected to internet");
      }
}]);
// end create session controller
//save new event info  controller
app.controller('SaveNewEventController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval','$timeout','NgMap','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval,$timeout,NgMap,$rootScope){
    $scope.epData=angular.fromJson(localStorage.getItem('epData'));
    if($scope.epData==null){
      window.location = "/events";
    }
    var editEventDetails=angular.fromJson(localStorage.getItem('redirectionInfo'));
    if(!((editEventDetails.locPlace || editEventDetails.locManual)&& editEventDetails.eventDetails && editEventDetails.eventInfo && !editEventDetails.eventConfirm)){
        window.location = "/dashboard";
    }
    $scope.timeformat=localStorage.getItem('is_time_format_24');
    if($scope.timeformat=='true') {
      $scope.is_time_format_24=true;
      $scope.timeformaType = "HH:mm";
    }else{
      $scope.is_time_format_24=false;
      $scope.timeformaType = "hh:mm A";
    }
    $scope.editEventDetails= function(page){
        if(page=='location'){
              if(editEventDetails.locPlace){
                      editEventDetails.editlocPlace = true;
                      localStorage.setItem("redirectionInfo",JSON.stringify(editEventDetails));
                      window.location = "/create-event-location";
              }
              if(editEventDetails.locManual){
                      editEventDetails.locmanualPlace = true;
                      localStorage.setItem("redirectionInfo",JSON.stringify(editEventDetails));
                      window.location = "/create-event-set-location-manually";
              } 
        }
        else if(page=='info'){
          if(editEventDetails.eventInfo){
                editEventDetails.editeventInfo = true;
                localStorage.setItem("redirectionInfo",JSON.stringify(editEventDetails));
                window.location = "/create-event-info";
          }
        }
        else if(page=='details'){
          if(editEventDetails.eventDetails){
                  editEventDetails.editeventDetails = true;
                  localStorage.setItem("redirectionInfo",JSON.stringify(editEventDetails));
                  window.location = "/create-event-details";
            }
        }
    };
    // indexdb start
    $scope.eventInformation = [];
    var db;
    var request = window.indexedDB.open("yaraDB9.db",1);
    request.onsuccess = function(event){
      db=event.target.result;
      // console.log("db created success");
      $scope.getAllinfo();
    };
    request.onerror = function(event){
          console.log("error");
    };
    request.onupgradeneeded = function(event){
      // console.log("new db");
     db=event.target.result;
     db.createObjectStore("locInfo", {keyPath: "itemId"});
    };
    $scope.getAllinfo=function(){
        // console.log("calling index db");
        var transaction =db.transaction(["locInfo"],"readonly");
        var objectStore = transaction.objectStore("locInfo");
        var request = objectStore.openCursor();
        request.onsuccess = function(event){
            var cursor = event.target.result;
            if(cursor) {
              $scope.eventInformation.push(cursor.value);
              cursor.continue();
            } else {
                  // console.log("no more results");
            }
        };
        transaction.oncomplete = function (event){
          $scope.locInfo = $scope.eventInformation[2].location;
          $scope.eventInfo = $scope.eventInformation[1].evntinfo;
          $scope.creatingEventdetails = $scope.eventInformation[0].evntdetails;
          $scope.displayInfo();
        };
    };
    // indexdb end
    // after fetching data from indexdb 
    $scope.displayInfo = function () {
          $scope.eventime = angular.fromJson($scope.creatingEventdetails.eventtime);
          console.log($scope.eventime);
          $scope.listDatetime = [];
          angular.forEach($scope.creatingEventdetails.dates,function(key,value){
            console.log($scope.eventime[key].starttime);
              var dt = {
                      date: moment(key).format('dddd') +" "+ moment(key).format('Do') +" "+ moment(key).format('MMMM YYYY') +", From "+GetDataService.timeTo12HrFormat($scope.eventime[key].starttime,$scope.is_time_format_24)+" to " +  GetDataService.timeTo12HrFormat($scope.eventime[key].endtime,$scope.is_time_format_24)
              }
              $scope.listDatetime.push(dt);       
          });
            // map in the confirmation page
            NgMap.getMap().then(function(map) {
            var markers = [];
            for (var i = 0; i < 1; i++) {
              markers[i] = new google.maps.Marker({ title: "Marker: " + i });
                var lat =$scope.locInfo.geoloc.lat ;
                var lng = $scope.locInfo.geoloc.lng;
                var loc = new google.maps.LatLng(lat, lng);
                markers[i].setPosition(loc);
                markers[i].setMap(map);
            }
          }, 1000);
          var len = $scope.creatingEventdetails.eventdays.length;
          var startDatee = $scope.creatingEventdetails.eventdays[0].start_time;
          var endDatee = $scope.creatingEventdetails.eventdays[len-1].end_time;
    };
   $scope.saveNewevent = function(){
        $scope.timeZone = angular.fromJson(localStorage.getItem("timeZone"));
        $('#loading').show();
        localStorage.removeItem("phonInfo");
        $scope.CreatedEventInfo={};
        var formdata = new FormData();
        formdata.append('name',$scope.creatingEventdetails.eventname);
        $scope.CreatedEventInfo.eventname = $scope.creatingEventdetails.eventname;
        formdata.append('short_name',$scope.creatingEventdetails.eventshrtname);
        formdata.append('event_type_id',$scope.eventInfo.type_id);
        formdata.append('event_sub_type',$scope.eventInfo.subtitle);
        formdata.append('description',$scope.creatingEventdetails.eventdesc);
        $scope.CreatedEventInfo.desc=$scope.creatingEventdetails.eventdesc;
        var len = $scope.creatingEventdetails.eventdays.length;
        var startDatee = $scope.creatingEventdetails.eventdays[0].start_time;
        var endDatee = $scope.creatingEventdetails.eventdays[len-1].end_time;
        formdata.append('start_date',startDatee);
        formdata.append('end_date',endDatee);
        formdata.append('days',JSON.stringify($scope.creatingEventdetails.eventdays));
        formdata.append('venue',$scope.locInfo.venu);
        $scope.CreatedEventInfo.venue=$scope.locInfo.venu;
        formdata.append('address_line1', $scope.locInfo.addLine1);
        formdata.append('address_line2',$scope.locInfo.addLine2);
        formdata.append('city',$scope.locInfo.city);
        formdata.append('state',$scope.locInfo.state);
        var temp=0;
        if($scope.eventInfo.isEventPrvt==true){
          temp=1;
        }else{
          temp=0;
        }
        formdata.append('is_private', temp);
        formdata.append('frequency',$scope.eventInfo.evntfreq);
        formdata.append('country',$scope.locInfo.country);
        formdata.append('zip',$scope.locInfo.zipCode);
        $scope.event_logoo =$scope.creatingEventdetails.event_logo;
        formdata.append('event_logo', GetDataService.dataURItoBlob($scope.creatingEventdetails.event_logo));
        $scope.CreatedEventInfo.event_logo=$scope.creatingEventdetails.event_logo;
        if($scope.creatingEventdetails.coverimg!=''){
           formdata.append('agenda_image', GetDataService.dataURItoBlob($scope.creatingEventdetails.coverimg));
        }
        else{
           formdata.append('agenda_image', '');
        }
        formdata.append('phone_number',$scope.creatingEventdetails.contact.phone_number);
        formdata.append('email',$scope.creatingEventdetails.contact.eventemail);
        if($scope.eventInfo.isEventPrvt==true){
            formdata.append('website','');
            formdata.append('facebook', '');
            formdata.append('twitter','');      }
        else{
            formdata.append('website',$scope.creatingEventdetails.contact.eventweb);
            formdata.append('facebook', $scope.creatingEventdetails.contact.eventfb);
            formdata.append('twitter',$scope.creatingEventdetails.contact.eventtwitter);
        }
        formdata.append('longitude',$scope.locInfo.geoloc.lng);
        formdata.append('latitude', $scope.locInfo.geoloc.lat);
        formdata.append('event_map',"https://maps.googleapis.com/maps/api/staticmap?center="+$scope.locInfo.geoloc.lat+","+$scope.locInfo.geoloc.lng+"&zoom=15&size=600x600&markers="+$scope.locInfo.geoloc.lat+","+$scope.locInfo.geoloc.lng+"&format=jpg");
        formdata.append('ep_code', $scope.epData.ep_code);
        formdata.append('timezone',  $scope.timeZone.timezone);
        $scope.errormsg=false;
        $http({
          method:'POST',
          url:YaraBaseUrl.url+'/event/',
          data:formdata,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function success(response){
          $scope.data=response.data;
          if($scope.data.result==1) {  
            var eventReadyRedirection = {
              "eventready":false,
              "tracks":false,
              "gk":false,
              "promote":false,
              "pin":false
            };
            localStorage.setItem('selectedEventId',$scope.data.event_code);
            localStorage.setItem('eventReadyRedirection',angular.toJson(eventReadyRedirection));
            localStorage.removeItem('epData');
            window.location = "/event-ready";
          }
          else if($scope.data.result==0){
            $scope.errormsg=true;
            $scope.errmsg=$scope.data.message;
            $('#loading').hide();
            $('#container').fadeIn();
          }
        },function error(response){
              $scope.errormsg=true;
              if(response.status==-1 || response.data==null){
                  if($rootScope.online==false){
                   $scope.errmsg=GetDataService.errorMsg[0];
                  }
                  else{
                      $scope.errmsg=GetDataService.errorMsg[1];
                  }
              }else{
              $scope.errmsg=GetDataService.errorMsg[1];
              }
              $('#loading').hide();
              $('#container').fadeIn();
        });
   };
   $scope.pad = function(d){
      return (d < 10) ? '0' + d.toString() : d.toString();
   };
   $scope.cancelNewevent = function(){
      var request = window.indexedDB.open("yaraDB9.db",1);
      request.onsuccess = function(event){
        db=event.target.result;
        // console.log("db created success");
        clearDb();
      };
      request.onerror = function(event){
            console.log("error");
      };
      request.onupgradeneeded = function(event){
        // console.log("new db");
        db=event.target.result;
        db.createObjectStore("locInfo", {keyPath: "itemId"});
      };
      function clearDb(){
          var transaction = db.transaction(["locInfo"], "readwrite");
          // create an object store on the transaction
          var objectStore = transaction.objectStore("locInfo");
          // clear all the data out of the object store
          var objectStoreRequest = objectStore.clear();
          objectStoreRequest.onsuccess = function(event){
              // console.log("empty");
          };
      }        
      window.location = "/dashboard";
   };
   // not connected to internet
   if($rootScope.online == false){
      alert("You are not connected to internet");
   }
}]);
// end save new event info  controller
// manual location selection controller
app.controller('ManualLocationController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','NgMap','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,NgMap,$rootScope){
  // check EP_code in localstorage ,to create event code is need 
  if(localStorage.getItem('epData')!= undefined && localStorage.getItem('epData')!= ''){
    $scope.EPdata=localStorage.getItem('epData');
    $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
  }
  else{
    window.location.replace("/packages");
  }
  $anchorScroll();
  var redirection = angular.fromJson(localStorage.getItem("redirectionInfo"));
  $scope.s=APPService;
  $scope.showCountrylist = false;
  $scope.disableFeilds=true;
  $scope.saveLocationManually = function(){
    var lat,lng;
    if($scope.showMap==true){
        lat = $scope.eventLoc.geoloc.lat;
        lng =$scope.eventLoc.geoloc.lng;
    }
    else{
       lat = $scope.searchloc.latitude;
        lng =$scope.searchloc.longitude;
    }
    var locInfo = {
        'venu':$scope.venu,
        "addLine1":$scope.addrline1,
        "addLine2":$scope.addrline2,
        "city":$scope.venucity,
        "state":$scope.state,
        "country":$scope.country.name,
        "country_code":$scope.country.country_code,
        "zipCode":$scope.venupincode,
        "geoloc":{
                    "lat":lat,
                    "lng":lng
                }
    };
    localStorage.setItem("latandLong",JSON.stringify({lat:lat,lng:lng}));
    localStorage.setItem('lat',$scope.searchloc.latitude);
    localStorage.setItem('lng',lng);
    localStorage.setItem('country',$scope.country.name);
    redirection.locManual = true;
    if(redirection.locManual && redirection.locmanualPlace){
           redirection.editeventInfo = true;
    }
    localStorage.setItem('redirectionInfo',angular.toJson(redirection));         
    // indexdb start
    var db;
    var request = window.indexedDB.open("yaraDB9.db",1);
    request.onsuccess = function(event){
      db=event.target.result;
      // console.log("db created success");
      addlocInfo(locInfo);
    };
    request.onerror = function(event){
          console.log("error");
    };
    request.onupgradeneeded = function(event){
      // console.log("new db");
      db=event.target.result;
      db.createObjectStore("locInfo", {keyPath: "itemId"});
    };
    function addlocInfo(locInfo){
      var transaction = db.transaction(["locInfo"],"readwrite");
      var objectStore = transaction.objectStore("locInfo");
      var request = objectStore.put({itemId: "location", location:locInfo});
      request.onsuccess = function(event)
      {
            window.location.href = "/create-event-info";
      };
    };
    // indexdb end 
  };
  //get country list from server
  $scope.getCountries=function(){
    $scope.countries=[];
    $http({method:'GET',
          url:YaraBaseUrl.url+'/location_track/'
        }).then(function success(response){
          if(response.data.result==1){
            $scope.countries=response.data.countries;
            $('#loading').hide();
            $('#container').fadeIn();
          }
        });    
  };
  //get country phone code from json
  $scope.getDialCode=function(){
    $http({method:'GET',
        url:'../dial_code_json' 
      }).then(function success(response){
        $scope.dailcode=response.data;
      });
  };
  //country selection
  $scope.countrySelection = function(c) {
    if(c==''){
      $scope.showCountrylist = false;
      $scope.searchCountry ='';
      $scope.showStatelist = false; 
      c={};
      $scope.country=c;
      $scope.states=[];
    }
    else{
        // ----------------------------country code------------------------------
        if($scope.dailcode[$scope.countries[$scope.countries.indexOf(c)].country_code]=='')
          $scope.phdialreq=false;
        else
          $scope.phdialreq=true;
        if($scope.dailcode[$scope.countries[$scope.countries.indexOf(c)].country_code].indexOf('and')<0)
          $scope.phDailCode=$scope.dailcode[$scope.countries[$scope.countries.indexOf(c)].country_code];
        else{
           $scope.phDailCode=$scope.dailcode[$scope.countries[$scope.countries.indexOf(c)].country_code].split('and')[0];
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
        $scope.showCountrylist = false;
        $scope.searchCountry = c.name;
        $scope.showStatelist = false; 
        $scope.disableFeilds=false;
        $scope.country=c;         
        $http({method:'GET',
          url:YaraBaseUrl.url+'/location_track/',
          params:{
            country:c.name
          }
        }).then(function success(response){
              $scope.states=response.data.occasions;                  
        });
    }
    if($scope.showMap==false){
        $scope.addrline1="";
        $scope.addrline2="";
        $scope.venucity="";
        $scope.venupincode="";
        $scope.searchState = '';
        $scope.state="";
    }
    var loc=[];
    loc.push($scope.venu);
    loc.push($scope.addrline1);
    loc.push($scope.addrline2);
    loc.push($scope.venucity);
    loc.push($scope.state);
    loc.push($scope.country.name);
    loc.push($scope.venupincode);
    $scope.maploction(loc);          
  };
  $scope.afterSelection = function(type){
      if($scope.country.name!=undefined && type=='c'){
        $scope.addrline1="";
        $scope.addrline2="";
        $scope.venucity="";
        $scope.venupincode="";
        $scope.state ="";
        $scope.searchState = "";
        var loc=[];
        loc.push($scope.venu);
        loc.push($scope.addrline1);
        loc.push($scope.addrline2);
        loc.push($scope.venucity);
        loc.push($scope.state);
        loc.push($scope.country.name);
        loc.push($scope.venupincode);
        $scope.maploction(loc);
      }
      if($scope.state!=undefined && type=='s'){
        $scope.addrline1="";
        $scope.addrline2="";
        $scope.venucity="";
        $scope.venupincode="";
        var loc=[];
        loc.push($scope.venu);
        loc.push($scope.addrline1);
        loc.push($scope.addrline2);
        loc.push($scope.venucity);
        loc.push($scope.state);
        loc.push($scope.country.name);
        loc.push($scope.venupincode);
        $scope.maploction(loc);
      }
  };
  $scope.stateSelection = function(st){
    if(st==''){
       s={};
      $scope.state=s;
      $scope.searchstate=''; 
    }
    else{
        if($scope.showMap==false){
            $scope.showStatelist = false;
            $scope.disableFeilds=false;
            $scope.searchState = st;
            $scope.state=st;
            $scope.addrline1="";
            $scope.addrline2="";
            $scope.venucity="";
            $scope.venupincode="";
          }
        else{
            $scope.searchState = st;
            $scope.state=st;
        }
    }
    var loc=[];
    loc.push($scope.venu);
    loc.push($scope.addrline1);
    loc.push($scope.addrline2);
    loc.push($scope.venucity);
    loc.push($scope.state);
    loc.push($scope.country.name);
    loc.push($scope.venupincode);
    $scope.maploction(loc);
  }
  $(window).click(function() {
    if($scope.showCountrylist==true){
      if($scope.country==undefined){
        $scope.searchCountry = '';
      }
      $scope.showCountrylist = false;
    }
    if($scope.showStatelist==true){
      if($scope.state==undefined){
         $scope.searchState = '';
      }
    }         
    $("#countrydropdown").hide();
    $("#statedropdown").hide();   
  });
  $('#menucontainercountry').click(function(event){
      event.stopPropagation();
      $("#countrydropdown").show();
      $("#statedropdown").hide();
  });
  $('#menucontainerstate').click(function(event){
      event.stopPropagation();
      $("#statedropdown").show();
  });
  $('#countryId').on('input', function() {
    $("#countrydropdown").show();
    $("#statedropdown").hide();
  });
  $('#countryId').on('input', function() {
    $("#countrydropdown").show();
    $("#statedropdown").hide();
  });
  $('#stateId').on('input', function() {
    $("#countrydropdown").hide();
    $("#statedropdown").show();
  });
  $scope.country={};
  $scope.phDailCode="";
  $scope.phDailCode="";
  $scope.phdialreq=true;
  $scope.startsWith = function (actual, expected) {
      var lowerStr = (actual + "").toLowerCase();
      return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };
  $scope.states=[];
  $scope.changingLoc = function(){
    if($scope.showMap){
      $scope.showMap=false;
    }
  };
  $scope.state='';
  $scope.countrySearch = function(){
     return $scope.countrysearch;
  };
  $scope.getCountries();
  $scope.getDialCode();
  //validate event step 1 and scroll to error
  $scope.errorScroll =function(){
    if($scope.venu!=undefined){
          $timeout(function(){
            if($scope.country.name==undefined){
              APPService.scrollJquery('venu');   
              }      
            else if($scope.state=='' || $scope.state==undefined){
                APPService.scrollJquery('state_id');   
            }
            else if($scope.states.length==0 && ($scope.state=='' || $scope.state==undefined)){
                  APPService.scrollJquery('state_id1');   
            }
          },100);
    }
  };
  // setting default coord for map
  $scope.searchloc={
    latitude:"12.9290985",
    longitude:"77.6210238"
  };
  $scope.mapenable=false;
  // setting map based on venue address
  $scope.maploction=function(newValues){
   $scope.address='';
      var f=0;
      for(var i=0; i<newValues.length;i++){
        if(newValues[i]!= undefined && newValues[i] !=''){
          f++;
          $scope.address =$scope.address+newValues[i]+",";
        }
      }
      if($scope.addrline2== undefined || $scope.addrline2 =='' || $scope.addrline2 == null)
        f++;
      if(($scope.states.length<=0 && ($scope.state == '' || $scope.state == undefined)))
        f++;
      if(f<7){
        $scope.mapenable=true;
      }else if(f>=7){
        $scope.mapenable=true;
      }
      /*if($scope.address==''){
         $scope.searchloc={
          latitude:"12.9290985",
          longitude:"77.6210238",
          zoom:15
          };
      }else*/ if($scope.mapenable){
        // $scope.address="Adlux International Convention & Exhibition Centre, Cable Junction, National Highway 47, Karukutty, Kerala 683576";
        $scope.geocoder = new google.maps.Geocoder();
        $scope.geocoder.geocode( { 'address': $scope.address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $scope.searchloc={
              latitude:results[0].geometry.location.lat(),
              longitude:results[0].geometry.location.lng(),
              zoom:15
            };
            // console.log(results[0].geometry,status);
          }else{
            // console.log(status)
          } 
        });
      } 
  };
  // watching venue change and setting map
  $scope.$watchCollection('[venu,addrline1,addrline2,venucity,state,venupincode]', function(newValues){
    var loc=[];
    loc.push($scope.venu);
    loc.push($scope.addrline1);
    loc.push($scope.addrline2);
    loc.push($scope.venucity);
    loc.push($scope.state);
    loc.push($scope.country.name);
    loc.push($scope.venupincode);
     $scope.maploction(loc); 
  });    
  // editing location
  // index db start
  if(redirection!=null && redirection.locManual && !redirection.locmanualPlace){
      window.location="/dashboard";
  }
  else if(redirection!=null && redirection.locManual && redirection.locmanualPlace){  
      $scope.showMap = true;
      $scope.eventInformation = [];
      $scope.keyVal = [];
      var countUp = function(){
        $scope.timeInMs+= 500;
        $timeout(countUp, 500);  
      }
      $timeout(countUp, 500);
      var request = window.indexedDB.open("yaraDB9.db",1);
      request.onsuccess = function(event){
        $scope.db=event.target.result;
        // console.log("db created success");
        $scope.getAllinfo();
      };
      request.onerror = function(event){
            console.log("error");
      };
      request.onupgradeneeded = function(event){
          // console.log("new db");
       $scope.db=event.target.result;
       $scope.db.createObjectStore("locInfo", {keyPath: "itemId", autoIncrement: true});
      };
  }
  else{
      $scope.showMap = false;
      $timeout(function(){
         $('#venu').focus();
      },500);
  }
  $scope.getAllinfo=function(){
      var transaction =$scope.db.transaction(["locInfo"],"readonly");
      var objectStore = transaction.objectStore("locInfo");
      var request = objectStore.openCursor();
      request.onsuccess = function(event){
        var cursor = event.target.result;
        if(cursor) {
          $scope.eventInformation.push(cursor.value);
          cursor.continue();
        } else {
              // console.log("no more results");
        }
      };
      transaction.oncomplete = function (event){
        $scope.eventLoc = $scope.eventInformation[2].location;
        $scope.displayInfo();
      };
  };
  $scope.displayInfo = function(){
    $scope.countrydata=$filter('custom')($scope.countries,$scope.eventLoc.country);
    $scope.country=$scope.eventLoc.country;
    var countryInfo = {
      name:$scope.eventLoc.country,
      country_code:$scope.eventLoc.country_code
    };
    for (var i = $scope.countries.length - 1; i >= 0; i--) {
      if($scope.countries[i].name == $scope.eventLoc.country){
          $scope.countrySelection($scope.countries[i]);
          break;
      }
    };
    $scope.stateSelection($scope.eventLoc.state);
    $scope.addrline1 = $scope.eventLoc.addLine1;
    $scope.addrline2 = $scope.eventLoc.addLine2;
    $scope.venucity = $scope.eventLoc.city;
    $scope.venupincode = $scope.eventLoc.zipCode;
    $scope.venu = $scope.eventLoc.venu;
    // map in the manual page
    NgMap.getMap().then(
        function(map) {
          console.log("reach map");
        var markers = [];
        for (var i = 0; i < 1; i++) {
          markers[i] = new google.maps.Marker({ title: "Marker: " + i });
            var lat = $scope.eventLoc.geoloc.lat ;
            var lng =$scope.eventLoc.geoloc.lng;
            var loc = new google.maps.LatLng(lat, lng);
            markers[i].setPosition(loc);
            markers[i].setMap(map);
        }
    }, 1000);
  };
  //  end index db              
   // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// End manual location selection controller
// BreakSessionController
app.controller('BreakSessionController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','NgMap','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,NgMap,$rootScope){
    if(localStorage.getItem('bsession')==undefined){
       window.location="/events";
    }
    // get event details from local storage
    var selectedval=localStorage.getItem('selectedEventId');
    if(selectedval=== undefined || selectedval === null)
    {
         window.location.replace("/events");
    }
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.btnName = "Add Break Session";
    $scope.timeformat=localStorage.getItem('is_time_format_24');
    if ($scope.timeformat=='true') {
      $scope.is_time_format_24=true;
      $scope.timeformaType = "HH:mm";
    }else{
      $scope.is_time_format_24=false;
      $scope.timeformaType = "hh:mm A";
    }    
    //time offset 
    $scope.setOffset = function(d,offset){
      return GetDataService.userOffsetTime(d,offset);
    };
    document.title='YARA - '+$scope.currentval.short_name+' - Schedule';
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.notimeDiff = false;
    $scope.showTime=false;
    $scope.foodCpnEnable=1;
    var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
    var st_date=$filter('date')(s_date,'yyyy-MM-dd');
    var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
    $scope.dates={};
    $scope.dayscount=Object.keys($scope.currentval.days).length;
    var d = APPService.Dateslist(st_date,$scope.dayscount);
    $scope.service=APPService;
    $scope.eventDaysInfo = [];
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
    angular.forEach(d,function(d){
          angular.forEach($scope.eventDaysInfo,function(value,key){
            if(d==$scope.eventDaysInfo[key].date){
              $scope.dates[d]=$scope.eventDaysInfo[key];
            }
          });
    });
    var startdTime,endTime;
    angular.forEach($scope.currentval.days,function(value,key){
      if($scope.currentval.start_date==$scope.currentval.days[key].startTime)
      {
         startdTime = $scope.currentval.days[key].startTime;
         endTime = $scope.currentval.days[key].endTime;
      }
    });
    $scope.EvtStart=$scope.setOffset(startdTime,$scope.currentval.eo);
    $scope.EvtEnd=$scope.setOffset(endTime,$scope.currentval.eo);
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
    // $scope.getTickets();
    $scope.breakType='';
    // changing break type
    $scope.changeBreakType=function(c){
     $( ".timeline-break-type .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".breakType").show();
      if(c==''){
        $scope.breakType=c;
        $(".breakType").text('Select Break Type'); 
      }else{
      console.log(c);
        $scope.breakType=c.type_title;
        $scope.breakTypeInfo=c;
        $(".breakType").text(c.type_title); 
      } 
    };
     $(document).on('click','.timeline-break-type .primary_nav_wrap ul li',function(){
        $(".timeline-break-type img").removeClass();
        $(".timeline-break-type img").addClass('caret02'); 
        $( ".timeline-break-type .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
    });
    $document.on('click',function(event){
      var $trigger = $(".timeline-break-type .primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length){
             $( ".timeline-break-type .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
        });
           $(".timeline-break-type img").removeClass();
           $(".timeline-break-type img").addClass('caret01'); 
          }   
    });
    // Fetching all event locations if exists
    $scope.eventLocations = function(){
      // $('#loading').show();
      $scope.showLoc = false;
      GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
          if(res.result==1){
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.evtLoc=res.data;
              console.log($scope.evtLoc);
              if($scope.evtLoc.length>0)
              {
                $scope.showLoc = true;
                  // edit session
                  if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                    angular.forEach($scope.evtLoc,function(value,key){
                        if($scope.editSessInfo.location.location_code==$scope.evtLoc[key].location_code)
                        {
                            $scope.locationClick($scope.evtLoc[key]);
                            $scope.Bstarttime = $scope.setOffset($scope.editSessInfo.start_time, $scope.currentval.eo);
                            $scope.Bendtime = $scope.setOffset($scope.editSessInfo.end_time, $scope.currentval.eo);
                        }
                    });
                  }
                  // end edit session
              }
          }
          else{
              $('#loading').hide();
              $('#container').fadeIn();
              $scope.evtLoc=[];
              $scope.showLoc = false;
          }
      });
    };
    $scope.eventLocations();
    $scope.locationClick = function(el){
        $scope.spoLocation = el.location; 
        $scope.showLoclist=false;
    };
    $scope.isValidLoc=false;
    $scope.locValidation=function(locName){
      $scope.isValidLoc=false;
      $scope.isValidLoc = GetDataService.validateLocation(locName);
    };
    // create or edit break session
    $scope.createBreakSession = function(){
       $('#loading').show();
       $scope.existLocation=0;
        if($scope.showLoc){
            angular.forEach($scope.evtLoc,function(value,key){
                  if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                    $scope.existLocation=1;
                    $scope.locationCode=$scope.evtLoc[key].location_code
                  }
            });
        }
        var location = $scope.spoLocation;
        if($scope.existLocation==1){
          location = $scope.locationCode;
        }
        if($scope.breakTypeInfo.type_id==15){
          $scope.foodCpn=false;
        }
        if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined)
        {
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/break_session_edit/',
            data:{
              event_code: $scope.currentval.event_code,
              tittle:$scope.breakTypeInfo.type_id,
              location:location,
              is_location_exist:$scope.existLocation,
              start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
              end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
              include_coupon:$scope.foodCpn,
              session_code:$scope.editSessInfo.break_session_code,
              opp:'Edit',
              day_id:$scope.dayInfo.dayID
            }
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
              window.location = "/event/schedule";
              localStorage.setItem('tabcode',$scope.dayInfo.dayID);

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
        else{
              $http({
                method:'POST',
                url:YaraBaseUrl.url+'/break_session/',
                data:{
                  event_code: $scope.currentval.event_code,
                  tittle:$scope.breakTypeInfo.type_id,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
                  include_coupon:$scope.foodCpn,
                  day_id:$scope.dayInfo.dayID
                }
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
                   window.location = "/event/schedule"; 
                  localStorage.setItem('tabcode',$scope.dayInfo.dayID);
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
    // End create or edit break session
    // change day 
    $scope.changeSubtype=function(c){
      $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".subtitle").show();
      if(c==''){
        $scope.subtitle=c;
        $(".subtitle").text('Select Event Day'); 
      }else{
        $scope.showTime = true;
        $scope.subtitle=c.dayTitle;
        $scope.dayInfo = c;
        $scope.bsessionform.starttime.$untouched=false;
        $scope.bsessionform.endtime.$untouched=false;
        // $scope.starttime=$scope.Bstarttime=$scope.setOffset(c.startTime, $scope.currentval.eo);
        $scope.EvtEnd=$scope.setOffset(c.endTime, $scope.currentval.eo);
        var startTimeloc=$scope.setOffset(c.startTime, $scope.currentval.eo);
        var Localtime= $scope.setOffset($scope.localTimeNow,0);
        if (startTimeloc<Localtime) {
          var newLoctime = new Date(Localtime).setMinutes(Localtime.getMinutes()+5);
          newLoctime = new Date(newLoctime);
          if(newLoctime<$scope.EvtEnd){
            $scope.starttime=$scope.Bstarttime=newLoctime;
            $scope.EvtStart=newLoctime;
          }
          else{
            $scope.starttime=$scope.Bstarttime=Localtime;
            $scope.EvtStart=Localtime;
          }
        }else{
          $scope.starttime=$scope.Bstarttime=startTimeloc;
          $scope.EvtStart=startTimeloc;
        }
        $scope.endtime=$scope.Bendtime=$scope.setOffset(c.endTime, $scope.currentval.eo);
        // $scope.EvtStart=$scope.setOffset(c.startTime, $scope.currentval.eo);
        // console.log($scope.starttime);
        // console.log($scope.endtime);
        // console.log($scope.EvtStart);
        // console.log($scope.EvtEnd);
        $(".subtitle").text(c.dayTitle);
        // $scope.tracktitle='';
        // $(".tracktitle").text('Select Track');  
      } 
    };
    // get event day
    $scope.createSubtype=function(c){
      $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".subtitle").show();
      if(c==''){
        $scope.subtitle=c;
        $(".subtitle").text('Select Event Day'); 
      }else{
        $scope.showTime = true;
        $scope.subtitle=c.dayTitle;
        $scope.dayInfo = c;
        var stardate=new Date(c.startTime);
        var eddate=new Date(c.endTime);
        $scope.starttime=$scope.Bstarttime=stardate
        $scope.endtime=$scope.Bendtime=eddate
        $scope.EvtStart=stardate;
        $scope.EvtEnd=eddate;
        // console.log($scope.starttime);
        // console.log($scope.endtime);
        // console.log($scope.EvtStart);
        // console.log($scope.EvtEnd);
        $(".subtitle").text(c.dayTitle);
        // $scope.tracktitle='';
        // $(".tracktitle").text('Select Track');  
      } 
    };
    $(document).on('click','.timeline-event-day .primary_nav_wrap ul li',function(){
        $(".timeline-event-day img").removeClass();
        $(".timeline-event-day img").addClass('caret02'); 
        $( ".timeline-event-day .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
      });
    $document.on('click',function(event){
     var $trigger = $(".timeline-event-day .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".timeline-event-day img").removeClass();
         $(".timeline-event-day img").addClass('caret01'); 
        }   
    });
    // scroll to error position
    $scope.errorScroll =function(){
       $scope.reqEndtime = false;
       $scope.reqStarttime = false;
       $scope.notimeDiff = false;

       $timeout(function(){
         if($scope.subtitle=='' ||$scope.subtitle==undefined){
          APPService.scrollJquery('subtitleerr');
        }
        else if ($scope.bsessionform.starttime.$untouched) {
            $scope.reqStarttime = true;
            APPService.scrollJquery('starttime');
        }
        else if ($scope.bsessionform.endtime.$untouched) 
        {
              $scope.reqEndtime = true;
              APPService.scrollJquery('endtime');
        }
        // else if($scope.reqStarttime==false && $scope.reqEndtime==false && $scope.diffTime()==true){
        //    $scope.notimeDiff = true;
        //    APPService.scrollJquery('timediff');
        // }
      },100);
    };
    // dst check
    $scope.dstapp=false; 
    $scope.$watchCollection('[Bstarttime,Bendtime]', function(newValues){
            // -------------- DST CHECK------
               var timestamp = Math.round(new Date($scope.Bstarttime).getTime()/1000.0);
               var lat = $scope.currentval.latitude;
               var lng = $scope.currentval.longitude;
               var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          

               $.getJSON(url, function (data) {
                        console.log(data);
                        if (data.dstOffset!=0 &&  data.dstOffset!=undefined)
                        {
                          $scope.dstapp=true;
                        }
               });
            //----------------DST CHECK END----
            if (localStorage.getItem('editSession')==undefined) {
                for (var i = $scope.breakTypes.length - 1; i >= 0; i--) {
                        if($scope.breakTypes[i].start_time!=null && $scope.breakTypes[i].end_time!=null){
                            var startTime = $scope.breakTypes[i].start_time.split(":");
                            var endTime   = $scope.breakTypes[i].end_time.split(":");
                            if(($scope.Bstarttime.getHours()*60+$scope.Bstarttime.getMinutes())>=(parseInt(startTime[0])*60+parseInt(startTime[1])) &&  ($scope.Bendtime.getHours()*60+$scope.Bendtime.getMinutes())<=(parseInt(endTime[0])*60+parseInt(endTime[1])) ){
                                console.log($scope.breakTypes[i]);
                                $scope.changeBreakType($scope.breakTypes[i]);
                                break;
                            }
                        }
                 }; 
            }       

    })

    // Checking the selscted location contain any other session in the selected time  
    $scope.$watchCollection('[dayInfo,Bstarttime,Bendtime,spoLocation,breakType]', function(newValues){
      $scope.locationExist=0;
      $scope.time_conflict=0;
      $scope.locCode = '';
      // console.log( $scope.Bstarttime);
      if($scope.Bendtime>$scope.EvtEnd){
        $scope.Bendtime=$scope.EvtEnd;
      }
      if($scope.spoLocation!=undefined){
            angular.forEach($scope.evtLoc,function(value,key){
                  if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                    $scope.locationExist=1;
                    // $scope.locationKey=key;
                    $scope.locCode = $scope.evtLoc[key].location_code;
                  }
            });
      }
      $scope.notimeDiff = false;
      $scope.notimeDiff1 = false;
      if( $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false){
            if($scope.Bstarttime.getHours()== $scope.Bendtime.getHours() ){
              var diff = $scope.Bendtime.getMinutes() - $scope.Bstarttime.getMinutes();
              if(diff<0){
                $scope.notimeDiff1 = true;
              }
              else if(diff<5 && diff>=0){
                  $scope.notimeDiff = true;
              }
            }
            else if ($scope.Bstarttime.getHours()>$scope.Bendtime.getHours()) {
             $scope.notimeDiff1 = true;
            }
       }
      // auto selection of break type
      if( $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false)
       {
          var hourSt=$scope.Bstarttime.getHours();
          var minSt=$scope.Bstarttime.getMinutes();
          var hourEnd=$scope.Bendtime.getHours();
          var minEnd=$scope.Bendtime.getMinutes();
       } 
      // end auto selection of break type
      // console.log(selSpeakers.length);
      // 
      if($scope.locationExist==1 && $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false && $scope.breakType!=undefined){
          $('#loading').show();
          var break_session_code = null;
          if(localStorage.getItem('sessId')!=undefined){
              break_session_code = localStorage.getItem('sessId')
          }
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/location_validate/',
            data:{
                event_code:$scope.currentval.event_code,
                location_code:$scope.locCode,
                start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
                end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
                for:'Break_Session',
                break_session_code:break_session_code,
                day_id:$scope.dayInfo.dayID

              }
          }).then(function success(response){
            $('#loading').hide();
            $('#container').fadeIn();
            if(response.data.result==1 ){
                    $scope.location_conflicts = response.data.location_conflicts;
            }else if(response.data.result==0){
                    $scope.time_conflict = response.data.time_conflict;
                    $scope.showerror = response.data.message;
            }
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

      }
    });
    // End checking the selscted location contain any other session in the selected time  
    $scope.cancelSessionCreation = function(){
          localStorage.removeItem('bsession');
          localStorage.removeItem('session');
          window.location = "/event/schedule";
    };
    $(window).click(function() {
       if($scope.showLoclist==true){
         $scope.showLoclist = false;
         $("#locationdropdown").hide();
       }          
    });
    $('#location_id').click(function(event){
      event.stopPropagation();
      $("#locationdropdown").show();
    });
    $('#locationinputid').on('input', function() {
    $("#locationdropdown").show();
    });
    $scope.addFoodCoupon = function(fc){
      if(fc!=undefined){
        $scope.foodCpnEnable=fc;
      }
      if($scope.foodCpnEnable==1){
          $scope.foodCpnEnable=0;
          $scope.foodCpn=false;

      }
      else{
          $scope.foodCpnEnable=1;
          $scope.foodCpn=true;                
      }
    };
    $scope.getBsessionRequirements = function() {
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
            $('#loading').show();
            if (res.result == 1) {
                $scope.localTimeNow=res.local_time_now;
                GetDataService.getBreaktypes().then(function(res) {
                    if(res.result==1){
                          // $('#loading').hide();
                          // $('#container').fadeIn();
                          // ---------------- break session -   -----
                          $scope.breakTypes = res.break_types; 
                          // ---------------- end break session -----
                          $scope.dateset=JSON.parse(localStorage.getItem('eventdayid'));
                          if($scope.dateset==null|| $scope.dateset==undefined){
                                   window.location = "/event/schedule";
                          }
                          if (localStorage.getItem('editSession')=="true") {
                                  var  param = {
                                      session_code:localStorage.getItem('sessId'),
                                      event_code:$scope.currentval.event_code
                                  };
                                  GetDataService.getbrkSessionInfo(param).then(function(res){
                                      if(res.result==1){
                                            $scope.editSessInfo = res.break_sessions;
                                            if($scope.editSessInfo.include_coupon==true){
                                                  $scope.foodCpnEnable=0;
                                            }
                                            else{
                                                  $scope.foodCpnEnable=1;
                                            }
                                            $scope.addFoodCoupon($scope.foodCpnEnable);
                                            angular.forEach($scope.currentval.days,function(value,key){
                                                if($scope.currentval.days[key].dayID ==$scope.editSessInfo.day_id ){
                                                    $scope.changeSubtype($scope.currentval.days[key]);
                                                }
                                            });
                                            // eidt session
                                            if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                                              angular.forEach($scope.breakTypes,function(value,key){
                                                  if($scope.editSessInfo.tittle.toLowerCase()==$scope.breakTypes[key].type_title.toLowerCase())
                                                  {   
                                                       $scope.changeBreakType($scope.breakTypes[key]);
                                                  }
                                              });
                                            }
                                            // end edit session
                                            $scope.eventLocations();
                                            $scope.btnName = "Update Break Session";
                                      }
                                  });
                          }
                          else{
                                  $scope.addFoodCoupon();
                                  angular.forEach($scope.currentval.days,function(value,key){
                                      if($scope.currentval.days[key].dayID ==$scope.dateset.dayID ){
                                          $scope.changeSubtype($scope.currentval.days[key]);
                                      }
                                  });
                                  $scope.eventLocations();
                          }
                          
                    }
                });
            }    
      }); 
    };
    $scope.getBsessionRequirements();
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
// End BreakSessionController
//Schedule controller
app.controller('CollabratorScheduleController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpDatePicker','$mdpTimePicker','$interval','$timeout','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpDatePicker,$mdpTimePicker,$interval,$timeout,$rootScope,$anchorScroll){
  $scope.dashboardsUrl = GetDataService.dashboardUrl();
  $scope.headerTitle="Schedule";
  // if(localStorage.getItem('session')=='true' || localStorage.getItem('bsession')=='true'){
  //       localStorage.removeItem('bsession');
  //       localStorage.removeItem('session');
  //       window.location = "/dashboard";
  // }
  //getting selected event data from local data
  var selectedval=localStorage.getItem('selectedEventId');
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  }
  if(selectedval=== undefined || selectedval === null)
  {
        window.location.replace("/collaborator-dashboard");
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.checkdate=function (st, ed, off) {
    return GetDataService.startend(st, ed, off);
  };
  localStorage.removeItem('sessId');
  localStorage.removeItem('editSession');
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  };
  //time offset 
  $scope.setOffset = function(d,offset){
    return GetDataService.userOffsetTime(d,offset);
  };
  //local timing
  $scope.getLocaltime = function() {
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
          if (res.result == 1) {
              $scope.localTimeNow=res.local_time_now;
          }
      });
  };
  $scope.getLocaltime();
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
        is_day_active:$scope.currentval.days[key].is_day_active,
        endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
        startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
        date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
      };             
      $scope.eventDaysInfo.push(eventDaysInfo);
  });
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
  // list sessions and break sessions
  $scope.listallSessions = function(){
    $('#loading').show();
      var  param = {
          bs:1,
          event_code:$scope.currentval.event_code
      };
      GetDataService.getallSessions(param).then(function(res){
          $scope.sessionList = [];
          if(res.result==1){
            $scope.eo = res.eo;
            var sessions = res.sessions;
            angular.forEach(sessions,function(value,key){
                if(sessions[key].session_type ==true){
                      var sessionInfo = {
                          created_at:sessions[key].created_at,
                          created_by:sessions[key].created_by,
                          day_id:sessions[key].day_id,
                          description:sessions[key].description,
                          end_time:sessions[key].end_time,
                          eo:sessions[key].eo,
                          file_bank:sessions[key].file_bank,
                          is_speaker_engage:sessions[key].is_speaker_engage,
                          like_count:sessions[key].like_count,
                          location:sessions[key].location,
                          session_code:sessions[key].session_code,
                          session_type:sessions[key].session_type,
                          speakers:sessions[key].speakers,
                          sponsors:sessions[key].sponsors,
                          start_time:sessions[key].start_time,
                          tittle:sessions[key].tittle,
                          is_started:sessions[key].is_started,
                          track:sessions[key].track,
                          uploaded_file_size:sessions[key].uploaded_file_size,
                          sDate:$filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'EEEE,  MMMM d  y'),
                          timeFrom:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'h:mm a')),                          
                          timeTo:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'h:mm a'))
                      };
                      $scope.sessionList.push(sessionInfo);
                }
                else{
                      var sessionInfo = {
                          created_at:sessions[key].created_at,
                          created_by:sessions[key].created_by,
                          day_id:sessions[key].day_id,
                          end_time:sessions[key].end_time,
                          include_coupon:sessions[key].include_coupon,
                          location:sessions[key].location,
                          session_code:sessions[key].session_code,
                          session_type:sessions[key].session_type,
                          speakers:sessions[key].speakers,
                          sponsors:sessions[key].sponsors,
                          start_time:sessions[key].start_time,
                          tittle:sessions[key].tittle,
                          is_started:sessions[key].is_started,
                          sDate:$filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'EEEE,  MMMM d  y'),
                          timeFrom:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].start_time,$scope.currentval.eo),'h:mm a')),                          
                          timeTo:$scope.is_time_format_24?($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'H:mm')):($filter('date')($scope.setOffset(sessions[key].end_time,$scope.currentval.eo),'h:mm a'))
                      };
                      $scope.sessionList.push(sessionInfo);
                }
            }); 
           $('#loading').hide();
           $('#container').fadeIn();
          }
      });
  };
  $scope.listallSessions();
  // sorting 
  $scope.sort='';
  $scope.sorting = function(type){
    if(type==0){
        $scope.sort='';
        $anchorScroll();
    }
    else{
        $scope.sort='tittle';
        $anchorScroll();
    }
  };
  // pop up delete session
  $scope.popUp = function(sessionInfo,type)
  {
      $scope.sessionInfo = sessionInfo;
      $scope.sType = type;
  };
  // remove sessions
  $scope.sessiondelete=function (sessionCode,type,title) {
    $scope.sessioncode=sessionCode;
    $scope.sessiontype=type;
    $scope.sessiontitle=title;
  };
  $scope.breaksession=function(sessionCode,type,title) {
    $scope.sessioncode=sessionCode;
    $scope.sessiontype=type;
    $scope.sessiontitle=title;
  };
  $scope.removeSession = function(){
      if($scope.sessiontype==1){
            $('#loading').show();
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session_edit/',
              data:{
                  session_code:$scope.sessioncode,
                  opp:'Delete'
                }
            }).then(function success(response){
              console.log(response);
              if(response.data.result==1 ){
                  $('#schedule-revoke').modal('hide');
                  $scope.listallSessions();
                  $('#loading').hide();
                  $('#container').fadeIn();
              }else if(response.data.result==0){
                   

              }
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
      }
      else if($scope.sessiontype==0)
      {
            $('#loading').show();
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/break_session_edit/',
              data:{
                  session_code:$scope.sessioncode,
                  opp:'Delete'
                }
            }).then(function success(response){
              if(response.data.result==1 ){
                  $('#loading').hide();
                  $('#container').fadeIn();
                  $scope.listallSessions();
                  $('#schedule-revoke').modal('hide');
              }else if(response.data.result==0){
             }
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
              $('#loading').hide();
              $('#container').fadeIn();
      }
  };
  // select day tab
  $scope.selecttab = function(d){
    $('#loading').show();
    $scope.seltab=d.dayID;
    $scope.expday=d.is_day_active;
    localStorage.setItem("eventdayid",JSON.stringify(d));
    $timeout(function(){
      $('#loading').hide();
      $('#container').fadeIn();
    }, 1500);
  };
  // day slider
  if(localStorage.getItem('eventdayid') != undefined) {
      var eventDayinfo = JSON.parse(localStorage.getItem('eventdayid'));
      $scope.seldat=false;
      for (var i = 0; i < $scope.eventDaysInfo.length; i++) {
          if ($scope.eventDaysInfo[i].dayID == eventDayinfo.dayID) {
              $scope.selecttab(eventDayinfo);
              $scope.seldat=true;
              $scope.movebutton=i;
          }
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
      if ($scope.seldat=false) {
        $scope.seltab = $scope.eventDaysInfo[0].dayID;
        $scope.expday = $scope.eventDaysInfo[0].is_day_active;
      }
  } 
  else {
      $scope.seltab = $scope.eventDaysInfo[0].dayID;
      $scope.expday = $scope.eventDaysInfo[0].is_day_active;
      localStorage.setItem("eventdayid", JSON.stringify($scope.eventDaysInfo[0]));
  }
  // edit session
  $scope.editSessionInfo = function(sessInfo,editType){
    localStorage.setItem("sessId",sessInfo.session_code);
    localStorage.setItem("editSession",true);
    if(editType==1){
      localStorage.setItem('session',true);
      window.location="/collaborator/schedule-session";
    }
    else if(editType==0)
    {
      localStorage.setItem('bsession',true);
      window.location="/collaborator/schedule-break-session";
    }
  };
  $scope.getTracks=function(){
    GetDataService.getTracks().then(function(res){
       if(res.result==1){
        $scope.tracks=res.tracks;
      }
    });
  };
  // To add sessions
  $scope.sessionAdd = function(type){
    if(type==1){
        localStorage.removeItem('bsession');
        localStorage.setItem('session',true);
        window.location="/collaborator/schedule-session"
    }
    else{
          localStorage.removeItem('session');
          localStorage.setItem('bsession',true);
          window.location="/collaborator/schedule-break-session"
    }
  };
  //fetching tickets
  $scope.getTickets=function(){
    // $('#loading').show();
      GetDataService.getTickets($scope.currentval.event_code).then(function(res){
        if(res.result==1){
          $scope.ticketsdata=res.tickets;
          $scope.firsTicketname = $scope.ticketsdata[0].name;
        }
      });
    // $('#loading').hide();
    // $('#container').fadeIn();
  };       
  $scope.getTickets();
  // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);
// CollabratorBreakSessionController
app.controller('CollabratorBreakSessionController',['$scope','$document','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker','$window','NgMap','$rootScope',function($scope,$document,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker,$window,NgMap,$rootScope){
    // get event details from local storage
    var selectedval=localStorage.getItem('selectedEventId');
    if(selectedval=== undefined || selectedval === null)
    {
         window.location.replace("/collaborator-dashboard");
    }
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.btnName = "Add Break Session";
    $scope.timeformat=localStorage.getItem('is_time_format_24');
    if ($scope.timeformat=='true') {
      $scope.is_time_format_24=true;
      $scope.timeformaType = "HH:mm";
    }else{
      $scope.is_time_format_24=false;
      $scope.timeformaType = "hh:mm A";
    }
    //time offset 
    $scope.setOffset = function(d,offset){
      return GetDataService.userOffsetTime(d,offset);
    };
    document.title='YARA - '+$scope.currentval.short_name+' - Schedule';
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    $scope.notimeDiff = false;
    $scope.showTime=false;
    $scope.foodCpnEnable=1;
    var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
    var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
    var st_date=$filter('date')(s_date,'yyyy-MM-dd');
    var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
    $scope.dates={};
    $scope.dayscount=Object.keys($scope.currentval.days).length;
    var d = APPService.Dateslist(st_date,$scope.dayscount);
    $scope.service=APPService;
    $scope.eventDaysInfo = [];
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
    angular.forEach(d,function(d){
          angular.forEach($scope.eventDaysInfo,function(value,key){
            if(d==$scope.eventDaysInfo[key].date){
              $scope.dates[d]=$scope.eventDaysInfo[key];
            }
          });
    });
    var startdTime,endTime;
    angular.forEach($scope.currentval.days,function(value,key){
      if($scope.currentval.start_date==$scope.currentval.days[key].startTime)
      {
         startdTime = $scope.currentval.days[key].startTime;
         endTime = $scope.currentval.days[key].endTime;
      }
    });
    $scope.EvtStart=$scope.setOffset(startdTime,$scope.currentval.eo);
    $scope.EvtEnd=$scope.setOffset(endTime,$scope.currentval.eo);
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
    // $scope.getTickets();
    $scope.breakType='';
    // changing break type
    $scope.changeBreakType=function(c){
     $( ".timeline-break-type .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".breakType").show();
      if(c==''){
        $scope.breakType=c;
        $(".breakType").text('Select Break Type'); 
      }else{
      console.log(c);
        $scope.breakType=c.type_title;
        $scope.breakTypeInfo=c;
        $(".breakType").text(c.type_title); 
      } 
    };
     $(document).on('click','.timeline-break-type .primary_nav_wrap ul li',function(){
        $(".timeline-break-type img").removeClass();
        $(".timeline-break-type img").addClass('caret02'); 
        $( ".timeline-break-type .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
    });
    $document.on('click',function(event){
      var $trigger = $(".timeline-break-type .primary_nav_wrap ul li");
          if($trigger !== event.target && !$trigger.has(event.target).length){
             $( ".timeline-break-type .primary_nav_wrap ul li ul").hide({
            display:'none',
            color: 'none',
            background: '#fff',
            'z-index':100
        });
           $(".timeline-break-type img").removeClass();
           $(".timeline-break-type img").addClass('caret01'); 
          }   
    });
    // Fetching all event locations if exists
    $scope.eventLocations = function(){
      // $('#loading').show();
      $scope.showLoc = false;
        GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $('#loading').hide();
                $('#container').fadeIn();
                $scope.evtLoc=res.data;
                console.log($scope.evtLoc);
                if($scope.evtLoc.length>0)
                {
                  $scope.showLoc = true;
                    // edit session
                    if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                      angular.forEach($scope.evtLoc,function(value,key){
                          if($scope.editSessInfo.location.location_code==$scope.evtLoc[key].location_code)
                          {
                              $scope.locationClick($scope.evtLoc[key]);
                              $scope.Bstarttime = $scope.setOffset($scope.editSessInfo.start_time, $scope.currentval.eo);
                              $scope.Bendtime = $scope.setOffset($scope.editSessInfo.end_time, $scope.currentval.eo);
                          }
                      });
                    }
                    // end edit session
                }
            }
            else{
                 $scope.showLoc = false;
                 $scope.evtLoc=[];
                 $('#loading').hide();
                 $('#container').fadeIn();
            }
        });
    };
    $scope.eventLocations();
    $scope.locationClick = function(el){
        $scope.spoLocation = el.location; 
        $scope.showLoclist=false;
    };
    $scope.isValidLoc=false;
    $scope.locValidation=function(locName){
      $scope.isValidLoc=false;
      $scope.isValidLoc = GetDataService.validateLocation(locName);
    };
    // create or edit break session
    $scope.createBreakSession = function(){
       $('#loading').show();
       $scope.existLocation=0;
        if($scope.showLoc){
            angular.forEach($scope.evtLoc,function(value,key){
                  if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                    $scope.existLocation=1;
                    $scope.locationCode=$scope.evtLoc[key].location_code
                  }
            });
        }
        var location = $scope.spoLocation;
        if($scope.existLocation==1){
          location = $scope.locationCode;
        }
        if($scope.breakTypeInfo.type_id==15){
          $scope.foodCpn=false;
        }
        if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined)
        {
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/break_session_edit/',
            data:{
              event_code: $scope.currentval.event_code,
              tittle:$scope.breakTypeInfo.type_id,
              location:location,
              is_location_exist:$scope.existLocation,
              start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
              end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
              include_coupon:$scope.foodCpn,
              session_code:$scope.editSessInfo.break_session_code,
              opp:'Edit',
              day_id:$scope.dayInfo.dayID
            }
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
              window.location = "/collaborator/schedule";
              localStorage.setItem('tabcode',$scope.dayInfo.dayID);

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
        else{
              $http({
                method:'POST',
                url:YaraBaseUrl.url+'/break_session/',
                data:{
                  event_code: $scope.currentval.event_code,
                  tittle:$scope.breakTypeInfo.type_id,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
                  include_coupon:$scope.foodCpn,
                  day_id:$scope.dayInfo.dayID
                }
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
                   window.location = "/collaborator/schedule"; 
                  localStorage.setItem('tabcode',$scope.dayInfo.dayID);
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
    // End create or edit break session
    // change day 
    $scope.changeSubtype=function(c){
      $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".subtitle").show();
      if(c==''){
        $scope.subtitle=c;
        $(".subtitle").text('Select Event Day'); 
      }else{
        $scope.showTime = true;
        $scope.subtitle=c.dayTitle;
        $scope.dayInfo = c;
        $scope.bsessionform.starttime.$untouched=false;
        $scope.bsessionform.endtime.$untouched=false;
        $scope.EvtEnd=$scope.setOffset(c.endTime, $scope.currentval.eo);
        // $scope.starttime=$scope.Bstarttime=$scope.setOffset(c.startTime, $scope.currentval.eo);
        var startTimeloc=$scope.setOffset(c.startTime, $scope.currentval.eo);
        var Localtime= $scope.setOffset($scope.localTimeNow,0);
        if (startTimeloc<Localtime) {
            var newLoctime = new Date(Localtime).setMinutes(Localtime.getMinutes()+5);
            newLoctime = new Date(newLoctime);
            if(newLoctime<$scope.EvtEnd){
              $scope.starttime=$scope.Bstarttime=newLoctime;
              $scope.EvtStart=newLoctime;
            }
            else{
              $scope.starttime=$scope.Bstarttime=Localtime;
              $scope.EvtStart=Localtime;
            }
        }else{
          $scope.starttime=$scope.Bstarttime=startTimeloc;
          $scope.EvtStart=startTimeloc;
        }
        $scope.endtime=$scope.Bendtime=$scope.setOffset(c.endTime, $scope.currentval.eo);
        // $scope.EvtStart=$scope.setOffset(c.startTime, $scope.currentval.eo);
        // console.log($scope.starttime);
        // console.log($scope.endtime);
        // console.log($scope.EvtStart);
        // console.log($scope.EvtEnd);
        $(".subtitle").text(c.dayTitle);
        // $scope.tracktitle='';
        // $(".tracktitle").text('Select Track');  
      } 
    };
    // get event day
    $scope.createSubtype=function(c){
      $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
      display:'none',
      color: 'none',
      background: '#fff',
      'z-index':100
     });
        $(".subtitle").show();
      if(c==''){
        $scope.subtitle=c;
        $(".subtitle").text('Select Event Day'); 
      }else{
        $scope.showTime = true;
        $scope.subtitle=c.dayTitle;
        $scope.dayInfo = c;
        var stardate=new Date(c.startTime);
        var eddate=new Date(c.endTime);
        $scope.starttime=$scope.Bstarttime=stardate
        $scope.endtime=$scope.Bendtime=eddate
        $scope.EvtStart=stardate;
        $scope.EvtEnd=eddate;
        // console.log($scope.starttime);
        // console.log($scope.endtime);
        // console.log($scope.EvtStart);
        // console.log($scope.EvtEnd);
        $(".subtitle").text(c.dayTitle);
        // $scope.tracktitle='';
        // $(".tracktitle").text('Select Track');  
      } 
    };
    $(document).on('click','.timeline-event-day .primary_nav_wrap ul li',function(){
        $(".timeline-event-day img").removeClass();
        $(".timeline-event-day img").addClass('caret02'); 
        $( ".timeline-event-day .primary_nav_wrap ul li ul").css({
          display:'list-item',
          color: '#000',
          'z-index':100
        });
      });
    $document.on('click',function(event){
     var $trigger = $(".timeline-event-day .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
           $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".timeline-event-day img").removeClass();
         $(".timeline-event-day img").addClass('caret01'); 
        }   
    });
    // scroll to error position
    $scope.errorScroll =function(){
       $scope.reqEndtime = false;
       $scope.reqStarttime = false;
       $scope.notimeDiff = false;

       $timeout(function(){
         if($scope.subtitle=='' ||$scope.subtitle==undefined){
          APPService.scrollJquery('subtitleerr');
        }
        else if ($scope.bsessionform.starttime.$untouched) {
            $scope.reqStarttime = true;
            APPService.scrollJquery('starttime');
        }
        else if ($scope.bsessionform.endtime.$untouched) 
        {
              $scope.reqEndtime = true;
              APPService.scrollJquery('endtime');
        }
        // else if($scope.reqStarttime==false && $scope.reqEndtime==false && $scope.diffTime()==true){
        //    $scope.notimeDiff = true;
        //    APPService.scrollJquery('timediff');
        // }
      },100);
    };
    // dst check
    $scope.dstapp=false; 
    $scope.$watchCollection('[Bstarttime,Bendtime]', function(newValues){
            var timestamp = Math.round(new Date($scope.Bstarttime).getTime()/1000.0);
            var lat = $scope.currentval.latitude;
            var lng = $scope.currentval.longitude;
            var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          

            $.getJSON(url, function (data) {
                    console.log(data);
                    if (data.dstOffset!=0 &&  data.dstOffset!=undefined)
                    {
                      $scope.dstapp=true;
                    }
            });
            //----------------DST CHECK END----
            if (localStorage.getItem('editSession')==undefined) {
                for (var i = $scope.breakTypes.length - 1; i >= 0; i--) {
                        if($scope.breakTypes[i].start_time!=null && $scope.breakTypes[i].end_time!=null){
                            var startTime = $scope.breakTypes[i].start_time.split(":");
                            var endTime   = $scope.breakTypes[i].end_time.split(":");
                            if(($scope.Bstarttime.getHours()*60+$scope.Bstarttime.getMinutes())>=(parseInt(startTime[0])*60+parseInt(startTime[1])) &&  ($scope.Bendtime.getHours()*60+$scope.Bendtime.getMinutes())<=(parseInt(endTime[0])*60+parseInt(endTime[1])) ){
                                console.log($scope.breakTypes[i]);
                                $scope.changeBreakType($scope.breakTypes[i]);
                                break;
                            }
                        }
                 }; 
            }  
    });    
    // Checking the selscted location contain any other session in the selected time  
    $scope.$watchCollection('[dayInfo,Bstarttime,Bendtime,spoLocation,breakType]', function(newValues){
      $scope.locationExist=0;
      $scope.time_conflict=0;
      $scope.locCode ="";
      if($scope.Bendtime>$scope.EvtEnd){
        $scope.Bendtime=$scope.EvtEnd;
      }
      if($scope.spoLocation!=undefined){
            angular.forEach($scope.evtLoc,function(value,key){
                  if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                    $scope.locationExist=1;
                    // $scope.locationKey=key;
                    $scope.locCode = $scope.evtLoc[key].location_code;
                  }
            });
      }
      $scope.notimeDiff = false;
      $scope.notimeDiff1 = false;
      if( $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false){
            if($scope.Bstarttime.getHours()== $scope.Bendtime.getHours() ){
              var diff = $scope.Bendtime.getMinutes() - $scope.Bstarttime.getMinutes();
              if(diff<0){
                $scope.notimeDiff1 = true;
              }
              else if(diff<5 && diff>=0){
                  $scope.notimeDiff = true;
              }
            }
            else if ($scope.Bstarttime.getHours()>$scope.Bendtime.getHours()) {
             $scope.notimeDiff1 = true;
            }
       }
      // auto selection of break type
      if( $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false)
       {
          var hourSt=$scope.Bstarttime.getHours();
          var minSt=$scope.Bstarttime.getMinutes();
          var hourEnd=$scope.Bendtime.getHours();
          var minEnd=$scope.Bendtime.getMinutes();
       } 
      // end auto selection of break type
      // console.log(selSpeakers.length);
      // 
      if($scope.locationExist==1 && $scope.dayInfo!=undefined && $scope.bsessionform.starttime.$untouched==false && $scope.bsessionform.endtime.$untouched==false && $scope.breakType!=undefined){
          var break_session_code = null;
          $('#loading').show();
          if(localStorage.getItem('sessId')!=undefined){
              break_session_code = localStorage.getItem('sessId')
          }
          $http({
            method:'POST',
            url:YaraBaseUrl.url+'/location_validate/',
            data:{
                event_code:$scope.currentval.event_code,
                location_code:$scope.locCode,
                start_time:moment($scope.Bstarttime).format("YYYY-MM-DD HH:mm"),
                end_time:moment($scope.Bendtime).format("YYYY-MM-DD HH:mm"),
                for:'Break_Session',
                break_session_code:break_session_code,
                day_id:$scope.dayInfo.dayID

              }
          }).then(function success(response){
            $('#loading').hide();
            $('#container').fadeIn();
            if(response.data.result==1 ){
                    $scope.location_conflicts = response.data.location_conflicts;
            }else if(response.data.result==0){
                    $scope.time_conflict = response.data.time_conflict;
                    $scope.showerror = response.data.message;
            }
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

      }
    });
    // End checking the selscted location contain any other session in the selected time  
    $scope.cancelSessionCreation = function(){
          localStorage.removeItem('bsession');
          localStorage.removeItem('session');
          window.location = "/collaborator/schedule";
    };
    $(window).click(function() {
       if($scope.showLoclist==true){
         $scope.showLoclist = false;
         $("#locationdropdown").hide();
       }          
    });
    $('#location_id').click(function(event){
      event.stopPropagation();
      $("#locationdropdown").show();
    });
    $('#locationinputid').on('input', function() {
    $("#locationdropdown").show();
    });
    $scope.addFoodCoupon = function(fc){
      if(fc!=undefined){
        $scope.foodCpnEnable=fc;
      }
      if($scope.foodCpnEnable==1){
          $scope.foodCpnEnable=0;
          $scope.foodCpn=false;

      }
      else{
          $scope.foodCpnEnable=1;
          $scope.foodCpn=true;                
      }
    };
    $scope.getBsessionRequirements = function() {
      GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
            $('#loading').show();
            if (res.result == 1) {
                $scope.localTimeNow=res.local_time_now;
                GetDataService.getBreaktypes().then(function(res) {
                    if(res.result==1){
                          // $('#loading').hide();
                          // $('#container').fadeIn();
                          // ---------------- break session -   -----
                          $scope.breakTypes = res.break_types; 
                          // ---------------- end break session -----
                          $scope.dateset=JSON.parse(localStorage.getItem('eventdayid'));
                          if($scope.dateset==null|| $scope.dateset==undefined){
                                   window.location = "/collaborator/schedule";
                          }
                          if (localStorage.getItem('editSession')=="true") {
                                  var  param = {
                                      session_code:localStorage.getItem('sessId'),
                                      event_code:$scope.currentval.event_code
                                  };
                                  GetDataService.getbrkSessionInfo(param).then(function(res){
                                      if(res.result==1){
                                            $scope.editSessInfo = res.break_sessions;
                                            if($scope.editSessInfo.include_coupon==true){
                                                  $scope.foodCpnEnable=0;
                                            }
                                            else{
                                                  $scope.foodCpnEnable=1;
                                            }
                                            angular.forEach($scope.currentval.days,function(value,key){
                                                if($scope.currentval.days[key].dayID ==$scope.editSessInfo.day_id ){
                                                    $scope.changeSubtype($scope.currentval.days[key]);
                                                }
                                            });
                                            // eidt session
                                            if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                                              angular.forEach($scope.breakTypes,function(value,key){
                                                  if($scope.editSessInfo.tittle.toLowerCase()==$scope.breakTypes[key].type_title.toLowerCase())
                                                  {   
                                                       $scope.changeBreakType($scope.breakTypes[key]);
                                                  }
                                              });
                                            }
                                            // end edit session
                                            $scope.eventLocations();
                                            $scope.btnName = "Update Break Session";
                                      }
                                  });
                          }
                          else{
                                  $scope.addFoodCoupon();
                                  angular.forEach($scope.currentval.days,function(value,key){
                                      if($scope.currentval.days[key].dayID ==$scope.dateset.dayID ){
                                          $scope.changeSubtype($scope.currentval.days[key]);
                                      }
                                  });
                                  $scope.eventLocations();
                          }
                          
                    }
                });
            }    
      }); 
    };
    $scope.getBsessionRequirements();
    // not connected to internet
    if($rootScope.online == false){
      alert("You are not connected to internet");
    }
}]);
// End CollabratorBreakSessionController
// create CollabratorSessionController controller
app.controller('CollabratorSessionController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval','$timeout','$document','$rootScope',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval,$timeout,$document,$rootScope){
      if(localStorage.getItem('session')==undefined){
           window.location="/collaborator-dashboard";
      }
      // get event details from local storage
      var selectedval=localStorage.getItem('selectedEventId');
      if(selectedval=== undefined || selectedval === null)
      {
           window.location="/collaborator-dashboard";
      }
      $scope.selevntdata=localStorage.getItem('selEventsData');
      $scope.currentval=angular.fromJson($scope.selevntdata);
      $scope.btnName = "Add Session";
      $scope.timeformat=localStorage.getItem('is_time_format_24');
      if ($scope.timeformat=='true') {
        $scope.is_time_format_24=true;
        $scope.timeformaType = "HH:mm";
      }else{
        $scope.is_time_format_24=false;
        $scope.timeformaType = "hh:mm A";
      }
      //time offset 
      $scope.setOffset = function(d,offset){
        return GetDataService.userOffsetTime(d,offset);
      };
      $scope.selectedPermission=angular.fromJson(localStorage.getItem('selectedPermission'));
      $scope.peopleMange=false;
      $scope.sponserMangae=false
      for (var i = $scope.selectedPermission.length - 1; i >= 0; i--) {
        if($scope.selectedPermission[i].name=="People"){
          $scope.peopleMange=true;
        }
        if($scope.selectedPermission[i].name=="Sponsors"){
          $scope.sponserMangae=true;
        } 
      }
      $scope.specPeople = $scope.currentval.sp_people;
      $scope.convertingPeoplelist = $scope.specPeople;
      document.title='YARA - '+$scope.currentval.short_name+' - Schedule';
      var s_date = $scope.setOffset($scope.currentval.start_date,$scope.currentval.eo);
      var e_date = $scope.setOffset($scope.currentval.end_date,$scope.currentval.eo);
      var st_date=$filter('date')(s_date,'yyyy-MM-dd');
      var ed_date=$filter('date')(e_date,'yyyy-MM-dd');
      $scope.dates={};
      $scope.dayscount=Object.keys($scope.currentval.days).length;
      var d = APPService.Dateslist(st_date,$scope.dayscount);
      $scope.service=APPService;
      $scope.speakerEngage=false;
      $scope.notimeDiff = false;
      $scope.showTime=false;
      $scope.eventDaysInfo = [];
      angular.forEach($scope.currentval.days,function(value,key){
          var eventDaysInfo = {
            dayID:$scope.currentval.days[key].dayID,
            dayTitle:$scope.currentval.days[key].dayTitle,
            dstOffset:$scope.currentval.days[key].dstOffset,
            endTime:$scope.setOffset($scope.currentval.days[key].endTime,$scope.currentval.eo),
            startTime:$scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),
            date:$filter('date')($scope.setOffset($scope.currentval.days[key].startTime,$scope.currentval.eo),'yyyy-MM-dd')
          };
          $scope.eventDaysInfo.push(eventDaysInfo);
      });
      angular.forEach(d,function(d){
          angular.forEach($scope.eventDaysInfo,function(value,key){
            if(d==$scope.eventDaysInfo[key].date){
              $scope.dates[d]=$scope.eventDaysInfo[key];
            }
          });
      });
      var startdTime,endTime;
          angular.forEach($scope.currentval.days,function(value,key){

            if($scope.currentval.start_date==$scope.currentval.days[key].startTime)
            {
               startdTime = $scope.currentval.days[key].startTime;
               endTime = $scope.currentval.days[key].endTime;
            }
      });
      $scope.EvtStart=$scope.setOffset(startdTime,$scope.currentval.eo);
      $scope.EvtEnd=$scope.setOffset(endTime,$scope.currentval.eo);
      $scope.subtitle='';
      // select track
      $scope.tracktitle='';
      $scope.trackSelected=false;
      $scope.changeTrack=function(c){
       $( ".timeline-event-track .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: 'none',
        background: '#fff',
        'z-index':100
       });
          $(".tracktitle").show();
        if(c==''){
          $scope.tracktitle=c;
          $(".tracktitle").text('Select Track'); 
        }else{
          $scope.tracktitle=c.track_code;
          $scope.trackInfo=c;
          $scope.trackSelected=true;
          $(".tracktitle").text(c.name); 
        } 
      };
       $(document).on('click','.timeline-event-track .primary_nav_wrap ul li',function(){
          $(".timeline-event-track img").removeClass();
          $(".timeline-event-track img").addClass('caret02'); 
          $( ".timeline-event-track .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#000',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-track .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length){
               $( ".timeline-event-track .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: '#333',
              background: '#333',
              'z-index':100
          });
             $(".timeline-event-track img").removeClass();
             $(".timeline-event-track img").addClass('caret01'); 
            }   
      });
      // end select track
      // --------------------------------sponser-----------------
      $scope.changeSponser=function(c){
       $( ".timeline-event-sponser .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: '#333',
        background: '#333',
        'z-index':100
       });
          $(".sponsertitle").show();
        if(c==''){
          $scope.sponsertitle=c;
          $(".sponsertitle").text('Select sponser'); 
        }else{
          $scope.sponsertitle=c.sponsor_code;
          $scope.sponserInfo=c;
          console.log(c.name);
          $timeout(function() {
            $(".sponsertitle").text(c.name).addClass("color-black");
          }, 50);          
        } 
      };
       $(document).on('click','.timeline-event-sponser .primary_nav_wrap ul li',function(){
          $(".timeline-event-sponser img").removeClass();
          $(".timeline-event-sponser img").addClass('caret02'); 
          $( ".timeline-event-sponser .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#333',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-sponser .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length){
               $( ".timeline-event-sponser .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: '#333',
              // background: '#333',
              'z-index':100
          });
             $(".timeline-event-sponser img").removeClass();
             $(".timeline-event-sponser img").addClass('caret01'); 
            }   
      });
      // --------------------------------end sponser--------------------
      $scope.noSpeaker=false;
      // event_day_accessories
      $scope.selectspeaker=function(dayid,trackCode) {
        $scope.noSpeaker= false;
        $('#loading').show();
        var param = {
            item:'sp',
            day_id:dayid,
            track_code:trackCode
        };
       GetDataService.eventDayAccessories(param).then(function(res){
          if(res.result==1){
            $('#loading').hide();
            $('#container').fadeIn();
            $scope.SpkData=res.sp_data;
            var speakerDataIndex = [];
            if($scope.SpkData.length==0){
              $scope.noSpeaker= true;
            }
            //edit
            $scope.addedSpeker = [];
            if (localStorage.getItem('editSession') == "true" && $scope.editSessInfo != undefined && $scope.SpkData.length>0) {
                // console.log($scope.editSessInfo.speakers);
                angular.forEach($scope.SpkData, function(value, key) {
                    angular.forEach($scope.editSessInfo.speakers, function(v, k) {
                        if ($scope.editSessInfo.speakers[k].speaker_code == $scope.SpkData[key].delegate_code) {
                            $scope.addedSpeker.push($scope.SpkData[key]);
                            speakerDataIndex.push(key);
                        }

                    });
                });
                for (var i = speakerDataIndex.length - 1; i >= 0; i--) {
                          $scope.SpkData.splice(speakerDataIndex[i],1);
                };
            }
          }
       });
      };
      // --------------------------------selection of day--------------------
      $scope.changeSubtype=function(c){
       $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
        display:'none',
        color: 'none',
        background: '#fff',
        'z-index':100
       });
          $(".subtitle").show();
        if(c==''){
          $scope.subtitle=c;
          $(".subtitle").text('Select Event Day'); 
        }else{
          
          $scope.showTime=true;
          $scope.selectedDayinfo = c;
          $scope.subtitle=c.dayTitle;
          $scope.EvtEnd=$scope.setOffset(c.endTime, $scope.currentval.eo);
          var startTimeloc=$scope.setOffset(c.startTime, $scope.currentval.eo);
          var Localtime= $scope.setOffset($scope.localTimeNow,0);
          if (startTimeloc<Localtime) {
            // $scope.starttime=$scope.Bstarttime=Localtime;
            // $scope.EvtStart=Localtime;
              var newLoctime = new Date(Localtime).setMinutes(Localtime.getMinutes()+5);
              newLoctime = new Date(newLoctime);
              if(newLoctime<$scope.EvtEnd){
                $scope.starttime=$scope.Bstarttime=newLoctime;
                $scope.EvtStart=newLoctime;
              }
              else{
                $scope.starttime=$scope.Bstarttime=Localtime;
                $scope.EvtStart=Localtime;
              }
          }else{
            $scope.starttime=$scope.Bstarttime=startTimeloc;
            $scope.EvtStart=startTimeloc;
          }
          $scope.endtime=$scope.Bendtime=$scope.setOffset(c.endTime, $scope.currentval.eo);
          $(".subtitle").text(c.dayTitle);
          // $scope.tracktitle='';
          // $(".tracktitle").text('Select Track');  
          $scope.sessionform.starttime.$untouched=false;
          $scope.sessionform.endtime.$untouched=false;
        } 
        // $scope.selectspeaker(c.dayID);
      };
      $(document).on('click','.timeline-event-day .primary_nav_wrap ul li',function(){
          $(".timeline-event-day img").removeClass();
          $(".timeline-event-day img").addClass('caret02'); 
          $( ".timeline-event-day .primary_nav_wrap ul li ul").css({
            display:'list-item',
            color: '#000',
            'z-index':100
          });
      });
      $document.on('click',function(event){
        var $trigger = $(".timeline-event-day .primary_nav_wrap ul li");
            if($trigger !== event.target && !$trigger.has(event.target).length && $(".subtitlesearch").css('display')!='none'){
               $( ".timeline-event-day .primary_nav_wrap ul li ul").hide({
              display:'none',
              color: 'none',
              background: '#fff',
              'z-index':100
          });
             $(".timeline-event-day img").removeClass();
             $(".timeline-event-day img").addClass('caret01'); 
            }   
      });
      // --------------------------------end selection of day--------------------
      $scope.addtrack=function(form){
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
        if ($scope.invalidTrack==false) {
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
            $scope.trackname="";
            $scope.SelDaysTrack=[];
            $scope.getTracks($scope.eventDaysInfo[0].dayID);
            $('#add-new-track').modal('hide');
                  }else if($scope.trackdata.result==0){
                    $scope.errormsgtrack=true;
                    $scope.errdata=$scope.trackdata.message;
                    $scope.already_exist=true;
                  }else{
                    $scope.errormsgtrack=true;
                    $scope.data.error=GetDataService.errorMsg[1];
                  }
              },function error(response){
                $scope.trackdata={};
                 $scope.errormsgtrack=true;
                if(response.status==-1 || response.data==null){
                        $scope.trackdata.error=GetDataService.errorMsg[0];
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
      };
      // add/edit new session 
      $scope.addSession = function(){
          // $('#loading').show();
          var selSpeakers = [];

          angular.forEach($scope.addedSpeker,function(value,key)
          {
            selSpeakers.push($scope.addedSpeker[key].delegate_code);
          });
          $scope.existLocation=0;
          if($scope.showLoc){
              angular.forEach($scope.evtLoc,function(value,key){
                    if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                      $scope.existLocation=1;
                      $scope.locationCode=$scope.evtLoc[key].location_code
                    }
              });
          }
          var location = $scope.spoLocation;
          if($scope.existLocation==1){
            location = $scope.locationCode;
          }
          var speaker_engage=false;
          if($scope.speakerEngage==true){
            speaker_engage = true;
          }
          var spcode;
          var spoInfo = [];
          if($scope.sponserInfo!=undefined){
            spcode=$scope.sponserInfo.sponsor_code;
            spoInfo.push(spcode);
          }
          if(localStorage.getItem('editSession')=="true")
          {
              $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session_edit/',
              data:{
                  event_code:$scope.currentval.event_code,
                  tittle:$scope.stitle,
                  speakers:selSpeakers,
                  track:$scope.trackInfo.track_code,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  description:$scope.sDesc,
                  sponsors:spoInfo,
                  speaker_engage:speaker_engage,
                  session_code:$scope.editSessInfo.session_code,
                  day_id:$scope.selectedDayinfo.dayID,
                  opp:'Edit'
                }
            }).then(function success(response){
              if(response.data.result==1 ){
                  localStorage.removeItem('bsession');
                  localStorage.removeItem('session');
                  window.location="/collaborator/schedule";
              }else if(response.data.result==0){
                $scope.errormsg=true;
                $scope.showerror = response.data.message;
                $('#loading').hide();
                $('#container').fadeIn();
              }
            },function error(response){
                $scope.data={};
                console.log(response);
                 $scope.errormsg=true;
                 $('#loading').hide();
                 $('#container').fadeIn();
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
          else
          {
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/session/',
              data:{
                  event_code:$scope.currentval.event_code,
                  tittle:$scope.stitle,
                  speakers:selSpeakers,
                  track:$scope.trackInfo.track_code,
                  location:location,
                  is_location_exist:$scope.existLocation,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  description:$scope.sDesc,
                  sponsors:spoInfo,
                  speaker_engage:speaker_engage,
                  day_id:$scope.selectedDayinfo.dayID
                }
            }).then(function success(response){
              console.log(response);
              if(response.data.result==1 ){
                    localStorage.removeItem('bsession');
                    localStorage.removeItem('session');
                  window.location="/collaborator/schedule";
                localStorage.setItem('tabcode',$scope.selectedDayinfo.dayID);
              }else if(response.data.result==0){
                   $scope.errormsg=true;
                   $scope.showerror=response.data.message;
                   $('#loading').hide();
                   $('#container').fadeIn();
              }
            },function error(response){
                $scope.data={};
                 $scope.errormsg=true;
                 $('#loading').hide();
                 $('#container').fadeIn();
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
      // end add/edit new session 
      // fetch all sponsers for the current event
      $scope.getSponsor = function(){
        GetDataService.getSponsors($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $scope.SPdata=res.data;
                console.log($scope.SPdata);
                // console.log($scope.editSessInfo.sponsors[0].sponsor_code);
                // eidt session
                if(localStorage.getItem('editSession')=="true"&& $scope.editSessInfo!=undefined){

                  // angular.forEach($scope.SPdata,function(value,key){
                      for (var i = $scope.SPdata.length - 1; i >= 0; i--) {
                      
                        // angular.forEach($scope.editSessInfo.sponsors,function(v,k){
                           if($scope.editSessInfo.sponsors[0].sponsor_code==$scope.SPdata[i].sponsor_code)
                            {
                              // console.log("reach here", $scope.SPdata[i]);
                                $scope.changeSponser($scope.SPdata[i]);
                                break;
                            }  

                        // });
                  };
                  // });
                }
                // end edit session
            }
        });
      };
      // selection of locations
      $scope.locationClick = function(el){
        $scope.spoLocation = el.location; 
        $scope.showLoclist=false;
      };
      $scope.isValidLoc=false;
      $scope.locValidation=function(locName){
        $scope.isValidLoc=false;
        $scope.isValidLoc = GetDataService.validateLocation(locName);
      };      
      // end selection of location
      // Fetching all event locations if exists
      $scope.eventLocations = function(){
       $scope.showLoc = false;
        GetDataService.getEventlocations($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $scope.evtLoc=res.data;
                if($scope.evtLoc.length>0)
                {
                  $scope.showLoc = true;
                  // eidt session
                      if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){

                        // $scope.editSessInfo = angular.fromJson(localStorage.getItem('sessInfo'));
                        angular.forEach($scope.evtLoc,function(value,key){
                            if($scope.editSessInfo.location.location_code==$scope.evtLoc[key].location_code)
                            {
                                $scope.locationClick($scope.evtLoc[key]);
                                $scope.starttime = $scope.setOffset($scope.editSessInfo.start_time, $scope.currentval.eo);
                                $scope.endtime = $scope.setOffset($scope.editSessInfo.end_time, $scope.currentval.eo);
                            }

                        });

                      }
                  // end edit session
                }
            }
            else{
                 $scope.showLoc = false;
            }
        });
      };
      $scope.getTracks = function(){
          // ----- get all tracks ----------
          GetDataService.getTracks($scope.currentval.event_code).then(function(res){
            if(res.result==1){
              $scope.tracks=res.tracks;
              // end edit session
              if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                angular.forEach($scope.tracks,function(value,key){
                    if($scope.editSessInfo.track.track_code==$scope.tracks[key].track_code)
                    {
                        $scope.changeTrack($scope.tracks[key]);
                    }
                });
              }
              // end edit session
            }
          });
          // ------End get all tracks -------
      };
      // speaker add 
      $scope.addedSpeker = [];
      $scope.speakerAdd = function(spk,index){
        $scope.showSp = false;
        $scope.addedSpeker.push(spk);
        $scope.SpkData.splice(index,1);
      };
      // end speaker add
      // speaker remove 
      $scope.removeSpeaker = function(spk,index){
        $scope.SpkData.push(spk);
        $scope.addedSpeker.splice(index,1);
      };
      // end speaker remove
      // scroll to error position
      $scope.errorScroll =function(){
        console.log("reach");
         $('#loading').show();
         // $timeout(function(){
          if($scope.addedSpeker.length==0 && $scope.sessionform.$valid){
                  APPService.scrollJquery('speaker_id');
          }
          else if($scope.subtitle==''){
            APPService.scrollJquery('subtitleerr');
          }
        // },300);
      };
      $scope.displayError = function(){
        $scope.submitted=true;
        $('#loading').hide();
        $('#container').fadeIn();   
      };
      $scope.speakertitle='';
      $scope.SelSpeaker=[];
      // end edit session
      $scope.addSpeaker= function (){
        var redirectionInfo= {
              delegate:false,
              speaker:true,
              bulk:false
            };
            localStorage.setItem('redirectionInfo',angular.toJson(redirectionInfo));
        sessionStorage.setItem('redirect','/collaborator/schedule-session');
         window.location.replace("/collaborator/add-speaker");
      };
      $scope.dstapp=false; 
      $scope.$watchCollection('[starttime,endtime]', function(newValues){
              var timestamp = Math.round(new Date($scope.starttime).getTime()/1000.0);
                 var lat = $scope.currentval.latitude;
                 var lng = $scope.currentval.longitude;
                 var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyDtW9biEk-bn7LFG-l9yO1ilKLLhRRv8Oo";          

                 $.getJSON(url, function (data) {
                          console.log(data);
                          if (data.dstOffset!=0 &&  data.dstOffset!=undefined)
                          {
                            $scope.dstapp=true;
                          }
                 });
      })
      // For fetching special delegate according to tracks and day
      $scope.$watchCollection('[selectedDayinfo,trackInfo]', function(newValues){
        console.log($scope.selectedDayinfo);
        console.log($scope.trackInfo);
        if($scope.selectedDayinfo!=undefined && $scope.trackInfo!=undefined ){
            $scope.selectspeaker($scope.selectedDayinfo.dayID,$scope.trackInfo.track_code);
        }

      });
      // Checking the selscted location contain any other session in the selected time  
      $scope.$watchCollection('[selectedDayinfo,starttime,endtime,spoLocation,stitle,addedSpeker.length,trackInfo]', function(newValues){
        $scope.notimeDiff = false;
        $scope.notimeDiff1 = false;
        // console.log($scope.selectedDayinfo);
        // console.log($scope.trackInfo);
        // if($scope.selectedDayinfo!=undefined && $scope.trackInfo!=undefined ){
        //     $scope.selectspeaker($scope.selectedDayinfo.dayID,$scope.trackInfo.track_code);
        // }
        if($scope.endtime>$scope.EvtEnd){
          $scope.endtime=$scope.EvtEnd;
        }
        if($scope.selectedDayinfo!=undefined && $scope.sessionform.starttime.$untouched==false && $scope.sessionform.endtime.$untouched==false )
        {
            if($scope.starttime.getHours()== $scope.endtime.getHours() ){
                var diff = $scope.endtime.getMinutes() - $scope.starttime.getMinutes();
                if(diff<0){
                  $scope.notimeDiff1 = true;
                }
                else if(diff<5 && diff>=0){
                    $scope.notimeDiff = true;
                }
            }else if ($scope.starttime.getHours()>$scope.endtime.getHours()) {
               $scope.notimeDiff1 = true;
            }
        }
        $scope.locationExist=0;
        $scope.locCode = '';
        if($scope.spoLocation!=undefined){
              angular.forEach($scope.evtLoc,function(value,key){
                    if($scope.evtLoc[key].location.toLowerCase()===$scope.spoLocation.toLowerCase()){
                      $scope.locationExist=1;
                      // $scope.locationKey=key;
                      $scope.locCode = $scope.evtLoc[key].location_code;
                    }
              });
        }
        var selSpeakers = [];
          angular.forEach($scope.addedSpeker,function(value,key)
          {
            selSpeakers.push($scope.addedSpeker[key].delegate_code);
          });
          // console.log(selSpeakers.length);
        if( $scope.selectedDayinfo!=undefined && $scope.sessionform.starttime.$untouched==false && $scope.sessionform.endtime.$untouched==false && $scope.stitle!=undefined && $scope.trackInfo!=undefined && $scope.addedSpeker.length>0){
          $('#loading').show();
          if(localStorage.getItem('editSession')=="true")
          {
            var session_code=Number(localStorage.getItem('sessId'));
          }
          else{
              var session_code=localStorage.getItem('sessId');
          }
            $scope.pastTime=0;
            $scope.sessionSttime= $filter('date')( $scope.starttime,'hh:mm a');
            $scope.sessionEndtime= $filter('date')( $scope.endtime,'hh:mm a');
            $http({
              method:'POST',
              url:YaraBaseUrl.url+'/location_validate/',
              data:{
                  event_code:$scope.currentval.event_code,
                  session_name:$scope.stitle.toLowerCase(),
                  location_code:$scope.locCode,
                  start_time:moment($scope.starttime).format("YYYY-MM-DD HH:mm"),
                  end_time:moment($scope.endtime).format("YYYY-MM-DD HH:mm"),
                  for:'Session',
                  speaker_code:selSpeakers,
                  track_code:$scope.trackInfo.track_code,
                  session_code:session_code,
                  day_id:$scope.selectedDayinfo.dayID

                }
            })
            .then(function success(response){
              $('#loading').hide();
              $('#container').fadeIn();
              if(response.data.result==1 ){
                      $scope.speakers_conflict = response.data.speakers_conflict;
                      $scope.location_conflicts = response.data.location_conflicts;
                      $scope.session_duplicate = response.data.session_duplicate;
                      $scope.pastTime = response.data.time_conflict;
                      $timeout(function(){
                           if($scope.location_conflicts.length>0){
                            APPService.scrollJquery('locationdupe_id');
                          }
                          else if ($scope.session_duplicate==true) {
                              APPService.scrollJquery('sessiondupe_id');
                          }
                        },300);
              }else if(response.data.result==0){
                      $scope.speakers_conflict = response.data.speakers_conflict;
                      $scope.location_conflicts = response.data.location_conflicts;
                      $scope.session_duplicate = response.data.session_duplicate;
                      $scope.pastTime = response.data.time_conflict;
                      $scope.showerror = response.data.message;
                      $timeout(function(){
                          if ($scope.pastTime==1) {
                              APPService.scrollJquery('timesec');
                          }
                          else if ($scope.session_duplicate==true) {
                              APPService.scrollJquery('sessiondupe_id');
                          }
                          else if($scope.location_conflicts!=undefined && $scope.location_conflicts.length>0){
                            APPService.scrollJquery('locationdupe_id');
                          }
                          
                        },300);
              }
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
        }
      });
      $(window).click(function() {
         if($scope.showLoclist==true){
           $scope.showLoclist = false;
           $("#locationdropdown").hide();
         }
         if($scope.showSp==true){
            $scope.showSp=false;
            $("#speakerdropdown").hide();
         }          
      });
      $('#location_id').click(function(event){
        event.stopPropagation();
        $("#locationdropdown").show();
      });
      $('#locationinputid').on('input', function() {
      $("#locationdropdown").show();
      });
      $('#speakerid').click(function(event){
        event.stopPropagation();
        $("#speakerdropdown").show();
      });
      $('#speakerinputid').on('input', function() {
      $("#speakerdropdown").show();
      });
      // End checking the selscted location contain any other session in the selected time  
      $scope.cancelSessionCreation = function(){
            localStorage.removeItem('bsession');
            localStorage.removeItem('session');
            window.location = "/collaborator/schedule";
      };
      // for adding sponser need to add redirection details
      $scope.addSponser = function(){
        window.location="/collaborator/sponsor";
      };
      $scope.getSessionRequirements = function(){
          GetDataService.eventLocalTz({ tz: $scope.currentval.event_timezone }).then(function(res) {
              $('#loading').show();
              if(res.result == 1){
                  $scope.localTimeNow=res.local_time_now;
                  // Get all tracks
                  GetDataService.getTracks($scope.currentval.event_code).then(function(res){
                          if(res.result==1){
                                $scope.tracks=res.tracks;
                                //  edit session
                                if(localStorage.getItem('editSession')=="true" && $scope.editSessInfo!=undefined){
                                  angular.forEach($scope.tracks,function(value,key){
                                      if($scope.editSessInfo.track.track_code==$scope.tracks[key].track_code)
                                      {
                                          $scope.changeTrack($scope.tracks[key]);
                                      }
                                  });
                                }
                                // end edit session
                                //date get while adding new session
                                $scope.dateset=JSON.parse(localStorage.getItem('eventdayid'));
                                if($scope.dateset==null|| $scope.dateset==undefined){
                                   window.location = "/collaborator/schedule";
                                }
                                if (localStorage.getItem('editSession')=="true") {
                                      var  param = {
                                          session_code:localStorage.getItem('sessId'),
                                          event_code:$scope.currentval.event_code
                                      };
                                      GetDataService.getSessionInfo(param).then(function(res){
                                          if(res.result==1){
                                              $scope.editSessInfo = res.sessions[0];
                                              $scope.stitle = $scope.editSessInfo.tittle;
                                              $scope.sDesc = $scope.editSessInfo.description;  
                                              $scope.speakerEngage = $scope.editSessInfo.is_speaker_engage;
                                              window.setTimeout( function() {
                                                                $("textarea").height( $("textarea")[0].scrollHeight );
                                                            }, 500);
                                              angular.forEach($scope.currentval.days,function(value,key){
                                                  if($scope.currentval.days[key].dayID ==$scope.editSessInfo.day_id ){
                                                    $scope.changeSubtype($scope.currentval.days[key]);
                                                  }
                                              });
                                              angular.forEach($scope.tracks,function(value,key){
                                                    if($scope.editSessInfo.track.track_code==$scope.tracks[key].track_code)
                                                    {
                                                        $scope.changeTrack($scope.tracks[key]);
                                                    }
                                              });
                                              $scope.eventLocations();
                                              $scope.getSponsor();
                                              $scope.btnName = "Update Session";
                                          }
                                      });
                                }else{
                                      angular.forEach($scope.currentval.days,function(value,key){
                                          if($scope.currentval.days[key].dayID==$scope.dateset.dayID){
                                              $scope.changeSubtype($scope.currentval.days[key]);
                                          }
                                      });
                                      // $scope.getTracks();
                                      $scope.eventLocations();
                                      $scope.getSponsor();
                                }
                                $('#loading').hide();
                                $('#container').fadeIn();
                          }
                  });
              }
          });
      };
      $scope.getSessionRequirements();
      // not connected to internet
      if($rootScope.online == false){
        alert("You are not connected to internet");
      }
}]);
// end cCollabratorSessionController
// desk controller start
app.controller('DeskController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval','$timeout','$document','$rootScope','$anchorScroll',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval,$timeout,$document,$rootScope,$anchorScroll){
  
 //signout 
  $scope.Logout = function(){
      GetDataService.Signout().then(function(res){
        if(res.result==1){
          localStorage.clear();
          window.location="/sign-in";
        } 
      });
  };
  $scope.loginInfo = angular.fromJson(localStorage.getItem('Logininfo'));
  if($scope.loginInfo.role!="Admin"){
    $scope.Logout();
  }  
  $scope.timeformat=localStorage.getItem('is_time_format_24');
  if ($scope.timeformat=='true') {
    $scope.is_time_format_24=true;
  }else{
    $scope.is_time_format_24=false;
  } 
  
  $scope.getAllIssues = function(){
    GetDataService.getAllIssues().then(function(res){
      if(res.result==1){
        $scope.issues=res.issues;
        $scope.userOffset=res.uo;
        $scope.setOffset = function(d, offset) {return GetDataService.userOffsetTime(d, offset);};
        if($scope.inView){
          angular.forEach($scope.issues,function(v){
            if(v.issue_code == $scope.valView.issue_code){
              $scope.valView=v; 
            }
          });
        }
      }
    });
  };
  $scope.getAllIssues();
  $scope.inView=false;
  $scope.redirectpage=function(issue) {
    $scope.inView=true;  
    $scope.valView=issue;  
    $anchorScroll();
  }
  $scope.scrollanchar=function () {
    $anchorScroll();
  }
  // api to reply to issue
  $scope.replyForm =function(){
    $scope.replyRes={};
    $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/admin_responds/',
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
  $scope.issueClosed=function (statusclose) {
     $http({method:'POST',
      url:YaraBaseUrl.url+'/happy_help/update_issue/',
      data:{
        issue_code:$scope.valView.issue_code,
        status:statusclose
      }
    }).then(function (res) {
      if (res.data.result==1) {
        $scope.getAllIssues();
      }
    })
  };
 // not connected to internet
  if($rootScope.online == false){
    alert("You are not connected to internet");
  }
}]);

