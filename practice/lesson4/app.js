var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
//调用node核心模块url
var url = require('url');

var cnodeUrl = 'https://cnodejs.org';

superagent.get(cnodeUrl)
.end(function(err, res) {
	if(err) {
		console.log(err);
	}
	var topicUrls = [];
	var $ = cheerio.load(res.text);
	//获取首页的所有链接
	$('#topic_list .topic_title').each(function(index, element) {
		//url的resolve方法把两段url拼接起来
		href = url.resolve(cnodeUrl, $(this).attr('href'));
		topicUrls.push(href);
	});
	console.log(topicUrls);

	var ep = new eventproxy();
	ep.after('topic_html', topicUrls.length, function(topics) {
		//topics是一个数组，包含了40次ep.emit('topic_html', pair)中的那40次pair

		topics = topics.map(function(topicPair) {
			var topicUrl = topicPair[0];
			var topicHtml = topicPair[1];
			var $ = cheerio.load(topicHtml);
			return({
				title: $('topic_full_title').text().trim(),
				href: topicUrl,
				comment1: $('.reply_content').eq(0).text().trim()
			});
		});

		console.log('final: ');
		console.log(topics);
	});

	topicUrls.forEach(function(topicUrl) {
		superagent.get(topicUrl)
		.end(function(err, res) {
			console.log('fetch ' + topicUrl + ' successful');
			ep.emit('topic_html', [topicUrl, res.text]);
		});
	});
});