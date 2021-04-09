import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../providers/restapis/restapis';
var PaymenthistoryPage = /** @class */ (function () {
    function PaymenthistoryPage(navCtrl, storage, restProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
    }
    PaymenthistoryPage.prototype.ngOnInit = function () {
    };
    PaymenthistoryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var me = this;
        me.restProvider.showLoader();
        me.storage.get('Id').then(function (userID) {
            me.userID = userID;
            console.log('this.userInfo', me.userID);
            me.restProvider.api_method('get', 'payment_history/' + me.userID, 'null', 'null').subscribe(function (data) {
                console.log('payment_history/', data);
                me.restProvider.dismissLoader();
                if (data['status'] == 'success') {
                    _this.payment_history = data['data'];
                }
                else {
                    me.restProvider.alert(data['message']);
                    me.navCtrl.navigateRoot('/tabs/tab4');
                }
            }, function (error) {
                console.log('payment_history/ EEORR:', error);
                me.restProvider.dismissLoader();
                me.restProvider.alert('Sorry!you did not make any payment yet!!');
                me.navCtrl.navigateRoot('/tabs/tab4');
            });
        });
    };
    PaymenthistoryPage.prototype.navigaToback = function () {
        this.navCtrl.navigateRoot('/tabs/tab4');
    };
    PaymenthistoryPage = __decorate([
        Component({
            selector: 'app-paymenthistory',
            templateUrl: './paymenthistory.page.html',
            styleUrls: ['./paymenthistory.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            RestapiProvider])
    ], PaymenthistoryPage);
    return PaymenthistoryPage;
}());
export { PaymenthistoryPage };
//# sourceMappingURL=paymenthistory.page.js.map