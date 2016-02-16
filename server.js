var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio 	= require('cheerio');
var app 	    = express();
var fs 			= require('fs');
var path 		= require('path');

var minutes = 1;
var the_interval = minutes * 60 * 1000;

app.set('port', (process.env.PORT || 8081));

var data = JSON.parse(fs.readFileSync(path.join(__dirname + '/data.json'),'utf-8'));
var self = this;
app.get('/', function(req, res) {
	data = data || null;
	if (data) {
	  var isAvailable = false;
	  var notifed = false;
	  setInterval(function() {
		for (var i = 0; i< data.checker.length; i++) {
			var url = data.checker[i].url;
			request(url, function(error, response, html) {
					if(!error) {
						var $ = cheerio.load(html);
						isAvailable = $('button').hasClass('giveaway');
					}
					if(isAvailable && !notifed) {
						//send email
						notifed = true;
					}
					else {
						notifed = false;
					}

					res.send(isAvailable);
				});
		}
 	}, the_interval);
	}
});

app.listen(app.get('port'), function() {
	console.log('Magic happens on port', app.get('port'));
});
exports = module.exports = app;