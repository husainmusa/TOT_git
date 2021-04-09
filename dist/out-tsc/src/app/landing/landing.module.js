import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LandingPage } from './landing.page';
import { SharedModule } from './../shared/shared.module';
var routes = [
    {
        path: '',
        component: LandingPage
    }
];
var LandingPageModule = /** @class */ (function () {
    function LandingPageModule() {
    }
    LandingPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LandingPage]
        })
    ], LandingPageModule);
    return LandingPageModule;
}());
export { LandingPageModule };
//# sourceMappingURL=landing.module.js.map