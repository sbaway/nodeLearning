/**
 * Created by xyk on 2015/7/3.
 */
var klass = require('./klass');

/*
klass.add("Scott", ["gaofushuai", "baifumei"]);
*/

exports.add = function add(klasses) {
    klasses.forEach(function(item, index) {
        var _klass = item;
        var students = item.students;
        var teacherName = item.teacherName;

        klass.add(teacherName, students);
    })
};

