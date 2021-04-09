import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Platform, LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ImagePage } from './../../modal/image/image.page';
//import { ModalController ,NavController} from '@ionic/angular';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../environments/environment';
import { Network } from '@ionic-native/network/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var appID = environment.appID;
var apiKey = environment.apiKey;
var serviceAPI = environment.serviceAPI;
var applePayMerchantID = environment.applePayMerchantID;
var stripeSecretKey = environment.stripeSecretKey;
var stripePublishableKey = environment.stripePublishableKey;
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
var RestapiProvider = /** @class */ (function () {
    function RestapiProvider(http, loadingCtrl, alertCtrl, modalController, zone, router, network, navCtrl, platform, applePay, iab, storage) {
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
        this.url = serviceAPI;
        this.subject = new Subject();
        this.presentModalData = {
            'data': '',
            'heading': ''
        };
        //loading
        this.isLoading = false;
        //loading
        this.isLoading_payment = false;
        //without duration
        this._isLoading = false;
    }
    RestapiProvider.prototype.getDeviceInfo = function () {
        return {
            'device_type': 'ios',
            'device_token': 'ios-' + Math.random() * 100000000000000000
        };
    };
    RestapiProvider.prototype.setUserInfo = function (userInfoObj) {
        this.userDetail = userInfoObj;
    };
    RestapiProvider.prototype.getUserInfo = function () {
        return this.userDetail;
    };
    RestapiProvider.prototype.sendMessage = function (message) {
        this.subject.next({ text: message });
    };
    RestapiProvider.prototype.getSplashScreenArray = function (callback) {
        var me = this;
        me.api_method('get', 'splash_screen', null, null).subscribe(function (data) {
            me.apiResponse = data;
            callback(me.apiResponse.data ? me.apiResponse.data : []);
        }, function (error) {
            console.log('splash_screen EEEORRR:::', error);
            callback([]);
        });
    };
    RestapiProvider.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    RestapiProvider.prototype.getAlbums = function () {
        return this.albums;
    };
    RestapiProvider.prototype.getApp = function (app, status) {
        this.selectApp = app;
        this.songSelected = status;
    };
    RestapiProvider.prototype.getModalData = function () {
        return this.presentModalData;
    };
    RestapiProvider.prototype.getSpofityTrackDetail = function () {
        var staticData = {
            "href": "https://api.spotify.com/v1/playlists/6pBcjW9ihc04kl5SjcEGXV/tracks?offset=0&limit=100",
            "items": [
                {
                    "added_at": "2019-11-19T06:07:57Z",
                    "added_by": {
                        "external_urls": { "spotify": "https://open.spotify.com/user/zcowvflezaewfkrb33aik2hh3" },
                        "href": "https://api.spotify.com/v1/users/zcowvflezaewfkrb33aik2hh3",
                        "id": "zcowvflezaewfkrb33aik2hh3",
                        "type": "user",
                        "uri": "spotify:user:zcowvflezaewfkrb33aik2hh3"
                    },
                    "is_local": false,
                    "primary_color": null,
                    "track": {
                        "album": {
                            "album_type": "single",
                            "artists": [
                                {
                                    "external_urls": { "spotify": "https://open.spotify.com/artist/28uJnu5EsrGml2tBd7y8ts" },
                                    "href": "https://api.spotify.com/v1/artists/28uJnu5EsrGml2tBd7y8ts",
                                    "id": "28uJnu5EsrGml2tBd7y8ts",
                                    "name": "Vintage Culture",
                                    "type": "artist",
                                    "uri": "spotify:artist:28uJnu5EsrGml2tBd7y8ts"
                                },
                                {
                                    "external_urls": { "spotify": "https://open.spotify.com/artist/37UXlMGND0Tr7Su43RxHQ0" },
                                    "href": "https://api.spotify.com/v1/artists/37UXlMGND0Tr7Su43RxHQ0",
                                    "id": "37UXlMGND0Tr7Su43RxHQ0",
                                    "name": "Bruno Be",
                                    "type": "artist",
                                    "uri": "spotify:artist:37UXlMGND0Tr7Su43RxHQ0"
                                },
                                {
                                    "external_urls": { "spotify": "https://open.spotify.com/artist/1u5OwFCI26TQzGWf3F9iX9" },
                                    "href": "https://api.spotify.com/v1/artists/1u5OwFCI26TQzGWf3F9iX9",
                                    "id": "1u5OwFCI26TQzGWf3F9iX9",
                                    "name": "Manimal",
                                    "type": "artist",
                                    "uri": "spotify:artist:1u5OwFCI26TQzGWf3F9iX9"
                                }
                            ],
                            "available_markets": ["AD", "AE", "AR", "AT", "AU", "BE", "BG", "BH", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JO", "JP", "KW", "LB", "LI", "LT", "LU", "LV", "MA", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "OM", "PA", "PE", "PH", "PL", "PS", "PT", "PY", "QA", "RO", "SA", "SE", "SG", "SK", "SV", "TH", "TN", "TR", "TW", "US", "UY", "VN", "ZA"],
                            "external_urls": { "spotify": "https://open.spotify.com/album/5gV5YLk7ehBmnLzoj1ftOo" },
                            "href": "https://api.spotify.com/v1/albums/5gV5YLk7ehBmnLzoj1ftOo",
                            "id": "5gV5YLk7ehBmnLzoj1ftOo",
                            "images": [
                                { "height": 640,
                                    "url": "https://i.scdn.co/image/ab67616d0000b2737653e1881ecac215a8b8c9c9",
                                    "width": 640
                                },
                                { "height": 300,
                                    "url": "https://i.scdn.co/image/ab67616d00001e027653e1881ecac215a8b8c9c9",
                                    "width": 300
                                },
                                { "height": 64, "url": "https://i.scdn.co/image/ab67616d000048517653e1881ecac215a8b8c9c9",
                                    "width": 64
                                }
                            ],
                            "name": "Human (Remix)",
                            "release_date": "2017-09-01",
                            "release_date_precision": "day",
                            "total_tracks": 1,
                            "type": "album",
                            "uri": "spotify:album:5gV5YLk7ehBmnLzoj1ftOo"
                        },
                        "artists": [
                            {
                                "external_urls": { "spotify": "https://open.spotify.com/artist/28uJnu5EsrGml2tBd7y8ts" },
                                "href": "https://api.spotify.com/v1/artists/28uJnu5EsrGml2tBd7y8ts",
                                "id": "28uJnu5EsrGml2tBd7y8ts",
                                "name": "Vintage Culture",
                                "type": "artist",
                                "uri": "spotify:artist:28uJnu5EsrGml2tBd7y8ts"
                            },
                            {
                                "external_urls": { "spotify": "https://open.spotify.com/artist/37UXlMGND0Tr7Su43RxHQ0" },
                                "href": "https://api.spotify.com/v1/artists/37UXlMGND0Tr7Su43RxHQ0",
                                "id": "37UXlMGND0Tr7Su43RxHQ0",
                                "name": "Bruno Be",
                                "type": "artist", "uri": "spotify:artist:37UXlMGND0Tr7Su43RxHQ0"
                            },
                            {
                                "external_urls": { "spotify": "https://open.spotify.com/artist/1u5OwFCI26TQzGWf3F9iX9" },
                                "href": "https://api.spotify.com/v1/artists/1u5OwFCI26TQzGWf3F9iX9",
                                "id": "1u5OwFCI26TQzGWf3F9iX9",
                                "name": "Manimal",
                                "type": "artist",
                                "uri": "spotify:artist:1u5OwFCI26TQzGWf3F9iX9"
                            }
                        ],
                        "available_markets": ["AD", "AE", "AR", "AT", "AU", "BE", "BG", "BH", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JO", "JP", "KW", "LB", "LI", "LT", "LU", "LV", "MA", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "OM", "PA", "PE", "PH", "PL", "PS", "PT", "PY", "QA", "RO", "SA", "SE", "SG", "SK", "SV", "TH", "TN", "TR", "TW", "US", "UY", "VN", "ZA"],
                        "disc_number": 1,
                        "duration_ms": 211024,
                        "episode": false,
                        "explicit": false,
                        "external_ids": { "isrc": "BXAT61700056" },
                        "external_urls": { "spotify": "https://open.spotify.com/track/0bVp6yZEUrJzOm2agoFYZm" },
                        "href": "https://api.spotify.com/v1/tracks/0bVp6yZEUrJzOm2agoFYZm",
                        "id": "0bVp6yZEUrJzOm2agoFYZm",
                        "is_local": false,
                        "name": "Human (Remix)",
                        "popularity": 63,
                        "preview_url": "https://p.scdn.co/mp3-preview/e6c2eb6dfeb66d87810058c80a213aa0c4e69868?cid=937e6163c32449c49d433515b9bc09c0",
                        "track": true,
                        "track_number": 1,
                        "type": "track",
                        "uri": "spotify:track:0bVp6yZEUrJzOm2agoFYZm"
                    },
                    "video_thumbnail": { "url": null }
                }
            ],
            "limit": 100,
            "next": null,
            "offset": 0,
            "previous": null,
            "total": 1
        };
        return this.spotifyTrackData = staticData;
    };
    RestapiProvider.prototype.showLoader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                duration: 5000,
                                spinner: 'circles',
                                cssClass: 'custom-loading'
                            }).then(function (a) {
                                a.present().then(function () {
                                    console.log();
                                    if (!_this.isLoading) {
                                        a.dismiss().then(function () {
                                            return console.log();
                                        });
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.dismissLoader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(this.isLoading == true)) return [3 /*break*/, 2];
                        this.isLoading = false;
                        return [4 /*yield*/, this.loadingCtrl.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('dismissLoader::', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestapiProvider.prototype.showLoaderPayment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading_payment = true;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Process',
                                spinner: 'circles',
                                cssClass: 'custom-loading'
                            }).then(function (a) {
                                a.present().then(function () {
                                    console.log();
                                    if (!_this.isLoading_payment) {
                                        a.dismiss().then(function () {
                                            return console.log();
                                        });
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.dismissLoaderPayment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading_payment = false;
                        return [4 /*yield*/, this.loadingCtrl.dismiss().then(function () { return console.log(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype._showLoader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._isLoading = true;
                        return [4 /*yield*/, this.loadingCtrl.create({}).then(function (a) {
                                a.present().then(function () {
                                    console.log();
                                    if (!_this._isLoading) {
                                        a.dismiss().then(function () {
                                            return console.log();
                                        });
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype._dismissLoader = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._isLoading = false;
                        return [4 /*yield*/, this.loadingCtrl.dismiss().then(function () { return console.log(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.alert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Message',
                            message: msg,
                            buttons: ['ok']
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    RestapiProvider.prototype.confirmationBox = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            message: msg,
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                },
                                {
                                    text: 'Confirm',
                                    handler: function () {
                                        _this.modalController.dismiss();
                                        _this.zone.run(function () {
                                            _this.navCtrl.navigateRoot('/login');
                                        });
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
    RestapiProvider.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    RestapiProvider.prototype.handleError = function (error) {
        var me = this;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log('EEE::', JSON.stringify(error.error));
            console.log("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    RestapiProvider.prototype.api_method = function (method, url_name, user, data) {
        if (method == 'post') {
            var v = new FormData();
            for (var k in user)
                v.append(k, user[k]);
            return this.http.post(this.url + '/' + url_name, v).pipe(map(this.extractData), catchError(this.handleError));
        }
        else {
            return this.http.get(this.url + '/' + url_name, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
        }
    };
    RestapiProvider.prototype.getDeezer = function () {
        var httOptions = {
            headers: new HttpHeaders({ 'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                'x-rapidapi-key': '5eabcf8e8bmsh8c0ec2d249266c3p1e68c9jsn421a0ea26759' })
        };
        return this.http.get('https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem', httOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    };
    RestapiProvider.prototype.present_Modal = function (data, heading, message) {
        if (message === void 0) { message = null; }
        return __awaiter(this, void 0, void 0, function () {
            var temp, check_message, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('present_Modal', data);
                        this.presentModalData = {
                            'data': data,
                            'heading': heading
                        };
                        temp = data;
                        check_message = message && message != null ? 'ask_message' : '';
                        console.log('selecte_app', this.selectApp, this.presentModalData, this.songSelected);
                        return [4 /*yield*/, this.modalController.create({
                                component: ImagePage,
                                componentProps: {
                                    heading: heading,
                                    id: temp.id,
                                    type: temp.video_type,
                                    ask_a_coach: check_message,
                                    calories: temp.calories,
                                    time_duration: temp.time_duration,
                                    image: temp.thumbnail,
                                    hor_image: temp.horz_img ? temp.horz_img : temp.thumbnail,
                                    video: temp.video,
                                    name: temp.video_title,
                                    overview: temp.video_description,
                                    tips: temp.tips,
                                    instructions: temp.instructions,
                                    app: this.selectApp,
                                    status: this.songSelected,
                                    category: temp.category,
                                    equipImg: temp.equipImg
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.present_Modal_coach = function (_heading, id) {
        return __awaiter(this, void 0, void 0, function () {
            var check_message, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        check_message = 'ask_message';
                        return [4 /*yield*/, this.modalController.create({
                                component: ImagePage,
                                componentProps: { heading: _heading, id: id, ask_a_coach: check_message }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.present_Modal_selectApp = function (_heading, id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ImagePage,
                            componentProps: { heading: _heading }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.present_Modal_Album = function (_heading, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var newData, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('calling-modal:::');
                        newData = [
                            { "collaborative": false,
                                "external_urls": { "spotify": "https://open.spotify.com/playlist/6W2s7sU0IdhFeHch03sVrZ" },
                                "href": "https://api.spotify.com/v1/playlists/6W2s7sU0IdhFeHch03sVrZ",
                                "id": "6W2s7sU0IdhFeHch03sVrZ",
                                "images": [
                                    { "height": 640,
                                        "url": "https://mosaic.scdn.co/640/ab67616d0000b2730996eb30f4f33cb772663238ab67616d0000b2732066a381ebbbb1f8312764e7ab67616d0000b2739e588b0c2afe8178b2b76231ab67616d0000b273fb023e6073e38a52082cc7b6",
                                        "width": 640
                                    },
                                    { "height": 300,
                                        "url": "https://mosaic.scdn.co/300/ab67616d0000b2730996eb30f4f33cb772663238ab67616d0000b2732066a381ebbbb1f8312764e7ab67616d0000b2739e588b0c2afe8178b2b76231ab67616d0000b273fb023e6073e38a52082cc7b6",
                                        "width": 300
                                    },
                                    { "height": 60,
                                        "url": "https://mosaic.scdn.co/60/ab67616d0000b2730996eb30f4f33cb772663238ab67616d0000b2732066a381ebbbb1f8312764e7ab67616d0000b2739e588b0c2afe8178b2b76231ab67616d0000b273fb023e6073e38a52082cc7b6",
                                        "width": 60
                                    }
                                ],
                                "name": "new",
                                "owner": {
                                    "display_name": "arpit",
                                    "external_urls": { "spotify": "https://open.spotify.com/user/zcowvflezaewfkrb33aik2hh3" },
                                    "href": "https://api.spotify.com/v1/users/zcowvflezaewfkrb33aik2hh3",
                                    "id": "zcowvflezaewfkrb33aik2hh3",
                                    "type": "user",
                                    "uri": "spotify:user:zcowvflezaewfkrb33aik2hh3"
                                },
                                "primary_color": null,
                                "public": true,
                                "snapshot_id": "MTEsZDY0OWZhZmRmYTI0NGY5MzEzMzBjMDA4MzE2NWMxMDBiOTQ0NjRjNg==",
                                "tracks": { "href": "https://api.spotify.com/v1/playlists/6W2s7sU0IdhFeHch03sVrZ/tracks", "total": 10 },
                                "type": "playlist",
                                "uri": "spotify:playlist:6W2s7sU0IdhFeHch03sVrZ"
                            }
                        ];
                        console.log(newData);
                        return [4 /*yield*/, this.modalController.create({
                                component: ImagePage,
                                componentProps: { heading: _heading, newData: newData }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestapiProvider.prototype.present_Modal_Open_Player = function (_heading, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('calling-modal:::');
                        return [4 /*yield*/, this.modalController.create({
                                component: ImagePage,
                                componentProps: { heading: _heading, newData: data }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // test_api(){
    //   let url='http://192.168.1.2:8000/api/get_workout_vids_detail/1';
    //    return this.http.get(url,httpOptions).pipe(map(this.extractData),
    //        catchError(this.handleError));
    // }
    //comeTchat
    RestapiProvider.prototype.initializationCometChat = function () {
        CometChat.init(appID).then(function (hasInitialized) {
            console.log("Initialization completed successfully", hasInitialized);
        }, function (error) {
            console.log("Initialization failed with error:", error);
            // Check the reason for error and take apppropriate action.
        });
    };
    RestapiProvider.prototype.checkCometChatLogin = function (UID) {
        var _this = this;
        CometChat.getLoggedinUser().then(function (user) {
            console.log('User Login Detail:', { user: user });
        }, function (error) {
            _this.loginComChat(UID);
            console.log('Login Error:', { error: error });
            // User login failed, check error and take appropriate action.
        });
    };
    RestapiProvider.prototype.loginComChat = function (UID) {
        CometChat.login(UID, apiKey).then(function (user) {
            console.log('Login Successful:', { user: user });
        }, function (error) {
            console.log('Login Error:', error.message);
        });
    };
    RestapiProvider.prototype.checkLogoutUserComChat = function (UID) {
        var _this = this;
        CometChat.getLoggedinUser().then(function (user) {
            console.log('User Login Detail:', { user: user });
            _this.logoutCometChat();
        }, function (error) {
            console.log('Login Error:', { error: error });
            // User login failed, check error and take appropriate action.
        });
    };
    RestapiProvider.prototype.logoutCometChat = function () {
        CometChat.logout().then(function () {
            console.log('Logout completed successfully');
            // this.router.navigate(['login']);
        }, function (error) {
            console.log('Logout failed with exception:', { error: error });
        });
    };
    /*----Apply Apple Payment-----*/
    RestapiProvider.prototype.makePaymentByApplePay = function (item, currencyCode, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var me, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        order = {
                            items: item,
                            shippingMethods: [],
                            merchantIdentifier: applePayMerchantID,
                            currencyCode: currencyCode,
                            countryCode: 'US',
                            billingAddressRequirement: 'none',
                            shippingAddressRequirement: 'none',
                            shippingType: 'service',
                            merchantCapabilities: ['3ds', 'debit', 'credit'],
                            supportedNetworks: ['visa', 'amex']
                        };
                        return [4 /*yield*/, me.applePay.canMakePayments().then(function (message) {
                                console.log('canMakePayments SUCC::', message);
                                me.doApplePayment(order, function (state, obj) {
                                    if (state == false) {
                                        me.applePay.completeLastTransaction('failure');
                                    }
                                    else {
                                        me.applePay.completeLastTransaction('success');
                                    }
                                    callback(state, obj);
                                });
                            }).catch(function (error) {
                                console.log('canMakePayments FFF::', error);
                                callback(false, error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RestapiProvider.prototype.doApplePayment = function (order, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var me, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, me.applePay.makePaymentRequest(order).then(function (obj) {
                                console.log('makePaymentRequest SUC::', JSON.stringify(obj));
                                callback(true, obj);
                            }).catch(function (error) {
                                console.log('makePaymentRequest Err::', error);
                                callback(false, error);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log('makePaymentRequest Catch::::', e_2);
                        callback(false, e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /*----Apply Apple Payment-----*/
    /*----Start: spotify API cordova-----*/
    RestapiProvider.prototype.closeWindow = function () {
        var me = this;
        if (me.inAppBrowserRef) {
            me.inAppBrowserRef.removeEventListener('loadstart', function () { });
            me.inAppBrowserRef.removeEventListener('loaderror', function () { });
            me.inAppBrowserRef.close();
        }
    };
    RestapiProvider.prototype.authSpotity = function (callback) {
        var me = this;
        var url = environment.spotifyAuthBaseURL;
        url += '?response_type=code';
        url += '&client_id=' + encodeURIComponent(environment.spotifyClientID);
        url += '&scope=' + encodeURIComponent(environment.spotifyScope.join(' '));
        url += '&redirect_uri=' + encodeURIComponent(environment.spotifyRedirectURL);
        url += '&state=' + encodeURIComponent('ios-' + Math.random() * 100000000000000000);
        var options = "location=no,clearcache=yes,hardwareback=no,closebuttoncaption=cancel";
        me.closeWindow();
        me.inAppBrowserRef = cordova.InAppBrowser.open(url, '_blank', options);
        me.inAppBrowserRef.addEventListener('loadstart', function (params) {
            console.log('loadstart calling', url);
            var splitStr = environment.spotifyRedirectURL + '?';
            if (params.url.indexOf(splitStr) != -1) {
                var resToken = params.url.split(splitStr);
                var paramsObj = null;
                var queryString = "";
                if (resToken[0] && resToken[0] != "")
                    queryString = resToken[0];
                if (resToken[1] && resToken[1] != "")
                    queryString = resToken[1];
                if (queryString != "") {
                    paramsObj = queryString.split("&").reduce(function (prev, curr, i, arr) {
                        var p = curr.split("=");
                        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                        return prev;
                    }, {});
                }
                if (paramsObj != null) {
                    var postObj = {
                        grant_type: "authorization_code",
                        code: paramsObj['code'],
                        redirect_uri: environment.spotifyRedirectURL,
                        client_id: environment.spotifyClientID,
                        client_secret: environment.spotifyClientSecret
                    };
                    me.getSpotifyToken(postObj, function (dataObj) {
                        console.log('API getSpotifyToken::::', JSON.stringify(dataObj));
                        me.closeWindow();
                        callback(true, dataObj);
                    });
                }
                else {
                    callback(false, 'access_denied');
                }
            }
            if (params.url.indexOf('error') != -1) {
                me.closeWindow();
                callback(false, 'access_denied');
            }
        });
        me.inAppBrowserRef.addEventListener('loaderror', function (params) {
            me.closeWindow();
            callback(false, 'access_denied');
        });
    };
    RestapiProvider.prototype.spotifyAPICall = function (method, endPoint, params, callback) {
        if (method === void 0) { method = 'GET'; }
        var me = this;
        var spotifyToken = localStorage.getItem("spotifyToken");
        var httpSpotifyOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + spotifyToken
            })
        };
        me.http.get(environment.spotifyAPIURL + endPoint, httpSpotifyOptions).subscribe(function (data) {
            //The access token expired
            if (data['error']) {
                var msgError = 'invalid authorization';
                if (data['error']['error'] && data['error']['error']['message']) {
                    msgError = data['error']['error']['message'];
                }
                if (data['error'] && data['error']['message']) {
                    msgError = data['error']['message'];
                }
                me.needRefreshTokenInSpotify(data);
                callback(false, msgError);
            }
            else {
                callback(true, data);
            }
        }, function (error) {
            me.needRefreshTokenInSpotify(error);
            callback(false, error);
        });
    };
    RestapiProvider.prototype.needRefreshTokenInSpotify = function (data) {
        var me = this;
        var msgError = 'invalid authorization';
        if (data['error']['error'] && data['error']['error']['message']) {
            msgError = data['error']['error']['message'];
        }
        if (data['error'] && data['error']['message']) {
            msgError = data['error']['message'];
        }
        if (msgError.indexOf('expired') != -1 && msgError.indexOf('token') != -1) {
            me.getSpotifyToken({
                grant_type: "refresh_token",
                refresh_token: localStorage.getItem("spotifyRefreshToken"),
                client_id: environment.spotifyClientID,
                client_secret: environment.spotifyClientSecret
            }, function (refreshToken) {
                console.log('refreshToken', refreshToken);
                if (refreshToken && refreshToken['access_token']) {
                    localStorage.setItem('spotifyToken', refreshToken['access_token']);
                }
            });
        }
    };
    RestapiProvider.prototype.getSpotifyToken = function (postObj, callback) {
        if (postObj === void 0) { postObj = {}; }
        var me = this;
        me.api_method('post', 'spotifyToken', postObj, null).subscribe(function (data) {
            //console.log('API spotifyToken SUC::::',JSON.stringify(data));
            callback(data);
        }, function (error) {
            //console.log('API spotifyToken Err::::',JSON.stringify(error));
            callback(false);
        });
    };
    RestapiProvider.prototype.getSpotifyPlaylistTracks = function (playlistID, callback) {
        console.log('trackId:::', playlistID);
        var me = this;
        me.spotifyAPICall('GET', 'playlists/' + playlistID + '/tracks?limit=100', null, function (status, d) {
            callback(d);
            me.spotifyTrackData = d;
            console.log('tacks::::', JSON.stringify(me.spotifyTrackData));
        });
    };
    RestapiProvider.prototype.getSpotifyPlaylist = function (callback) {
        this.present_Modal_Album('Albums', 'id', 'data');
        var me = this;
        var spotifyToken = localStorage.getItem("spotifyToken");
        if (spotifyToken == null || typeof spotifyToken == 'undefined' || spotifyToken == '') {
            me.authSpotity(function (status, authRes) {
                console.log('authSpotity::', status, JSON.stringify(authRes));
                if (status == true && authRes['access_token'] != '') {
                    localStorage.setItem('spotifyToken', authRes['access_token']);
                    localStorage.setItem('spotifyRefreshToken', authRes['refresh_token']);
                    me.spotifyAPICall('GET', 'me/playlists?limit=50', null, function (status, d) {
                        if (d['items'] && d['total'] > 0) {
                            var usersByFood = d['items'].map(function (item) {
                                var container = {};
                                container['id'] = item.id;
                                container['name'] = item.name;
                                container['image'] = item['images'] && item['images'][0] ? item['images'][0]['url'] : '';
                                container['total_tracks'] = item['tracks'] && item['tracks']['total'] ? item['tracks']['total'] : 0;
                                return container;
                            });
                            console.log('playlists::', JSON.stringify(usersByFood), JSON.stringify(d));
                            callback(usersByFood);
                        }
                        else {
                            callback([]);
                        }
                    });
                }
                else {
                    callback(status, 'unable to authorize');
                }
            });
        }
        else {
            me.spotifyAPICall('GET', 'me/playlists?limit=50', null, function (status, d) {
                console.log('playlists::', JSON.stringify(d), status, d);
                if (status == true) {
                    me.albums = d['items'];
                    console.log('albums::', JSON.stringify(me.albums));
                    me.present_Modal_Album('Albums', 'id', d['items']);
                    // this.router.navigate(['albums']);
                    // this.navCtrl.navigateRoot('/albums');
                }
            });
        }
    };
    RestapiProvider = __decorate([
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
    ], RestapiProvider);
    return RestapiProvider;
}());
export { RestapiProvider };
//# sourceMappingURL=restapis.js.map