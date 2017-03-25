//some controller are separated from app.js due to date and time picker
//'mdPickers' is used for date Picker - https://github.com/alenaksu/mdPickers
// 'ngMaterialDatePicker' is used for time picker - http://logbon72.github.io/angular-material-datetimepicker/ 
// drag and drop - directives -https://parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
// 'use strict'; 
var app=angular.module('yara',['vcRecaptcha','ngRoute','Image-Upload','YaraService','YaraDirective','Credentails','ngAnimate','ngAria','ngMaterialDatePicker','mdPickers','ngDroplet','ngLocalize','ngMap']);
//Locale data config - https://github.com/doshprompt/angular-localization
app.value('localeConf', {
    basePath: '/static/dashboard/languages',
    fileExtension: '.lang.json',
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
          }else if(response.data!= null && response.data.result!= undefined && (response.data.result==6 || response.data.result==7 || response.data.result==8 )){
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

 app.run(['$window','$anchorScroll',function($window,$anchorScroll) {
  // scroll to top when page is loaded
    $('html, body').animate({
        scrollTop: 0
    });

     // <!-- Ad Blocker popup  -->
    $(document).ready(function(){
    $('body').append("<div id=\"ads\" class=\"adsbygoogle facebook promote\"></div>");
    if($('#ads').css('display')=='none'){
      //alert('Ad blocker is Enabled');
      var popup="<div class=\"modal fade\" id=\"myModal-test\" tabindex=\"-1\" data-backdrop=\"static\"  role=\"dialog\" aria-labelledby=\"myModalLabel\">";
      popup+="<div class=\"modal-dialog gatekeeper-popup\" role=\"document\" >";
      popup+="<div class=\"modal-content modal-padding\" >";
      popup+="<div class=\"modal-header-top \">";
        popup+="<h4 class=\"modal-title modal-heading\" id=\"myModalLabel\" >Blocker Enabled</h4>";
      popup+="</div >";
      popup+="<div class=\"modal-body1\">";
        popup+="<div>";
        popup+="<div class=\"row\">";
        popup+="<div class=\"col-md-12 bg-collaborator text-center\" >";
        popup+="Disable the Ad Blocker and refresh the website.";
        popup+="</div>";
        // popup+="<div class=\"col-md-12 border-top\">";
        // popup+="<div class=\"col-md-10\"><div  class=\" text-danger\">&nbsp;</div></div>";
        // popup+="<div class=\"col-md-2 pulse-margin\"><div  data-dismiss=\"modal\" aria-label=\"Close\" class=\"btn01 btn-primary-black-pulse01 \"><a class=\"text-hover\">Close</a></div></div>";
        popup+="</div>";
        popup+="</div>";
    popup+="</div> </div> </div></div></div>";
      $('body').append( popup );
      $('#myModal-test').modal('show');
    }
  });
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
/*document.write(''
 +'Browser name  = '+browserName+'<br>'
 +'Full version  = '+fullVersion+'<br>'
 +'Major version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
)*/
}]);

//controller for creating coupon
app.controller('EventCouponController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$document',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$document){
  $scope.headerTitle="Coupons";
  //getting selected event data from localstorage instead of calling server back for data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location.replace("/events");
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Coupon';
  }
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selval=$scope.EXselval=$scope.dates[0];
  $scope.displaytime=$scope.expirytime=new Date(st_date);
  $scope.currentdate=new Date();
  $scope.s=APPService;
$scope.subtitle='';
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
      $(".subtitle").text($filter('date')(c,'MMM dd, yyyy')); 
      $scope.time=new Date(c);
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
   $( ".eDate_dropdown .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $(".eDatetitle").show();
    if(c==''){
      $scope.eDatetitle=c;
      $(".eDatetitle").text('Select Type'); 
    }else{
      $scope.eDatetitle=c;
      $(".eDatetitle").text($filter('date')(c,'MMM dd, yyyy')); 
      $scope.Etime=new Date(c);
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
  $scope.getTickets =function(){
    GetDataService.getTickets($scope.currentval.event_code).then(function(res){
      if(res.result == 1){
        $scope.ticketlist=res.tickets;
      }else{
        $scope.ticketlist=[];
      }
    });
  };
  $scope.getFoodCoupon = function(){
    GetDataService.getFoodCoupon($scope.currentval.event_code).then(function(res){
      $scope.FDdate=res.objects;
    });
  };
   $scope.getCustomCoupon = function(){
    GetDataService.getCustomCoupon($scope.currentval.event_code).then(function(res){
      $scope.CUSTdata=res.objects;
    });
  };
   $scope.getFoodCoupon();
   $scope.getCustomCoupon();
  $scope.getUsers=function(){
    $http({method:'GET',
        url:'../user_json' 
      }).then(function success(response){
        $scope.userlist=response.data;
        $scope.totalpages=$scope.numberOfPages();
       
      });
  };
  $scope.getUsers();
  //$scope.getFoodCoupon();
  $scope.getTickets();
     $scope.FDSession=new Array($scope.dayscount);
    for(var i=0;i<$scope.FDSession.length;i++){
      $scope.FDSession[i]=[];
    }
    $scope.foodselect=function(pos,val){
        if($scope.FDSession[pos].indexOf(val)>=0){
           $scope.FDSession[pos].splice($scope.FDSession[pos].indexOf(val),1);
        }else{
          $scope.FDSession[pos].push(val);
        }
    };
    $scope.FDtickets=[];
    $scope.foodtickets=function(val){
      if($scope.FDtickets.indexOf(val)>=0){
        $scope.FDtickets.splice($scope.FDtickets.indexOf(val),1);
      }else{
        $scope.FDtickets.push(val);
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
    }
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages=function(){
      if($scope.userlist !=undefined){
        return Math.ceil($scope.userlist.length/$scope.pageSize);
      }
      return 1;          
    }
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
    }
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    }
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
    }
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
    }

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
    $scope.FoodCoupon=function(){
         var accesdays;
        accesdays=[];
        var hasval=false;
        for(var i=0;i<$scope.FDSession.length;i++){
          if($scope.FDSession[i].length>0){
            var temp= {};
            temp.day=$scope.dates[i];
            temp.breakfast=($scope.FDSession[i].indexOf('Breakfast')>=0);
            temp.lunch=($scope.FDSession[i].indexOf('Lunch')>=0);
            temp.coffe=($scope.FDSession[i].indexOf('Coffe')>=0);
            temp.dinner=($scope.FDSession[i].indexOf('Dinner')>=0);
            accesdays.push(temp);
          //if(hasval)accesdays+=',';
        /*  hasval=true;
          accesdays+='{ "day":"'+$scope.dates[i]+'",';
          accesdays+=' "breakfast":'+($scope.FDSession[i].indexOf('Breakfast')>=0)+',';
          accesdays+=' "lunch":'+ ($scope.FDSession[i].indexOf('Lunch')>=0) +',';
          accesdays+=' "coffe":'+ ($scope.FDSession[i].indexOf('Coffe')>=0) +',';
          accesdays+=' "dinner":'+ ($scope.FDSession[i].indexOf('Dinner')>=0) ;
          accesdays+='}';*/
          
        }
        }
        
      if($scope.forAll==true){
        $scope.FDtickets=[];
      }

      console.log(accesdays);
      /*$http({method:'POST',
        url:YaraBaseUrl.url+'/food_coupon/',
        data:{
          event_code:$scope.currentval.event_code,
          all_day_access:false,
          access_days:accesdays,
          for_all:true,
          tickets:[]
        }
      }).then(function success(response){
        console.log(response.data);
      });*/
    };
    $scope.errorScroll = function(){
      if($scope.CPform.$valid && $scope.couponfor=='ticket' && $scope.Custtickets.length<=0)
        APPService.scrollJquery('ticketError');
      if($scope.CPform.$valid && $scope.couponfor=='users' && $scope.currentval.number_of_attendee < $scope.attende)
        APPService.scrollJquery('attendeError');
    }
    $scope.CustCoupon = function(){
    //  console.log('entry');
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
      $http({method:'POST',
        url:YaraBaseUrl.url+'/custom_coupon/',
        data:{
          event_code:$scope.currentval.event_code,
          name:$scope.CPname,
          coupon_type:$scope.CPtype,
          description:$scope.CPdesc,
          display_time:$filter('date')($scope.time,'yyyy-MM-dd HH:mm'),
          for_all:forAll,
          random:$scope.attende ,
          ticket_codes:$scope.Custtickets,
          expiry_time:$filter('date')($scope.Etime,'yyyy-MM-dd HH:mm')
        }
      }).then(function success(response){
        console.log(response.data);
      });
    }; 
}]);
//controller for Votes
app.controller('EventVoteController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$timeout','$document',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$timeout,$document){
  $scope.headerTitle="Vote";
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
   // $location.path('/Events');
       window.location.replace("/events");
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
    document.title='YARA - '+$scope.currentval.short_name+' - Vote';
  }
  $
  $scope.selectval = function(d){
    $scope.selval=d;
    var d1=new Date(d);
    var d2=new Date();
    var tempday=$filter('date')(d1,'dd/MM/yyyy');;
    var tempday1=$filter('date')(d2,'dd/MM/yyyy');;
    if(tempday!=tempday1){
      $scope.mintime=d1;
        $scope.time=d1;
       // console.log($scope.mintime);
    }else{
      $scope.mintime=$scope.time= d2;
    }
      
  };
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dayscount=APPService.dateDiffInDays(new Date(st_date),new Date(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
   $scope.days={};
  $scope.service=APPService;
  angular.forEach($scope.dates,function(d){
    $scope.days[d]=$scope.currentval.days[d];
  });
  $scope.SelDate='';
  $scope.selectDate = function(d){
    $scope.SelDate=d;
  };
  $scope.voteData=[];
  $scope.Smart_delivery=false;
  $scope.SD_show=false;
$scope.subtitle='';
$scope.timeslots = []
$scope.time=moment().hours(0).minutes(0);
  $scope.changeSubtype=function(c){
    console.log(c);
  $http.get("http://52.74.132.241:8082/api/yara/web/vote_time_slot/?event_code=76318")
    .success( function(response) { 
      console.log(response);
        console.log(response.vote_time_slots);
      
      angular.forEach(response.vote_time_slots, function(value , key) {
            console.log(key)
            if(key==c){
              console.log(value.slots);
              angular.forEach(value.slots, function(v , key) {
                   console.log(v,key);
                  $scope.timeslots.push({"time":key});
              });
              console.log($scope.timeslots);
              // $scope.timeslots =  value.slots;
            }
      })
  });

  

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
    $scope.getVotes = function(){
    GetDataService.getVote($scope.currentval.event_code).then(function(res){
        if(res.result==1){
            $scope.voteData=res.votes;
            $scope.Smart_delivery=res.smart_delivery;
            $scope.SD_show=res.show;
            $timeout(function(){
            $(".progressbars").jprogress();
            $(".progressbarsone").jprogress({
                background: "#FF2D55"
            });

          }, 500);
        }
    });
  };

    $scope.getVotes();
    $scope.vote_scope=$scope;
    $scope.vote_scope.optarray=[];
    $scope.optRequired=true;
    $scope.$watch('vote_scope.optarray',function(newval){
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
    if($scope.voteform.$valid && $scope.optRequired)
      APPService.scrollJquery('optionError');
  };
  $scope.addpoll=function(form){
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
    $http({method:'POST',
        url:YaraBaseUrl.url+'/vote/',
        data:{
          event_code:$scope.currentval.event_code,
          question:$scope.pollQues,
          options:$scope.optvalues,
          display_time:$scope.displaytime
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
    });
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
app.controller('TimelineController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpDatePicker','$mdpTimePicker','$interval','$timeout',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpDatePicker,$mdpTimePicker,$interval,$timeout){
  //getting selected event data from local data
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
        window.location.replace("/events");
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  $scope.setTitle =function(p){
    document.title='YARA - '+$scope.currentval.short_name+' - '+p;
  }
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dates={};
  $scope.dayscount=Object.keys($scope.currentval.days).length;
  var d = APPService.Dateslist(st_date,$scope.dayscount);
  $scope.service=APPService;
  angular.forEach(d,function(d){
    $scope.dates[d]=$scope.currentval.days[d];
  });

   $scope.sessionData =[];
  $scope.exScope=$scope;
  //fetching sessions
  GetDataService.getSession({event_code:$scope.currentval.event_code,bs:1}).then(function(res){
    $scope.sessionData=res.sessions.concat(res.break_sessions);
    console.log($scope.sessionData);
  });
  /*angular.forEach(d,function(d,key){
    $scope.sessionData.push(
      {
        session_id:key+1234511,
        name:'Session 1',
        session_type:'Cust',
        date:d,
        start:'11:00',
        end:'12:00',
      },{
        session_id:key+1234522,
        name:'Session 2',
        session_type:'Cust',
        date:d,
        start:'11:00',
        end:'11:30',
      },{
        session_id:key+1234533,
        name:'Session 3',
        session_type:'Cust',
        date:d,
        start:'12:00',
        end:'13:00',
      },{
        session_id:key+1234544,
        name:'Session 4',
        session_type:'Cust',
        date:d,
        start:'14:00',
        end:'15:00',
      }
    );  
  });*/
 
  $scope.filterTime =function(t){
    var pt = $scope.exScope.timedates[t.day].CurrtTime;
    var CurrDate = moment(t.day+' '+pt);
    var startDate = moment(t.start_time);
    var endDate = moment(t.end_time);
    if(CurrDate>=startDate && CurrDate<=endDate)
      return true;
    return false;
  };
  //show complete session data when session is selected
  $scope.ShowSession =function(t){
    $scope.CStarttime=t;
    $scope.CEndtime=t;
    $scope.CEndtime=new Date($scope.CEndtime);
    $scope.CEndtime.setHours($scope.CEndtime.getHours()+1);
    var endt = $scope.dates[$scope.exScope.seltab].endtime;
    endt = (APPService.parseDTime($scope.exScope.seltab+' '+ endt));
    if(endt<$scope.CEndtime){
      var mm = Math.floor((endt-$scope.CStarttime ) / 1000 / 60);
      $scope.CEndtime=t;
      $scope.CEndtime=new Date($scope.CEndtime);
      $scope.CEndtime.setMinutes($scope.CEndtime.getMinutes()+mm);

    }
    $scope.listSession=true;
    //console.log(moment(t).format('YYYY-MM-DD'));
    $scope.exScope.timedates[moment(t).format('YYYY-MM-DD')].CurrtTime=moment(t).format('HH:mm');
    /*sessionData | filter:{date:exScope.seltab} | filter:filterTime*/

    var obj=($filter('filter')($filter('filter')($scope.sessionData,{day:$scope.exScope.seltab}),$scope.filterTime));
    if(obj!=undefined && obj.length>0){
      $scope.exScope.SelSession[$scope.exScope.seltab]=obj[0];
    }else{
      $scope.exScope.SelSession[$scope.exScope.seltab]={};
    }
   // console.log($scope.exScope.SelSession[$scope.exScope.seltab].length);
  };
  $scope.getTracks=function(){
    GetDataService.getTracks($scope.currentval.event_code).then(function(res){
       if(res.result==1){
        $scope.tracks=res.tracks;
        console.log($scope.tracks);
      }
    });
  };
  //when tab is selected timeline is created for that tab
  $scope.selecttab = function(d){
    //console.log(d);
  //  $('#loading').show();
    //$scope.listSession=false;
    $scope.exScope.seltab=d;
    $scope.initSession();
  };
  $scope.currtab;
  // when session start drag
  $scope.dragStart =function(s){
    $scope.DragSession=s
    $scope.currtab=$scope.exScope.seltab;
    console.log($scope.DragSession);
  }
  // when session start drop in other tab
  $scope.SessionDrop = function(){
    if($scope.exScope.seltab != $scope.currtab){
      $scope.currtab=$scope.exScope.seltab;
      $('#session-change').modal('show');
    }
  }
  // when session drag hover tab is selected
  $scope.hover=function(d){
    $scope.exScope.seltab=d;
    $scope.initSession();
    //$scope.listSession=false;
  };
  //when he drop session on hover of tab;
  $scope.hoverleave =function(){
    $scope.exScope.seltab=$scope.currtab;
    console.log($scope.currtab+'dragend');
  };
  var stopmoving=[];
  $scope.leavetab=function(){
  //  $scope.movement=false;
    //$timeout.cancel(stopmoving);
    //stopmoving=null;
     //$interval.cancel($scope.stopmoving);
    console.log('stop');
  };
  // when session is drag over tabs and tab movement auto untill end or leave the tab focus
  $scope.tabMovement = function(tscope){
    if(tscope=='go-right'){
      $(".slider").diyslider("move", "forth");
      $scope.dbutton=$scope.dbutton-1;
      //console.log(tscope);
    }else{
      $scope.dbutton=$scope.dbutton+1;
      $(".slider").diyslider("move", "back");
     // console.log(tscope);
    }
  };
  // stoping tab movement
  $scope.movetab = function(tscope){
    stopmoving.push($interval(function(){
      if(angular.element(document.querySelector('#'+tscope)).hasClass('over'))
        $scope.tabMovement(tscope);
      else{
        angular.forEach(stopmoving,function(d,key){
            $interval.cancel(d);
            d=null;
        });
        console.log('stop'+$scope.dbutton);
      }
    },500));
   console.log('start'+$scope.dbutton);
    
  };
  // create time line with calss and hover for UI
  $scope.timeline=function(startdate,noofdays){
    var days=APPService.Dateslist(startdate,noofdays);
     var stDate= new Date(startdate);
    var edDate= new Date(startdate) ;
    //console.log($scope.currentval.days);

    var d1= stDate.getDate()+'-'+(stDate.getMonth()+1)+'-'+stDate.getFullYear();
    var ds;
   // console.log(startdate);
    var dy=angular.fromJson(angular.toJson($scope.currentval.days));
    angular.forEach(dy,function(d,key){
      var d2 = new Date(key);
      d2=d2.getDate()+'-'+(d2.getMonth()+1)+'-'+d2.getFullYear();
      if(d1==d2)
        ds=d;
    });
    
    var starttime = ds.starttime.split(' ');
    console.log(ds.starttime);
    var time =starttime[0].split(':');
     var tDate=[];
    var tobj={};
    /*if(starttime[1]==='PM'){
     // console.log(starttime[1]);
      time[0]=Number(time[0])+12;
    }*/
    stDate.setUTCHours(time[0]);
    stDate.setUTCMinutes(time[1]);
    var sm =moment(stDate);
    tobj.CurrtTime=sm.format('HH:mm');
    //console.log(stDate);
    var endtime = ds.endtime.split(' ');
    var time1 =endtime[0].split(':');
    /*if(endtime[1]=='PM'){
      time1[0]=Number(time1[0])+12;
    }*/
    edDate.setUTCHours(time1[0]);
    edDate.setUTCMinutes(time1[1]);
    
    /*console.log(edDate);
    stDate.setHours(10);
    edDate.setHours(23);
    */
    //console.log(stDate);
    var duration = moment.duration(moment(edDate).diff(moment(stDate)));
    var hours = duration.asHours();
    //console.log(hours);
    var interval;
    if(hours<0){
      var s=stDate;
      stDate=edDate;
      edDate=s;
      hours = -1 * hours;
    }
    if(hours >0 && hours <=1){
      interval=1;
    }else if(hours >1 && hours <=3){
      interval=5;
    }else if(hours >3 && hours <=6){
      interval=10;
    }else if(hours >6 && hours <=9){
      interval=15;
    }else if(hours >9 && hours <=20){
      interval=30;
    }else
      interval=0;
    for (var i = new Date(stDate); i <= edDate; i.setMinutes(i.getMinutes()+1)){
      var tempobj={};
      if(interval==1){
        tempobj.hoverclass="stuff01";
      }else if(interval==5){
        tempobj.hoverclass="stuff05";
      }else if(interval==10){
        tempobj.hoverclass="stuff10";
      }else if(interval==15){
         tempobj.hoverclass="stuff15";
      }else if(interval==30){
         tempobj.hoverclass="stuff30";
      }else if(interval==0){
         tempobj.hoverclass="stuff30";
      }
      if((i.getMinutes()%interval)==0 || (interval == 0 && i.getMinutes()==0 )){
        tempobj.show=true;
        if(i.getMinutes()==0 ){
          tempobj.class="bar1";
        }else if( i.getMinutes()==30){
          tempobj.class="bar2";
        }else if(i.getMinutes()==15 || i.getMinutes()==45){
          tempobj.class="bar3";
          if(interval==5 || interval == 1)
            tempobj.class="bar4";
        }else {
          tempobj.class="bar4";
          if(interval==1 && (i.getMinutes()%5)!=0)
            tempobj.class="min";
        }
      }else{
        tempobj.show=false;
        tempobj.class="";
      }
      tempobj.time=new Date(i);
      tempobj.interval=interval;
      tDate.push(tempobj);
    }
    tobj.hours=hours;
    tobj.times=tDate;
    //console.log(tobj);
    //console.log(tDate);
    //console.log(tobj);
    return tobj;
  };
  $scope.exScope.timedates={};
  angular.forEach($scope.dates,function(d,key){
    $scope.exScope.timedates[key]=$scope.timeline(key,2);
  });
  $scope.exScope.SelSession={};
  //inital timeline creation
  $scope.initSession =function(){
    $scope.CStarttime=APPService.parseDTime($scope.exScope.seltab+' '+$scope.dates[$scope.exScope.seltab].starttime);
    $scope.CEndtime=APPService.parseDTime($scope.exScope.seltab+' '+$scope.dates[$scope.exScope.seltab].starttime);;
    //$scope.CEndtime=new Date($scope.CEndtime);
    $scope.CEndtime.setHours($scope.CEndtime.getHours()+1);
    var endt = $scope.dates[$scope.exScope.seltab].endtime;
    endt = (APPService.parseDTime($scope.exScope.seltab+' '+ endt));
    if(endt<$scope.CEndtime){
      var mm = Math.floor((endt-$scope.CStarttime ) / 1000 / 60);
      $scope.CEndtime=APPService.parseDTime($scope.exScope.seltab+' '+$scope.dates[$scope.exScope.seltab].starttime);;
     // $scope.CEndtime=new Date($scope.CEndtime);
      $scope.CEndtime.setMinutes($scope.CEndtime.getMinutes()+mm);

    }
    if($scope.exScope.SelSession[$scope.exScope.seltab] == undefined){
  var obj=($filter('filter')($filter('filter')($scope.sessionData,{date:$scope.exScope.seltab}),$scope.filterTime));
    if(obj.length>0){
      $scope.exScope.SelSession[$scope.exScope.seltab]=obj[0];
    }else{
      $scope.exScope.SelSession[$scope.exScope.seltab]={};
    }
    }
  };
  $scope.SessionCrt=false;
  // when click on timeline it creates time form
  $scope.createSession=function(t){
    $scope.CStime=t;
    $scope.CEtime=t;
    $scope.CEtime=new Date($scope.CEtime);
    $scope.CEtime.setHours($scope.CEtime.getHours()+1);
    var endt = $scope.dates[$scope.exScope.seltab].endtime;
    endt = (APPService.parseDTime($scope.exScope.seltab+' '+ endt));
    if(endt<$scope.CEtime){
      var mm = Math.floor((endt-$scope.CStarttime ) / 1000 / 60);
      $scope.CEtime=t;
      $scope.CEtime=new Date($scope.CEtime);
      $scope.CEtime.setMinutes($scope.CEtime.getMinutes()+mm);

    }
    $scope.cSession = function(s){
      var temp={};
      temp.day=$scope.exScope.seltab;
      temp.Stime=$scope.CStime;
      temp.Etime=$scope.CEtime;
      temp.type=s;
      sessionStorage.setItem('CSession',angular.toJson(temp));
       window.location.replace("/event/schedule-session");

    };
    $scope.SessionCrt=true;
    $scope.sessiontype='crtsession';
  }
  // cancel session create form
  $scope.resetSession=function(t){
    $scope.Ctime='';
    $scope.SessionCrt=false;

    //$scope.sessiontype='crtsession';
  }
  //setting session
  $scope.setSession = function(s){
     $scope.exScope.SelSession[$scope.exScope.seltab]=s;
     $scope.listSession=false;
  };
}]);
app.controller('CreateTimelineCtrl',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval','$timeout','$document',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval,$timeout,$document){
  // get event details from local storage
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
       window.location.replace("/events");
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  document.title='YARA - '+$scope.currentval.short_name+' - Schedule-Session';
  var st_date=$filter('date')($scope.currentval.start_date,'yyyy-MM-dd');
  var ed_date=$filter('date')($scope.currentval.end_date,'yyyy-MM-dd');
  $scope.dates={};
  $scope.dayscount=Object.keys($scope.currentval.days).length;
  var d = APPService.Dateslist(st_date,$scope.dayscount);
  $scope.service=APPService;
  angular.forEach(d,function(d){
    $scope.currentval.days[d].day=d;
    $scope.dates[d]=$scope.currentval.days[d];
  });
  $scope.EvtStart=APPService.parseDTime(st_date+' '+$scope.dates[st_date].starttime);
  $scope.EvtEnd=APPService.parseDTime(st_date+' '+$scope.dates[st_date].endtime);
   $scope.subtitle='';
  var ss = sessionStorage.getItem('CSession');
  if(ss != undefined){
    ss= angular.fromJson(ss);
    $scope.sesssionType=ss.type;
    if(ss.day!=undefined){
      $scope.subtitle=ss.day;
      $(".subtitle").text($scope.dates[ss.day].day_name);
      if($scope.sesssionType=='session'){
        $scope.starttime=APPService.parseDTime($filter('date')(ss.Stime,'yyyy-MM-dd HH:mm'));
        $scope.endtime=APPService.parseDTime($filter('date')(ss.Etime,'yyyy-MM-dd HH:mm'));
      }else{
        $scope.Bstarttime=APPService.parseDTime($filter('date')(ss.Stime,'yyyy-MM-dd HH:mm'));
        $scope.Bendtime=APPService.parseDTime($filter('date')(ss.Etime,'yyyy-MM-dd HH:mm'));
      }
       $scope.EvtStart=APPService.parseDTime(ss.day+' '+$scope.dates[ss.day].starttime);
       $scope.EvtEnd=APPService.parseDTime(ss.day+' '+$scope.dates[ss.day].endtime);
    }
  }else{
     window.location.replace("timeline");
  }
  $scope.getTracks=function(){
  return  GetDataService.getTracks($scope.currentval.event_code).then(function(res){
       if(res.result==1){
        $scope.tracks=res.tracks;
       // console.log($scope.tracks);
        return true;
      }else{
        return false
      }
    });
  };
 
  $scope.checktrack = function(item){
    if(item.days.indexOf($scope.subtitle) >=0)
      return true;
    else
      return false;
  };
  $scope.SelDaysTrack=[];
  $scope.TrackDays=function(d){
    if($scope.SelDaysTrack.indexOf(d)>=0){
      $scope.SelDaysTrack.splice($scope.SelDaysTrack.indexOf(d),1);
    }else{
       $scope.SelDaysTrack.push(d);
    }
  };
  $scope.addtrack=function(form){
    //console.log($scope.SelDaysTrack);
    $http({method:'POST',
      url:YaraBaseUrl.url+'/track/',
      data:{
        event_code:$scope.currentval.event_code,
        name:$scope.trackname,
        days:$scope.SelDaysTrack
      }
    }).then(function success(response){
      $scope.trackdata=response.data;
      console.log($scope.trackdata);
      if($scope.trackdata.result==1){
        //$scope.addtracks=false;
        $scope.trackname="";
        $scope.SelDaysTrack=[];
        $scope.getTracks();
        $('#add-new-track').modal('hide');
          //$scope.getSpeakers();
              }else if($scope.trackdata.result==0){
                $scope.errormsgtrack=true;
                $scope.data.error=$scope.trackdata.message;
              }else{
                 console.log(response);
                $scope.errormsgtrack=true;
                $scope.data.error=GetDataService.errorMsg[1];
              }

          },function error(response){
            $scope.trackdata={};
            console.log(response);
             $scope.errormsgtrack=true;
            if(response.status==-1 || response.data==null){
                    $scope.trackdata.error=GetDataService.errorMsg[0];
            }else
            $scope.trackdata.error=GetDataService.errorMsg[1];
        });
  };
 
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
      $scope.subtitle=c.day;
      $scope.starttime=$scope.Bstarttime=APPService.parseDTime(c.day+' '+c.starttime);
      $scope.endtime=$scope.Bendtime=APPService.parseDTime(c.day+' '+c.starttime);
      $scope.EvtStart=APPService.parseDTime(c.day+' '+c.starttime);
      $scope.EvtEnd=APPService.parseDTime(c.day+' '+c.endtime);
      console.log($scope.EvtEnd);
      $(".subtitle").text(c.day_name);
      $scope.tracktitle='';
      $(".tracktitle").text('Select Track');  
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
  $scope.tracktitle='';
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
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".timeline-event-track img").removeClass();
         $(".timeline-event-track img").addClass('caret01'); 
        }   
  });
  
  $scope.speakertitle='';
  $scope.SelSpeaker=[];
  $scope.changeSpeaker=function(c,id,pos){
   $( ".timeline-speaker .primary_nav_wrap ul li ul").hide({
    display:'none',
    color: 'none',
    background: '#fff',
    'z-index':100
   });
      $("#"+id).show();
    if(c==''){
      $scope.speakertitle=c;
      $("#"+id).text('Search for Speakers'); 
    }else{
      if($scope.SelSpeaker[pos]!=undefined)
        $scope.SelSpeaker[pos]=c.speaker_code;
      else
         $scope.SelSpeaker.push(c.speaker_code);
       //console.log($scope.SelSpeaker.length);
      $scope.speakertitle=c.speaker_code;
      $("#"+id).text(c.first_name + ' ' + c.middle_name + ' ' + c.last_name); 
    } 
  };
  $scope.checkSpeaker =function(item){
    if($scope.SelSpeaker.indexOf(item.speaker_code)>=0)
      return false;
    else
      return true;
  };
  /* $(document).on('click','.timeline-speaker .primary_nav_wrap ul li',function(){
      $(".timeline-speaker img").removeClass();
      $(".timeline-speaker img").addClass('caret02'); 
      $( this).css({
        display:'list-item',
        color: '#000',
        'z-index':100
      });
  });*/
  $document.on('click',function(event){
    var $trigger = $(".timeline-speaker .primary_nav_wrap ul li");
        if($trigger !== event.target && !$trigger.has(event.target).length){
           $( ".timeline-speaker .primary_nav_wrap ul li ul").hide({
          display:'none',
          color: 'none',
          background: '#fff',
          'z-index':100
      });
         $(".timeline-speaker img").removeClass();
         $(".timeline-speaker img").addClass('caret01'); 
        }   
  });
  $scope.setValueSession = function(){
    var tval={};
    tval.day=$scope.subtitle;
    tval.starttime = $scope.starttime;
    tval.endtime = $scope.endtime;
    tval.title=$scope.stitle;
    tval.loc=$scope.sloc;
    tval.track=$scope.tracktitle;
    tval.desc=$scope.sDesc;
    sessionStorage.setItem('sessionVal',angular.toJson(tval));
  };
   $scope.getValueSession = function(){
    var val= sessionStorage.getItem('sessionVal');
    if(val != undefined && val != null && val != ''){
      var tval=angular.fromJson(val);
      if(tval.day!= ''){
        $scope.subtitle = tval.day;
        $('.subtitle').html( $scope.dates[$scope.subtitle].day_name);
      }
      $scope.starttime = new Date(tval.starttime);
      $scope.endtime = new Date(tval.endtime);
      $scope.stitle = tval.title;
      $scope.sloc = tval.loc;
      if(tval.track!= ''){
        $scope.tracktitle = tval.track;
        var t=$filter('filter')($scope.tracks,{track_code:tval.track});
        //console.log(t);
       $('.tracktitle').html( t[0].name);
      }
      $scope.sDesc = tval.desc;
    }
    sessionStorage.setItem('sessionVal','');
  };
   $scope.getTracks().then(function(res){
    if(res)
       $scope.getValueSession();
  });
 
  $scope.getSpeakers=function(){
        $scope.peopledata=[];
        GetDataService.getSpeakers($scope.currentval.event_code).then(function(res){
            if(res.result==1){
                $scope.SpkData=res.data;
               // console.log($scope.SpkData);
            }
        });
  };
  $scope.getSpeakers(); 
  $scope.addSpeaker= function (){
    $scope.setValueSession();
    sessionStorage.setItem('redirect','/event/schedule-session');
     window.location.replace("/event/add-speaker");
  };
  $scope.createSession = function(){
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/session/',
      data:{
        event_code: $scope.currentval.event_code,
        tittle:$scope.stitle,
        day:$scope.subtitle,
        start_time:$filter('date')($scope.starttime,'yyyy-MM-dd')+' '+$scope.starttime.getUTCHours()+':'+$scope.starttime.getUTCMinutes(),
        end_time:$filter('date')($scope.endtime,'yyyy-MM-dd')+' '+$scope.endtime.getUTCHours()+':'+$scope.endtime.getUTCMinutes(),
        location:$scope.sloc,
        speaker_description:$scope.sDesc,
        track:$scope.tracktitle,
        speakers:$scope.SelSpeaker
      }
    }).then(function success(response){
      $scope.data=response.data;
      console.log($scope.data);
      if($scope.data.result==null || $scope.data.result== undefined){
        $scope.errormsg=true;
        $scope.data.error=GetDataService.errorMsg[1];
        console.log($scope.data);
      }else if($scope.data.result==0){
        $scope.errormsg=true;
        $scope.data.error=$scope.data.message;
      }else{  
        console.log($scope.data);
        window.location.replace('/schedule');
      }
      $('#loading').hide();
      $('#container').fadeIn();
    },function error(response){
        $scope.data={};
        console.log(response);
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                $scope.data.error=GetDataService.errorMsg[0];
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
    });
  };


 $scope.breakType='';
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
      $(".breakType").text('Select Track'); 
    }else{
      $scope.breakType=c;
      $(".breakType").text(c); 
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
  $scope.createBreakSession = function(){
    $http({
      method:'POST',
      url:YaraBaseUrl.url+'/break_session/',
      data:{
        event_code: $scope.currentval.event_code,
        tittle:$scope.breakType,
        day:$scope.subtitle,
        start_time:$scope.Bstarttime.getUTCHours()+':'+$scope.Bstarttime.getUTCMinutes(),
        end_time:$scope.Bendtime.getUTCHours()+':'+$scope.Bendtime.getUTCMinutes(),
        location:$scope.BreakLoc,
        include_coupon:$scope.IncludeCP
      }
    }).then(function success(response){
      $scope.data=response.data;
      console.log($scope.data);
      if($scope.data.result==null || $scope.data.result== undefined){
        $scope.errormsg=true;
        $scope.data.error=GetDataService.errorMsg[1];
        console.log($scope.data);
      }else if($scope.data.result==0){
        $scope.errormsg=true;
        $scope.data.error=$scope.data.message;
      }else{  
        console.log($scope.data);
      }
      $('#loading').hide();
      $('#container').fadeIn();
    },function error(response){
        $scope.data={};
        console.log(response);
         $scope.errormsg=true;
        if(response.status==-1 || response.data==null){
                $scope.data.error=GetDataService.errorMsg[0];
        }else
        $scope.data.error=GetDataService.errorMsg[1];
        $('#loading').hide();
        $('#container').fadeIn();
    });
  };

}]);
