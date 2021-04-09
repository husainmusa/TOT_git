import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestapiProvider } from '../providers/restapis/restapis';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(modalController, restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, events, storage) {
        this.modalController = modalController;
        this.restProvider = restProvider;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.events = events;
        this.storage = storage;
        this.checkUser_payment = 0;
    }
    Tab2Page.prototype.doRefresh = function (event) {
        this.get_data();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    Tab2Page.prototype.ionViewWillEnter = function () {
        var me = this;
        me.checkUser(function () {
            console.log('After ionViewWillEnter', me.userInfo);
            me.get_data();
        });
    };
    Tab2Page.prototype.ngOnInit = function () {
        //this.checkUser();
    };
    Tab2Page.prototype.checkUser = function (callback) {
        if (callback === void 0) { callback = null; }
        var me = this;
        //console.log('checkUser');
        me.restProvider.showLoader();
        me.storage.get('Id').then(function (userID) {
            if (!userID) {
                me.updateConfig();
                if (callback)
                    callback(me.userInfo);
            }
            else {
                me.restProvider.api_method('get', 'checkUserConfig/' + userID, null, null).subscribe(function (data) {
                    me.restProvider.dismissLoader();
                    me.apiResult = data;
                    //console.log('checkUserConfig',me.apiResult);
                    if (me.apiResult['status'] === 'success') {
                        me.userInfo = me.apiResult.success;
                        me.restProvider.setUserInfo(me.userInfo);
                    }
                    else {
                        me.updateConfig();
                    }
                    if (callback)
                        callback(me.userInfo);
                    //console.log('checkUserConfig/',me.apiResult);
                }, function (error) {
                    me.restProvider.dismissLoader();
                    me.updateConfig();
                    if (callback)
                        callback(me.userInfo);
                });
            }
        });
    };
    Tab2Page.prototype.updateConfig = function () {
        var me = this;
        me.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                userObj['plan_id'] = 0;
                userObj['isFeatureEnabled'] = 0;
                me.storage.set('USERPROFILE', userObj);
                me.restProvider.setUserInfo(userObj);
            }
        });
    };
    Tab2Page.prototype.get_data = function () {
        var _this = this;
        this.restProvider.showLoader();
        this.restProvider.api_method('get', 'workout', null, null).subscribe(function (data) {
            _this.restProvider.dismissLoader();
            // console.log(data);
            _this.mydata = data;
            if (data['message'] === 'success') {
                _this.workoutdata = data['workout'];
                // console.log(this.workoutdata);
            }
            else {
                _this.workoutdata = '';
                _this.mydata = '';
            }
        }, function (error) {
            console.log('error', error);
            _this.restProvider.dismissLoader();
        });
    };
    Tab2Page.prototype.presentModal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // console.log(id);
                this.restProvider.showLoader();
                this.restProvider.api_method('get', 'get_workout_detail/' + id, null, null).subscribe(function (data) {
                    console.log('get_workout_detail/', data);
                    if (data['status'] === 'success') {
                        _this.restProvider.api_method('get', 'get_workout_vids_detail/' + id, null, null).subscribe(function (detail) {
                            _this.workout_dtl = data['workout'];
                            // this.workout_dtl=this.workout_dtl.concat(detail);
                            console.log('dfdf', _this.workout_dtl);
                            _this.restProvider.present_Modal(_this.workout_dtl, detail, 'Workout', null);
                            _this.restProvider.dismissLoader();
                        }, function (error) {
                            _this.restProvider.dismissLoader();
                            console.log('get_workout_detail error::', error);
                        });
                    }
                    else {
                        _this.restProvider.dismissLoader();
                    }
                }, function (error) {
                    _this.restProvider.dismissLoader();
                    console.log('get_workout_detail error::', error);
                });
                return [2 /*return*/];
            });
        });
    };
    Tab2Page.prototype.check_type = function (type, id) {
        // console.log(type);
        var _this = this;
        if (type == 0) {
            var msg = 'Please subscribe our plans for paid videos';
            this.restProvider.alert(msg);
            this.navCtrl.navigateRoot('/tabs/tab1');
        }
        else {
            this.restProvider.api_method('get', 'get_workout_detail/' + id, null, null).subscribe(function (data) {
                console.log(data);
                if (data['status'] === 'success') {
                    _this.workout_dtl = data['workout'];
                    var heading = 'Workout';
                    _this.restProvider.present_Modal(_this.workout_dtl, heading, null);
                }
                else if (data['status'] === 'error') {
                }
            }, function (error) {
                console.log('error', error);
            });
        }
    };
    Tab2Page = __decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            RestapiProvider,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder,
            Events,
            Storage])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map