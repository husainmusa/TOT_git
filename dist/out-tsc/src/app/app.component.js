import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Platform, AlertController, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
var appID = environment.appID;
var apiKey = environment.apiKey;
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, keyboard, events, navCtrl, router, alertController, fcm) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.keyboard = keyboard;
        this.events = events;
        this.navCtrl = navCtrl;
        this.router = router;
        this.alertController = alertController;
        this.fcm = fcm;
        var me = this;
        this.platform.ready().then(function () {
            me.fcm.getToken().then(function (token) {
                console.log('token::', token);
            });
            if (_this.platform.is('ios')) {
                if (typeof window !== 'undefined') {
                    window.addEventListener('keyboardDidShow', function (event) {
                        console.log('calling window key show event::::', event.keyboardHeight, document);
                        if (document && typeof document.body !== 'undefined') {
                            //document.body.classList.add('keyboard-is-open');
                        }
                    });
                    window.addEventListener('keyboardDidHide', function () {
                        console.log('calling window key hide event::::', document);
                        if (document && typeof document.body !== 'undefined') {
                            document.body.classList.remove('keyboard-is-open');
                            //if we want to remove display tab-bar animation then comment to the bellow line
                            //document.body.classList.add('keyboard-is-opened');
                        }
                    });
                }
            }
        });
        this.initializeApp();
    }
    AppComponent.prototype.confirmExitApp = function () {
        var me = this;
        this.alertController.create({
            header: 'Train of Thought Fitness',
            message: '<p>Are you sure want to exit from app?</p>',
            cssClass: 'my-custom-popup',
            buttons: [
                {
                    text: "CANCEL",
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                    }
                }, {
                    text: "Close",
                    handler: function () {
                        navigator['app'].exitApp();
                    }
                }
            ]
        }).then(function (alert) { alert.present(); });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        // this.initializationCometChat();
        var me = this;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (_this.platform.is('cordova')) {
                _this.platform.backButton.subscribe(function () {
                    var view = _this.router.url;
                    var baseViews = ['/tabs/tab1', '/tabs/tab2', '/tabs/tab3', '/tabs/tab4', '/tabs/tab5'];
                    if (baseViews.indexOf(view) != -1) {
                        if (new Date().getTime() - _this.lastTimeBackPress < _this.timePeriodToExit) {
                            me.confirmExitApp();
                        }
                        else {
                            _this.lastTimeBackPress = new Date().getTime();
                        }
                    }
                    console.log('this.view', view);
                    _this.navCtrl.pop();
                });
            }
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Keyboard,
            Events,
            NavController,
            Router,
            AlertController,
            FCM])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map