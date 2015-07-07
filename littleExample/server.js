/**
 * Created by xyk on 2015/7/7.
 */
var http = require('http');
var url = require('url');

function start(route, handler) {
    var onRequest = function(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request from ' + pathname + ' recieved.');

        route(handler, pathname);

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello node!');
        res.end();
    }
    http.createServer(onRequest).listen(8080, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8080');
}

exports.start = start;