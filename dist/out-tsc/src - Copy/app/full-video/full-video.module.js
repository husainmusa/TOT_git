import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FullVideoPage } from './full-video.page';
import { SharedModule } from './../shared/shared.module';
var routes = [
    {
        path: '',
        component: FullVideoPage
    }
];
var FullVideoPageModule = /** @class */ (function () {
    function FullVideoPageModule() {
    }
    FullVideoPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FullVideoPage]
        })
    ], FullVideoPageModule);
    return FullVideoPageModule;
}());
export { FullVideoPageModule };
//# sourceMappingURL=full-video.module.js.map