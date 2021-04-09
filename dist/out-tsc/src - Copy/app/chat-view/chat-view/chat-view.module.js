import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatViewPage } from './chat-view.page';
var routes = [
    {
        path: '',
        component: ChatViewPage
    }
];
var ChatViewPageModule = /** @class */ (function () {
    function ChatViewPageModule() {
    }
    ChatViewPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChatViewPage]
        })
    ], ChatViewPageModule);
    return ChatViewPageModule;
}());
export { ChatViewPageModule };
//# sourceMappingURL=chat-view.module.js.map