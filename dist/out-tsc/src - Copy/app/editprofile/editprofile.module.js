import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditprofilePage } from './editprofile.page';
var routes = [
    {
        path: '',
        component: EditprofilePage
    }
];
var EditprofilePageModule = /** @class */ (function () {
    function EditprofilePageModule() {
    }
    EditprofilePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditprofilePage]
        })
    ], EditprofilePageModule);
    return EditprofilePageModule;
}());
export { EditprofilePageModule };
//# sourceMappingURL=editprofile.module.js.map