var cheerio = require('cheerio');
var async = require('async');
var eventproxy = require('eventproxy');
var fetchUrl = require("./../config/fetchUrl");
var Q = require('q');
var request = require('superagent');

module.exports = function *(next) {
	var name = this.request.body.name;

	var url = fetchUrl.biqugeSearch + "s=287293036948159515" + "&q=" + encodeURIComponent(name);

	var data = {
		status :1,
		data: []
	}

	var deferred = Q.defer();
	request
		.get( url )
		.end( function( err, res ) {
			if(err) {
				data.status = 0;
				data.message = err;
				deferred.reject(data);
			} else {
				var $ = cheerio.load(res.text);

				var lists = $(".result-item");
				for( var i = 0, listLen = lists.length; i < listLen; i++ ) {
					var list = lists.eq(i);
					var title = list.find('.result-game-item-title-link').text();
					var url = list.find('.result-game-item-title-link').attr('href');
					var intro = list.find('.result-game-item-desc').text();

					var tags = list.find(".result-game-item-info-tag");

					data.data.push({
						title: title,
						url: url,
						intro: intro,
						author: tags.eq(0).text(),
						type: tags.eq(1).text()
					});
				}

				deferred.resolve(data);
			}
		})
	this.body = yield deferred.promise;
}