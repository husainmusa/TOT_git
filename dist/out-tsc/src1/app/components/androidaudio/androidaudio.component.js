import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
var AndroidaudioComponent = /** @class */ (function () {
    function AndroidaudioComponent(file) {
        this.file = file;
        this.playing = false;
        this.paused = true;
        this.firstPlay = true;
    }
    Object.defineProperty(AndroidaudioComponent.prototype, "playPause", {
        set: function (status) {
            if (status == 'videoplay') {
            }
            else if (status == 'timerstart') {
            }
            else if (status == 'close') {
                this.pause();
            }
            else if (status == 'beep') {
                console.log("peep");
            }
        },
        enumerable: true,
        configurable: true
    });
    AndroidaudioComponent.prototype.ngOnInit = function () { };
    AndroidaudioComponent.prototype.play = function () {
        var me = this;
    };
    AndroidaudioComponent.prototype.pause = function () {
        this.playing = false;
        this.paused = true;
    };
    AndroidaudioComponent.prototype.previous = function () {
    };
    AndroidaudioComponent.prototype.next = function () {
    };
    __decorate([
        Input('status'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AndroidaudioComponent.prototype, "playPause", null);
    AndroidaudioComponent = __decorate([
        Component({
            selector: 'app-androidaudio',
            templateUrl: './androidaudio.component.html',
            styleUrls: ['./androidaudio.component.scss'],
        }),
        __metadata("design:paramtypes", [File])
    ], AndroidaudioComponent);
    return AndroidaudioComponent;
}());
export { AndroidaudioComponent };
//# sourceMappingURL=androidaudio.component.js.map