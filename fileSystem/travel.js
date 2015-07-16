/**
 * Created by xyk on 2015/7/16.
 */
var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if(fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel('/我的文档/前端/github/nodeLearning/fileSystem', function(pathname) {
    console.log(pathname);
});
