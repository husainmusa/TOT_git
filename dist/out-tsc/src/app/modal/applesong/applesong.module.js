import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApplesongPage } from './applesong.page';
var routes = [
    {
        path: '',
        component: ApplesongPage
    }
];
var ApplesongPageModule = /** @class */ (function () {
    function ApplesongPageModule() {
    }
    ApplesongPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ApplesongPage]
        })
    ], ApplesongPageModule);
    return ApplesongPageModule;
}());
export { ApplesongPageModule };
//# sourceMappingURL=applesong.module.js.map