cordova.define("cordova-plugin-emre.notification", function(require, exports, module) {

    /*
    
    *
    
    * Licensed to the Apache Software Foundation (ASF) under one
    
    * or more contributor license agreements. See the NOTICE file
    
    * distributed with this work for additional information
    
    * regarding copyright ownership. The ASF licenses this file
    
    * to you under the Apache License, Version 2.0 (the
    
    * "License"); you may not use this file except in compliance
    
    * with the License. You may obtain a copy of the License at
    
    *
    
    * http://www.apache.org/licenses/LICENSE-2.0
    
    *
    
    * Unless required by applicable law or agreed to in writing,
    
    * software distributed under the License is distributed on an
    
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    
    * KIND, either express or implied. See the License for the
    
    * specific language governing permissions and limitations
    
    * under the License.
    
    *
    
    */
    
    
    var exec = require('cordova/exec');
    
    
    /**
    
    * Provides access to the vibration mechanism on the device.
    
    */
    
    
    module.exports = {
    
    
    /**
    
    * Vibrates the device for a given amount of time or for a given pattern or immediately cancels any ongoing vibrations (depending on the parameter).
    
    *
    
    * @param {Integer} param The number of milliseconds to vibrate (if 0, cancels vibration)
    
    *
    
    *
    
    * @param {Array of Integer} param Pattern with which to vibrate the device.
    
    * Pass in an array of integers that
    
    * are the durations for which to
    
    * turn on or off the vibrator in
    
    * milliseconds. The FIRST value
    
    * indicates the
    
    * number of milliseconds for which
    
    * to keep the vibrator ON before
    
    * turning it off. The NEXT value indicates the
    
    * number of milliseconds for which
    
    * to keep the vibrator OFF before
    
    * turning it on. Subsequent values
    
    * alternate between durations in
    
    * milliseconds to turn the vibrator
    
    * off or to turn the vibrator on.
    
    * (if empty, cancels vibration)
    
    */
    
    emre: function (param) {
    
    exec(null, null, 'Emre', 'emre', [param]);
    
   
    
    
    },
    
    /*alertView: function (param) { // istenirse kabul et veya reddet haliyle yapılması için
    
    exec(null, null, 'Emre', 'alertView', [param]);
    
    return true;*/
    
    
    
    check : function (param) {
    
    exec(null, null, 'Emre', 'check', [param]);
    
    }
    
    
    }
    
    
    
    
    });
    
    
    
