/**
 * Created by xyk on 2015/7/7.
 */
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
    console.log("Request handler 'start' is called.");

    var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' + ' charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            /*'<textarea name="text" rows="20" cols="60"></textarea>' +*/
            '<input type="file" name="upload" multiple="multiple"/>' +
            '<input type="submit" value="Upload File" />' +
            '</form>' +
            '</body>' +
            '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

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


function upload(response, request) {
    console.log("Request handler 'upload' is called.");

    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');
        fs.renameSync(files.upload.path, './tmp/test.png');

        response.writeHead(200, {'Content-Type': 'text/plain'});
        /*response.write("You've sent: " + querystring.parse(postData).text);*/
        response.write('received image:<br/>');
        response.write('<img src="/show" />');
        response.end();
    });
    /*return 'Hello upload!';*/
}

function show(response) {
    console.log("Request handler 'show' is called.");

    fs.readFile('./tmp/test.png', 'binary', function(err, file) {
        if(err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write('error: ' + err);
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;