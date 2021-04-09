import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayVideoPage } from './play-video.page';
import { SharedModule } from './../shared/shared.module';
import { DeezerComponent } from '../components/deezer/deezer.component';
import { AndroidaudioComponent } from '../components/androidaudio/androidaudio.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
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
                RouterModule.forChild(routes),
                RoundProgressModule
            ],
            declarations: [PlayVideoPage, DeezerComponent, AndroidaudioComponent]
        })
    ], PlayVideoPageModule);
    return PlayVideoPageModule;
}());
export { PlayVideoPageModule };
//# sourceMappingURL=play-video.module.js.map