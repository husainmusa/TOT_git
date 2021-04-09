import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { CometChat, } from '@cometchat-pro/chat';
import { Router } from '@angular/router';
var UserListPage = /** @class */ (function () {
    function UserListPage(router) {
        this.router = router;
        // tslint:disable-next-line:no-inferrable-types
        this.appID = '5189d825db2284';
        this.apiKey = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';
        this.userListArray = [];
        this.refresh = 0;
        this.unblockUserUID = '';
        this.limit = 30;
    }
    UserListPage.prototype.ngOnInit = function () {
        var _this = this;
        CometChat.init(this.appID).then(function () {
            console.log('Initialization completed successfully');
            CometChat.getLoggedinUser().then(function (user) {
                console.log('Check Login:', { user: user });
            }, function (error) {
                _this.loginComChat();
                console.log('Login Error:', { error: error });
                // User login failed, check error and take appropriate action.
            });
        }, function (error) {
            console.log('Initialization failed with error:', error);
        });
        this.limit = 30;
        this.usersRequest = new CometChat.UsersRequestBuilder().setLimit(this.limit).build();
        this.getUserList();
        this.addUserEventListner();
    };
    UserListPage.prototype.loginComChat = function () {
        var _this = this;
        CometChat.init(this.appID).then(function () {
            console.log('Initialization completed successfully');
            CometChat.login('fitness_coach', _this.apiKey).then(function (user) {
                _this.getUserList();
                console.log('Login Successful:', { user: user });
            }, function (error) {
                console.log('Login error:', error);
                // User login failed, check error and take appropriate action.
            });
            // You can now call login function.
        }, function (error) {
            console.log('Initialization failed with error:', error);
            // Check the reason for error and take apppropriate action.
        });
    };
    UserListPage.prototype.ionViewWillEnter = function () {
        console.log('ion view will enter tab 1');
        this.ngOnInit();
    };
    UserListPage.prototype.getUserList = function () {
        var _this = this;
        this.usersRequest.fetchNext().then(function (userList) {
            if (userList.length > 0) {
                console.log("User list received:", userList);
                _this.userListArray = userList;
            }
        }, function (error) {
            console.log('User list fetching failed with error:', error);
        });
    };
    UserListPage.prototype.tappedOnItems = function (event, user) {
        console.log('here tappedOnItems ' + user);
        // tslint:disable-next-line:no-shadowed-variable
        this.userListArray.map(function (item) {
            if (item.uid === user.uid) {
                item.unreadCount = 0;
            }
        });
        this.userData = user;
        console.log('{{user.name}}');
        var navigationExtras = {
            state: {
                user: this.userData
            }
        };
        this.router.navigate(['tabs/tab5/chat-view'], navigationExtras);
    };
    UserListPage.prototype.loadNextUsers = function (event) {
        var _this = this;
        console.log(event);
        console.log('UserList Array 0 :', this.userListArray);
        this.usersRequest.fetchNext().then(function (userList) {
            console.log('User list received:', userList);
            if (userList !== '') {
                _this.userListArray = _this.userListArray.concat(userList);
                console.log('UserList Array 1 :', _this.userListArray);
            }
        }, function (error) {
            console.log('User list fetching failed with error:', error);
        });
    };
    UserListPage.prototype.addUserEventListner = function () {
        // const listenerID = 'sana';
        // CometChat.addUserListener(
        // listenerID,
        // new CometChat.UserListener({
        //   onUserOnline: onlineUser => {
        //     console.log('On User Online:', { onlineUser });
        //     for (let i = 0; i < this.userListArray.length; i++) {
        //       if (this.userListArray[i].uid === onlineUser.uid) {
        //         this.userListArray[i].status = 'Online';
        //       }
        //     }
        //   },
        //   onUserOffline: offlineUser => {
        //   console.log('On User Offline:', { offlineUser });
        //     for (let i = 0; i < this.userListArray.length; i++) {
        //       if (this.userListArray[i].uid === offlineUser.uid) {
        //         this.userListArray[i].status = 'Offline';
        //       }
        //     }
        //   }
        // })
        // );
    };
    UserListPage = __decorate([
        Component({
            selector: 'app-user-list',
            templateUrl: './user-list.page.html',
            styleUrls: ['./user-list.page.scss'],
        }),
        __metadata("design:paramtypes", [Router])
    ], UserListPage);
    return UserListPage;
}());
export { UserListPage };
//# sourceMappingURL=user-list.page.js.map