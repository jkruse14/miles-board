var connect=require("connect"),Router=require("./router"),methods=require("methods"),middleware=require("./middleware"),debug=require("debug")("express:application"),locals=require("./utils").locals,View=require("./view"),utils=connect.utils,http=require("http"),app=exports=module.exports={};app.init=function(){this.cache={},this.settings={},this.engines={},this.defaultConfiguration()},app.defaultConfiguration=function(){this.enable("x-powered-by"),this.enable("etag"),this.set("env",process.env.NODE_ENV||"development"),this.set("subdomain offset",2),debug("booting in %s mode",this.get("env")),this.use(connect.query()),this.use(middleware.init(this)),this.on("mount",function(e){this.request.__proto__=e.request,this.response.__proto__=e.response,this.engines.__proto__=e.engines,this.settings.__proto__=e.settings}),this._router=new Router(this),this.routes=this._router.map,this.__defineGetter__("router",function(){return this._usedRouter=!0,this._router.caseSensitive=this.enabled("case sensitive routing"),this._router.strict=this.enabled("strict routing"),this._router.middleware}),this.locals=locals(this),this.locals.settings=this.settings,this.set("view",View),this.set("views",process.cwd()+"/views"),this.set("jsonp callback name","callback"),this.configure("development",function(){this.set("json spaces",2)}),this.configure("production",function(){this.enable("view cache")})},app.use=function(e,t){var n;return"string"!=typeof e&&(t=e,e="/"),t.handle&&t.set&&(n=t),n&&(n.route=e,t=function(e,t,r){var i=e.app;n.handle(e,t,function(n){e.__proto__=i.request,t.__proto__=i.response,r(n)})}),connect.proto.use.call(this,e,t),n&&(n.parent=this,n.emit("mount",this)),this},app.engine=function(e,t){if("function"!=typeof t)throw new Error("callback function required");return"."!=e[0]&&(e="."+e),this.engines[e]=t,this},app.param=function(e){var t=this,n=[].slice.call(arguments,1);return Array.isArray(e)?e.forEach(function(e){n.forEach(function(n){t.param(e,n)})}):"function"==typeof e?this._router.param(e):(":"==e[0]&&(e=e.substr(1)),n.forEach(function(n){t._router.param(e,n)})),this},app.set=function(e,t){return 1==arguments.length?this.settings[e]:(this.settings[e]=t,this)},app.path=function(){return this.parent?this.parent.path()+this.route:""},app.enabled=function(e){return!!this.set(e)},app.disabled=function(e){return!this.set(e)},app.enable=function(e){return this.set(e,!0)},app.disable=function(e){return this.set(e,!1)},app.configure=function(e,t){var n="all",r=[].slice.call(arguments);return t=r.pop(),r.length&&(n=r),("all"==n||~n.indexOf(this.settings.env))&&t.call(this),this},methods.forEach(function(e){app[e]=function(t){return"get"==e&&1==arguments.length?this.set(t):(Array.isArray(t)&&console.trace("passing an array to app.VERB() is deprecated and will be removed in 4.0"),this._usedRouter||this.use(this.router),this._router[e].apply(this._router,arguments),this)}}),app.all=function(){var e=arguments;return methods.forEach(function(t){app[t].apply(this,e)},this),this},app.del=app["delete"],app.render=function(e,t,n){var r,i={},o=this.cache,a=this.engines;if("function"==typeof t&&(n=t,t={}),utils.merge(i,this.locals),t._locals&&utils.merge(i,t._locals),utils.merge(i,t),i.cache=null==i.cache?this.enabled("view cache"):i.cache,i.cache&&(r=o[e]),!r){if(r=new(this.get("view"))(e,{defaultEngine:this.get("view engine"),root:this.get("views"),engines:a}),!r.path){var s=new Error('Failed to lookup view "'+e+'" in views directory "'+r.root+'"');return s.view=r,n(s)}i.cache&&(o[e]=r)}try{r.render(i,n)}catch(e){n(e)}},app.listen=function(){var e=http.createServer(this);return e.listen.apply(e,arguments)};