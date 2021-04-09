import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild, Inject, NgZone, HostListener } from '@angular/core';
//import { HostListener } from "@angular/core";
//import { IonContent } from '@ionic/angular';
import { RestapiProvider } from '../providers/restapis/restapis';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events, IonContent, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { PaymentPage } from './../payment/payment.page';
//import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CloudProvider } from '../providers/cloud/cloud';
//import { ApplePay } from '@ionic-native/apple-pay/ngx';
var Tab1Page = /** @class */ (function () {
    // Constructor
    function Tab1Page(restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, zone, events, storage, modalController, router, route, http, cloud
    //private applePay: ApplePay
    ) {
        this.restProvider = restProvider;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.events = events;
        this.storage = storage;
        this.modalController = modalController;
        this.router = router;
        this.route = route;
        this.http = http;
        this.cloud = cloud;
        this.scroll = 0;
        this.plan_id = '';
        this.background_img = '../assets/images/warmup_cover.jpg';
        this.skeleton_show = true;
        this.skeletonCloud_show = false;
        this.getScreenSize();
    }
    Tab1Page.prototype.getScreenSize = function (event) {
        this.scrHeight = window.innerHeight - 120;
    };
    Tab1Page.prototype.checkSpotify = function () {
        var _this = this;
        this.restProvider.getDeezer().subscribe(function (data) {
            console.log('data/', data);
        }, function (error) {
            _this.restProvider.alert('oops something went wrong');
            console.log('error', error);
        });
        this.cloud.authDeezer();
        //   fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
        //         "method": "GET",
        //         "headers": {
        //         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        //         "x-rapidapi-key": "5eabcf8e8bmsh8c0ec2d249266c3p1e68c9jsn421a0ea26759"
        //   }
        // })
        // .then(data => {
        //   console.log(data);
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    };
    Tab1Page.prototype.checkApplePay = function () {
        var me = this; //Train of Thought Fitness
        var item = [{ label: '3 x Basket Items', amount: 4.99 }];
        /*me.restProvider.makePaymentByApplePay(item,'USD',function(status:any,message:any){
    
          me.restProvider.api_method('post','testRes',{status:status,res:JSON.stringify(message)},null).subscribe((data)=>{
              me.restProvider.alert(JSON.stringify(message));
          },error=>{
            me.restProvider.alert(JSON.stringify(message));
          });
        });*/
    };
    Tab1Page.prototype.doRefresh = function (event) {
        this.warmup_data();
        setTimeout(function () {
            event.target.complete();
        }, 3000);
    };
    Tab1Page.prototype.ngOnInit = function () {
        this.checkUser();
    };
    Tab1Page.prototype.checkUser = function () {
        var me = this;
        console.log('checkUser');
        //me.restProvider.showLoader();
        me.storage.get('Id').then(function (userID) {
            if (!userID) {
                me.updateConfig();
                //me.isGuestUser();
            }
            else {
                me.restProvider.api_method('get', 'checkUserConfig/' + userID, null, null).subscribe(function (data) {
                    //me.restProvider.dismissLoader();
                    me.apiResult = data;
                    if (me.apiResult['status'] === 'success') {
                        me.userInfo = me.apiResult.success;
                        me.storage.set('Id', me.apiResult.success.id);
                        me.storage.set('USER_Id', me.apiResult.success.id);
                        me.storage.set('Name', me.apiResult.success.name);
                        me.storage.set('Email', me.apiResult.success.email);
                        me.storage.set('USERPROFILE', me.apiResult.success);
                        me.restProvider.setUserInfo(me.userInfo);
                    }
                    else {
                        me.updateConfig();
                    }
                    //me.isGuestUser();
                    //console.log('checkUserConfig/',me.apiResult);
                }, function (error) {
                    //me.restProvider.dismissLoader();
                    me.updateConfig();
                    //me.isGuestUser();
                });
            }
        });
    };
    Tab1Page.prototype.ionViewWillEnter = function () {
        var me = this;
        me.userInfo = me.restProvider.getUserInfo();
        console.log('ionViewWillEnter', me.userInfo);
        if (typeof me.userInfo === 'undefined') {
            me.checkUser();
        }
        me.warmup_data();
        me.isGuestUser();
    };
    Tab1Page.prototype.isGuestUser = function () {
        var me = this;
        setTimeout(function () {
            me.storage.get('ShowGuestMsg').then(function (ShowGuestMsg) {
                if (ShowGuestMsg) {
                    me.storage.remove('ShowGuestMsg').then(function () {
                        me.showGuestMsg();
                    });
                }
            });
        }, 500);
    };
    Tab1Page.prototype.warmup_data = function () {
        var _this = this;
        // this.restProvider.showLoader();
        var me = this;
        this.restProvider.api_method('get', 'warmup', null, null).subscribe(function (data) {
            _this.mydata = data;
            if (data['message'] === 'success') {
                _this.warmupdata = data['warmup'];
                _this.aboutdata = data['about'];
                _this.plansdata = data['plan'];
                _this.freePlan = data['free_trail'];
                _this.warmupMainScreen = data['warmup_screen'];
                // console.log(this.warmupdata);
            }
            else if (data['message'] === 'error') {
                _this.warmupdata = '';
                _this.aboutdata = '';
                _this.plansdata = '';
                _this.mydata = '';
                _this.freePlan = false;
                _this.warmupMainScreen = false;
            }
            // Start : move scroll to plan section when it will come from another page
            setTimeout(function () {
                me.route.queryParams.subscribe(function (params) {
                    //console.log('this.queryParams',params);
                    if (params["moveToPlan"] && params["moveToPlan"] == 'true') {
                        me.ScrollToBottom();
                    }
                });
            }, 500);
            // End : move scroll to plan section when it will come from another page
        }, function (error) {
            console.log('error', error);
            _this.set_timer();
            // this.restProvider.dismissLoader();
        });
    };
    Tab1Page.prototype.showGuestMsg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        me = this;
                        if (me.meGuest)
                            return [2 /*return*/];
                        _a = me;
                        return [4 /*yield*/, me.alertCtrl.create({
                                header: 'Complete Your Profile',
                                message: "Thanks for joining us, please complete your profile so you can get access all feature's",
                                buttons: [
                                    {
                                        text: "I'll do it later",
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            me.meGuest = null;
                                        }
                                    }, {
                                        text: "Let's do it now",
                                        handler: function () {
                                            me.meGuest = null;
                                            me.zone.run(function () { me.navCtrl.navigateRoot('/editprofile'); });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        _a.meGuest = _b.sent();
                        return [4 /*yield*/, me.meGuest.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.showSubscribeMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        return [4 /*yield*/, me.alertCtrl.create({
                                header: 'Congratulation',
                                message: "Thanks for joining us, your subscribed plan is activated from now",
                                buttons: [
                                    {
                                        text: "got it!",
                                        handler: function () {
                                            me.zone.run(function () { me.navCtrl.navigateRoot('paymenthistory'); });
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
    Tab1Page.prototype.set_timer = function () {
        var me = this;
        setTimeout(function () {
            console.log('10 sec');
            me.skeleton();
            me.resCall();
        }, 7000);
    };
    Tab1Page.prototype.resCall = function () {
        var me = this;
        setTimeout(function () {
            me.warmup_data();
        }, 2000);
    };
    Tab1Page.prototype.skeleton = function () {
        this.skeleton_show = false;
        this.skeletonCloud_show = true;
    };
    Tab1Page.prototype.ScrollToBottom = function () {
        //this.scroll=0;
        //this.content.scrollToBottom(1500);
        var me = this;
        var yOffset = 0;
        if (document.getElementById('cardAbout')) {
            yOffset = document.getElementById('cardAbout').offsetTop;
        }
        this.scroll = yOffset;
        this.content.scrollToPoint(0, yOffset, 1800);
        //cardAbout
        console.log('this.scroll', this.scroll);
        this.moveToPlan = null;
    };
    Tab1Page.prototype.alert = function () {
        var msg = 'Already subscribed';
        this.restProvider.alert(msg);
    };
    Tab1Page.prototype.onScroll = function (event) {
        var yOffset = 0;
        var scrollTop = event.detail.scrollTop;
        if (document.getElementById('cardAbout')) {
            yOffset = document.getElementById('cardAbout').offsetTop;
        }
        var getTens = function (num, m) {
            if (m === void 0) { m = 0; }
            if (num > 0) {
                var placeValue = 1;
                var numStr = num.toString(10).split("");
                for (var i = 0; i < (numStr.length - 1); i++)
                    placeValue *= 10;
                num = parseInt(numStr[0]) * placeValue;
                if (m > 0)
                    num = num - placeValue;
            }
            return num;
        };
        if (getTens(scrollTop, 0) > getTens(yOffset, 1)) {
            this.scroll = yOffset;
        }
        else {
            this.scroll = 0;
        }
        //console.log(scrollTop,"logScroll : ",getTens(scrollTop,0),":::",this.scroll,':scroll:',getTens(yOffset,1));
    };
    Tab1Page.prototype.applySubscribePlan = function (objData) {
        return __awaiter(this, void 0, void 0, function () {
            var me, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        console.log('applySubscribePlan:::', objData);
                        return [4 /*yield*/, me.modalController.create({
                                component: PaymentPage,
                                componentProps: objData
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Tab1Page.prototype.applyFreeSubscriptionPlan = function (objData) {
        var me = this;
        if (typeof objData === 'undefined' || typeof objData.planType === 'undefined') {
            me.restProvider.alert('Sorry! Unable to find selected plan');
            return;
        }
        var postObj = {
            user_id: objData.userID,
            plan_id: objData.planType,
            transaction_id: 'Free-Plan-' + Math.random() * 100000000000000000,
            amount: 0,
            payment_mode: 'FREE-PLAN-SUBSCRIPTION',
            currency: 'USD'
        };
        console.log('plan_id', objData.planType);
        console.log('user_id', objData.userID);
        me.restProvider.showLoader();
        me.restProvider.api_method('post', 'buyPlan', postObj, null).subscribe(function (data) {
            me.restProvider.dismissLoader();
            me.apiResult = data;
            if (me.apiResult['status'] === 'success') {
                //me.zone.run(() => { me.navCtrl.navigateRoot('paymenthistory');});
                me.showSubscribeMessage();
            }
            else {
                me.restProvider.alert(me.apiResult['message']);
            }
        }, function (error) {
            console.log('error', error);
            me.restProvider.dismissLoader();
            me.restProvider.alert('Sorry! Unable to process your request');
        });
    };
    Tab1Page.prototype.checkSubscribePlan = function (objData) {
        var me = this;
        if (typeof objData === 'undefined' || typeof objData.planType === 'undefined') {
            me.restProvider.alert('Sorry! Unable to find selected plan');
            return;
        }
        me.restProvider.showLoader();
        me.restProvider.api_method('get', 'get_plan_detail/' + objData['planType'], null, null).subscribe(function (data) {
            me.restProvider.dismissLoader();
            //console.log('get_plan_detail:::',data);
            if (data['status'] === 'success') {
                objData['planDetail'] = data['plan'];
                me.applySubscribePlan(objData);
            }
            else {
                me.restProvider.alert('Sorry! Unable to find selected plan');
            }
        }, function (error) {
            me.restProvider.dismissLoader();
            me.restProvider.alert('Sorry! Unable to find selected plan');
        });
    };
    Tab1Page.prototype.askForCompleteProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, confirm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        return [4 /*yield*/, me.alertCtrl.create({
                                header: 'Subscribe Plan',
                                message: "Please Complete your profile detail first, would you like to complete your profile now?",
                                buttons: [
                                    {
                                        text: "I'll do it later",
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: "Let's do it now",
                                        handler: function () {
                                            me.zone.run(function () { me.navCtrl.navigateRoot('/editprofile'); });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        confirm = _a.sent();
                        return [4 /*yield*/, confirm.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.subscribePlan = function (id) {
        var me = this;
        me.storage.get('USERPROFILE').then(function (userObj) {
            console.log('USERPROFILE', userObj);
            if (userObj && userObj.id > 0) {
                if (userObj.isProfileCompleted > 0) {
                    if (id == 'FREE') {
                        me.applyFreeSubscriptionPlan({ userID: userObj.id, planType: id });
                    }
                    else {
                        me.checkSubscribePlan({ userID: userObj.id, planType: id });
                    }
                }
                else {
                    me.askForCompleteProfile();
                }
            }
            else {
                me.restProvider.alert('Sorry! Unable to find selected plan');
            }
        });
    };
    Tab1Page.prototype.updateConfig = function () {
        var me = this;
        me.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                userObj['plan_id'] = 0;
                userObj['isFeatureEnabled'] = 0;
                me.storage.set('USERPROFILE', userObj);
                me.restProvider.setUserInfo(userObj);
            }
        });
    };
    Tab1Page.prototype.presentModal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // console.log(id);
                this.restProvider.showLoader();
                this.restProvider.api_method('get', 'get_warmup_detail/' + id, null, null).subscribe(function (data) {
                    console.log(data);
                    if (data['status'] === 'success') {
                        _this.restProvider.dismissLoader();
                        _this.warmup_dtl = data['warmup'];
                        var heading = 'Warmup';
                        _this.restProvider.present_Modal(_this.warmup_dtl, heading, null);
                    }
                    else if (data['status'] === 'error') {
                        _this.restProvider.dismissLoader();
                    }
                }, function (error) {
                    _this.restProvider.dismissLoader();
                    console.log('error', error);
                });
                return [2 /*return*/];
            });
        });
    };
    Tab1Page.prototype.presentVideo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // console.log(id);
                this.restProvider.showLoader();
                this.restProvider.api_method('get', 'get_warmup_detail/' + id, null, null).subscribe(function (data) {
                    console.log(data);
                    if (data['status'] === 'success') {
                        _this.restProvider.dismissLoader();
                        var navigationExtras_1 = {
                            state: {
                                data: data['warmup']
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
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], Tab1Page.prototype, "document", void 0);
    __decorate([
        ViewChild(IonContent, null),
        __metadata("design:type", IonContent)
    ], Tab1Page.prototype, "content", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Tab1Page.prototype, "getScreenSize", null);
    Tab1Page = __decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        __metadata("design:paramtypes", [RestapiProvider,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder,
            NgZone,
            Events,
            Storage,
            ModalController,
            Router,
            ActivatedRoute,
            HttpClient,
            CloudProvider
            //private applePay: ApplePay
        ])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map