import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestapiProvider } from '../restapis/restapis';
var AndroidMusicService = /** @class */ (function () {
    function AndroidMusicService(file, loadingCtrl, restProvider, alertCtrl) {
        this.file = file;
        this.loadingCtrl = loadingCtrl;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this._fileList = [];
    }
    AndroidMusicService.prototype.getAudio = function () {
        var _this = this;
        var me = this;
        this.presentLoadingWithOptions();
        //the first parameter file.externalRootDirectory is for listing all files on application's root directory
        //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
        this.file.listDir(this.file.externalRootDirectory, '').then(function (result) {
            console.log('resul', result);
            var _loop_1 = function (item) {
                console.log('item', item);
                if (item.isDirectory == true && item.name != '.' && item.name != '..') {
                    _this.getFileList(item.name); //Get all the files inside the folder. recursion will probably be useful here.
                }
                else if (item.isFile == true) {
                    //File found
                    var fileExt = item.name.split('.').pop();
                    console.log(fileExt);
                    if (fileExt == 'mp3') {
                        _this.file.resolveLocalFilesystemUrl(item.nativeURL).then(function (entry) {
                            var nativePath = entry.toInternalURL();
                            me._fileList.push({
                                name: item.name,
                                path: nativePath
                            });
                        });
                    }
                }
            };
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var item = result_1[_i];
                _loop_1(item);
            }
            console.log('file', _this._fileList);
        }, function (error) {
            console.log('e::', error);
        });
    };
    AndroidMusicService.prototype.getFileList = function (path) {
        var _this = this;
        var me = this;
        var file = new File();
        this.file.listDir(this.file.externalRootDirectory, path)
            .then(function (result) {
            var _loop_2 = function (item) {
                if (item.isDirectory == true && item.name != '.' && item.name != '..') {
                    _this.getFileList(path + '/' + item.name);
                }
                else {
                    var fileExt = item.name.split('.').pop();
                    console.log(fileExt);
                    if (fileExt == 'mp3') {
                        _this.file.resolveLocalFilesystemUrl(item.nativeURL).then(function (entry) {
                            var nativePath = entry.toInternalURL();
                            me._fileList.push({
                                name: item.name,
                                path: nativePath
                            });
                        });
                    }
                }
            };
            for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
                var item = result_2[_i];
                _loop_2(item);
            }
            console.log('files', _this._fileList);
        }, function (error) {
            console.log('erros::::', error);
        });
    };
    AndroidMusicService.prototype.getRootFile = function () {
        this.file.checkDir(this.file.dataDirectory, '').then(function (res) { return console.log('Directory exists', res); }).catch(function (err) {
            return console.log('Directory doesnt exist');
        });
    };
    AndroidMusicService.prototype.getAllAudio = function () {
        if (this._fileList) {
            return this._fileList;
        }
        else {
            this.presentAlert();
        }
    };
    AndroidMusicService.prototype.presentLoadingWithOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            spinner: null,
                            duration: 5000,
                            message: 'Please wait...',
                            translucent: true,
                            cssClass: 'custom-class custom-loading'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AndroidMusicService.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Sorry !!',
                            //subHeader: 'You have finished this workout',
                            cssClass: 'secondary',
                            message: 'No Audio Found',
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: function () {
                                        _this.restProvider.getApp('', '');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AndroidMusicService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [File,
            LoadingController,
            RestapiProvider,
            AlertController])
    ], AndroidMusicService);
    return AndroidMusicService;
}());
export { AndroidMusicService };
//# sourceMappingURL=android-music.service.js.map