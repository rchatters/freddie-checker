var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var minutes = 1;
var the_interval = minutes * 60 * 1000;


app.get('/scrape', function(req, res) {
	var url = 'http://mailchimp.com/replyall/';
	var isAvailable = false;

	//setInterval(function() {
	request(url, function(error, response, html) {

		if(!error) {
			var $ = cheerio.load(html);
			isAvailable = $('button').hasClass('giveaway');
		}
		console.log(isAvailable);
		if(isAvailable) {

		}

		res.send(isAvailable);
	})
 	//}, the_interval);
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;