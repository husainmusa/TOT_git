import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import SpotifyWebApi from 'spotify-web-api-js';
var SpotifyService = /** @class */ (function () {
    function SpotifyService(event, navCtrl, storage, alertCtrl) {
        var _this = this;
        this.event = event;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.Spotify = cordova.plugins.SpotifyPlugin;
        this.isLoggedIn = 0;
        this.isPlaying = 0;
        this.result = {};
        this.data = '';
        this.playlists = [];
        this.loggedIn = false;
        this.spotifyApi = new SpotifyWebApi();
        this.storage.get('logged_in').then(function (res) {
            if (res) {
                _this.authWithSpotify();
            }
        });
        var me = this;
        var token;
        // Check token
        // if(me.isLoggedIn==0){
        //   this.logIn();
        // }
        // this.Spotify.Events.onLogedIn=function(arg){
        //   me.isLoggedIn=1;
        //   console.log('--------------------onLogedIn------------');
        // }
        // this.Spotify.Events.onDidNotLogin=function(arg){
        //         console.log('--------------------onDidNotLogin------------');
        //   me.presentAlert();
        // }
        //  this.Spotify.Events.onPosition=function(arg){
        //    me.currentPosition=arg;
        //    console.log('--------------------onPosition------------');
        // }
        // this.Spotify.Events.onAudioFlush=function(arg){
        //   console.log('--------------------onAudioFlush------------');
        // me.navCtrl.navigateRoot('/tabs/tab2');
        // me.logIn();
        // me.getToken();
    }
    //<================Spotify Android Plugion=========================>
    SpotifyService.prototype.authWithSpotify = function () {
        var _this = this;
        var config = {
            clientId: "937e6163c32449c49d433515b9bc09c0",
            redirectUrl: "procoders://spotify",
            scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"],
            tokenExchangeUrl: "http://fitapp.web-brats.com/api/swap",
            tokenRefreshUrl: "http://fitapp.web-brats.com/api/refresh",
        };
        cordova.plugins.spotifyAuth.authorize(config)
            .then(function (_a) {
            var accessToken = _a.accessToken, encryptedRefreshToken = _a.encryptedRefreshToken, expiresAt = _a.expiresAt;
            _this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };
            _this.loggedIn = true;
            _this.spotifyApi.setAccessToken(accessToken);
            _this.getUserPlaylists();
            _this.storage.set('logged_in', true);
        }, function (err) {
            console.error('er:::', err);
        });
    };
    SpotifyService.prototype.getUserPlaylists = function () {
        var _this = this;
        this.spotifyApi.getUserPlaylists()
            .then(function (data) {
            _this.playlists = data.items;
        }, function (err) {
            console.error(err);
        });
    };
    //<================Spotify Android Plugion End=========================>
    SpotifyService.prototype.getToken = function () {
        var me = this;
        me.Spotify.getToken(function (res) {
            console.log('--------------------getToken------------', res);
            localStorage.setItem('SpotifyToken', res[0]);
            me.Spotify.auth(res, '937e6163c32449c49d433515b9bc09c0');
        }, function (e) {
            console.log('--------------------getToken------------', e);
            console.log('local-storageToken', localStorage.getItem('SpotifyToken'));
            localStorage.remove('SpotifyToken');
            me.logIn();
        });
    };
    SpotifyService.prototype.getLogin = function () {
        return this.isLoggedIn;
    };
    SpotifyService.prototype.logIn = function () {
        this.Spotify.login('937e6163c32449c49d433515b9bc09c0', 'procoders://spotify', 'http://fitapp.web-brats.com/api');
    };
    SpotifyService.prototype.play = function (uri) {
        if (this.isLoggedIn == 1) {
            this.Spotify.play(uri);
        }
        else {
        }
    };
    SpotifyService.prototype.pause = function () {
        this.Spotify.pause();
    };
    SpotifyService.prototype.next = function () {
        this.Spotify.next();
    };
    SpotifyService.prototype.previous = function () {
        this.Spotify.prev();
    };
    SpotifyService.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Sorry !!',
                            //subHeader: 'You have finished this workout',
                            cssClass: 'secondary',
                            message: 'You might not be a premium user or spotify is currently not working',
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: function () {
                                        _this.navCtrl.navigateRoot('tabs/tab2');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SpotifyService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Events, NavController,
            Storage,
            AlertController])
    ], SpotifyService);
    return SpotifyService;
}());
export { SpotifyService };
// <-----old facebook plugin data --------->
// {
//     if (!url) {
//         return NO;
//     }
//     [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:[options valueForKey:@"UIApplicationOpenURLOptionsSourceApplicationKey"] annotation:0x0];
//
//     NSLog(@"FB handle url: %@", url);
//
//     // Call existing method
//     return [self swizzled_application:application openURL:url sourceApplication:[options valueForKey:@"UIApplicationOpenURLOptionsSourceApplicationKey"] annotation:0x0];
// }
// <-----new facebook plugin data --------->
// link= https://github.com/apache/cordova-ios/issues/476
// {
//      if (!url) {
//          return NO;
//      }
//
//      NSMutableDictionary * openURLData = [[NSMutableDictionary alloc] init];
//
//      [openURLData setValue:url forKey:@"url"];
//
//      if (options[UIApplicationOpenURLOptionsSourceApplicationKey]) {
//          [openURLData setValue:options[UIApplicationOpenURLOptionsSourceApplicationKey] forKey:@"sourceApplication"];
//      }
//
//      if (options[UIApplicationOpenURLOptionsAnnotationKey]) {
//          [openURLData setValue:options[UIApplicationOpenURLOptionsAnnotationKey] forKey:@"annotation"];
//      }
//
//      // all plugins will get the notification, and their handlers will be called
//      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
//      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLWithAppSourceAndAnnotationNotification object:openURLData]];
//
//      return YES;
//  }
//# sourceMappingURL=spotify.service.js.map