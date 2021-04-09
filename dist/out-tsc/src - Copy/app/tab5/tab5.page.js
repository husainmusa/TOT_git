import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { RestapiProvider } from '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popoverpage/popoverpage';
var Tab5Page = /** @class */ (function () {
    function Tab5Page(navCtrl, storage, restProvider, formBuilder, zone, loadingController, alertController, router, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.router = router;
        this.popoverCtrl = popoverCtrl;
        this.appID = '5189d825db2284';
        this.apiKey = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';
        //variables
        this.checkUser = false;
        this.coachForm = this.formBuilder.group({
            'user_id': [null],
            'message': [null, Validators.compose([Validators.required])],
        });
        this.hasSubscription = 0;
    }
    Tab5Page.prototype.doRefresh = function (event) {
    };
    Tab5Page.prototype.ionViewWillEnter = function () {
        var me = this;
        me.storage.get('USERPROFILE').then(function (userObj) {
            console.log('USERPROFILE', userObj);
            me.chat_data = true;
            if (userObj && userObj.id > 0) {
                me.user_id = userObj.id;
                me.hasSubscription = userObj.hasSubscription;
                me.coachForm.patchValue({
                    user_id: userObj.id
                });
            }
            else {
                me.restProvider.alert('Sorry! Unable to find selected plan');
            }
        });
    };
    Tab5Page.prototype.ngOnInit = function () {
    };
    Tab5Page.prototype.sendCoach = function () {
        var _this = this;
        var me = this;
        var msg = '';
        console.log(this.coachForm.value);
        me.coachForm.patchValue({
            user_id: me.user_id
        });
        if (this.coachForm.value['message'] == '' || this.coachForm.value['message'] == null) {
            this.restProvider.alert('Please Enter your query');
            return;
        }
        this.restProvider.showLoader();
        this.restProvider.api_method('post', 'ask_a_question', this.coachForm.value, 'null').subscribe(function (data) {
            _this.restProvider.dismissLoader();
            _this.apiData = data;
            if (_this.apiData.status === 'success') {
                _this.coachForm.reset();
                msg = 'Message Sent Successfully !!!';
            }
            else {
                msg = 'Oops Something Went Wong !!';
            }
            _this.restProvider.alert(msg);
        }, function (error) {
            _this.restProvider.dismissLoader();
        });
    };
    Tab5Page.prototype.openMenu = function (myEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: PopoverPage,
                            event: myEvent
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab5Page = __decorate([
        Component({
            selector: 'app-tab5',
            templateUrl: './tab5.page.html',
            styleUrls: ['../tab1/tab1.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            RestapiProvider,
            FormBuilder,
            NgZone,
            LoadingController,
            AlertController,
            Router,
            PopoverController])
    ], Tab5Page);
    return Tab5Page;
}());
export { Tab5Page };
//# sourceMappingURL=tab5.page.js.map