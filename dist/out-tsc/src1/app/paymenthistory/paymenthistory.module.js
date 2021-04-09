import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaymenthistoryPage } from './paymenthistory.page';
var routes = [
    {
        path: '',
        component: PaymenthistoryPage
    }
];
var PaymenthistoryPageModule = /** @class */ (function () {
    function PaymenthistoryPageModule() {
    }
    PaymenthistoryPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PaymenthistoryPage]
        })
    ], PaymenthistoryPageModule);
    return PaymenthistoryPageModule;
}());
export { PaymenthistoryPageModule };
//# sourceMappingURL=paymenthistory.module.js.map