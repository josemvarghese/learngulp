'use strict'; 
var app=angular.module('yara',['vcRecaptcha','ngRoute','Image-Upload','YaraService','YaraDirective','Credentails','ngMaterial','ngAnimate','ngAria','ngMaterialDatePicker','mdPickers']);
app.controller('CreateNewEventController',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','GetDataService','$mdpDatePicker','$mdpTimePicker',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,GetDataService,$mdpDatePicker,$mdpTimePicker){
  if(localStorage.getItem('epData')!= undefined){
    $scope.EPdata=localStorage.getItem('epData');
    $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
  }
  $scope.eventtypes=APPService.typedata;
  $scope.selectedval=0;
  $scope.tabsel=1;
  $scope.eventdays='';
  $scope.isEventPrvt=false;
  function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
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
      }else if(/^[a-zA-Z0-9- ]*$/.test(arr[i])){
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
      x+="'"+str[pos].charAt(2)+str[pos].charAt(3);
    }else if(pos1!= '' && str[pos1].length>3){
      x+="-"+str[pos1].substring(0,3);
    }else if(pos1!=''){
      x+="-"+str[pos1];
    }
    if(arr.length==1){
      shrtname=arr[0];
    };
    $scope.eventshrtname=(shrtname.toUpperCase() + x);
    }
  };


  $scope.dates=[];
  var d= new Date();
  d.setDate(d.getDate()+1);
  $scope.currtdate=d;
  $scope.td=$scope;
  $scope.s=APPService;
  $scope.td.datetime={};
  $scope.td.eventstartdate=$filter('date')($scope.currtdate,'dd-MM-yyyy');
  $scope.dates.push($filter('date')($scope.currtdate,'dd-MM-yyyy'));
  $('#evntstarttime'+$filter('date')($scope.currtdate,'dd-MM-yyyy')).val("");
  $scope.getMinDate =function(date){
    date=APPService.parseDate(date);
    if($filter('date')(new Date(),'dd-MM-yyyy')==$filter('date')(date,'dd-MM-yyyy'))
      date=new Date();
    //console.log(date);
    return date;
  };
  $scope.td.datetime[$filter('date')($scope.currtdate,'dd-MM-yyyy')]=$scope.getMinDate($filter('date')($scope.currtdate,'dd-MM-yyyy')); 
  $scope.$watch('td.eventstartdate',function(newval,old){
    if(newval!=undefined){
      $scope.dates=[];
      var dd=$filter('date')(newval,'dd-MM-yyyy');
      $scope.dates.push(dd);
      console.log(dd);
      $('#evntstarttime'+$filter('date')($scope.currtdate,'dd-MM-yyyy')).val("");
      $scope.td.datetime[dd]=$scope.getMinDate(dd); 
    }
  });
  $scope.dissLabel = function(){
    console.log('ok');
  };
 $scope.showDatePicker = function(ev){
      $mdpDatePicker(ev, APPService.parseDate($scope.eventstartdate),$scope.currtdate).then(function(selectedDate) {
        $scope.eventstartdate = $filter('date')(selectedDate,'dd-MM-yyyy');
      });
  };
   /*
  $scope.showTimePicker = function(ev,val,date) {
      $mdpTimePicker(ev, APPService.parseDate(date)).then(function(selectedDate) {
        $('#'+val).val($filter('date')(selectedDate,'hh:mm a'));
        $('#4'+val).val($filter('date')(selectedDate,'hh:mm a'));
        if($('#'+val).val()!='' && $('#'+val).val()!=undefined && $('#'+val).val()!=null){
          $scope.step2form[val].$invalid=false;
          $scope.step2form[val].$valid=true;
          $scope.step2form[val].$error.required=false;
          //console.log($scope.step2form.$error);
          var temp=[];
          if($scope.step2form.$error.required != undefined){
          for(var i=0; i< $scope.step2form.$error.required.length ;i++){
            var f=$scope.step2form.$error.required;
            if(f[i].$name != val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step2form.$error.required=temp;
          if($scope.step2form.$error.required.length==0){
            $scope.step2form.$error={};
            $scope.step2form.$invalid=false;
            $scope.step2form.$valid=true;
          }
        }
        if($('#4'+val).val()!='' && $('#4'+val).val()!=undefined && $('#4'+val).val()!=null){
          $scope.step4form['4'+val].$invalid=false;
          $scope.step4form['4'+val].$valid=true;
          $scope.step4form['4'+val].$error.required=false;
          //console.log($scope.step4form.$error);
          var temp=[];
          if($scope.step4form.$error.required != undefined){
          for(var i=0; i< $scope.step4form.$error.required.length ;i++){
            var f=$scope.step4form.$error.required;
            if(f[i].$name != '4'+val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step4form.$error.required=temp;
          if($scope.step4form.$error.required.length==0){
            $scope.step4form.$error={};
            $scope.step4form.$invalid=false;
            $scope.step4form.$valid=true;
          }
        }
        //console.log( $scope.step2form.$error);
      });
  };
  $scope.showTimePicker1 = function(ev,val,date) {
      $mdpTimePicker(ev, APPService.parseDate(date)).then(function(selectedDate) {
        $('#4'+val).val($filter('date')(selectedDate,'hh:mm a'));
        if($('#4'+val).val()!='' && $('#4'+val).val()!=undefined && $('#4'+val).val()!=null){
          $scope.step4form['4'+val].$invalid=false;
          $scope.step4form['4'+val].$valid=true;
          $scope.step4form['4'+val].$error.required=false;
          console.log($scope.step4form.$error);
          var temp=[];
          if($scope.step4form.$error.required != undefined){
          for(var i=0; i< $scope.step4form.$error.required.length ;i++){
            var f=$scope.step4form.$error.required;
            if(f[i].$name != '4'+val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step4form.$error.required=temp;
          if($scope.step4form.$error.required.length==0){
            $scope.step4form.$error={};
            $scope.step4form.$invalid=false;
            $scope.step4form.$valid=true;
          }
        }
      });
      console.log( $scope.step4form.$error);
  };    
*/
  $scope.addDay = function(){
    var len = $scope.dates.length;
    if(len>=0){
      var d=APPService.parseDate($scope.dates[len-1]);
      d.setDate(d.getDate()+1);
      var dd=$filter('date')(d,'dd-MM-yyyy')
      $scope.dates.push(dd);
      $scope.td.datetime[dd]=$scope.getMinDate(dd); 
      console.log($scope.td.datetime); 
      //$('#evntstarttime'+dd+'-'+mm+'-'+y).val($('#evntstarttime'+$scope.dates[0]).val());
    }
  };

  $scope.deleteDay = function(){
    var len = $scope.dates.length;
    if(len>0){
      $scope.dates.pop();
    }
  };
  $scope.getevntdayjson=function(datelists){
    var evntdays='{';
    for(var i=0;i<datelists.length;i++){
      if(i!=0)
       evntdays +=',';
      evntdays+='"'+datelists[i]+'":{ "starttime":"'+document.getElementById('evntstarttime'+datelists[i]).value.toUpperCase()+'","endtime":"'+document.getElementById('evntendtime'+datelists[i]).value.toUpperCase()+'"}';
    }
    evntdays+="}";
    console.log(evntdays);
    console.log(angular.fromJson(evntdays));
    return evntdays;
    
  };
  $scope.tabSelection=function(val){
   // console.log(val);
    $scope.tabsel=val;
    $anchorScroll(0);
    if(val==3){
    // $scope.eventdays= $scope.getevntdayjson($scope.dates);
    // console.log($scope.eventdays);
    }
    var temp={
          latitude:$scope.searchloc.latitude,
          longitude:$scope.searchloc.longitude
    };
    var temp1={
          latitude:'',
          longitude:''
    };
    $scope.searchloc=temp1;
    $timeout(function(){
      $scope.searchloc=temp;
    },1000);
  };
  $scope.subtypelist=[];
  $scope.selectedtype= function(selectedtypeid){
    $scope.selectedval=selectedtypeid;
    for(var i=0; i< $scope.eventtypes.length ;i++){
      if(selectedtypeid==$scope.eventtypes[i].type_id){
        $scope.subtypelist=$scope.eventtypes[i].sub_type;
        $scope.subtitle='select';
        break;
      }
    }
  }

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
      
$scope.checkSocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.eventweb.length!=0){
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
    if(flag==1){

      $('.'+$scope.social_type).attr('src','../../../static/dashboard/images/'+$scope.social_type+'.png');
    }else{
      $('.'+$scope.social_type).attr('src','../../../static/dashboard/images/'+$scope.social_type+'-gray.png');
    }
  }
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
  $scope.getCountries=function(){
    $http({method:'GET',
        url:'../countries_json' 
      }).then(function success(response){
        $scope.countries=response.data;
      });
  };
  $scope.getCountries();
  $scope.createform =function(form){
    $scope.eventdays= $scope.getevntdayjson($scope.dates);
    $scope.eventenddate=$scope.dates[$scope.dates.length-1];
    if(form.$valid){
       var fd = new FormData();
      fd.append('name',$scope.eventname);
      fd.append('short_name',$scope.eventshrtname);
      fd.append('event_type_id',$scope.eventtypes[$scope.selectedval-1].type_title);
      fd.append('description',$scope.eventdesc);
      fd.append('start_date',$scope.eventstartdate);
      fd.append('end_date',$scope.eventenddate);
      fd.append('days',$scope.eventdays);
      fd.append('venue',$scope.venu);
      fd.append('address_line1', $scope.addrline1);
      fd.append('address_line2',$scope.addrline2);
      fd.append('city',$scope.venucity);
      fd.append('state',$scope.state.name);
      var temp=0;
      if($scope.isEventPrvt==true){
        temp=1;
      }else{
        temp=0;
      }
      fd.append('is_private', temp);
      fd.append('frequency',$scope.evntfreq);
      //console.log($scope.isEventPrvt);
       //console.log(temp);
      fd.append('country',$scope.country.name);
      fd.append('zip',$scope.venupincode);
      fd.append('event_logo',$scope.evntlogo);
      fd.append('agenda_image',$scope.coverimg);
      fd.append('phone_number',$scope.eventph);
      fd.append('website',$scope.eventweb);
      fd.append('facebook', $scope.eventfb);
      fd.append('twitter',$scope.eventtwitter);
      fd.append('email',$scope.eventemail);
      fd.append('longitude',$filter('number')($scope.searchloc.longitude,7));
      fd.append('latitude', $filter('number')($scope.searchloc.latitude,7));
      fd.append('ep_code',$scope.EPdata);
      $scope.errormsg=false;
      console.log(fd);
       $http({
        method:'POST',
        url:YaraBaseUrl.url+'/event/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        console.log($scope.data);
        if($scope.data.result==0){
          $scope.errormsg=true;
        }else{  
          window.location="/dashboard";
        }
      });
    }
  };
  
  $scope.searchloc={
    latitude:"12.9290985",
    longitude:"77.6210238"
  };
  $scope.maploction=function(newValues){
   $scope.address='';
      for(var i=0; i<newValues.length;i++){
        if(newValues[i]!= undefined && newValues[i] !=''){
          $scope.address =$scope.address+newValues[i]+",";
        }
      }
      if($scope.address==''){
         $scope.searchloc={
          latitude:"12.9290985",
          longitude:"77.6210238"
          };
      }else{
        $scope.geocoder = new google.maps.Geocoder();
        $scope.geocoder.geocode( { 'address': $scope.address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $scope.searchloc={
              latitude:results[0].geometry.location.lat(),
              longitude:results[0].geometry.location.lng()
            };
          } 
        });
      } 
  };
  $scope.$watchCollection('[venu,addrline1,addrline2,venucity,state,country,venupincode]', function(newValues)
  {
    if(newValues[4]!=undefined)
     newValues[4]=newValues[4].name;
    if(newValues[5]!=undefined)
     newValues[5]=newValues[5].name;
     $scope.maploction(newValues); 
  });
  $scope.eventfb="https://www.facebook.com/";
  $scope.eventtwitter="https://twitter.com/";
  $scope.getFile = function () {
    $scope.progress = 0;
    if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 1024 && height >= 1024 ){
                $scope.step2form.evntlogo.$setValidity('minDimension',true);
                if(width == height){
                  $scope.step2form.evntlogo.$setValidity('ratioval',true);
                }else{
                  $scope.step2form.evntlogo.$setValidity('ratioval',false);
                }
              }else{
                $scope.step2form.evntlogo.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc = result;
    });
    }
  };
$scope.getFile1 = function () {
  $scope.progress = 0;
   if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 2048 && height >= 1024 ){
                $scope.step3form.coverimg.$setValidity('minDimension',true);
                if(width == (height*2)){
                  $scope.step3form.coverimg.$setValidity('ratioval',true);
                }else{
                  $scope.step3form.coverimg.$setValidity('ratioval',false);
                }
              }else{
                $scope.step3form.coverimg.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc1 = result;
      });
    }
  };
  $scope.getFile2 = function () {
    $scope.progress = 0;
    if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 1024 && height >= 1024 ){
                $scope.step4form.evntlogo.$setValidity('minDimension',true);
                if(width == height){
                  $scope.step4form.evntlogo.$setValidity('ratioval',true);
                }else{
                  $scope.step4form.evntlogo.$setValidity('ratioval',false);
                }
              }else{
                $scope.step4form.evntlogo.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc = result;
    });
    }
  };
$scope.getFile3 = function () {
  $scope.progress = 0;
   if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 2048 && height >= 1024 ){
                $scope.step4form.coverimg.$setValidity('minDimension',true);
                if(width == (height*2)){
                  $scope.step4form.coverimg.$setValidity('ratioval',true);
                }else{
                  $scope.step4form.coverimg.$setValidity('ratioval',false);
                }
              }else{
                $scope.step4form.coverimg.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc1 = result;
      });
    }
  };
}]);

app.controller('EventCouponController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location = "/events";
  }else{
    $scope.selevntdata=localStorage.getItem('selEventsData');
    $scope.currentval=angular.fromJson($scope.selevntdata);
  }
  var st_date=$filter('date')($scope.currentval.start_date,'dd-MM-yyyy');
  var ed_date=$filter('date')($scope.currentval.end_date,'dd-MM-yyyy');
  $scope.dayscount=APPService.dateDiffInDays(APPService.parseDate(st_date),APPService.parseDate(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.selval=$scope.EXselval=$scope.dates[0];
  $scope.displaytime=$scope.expirytime=APPService.parseDate(st_date);
  $scope.currentdate=new Date();
  

  $scope.showTimePicker = function(ev) {
      $mdpTimePicker(ev,$scope.displaytime,$scope.displaytime).then(function(selectedDate) {
         $scope.time=$filter('date')(selectedDate,'hh:mm a');
         $scope.displaytime=selectedDate;
      });
  };
  $scope.showTimePicker1 = function(ev) {
      $mdpTimePicker(ev,$scope.expirytime,$scope.expirytime).then(function(selectedDate) {
         $scope.EXtime=$filter('date')(selectedDate,'hh:mm a');
         $scope.expirytime=selectedDate;
      });
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
  $scope.getFoodCoupon = function(){
    GetDataService.getFoodCoupon($scope.currentval.event_code).then(function(res){
      console.log(res);
    });
  };
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
    var FDSession=new Array($scope.dayscount);
    for(var i=0;i<FDSession.length;i++){
      FDSession[i]=[];
    }
    $scope.foodselect=function(pos,val){
        if(FDSession[pos].indexOf(val)>=0){
           FDSession[pos].splice(FDSession[pos].indexOf(val),1);
        }else{
          FDSession[pos].push(val);
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
        var d1=APPService.parseDate(val);
        d1.setHours($scope.displaytime.getHours());
        d1.setMinutes($scope.displaytime.getMinutes());
        $scope.displaytime=d1;
        $scope.time=$filter('date')(d1,'hh:mm a');
    };
    $scope.EXselectval=function(val){
        $scope.EXselval=val;
        var d1=APPService.parseDate(val);  
        d1.setHours($scope.expirytime.getHours());
        d1.setMinutes($scope.expirytime.getMinutes());
        $scope.expirytime=d1;
        $scope.EXtime=$filter('date')(d1,'hh:mm a');
    };
    $scope.FoodCoupon=function(){
         var accesdays;
      if($scope.FDAllDays==false){
        accesdays='[';
        for(var i=0;i<FDSession.length;i++){
        if(i!=0) accesdays+=',';
          accesdays+='{ "day":"'+$scope.dates[i]+'",';
          accesdays+=' "breakfast":'+(FDSession[i].indexOf('Breakfast')>=0)+',';
          accesdays+=' "lunch":'+ (FDSession[i].indexOf('Lunch')>=0) +',';
          accesdays+=' "coffe":'+ (FDSession[i].indexOf('Coffe')>=0) +',';
          accesdays+=' "dinner":'+ (FDSession[i].indexOf('Dinner')>=0) ;
          accesdays+='}';
        }
        accesdays+=']';
      }else{
        accesdays=[];
      }
      if($scope.forAll==true){
        $scope.FDtickets=[];
      }
      $http({method:'POST',
        url:YaraBaseUrl.url+'/food_coupon/',
        data:{
          event_code:$scope.currentval.event_code,
          all_day_access:angular.fromJson(angular.toJson($scope.FDAllDays)),
          access_days:accesdays,
          for_all:$scope.forAll,
          tickets:$scope.FDtickets
        }
      }).then(function success(response){
        console.log(response.data);
      });
    };
    $scope.CustCoupon = function(){
      var forAll=false;
      if($scope.couponfor=='all'){
        forAll=true;
      }
      $http({method:'POST',
        url:YaraBaseUrl.url+'/custom_coupon/',
        data:{
          event_code:$scope.currentval.event_code,
          name:$scope.CPname,
          coupon_type:$scope.CPtype,
          display_time:$filter('date')($scope.displaytime,'dd-MM-yyyy h:mm a'),
          expiry_time:$filter('date')($scope.expirytime,'dd-MM-yyyy h:mm a'),
          for_all:forAll,
          users:$scope.Custusers ,
          tickets:$scope.Custtickets
        }
      }).then(function success(response){
        console.log(response.data);
      });
    }; 
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
app.controller('TimelineController',['$scope','fileReader','YaraBaseUrl','$http','$location','$filter','APPService','GetDataService','$mdpTimePicker','$interval',function($scope,fileReader,YaraBaseUrl,$http,$location,$filter,APPService,GetDataService,$mdpTimePicker,$interval){
  var selectedval=localStorage.getItem('selectedEventId');
  if(selectedval=== undefined || selectedval === null)
  {
    //$location.path('/Events');
       window.location = "/events";
  }
  $scope.selevntdata=localStorage.getItem('selEventsData');
  $scope.currentval=angular.fromJson($scope.selevntdata);
  var st_date=$filter('date')($scope.currentval.start_date,'dd-MM-yyyy');
  var ed_date=$filter('date')($scope.currentval.end_date,'dd-MM-yyyy');
  $scope.dayscount=APPService.dateDiffInDays(APPService.parseDate(st_date),APPService.parseDate(ed_date));
  $scope.dates=APPService.Dateslist(st_date,$scope.dayscount);
  $scope.currentZoom=30;
  // $scope.Zoomin =function(val){
  //   if(val == '' || val == null || val== undefined){
  //     return 30;
  //   }else if(val == 30){
  //     return 15;
  //   }else if(val == 15){
  //     return 10;
  //   }else if(val == 10){
  //     return 5;
  //   }
  //   return 30;
  // };
  // $scope.Zoomout =function(val){
  //   if(val == 5){
  //     return 10;
  //   }else if(val == 10){
  //     return 15;
  //   }else if(val == 15){
  //     return 30;
  //   }
  //   return 30;
  // };
  $scope.selecttab = function(d){
    //console.log(d);
    $scope.seltab='day'+d;
  };
  $scope.currtab;
  $scope.hover=function(d){
    $scope.currtab=$scope.seltab;
    $scope.seltab='day'+d;
  };
  $scope.hoverleave =function(){
    $scope.seltab=$scope.currtab;
  };
  $scope.leavetab=function(){
    $scope.movement=false;
   // console.log('over');
  };
  var stopmoving;
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
  $scope.movetab = function(tscope){
    $scope.tabMovement(tscope);
    $scope.movement=true;
    stopmoving=$interval(function(){
      if($scope.movement==false){
        $interval.cancel(stopmoving);
      }else{  
        $scope.tabMovement(tscope);
      }
    },2000);
  };
  $scope.timeline=function(startdate,noofdays){
    var days=APPService.Dateslist(startdate,noofdays);
     var stDate= APPService.parseDate(startdate);
    var edDate= APPService.parseDate(startdate) ;
    //console.log($scope.currentval.days);

    var d1= stDate.getDate()+'-'+(stDate.getMonth()+1)+'-'+stDate.getFullYear();
    var ds;
   // console.log(startdate);
    var dy=angular.fromJson(angular.toJson($scope.currentval.days));
    angular.forEach(dy,function(d,key){
      var d2 = APPService.parseDate(key);
      d2=d2.getDate()+'-'+(d2.getMonth()+1)+'-'+d2.getFullYear();
      if(d1==d2)
        ds=d;
    });
    
    var starttime = ds.starttime.split(' ');
    var time =starttime[0].split(':');
    if(starttime[1]==='PM'){
     // console.log(starttime[1]);
      time[0]=Number(time[0])+12;
    }
    stDate.setHours(time[0]);
    stDate.setMinutes(time[1]);
    //console.log(stDate);
    var endtime = ds.endtime.split(' ');
    var time1 =endtime[0].split(':');
    if(endtime[1]=='PM'){
      time1[0]=Number(time1[0])+12;
    }
    edDate.setHours(time1[0]);
    edDate.setMinutes(time1[1]);
    
    /*console.log(edDate);
    stDate.setHours(10);
    edDate.setHours(23);
    */
    //console.log(stDate);
    var duration = moment.duration(moment(edDate).diff(moment(stDate)));
    var hours = duration.asHours();
    //console.log(hours);
    var tDate=[];
    var tobj={};
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
    }else {
      interval=30;
    }
    for (var i = new Date(stDate); i <= edDate; i.setMinutes(i.getMinutes()+1)){
      var tempobj={};
      if((i.getMinutes()%interval)==0){
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
    return tobj;
  };
  
}]);

/*app.directive("timeline", function() {
  return {
        restrict: 'E',
        require: ['timeline', 'ngModel'],
        scope: {
            'startdate': '=',
            'enddate': '=',
        },
        replace: true,
        template: '<div class="mdp-clock">' +
                        '<div class="mdp-clock-container">' +
                            '<md-toolbar class="mdp-clock-center md-primary"></md-toolbar>' +
                            '<md-toolbar ng-style="clock.getPointerStyle()" class="mdp-pointer md-primary">' +
                                '<span class="mdp-clock-selected md-button md-raised md-primary"></span>' +
                            '</md-toolbar>' +
                            '<md-button ng-class="{ \'md-primary\': clock.selected == step }" class="md-icon-button md-raised mdp-clock-deg{{ ::(clock.STEP_DEG * ($index + 1)) }}" ng-repeat="step in clock.steps" ng-click="clock.setTime(step)">{{ step }}</md-button>' +
                        '</div>' +
                    '</div>',
        controller: ["$scope", ClockCtrl],
        controllerAs: "clock",
        link: function(scope, element, attrs, ctrls) {
            var ctrl = ctrls[0],
                ngModel = ctrls[1];
                
            var container = angular.element(element[0].querySelector(".mdp-clock-container")),
                pointer = angular.element(element[0].querySelector(".mdp-pointer"));
            
            scope.type = scope.type || "hours";
            $timeout(function() {
                ctrl.init(ngModel, scope.type);
            });
            
            var onEvent = function(event) {
                if(event.target != container[0]) return;
                var x = ((event.target.offsetWidth / 2) - event.offsetX),
                    y = (event.offsetY - (event.target.offsetHeight / 2));

                var deg = Math.round((Math.atan2(x, y) * (180 / Math.PI)));
                $timeout(function() {
                    ctrl.setTimeByDeg(deg + 180);
                });
            }; 
            
            container.on("mousedown", function() {
               container.on("mousemove", onEvent);
            });
            
            container.on("mouseup mouseout", function() {
               container.off("mousemove", onEvent);
            });
            
            container.on("click", onEvent);
            scope.$on("$destroy", function() {
                container.off("click", onEvent);
                container.off("mousemove", onEvent); 
            });
        }
    }
});*/





/*
use strict'; 
var app=angular.module('yara',['vcRecaptcha','ngRoute','Image-Upload','YaraService','YaraDirective','Credentails','ngMaterial','ngAnimate','ngAria','mdPickers','ngDroplet']);
app.controller('CreateNewEventController',['$scope','APPService','fileReader','$location','$anchorScroll','$timeout','$http','YaraBaseUrl','$filter','$mdpDatePicker','$mdpTimePicker','GetDataService',function($scope,APPService,fileReader,$location,$anchorScroll,$timeout,$http,YaraBaseUrl,$filter,$mdpDatePicker,$mdpTimePicker,GetDataService){

  if(localStorage.getItem('epData')!= undefined){
    $scope.EPdata=localStorage.getItem('epData');
    $scope.EPdata=angular.fromJson($scope.EPdata).ep_code;
  }
  $scope.eventtypes=APPService.typedata;
  $scope.selectedval=0;
  $scope.tabsel=1;
  $scope.eventdays='';
  $scope.isEventPrvt=false;
  function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
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
      }else if(/^[a-zA-Z0-9- ]*$/.test(arr[i])){
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
      x+="'"+str[pos].charAt(2)+str[pos].charAt(3);
    }else if(pos1!= '' && str[pos1].length>3){
      x+="-"+str[pos1].substring(0,3);
    }else if(pos1!=''){
      x+="-"+str[pos1];
    }
    if(arr.length==1){
      shrtname=arr[0];
    };
    $scope.eventshrtname=(shrtname.toUpperCase() + x);
    }
  };


  $scope.dates=[];
  $scope.currtdate= new Date();
  $scope.eventstartdate=$filter('date')($scope.currtdate,'dd-MM-yyyy');
  $scope.showDatePicker = function(ev) {
      $mdpDatePicker(ev, APPService.parseDate($scope.eventstartdate),$scope.currtdate).then(function(selectedDate) {
        $scope.eventstartdate = $filter('date')(selectedDate,'dd-MM-yyyy');
      });
  };
  $scope.showTimePicker = function(ev,val,date) {
      $mdpTimePicker(ev, APPService.parseDate(date)).then(function(selectedDate) {
        $('#'+val).val($filter('date')(selectedDate,'hh:mm a'));
        $('#4'+val).val($filter('date')(selectedDate,'hh:mm a'));
        if($('#'+val).val()!='' && $('#'+val).val()!=undefined && $('#'+val).val()!=null){
          $scope.step2form[val].$invalid=false;
          $scope.step2form[val].$valid=true;
          $scope.step2form[val].$error.required=false;
          //console.log($scope.step2form.$error);
          var temp=[];
          if($scope.step2form.$error.required != undefined){
          for(var i=0; i< $scope.step2form.$error.required.length ;i++){
            var f=$scope.step2form.$error.required;
            if(f[i].$name != val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step2form.$error.required=temp;
          if($scope.step2form.$error.required.length==0){
            $scope.step2form.$error={};
            $scope.step2form.$invalid=false;
            $scope.step2form.$valid=true;
          }
        }
        if($('#4'+val).val()!='' && $('#4'+val).val()!=undefined && $('#4'+val).val()!=null){
          $scope.step4form['4'+val].$invalid=false;
          $scope.step4form['4'+val].$valid=true;
          $scope.step4form['4'+val].$error.required=false;
          //console.log($scope.step4form.$error);
          var temp=[];
          if($scope.step4form.$error.required != undefined){
          for(var i=0; i< $scope.step4form.$error.required.length ;i++){
            var f=$scope.step4form.$error.required;
            if(f[i].$name != '4'+val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step4form.$error.required=temp;
          if($scope.step4form.$error.required.length==0){
            $scope.step4form.$error={};
            $scope.step4form.$invalid=false;
            $scope.step4form.$valid=true;
          }
        }
        //console.log( $scope.step2form.$error);
      });
  };
  $scope.showTimePicker1 = function(ev,val,date) {
      $mdpTimePicker(ev, APPService.parseDate(date)).then(function(selectedDate) {
        $('#4'+val).val($filter('date')(selectedDate,'hh:mm a'));
        if($('#4'+val).val()!='' && $('#4'+val).val()!=undefined && $('#4'+val).val()!=null){
          $scope.step4form['4'+val].$invalid=false;
          $scope.step4form['4'+val].$valid=true;
          $scope.step4form['4'+val].$error.required=false;
          console.log($scope.step4form.$error);
          var temp=[];
          if($scope.step4form.$error.required != undefined){
          for(var i=0; i< $scope.step4form.$error.required.length ;i++){
            var f=$scope.step4form.$error.required;
            if(f[i].$name != '4'+val){
              temp.push(f[i]);
            }
          }
          }
          $scope.step4form.$error.required=temp;
          if($scope.step4form.$error.required.length==0){
            $scope.step4form.$error={};
            $scope.step4form.$invalid=false;
            $scope.step4form.$valid=true;
          }
        }
      });
      console.log( $scope.step4form.$error);
  };    
  $scope.$watchCollection('[eventstartdate]',function(newValue){
    $scope.dates=[];
    $scope.dates.push(newValue[0]);
  });
  $scope.addDay = function(){
    var len = $scope.dates.length;
    if(len>=0){
      var d=APPService.parseDate($scope.dates[len-1]);
      d.setDate(d.getDate()+1);
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var y = d.getFullYear();
      $scope.dates.push(dd+'-'+mm+'-'+y);  
      //$('#evntstarttime'+dd+'-'+mm+'-'+y).val($('#evntstarttime'+$scope.dates[0]).val());
    }
  };

  $scope.deleteDay = function(){
    var len = $scope.dates.length;
    if(len>0){
      $scope.dates.pop();
    }
  };
  $scope.getevntdayjson=function(datelists){
    var evntdays='{';
    for(var i=0;i<datelists.length;i++){
      if(i!=0)
       evntdays +=',';
      evntdays+='"'+datelists[i]+'":{ "starttime":"'+document.getElementById('evntstarttime'+datelists[i]).value+'","endtime":"'+document.getElementById('evntendtime'+datelists[i]).value+'"}';
    }
    evntdays+="}";
   // console.log(evntdays);
   // console.log(angular.fromJson(evntdays));
    return evntdays;
    
  };
  $scope.tabSelection=function(val){
   // console.log(val);
    $scope.tabsel=val;
    $anchorScroll(0);
    if(val==3){
    // $scope.eventdays= $scope.getevntdayjson($scope.dates);
    // console.log($scope.eventdays);
    }
    var temp={
          latitude:$scope.searchloc.latitude,
          longitude:$scope.searchloc.longitude
    };
    var temp1={
          latitude:'',
          longitude:''
    };
    $scope.searchloc=temp1;
    $timeout(function(){
      $scope.searchloc=temp;
    },1000);
  };
  $scope.subtypelist=[];
  $scope.selectedtype= function(selectedtypeid){
    $scope.selectedval=selectedtypeid;
    for(var i=0; i< $scope.eventtypes.length ;i++){
      if(selectedtypeid==$scope.eventtypes[i].type_id){
        $scope.subtypelist=$scope.eventtypes[i].sub_type;
        $scope.subtitle='select';
        break;
      }
    }
  }

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
      
$scope.checkSocials = function(){
    var flag=0;
    if($scope.social_type=='company-website' && $scope.eventweb.length!=0){
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
    if(flag==1){

      $('.'+$scope.social_type).attr('src','../../../static/dashboard/images/'+$scope.social_type+'.png');
    }else{
      $('.'+$scope.social_type).attr('src','../../../static/dashboard/images/'+$scope.social_type+'-gray.png');
    }
  }
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
  $scope.getCountries=function(){
    $http({method:'GET',
        url:'../countries_json' 
      }).then(function success(response){
        $scope.countries=response.data;
      });
  };
  $scope.getCountries();
  $scope.createform =function(form){
    $scope.eventdays= $scope.getevntdayjson($scope.dates);
    $scope.eventenddate=$scope.dates[$scope.dates.length-1];
    if(form.$valid){
       var fd = new FormData();
      fd.append('name',$scope.eventname);
      fd.append('short_name',$scope.eventshrtname);
      fd.append('event_type_id',$scope.eventtypes[$scope.selectedval-1].type_title);
      fd.append('description',$scope.eventdesc);
      fd.append('start_date',$scope.eventstartdate);
      fd.append('end_date',$scope.eventenddate);
      fd.append('days',$scope.eventdays);
      fd.append('venue',$scope.venu);
      fd.append('address_line1', $scope.addrline1);
      fd.append('address_line2',$scope.addrline2);
      fd.append('city',$scope.venucity);
      fd.append('state',$scope.state.name);
      var temp=0;
      if($scope.isEventPrvt==true){
        temp=1;
      }else{
        temp=0;
      }
      fd.append('is_private', temp);
      fd.append('frequency',$scope.evntfreq);
      //console.log($scope.isEventPrvt);
       //console.log(temp);
      fd.append('country',$scope.country.name);
      fd.append('zip',$scope.venupincode);
      fd.append('event_logo',$scope.evntlogo);
      fd.append('agenda_image',$scope.coverimg);
      fd.append('phone_number',$scope.eventph);
      fd.append('website',$scope.eventweb);
      fd.append('facebook', $scope.eventfb);
      fd.append('twitter',$scope.eventtwitter);
      fd.append('email',$scope.eventemail);
      fd.append('longitude',$filter('number')($scope.searchloc.longitude,7));
      fd.append('latitude', $filter('number')($scope.searchloc.latitude,7));
      fd.append('ep_code',$scope.EPdata);
      $scope.errormsg=false;
      console.log(fd);
       $http({
        method:'POST',
        url:YaraBaseUrl.url+'/event/',
        data:fd,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function success(response){
        $scope.data=response.data;
        console.log($scope.data);
        if($scope.data.result==0){
          $scope.errormsg=true;
        }else{  
          window.location="/dashboard";
        }
      });
    }
  };
  
  $scope.searchloc={
    latitude:"12.9290985",
    longitude:"77.6210238"
  };
  $scope.maploction=function(newValues){
   $scope.address='';
      for(var i=0; i<newValues.length;i++){
        if(newValues[i]!= undefined && newValues[i] !=''){
          $scope.address =$scope.address+newValues[i]+",";
        }
      }
      if($scope.address==''){
         $scope.searchloc={
          latitude:"12.9290985",
          longitude:"77.6210238"
          };
      }else{
        $scope.geocoder = new google.maps.Geocoder();
        $scope.geocoder.geocode( { 'address': $scope.address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $scope.searchloc={
              latitude:results[0].geometry.location.lat(),
              longitude:results[0].geometry.location.lng()
            };
          } 
        });
      } 
  };
  $scope.$watchCollection('[venu,addrline1,addrline2,venucity,state,country,venupincode]', function(newValues)
  {
    if(newValues[4]!=undefined)
     newValues[4]=newValues[4].name;
    if(newValues[5]!=undefined)
     newValues[5]=newValues[5].name;
     $scope.maploction(newValues); 
  });
  $scope.eventfb="https://www.facebook.com/";
  $scope.eventtwitter="https://twitter.com/";

  /* image Upload */
/*
  $scope.$on('$dropletReady', function whenDropletReady() {
    $scope.evntlogo.allowedExtensions(['png', 'jpg']);
    $scope.coverimg.allowedExtensions(['png', 'jpg']);
  });
  $scope.$on('$dropletFileAdded',function (prov,arg){
    var len =$scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID).length;
    if(len>0){
      angular.forEach($scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID),function(model,key){
        if(key!=(len-1)){
          model.setType(4);
        }else{
          if(model.file.size > 5242880){
            $scope.step2form.evntlogo.$setValidity('minsizeval',false);
            $scope.step4form.evntlogo.$setValidity('minsizeval',false);
            model.setType(4);
          }else{
            $scope.step2form.evntlogo.$setValidity('minsizeval',true);
            $scope.step4form.evntlogo.$setValidity('minsizeval',true);
          fileReader.readAsDataUrl(model.file, $scope)
        .then(function(result) {
           GetDataService.getImgDimensions(result,function(width, height) {
              if(width >=1024  && height >= 1024 ){
                $scope.step2form.evntlogo.$setValidity('minDimension',true);
                $scope.step4form.evntlogo.$setValidity('minDimension',true);
                if(width == height){
                  $scope.step2form.evntlogo.$setValidity('ratioval',true);
                  $scope.step4form.evntlogo.$setValidity('ratioval',true);
                }else{
                  $scope.step2form.evntlogo.$setValidity('ratioval',false);
                  $scope.step4form.evntlogo.$setValidity('ratioval',false);
                  model.setType(4);
                  $scope.imageSrc="";
                }
              }else{
                $scope.step2form.evntlogo.$setValidity('minDimension',false);
                $scope.step4form.evntlogo.$setValidity('minDimension',false);
                model.setType(4);
                $scope.imageSrc="";
              }
              $scope.$apply();
          });
            $scope.imageSrc = result;
        });
        }
        }
      });

    }
  });
  $scope.$on('$dropletFileDeleted', function () {
    var len =$scope.evntlogo.getFiles($scope.evntlogo.FILE_TYPES.VALID).length;
    if(len<=0){
      $scope.imageSrc="";
    }
  });
  $scope.$on('$dropletError', function () {
   console.log('something Went wrong');
  });
  $scope.getFile = function () {
    $scope.progress = 0;
    if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 1024 && height >= 1024 ){
                $scope.step2form.evntlogo.$setValidity('minDimension',true);
                if(width == height){
                  $scope.step2form.evntlogo.$setValidity('ratioval',true);
                }else{
                  $scope.step2form.evntlogo.$setValidity('ratioval',false);
                }
              }else{
                $scope.step2form.evntlogo.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc = result;
    });
    }
  };

$scope.getFile1 = function () {
  $scope.progress = 0;
   if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 2048 && height >= 1024 ){
                $scope.step3form.coverimg.$setValidity('minDimension',true);
                if(width == (height*2)){
                  $scope.step3form.coverimg.$setValidity('ratioval',true);
                }else{
                  $scope.step3form.coverimg.$setValidity('ratioval',false);
                }
              }else{
                $scope.step3form.coverimg.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc1 = result;
      });
    }
  };
  $scope.getFile2 = function () {
    $scope.progress = 0;
    if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 1024 && height >= 1024 ){
                $scope.step4form.evntlogo.$setValidity('minDimension',true);
                if(width == height){
                  $scope.step4form.evntlogo.$setValidity('ratioval',true);
                }else{
                  $scope.step4form.evntlogo.$setValidity('ratioval',false);
                }
              }else{
                $scope.step4form.evntlogo.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc = result;
    });
    }
  };
$scope.getFile3 = function () {
  $scope.progress = 0;
   if($scope.file.type.indexOf('image')>=0 && ($scope.file.type.indexOf('jpeg')>=0 || $scope.file.type.indexOf('png')>=0)){     
     fileReader.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
        GetDataService.getImgDimensions(result,function(width, height) {
              if(width >= 2048 && height >= 1024 ){
                $scope.step4form.coverimg.$setValidity('minDimension',true);
                if(width == (height*2)){
                  $scope.step4form.coverimg.$setValidity('ratioval',true);
                }else{
                  $scope.step4form.coverimg.$setValidity('ratioval',false);
                }
              }else{
                $scope.step4form.coverimg.$setValidity('minDimension',false);
              }
              $scope.$apply();
          });
        $scope.imageSrc1 = result;
      });
    }
  };
}]); */