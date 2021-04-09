import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayVideoPage } from './play-video.page';
import { SharedModule } from './../shared/shared.module';
// import { ApplesongComponent } from '../components/applesong/applesong.component';
var routes = [
    {
        path: '',
        component: PlayVideoPage
    }
];
var PlayVideoPageModule = /** @class */ (function () {
    function PlayVideoPageModule() {
    }
    PlayVideoPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PlayVideoPage]
        })
    ], PlayVideoPageModule);
    return PlayVideoPageModule;
}());
export { PlayVideoPageModule };
//# sourceMappingURL=play-video.module.js.map