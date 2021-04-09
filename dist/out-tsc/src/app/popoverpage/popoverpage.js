import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavController, LoadingController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/chat';
import { RestapiProvider } from '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
var appID = environment.appID;
var apiKey = environment.apiKey;
var PopoverPage = /** @class */ (function () {
    function PopoverPage(router, popOverCtrl, navController, zone, restProvider, storage, loadingController) {
        this.router = router;
        this.popOverCtrl = popOverCtrl;
        this.navController = navController;
        this.zone = zone;
        this.restProvider = restProvider;
        this.storage = storage;
        this.loadingController = loadingController;
    }
    PopoverPage.prototype.ngOnInit = function () {
    };
    PopoverPage.prototype.ionViewWillEnter = function () {
    };
    PopoverPage.prototype.chatViewPage = function () {
        var _this = this;
        CometChat.getLoggedinUser().then(function (user) {
            _this.popOverCtrl.dismiss();
            console.log('Check Login:', { user: user });
            _this.viewChat();
        }, function (error) {
            _this.popOverCtrl.dismiss();
            _this.loginComChat();
            console.log('Login Error:', { error: error });
            // User login failed, check error and take appropriate action.
        });
    };
    PopoverPage.prototype.viewChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please Wait',
                            spinner: 'dots',
                            translucent: true
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        CometChat.getUser('fitness_coach').then(function (user) {
                            console.log('Check Login:', { user: user });
                            _this.userData = user;
                            var navigationExtras = {
                                state: {
                                    user: _this.userData
                                }
                            };
                            loading.dismiss();
                            _this.zone.run(function () {
                                _this.router.navigate(['tabs/tab5/chat-view'], navigationExtras);
                            });
                        }, function (error) {
                            loading.dismiss();
                            console.log('Login Error:', { error: error });
                            var msg = 'Service Error:' + error;
                            _this.restProvider.alert(msg);
                            // User login failed, check error and take appropriate action.
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PopoverPage.prototype.loginComChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please Wait',
                            spinner: 'dots',
                            translucent: true
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.storage.get('USERPROFILE').then(function (userObj) {
                            if (userObj) {
                                _this.restProvider.api_method('get', 'cometChatCreateUser/' + userObj.name + '/' + userObj.id, null, null).subscribe(function (data) {
                                    if (data['status'] === 'success') {
                                        console.log(data['message']);
                                        // loading.dismiss();
                                        var UID = userObj.id;
                                        CometChat.login(UID, apiKey).then(function (user) {
                                            loading.dismiss();
                                            console.log('Login Successful:', { user: user });
                                            _this.viewChat();
                                        }, function (error) {
                                            loading.dismiss();
                                            console.log('Login Error:', error.message);
                                            // User login failed, check error and take appropriate action.
                                        });
                                    }
                                    else if (data['status'] === 'error') {
                                        loading.dismiss();
                                        var $msg = 'error Something bad happened; please try again later';
                                        _this.restProvider.alert($msg);
                                        _this.router.navigate(['tabs/tab5']);
                                    }
                                }, function (error) {
                                    loading.dismiss();
                                    var $msg = 'server error:' + error;
                                    _this.restProvider.alert($msg);
                                    console.log('error', error);
                                });
                            }
                            else {
                                _this.zone.run(function () {
                                    _this.router.navigate(['login']);
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PopoverPage = __decorate([
        Component({
            template: "\n      <ion-list>\n      <ion-item (click)=\"chatViewPage()\" color=\"light\" class=\"\">\n        <p style=\"width:100%;\">&nbsp;&nbsp;Live Chat</p>\n      </ion-item>\n      </ion-list>\n    ",
            styles: [".ion-list {\n    &.list-ios {\n        margin-bottom: 0;\n    }\n}"]
        }),
        __metadata("design:paramtypes", [Router,
            PopoverController,
            NavController,
            NgZone,
            RestapiProvider,
            Storage,
            LoadingController])
    ], PopoverPage);
    return PopoverPage;
}());
export { PopoverPage };
//# sourceMappingURL=popoverpage.js.map