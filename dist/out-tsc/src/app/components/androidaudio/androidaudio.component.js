import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AndroidMusicService } from '../../providers/android-music/android-music.service';
import { Media } from '@ionic-native/media/ngx';
var AndroidaudioComponent = /** @class */ (function () {
    function AndroidaudioComponent(androidMusic, media) {
        this.androidMusic = androidMusic;
        this.media = media;
        this.playing = false;
        this.paused = true;
        this.firstPlay = true;
        this.index = 0;
        this.audio_list = this.androidMusic.getAllAudio();
        this.totalTrack = this.audio_list.length - 1;
        console.log('audio list', this.audio_list, this.totalTrack);
    }
    Object.defineProperty(AndroidaudioComponent.prototype, "playPause", {
        set: function (status) {
            if (status == 'videoplay') {
            }
            else if (status == 'timerstart') {
                this.pause();
            }
            else if (status == 'close') {
                this.endPlayer();
            }
            else if (status == 'beep') {
                this.play();
            }
        },
        enumerable: true,
        configurable: true
    });
    AndroidaudioComponent.prototype.ngOnInit = function () { };
    AndroidaudioComponent.prototype.play = function () {
        if (this.audio_list) {
            if (this.index >= 0 && this.index < this.totalTrack) {
                if (this.firstPlay) {
                    console.log('playing Media', this.audio_list[this.index].path);
                    this.file = this.media.create(this.audio_list[this.index].path);
                    this.file.play();
                    this.firstPlay = false;
                    this.playing = true;
                    this.paused = false;
                }
                else {
                    this.file.play();
                    console.log('resuming Media', this.audio_list[this.index].path);
                    this.playing = true;
                    this.paused = false;
                }
            }
        }
    };
    AndroidaudioComponent.prototype.pause = function () {
        // this.audioProvider.pause();
        this.file.stop();
        this.playing = false;
        this.paused = true;
    };
    AndroidaudioComponent.prototype.previous = function () {
        this.file.release();
        this.index--;
        this.firstPlay = true;
        this.play();
    };
    AndroidaudioComponent.prototype.next = function () {
        this.file.release();
        this.index++;
        this.firstPlay = true;
        this.play();
    };
    AndroidaudioComponent.prototype.stop = function () {
        this.file.stop();
        this.playing = false;
        this.paused = true;
    };
    AndroidaudioComponent.prototype.endPlayer = function () {
        this.file.release();
        this.playing = false;
        this.paused = true;
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
        __metadata("design:paramtypes", [AndroidMusicService,
            Media])
    ], AndroidaudioComponent);
    return AndroidaudioComponent;
}());
export { AndroidaudioComponent };
//# sourceMappingURL=androidaudio.component.js.map