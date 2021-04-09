import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tabs4Page } from './tabs4.page';
var routes = [
    {
        path: '',
        component: Tabs4Page
    }
];
var Tabs4PageModule = /** @class */ (function () {
    function Tabs4PageModule() {
    }
    Tabs4PageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [Tabs4Page]
        })
    ], Tabs4PageModule);
    return Tabs4PageModule;
}());
export { Tabs4PageModule };
//# sourceMappingURL=tabs4.module.js.map