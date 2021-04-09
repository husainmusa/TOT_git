import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestapiProvider } from '../providers/restapis/restapis';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(modalController, restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, events, storage) {
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
    }
    Tab3Page.prototype.doRefresh = function (event) {
        // console.log('Begin async operation');
        this.get_data();
        setTimeout(function () {
            // console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    Tab3Page.prototype.ionViewWillEnter = function () {
        this.get_data();
    };
    Tab3Page.prototype.ngOnInit = function () {
        this.get_data();
    };
    Tab3Page.prototype.get_data = function () {
        var _this = this;
        this.restProvider.showLoader();
        this.restProvider.api_method('get', 'technique', null, null).subscribe(function (data) {
            _this.restProvider.dismissLoader();
            // console.log(data);
            _this.techniquedata = data;
            // console.log(this.techniquedata);
            if (data['status'] === 'success') {
                _this.techniquedata = data['technique'];
                // console.log(this.techniquedata);
            }
            else if (data['status'] === 'error') {
                console.log('error_api', data['status']);
            }
        }, function (error) {
            console.log('error', error);
            _this.restProvider.dismissLoader();
        });
    };
    Tab3Page.prototype.presentModal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // console.log(id);
                this.restProvider.showLoader();
                this.restProvider.api_method('get', 'get_technique_detail/' + id, null, null).subscribe(function (data) {
                    console.log('get_technique_detail/', data);
                    if (data['status'] === 'success') {
                        _this.tenique_dtl = data['technique'];
                        _this.restProvider.present_Modal(_this.tenique_dtl, 'Technique', null);
                        _this.restProvider.dismissLoader();
                    }
                    else {
                        _this.restProvider.dismissLoader();
                    }
                }, function (error) {
                    _this.restProvider.dismissLoader();
                    console.log('error', error);
                });
                return [2 /*return*/];
            });
        });
    };
    Tab3Page = __decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
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
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map