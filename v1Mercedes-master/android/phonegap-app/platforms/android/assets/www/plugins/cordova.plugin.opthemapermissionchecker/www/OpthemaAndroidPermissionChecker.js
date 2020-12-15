cordova.define("cordova.plugin.opthemapermissionchecker.OpthemaAndroidPermissionChecker", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'OpthemaAndroidPermissionChecker', 'coolMethod', [arg0]);
};

exports.permissionCheck = function (arg0, success, error) {
    exec(success, error, 'OpthemaAndroidPermissionChecker', 'permissionCheck', [arg0]);
};

exports.permissionAsk = function (arg0, success, error) {
    exec(success, error, 'OpthemaAndroidPermissionChecker', 'permissionAsk', [arg0]);
};
});
