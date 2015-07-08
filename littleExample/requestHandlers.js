/**
 * Created by xyk on 2015/7/7.
 */
var exec = require('child_process').exec;

function start(response) {
    console.log("Request handler 'start' is called.");

    var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' + ' charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<form action="/upload" method="post">' +
            '<textarea name="text" rows="20" cols="60"></textarea>' +
            '<input type="submit" value="Submit" />' +
            '</form>' +
            '</body>' +
            '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();


    /*exec('find /',
        {timeout: 10000, maxBuffer: 20000*1024},
        function(error, stdout, stderr) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(stdout);
        response.end();
    });*/
    /*function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + milliSeconds);
    }
    sleep(10000);
    return 'hello start';*/
}

function upload(response) {
    console.log("Request handler 'upload' is called.");

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello upload!');
    response.end();
    /*return 'Hello upload!';*/
}

exports.start = start;
exports.upload = upload;