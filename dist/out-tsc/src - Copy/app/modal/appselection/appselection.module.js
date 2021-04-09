import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppselectionPage } from './appselection.page';
var routes = [
    {
        path: '',
        component: AppselectionPage
    }
];
var AppselectionPageModule = /** @class */ (function () {
    function AppselectionPageModule() {
    }
    AppselectionPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppselectionPage]
        })
    ], AppselectionPageModule);
    return AppselectionPageModule;
}());
export { AppselectionPageModule };
//# sourceMappingURL=appselection.module.js.map