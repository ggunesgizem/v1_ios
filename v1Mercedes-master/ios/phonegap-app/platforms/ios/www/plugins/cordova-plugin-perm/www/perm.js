cordova.define("cordova-plugin-perm.perm", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'perm', 'coolMethod', [arg0]);
};
exports.permCheck = function (arg0, success, error) {
    exec(success, error, 'perm', 'permCheck', [arg0]);
};
exports.popup = function (arg0, success, error) {
    exec(success, error, 'perm', 'popup', [arg0]);
};
 

});
