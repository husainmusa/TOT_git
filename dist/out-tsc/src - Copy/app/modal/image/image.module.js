import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagePage } from './image.page';
var routes = [
    {
        path: '',
        component: ImagePage
    }
];
var ImagePageModule = /** @class */ (function () {
    function ImagePageModule() {
    }
    ImagePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ImagePage],
            entryComponents: [ImagePage]
        })
    ], ImagePageModule);
    return ImagePageModule;
}());
export { ImagePageModule };
//# sourceMappingURL=image.module.js.map