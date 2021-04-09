import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayerPage } from './player.page';
var routes = [
    {
        path: '',
        component: PlayerPage
    }
];
var PlayerPageModule = /** @class */ (function () {
    function PlayerPageModule() {
    }
    PlayerPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PlayerPage]
        })
    ], PlayerPageModule);
    return PlayerPageModule;
}());
export { PlayerPageModule };
//# sourceMappingURL=player.module.js.map