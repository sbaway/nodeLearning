/**
 * Created by xyk on 2015/7/7.
 */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handler = {};
handler['/'] = requestHandlers.start;
handler['/start'] = requestHandlers.start;
handler['/upload'] = requestHandlers.upload;

/*console.log(handler);*/

server.start(router.route, handler);
