import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
var AndroidMusicService = /** @class */ (function () {
    function AndroidMusicService(file) {
        this.file = file;
    }
    AndroidMusicService.prototype.getRootFile = function () {
        this.file.checkDir(this.file.dataDirectory, '').then(function (res) { return console.log('Directory exists', res); }).catch(function (err) {
            return console.log('Directory doesnt exist');
        });
    };
    AndroidMusicService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [File])
    ], AndroidMusicService);
    return AndroidMusicService;
}());
export { AndroidMusicService };
//# sourceMappingURL=android-music.service.js.map