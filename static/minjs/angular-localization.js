!function(e,n,t,o){"use strict";e.module("ngLocalize.Version",[]).constant("localeVer","1.5.1"),e.module("ngLocalize",["ngSanitize","ngLocalize.Config","ngLocalize.Events","ngLocalize.InstalledLanguages"]),e.module("ngLocalize.InstalledLanguages",[]).value("localeSupported",["en-US"]).value("localeFallbacks",{en:"en-US"}),e.module("ngLocalize").service("locale",["$injector","$http","$q","$log","$rootScope","$window","localeConf","localeEvents","localeSupported","localeFallbacks",function(n,o,r,i,a,l,c,u,s,g){function f(e){return e&&e.length&&P.test(e)}function d(e){var n=e?e.split("."):"",t="";return n.length>1&&(t=n.slice(0,-1).join(".")),t}function v(e){var n=e?e.split("."):[],t="";return n.length&&(t=n[n.length-1]),t}function h(e){var n,t=null,o=e?e.split("."):[];if(o.length>1)for(t=U,n=0;n<o.length-1;n++){if(!t[o[n]]){t=null;break}t=t[o[n]]}return t}function p(e){return(Object.isFrozen||function(e){return e&&e.$$frozen})(e)}function $(e){return(Object.freeze||function(e){e&&(e.$$frozen=!0)})(e)}function m(e,n,t){return e.replace(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),t)}function L(n){var t,r,l,s=n?n.split("."):"",g=U,f=C,v=c.basePath+"/"+f;if(s.length>1){for(l=0;l<s.length-1;l++)r=s[l],g[r]||(g[r]={}),t=g,g=g[r],v+="/"+r;p(g)&&(g=e.extend({},g)),g._loading||(g._loading=!0,v+=c.fileExtension,o.get(v).success(function(e){var o,i=d(n);for(o in e)e.hasOwnProperty(o)&&(g[o]=e[o]);delete g._loading,t[r]=$(g),g=null,a.$broadcast(u.resourceUpdates,{locale:f,path:i,bundle:t[r]}),_[i]&&_[i].resolve(i)}).error(function(e){var t=d(n);i.error("[localizationService] Failed to load: "+v),delete g._loading,_[t]&&_[t].reject(e)}))}}function E(e){var n,t;return e=e||c.langFile,t=e+"._LOOKUP_",n=h(t),_[e]||(_[e]=r.defer()),n&&!n._loading?_[e].resolve(e):n||L(t),_[e].promise}function b(n){var t,o,i;if(e.isString(n))t=n.split(",");else{if(!e.isArray(n))throw new Error("locale.ready requires either an Array or comma-separated list.");t=n}return t.length>1?(i=[],t.forEach(function(e){i.push(E(e))}),o=r.all(i)):o=E(n),o}function z(n,t){var o=n,r=0;return t&&(e.isArray(t)?e.forEach(t,function(e,n){o=m(o,"%"+(n+1),e),o=m(o,"{"+(n+1)+"}",e)}):e.forEach(t,function(e,n){++r,o=m(o,"{"+n+"}",e),o=m(o,"%"+n,e),o=m(o,"%"+r,e),o=m(o,"{"+r+"}",e)})),o=o.replace(/\n/g,"<br>")}function S(n,t){var o,r,a,l="",u=!1;return e.isString(n)&&!t&&n.indexOf(c.delimiter)!==-1&&(a=n.split(c.delimiter),n=a[0],t=e.fromJson(a[1])),u=f(n),u?(e.isObject(t)||(t=[t]),o=h(n),o&&!o._loading?(r=v(n),o[r]?l=z(o[r],t):(i.info("[localizationService] Key not found: "+n),l="%%KEY_NOT_FOUND%%")):o||L(n)):l=n,l}function w(e){e=e.split("-")[0],j.attr("lang",e)}function y(n){var t=null;if(n&&n.length&&(s.forEach(function(e){if(0===e.indexOf(n))return void(t=e)}),!t)){var o=g[n.split("-")[0]];e.isUndefined(o)||(t=o)}return t||c.defaultLocale}function k(n){var t;e.isString(n)&&n.length?(n=n.trim(),t=y(n)):t=c.defaultLocale,t!==C&&(U={},_={},C=t,w(t),a.$broadcast(u.localeChanges,C),x&&x.put(c.cookieName,t))}function O(){return C}function A(){var n,t,o=l.navigator,r=["language","browserLanguage","systemLanguage","userLanguage"];if(e.isArray(o.languages))for(n=0;n<o.languages.length;n++)if(t=o.languages[n])return t;for(n=0;n<r.length;n++)if(t=o[r[n]])return t;return null}var C,_,U,x,P=c.validTokens||new RegExp("^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$"),j=e.element(t.body).parent();return c.persistSelection&&n.has("$cookieStore")&&(x=n.get("$cookieStore")),function(){k(x&&x.get(c.cookieName)?x.get(c.cookieName):A())}(),{ready:b,isToken:f,getPath:d,getKey:v,setLocale:k,getLocale:O,getString:S,getPreferredBrowserLanguage:A}}]),e.module("ngLocalize").filter("i18n",["locale",function(e){var n=function(n,t){return e.getString(n,t)};return n.$stateful=!0,n}]),e.module("ngLocalize.Events",[]).constant("localeEvents",{resourceUpdates:"ngLocalizeResourcesUpdated",localeChanges:"ngLocalizeLocaleChanged"}),e.module("ngLocalize").directive("i18n",["$sce","locale","localeEvents","localeConf",function(n,t,o,r){function i(e,t){t!==e.html()&&e.html(n.getTrustedHtml(t))}function a(e,n,o){t.isToken(n)?t.ready(t.getPath(n)).then(function(){i(e,t.getString(n,o))}):i(e,n)}return function(n,t,i){var l;i.$observe("i18n",function(e,n){e&&e!==n&&a(t,e,l)}),e.forEach(i.$attr,function(e,n){r.observableAttrs.test(e)&&i.$observe(n,function(e){!e&&l&&l[n]||(l=l||{},l[n]=i[n],a(t,i.i18n,l))})}),n.$on(o.resourceUpdates,function(){a(t,i.i18n,l)}),n.$on(o.localeChanges,function(){a(t,i.i18n,l)})}}]).directive("i18nAttr",["$rootScope","locale","localeEvents",function(n,t,o){function r(e,n,t){e.$set(e.$normalize(n),t)}function i(e,n,o){var i={};return function(n){var a,l=e.$eval(n),c=[];for(var u in l)a=l[u],t.isToken(a)&&c.indexOf(t.getPath(a))===-1&&c.push(t.getPath(a));t.ready(c).then(function(){var e="";for(var n in l)a=l[n],e=t.getString(a),i[n]!==e&&(i[n]=e,r(o,n,e))})}}return{priority:1e3,compile:function(t,a){return e.forEach(n.$eval(a.i18nAttr),function(e,n){r(a,n,e||"...")}),function(e,n,t){var r=i(e,n,t);t.$observe("i18nAttr",function(e){e&&r(e)}),e.$on(o.resourceUpdates,function(){r(t.i18nAttr)}),e.$on(o.localeChanges,function(){r(t.i18nAttr)})}}}}]),e.module("ngLocalize.Config",[]).value("localeConf",{basePath:"languages",defaultLocale:"en-US",sharedDictionary:"common",fileExtension:".lang.json",persistSelection:!0,cookieName:"COOKIE_LOCALE_LANG",observableAttrs:new RegExp("^data-(?!ng-|i18n)"),delimiter:"::",validTokens:new RegExp("^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$")})}(this.angular,0,this.document);