## HTTP模块 ##

引入方式：`require('http')`。

### http.createServer([requestListener]) ###

返回一个新的 `http.server` 实例，参数 *requestListener* 是一个函数，并自动添加到它的 *request* 事件上。

### http.Server ###

它是一个事件模块，包含以下主要的事件：

#### Event: 'request' ####

    function (request, response) { }

每当接收到一个请求时就会触发这个事件。其中 *request* 是 http.IncomingMessage 实例， *response* 是 http.ServerResponse 实例。

#### Event： 'close' ####
    
    function () { }

当服务器关闭时触发。

#### server.listen(port, [hostname], [backlog], [callback]) ####

开始在指定的主机上的端口号接受链接。 *port* 为端口号， *hostname* 为主机名，如果没有规定主机名，那么服务器会接受任意IPV4地址的链接请求。

*backlog* 为连接等待队列的最大长度。 *callback* 是一个异步函数，它会被添加到listening 事件上。

### http.ServerResponse ###

它是HTTP服务器内部创建的对象，它作为 'request' 事件的第二个参数传递。 它包含以下事件：

#### Event: 'close' ####

	function () { }

底层连接在`respons.end()`被调用前就断开了。

#### response.writeHead(statusCode[, statusMessage][, headers]) ####

向请求返回响应报文头， statusCode 是HTTP的3位状态码，例如404。 statusMessage 是对状态码的描述信息， headers是响应报文头。

例如： 

	var body = 'hello node';
    response.writeHead(200, {
		'Content-Length': body.length;
		'Content-Type': 'text/plain' });

这个方法必须在 response.end() 之前被调用，而且只能调用一次。