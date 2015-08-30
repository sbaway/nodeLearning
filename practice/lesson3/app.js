var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res) {
	//用superagent抓取https://cnodejs.org/的内容
	superagent.get('https://cnodejs.org/')
	.end(function(err, sres) {
		//错误处理
		if(err) {
			return next(err);
		}

		//sres.text里存储着网页的html，将它传给cheerio.load
		var $ = cheerio.load(sres.text);
		var items = [];
		/*$('#topic_list .topic_title').each(function(idx, element) {
			items.push({
				title: $(this).attr('title'),
				href: $(this).attr('href')
			});
		});*/
		$('#topic_list .cell').each(function(index, element) {
			//获得作者名字
			var author = $(this).find('.user_avatar img').attr('title');
			console.log("author: " + author);
			var title = $(this).find('.topic_title');
			items.push({
				title: $(title).attr('title'),
				href: $(title).attr('href'),
				author: author
			});
		});

		res.send(items);
		
	});

});

app.listen(3000, function() {
	console.log('app is running at port 3000');
});