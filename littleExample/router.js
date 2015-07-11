/**
 * Created by xyk on 2015/7/7.
 */
function route(handler, pathname, response, request) {
    console.log('About to route a request for ' + pathname);

    if(typeof handler[pathname] === 'function') {
        handler[pathname](response, request);
    } else {
        console.log('No request handler found for ' + pathname);
        var content = '404 not Found';
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(content);
        response.end();
    }

}

exports.route = route;