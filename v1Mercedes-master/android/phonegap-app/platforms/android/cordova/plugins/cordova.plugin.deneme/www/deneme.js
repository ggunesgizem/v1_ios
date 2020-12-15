var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'deneme', 'coolMethod', [arg0]);
};

exports.permissionCheck = function (arg0, success, error) {
    exec(success, error, 'deneme', 'permissionCheck', [arg0]);
};

exports.permissionAsk = function (arg0, success, error) {
    exec(success, error, 'deneme', 'permissionAsk', [arg0]);
};