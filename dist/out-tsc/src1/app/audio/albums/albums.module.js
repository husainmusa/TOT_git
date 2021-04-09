import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumsPage } from './albums.page';
var routes = [
    {
        path: '',
        component: AlbumsPage
    }
];
var AlbumsPageModule = /** @class */ (function () {
    function AlbumsPageModule() {
    }
    AlbumsPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlbumsPage]
        })
    ], AlbumsPageModule);
    return AlbumsPageModule;
}());
export { AlbumsPageModule };
//# sourceMappingURL=albums.module.js.map