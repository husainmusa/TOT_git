import { __decorate, __metadata } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Platform, LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var DeezerService = /** @class */ (function () {
    function DeezerService(http, loadingCtrl, alertCtrl, modalController, zone, router, network, navCtrl, platform, applePay, iab, storage) {
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
    }
    DeezerService.prototype.authDeezer = function () {
        this.deezerCordova.init(function (data) {
        }, function (err) {
            console.log('initErr');
        }, '387304');
    };
    DeezerService.prototype.playTrack = function (callback) {
        var _this = this;
        this.deezerCordova.pause();
        this.deezerCordova.playTrack(function (res) {
            _this.deezerCordova.play();
            callback(res);
            console.log('track', res);
        }, function (er) {
            callback(false);
            console.log('err');
        }, '774466292');
    };
    DeezerService.prototype.playAlbum = function (callback) {
        var me = this;
        me.deezerCordova.playAlbum(function (res) {
            callback(res);
            me.deezerCordova.play();
        }, function (er) {
            callback(false);
        }, me.albumId);
    };
    DeezerService.prototype.resume = function () {
        this.deezerCordova.play();
    };
    DeezerService.prototype.pauseTrack = function () {
        this.deezerCordova.pause();
    };
    DeezerService.prototype.next = function () {
        this.deezerCordova.next();
    };
    DeezerService.prototype.previous = function () {
        this.deezerCordova.prev();
    };
    DeezerService.prototype.getAlbumId = function (id) {
        this.albumId = id;
        console.log('id', this.albumId);
    };
    //<------------------ request method ----------------------->
    DeezerService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    DeezerService.prototype.handleError = function (error) {
        var me = this;
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.log('EEE::', JSON.stringify(error.error));
            console.log("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        return throwError('Something bad happened; please try again later.');
    };
    DeezerService.prototype.requestGetData = function (url) {
        var httOptions = {
            headers: new HttpHeaders({ 'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                'x-rapidapi-key': '5eabcf8e8bmsh8c0ec2d249266c3p1e68c9jsn421a0ea26759' })
        };
        return this.http.get('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + url, httOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    };
    // <------------- fet data functons -------------------->
    DeezerService.prototype.searchData = function (query, callback) {
        this.requestGetData(query).subscribe(function (res) {
            callback(res['data']);
        }, function (error) {
            callback(false);
            console.log('error', error);
        });
    };
    DeezerService = __decorate([
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
    ], DeezerService);
    return DeezerService;
}());
export { DeezerService };
//# sourceMappingURL=deezer.service.js.map