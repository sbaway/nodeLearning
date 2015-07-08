/**
 * Created by xyk on 2015/7/7.
 */
var http = require('http');
var url = require('url');

function start(route, handler) {
    var onRequest = function(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request from ' + pathname + ' recieved.');

        var postData = '';
        req.setEncoding('utf8');
        req.addEventListener('data', function(dataChunk) {
            postData += dataChunk;
            console.log('Recieved post data chunk ' + dataChunk + '.');
        });


        route(handler, pathname, res);

        /*res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(content);
        res.end();*/
    };
    http.createServer(onRequest).listen(1331, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:1331');
}

exports.start = start;