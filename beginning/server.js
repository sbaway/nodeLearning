/**
 * Created by xyk on 2015/7/3.
 */
var http = require('http');

var server = http.createServer(function (req, res) {
    console.log("Request recevied.");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello node.js\n');
});
server.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
