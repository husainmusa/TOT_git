import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { CloudProvider } from './../../providers/cloud/cloud';
var ApplesongComponent = /** @class */ (function () {
    function ApplesongComponent(cloudProvider) {
        this.cloudProvider = cloudProvider;
        this.currentSongIndex = 0;
        this.status = 0;
        this.sckippBack = 0;
        this.skippForward = 0;
        this.files = this.cloudProvider.getFiles();
        this.cloudProvider.playTrack(this.files[this.currentSongIndex].id);
    }
    Object.defineProperty(ApplesongComponent.prototype, "playPause", {
        set: function (status) {
            if (status == 'videoplay') {
                this.resume();
            }
            else if (status == 'timerstart') {
                this.pauseAppleTrack();
            }
            else if (status == 'close') {
                this.pauseAppleTrack();
            }
            else if (status == 'beep') {
                console.log("peep");
                this.resume();
            }
        },
        enumerable: true,
        configurable: true
    });
    ApplesongComponent.prototype.ngOnInit = function () {
        this.cloudProvider.playTrack(this.files[this.currentSongIndex].id);
        this.cloudProvider.playstatus(1);
        if (this.files.length > 1) {
            this.skippForward = 1;
        }
    };
    ApplesongComponent.prototype.playAppleTrack = function () {
        var s = this.cloudProvider.getPlayStatus();
        if (s == 0) {
            this.stopAppleTrack();
            this.cloudProvider.playTrack(this.files[this.currentSongIndex].id);
            console.log('playclicked');
            this.status = 1;
            this.cloudProvider.playstatus(1);
        }
        else {
            this.resume();
            console.log('resumeclicked');
            this.status = 1;
        }
    };
    ApplesongComponent.prototype.pauseAppleTrack = function () {
        this.cloudProvider.pauseTrack();
        this.status = 0;
    };
    ApplesongComponent.prototype.stopAppleTrack = function () {
        this.cloudProvider.stopTrack();
    };
    ApplesongComponent.prototype.nextAppleTrack = function () {
        if (this.currentSongIndex <= this.files.length) {
            this.currentSongIndex++;
            this.playAppleTrack();
            this.sckippBack = 1;
        }
        else {
            this.currentSongIndex = 0;
            this.playAppleTrack();
            this.sckippBack = 0;
            this.skippForward = 0;
        }
    };
    ApplesongComponent.prototype.previousAppleTrack = function () {
        if (this.currentSongIndex >= 0) {
            this.currentSongIndex--;
            this.playAppleTrack();
        }
        else {
            this.currentSongIndex = 0;
            this.playAppleTrack();
            this.sckippBack = 0;
        }
    };
    ApplesongComponent.prototype.resume = function () {
        console.log('resumeclicked');
        this.cloudProvider.resumeTrack();
        this.status = 1;
    };
    __decorate([
        Input('status'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ApplesongComponent.prototype, "playPause", null);
    ApplesongComponent = __decorate([
        Component({
            selector: 'app-applesong',
            templateUrl: './applesong.component.html',
            styleUrls: ['./applesong.component.scss'],
        }),
        __metadata("design:paramtypes", [CloudProvider])
    ], ApplesongComponent);
    return ApplesongComponent;
}());
export { ApplesongComponent };
//# sourceMappingURL=applesong.component.js.map