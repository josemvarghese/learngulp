!function(e){"use strict";var t=e.module("ngDroplet",[]).directive("droplet",["$rootScope","$window","$timeout","$q",function(t,n,s,i){return{restrict:"EA",require:"?ngModel",scope:{interface:"=ngModel"},controller:["$scope",function(r){r.FILE_TYPES={VALID:1,INVALID:2,DELETED:4,UPLOADED:8,FAILED:16},r.FILE_TYPES.ALL=Object.keys(r.FILE_TYPES).reduce(function(e,t){return e|=r.FILE_TYPES[t]},0),r.files=[],r.isUploading=!1,r.isError=!1;var o=function(e,t){var s=function(e){return"string"==typeof e?e.toLowerCase():e};return t.some(function(t){return t instanceof n.RegExp?t.test(s(e)):s(t)===s(e)})};r.getEvent=function(e){return"originalEvent"in e?e.originalEvent:e},r.isValidHTTPStatus=function(e){return o(e,r.options.statuses.success)},r.isValidExtension=function(e){return o(e,r.options.extensions)},r.options={requestUrl:"",disableXFileSize:!1,parserFn:function(e){return n.JSON.parse(e)},useArray:!0,maximumValidFiles:1/0,requestHeaders:{},requestPostData:{},extensions:[],statuses:{success:[/2.{2}/]}},r.requestProgress={percent:0,total:0,loaded:0},r.listeners={files:[],deferred:null,httpRequest:null,success:function(){this.httpRequest.onreadystatechange=function(){if(4===this.httpRequest.readyState){if(r.isValidHTTPStatus(this.httpRequest.status))return void r.$apply(function(){var n=function(e){var t;try{t=r.options.parserFn(e)}catch(t){return e}return t}(this.httpRequest.responseText);this.deferred.resolve(n,this.files),r.finishedUploading(),e.forEach(this.files,function(e){e.setType(r.FILE_TYPES.UPLOADED)}),t.$broadcast("$dropletSuccess",n,this.files)}.bind(this));this.httpRequest.upload.onerror()}}.bind(this)},error:function(){this.httpRequest.upload.onerror=function(){r.$apply(function(){r.finishedUploading(),r.isError=!0;var e=r.options.parserFn(this.httpRequest.responseText);t.$broadcast("$dropletError",e),this.deferred.reject(e)}.bind(this))}.bind(this)},progress:function(){var e=r.getRequestLength(this.files);this.httpRequest.upload.onprogress=function(t){r.$apply(function(){t.lengthComputable&&(r.requestProgress.percent=Math.round(t.loaded/e*100),r.requestProgress.loaded=t.loaded,r.requestProgress.total=e)})}}},function(){r.DropletModel=function(){},r.DropletModel.prototype={load:function(e){e instanceof n.File||e instanceof n.Blob||r.throwException('Loaded files must be an instance of the "File" or "Blob" objects'),this.file=e,this.date=new n.Date,this.mimeType=e.type,this.extension=r.getExtension(e),t.$broadcast("$dropletFileAdded",this)},deleteFile:function(){this.setType(r.FILE_TYPES.DELETED),t.$broadcast("$dropletFileDeleted",this)},setType:function(e){this.type=e},isImage:function(){return!!this.file.type.match(/^image\//i)}}}(),r.finishedUploading=function(){r.progress={percent:0,total:0,loaded:0},r.isUploading=!1},r.forEachFile=function(t,n){e.forEach(r.filterFiles(t||r.FILE_TYPES.VALID),function(e){n(e)})},r.addFile=function(e,t){t=t||r.FILE_TYPES.VALID;var n=new r.DropletModel;return n.setType(t),r.files.push(n),n.load(e),n},r.filterFiles=function(e){return r.files.filter(function(t){return e&t.type})},r.getExtension=function(e){var t,n;return void 0!==e.name?(t=e.name,n="."):(t=e.type,n="/"),t.indexOf(n)===-1?"":t.split(n).pop().trim().toLowerCase()},r.traverseFiles=function(e){for(var n=0,s=e.length;n<s;n++){var i=e[n],o=r.getExtension(i),a=r.FILE_TYPES.VALID,l=r.options.maximumValidFiles||1/0,u=r.filterFiles(r.FILE_TYPES.VALID).length;(!r.isValidExtension(o)||u>=l)&&(a=r.FILE_TYPES.INVALID,t.$broadcast("$dropletInvalid",i)),r.addFile(i,a)}},r.uploadFiles=function(){r.isError=!1;var t=new n.XMLHttpRequest,s=new n.FormData,o=r.filterFiles(r.FILE_TYPES.VALID),a=r.options.useArray?"file[]":"file",l=r.getRequestLength(o),u=i.defer();return t.open("post",r.options.requestUrl,!0),function(){r.options.disableXFileSize||t.setRequestHeader("X-File-Size",l),r.addRequestHeaders(t),r.addPostData(s)}(),function(){r.listeners.files=o,r.listeners.deferred=u,r.listeners.httpRequest=t,r.listeners.progress(),r.listeners.success(),r.listeners.error()}(),e.forEach(o,function(e){s.append(a,e.file)}),r.isUploading=!0,t.send(s),u.promise},r.addRequestHeaders=function(e){for(var t in r.options.requestHeaders)r.options.requestHeaders.hasOwnProperty(t)&&e.setRequestHeader(t,r.options.requestHeaders[t]);return Object.keys(r.options.requestHeaders)},r.addPostData=function(e){for(var t in r.options.requestPostData)r.options.requestPostData.hasOwnProperty(t)&&e.append(t,r.options.requestPostData[t]);return Object.keys(r.options.requestPostData)},r.getRequestLength=function(e){return(e||r.filterFiles(r.FILE_TYPES.VALID)).reduce(function(e,t){return e+t.file.size},0)},r.throwException=function(e){throw"ngDroplet: "+e+"."},function(){r.interface={FILE_TYPES:r.FILE_TYPES,uploadFiles:r.uploadFiles,progress:r.requestProgress,useParser:function(e){"function"!=typeof e&&r.throwException('Parser function must be typeof "function"'),r.options.parserFn=e},isUploading:function(){return r.isUploading},isError:function(){return r.isError},isReady:function(){return!!r.filterFiles(r.FILE_TYPES.VALID).length},addFile:r.addFile,traverseFiles:r.traverseFiles,disableXFileSize:function(){r.options.disableXFileSize=!0},useArray:function(e){r.options.useArray=!!e},setRequestUrl:function(e){r.options.requestUrl=e},setRequestHeaders:function(e){r.options.requestHeaders=e},setPostData:function(e){r.options.requestPostData=e},getFiles:function(e){return e?r.filterFiles(e):r.files},allowedExtensions:function(t){e.isArray(t)||r.throwException("Extensions must be an array"),r.options.extensions=t},defineHTTPSuccess:function(t){e.isArray(t)||r.throwException("Status list must be an array"),r.options.statuses.success=t}},s(function(){t.$broadcast("$dropletReady",r.interface)})}()}],link:function(e,t){var n=function(n){n=e.getEvent(n),t.removeClass("event-dragleave"),t.removeClass("event-dragenter"),t.removeClass("event-dragover"),t.removeClass("event-drop"),t.addClass("event-"+n.type),n.preventDefault(),n.stopPropagation()};t.bind("dragover dragenter dragleave",n),t.bind("drop",function(t){n(t),e.$apply(function(){t=e.getEvent(t),e.traverseFiles(t.dataTransfer.files)})})}}}]).directive("dropletPreview",["$window",function(e){return{scope:{model:"=ngModel"},restrict:"EA",replace:!0,template:'<img ng-show="model.isImage()" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background-image: url({{imageData}})" class="droplet-preview" />',link:function(t){t.imageData="";var n=new e.FileReader;n.onload=function(e){t.$apply(function(){t.imageData=e.target.result})},t.model.isImage()&&n.readAsDataURL(t.model.file)}}}]);!function(){var e=function(e,n){t.directive(e,function(){return{restrict:"EA",require:"ngModel",replace:!0,template:n,scope:{interface:"=ngModel"},link:function(e,t){t.bind("change",function(){e.$apply(function(){e.interface.traverseFiles(t[0].files)})}),t.bind("click",function(){this.value=null})}}})};e("dropletUploadSingle",'<input class="droplet-upload droplet-single" type="file" />'),e("dropletUploadMultiple",'<input class="droplet-upload droplet-multiple" type="file" multiple="multiple" />')}()}(window.angular);