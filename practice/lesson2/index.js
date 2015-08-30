var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
	//获得请求字符串
	var q = req.query.q;
	//获得字符串对应的md5值
	/*var md5Value = utility.md5(q);*/
	//获得字符串对应的sha1值
	var sha2Value = utility.sha1(q);

	/*res.send(md5Value);*/
	res.send(sha2Value);
});

app.listen(3000, function() {
	console.log('app is running at port 3000');
});