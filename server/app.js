var koa = require('koa'),
	router=require('koa-router')(),
	cors = require('koa-cors'),
	logger = require('koa-logger')
  json = require('koa-json');

var route = require('./router/index');

var app = koa();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

//跨域
app.use(cors());

//router
route(router);
app.use(router.routes());

app.listen(8008);