import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
var AudioProvider = /** @class */ (function () {
    function AudioProvider() {
        this.stop$ = new Subject();
        this.audioObj = new Audio();
    }
    AudioProvider.prototype.streamObservable = function (url) {
        var _this = this;
        var events = [
            'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
        ];
        var addEvents = function (obj, events, handler) {
            events.forEach(function (event) {
                obj.addEventListener(event, handler);
            });
        };
        var removeEvents = function (obj, events, handler) {
            events.forEach(function (event) {
                obj.removeEventListener(event, handler);
            });
        };
        return Observable.create(function (observer) {
            // Play audio
            _this.audioObj.src = url;
            _this.audioObj.load();
            _this.audioObj.play();
            // Media Events
            var handler = function (event) { return observer.next(event); };
            addEvents(_this.audioObj, events, handler);
            return function () {
                // Stop Playing
                _this.audioObj.pause();
                _this.audioObj.currentTime = 0;
                // Remove EventListeners
                removeEvents(_this.audioObj, events, handler);
            };
        });
    };
    AudioProvider.prototype.playStream = function (url) {
        return this.streamObservable(url).pipe(takeUntil(this.stop$));
    };
    AudioProvider.prototype.play = function () {
        this.audioObj.play();
    };
    AudioProvider.prototype.pause = function () {
        this.audioObj.pause();
    };
    AudioProvider.prototype.stop = function () {
        this.stop$.next();
    };
    AudioProvider.prototype.seekTo = function (seconds) {
        this.audioObj.currentTime = seconds;
    };
    AudioProvider.prototype.formatTime = function (time, format) {
        return moment.utc(time).format(format);
    };
    AudioProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AudioProvider);
    return AudioProvider;
}());
export { AudioProvider };
//# sourceMappingURL=audio.js.map