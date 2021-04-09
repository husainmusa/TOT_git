import { __decorate, __metadata } from "tslib";
import { Component, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
var HtmlvideoComponent = /** @class */ (function () {
    function HtmlvideoComponent() {
        this._poster = '';
        this._loop = '';
    }
    Object.defineProperty(HtmlvideoComponent.prototype, "poster", {
        get: function () {
            if (typeof this._poster === 'undefined' || this._poster == "" || this._poster == null)
                this._poster = '../assets/images/vid_bg.jpg';
            return this._poster;
        },
        set: function (poster) { this._poster = (poster && poster.trim()) || '../assets/images/vid_bg.jpg'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "autoplay", {
        get: function () {
            //console.log('autoplay GET::',this._autoplay);
            if (typeof this._autoplay === 'undefined')
                this._autoplay = 'true';
            return this._autoplay;
        },
        set: function (autoplay) {
            //console.log('autoplay',autoplay);
            this._autoplay = (autoplay == 'true') ? 'true' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "loop", {
        get: function () {
            if (typeof this._loop === 'undefined')
                this._loop = '';
            return this._loop;
        },
        set: function (loop) {
            this._loop = (loop == 'true') ? 'true' : '';
        },
        enumerable: true,
        configurable: true
    });
    HtmlvideoComponent.prototype.ngOnChanges = function (changes) {
        console.log('ngOnChanges htmlvideo ::: ', changes);
    };
    HtmlvideoComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit htmlvideo ::: ', [this.loop, this.autoplay, this.poster, this.video_url]);
    };
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], HtmlvideoComponent.prototype, "document", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HtmlvideoComponent.prototype, "elementID", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HtmlvideoComponent.prototype, "video_url", void 0);
    __decorate([
        Input('poster'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "poster", null);
    __decorate([
        Input('autoplay'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "autoplay", null);
    __decorate([
        Input('loop'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "loop", null);
    HtmlvideoComponent = __decorate([
        Component({
            selector: 'app-htmlvideo',
            templateUrl: './htmlvideo.component.html',
            styleUrls: ['./htmlvideo.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], HtmlvideoComponent);
    return HtmlvideoComponent;
}());
export { HtmlvideoComponent };
//# sourceMappingURL=htmlvideo.component.js.map