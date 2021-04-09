import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { RestapiProvider } from '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
var TabsPage = /** @class */ (function () {
    function TabsPage(restProvider, storage) {
        var _this = this;
        this.restProvider = restProvider;
        this.storage = storage;
        this.messages = [];
        this.countMessage = '';
        this.subscription = this.restProvider.getMessage().subscribe(function (message) {
            if (message) {
                _this.messages.push(message);
                console.log('after', message);
                _this.countMessage = message.text;
            }
            else {
                // clear messages when empty message received
                _this.messages = [];
                console.log('before', _this.messages);
            }
        });
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        this.ngOnInit();
    };
    TabsPage.prototype.ngOnInit = function () {
        // this.myNotification();
    };
    TabsPage.prototype.ngClicktab = function () {
        // this.myNotification();
        // console.log('enter tabs f')
    };
    //live chat
    TabsPage.prototype.myNotification = function () {
        var _this = this;
        this.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                if (userObj.type == 'user') {
                    var UID = userObj.id;
                    _this.restProvider.api_method('get', 'cometChatGetUserUnreadMessageCount/' + userObj.id + '/' + 'fitness_coach', 'null', 'null').subscribe(function (data) {
                        if (data['status'] == 'success') {
                            if (data['data'] != '') {
                                console.log(data['data']);
                                _this.responseData = data['data'][0];
                                _this.countMessage = _this.restProvider.notification = _this.responseData['count'];
                            }
                            else {
                                _this.countMessage = _this.restProvider.notification = '';
                            }
                        }
                        else if (data['status'] == 'error') {
                            _this.countMessage = _this.restProvider.notification = '';
                            console.log(_this.countMessage);
                        }
                    }, function (error) {
                        console.log('api error:', error);
                    });
                }
            }
        });
    };
    TabsPage = __decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        __metadata("design:paramtypes", [RestapiProvider,
            Storage])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map