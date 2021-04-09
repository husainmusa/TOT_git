import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SpotifytrackPage } from './spotifytrack.page';
var routes = [
    {
        path: '',
        component: SpotifytrackPage
    }
];
var SpotifytrackPageModule = /** @class */ (function () {
    function SpotifytrackPageModule() {
    }
    SpotifytrackPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SpotifytrackPage]
        })
    ], SpotifytrackPageModule);
    return SpotifytrackPageModule;
}());
export { SpotifytrackPageModule };
//# sourceMappingURL=spotifytrack.module.js.map