import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserListPage } from './user-list.page';
var routes = [
    {
        path: '',
        component: UserListPage
    }
];
var UserListPageModule = /** @class */ (function () {
    function UserListPageModule() {
    }
    UserListPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UserListPage]
        })
    ], UserListPageModule);
    return UserListPageModule;
}());
export { UserListPageModule };
//# sourceMappingURL=user-list.module.js.map