import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { RestapiProvider } from '../../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { CometChat } from '@cometchat-pro/chat';
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(navCtrl, storage, googlePlus, restProvider, popoverCtrl, zone, fb) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.googlePlus = googlePlus;
        this.restProvider = restProvider;
        this.popoverCtrl = popoverCtrl;
        this.zone = zone;
        this.fb = fb;
        this.appID = '5189d825db2284';
        this.apiKey = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';
    }
    NotificationsComponent.prototype.ngOnInit = function () {
    };
    NotificationsComponent.prototype.goToPaymentHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.popoverCtrl.dismiss();
                this.zone.run(function () {
                    _this.navCtrl.navigateRoot('/paymenthistory');
                });
                return [2 /*return*/];
            });
        });
    };
    NotificationsComponent.prototype.navigatoEditprofile = function () {
        var _this = this;
        this.popoverCtrl.dismiss();
        this.zone.run(function () {
            _this.navCtrl.navigateRoot('/editprofile');
        });
    };
    NotificationsComponent.prototype.logout = function () {
        // console.log('working');
        var me = this;
        this.popoverCtrl.dismiss();
        me.storage.clear().then(function () {
            me.googlePlus.logout().then(function (res) { }, function (err) { console.log(err); });
            me.fb.logout().then(function (res) { console.log('fb log res', res); }, function (err) { console.log('fb logout error', err); });
            me.storage.remove('Id').then(function () {
                me.storage.remove('USERPROFILE').then(function () {
                    me.storage.remove('USER_Id');
                    me.storage.remove('Name');
                    me.storage.remove('Email');
                    me.storage.remove('USER_ID');
                    me.zone.run(function () {
                        me.navCtrl.navigateRoot('/login');
                    });
                });
            });
        });
    };
    NotificationsComponent.prototype.logoutCometChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                CometChat.logout().then(function () {
                    console.log('Logout completed successfully');
                    // this.router.navigate(['login']);
                }, function (error) {
                    console.log('Logout failed with exception:', { error: error });
                });
                return [2 /*return*/];
            });
        });
    };
    NotificationsComponent = __decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.scss']
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            GooglePlus,
            RestapiProvider,
            PopoverController,
            NgZone,
            Facebook])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map