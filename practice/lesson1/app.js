var express = require('express');
//不带参数的express函数返回一个express实例
var app = express();

//调用app的get方法，为'/'路径指定一个回调函数，回调函数中包含req和res两个参数，
//分别对应浏览器的请求和服务器的相应。req中包含了请求的query，body，header等信息，
//res需要我们写入向浏览器响应的信息。这里调用send方法返回一个字符串
app.get('/', function(req, res) {
	res.send('Hello World!');
});

//让app监听3000端口，回调函数会在开始监听后执行，这里输出正在监听端口的信息
app.listen(3000, function() {
	console.log('app is listening at port 3000');
});