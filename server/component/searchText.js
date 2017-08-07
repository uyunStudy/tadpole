var cheerio = require('cheerio');
var async = require('async');
var eventproxy = require('eventproxy');
var fetchUrl = require("./../config/fetchUrl");
var Q = require('q');
var request = require('superagent');

module.exports = function *(next) {
	
	var url = this.request.body.url;

	var deferred = Q.defer();

	var data = {
		status: 1,
		data: {}
	}	
	request
		.get( fetchUrl.biquge + url )
		.end( function( err, res ) {
			if(err) {
				data.status = 0;
				data.message = err;
				deferred.reject(data);
			} else {
				var $ = cheerio.load(res.text);

				//获取标题和前后章节
				var detail = $(".bookname").eq(0);
				var title = detail.find("h1").text();
				var A = detail.find(".bottem1 a");
				var prev = A.eq(0).attr("href");
				var menu = A.eq(1).attr("href");
				var next = A.eq(2).attr("href"); 
				data.data.title = title;
				data.data.prev = prev;
				data.data.menu = menu;
				data.data.next = next;


				//获取文本
				data.data.text = [];
				var contents = $("#content")[0].children;
				for( i = 0, ctLen = contents.length; i < ctLen; i++ ) {
					var content = contents[i];
					if(content.type == 'text') {
						data.data.text.push(content.data);
					}
				}

				deferred.resolve(data);
			}
		})

	this.body = yield deferred.promise;
}