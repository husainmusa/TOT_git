import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
// declare var cordova:any;
var CloudProvider = /** @class */ (function () {
    function CloudProvider() {
        this.status = 0;
        this.isInit = false;
        this.i = 0;
        // this.initiallizeAppleMusic();
    }
    CloudProvider.prototype.getFiles = function () {
        return (this.files);
    };
    CloudProvider.prototype.initiallizeAppleMusic = function (callback) {
        var _this_1 = this;
        // console.log('function call::',JSON.stringify(cordova));
        cordova.exec(function (data) { _this_1.isInit = true; callback && callback(true); }, function (err) { _this_1.isInit = false; callback && callback(false); }, "AppleMusic", "init", []);
    };
    CloudProvider.prototype.getAuthorizeStatus = function (callback) {
        cordova.exec(function (statusCode) {
            console.log('AuthorizationStatus', JSON.stringify(statusCode));
            if (statusCode != '2') {
                cordova.exec(function (data) { callback(true, data); }, function (e) { callback(false, e); }, "AppleMusic", "requestAuthorization", []);
            }
            else {
                callback(true, statusCode);
            }
        }, function (err) {
            callback(false, err);
        }, "AppleMusic", "getStatus", []);
    };
    CloudProvider.prototype.getApplePlayList = function (callback) {
        console.log('getApplePlayList:::');
        var _this = this;
        var getAuth = function (res) {
            console.log('getApplePlayList::: getAuth::');
            _this.getAuthorizeStatus(function (statusCode, obj) {
                if (statusCode) {
                    cordova.exec(function (dataList) { res(dataList); }, function (err) { res([]); }, "AppleMusic", "getPlayLists", []);
                }
                else {
                    res([]);
                }
            });
        };
        if (this.isInit) {
            getAuth(callback);
        }
        else {
            this.initiallizeAppleMusic(function (s) {
                if (s == true) {
                    getAuth(callback);
                }
                else {
                    callback([]);
                }
            });
        }
    };
    CloudProvider.prototype.getAppleTrack = function (playlistId, callback) {
        var _this_1 = this;
        console.log('function call', JSON.stringify(playlistId));
        cordova.exec(function (data) {
            console.log("track::", data);
            _this_1.files = data;
            callback(data);
        }, function (err) {
            console.log("Error Initializing track");
        }, "AppleMusic", "getSongs", [playlistId]);
    };
    CloudProvider.prototype.playTrack = function (trackId) {
        cordova.exec(function (data) {
            console.log("trackPlaying::", trackId);
        }, function (err) {
            console.log("Error in playing track");
        }, "AppleMusic", "playTrack", [trackId]);
    };
    CloudProvider.prototype.pauseTrack = function () {
        cordova.exec(function (data) {
            console.log("trackPaused::");
        }, function (err) {
            console.log("Error in pausing track");
        }, "AppleMusic", "pause", []);
    };
    CloudProvider.prototype.resumeTrack = function () {
        cordova.exec(function (data) {
            console.log("trackResume::");
        }, function (err) {
            console.log("Error in resuming track");
        }, "AppleMusic", "resume", []);
    };
    CloudProvider.prototype.stopTrack = function () {
        cordova.exec(function (data) {
            console.log("trackStopped::");
        }, function (err) {
            console.log("Error in stopping track");
        }, "AppleMusic", "stop", []);
    };
    CloudProvider.prototype.storeSelectedTrack = function (data) {
        this.selectedTrack = data;
    };
    CloudProvider.prototype.getSelectedTrack = function () {
        return this.selectedTrack;
    };
    CloudProvider.prototype.playstatus = function (s) {
        this.status = s;
    };
    CloudProvider.prototype.getPlayStatus = function () {
        return this.status;
    };
    CloudProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], CloudProvider);
    return CloudProvider;
}());
export { CloudProvider };
//# sourceMappingURL=cloud.js.map