"use strict";function logerror(e){"test"!==this.get("env")&&console.error(e.stack||e.toString())}function tryRender(e,t,n){try{e.render(t,n)}catch(e){n(e)}}var finalhandler=require("finalhandler"),Router=require("./router"),methods=require("methods"),middleware=require("./middleware/init"),query=require("./middleware/query"),debug=require("debug")("express:application"),View=require("./view"),http=require("http"),compileETag=require("./utils").compileETag,compileQueryParser=require("./utils").compileQueryParser,compileTrust=require("./utils").compileTrust,deprecate=require("depd")("express"),flatten=require("array-flatten"),merge=require("utils-merge"),resolve=require("path").resolve,setPrototypeOf=require("setprototypeof"),slice=Array.prototype.slice,app=exports=module.exports={},trustProxyDefaultSymbol="@@symbol:trust_proxy_default";app.init=function(){this.cache={},this.engines={},this.settings={},this.defaultConfiguration()},app.defaultConfiguration=function(){var e=process.env.NODE_ENV||"development";this.enable("x-powered-by"),this.set("etag","weak"),this.set("env",e),this.set("query parser","extended"),this.set("subdomain offset",2),this.set("trust proxy",!1),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!0}),debug("booting in %s mode",e),this.on("mount",function(e){this.settings[trustProxyDefaultSymbol]===!0&&"function"==typeof e.settings["trust proxy fn"]&&(delete this.settings["trust proxy"],delete this.settings["trust proxy fn"]),setPrototypeOf(this.request,e.request),setPrototypeOf(this.response,e.response),setPrototypeOf(this.engines,e.engines),setPrototypeOf(this.settings,e.settings)}),this.locals=Object.create(null),this.mountpath="/",this.locals.settings=this.settings,this.set("view",View),this.set("views",resolve("views")),this.set("jsonp callback name","callback"),"production"===e&&this.enable("view cache"),Object.defineProperty(this,"router",{get:function(){throw new Error("'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.")}})},app.lazyrouter=function(){this._router||(this._router=new Router({caseSensitive:this.enabled("case sensitive routing"),strict:this.enabled("strict routing")}),this._router.use(query(this.get("query parser fn"))),this._router.use(middleware.init(this)))},app.handle=function(e,t,n){var r=this._router,i=n||finalhandler(e,t,{env:this.get("env"),onerror:logerror.bind(this)});return r?void r.handle(e,t,i):(debug("no routes defined on app"),void i())},app.use=function(e){var t=0,n="/";if("function"!=typeof e){for(var r=e;Array.isArray(r)&&0!==r.length;)r=r[0];"function"!=typeof r&&(t=1,n=e)}var i=flatten(slice.call(arguments,t));if(0===i.length)throw new TypeError("app.use() requires middleware functions");this.lazyrouter();var o=this._router;return i.forEach(function(e){return e&&e.handle&&e.set?(debug(".use app under %s",n),e.mountpath=n,e.parent=this,o.use(n,function(t,n,r){var i=t.app;e.handle(t,n,function(e){setPrototypeOf(t,i.request),setPrototypeOf(n,i.response),r(e)})}),void e.emit("mount",this)):o.use(n,e)},this),this},app.route=function(e){return this.lazyrouter(),this._router.route(e)},app.engine=function(e,t){if("function"!=typeof t)throw new Error("callback function required");var n="."!==e[0]?"."+e:e;return this.engines[n]=t,this},app.param=function(e,t){if(this.lazyrouter(),Array.isArray(e)){for(var n=0;n<e.length;n++)this.param(e[n],t);return this}return this._router.param(e,t),this},app.set=function(e,t){if(1===arguments.length)return this.settings[e];switch(debug('set "%s" to %o',e,t),this.settings[e]=t,e){case"etag":this.set("etag fn",compileETag(t));break;case"query parser":this.set("query parser fn",compileQueryParser(t));break;case"trust proxy":this.set("trust proxy fn",compileTrust(t)),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!1})}return this},app.path=function(){return this.parent?this.parent.path()+this.mountpath:""},app.enabled=function(e){return Boolean(this.set(e))},app.disabled=function(e){return!this.set(e)},app.enable=function(e){return this.set(e,!0)},app.disable=function(e){return this.set(e,!1)},methods.forEach(function(e){app[e]=function(t){if("get"===e&&1===arguments.length)return this.set(t);this.lazyrouter();var n=this._router.route(t);return n[e].apply(n,slice.call(arguments,1)),this}}),app.all=function(e){this.lazyrouter();for(var t=this._router.route(e),n=slice.call(arguments,1),r=0;r<methods.length;r++)t[methods[r]].apply(t,n);return this},app.del=deprecate["function"](app["delete"],"app.del: Use app.delete instead"),app.render=function(e,t,n){var r,i=this.cache,o=n,a=this.engines,s=t,u={};if("function"==typeof t&&(o=t,s={}),merge(u,this.locals),s._locals&&merge(u,s._locals),merge(u,s),null==u.cache&&(u.cache=this.enabled("view cache")),u.cache&&(r=i[e]),!r){var l=this.get("view");if(r=new l(e,{defaultEngine:this.get("view engine"),root:this.get("views"),engines:a}),!r.path){var c=Array.isArray(r.root)&&r.root.length>1?'directories "'+r.root.slice(0,-1).join('", "')+'" or "'+r.root[r.root.length-1]+'"':'directory "'+r.root+'"',d=new Error('Failed to lookup view "'+e+'" in views '+c);return d.view=r,o(d)}u.cache&&(i[e]=r)}tryRender(r,u,o)},app.listen=function(){var e=http.createServer(this);return e.listen.apply(e,arguments)};