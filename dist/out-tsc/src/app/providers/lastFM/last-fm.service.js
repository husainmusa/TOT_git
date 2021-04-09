import { __decorate, __metadata } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Platform, LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var LastFmService = /** @class */ (function () {
    function LastFmService(http, loadingCtrl, alertCtrl, modalController, zone, router, network, navCtrl, platform, applePay, iab, storage) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalController = modalController;
        this.zone = zone;
        this.router = router;
        this.network = network;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.applePay = applePay;
        this.iab = iab;
        this.storage = storage;
        this.deezerCordova = cordova.plugins.DeezerPlugin;
        this.authDeezer();
    }
    LastFmService.prototype.authDeezer = function () {
        this.deezerCordova.init(function (data) {
            console.log('set in it', data);
            //     cordova.plugins.DeezerPlugin.login((res)=>{
            //       console.log('login success',res);
            //     },(er)=>{
            //         console.log('login error',er);
            //    });
            //  cordova.plugins.DeezerPlugin.playAlbum((res)=>{
            //    console.log('album is playing',res);
            //    cordova.plugins.DeezerPlugin.play();
            //  },(er)=>{
            //      console.log('play error',er);
            // },'119606');
        }, function (err) {
            console.log('initErr');
        }, '387304');
    };
    LastFmService.prototype.playTest = function () {
        var _this = this;
        this.deezerCordova.init(function (data) {
            console.log('init', data);
            _this.deezerCordova.playAlbum(function (res) {
                console.log('AlbumPlay', res);
                _this.deezerCordova.play();
            }, function (er) {
                console.log('reserr');
            }, '114638932');
        }, function (err) {
            console.log('initErr');
        }, '387304');
    };
    LastFmService.prototype.playTrack = function () {
        this.deezerCordova.pause();
        this.deezerCordova.playTrack(function (res) {
            console.log('track', res);
        }, function (er) {
            console.log('err');
        }, '774466292');
    };
    LastFmService.prototype.playAlbum = function () {
        this.deezerCordova.playAlbum(function (res) {
            console.log('loin', res);
            this.deezerCordova.play();
        }, function (er) {
            console.log('initErr');
        }, '119606');
        this.deezerCordova.play();
    };
    LastFmService.prototype.play = function () {
        this.deezerCordova.play();
    };
    LastFmService.prototype.pause = function () {
        this.deezerCordova.pause();
    };
    LastFmService.prototype.next = function () {
        this.deezerCordova.next();
    };
    LastFmService.prototype.previous = function () {
        this.deezerCordova.prev();
    };
    LastFmService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            LoadingController,
            AlertController,
            ModalController,
            NgZone,
            Router,
            Network,
            NavController,
            Platform,
            ApplePay,
            InAppBrowser,
            Storage])
    ], LastFmService);
    return LastFmService;
}());
export { LastFmService };
//# sourceMappingURL=last-fm.service.js.map