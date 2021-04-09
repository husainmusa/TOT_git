import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { RestapiProvider } from '../providers/restapis/restapis';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
var payPalConfig = environment.payPalConfig;
var paypalMode = environment.paypalMode;
var PaymentPage = /** @class */ (function () {
    function PaymentPage(restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, events, storage, zone, payPal, navParams, modalController) {
        this.restProvider = restProvider;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.events = events;
        this.storage = storage;
        this.zone = zone;
        this.payPal = payPal;
        this.navParams = navParams;
        this.modalController = modalController;
        console.log('navParams::', this.navParams);
        this.userID = this.navParams.get('userID');
        this.planDetail = this.navParams.get('planDetail');
    }
    PaymentPage.prototype.showSubscribeMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        return [4 /*yield*/, me.alertCtrl.create({
                                header: 'Congratulation',
                                message: "Thanks for joining us, your subscribed plan is activated from now",
                                buttons: [
                                    {
                                        text: "got it!",
                                        handler: function () {
                                            me.zone.run(function () { me.navCtrl.navigateRoot('paymenthistory'); });
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
    PaymentPage.prototype.ngOnInit = function () {
    };
    PaymentPage.prototype.ionViewWillEnter = function () {
    };
    PaymentPage.prototype.applySubscription = function (paymentObj) {
        var me = this;
        var postObj = {
            user_id: me.userID,
            plan_id: me.planDetail.plan_id,
            transaction_id: '',
            amount: me.planDetail.actual_amt,
            payment_mode: 'APPLE_PAY',
            currency: me.planDetail.plan_currency,
            response_json: paymentObj
        };
        me.restProvider.showLoader();
        me.restProvider.api_method('post', 'buyPlan', postObj, null).subscribe(function (data) {
            me.restProvider.dismissLoader();
            me.responseAPI = data;
            if (me.responseAPI['status'] === 'success') {
                me.cancelPayment();
                //me.navCtrl.navigateRoot('paymenthistory');
                me.showSubscribeMessage();
            }
            else {
                me.restProvider.alert(me.responseAPI['message']);
            }
        }, function (error) {
            me.restProvider.dismissLoader();
            me.restProvider.alert('Sorry! Unable to process your request');
        });
    };
    PaymentPage.prototype.userPayment = function () {
        var me = this; //Train of Thought Fitness
        var item = [{ label: 'Subscribe Plan For ' + me.planDetail.plan_duration, amount: me.planDetail.actual_amt }];
        me.restProvider.makePaymentByApplePay(item, me.planDetail.plan_currency, function (status, message) {
            if (status == true) {
                me.applySubscription(JSON.stringify(message));
            }
            else {
                me.restProvider.alert(JSON.stringify(message));
            }
        });
    };
    PaymentPage.prototype.userPayment_PAYPAL = function () {
        var me = this;
        var payPalConfig = environment.payPalConfig;
        var paypalMode = environment.paypalMode;
        me.payPal.init(payPalConfig).then(function (ready) {
            me.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({ acceptCreditCards: false })).then(function (s) {
                var payment = new PayPalPayment(me.planDetail.actual_amt, me.planDetail.plan_currency, 'Subscribe Plan For ' + me.planDetail.plan_duration, 'sale');
                me.payPal.renderSinglePaymentUI(payment).then(function (paymentDetail) {
                    console.log('SUC Payment Paypal ::', paymentDetail);
                    me.responseAPI = paymentDetail;
                    if (me.responseAPI.response.id) {
                        me.applySubscription(me.responseAPI.response);
                    }
                    else {
                        me.restProvider.alert('Sorry! Unable to process payment request');
                    }
                }, function (uiError) {
                    // Error or render dialog closed without being successful
                    console.log('Paypal Error or render dialog closed without being successful ::', uiError);
                    me.restProvider.alert('Sorry! Unable to process payment request');
                });
            }, function (configError) {
                console.log('Paypal Error in configuration ::', configError);
                me.restProvider.alert('Sorry! Unable to process payment request');
            });
        }, function (readyError) {
            console.log('paypal init error ::', readyError);
            me.restProvider.alert('Sorry! Unable to process payment request');
        });
    };
    PaymentPage.prototype.goBack = function () {
        var _this = this;
        this.storage.remove('PLANDETAILS').then(function () {
            _this.navCtrl.navigateRoot('/tabs/tab1');
        });
    };
    PaymentPage.prototype.cancelPayment = function () {
        this.modalController.dismiss({
            'dismissed': true
        });
    };
    PaymentPage = __decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.page.html',
            styleUrls: ['./payment.page.scss'],
        }),
        __metadata("design:paramtypes", [RestapiProvider,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder,
            Events,
            Storage,
            NgZone,
            PayPal,
            NavParams,
            ModalController])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.page.js.map