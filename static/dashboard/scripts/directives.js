(function (module) {
'use strict';
// check object is empty filter
module.filter('isEmpty', function() {
  return function(input){
    if(angular.equals({}, input)){
     return true;
    }
    return false;
  }
});
// filter boolean values from array
module.filter('FilterBoolObj', function(){
return function(items,filterOn){
    var arr =[];
    angular.forEach(items,function(item){
      if(item==filterOn)
       arr.push(item) ;
    });
    return arr;
};
});
// filter array objects with multiple fields and only used to filter string
module.filter('multFilter', function($filter){
return function(items,filterOn){
    //console.log(filterOn);
    var arr=[];
     angular.forEach(items,function(i){
      var isadd=false;
      angular.forEach(filterOn,function(f,key){
       // console.log(isadd +' '+key +' '+ f +' '+i.username);
        if(!isadd && f == undefined | f==''){
          arr.push(i);
          isadd =true;
        }else if(!isadd && i[key].toLowerCase().indexOf(f.toLowerCase())==0 ){
          arr.push(i);
          isadd =true;
        //  console.log(key+' Push ');
        }
      });
      
    });
  // console.log(arr);
    return arr;
};
});
// images to Q2 quality
module.filter("imagefilterQ2", function () {
  return function (url) {
    var getext=url.split('.').pop();
    var urlcopy=url;
    var result=url.replace('.'+getext, '_Q2.'+getext);
    return result;
  }
});
// images to Q1 quality
module.filter("imagefilterQ1", function () {
  return function (url) {
    var getext=url.split('.').pop();
    var urlcopy=url;
    var result=url.replace('.'+getext, '_Q1.'+getext);
    return result;
  }
})
module.filter('highlight', function($sce) {
    return function(text, phrase) {
      if(text==undefined){
        return;
      }
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

      return $sce.trustAsHtml(text)
    }
  })
// filter and remove duplicates from array object
module.filter('unique', function() {
     return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});
// order by date 
module.filter('customOrderBy', function () {
   return function (arr, parameter) {
  if(arr == undefined)
    return true;
 return arr.sort(function(a, b) {
   return moment(b.time, "HH:mm").diff(moment(a.time, "HH:mm")) > 0 ? -1 : 1;
 });
};
});
// order by date and time
module.filter('DTOrderBy', function () {
   return function (arr, parameter) {
  if(arr == undefined)
    return true;
 return arr.sort(function(a, b) {
   return moment(b.created_at).diff(moment(a.created_at)) < 0 ? -1 : 1;
 });
};
});
//// order by date and time
module.filter('ADTOrderBy', function () {
   return function (arr, parameter) {
  if(arr == undefined)
    return true;
 return arr.sort(function(a, b) {
   return moment(b.activity_time).diff(moment(a.activity_time)) < 0 ? -1 : 1;
 });
};
});
// give time past by passing date
module.filter('timeAgo', ['$interval', function ($interval){
    // trigger digest every 60 seconds
    $interval(function (){}, 60000);

    function fromNowFilter(time){
      return moment(time).fromNow();

    }

    fromNowFilter.$stateful = true;
    return fromNowFilter;
  }]);
//capitalize string
module.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});
//capitalize first word, if true capitalize all words
module.directive('capitalizeWord', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var statdardkeycode;
        var deletecode;
        var capitalize = function() {
           var input = modelCtrl.$viewValue;             
           // console.log(scope.keyvalue.keyCode)
           var all=attrs.capitalizeWord;
           if(all== null || all == undefined || all ==''){
            all=false;
           }
           if (scope.keyvalue!=undefined) {
              if (scope.keyvalue.keyCode== 8 || statdardkeycode==8 || scope.keyvalue.keyCode==37) {
              statdardkeycode=8;
              deletecode=37;
              // console.log(statdardkeycode)
             }else{
               var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
               var val = (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
               modelCtrl.$setViewValue(val);
               modelCtrl.$render();
             }
           }     
          }
         scope.$watch(attrs.ngModel, function() {
          capitalize();
        }); 
     }
   };
});
// check input has word day while adding day name
module.directive('dayWord', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var findword = function() {
           var input = modelCtrl.$viewValue;
           if(input!= undefined && input != null && input!=''){
            input =input.toLowerCase();           
              if(input.indexOf('day')<0 && input.indexOf('day')!=0)
                modelCtrl.$setValidity('invalidword',true);
              else{
                var s=input.split(' ');
                if(s.length==2){
                  if(isNaN(Number(s[1])))
                    modelCtrl.$setValidity('invalidword',true);
                  else
                    modelCtrl.$setValidity('invalidword',false);
                }else
                  modelCtrl.$setValidity('invalidword',true);
              }
            }else{
              modelCtrl.$setValidity('invalidword',true);
            }
          }
         scope.$watch(attrs.ngModel, function() {
          findword();
        }); 
     }
   };
});


// remove copy,cut,past from all input
module.directive('stopccp', function(){
    return {
        scope: {},
        link:function(scope,element){
            element.on('cut copy paste', function (event) {
              event.preventDefault();
            });
        }
    };
});
// check starts with word
module.filter('startswith', function() {
  return function(items, prefix, itemProperty) {
    if(prefix==undefined || prefix == null || prefix =='')
      return true;
    return items.filter(function(item) {
      var findIn = itemProperty ? item[itemProperty] : item;
      return findIn.toString().indexOf(prefix) === 0;
    });
  };
});
// order by dates
module.filter('orderByDayNumber', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
module.filter('custom', function() {
  return function(input, search) {
    //if (!input) input=$filter('orderBy')(input,'name');
    if (!input) return input;
    if (!search) return input;
    //console.log(input);
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
    //  console.log(value.name);
      var actual = ('' + value.name).toLowerCase();
      if (actual.indexOf(expected)==0 ) {
        result[key] = value;
      }
    });
    return result;
  }
});
// including header and footer template
module.directive('ngIncludeTemplate',function(){
  return{
    templateUrl: function(elem, attrs){
      return attrs.ngIncludeTemplate;
    },
    scope:true,
    link: function($scope,el,attrs){
      if(attrs.copyright && new Date().getFullYear()>2010){
        $scope.copyDate=(new Date().getFullYear());
      }
      
    }  
  }
});   
// file selected get file
module.directive("ngFileSelected",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile1();
      })
      
    }   
  }
});
// file selected get file
module.directive("ngFileSelected1",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile2();
      })
      
    }   
  }
});
// file selected get file
module.directive("ngFileSelected2",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile3();
      })
      
    }   
  }
});
// file selected get file
module.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    }  
  }
});
// cust Map directive
module.directive('custMap',function(){
  return {
    restrict: 'EA',
    require: '?ngModel',
    scope:{
        myModel: '=ngModel',
        zoom: '=zoom'
    },
    link: function(scope,element,attrs,ngModel){
      var mapOptions;
      var googleMap;
      var searchMarker;
      var searchLatLng;
      var pervSearchLatLng;
      ngModel.$render = function(){
        searchLatLng = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
        if(scope.myModel.zoom == undefined || scope.myModel.zoom == null || scope.myModel.zoom == '')
          scope.myModel.zoom=12;
        //console.log(scope.myModel.zoom);
        mapOptions = {
            center: searchLatLng,
            zoom: scope.myModel.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
               mapTypeIds: [google.maps.MapTypeId.ROADMAP]
            },
            mapTypeControl: false,
            streetViewControl: false,
          };
            
        googleMap = new google.maps.Map(element[0],mapOptions);
        //var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        searchMarker = new google.maps.Marker({
          position: searchLatLng,
          map: googleMap,
          draggable: true,
          animation: google.maps.Animation.DROP,
          //title:"Drag me!"
          //icon:image
        });
 /*        searchMarker.addListener('click', toggleBounce);
        function toggleBounce() {
  if (searchMarker.getAnimation() !== null) {
    searchMarker.setAnimation(null);
  } else {
    searchMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
}*/
        google.maps.event.addListener(searchMarker, 'dragstart', function(){
          pervSearchLatLng = scope.myModel;
        }.bind(this));
        google.maps.event.addListener(searchMarker, 'dragend', function(){
          // console.log(pervSearchLatLng);
          var geocoder,country,count,state,city,lat,lng;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(searchMarker.getPosition().lat(), searchMarker.getPosition().lng());

            geocoder.geocode(
                {'latLng': latlng}, 
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var add= results[0].formatted_address ;
                                var  value=add.split(",");
                                count=value.length;
                                country=value[count-1];
                                state=value[count-2];
                                city=value[count-3];
                                // console.log(attrs,country,state,city);
                            }
                            else  {
                                console.log("address not found");
                            }
                    }
                     else {
                        console.log("Geocoder failed due to: " + status);
                    }
                    try{
                              if(country != undefined && country.toLowerCase().trim() == attrs.country.toLowerCase().trim() ){ //&& state.toLowerCase().trim().indexOf(attrs.state.toLowerCase().trim())>=0 && city.toLowerCase().trim().indexOf(attrs.city.toLowerCase().trim())>=0 
                                  lat = searchMarker.getPosition().lat();
                                  lng = searchMarker.getPosition().lng();
                                }else{
                                  lat = pervSearchLatLng.latitude;
                                  lng = pervSearchLatLng.longitude;
                                }
                    }catch(error){
                      lat = pervSearchLatLng.latitude;
                      lng = pervSearchLatLng.longitude;
                    }
                                scope.$apply(function(){
                                  scope.myModel.latitude = lat;
                                  scope.myModel.longitude = lng;
                                  var myPosition = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
                                  searchMarker.setPosition(myPosition);
                                });
                }
            );
        }.bind(this));
        
      };
      scope.$watch('myModel', function(value){
        var myPosition = new google.maps.LatLng(scope.myModel.latitude, scope.myModel.longitude);
        searchMarker.setPosition(myPosition);
      }, true);
    }      
  }
});

module.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
// set focus
module.directive('focus',
  function($timeout) {
    return {
      scope : {
        trigger : '@focus'
      },
      link : function(scope, element) {
        scope.$watch('trigger', function(value) {
          if (value === "true") {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  }
); 
/*This directive allows us to pass a function in on an enter key to do what we want*/
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
var focusfields =function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
            if (!ctrl) {
                return;
            }

            elm.on('focus', function () {
                elm.addClass('has-focus');
                 if(!scope.$$phase){
                scope.$apply(function () {
                    ctrl.hasFocus = true;
                });
              }else{
                ctrl.hasFocus = true;
              }
            });

            elm.on('blur', function () {
                elm.removeClass('has-focus');
                elm.addClass('has-visited');
                if(!scope.$$phase){
                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
              }else{
                 ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
              }
            });

            /*elm.closest('form').on('submit', function () {
                elm.addClass('has-visited');

                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });*/

        }
  }
};
//set foucs on input,textarea fields
module.directive('input',focusfields);
module.directive('textarea',focusfields);
// adding twitterurl 
module.directive('twitterUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://twitter.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
                }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// adding tumbulr url , not using currently
module.directive('tumblrUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue(oldval) {
            var pre='https://';
            var post='.tumblr.com';
            if(ngModel.$viewValue != undefined &&  ngModel.$viewValue != '' &&  ngModel.$viewValue != null ){
              var url=ngModel.$viewValue;
              url=(url.replace(pre,''));
              url=(url.replace(post,''));
              ngModel.$setViewValue(url);
              ngModel.$render();
            }
            /*var pre='https://';
            var post='.tumblr.com';
            var space="    ";
            console.log(ngModel.$viewValue);
            if(ngModel.$viewValue == undefined || ngModel.$viewValue == ''){
              ngModel.$setViewValue(pre + space +post);
              ngModel.$render();
              ngModel.$setValidity('urlinvalid',false);
            }
            var url=ngModel.$viewValue;
             if(url.indexOf(post)>=0 && url.indexOf(pre)>=0){
              var subStr = (url.substring(pre.length,url.indexOf(post)));
              var subStr=(subStr.replace(/ /g,''));
              if(subStr.length>=space.length){
                ngModel.$setViewValue(pre + subStr +post);
                var len=(pre +subStr).length;
                elem[0].setSelectionRange(len, len);
              }else{
                //console.log('"'+space.substring(subStr.length)+'"');
                ngModel.$setViewValue(pre + subStr + space.substring(subStr.length) +post);
                var len=(pre +subStr).length;
                elem[0].setSelectionRange(len, len);
              }
              if(subStr.length>0)
                  ngModel.$setValidity('urlinvalid',true);
                else
                  ngModel.$setValidity('urlinvalid',false);
              ngModel.$render(); 
             }else{
              var oldurl=oldval.substring(pre.length,oldval.indexOf(post));
              if(oldval.indexOf(post)>=0 && oldval.indexOf(pre)>=0 && oldurl.length>0){
               ngModel.$setViewValue(pre + oldurl +post);
               var len=(pre +oldurl.replace(/ /g,'')).length;
               elem[0].setSelectionRange(len, len);
                if((oldurl.replace(/ /g,'')).length>0)
                  ngModel.$setValidity('urlinvalid',true);
                else
                  ngModel.$setValidity('urlinvalid',false);
              }else{
                var len=(pre).length;
                elem[0].setSelectionRange(len, len);
                ngModel.$setViewValue(pre + space +post);
                ngModel.$setValidity('urlinvalid',false);
              } 
               ngModel.$render(); 
             }  */
        } ;           
      scope.$watch(attrs.ngModel, function(newval,oldval) {
        inputValue(oldval);
      },true);
    }
  }
});
// web Url
module.directive('webUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='http://';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
                }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// web Url validation
module.directive('webUrlValid', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {

            var url='http://';
            if(ngModel.$viewValue != undefined && ngModel.$viewValue != '' && ngModel.$viewValue != null){
             if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(ngModel.$viewValue))
                ngModel.$setValidity('urlvalid',true);
              else
                ngModel.$setValidity('urlvalid',false);
            }
          }
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// git url
module.directive('githubUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://github.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
                }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// instagram Url
module.directive('instagramUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://www.instagram.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
                }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// pinterest Url
module.directive('pinterestUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://www.pinterest.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
                }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// facebook url
module.directive('fbUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://www.facebook.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
               }
               /*if(ngModel.$viewValue.length <= url.length){
                  ngModel.$setValidity('urlvalid',false);
               }else{
                  ngModel.$setValidity('urlvalid',true);
               }*/
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// validate img 
module.directive('imgValidate', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function getImgDimensions(url, callback) {
        var img = new Image();
        img.src = url;
        img.onload = function() { callback(this.width, this.height); }
      };
      function validate(){
        var file=ngModel.$viewValue;
        if(file.type.indexOf('image')>=0 && (file.type.indexOf('jpeg')>=0 || file.type.indexOf('png')>=0)){
          ngModel.$setValidity('invalidimg',true);
          /*if(file.size>5242880){
              ngModel.$setValidity('minsizeval',false);
          }else{
            ngModel.$setValidity('minsizeval',true);
          }*/
        }else{
           ngModel.$setValidity('invalidimg',false);
        }
      }   
      scope.$watch(attrs.ngModel, function() {
        if(ngModel.$viewValue != undefined && ngModel.$viewValue !=null && ngModel.$viewValue != ''){
          validate();
        }
      });    
              
    }
  }
});
// linked-in url
module.directive('linkedinUrl', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
            var url='https://www.linkedin.com/';
            if(ngModel.$viewValue == undefined){
              ngModel.$setViewValue(url);
              ngModel.$render();  
            }
            var valt = ngModel.$viewValue.replace(url, '');
               var resultval='';
              if(ngModel.$viewValue.indexOf(url)<0 || ngModel.$viewValue.length < url.length){
                  resultval=url;
                  //ngModel.$setValidity('urlvalid',false);
                }else{
                 resultval=url+valt;
                 //ngModel.$setValidity('urlvalid',true);
               }
              ngModel.$setViewValue(resultval);
              ngModel.$render();   
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// words validation ,min 2 words and max 3 words
module.directive('wordValid', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue() {
          var val=ngModel.$viewValue;
            if( val == undefined || val == null || val ==''){
              ngModel.$setValidity('minwords',true);
              ngModel.$setValidity('maxwords',true);
            }else{
              ngModel.$setValidity('minwords',true);
              ngModel.$setValidity('maxwords',true);
              var len=val.split(' ').length;
              var arry=val.split(' ');
              if(len<=1){
                ngModel.$setValidity('minwords',false);
              }else if(len > 3){
                ngModel.$setValidity('maxwords',false);
               /* ngModel.$setViewValue(arry[0]+' '+arry[1]+' '+arry[2]);
                ngModel.$render();*/
              }else{
                ngModel.$setValidity('maxwords',true);
              }
            }
        } ;           
      scope.$watch(attrs.ngModel, function() {
        inputValue();
      });
    }
  }
});
// check error in form and scroll to error
module.directive('accessibleForm', function ($anchorScroll,$location) {
    return {
        restrict: 'A',
        link: function (scope, elem) {

            // set up event handler on the form element
            elem.on('submit', function () {

                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid');

                // if we find one, set focus
                if (firstInvalid) {
                    $('html, body').animate({
                        scrollTop: $(firstInvalid).offset().top - 300
                    }, 'fast');
                   /* console.log($(firstInvalid).offset().top-);
                    $anchorScroll(0);
                    firstInvalid.focus();
                    firstInvalid.blur();*/
                }
            });
        }
    };
});
// toggle class
module.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});
// check input is number or not and allow number only
module.directive('isNumber', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ngModel.$setViewValue(digits);
              ngModel.$render();
            }
            return parseInt(digits,10);
          }
          return null;
        }            
        ngModel.$parsers.push(inputValue); 
    }
  }
});
// validate dail code and allow dail code only
module.directive('isdialcode', function() {
  return {
    require: 'ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9,+,\s,-]/g, '');

            if (digits !== val) {
              ngModel.$setViewValue(digits);
              ngModel.$render();
            }
             digits = val.replace(/[^0-9]/g, '');
            return parseInt(digits,10);
          }
          return null;
        }            
        ngModel.$parsers.push(inputValue); 
    }
  }
});
//  validate password strength , currently not using it
module.directive('passwordStrength', function() {
  return {
    restrict: 'A', 
    require: '?ngModel', 
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; 
      scope.$watch(attrs.ngModel, function() {
        validate();
      });
      var validate = function() {
        // values
        var txtpass = ngModel.$viewValue;
        var lentextpass='';
        if(txtpass != undefined){
            lentextpass=txtpass.length;
        
        var desc = new Array();
         desc[0] = "Very Weak";
         desc[1] = "Weak";
         desc[2] = "Better";
         desc[3] = "Medium";
         desc[4] = "Strong";
         desc[5] = "Strongest";

        scope.score   = 0;

        //if txtpass bigger than 6 give 1 point
        if (lentextpass > 6) scope.score++;
        //if txtpass has both lower and uppercase characters give 1 point
        if ( ( txtpass.match(/[a-z]/) ) && ( txtpass.match(/[A-Z]/) ) ) scope.score++;
        //if txtpass has at least one number give 1 point
        if (txtpass.match(/\d+/)) scope.score++;
        //if txtpass has at least one special caracther give 1 point
        if ( txtpass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) scope.score++;
        //if txtpass bigger than 12 give another 1 point
        if (lentextpass > 12) scope.score++;
        scope.strenghtMsg = desc[scope.score];
        }
      };
    }
  }
});
// validate file, not using it
module.directive('validfile', function validFile() {

    var validFormats = ['jpg', 'gif'];
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$validators.validFile = function() {
                elem.on('change', function () {
                   var value = elem.val(),
                       ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();   
                       ctrl.$setValidity('validimg',validFormats.indexOf(ext) !== -1 );
                       console.log(validFormats.indexOf(ext) !== -1);
                   return validFormats.indexOf(ext) !== -1;
                });
           };
        }
    };
});
// check two password or two fields are equal values
module.directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model
      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });
      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });
      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;
        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});
// validate password policy
module.directive('pwdpolicy', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model
      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });
      
      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var sp=  /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/; 
        var low= /(?=.*\d)(?=.*[A-Z]).{8,}/;
        if(low.test(val1)){
          ngModel.$setValidity('pwdpolicy',true);
        }else{
          ngModel.$setValidity('pwdpolicy',false);
        }
        // set validity
       // ngModel.$setValidity('pwdpolicy', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});
// validate domain
module.directive('domain', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model
      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });
      
      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        
        if(!ngModel.$isEmpty(val1) && ngModel.$error.email==undefined){
          var t = val1.split('@');
          var sp= attrs.domain;
          if(sp!=null || sp!=undefined || sp!=''){
            if(t[1]!=sp)
              ngModel.$setValidity('domain',false);
            else
              ngModel.$setValidity('domain',true);

          }else
            ngModel.$setValidity('domain',false);
            //console.log(ngModel.$error);
        }
        /*var val1 = ngModel.$viewValue;
        var sp= attrs.domain;
        var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        if($EMAIL_REGEXP.test(val1)){
          ngModel.$setValidity('domain',true);
        }else{
          ngModel.$setValidity('domain',false);
        }*/
      };
    }
  }
});
// validate email ids
module.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,63})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          //console.log(modelValue);
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});
/* Drag and Drop */
module.directive('draggable', function() {
    return {
        scope: {
           dragstart: '&',
           dragend:'&'
        },
        link:function(scope, element) {
        // this gives us the native JS object
        // console.log(scope.dragbyid);
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
             // this.style.background= "blue";
            //  this.style.color = "white";
            //  console.log(e);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                scope.$apply('dragstart()');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                scope.$apply('dragend()');
                return false;
            },
            false
        );
      }
    }
});

module.directive('droppable', function() {
    return {
        scope: {
           drop: '&',
           dragover:'&',
           dragenter:'&',
           dragleave:'&'
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];

          el.addEventListener(
            'dragover',
            function(e) {
              e.dataTransfer.dropEffect = 'move';
              // allows us to drop
              if (e.preventDefault) e.preventDefault();
                this.classList.add('over');
                scope.$apply('dragover()');
                return false;
              },
                false
            );
          el.addEventListener(
            'dragenter',
            function(e) {
              this.classList.add('over');
              scope.$apply('dragenter()');
              return false;
            },
            false
          );

          el.addEventListener(
            'dragleave',
            function(e) {
              this.classList.remove('over');
              scope.$apply('dragleave()');
              return false;
            },
            false
          );
          el.addEventListener(
            'drop',
            function(e) {
            // Stops some browsers from redirecting.
            if (e.stopPropagation) e.stopPropagation();
              scope.$apply('drop()');
              this.classList.remove('over');

             // var item = document.getElementById(e.dataTransfer.getData('Text'));
              //this.appendChild(item);

              return false;
            },
            false
          );
        }
    }
});




// date time picker directive
module.directive('dateTimePickerInput', [ '$mdDialog', '$filter', function($mdDialog, $filter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope,
       element,
       attrs,
       ngModelCtrl) {
      if(element[0].tagName.toLowerCase() !== 'input' || attrs['type'].toLowerCase() !== 'text') {
        throw new Error('date-time-picker-input directive must be instantiated as an attribute of a input with type="text"');
      }
      var _openModal;
      element.on('click', function(){
        if(_openModal) return;
        //ngModelCtrl.$setTouched();
        _openModal = $mdDialog.show({
          parent: angular.element(document.querySelector('body')),
          template: '<md-dialog><time-date-picker display-mode="{{displayMode}}" default-mode="{{defaultMode}}" default-date="{{defaultDate}}" mindate="{{mindate}}" maxdate="{{maxdate}}" ng-model="model" on-cancel="onCancel()" on-save="onSave()"></time-date-picker></md-dialog>',
          controller: function ($scope, $mdDialog) {
            // See https://github.com/SimeonC/sc-date-time#options for details
            var passthroughAttrs = ['displayMode', 'defaultDate', 'defaultMode', 'mindate', 'maxdate']
            angular.forEach(passthroughAttrs, function (key) {
              $scope[key] = attrs[key];
            });
            if(angular.isDate(ngModelCtrl.$modelValue)) $scope.model = ngModelCtrl.$modelValue;
            $scope.onCancel = function () {
              $mdDialog.cancel();
              element[0].focus();
              element[0].blur();
            };
            $scope.onSave = function () {
              $mdDialog.hide($scope.model);
            };
          },
          show: true
        }).then(function(newDate) {
          ngModelCtrl.$modelValue.setTime(newDate.getTime());
          ngModelCtrl.$setDirty();
          element.val(formatDate(newDate));
          _openModal = null;
        });
      });
  
      if(attrs['ngMin']) {
        ngModelCtrl.$validators['min'] = function (dateValue) {
          return new Date(dateValue) >= new Date(attrs['ngMin']);
        };
      }
  
      if(attrs['ngMax']) {
        ngModelCtrl.$validators['max'] = function (dateValue) {
          return new Date(dateValue) <= new Date(attrs['ngMax']);
        };
      }
      
      ngModelCtrl.$formatters.push(formatDate);
      function formatDate(value){
        return $filter('date')(value, attrs['displayFormat'] || 'EEEE d MMMM yyyy, h:mm a');
      };
    }
  };
}]);
module.directive('backButton', function(YaraBaseUrl, $http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var DELAY = 300,
                clicks = 0,
                timer = null;

            element.bind('click', goBack);

            function goBack() {             
                clicks++;
                var counts = localStorage.getItem('checked_yara_navigation');
                if (counts=='false') {
                    var popup="<div class=\"modal fade\" id=\"myModal-test\" tabindex=\"-1\" data-backdrop=\"static\"  role=\"dialog\" aria-labelledby=\"myModalLabel\" style=\"background-color: rgba(0,0,0,0.3)!important;\">";
                    popup+="<div class=\"modal-dialog gatekeeper-popup\" role=\"document\" style=\"width:450px;\">";
                    popup+="<div class=\"modal-content modal-padding\" >";
                    // popup+="<div class=\"modal-header-top \">";
                    // popup+="</div >";
                    popup+="<img src=\"../../../static/dashboard/images/close-search.png\" class=\"clearer navigation-close\" data-dismiss=\"modal\" aria-label=\"Close\">"
                    // popup+="<div class=\"logo-bg-white\">"
                    // popup+="</div>"
                    popup+="<div class=\"modal-body1\">";
                    popup+="<div>";
                    popup+="<div class=\"row\">";
                    popup+="<div class=\"col-md-12 text-left\" style=\"padding:2px 0 26px 0;\">";
                    popup+="<h4 class=\"modal-title modal-heading text-left color-black\" id=\"myModalLabel\" >Navigation Tips</h4>";
                    popup+="<div class=\"color-gray font-weight400\">Click once to go to Dashboard";
                    popup+="</div>";
                    popup+="<div class=\"color-gray font-weight400\">Double click to go to previous page";
                    popup+="</div>";
                    popup+="</div>";
                    // popup+="<div class=\"col-md-12 border-top\">";
                    // popup+="<div class=\"col-md-10\"><div  class=\" text-danger\">&nbsp;</div></div>";
                    // popup+="<div class=\"col-md-2 pulse-margin\"><div  data-dismiss=\"modal\" aria-label=\"Close\" class=\"btn01 btn-primary-black-pulse01 \"><a class=\"text-hover\">Close</a></div></div>";
                    popup+="</div>";
                    popup+="</div>";
                    popup+="</div> </div> </div></div></div>";
                    $('body').append( popup );
                    $('#myModal-test').modal('show');
                    clicks = 0;
                    $http({method:'POST',
                      url:YaraBaseUrl.url+'/login_utils/',
                       data:{}
                    }).then(function (res) {
                      console.log(res);
                      if (res.data.result==1) {
                        localStorage.setItem('checked_yara_navigation', res.data.checked_yara_navigation);
                      }                      
                    })
                }else{
                     if (clicks == 1) {
                        timer = setTimeout(function() {
                            // var yaraurl=document.referrer;
                            // console.log(YaraBaseUrl.baseUrl+'dashboard');
                            var dashboardUrl=localStorage.getItem('dashboardUrl')
                            if(dashboardUrl==null){
                              dashboardUrl="dashboard";
                            }
                            // if (showcase=='showcase-dashboard') {
                              window.location=YaraBaseUrl.yaraevents+'/'+dashboardUrl;
                            // }else{
                            //   window.location=YaraBaseUrl.yaraevents+'/dashboard';
                            // }
                            // var res=yaraurl.substring(0, 19);
                            // if (res=="http://localhost:80") {
                            //   window.location="http://localhost:8000/dashboard";
                            // }else{
                            //   window.location="https://yara.events/dashboard";
                            // }                              
                            clicks = 0;
                        }, DELAY);
                    } else if (clicks == 2) {
                        clearTimeout(timer);
                        history.back();
                        scope.$apply();
                        clicks = 0;
                    }
                   
                }
            }
        }
    }
});
module.directive('autoResize', autoResize);
autoResize.$inject = ['$timeout'];
function autoResize($timeout) {
    var directive = {
        restrict: 'A',
        link: function autoResizeLink(scope, element, attributes, controller) {
            element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
            $timeout(function() {
                element.css('height', element[0].scrollHeight + 'px');
            }, 100);
            element.on('input', function() {
                element.css({ 'height': 'auto', 'overflow-y': 'hidden' });
                element.css('height', element[0].scrollHeight + 'px');
            });
        }
    };
    return directive;
};
module.directive("firstName",function(){
    return {
        restrict: "A",
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl){
        var firstname=function () {
          var getname=modelCtrl.$viewValue;
          scope.wordlength=true;
          scope.middleNameMaxLength = false;
          scope.firstNameMaxLength=false;
          scope.lastNameMaxLength=false;
          if (getname!=undefined) {
            var splitnameas=getname.split(' ');
            if (splitnameas.length>=2) {
              scope.wordlength=false;
            }else{
              scope.wordlength=true;
            }
            var len=0;
            if(splitnameas[0].trim().length<=20){
                if(splitnameas.length>2){
                    if(splitnameas[splitnameas.length-1].trim().length<=20){
                        for(var i=1;i<splitnameas.length-1;i++ ){
                          if(splitnameas[i]!=""){
                            len = len+splitnameas[i].trim().length;
                          }
                        }
                        if(len>30){
                              scope.middleNameMaxLength = true;
                              scope.firstNameMaxLength=false;
                              scope.lastNameMaxLength=false;
                        }
                    }
                    else{
                          scope.middleNameMaxLength = false;
                          scope.firstNameMaxLength=false;
                          scope.lastNameMaxLength=true;
                    }
        
                }
            }
            else{
              scope.middleNameMaxLength = false;
              scope.firstNameMaxLength=true;
              scope.lastNameMaxLength=false;
            }
          }
        }
         scope.$watch(attrs.ngModel, function() {
          firstname();
        }); 
        }
    }   
 });
}(angular.module('YaraDirective',[])));