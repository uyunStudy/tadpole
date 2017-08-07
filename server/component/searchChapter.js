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
		data: []
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

				var list = $("#list");
				var chapters = list.find('dt').eq(1).nextAll();

				for( var i = 0, cpLen = chapters.length; i< cpLen; i++ ) {
					var chapter = chapters.eq(i);
					var A = chapter.find('a');
					var name = A.text();
					var url = A.attr('href');
					data.data.push({
						name:name,
						url: url
					})
				}
				deferred.resolve(data);
			}
		})

	this.body = yield deferred.promise;
}