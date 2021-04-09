import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, Input, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapis/restapis';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
var ImagePage = /** @class */ (function () {
    function ImagePage(navCtrl, router, modalCtrl, sanitizer, formBuilder, storage, zone, restProvider) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.zone = zone;
        this.restProvider = restProvider;
        this.checkUser = false;
        this.checkUser_payment = 0;
    }
    ImagePage.prototype.ngOnInit = function () {
        var _this = this;
        // this.video = this.sanitizer.bypassSecurityTrustStyle(this.value);
        this.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                _this.checkUser = true;
                _this.user_id = userObj.id;
                _this.checkUser_payment = userObj.user_type;
                _this.userInfo = userObj;
                console.log('userObj ::: ', userObj);
            }
            else {
                _this.checkUser = false;
            }
        });
        this.coachForm = this.formBuilder.group({
            'user_id': [null],
            'video_id': [null],
            'video_type': [null],
            'message': [null, Validators.compose([Validators.required])],
        });
    };
    ImagePage.prototype.selectApp = function (id) {
        // this.modalCtrl.dismiss();
        // let me= this;
        // me.restProvider.getSpotifyPlaylist(function(r:any){
        //   console.log('getSpotifyPlaylist:::',r);
        // });
        this.restProvider.present_Modal_selectApp('Select_App', id);
    };
    ImagePage.prototype.openSpotify = function (id) {
        var me = this;
        this.modalCtrl.dismiss();
        me.restProvider.getApp('Spotify', 'true');
        // this.modalCtrl.dismiss();
        // this.rauter.navigate(['albums']);
        me.restProvider.getSpotifyPlaylist(function (r) {
            console.log('getSpotifyPlaylist:::', r);
        });
        // this.restProvider.present_Modal_Album('Albums',id);
    };
    ImagePage.prototype.openitune = function (id) {
        var me = this;
        me.modalCtrl.dismiss();
        me.restProvider.getApp('Apple', 'true');
        var modalData = this.restProvider.getModalData();
        this.restProvider.present_Modal(modalData.data, modalData.heading, '');
    };
    ImagePage.prototype.openPlayer = function (data, id) {
        console.log('functionCall:::: ');
        // this.restProvider.present_Modal_Open_Player('Player',id, data);
        this.modalCtrl.dismiss();
        var modalData = this.restProvider.getModalData();
        this.restProvider.present_Modal(modalData.data, modalData.heading, '');
        // this.restProvider.getSpotifyPlaylistTracks(data.snapshot_id,res);
        // console.log('trackBegginingId::::', data.id);
        this.restProvider.getSpotifyPlaylistTracks(data.id, function (r) {
            console.log('getSpotifyTracks:::', r);
        });
    };
    ImagePage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ImagePage.prototype.ionViewWillEnter = function () {
        console.log('img ionViewWillEnter');
    };
    ImagePage.prototype.alertMessage = function () {
        // console.log('not log');
        var msg = 'Only Registered User Can Contact Us !!';
        this.restProvider.alert(msg);
        this.modalCtrl.dismiss();
        this.navCtrl.navigateRoot('/tabs/tab1');
    };
    ImagePage.prototype.openFullVideo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.restProvider.showLoader();
                this.restProvider.api_method('get', 'get_technique_detail/' + id, null, null).subscribe(function (data) {
                    console.log('get_technique_detail/', data);
                    if (data['status'] === 'success') {
                        _this.modalCtrl.dismiss();
                        _this.restProvider.dismissLoader();
                        _this.technique_dtl = data['technique'];
                        var navigationExtras_1 = {
                            state: {
                                data: _this.technique_dtl,
                                tab: 'technique',
                            }
                        };
                        _this.zone.run(function () {
                            _this.router.navigate(['full-video'], navigationExtras_1);
                        });
                    }
                    else {
                        _this.restProvider.alert('video not found');
                        _this.restProvider.dismissLoader();
                    }
                }, function (error) {
                    _this.restProvider.dismissLoader();
                    _this.restProvider.alert('oops something went wrong');
                    console.log('error', error);
                });
                return [2 /*return*/];
            });
        });
    };
    ImagePage.prototype.sendCoach = function (heading, id, user_id) {
        var _this = this;
        this.restProvider.showLoader();
        // this.coachForm.controls['user_id'].setValue(this.user_id);
        this.coachForm.controls['user_id'].setValue(user_id);
        this.coachForm.controls['video_id'].setValue(id);
        this.coachForm.controls['video_type'].setValue(heading);
        console.log(this.coachForm.value);
        this.restProvider.api_method('post', 'ask_a_question', this.coachForm.value, 'null').subscribe(function (data) {
            _this.restProvider.dismissLoader();
            _this.apiData = data;
            if (_this.apiData.status === 'error') {
                var msg = 'Oops Something Went Wong !!';
                _this.restProvider.alert(msg);
            }
            else if (_this.apiData.status === 'success') {
                console.log(_this.apiData.coach);
                _this.coachForm.reset();
                var msg = 'Message Sent Successfully !!!';
                _this.restProvider.alert(msg);
                _this.modalCtrl.dismiss();
            }
        }, function (error) {
            console.log(error);
            _this.restProvider.dismissLoader();
        });
    };
    ImagePage.prototype.openAskMessage = function (heading, id) {
        var _this = this;
        if (this.checkUser == true) {
            if (this.userInfo.hasSubscription > 0 && this.userInfo.isProfileCompleted > 0) {
                this.restProvider.present_Modal_coach(heading, id);
            }
            else {
                if (this.userInfo.hasSubscription == 0) {
                    var msg = ' Sorry! You did not subscribed any plan, Please subscribe any plan first';
                    this.restProvider.confirmationBox(msg);
                }
                else {
                    this.modalCtrl.dismiss();
                    this.zone.run(function () {
                        _this.router.navigate(['editprofile']);
                    });
                }
            }
        }
        else {
            var msg = 'Only Registered User Can Contact with Coach!!';
            this.restProvider.confirmationBox(msg);
        }
    };
    ImagePage.prototype.openVideo = function (heading, id, category) {
        var _this = this;
        var me = this;
        this.restProvider.showLoader();
        var tracks = this.restProvider.getSpofityTrackDetail();
        //console.log('id',id);
        console.log('track', tracks, category);
        if (tracks) {
            this.restProvider.api_method('get', 'get_workout_vids_detail/' + id, null, null).subscribe(function (data) {
                _this.restProvider.dismissLoader();
                console.log('get_workout_vids_detail', data);
                if (data['status'] == 'success') {
                    if (data['data'].length > 0) {
                        _this.modalCtrl.dismiss();
                        var navigationExtras_2 = {
                            state: {
                                warmup_id: id,
                                type: heading,
                                category: category
                            }
                        };
                        _this.zone.run(function () {
                            _this.router.navigate(['/play-video'], navigationExtras_2);
                        });
                    }
                    else {
                        var msg = 'No Video Found !!';
                        _this.restProvider.alert(msg);
                    }
                }
                else {
                    var msg = 'oops something went wrong!!';
                    _this.restProvider.alert(msg);
                }
            }, function (error) {
                console.log('error', error);
                _this.restProvider.dismissLoader();
            });
        }
        else {
            this.selectApp(null);
        }
    };
    ImagePage.prototype.redirectToPlan = function () {
        var _this = this;
        this.modalCtrl.dismiss();
        var scroll = 1;
        var navigationExtras = {
            skipLocationChange: true,
            queryParams: {
                moveToPlan: true,
            }
        };
        this.zone.run(function () {
            _this.router.navigate(['/tabs/tab1'], navigationExtras);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImagePage.prototype, "value", void 0);
    ImagePage = __decorate([
        Component({
            selector: 'app-image',
            templateUrl: './image.page.html',
            styleUrls: ['./image.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Router,
            ModalController,
            DomSanitizer,
            FormBuilder,
            Storage,
            NgZone,
            RestapiProvider])
    ], ImagePage);
    return ImagePage;
}());
export { ImagePage };
//# sourceMappingURL=image.page.js.map