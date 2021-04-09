import { __decorate, __metadata } from "tslib";
import { Component, NgZone, ViewChild, Inject } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { RestapiProvider } from '../providers/restapis/restapis';
import { DOCUMENT } from '@angular/common';
var LandingPage = /** @class */ (function () {
    function LandingPage(restProvider, zone, navCtrl) {
        this.restProvider = restProvider;
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.slideOpts = {
            initialSlide: 0,
            speed: 400,
            zoom: false
        };
        this.currentIndex = 0;
        this.splashScreenArray = [];
    }
    LandingPage.prototype.ngOnInit = function () {
        var me = this;
        me.restProvider.showLoader();
        me.restProvider.getSplashScreenArray(function (r) {
            console.log('getSplashScreenArray', r);
            me.splashScreenArray = r;
            me.restProvider.dismissLoader();
            me.checkScreen();
        });
    };
    LandingPage.prototype.continue = function () {
        var _this = this;
        // this.zone.run(() => { this.navCtrl.navigateRoot('/login'); });
        this.zone.run(function () { _this.navCtrl.navigateRoot('/tabs/tab1'); });
    };
    LandingPage.prototype.stopAllVideo = function () {
        var me = this;
        me.splashScreenArray.forEach(function (item, index) {
            if (item.upload_type == 'video') {
                var videoEle = document.getElementById('html-video-cmp-' + index);
                if (videoEle)
                    videoEle.pause();
                //  console.log(videoEle);
            }
        });
    };
    LandingPage.prototype.checkScreen = function () {
        var me = this;
        var index = me.currentIndex;
        var screenObj = this.splashScreenArray[index];
        var videoEle = document.getElementById('html-video-cmp-' + index);
        if (screenObj && videoEle) {
            videoEle.currentTime = 1;
            videoEle.play();
        }
    };
    LandingPage.prototype.onChangeSlider = function () {
        var _this = this;
        var me = this;
        this.splashSlider.getActiveIndex().then(function (index) {
            _this.currentIndex = index;
            me.stopAllVideo();
            me.checkScreen();
        });
    };
    __decorate([
        ViewChild('splashSlider', null),
        __metadata("design:type", IonSlides)
    ], LandingPage.prototype, "splashSlider", void 0);
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], LandingPage.prototype, "document", void 0);
    LandingPage = __decorate([
        Component({
            selector: 'app-landing',
            templateUrl: './landing.page.html',
            styleUrls: ['./landing.page.scss'],
        }),
        __metadata("design:paramtypes", [RestapiProvider, NgZone, NavController])
    ], LandingPage);
    return LandingPage;
}());
export { LandingPage };
//# sourceMappingURL=landing.page.js.map