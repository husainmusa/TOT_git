import { __decorate, __metadata } from "tslib";
import { Component, NgZone, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AudioProvider } from '../providers/audio/audio';
import { RestapiProvider } from '../providers/restapis/restapis';
var FullVideoPage = /** @class */ (function () {
    function FullVideoPage(router, route, navCtrl, zone, elementRef, audioProvider, restProvider) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.elementRef = elementRef;
        this.audioProvider = audioProvider;
        this.restProvider = restProvider;
        this.index = 0;
        this.show_arrow = false;
        this.visible_image = false;
        this.visible_video = true;
        this.visiblePlay = false;
        this.counter = 10;
        this.timer_display = false;
        this.route.queryParams.subscribe(function (params) {
            console.log('params: ', params);
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.currentData = _this.router.getCurrentNavigation().extras.state.data;
                _this.vid_array = _this.router.getCurrentNavigation().extras.state.data;
                _this.tab = _this.router.getCurrentNavigation().extras.state.tab;
                console.log('full-video.page thumbnail', _this.currentData);
                if (_this.router.getCurrentNavigation().extras.state.vid_type == 'warmup') {
                    // this.restProvider.showLoader();
                    _this.thumbnail_url = _this.currentData.thumbnail;
                    _this.vid_type = 'warmup';
                    _this.show_arrow = true;
                    _this.visiblePlay = true;
                    _this.timer_display = true;
                    _this.startCountdown();
                    console.log('full-video.page url thumbnail', _this.vid_type);
                }
                else {
                    _this.video_url = _this.currentData.video;
                    _this.thumbnail_url = _this.currentData.thumbnail;
                }
            }
        });
    }
    FullVideoPage.prototype.getScreenSize = function (event) {
        this.scrHeight = window.innerHeight;
        console.log('h', this.scrHeight);
    };
    FullVideoPage.prototype.ngOnInit = function () {
    };
    FullVideoPage.prototype.startCountdown = function () {
        var _this = this;
        var interval = setInterval(function () {
            // console.log(  this.counter);
            _this.counter--;
            if (_this.counter == 4 || _this.counter == 3 || _this.counter == 2) {
                // this.playAudio('beep');
            }
            if (_this.counter == 1) {
                // this.playAudio('beep2');
            }
            if (_this.counter < 1) {
                _this.playVid();
                clearInterval(interval);
                _this.timer_display = false;
            }
            ;
        }, 1000);
    };
    ;
    FullVideoPage.prototype.playAudio = function (arg) {
        var _this = this;
        try {
            if (arg == 'beep') {
                this.audioProvider.playStream("../assets/audio/beep.mp3").subscribe(function (event) {
                    var audioObj = event.target;
                    // this.status='videoplay';
                });
            }
            if (arg == 'beep2') {
                this.audioProvider.playStream("../assets/audio/beep_2.mp3").subscribe(function (event) {
                    var audioObj = event.target;
                    switch (event.type) {
                        case 'ended':
                            var i_1 = 1;
                            var timeDelay = setInterval(function () {
                                i_1--;
                                if (i_1 == 0) {
                                    clearInterval(timeDelay);
                                    console.log('call');
                                    _this.playVid();
                                }
                            }, 1000);
                    }
                });
                // this.playStream("../assets/audio/beep_2.mp3");
                // let audio = new Audio();
                // audio.src = "../assets/audio/beep_2.mp3";
                // audio.load();
                // audio.play();
                // this.status='beep';
            }
        }
        catch (e) {
            console.log('playAudio Catch Erroor::', arg, e);
        }
    };
    FullVideoPage.prototype.close_vid = function () {
        if (this.tab == 'technique') {
            this.navCtrl.navigateRoot('tabs/tab3');
        }
        else {
            if (!this.visiblePlay) {
                this.change = 'close';
            }
            else {
                this.navCtrl.navigateRoot('tabs/tab1');
            }
        }
    };
    FullVideoPage.prototype.swipeVideoPrevious = function () {
        this.change = 'prev';
    };
    FullVideoPage.prototype.swipeVideoNext = function () {
        this.change = 'next';
    };
    FullVideoPage.prototype.playVid = function () {
        this.change = 'play';
        this.visiblePlay = false;
    };
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FullVideoPage.prototype, "getScreenSize", null);
    FullVideoPage = __decorate([
        Component({
            selector: 'app-full-video',
            templateUrl: './full-video.page.html',
            styleUrls: ['./full-video.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            NavController,
            NgZone,
            ElementRef,
            AudioProvider,
            RestapiProvider])
    ], FullVideoPage);
    return FullVideoPage;
}());
export { FullVideoPage };
//# sourceMappingURL=full-video.page.js.map