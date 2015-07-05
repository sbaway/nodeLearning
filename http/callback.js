/**
 * Created by xyk on 2015/7/5.
 */
function learn(something) {
    console.log(something);
}

function we(callback, something) {
    something += " is cool";
    callback(something);
}

we(learn, "nodejs");