import { __decorate, __metadata } from "tslib";
import { Component, NgZone, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
var FullVideoPage = /** @class */ (function () {
    function FullVideoPage(router, route, navCtrl, zone) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.route.queryParams.subscribe(function (params) {
            console.log('params: ', params);
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.currentData = _this.router.getCurrentNavigation().extras.state.data;
                _this.tab = _this.router.getCurrentNavigation().extras.state.tab;
                console.log('full-video.page thumbnail', _this.currentData);
                _this.video_url = _this.currentData.video;
                _this.thumbnail_url = _this.currentData.thumbnail;
            }
        });
    }
    FullVideoPage.prototype.getScreenSize = function (event) {
        this.scrHeight = window.innerHeight;
        console.log('h', this.scrHeight);
    };
    FullVideoPage.prototype.ngOnInit = function () {
    };
    FullVideoPage.prototype.close_vid = function () {
        if (this.tab == 'technique') {
            this.navCtrl.navigateRoot('tabs/tab3');
        }
        else {
            this.navCtrl.navigateRoot('tabs/tab1');
        }
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
            NgZone])
    ], FullVideoPage);
    return FullVideoPage;
}());
export { FullVideoPage };
//# sourceMappingURL=full-video.page.js.map