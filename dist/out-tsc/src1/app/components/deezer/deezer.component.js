import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { DeezerService } from './../../providers/deezer/deezer.service';
var DeezerComponent = /** @class */ (function () {
    function DeezerComponent(deezer) {
        this.deezer = deezer;
        this.playing = false;
        this.paused = true;
        this.firstPlay = true;
    }
    Object.defineProperty(DeezerComponent.prototype, "playPause", {
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
    DeezerComponent.prototype.ngOnInit = function () {
    };
    DeezerComponent.prototype.play = function () {
        var me = this;
        if (me.firstPlay) {
            me.deezer.playAlbum(function (res) {
                if (res) {
                    me.firstPlay = false;
                    me.playing = true;
                    me.paused = false;
                }
                else {
                    console.log('err');
                }
            });
        }
        else {
            me.deezer.resume();
            me.playing = true;
            me.paused = false;
        }
    };
    DeezerComponent.prototype.pause = function () {
        this.deezer.pauseTrack();
        this.playing = false;
        this.paused = true;
    };
    DeezerComponent.prototype.previous = function () {
        this.deezer.previous();
    };
    DeezerComponent.prototype.next = function () {
        this.deezer.next();
    };
    __decorate([
        Input('status'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DeezerComponent.prototype, "playPause", null);
    DeezerComponent = __decorate([
        Component({
            selector: 'app-deezer',
            templateUrl: './deezer.component.html',
            styleUrls: ['./deezer.component.scss'],
        }),
        __metadata("design:paramtypes", [DeezerService])
    ], DeezerComponent);
    return DeezerComponent;
}());
export { DeezerComponent };
//# sourceMappingURL=deezer.component.js.map