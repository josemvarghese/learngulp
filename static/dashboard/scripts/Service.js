(function (module) {
'use strict';   
    
module.service('GetDataService',function($http,YaraBaseUrl,$filter){
  // email urls
  this.permission ={
          'Coupons':'/event/coupon',
          'People':'/collaborator/people',
          'Post':'/event/pulse',
          'SessionEngage':'/event/sessionengage',
          'Vote':'/event/vote',
          'GateKeeper':'/collaborator/gatekeeper',
          'Tickets':'/event/ticket',
          'FloorMap':'/event/floor-map',
          'GeoCircle':'/event/venue-greet',
          'FileBank':'/event/filebank',
          'Exhibitors':'/event/exhibitor',
          'Sponsors':'/event/sponsor',
          'ShowCase':'/collaborator/showcase',
          'Schedule':'/collaborator/schedule',
          'AdSpace':'/collaborator/adspace',
          'WiFi Spots':'/event/wifi', 
          'VenueGreet':'/event/venue-greet'
        };
// error msg
    this.errorMsg =[
      'You Are Not Connected to the Internet.',
      'Something went wrong',
      'Atleast one email preference',
      'Already a user exists with this email',
      'You can not invite one who is not in your domain',
      '0 Emails Found, Please upload proper file',
    ];
    // pre defined social image id's and class , to avoid add blockers
    this.socilalist =[{
        'social_provider': 'company-website',
        'imgId': '001'
      },{
        'social_provider': 'twitter',
        'imgId': '002'
      },{
        'social_provider': 'facebook',
        'imgId': '003'
      },{
        'social_provider': 'linkedin',
        'imgId': '004'
      },{
        'social_provider': 'pinterest',
        'imgId': '005'
      },{
        'social_provider': 'tumblr',
        'imgId': '006'
      },{
        'social_provider': 'git-hub',
        'imgId': '007'
      },{
        'social_provider': 'instagram',
        'imgId': '008'
      },{
        'social_provider': 'phone',
        'imgId': '009'
      },{
        'social_provider': 'message',
        'imgId': '010'
      }
    ];
    this.getSocailId =function(s){
      //console.log(s);
      return (($filter('filter')(this.socilalist,{social_provider:s}))[0].imgId);
    };
    //Fetching functionaly 
    this.getData= function(urlval){
        var s=this;
         var returnval= $http({
            method:'GET',
            url:YaraBaseUrl.url+'/'+urlval+'/'
        }).then(function success(response){
          //console.log(response);
            if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[0]};
            }
            if(response.data.result == undefined && response.data.objects == undefined){
                return {result:0,message:s.errorMsg[1]};
            }else if(response.data.result == 5){
                //window.location ="/sign-in";
                return response.data;
            }
            return response.data;
        },function failed(response){
            if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[0]};
            }
            if(response.data.message=="Anonymous user")
              return {result:0,message:response.data.message};
            return {result:0,message:s.errorMsg[1]};
        });  
        
        return returnval;
    }; 
    this.getarchived=function () {
      var returnval=$http({
        method:'GET',
        url:YaraBaseUrl.url+'/archived_event/'
      }).then(function (response) {
         return response.data;
      })
      return returnval;
    };
    this.getDataParam= function(urlval,paramval){
        var s=this;
        var returnval= $http({
            method:'GET',
            url:YaraBaseUrl.url+'/'+urlval+'/',
            params:{
                event_code:paramval
            }
        }).then(function success(response){
             if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[0]};
            }
            if(response.data.result == undefined && response.data.objects == undefined){
                return {result:0,message:s.errorMsg[1]};
            }
            if(response.data.objects != undefined){
                response.data.result=1;
            }
            return response.data;
        },function failed(response){
            if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[0]};
            }
            if(response.data.message=="Anonymous user")
              return {result:0,message:response.data.message};
            return {result:0,message:s.errorMsg[1]};
        });    
        return returnval;
    } 
    this.getDataParams= function(urlval,paramval){
        var s=this;
        var returnval= $http({
            method:'GET',
            url:YaraBaseUrl.url+'/'+urlval+'/',
            params:paramval
        }).then(function success(response){
           if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[0]};
            }
            if(response.data.result == undefined && response.data.objects == undefined){
                return {result:0,message:s.errorMsg[1]};
            }
            if(response.data.objects != undefined){
                response.data.result=1;
            }
            return response.data;
        },function failed(response){
            if(response.status==-1 || response.data==null){
                return {result:0,message:s.errorMsg[1]};
            }
            if(response.data.message=="Anonymous user")
              return {result:0,message:response.data.message};
            return {result:0,message:s.errorMsg[0]};
        });    
        return returnval;
    } 
   
    // get images urls
     this.getGallery =function(eventCode){
        return this.getDataParam('gallery',eventCode); 
    };
    //get images url with params
     this.getGalleryArchived =function(params){
        return this.getDataParams('gallery',params); 
    };
    // get location
    this.eventLocalTz =function(params){
        return this.getDataParams('local_tz',params); 
    };
    //get speakers
    this.eventDayAccessories =function(params){
        return this.getDataParams('event_day_accessories',params); 
    };
    // Fetching Event List
    this.getEvents =function(){
        return this.getData('event'); 
    };
    // Fetching News List
    this.getNewsevent =function(){
        return this.getData('yara_news'); 
    };
    // Fetching Decipher event List
    this.getDecipherEvents =function(){
        return this.getData('decipher_event'); 
    };
    this.getDecipherEventsDash =function(eventCode){
        return this.getDataParam('decipher_event',eventCode); 
    };
    // gatekeeper download code
    this.getgatekeepercode =function(eventCode){
        return this.getDataParam('gate_keeper_code',eventCode); 
    };
    // Fetching a Event 
    this.getEvent=function(eventCode){
        return this.getDataParam('event',eventCode); 
    };
    //fetching decipher dashboard
    this.getDechiperdashboard=function(eventCode){
        return this.getDataParam('decipher_dashboard',eventCode); 
    };
    //fetching collaborator permission avilabile
    this.getCollaboratorPermission=function(eventCode){
        return this.getDataParam('available_kits',eventCode); 
    };
    // Fetching Event Collaborators With Event Code
    this.getCollaborators=function(eventCode){
        return this.getDataParam('collaborator',eventCode); 
    };
    
    // Fetching Event Sponsors With Event Code
    this.getSponsors=function(eventCode){
        return this.getDataParam('sponsor',eventCode); 
    };
    
    // Fetching Event Exhibitors With Event Code
    this.getExhibitors=function(eventCode){
        return this.getDataParam('exhibitor',eventCode); 
    };
    
    // Fetching Event WiFi With Event Code
    this.getWifi=function(eventCode){
        return this.getDataParam('wifi',eventCode); 
    };
    // Fetching Event details for showcase and collaborator
    this.eventInfo=function(eventCode){
        return this.getDataParam('init_showcase',eventCode); 
    }; 
    // Fetching Event Pulse With Event Code
    this.getPulse=function(eventCode){
        return this.getDataParam('post',eventCode); 
    };

    // Fetching Showcase Activity With Event Code
    this.getShowCaseActivity=function(eventCode){
        return this.getDataParam('showcase_activities',eventCode); 
    };
    
    // Fetching Event Tickets With Event Code
    this.getTickets=function(eventCode){
        return this.getDataParam('ticket',eventCode); 
    };
    // Fetching Event Tickets that avilabile With Event Code
    this.getAvilabileTickets=function(params){
        return this.getDataParams('ticket/update',params); 
    };    
    // Fetching archived event with event code
    this.getDel=function(eventCode){
        return this.getDataParam('delegate',eventCode); 
    };
    // Fetching Event Tracks With Event Code
    this.getTracks=function(eventCode){
        return this.getDataParam('track',eventCode); 
    };
    // Fetching sessions of particular event code
    this.getSessions=function(eventCode){
        return this.getDataParam('session',eventCode); 
    };
    
    // Fetching Event Floor Map With Event Code
    this.getFloorMap=function(eventCode){
        return this.getDataParam('floor_map',eventCode); 
    };
    
    // Fetching App Users With Event Code
    this.getAppUsers=function(params){
        // console.log(params);
        return this.getDataParams('delegate',params); 
    };
    // getting the details of adspace slots avilabile
    this.getAvilabileslots=function(params){
        // console.log(params);
        return this.getDataParams('add_status',params);
    };
    // Fetching peoples
    this.getPeoples=function(params){
        return this.getDataParams('delegate',params); 
    };

    // Fetching PeopleSearch
    this.getPeopleSearch=function(params){
        return this.getDataParams('people/search',params); 
    };
    // fetching list delegates for the event
    this.getPeopleInfo = function(params){
        // return this.getDataParams('sp-delegate',params); 
        return this.getDataParams('event_people',params); 
    };   
    // fetching list delegates for the event using search
    this.getPeoplesearchInfo = function(params){
        return this.getDataParams('people/elastic_search',params); 
    }; 
    // Fetching Event Speakers With Event Code
    this.getSpeakers=function(params){
        return this.getDataParams('sp-delegate',params); 
    };
    // Fetching Event Vote With Event Code
    this.getVote=function(params){
        return this.getDataParams('vote',params); 
    };
    
    // Fetching Event Ticket Colors With Event Code
    this.getTicketColors=function(eventCode){
        return this.getDataParam('ticket_color_code',eventCode); 
    };
    // Fetching Event Packages
    this.getEventPackage=function(){
        return this.getData('event_package'); 
    };
    // fetch login details
    this.getlogindetails=function(){
        return this.getData('login_utils'); 
    };
    // Fetching Event Package with event code
    this.getPackage=function(eventCode){
        return this.getDataParam('event_package',eventCode); 
    };
    // fetching gatekeeper people
    this.gatekeeperPeopleinfo=function(params){
        return this.getDataParams('gate_keeper',params); 
    };
    // Fetcing gatekeeperbasic information 
    this.gatekeeperInfo = function(eventCode){
      return this.getDataParam('pre-checkin',eventCode); 
    }
    // Fetching All Issues
    this.getAllIssues=function(){
        return this.getData('happy_help'); 
    };

    // Fetching All Bill
    this.getAllBills=function(){
        return this.getData('bill'); 
    };

    // Fetching Issues with event code
    this.getIssues=function(eventCode){
        return this.getDataParam('happy_help',eventCode); 
    };
    // Fetching Custom Coupons with event code
    this.getCustomCoupon=function(eventCode){
        return this.getDataParam('custom_coupon',eventCode); 
    };
    // Fetching Food Coupons with Event Code
    this.getFoodCoupon=function(eventCode){
        return this.getDataParam('food_coupon',eventCode); 
    };
    // Fetching VenueGreet with Event Code
    this.getVenueGreet=function(eventCode){
        return this.getDataParam('geo_circle',eventCode); 
    };

    // Fetching Session with Event Code
    this.getSession=function(params){
        return this.getDataParams('session',params); 
    };
    // Fetching all sessions including break sessions
    this.getallSessions = function(params){
        return this.getDataParams('session',params); 
    };
    // Fetching all sessions including break sessions
    this.getSessionInfo = function(params){
        return this.getDataParams('session',params); 
    };
   // Fetching a break session
    this.getbrkSessionInfo = function(params){
        return this.getDataParams('break_session',params); 
    };
    // Fetching adspace button title
    this.getAdBtnTitle=function(){
        return this.getData('ad_tittle'); 
    };

    // Fetching Assets
    this.getAssets=function(){
        return this.getData('asset'); 
    };

    // Fetching Follow button title
    this.getFollow=function(){
        return this.getData('follow'); 
    };

    this.getImgDimensions=function(url, callback) {
        var img = new Image();
        img.src = url;
        img.onload = function() { callback(this.width, this.height); }
    };
    this.getPromotion=function(eventCode){
      return this.getDataParam('booking_channel',eventCode); 
    }
    // Fetching All error msg
    this.getAllerrormsg=function(){
        return this.getData('ui_message'); 
    };
    // Logout
    this.Signout =function(){
        return this.getData('signout'); 
    };

    // Fetching Current User
    this.getCurrtUser=function(){
        return this.getData('current_user'); 
    };
    // feching break session types
    this.getbreakSessionTypes=function(){
        return this.getData('break_types'); 
    }
    // feching break event types
    this.getEventTypes=function(){
        return this.getData('event_types'); 
    }
    // Fetching Orgz Company
    this.getOrganizer=function(params){
        return this.getDataParams('organizer',params); 
    };
    // Fetching AdSpace data
    this.getAdspace=function(params){
        return this.getDataParams('add_time_slot',params); 
    };
  // Fetching avilabile coupons for delegate
    this.delegateCoupons=function(params){
        return this.getDataParams('coupon_zone',params); 
    };
    // Fetching email preference Company
    this.getPreference=function(params){
        return this.getData('preference'); 
    };
    // Fetching all timezone
    this.getTimezone=function(){
        return this.getData('timezone-list'); 
    };
    // Fetching all Event types
    this.getEventtypes=function(){
        return this.getData('event/get-event-type'); 
    };
        // Fetching all getBreaktypes
    this.getBreaktypes=function(){
        return this.getData('break_types'); 
    };
    // Fetching event locations
    this.getEventlocations=function(eventCode){
      return this.getDataParam('event_location',eventCode); 
    }

    // fetch local data and check privilege and return it
    this.getPrivilege=function(from){
          var d=JSON.parse(localStorage.getItem("Logininfo"));
          if(d== undefined || d== null){
            return '';
          }
          if(d.privilege == 1){
                d.privilege_level='Admin';
                return d.privilege_level;
           }
       };
    // convert img dataURI to blob object
    this.dataURItoBlob = function(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    }; 
    // add the offset time to the utc time
    this.userOffsetTime = function(datetime,offset) {
      var res,dates ;

      if(datetime!=undefined && datetime!=null){  
          var res = datetime.split(" ");
          var dates = res[0].split("-");
      }
      else {return;}
      if(res[1]!=undefined && res[1]!='' && res[1]!=null){
          var time = res[1].split(":");
      }
      var bDate = new Date(2017,3,31);
      bDate.setDate(parseInt(dates[2]));
      bDate.setFullYear(parseInt(dates[0]));
      bDate.setMonth(parseInt(dates[1])-1);
      if(res[1]!=undefined && res[1]!='' && res[1]!=null){
        bDate.setHours(parseInt(time[0]));
        bDate.setMinutes(parseInt(time[1]));
        bDate.setSeconds(0);
      }
      bDate.setMinutes(bDate.getMinutes() +  offset );
      return bDate;
    };
    // offset show single date 
    this.startend=function(starttime, endtime, off) {
        // console.log(starttime, endtime, off, "sdgmdgjh")
        if (typeof starttime=='string' && typeof endtime=='string') {
            var offsetconvert=this.userOffsetTime
            var st=offsetconvert(starttime, off);
            var et=offsetconvert(endtime, off);
            var stdate=st.getDate()+"-"+st.getMonth()+1+"-"+st.getFullYear();
            var etdate=et.getDate()+"-"+et.getMonth()+1+"-"+et.getFullYear();
            var result;
            if (stdate==etdate) {
                result=true;
            }else{
                result=false;
            }
        }        
        return result;
    }
        // add the offset time to the utc time
    this.dashboardUrl = function() {
        return localStorage.getItem('dashboardUrl');
    };
    this.timeTo12HrFormat = function(time,timeFormat) {
        var time_part_array = time.split(":");
        var ampm = 'AM';
        if(!timeFormat){
            if (time_part_array[0] == 0 && time_part_array[1] == 0) { 
            time_part_array[0] = 12;
              ampm = 'AM';
            }
            else if (time_part_array[0] >= 12) { 
              ampm = 'PM';
            }
            if (time_part_array[0] > 12) {
              time_part_array[0] = time_part_array[0] - 12;
            }
            var formatted_time = pad(time_part_array[0]) + ':' + pad(time_part_array[1]) + ' ' + ampm;
        }
        else{
            var formatted_time = pad(time_part_array[0]) + ':' + pad(time_part_array[1]);
        }
            // console.log(formatted_time);  

        return formatted_time;
    }; 
    var pad = function (d){return (d < 10) ? '0' + d.toString() : d.toString();}
    this.validateLocation = function(locName){
        if(locName==undefined || locName=='' ||locName==null){
            return false;
        }
        var locationName= locName.split(' ');
        if(locationName[0].toLowerCase()=='location'){
            return true;
        }
        var regExp1 = /^location[1-9][0-9]*$/;
        var regExp2 = /^location[^a-zA-Z0-9][0-9][0-9]*$/;
        if(locName.toLowerCase()=='location'){
            return true;
        }
        else if(regExp1.test(locName.toLowerCase()) || regExp2.test(locName.toLowerCase())){
            return true;
        }
        return false;
    };
  });
module.service('APPService',function($http,YaraBaseUrl){
  // pre- defined event types and sub types
  this.typedata=[
    {
      'type_id':1,
      'type_title':'Conference',
      'sub_type':["Education","Tech","General"]
    },
    {
      'type_id':2,
      'type_title':'Exhibition',
      'sub_type':["Education","Tech","General"]
    },
    {
      'type_id':3,
      'type_title':'Lifestyle',
      'sub_type':["New Trand","Designs","General"]
    },
    {
      'type_id':4,
      'type_title':'Conclave',
      'sub_type':["Conclave","Conclave 1","General"]
    }
  ];
  this.selectType=0;
  this.attendCount=0;
  this.price=0;
  // read params from url
  // search_string -url
  this.get_params = function(search_string) {

    var parse = function(params, pairs) {
      var pair = pairs[0];
      var parts = pair.split('=');
      var key = decodeURIComponent(parts[0]);
      var value = decodeURIComponent(parts.slice(1).join('='));

      // Handle multiple parameters of the same name
      if (typeof params[key] === "undefined") {
        params[key] = value;
      } else {
        params[key] = [].concat(params[key], value);
      }
      return pairs.length == 1 ? params : parse(params, pairs.slice(1))
    }
    // Get rid of leading ?
    return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
  };
  // get days count between dates ,'first' - start date and 'second' - end date
  this.dateDiffInDays=function(first, second) {
   return Math.round((second-first)/(1000*60*60*24))+1;
  };
  // Parse date string to date object
 this.parseDate=function(str) {
    if(str != undefined){
     // console.log(str);
      return new Date(str);
    }
      return new Date();
  };
  // parse date and time of UTC to Local date and time
  this.parseDTime = function(str) {
    if(str != undefined){
      var d = str.split(' ');
      if(d[2]!=undefined)
      d[1]+=d[2];
      var t = d[1].split(':');
      var date= d[0].split('-');3
      var d1 = new Date(date[0]+'-'+date[1]+'-'+date[2]+' '+t[0]+':'+t[1]+' UTC');
      if(d1=='Invalid Date') 
      d1=new Date(Date. UTC(date[0],(date[1]-1),date[2],t[0],t[1]) ) ;
      return d1;
    }
    return false;
  };
  // get as date object used while orderby filter
  this.parseDT = function(item) {
    //console.log(item.created_at);
   if (item === undefined || item.created_at === undefined)
      return false;
     return new Date(item.created_at);
  };
  // get as date object used while orderby filter
  this.parseDTA = function(item) {
  /*  console.log(item);*/
   if (item === undefined || item.activity_time === undefined)
      return false;
     return new Date(item.activity_time);
  };
  // get dates array ,'start' - starting date ,'days' - number of dates
  this.Dateslist=function(start,days){
    var datelists=[];
    for(var i=0;i<days;i++){
      var d=new Date(start);
      d.setDate(d.getDate()+i);
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var y = d.getFullYear();
      mm= ("0" + mm).slice(-2);
      dd= ("0" + dd).slice(-2);
      datelists.push(y+'-'+mm+'-'+dd);    
    }
    return datelists;
  };
  // scroll to element using jquery , 'id'-element Id
  this.scrollJquery =function(id){
    $('html, body').animate({
        scrollTop: $("#"+id).offset().top - 300
    }, 'fast');
  };
});

}(angular.module('YaraService',[])));