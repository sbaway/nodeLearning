/**
 * Created by xyk on 2015/7/7.
 */
function start() {
    console.log("Request handler 'start' is called.");
}

function upload() {
    console.log("Request handler 'upload' is called.");
}

exports.start = start;
exports.upload = upload;