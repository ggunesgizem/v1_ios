import ImgCache from 'imgcache.js'


export var isCacheUp = false
export var blobURL = ""

export const initImageCache = (callback) => {
  // write log to console
  // ImgCache.options.debug = false;
  //
  // // increase allocated space on Chrome to 50MB, default was 10MB
  // ImgCache.options.chromeQuota = 50*1024*1024;
  //
  // if(typeof(cordova) !== "undefined"){
  //   ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
  // }

  // ImgCache.init(function () {
  //     console.log('ImgCache init: success!');
  //     isCacheUp = true
  //     callback()
  // }, function () {
  //     console.log('ImgCache init: error! Check the log for errors');
  //     callback()
  // });

  var onmessage = function(e) {
    var url = e.data.src;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
          try {
            var tt = URL.createObjectURL(xhr.response);
            
            postMessage('{\"status\":\"success\",\"key\":\"'+url+'\",\"srs\":\"'+tt+'\"}')
          }
          catch(e){
            postMessage('{\"status\":\"fail\",\"error\":\"'+e+'\"}');
          }
      }
    }, false);

    xhr.addEventListener('error', function (err) {
      postMessage('{\"status\":\"fail\",\"error\":\"'+err+'\"}')
    }, false);

    xhr.open('GET', url, true);
    xhr.send();
  }
  var blob = new Blob(["onmessage = " + onmessage.toString()], {type: "script"});
  blobURL = URL.createObjectURL(blob);

  callback()
}

export default ImgCache
