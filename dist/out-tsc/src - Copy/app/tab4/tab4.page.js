import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../providers/restapis/restapis';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NotificationsComponent } from './../components/notifications/notifications.component';
var Tab4Page = /** @class */ (function () {
    function Tab4Page(navCtrl, storage, restProvider, popoverCtrl, googlePlus, alertController) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
        this.popoverCtrl = popoverCtrl;
        this.googlePlus = googlePlus;
        this.alertController = alertController;
        this.checkUser = false;
    }
    Tab4Page.prototype.ionViewWillEnter = function () {
        var me = this;
        me.restProvider.showLoader();
        me.storage.get('Id').then(function (userID) {
            me.restProvider.api_method('get', 'user_plan_detail/' + userID, null, null).subscribe(function (data) {
                me.restProvider.dismissLoader();
                me.apiResult = data;
                if (me.apiResult['status'] === 'success') {
                    me.checkUser = true;
                    me.userdetails = me.apiResult.user;
                    me.subscribedata = me.apiResult.plan;
                    console.log('me.userdetails', me.userdetails);
                    me.storage.set('Id', me.apiResult.user.id);
                    me.storage.set('USER_Id', me.apiResult.user.id);
                    me.storage.set('Name', me.apiResult.user.name);
                    me.storage.set('Email', me.apiResult.user.email);
                    me.storage.set('USERPROFILE', me.apiResult.user);
                    me.restProvider.setUserInfo(me.userdetails);
                }
                else {
                    me.checkUser = false;
                    me.restProvider.alert(me.apiResult['message']);
                }
                //console.log('checkUserConfig/',me.apiResult);
            }, function (error) {
                me.checkUser = false;
                me.restProvider.dismissLoader();
                me.restProvider.alert('Sorry!Detail Not Found');
            });
        });
    };
    Tab4Page.prototype.ngOnInit = function () { };
    Tab4Page.prototype.navigatoEditprofile = function () {
        this.navCtrl.navigateRoot('/editprofile');
    };
    Tab4Page.prototype.backToLogin = function () {
        this.navCtrl.navigateRoot('/login');
    };
    Tab4Page.prototype.backToRegister = function () {
        this.navCtrl.navigateRoot('/register');
    };
    Tab4Page.prototype.goToPaymentHistory = function () {
        this.navCtrl.navigateRoot('/paymenthistory');
    };
    Tab4Page.prototype.notifications = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: NotificationsComponent,
                            event: ev,
                            animated: true,
                            showBackdrop: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Tab4Page.prototype.unSubscribeConfirm = function (subscribeID) {
        if (subscribeID === void 0) { subscribeID = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var me, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirm!',
                                message: 'Are you sure want to <strong>Unsubscribe</strong>?',
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Yes',
                                        handler: function () {
                                            me.unSubscribePlan(subscribeID);
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab4Page.prototype.unSubscribePlan = function (subscribeID) {
        if (subscribeID === void 0) { subscribeID = 0; }
        var me = this;
        me.restProvider.showLoader();
        me.restProvider.api_method('get', 'unsubscribe/' + subscribeID, null, null).subscribe(function (data) {
            me.restProvider.dismissLoader();
            me.apiResult = data;
            if (me.apiResult['status'] === 'success') {
                me.ionViewWillEnter();
                me.restProvider.alert('You are successfully unsubscribed');
            }
            else {
                me.restProvider.alert('Sorry!unable to process your request');
            }
            //console.log('checkUserConfig/',me.apiResult);
        }, function (error) {
            me.restProvider.alert('Sorry!unable to process your request');
        });
    };
    Tab4Page = __decorate([
        Component({
            selector: 'app-tab4',
            templateUrl: './tab4.page.html',
            styleUrls: ['./tab4.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            RestapiProvider,
            PopoverController,
            GooglePlus,
            AlertController])
    ], Tab4Page);
    return Tab4Page;
}());
export { Tab4Page };
//# sourceMappingURL=tab4.page.js.map