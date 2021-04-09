import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone, Inject } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password';
import { RestapiProvider } from '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { DOCUMENT } from '@angular/common';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, events, storage, formBuilder, googlePlus, zone, fb) {
        this.restProvider = restProvider;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.googlePlus = googlePlus;
        this.zone = zone;
        this.fb = fb;
        this.show_dialog = true;
        this.show_verify = false;
        this.show_women_status = false;
        this.guestUserDtl = [];
        this.cssOptions = {
            cssClass: 'select-box-class'
        };
    }
    RegisterPage.prototype.ionViewWillEnter = function () {
        this.applyOnSel();
        this.ngOnInit();
    };
    RegisterPage.prototype.applyOnSel = function () {
        try {
            // document.querySelector('#guest_weight_unit').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
            setTimeout(function () {
                var selWeightEl = document.getElementById('weight_unit');
                if (selWeightEl && selWeightEl != null && typeof selWeightEl !== 'undefined' && selWeightEl.shadowRoot.querySelector('button')) {
                    selWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
                var selTargetWeightEl = document.getElementById('target_weight_unit');
                if (selTargetWeightEl && selTargetWeightEl != null && typeof selTargetWeightEl !== 'undefined' && selTargetWeightEl.shadowRoot.querySelector('button')) {
                    selTargetWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
                var selHeightUnitFeetEl = document.getElementById('height_unit-feet');
                if (selHeightUnitFeetEl && selHeightUnitFeetEl != null && typeof selHeightUnitFeetEl !== 'undefined' && selHeightUnitFeetEl.shadowRoot.querySelector('button')) {
                    selHeightUnitFeetEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
                var selHeightUnitInchEl = document.getElementById('height_unit');
                if (selHeightUnitInchEl && selHeightUnitInchEl != null && typeof selHeightUnitInchEl !== 'undefined' && selHeightUnitInchEl.shadowRoot.querySelector('button')) {
                    selHeightUnitInchEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
                /*let width70=document.getElementsByClassName('with70');
                if(width70 && width70!=null && typeof width70 !=='undefined' && width70.length>0){
        
                  for(let k in width70){
                    if (typeof width70[k].setAttribute === "function") {
                      width70[k].setAttribute('style', 'max-width:70%!important;');
                    }
                  }
        
                }*/
            }, 500);
        }
        catch (e) {
            console.log("applyOnSel", e);
        }
    };
    RegisterPage.prototype.ngOnInit = function () {
        this.onRegisterForm = this.formBuilder.group({
            'name': [null, Validators.compose([Validators.required])],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ])],
            'age': [null, Validators.compose([Validators.required])],
            'mobile': [null],
            'height': [null],
            'height_feet': ["5"],
            'height_inches': ["4"],
            'body_height': [null],
            'body_weight': [null, Validators.compose([Validators.required])],
            'targeted_weight': [null, Validators.compose([Validators.required])],
            'gender': [null, Validators.compose([Validators.required])],
            'interested_in': [null, Validators.compose([Validators.required])],
            'women_status': [null,],
            'fitness_level': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(6)])],
            'password_confirmation': [null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(6)])],
            'device_token': [null],
            'device_type': [null],
            'weight_unit': ['KG'],
            'target_weight_unit': ['KG'],
            'height_unit': ['CM']
        }, { validator: passwordValidator.MatchPassword });
        this.onVerify = this.formBuilder.group({
            'otp': [null, Validators.compose([Validators.required])],
            'email': [null],
        });
    };
    RegisterPage.prototype.reset = function () {
        this.onRegisterForm.reset();
    };
    RegisterPage.prototype.IsNumeric = function (e, dig) {
        var _dig = dig - 1;
        // console.log(_dig,dig);
        var specialKeys = new Array();
        // console.log(e);
        var myval = e.target.value;
        // console.log(myval.length,myval);
        specialKeys.push(8);
        var keyl = myval.length;
        var keyCode = e.which ? e.which : e.keyCode;
        //let ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        var ret = (keyl <= _dig);
        // document.getElementById("error").style.display = ret ? "none" : "inline";
        return ret;
    };
    RegisterPage.prototype.signUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, formObj, error, matchStatus1, matchStatus2, f, fi, device_1;
            return __generator(this, function (_a) {
                me = this;
                formObj = this.onRegisterForm.value;
                error = [];
                matchStatus1 = true;
                matchStatus2 = true;
                if (formObj['age'] == null || formObj['age'] == '' || formObj['age'] < 10 || formObj['age'] > 100) {
                    error.push('Age should be between 10-100');
                }
                if (formObj['body_weight'] == null || formObj['body_weight'] == '' || formObj['body_weight'] < 25) {
                    error.push('Weight should be greaterthen 25');
                }
                if (formObj['fitness_level'] == null || formObj['fitness_level'] == '') {
                    error.push('Fitness Level is required');
                }
                if (formObj['name'] == null || formObj['name'] == '') {
                    error.push('Name is required');
                }
                if (formObj['gender'] == null || formObj['gender'] == '') {
                    error.push('Gender is required');
                }
                if (formObj['email'] == null || formObj['email'] == '' || me.onRegisterForm.get('email').hasError('pattern')) {
                    error.push('Invalid E-Mail ID');
                }
                /*if(formObj['height_feet']==null || formObj['height_feet']=='' || parseInt(formObj['height_feet'])<1){
                  error.push('height feet is required');
                }
                if(formObj['height_inches']==null || formObj['height_inches']=='' || parseInt(formObj['height_inches'])<1){
                  error.push('height inch is required');
                }*/
                if (formObj['height_unit'] == 'FEET') {
                    f = formObj['height_feet'];
                    fi = formObj['height_inches'];
                    if (formObj['height_feet'] == null || formObj['height_feet'] == '') {
                        f = 3;
                    }
                    if (formObj['height_inches'] == null || formObj['height_inches'] == '') {
                        fi = 0;
                    }
                    formObj['body_height'] = [f, fi].join('.');
                }
                if (formObj['body_height'] == null || formObj['body_height'] == '' || parseInt(formObj['body_height']) < 1) {
                    error.push('height is required');
                }
                if (formObj['targeted_weight'] == null || formObj['targeted_weight'] == '' || formObj['targeted_weight'] < 1) {
                    error.push('targeted weight is required');
                }
                if (formObj['interested_in'] == null || formObj['interested_in'] == '') {
                    error.push('Goals is required');
                }
                if (formObj['password'] == null || formObj['password'] == '' || me.onRegisterForm.get('password').hasError('minlength')) {
                    error.push('password is required and atleast 6 chatacters');
                    matchStatus1 = false;
                }
                if (formObj['password_confirmation'] == null || formObj['password_confirmation'] == '' || me.onRegisterForm.get('password_confirmation').hasError('minlength')) {
                    error.push('confirm password is required and atleast 6 chatacters');
                    matchStatus2 = false;
                }
                if (matchStatus1 == true && matchStatus2 == true && (formObj['password_confirmation'] != formObj['password'])) {
                    error.push('confirm password and password does not match');
                }
                if (formObj['interested_in'] == "lose weight") {
                    if (parseInt(formObj['body_weight']) < parseInt(formObj['targeted_weight'])) {
                        error.push('target weight should be lessthen body weight');
                    }
                }
                if (formObj['interested_in'] == "gain muscle") {
                    if (parseInt(formObj['targeted_weight']) < parseInt(formObj['body_weight'])) {
                        error.push('target weight should be greaterthen body weight');
                    }
                }
                if (formObj['weight_unit'] == null || formObj['weight_unit'] == '') {
                    formObj['weight_unit'] = 'KG';
                }
                if (formObj['target_weight_unit'] == null || formObj['target_weight_unit'] == '') {
                    formObj['target_weight_unit'] = 'KG';
                }
                //console.log(error,'formObj interested_in',formObj);
                //return ;
                if (error.length > 0) {
                    console.log('Error', error);
                    me.restProvider.alert(error.join('<br>'));
                }
                else {
                    console.log('GO to Submit', formObj);
                    device_1 = me.restProvider.getDeviceInfo();
                    formObj['device_type'] = device_1['device_type'];
                    formObj['device_token'] = device_1['device_token'];
                    formObj['RequestType'] = 'Registration';
                    me.restProvider.showLoader();
                    me.restProvider.api_method('post', 'register', formObj, 'null').subscribe(function (data) {
                        me.restProvider.dismissLoader();
                        me.apiData = data;
                        console.log('register response', me.apiData);
                        if (me.apiData.status === 'success') {
                            me.storage.set('USER_Id', me.apiData.success.id);
                            me.storage.set('Name', me.apiData.success.name);
                            me.storage.set('Email', me.apiData.success.email);
                            me.storage.set('USERPROFILE', me.apiData.success);
                            me.storage.set('Id', me.apiData.success.id).then(function () {
                                if (me.apiData.success.email == '' || me.apiData.success.email == null || me.apiData.success.email == 'NULL') {
                                    me.zone.run(function () { me.navCtrl.navigateRoot('/editprofile'); });
                                }
                                else {
                                    me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab1'); });
                                }
                            });
                        }
                        else {
                            me.restProvider.alert(me.apiData.message);
                        }
                    }, function (error) {
                        me.restProvider.dismissLoader();
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.Verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.onVerify.controls['email'].setValue(this.apiData.success.email);
                console.log(this.onVerify.value);
                this.restProvider.showLoader();
                this.restProvider.api_method('post', 'verifyOtp', this.onVerify.value, 'null').subscribe(function (data) {
                    _this.restProvider.dismissLoader();
                    _this.apiData = data;
                    if (_this.apiData.error === 'Otp not correct') {
                        // this.presentAlert();
                        var msg = 'Otp not correct';
                        _this.restProvider.alert(msg);
                    }
                    else if (_this.apiData.message === 'otp is correct') {
                        // console.log(this.apiData.success);
                        _this.storage.set('Id', _this.apiData.success.id);
                        _this.storage.set('Name', _this.apiData.success.name);
                        _this.storage.set('Email', _this.apiData.success.email);
                        _this.storage.set('USERPROFILE', _this.apiData.success);
                        _this.storage.get('USERPROFILE').then(function (userObj) {
                            if (userObj) {
                                console.log('obj_rg', userObj);
                            }
                        });
                        var msg = 'Registered Successfully';
                        _this.restProvider.alert(msg);
                        _this.navCtrl.navigateRoot('/editprofile');
                    }
                }, function (error) {
                    console.log(error);
                    _this.restProvider.dismissLoader();
                });
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.goToLogin = function () {
        this.navCtrl.navigateRoot('/login');
    };
    RegisterPage.prototype.doGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, device;
            return __generator(this, function (_a) {
                me = this;
                me.socilaForm = me.formBuilder.group({
                    'email': [null],
                    'name': [null],
                    'social_id': [null],
                    'device_token': [null],
                    'device_type': [null],
                });
                device = me.restProvider.getDeviceInfo();
                me.restProvider.showLoader();
                this.googlePlus.login({}).then(function (res) {
                    console.log('googlePlus success :::', res);
                    me.socilaForm.patchValue({
                        email: res.email,
                        name: res.displayName,
                        social_id: res.userId,
                        device_type: device['device_type'],
                        device_token: device['device_token'],
                    });
                    me.restProvider.api_method('post', 'social_login', me.socilaForm.value, 'null').subscribe(function (data) {
                        me.restProvider.dismissLoader();
                        me.apiData = data;
                        if (me.apiData.status === 'success') {
                            me.storage.set('Id', me.apiData.data.id);
                            me.storage.set('USER_Id', me.apiData.data.id);
                            me.storage.set('Name', me.apiData.data.name);
                            me.storage.set('Email', me.apiData.data.email);
                            me.storage.set('USERPROFILE', me.apiData.data);
                            me.restProvider.alert('Login Successfully !!');
                            if (me.apiData.data.email == '' || me.apiData.data.email == 'null' || me.apiData.data.email == 'NULL') {
                                me.zone.run(function () { me.navCtrl.navigateRoot('/editprofile'); });
                            }
                            else {
                                me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab1'); });
                            }
                        }
                        else {
                            me.restProvider.alert(me.apiData.message);
                        }
                    }, function (error) {
                        me.restProvider.dismissLoader();
                        me.restProvider.alert('Sorry! unable to process your request');
                    });
                }).catch(function (err) {
                    me.restProvider.dismissLoader();
                    console.log('googlePlus catch ::', err);
                    me.restProvider.alert('Sorry! unable to process your request');
                });
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.showWomenStatus = function ($event) {
        var gender = $event.target.value;
        // console.log('ws',$event.target.value);
        if (gender == 'female') {
            this.show_women_status = true;
        }
        else {
            this.show_women_status = false;
        }
    };
    RegisterPage.prototype.facebookLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            var _this = this;
            return __generator(this, function (_a) {
                me = this;
                me.facebookForm = me.formBuilder.group({
                    'social_id': [null],
                    'name': [null],
                    'email': [null],
                    'device_token': [null],
                    'device_type': [null],
                });
                me.restProvider.showLoader();
                me.fb.login(['public_profile', 'email']).then(function (res) {
                    console.log('Logged into Facebook!', res);
                    me.restProvider.dismissLoader();
                    if (res.status == "connected" && res.authResponse.userID != "") {
                        var fb_id_1 = res.authResponse.userID;
                        var fb_token = res.authResponse.accessToken;
                        var faceBookAuth_1 = function () {
                            me.restProvider.api_method('post', 'social_login', me.facebookForm.value, 'null').subscribe(function (data) {
                                me.restProvider.dismissLoader();
                                me.apiData = data;
                                if (me.apiData.status === 'success') {
                                    me.storage.set('Id', me.apiData.data.id);
                                    me.storage.set('USER_Id', me.apiData.data.id);
                                    me.storage.set('Name', me.apiData.data.name);
                                    me.storage.set('Email', me.apiData.data.email);
                                    me.storage.set('USERPROFILE', me.apiData.data);
                                    me.restProvider.alert('Login Successfully !!');
                                    if (me.apiData.data.email == '' || me.apiData.data.email == 'null' || me.apiData.data.email == 'NULL') {
                                        me.zone.run(function () { me.navCtrl.navigateRoot('/editprofile'); });
                                    }
                                    else {
                                        me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab1'); });
                                    }
                                }
                                else {
                                    me.restProvider.alert(me.apiData.message);
                                }
                            }, function (error) {
                                me.restProvider.dismissLoader();
                                me.restProvider.alert('Sorry! unable to process your request');
                            });
                        };
                        var device_2 = me.restProvider.getDeviceInfo();
                        me.restProvider.showLoader();
                        _this.fb.api("/me?fields=name,gender,email", []).then(function (user) {
                            me.facebookForm.patchValue({
                                social_id: fb_id_1,
                                name: (user && typeof user.name !== 'undefined') ? user.name : '',
                                email: (user && typeof user.email !== 'undefined') ? user.email : '',
                                device_type: device_2['device_type'],
                                device_token: device_2['device_token'],
                            });
                            faceBookAuth_1();
                        }).catch(function (errFB) {
                            me.facebookForm.patchValue({
                                social_id: fb_id_1,
                                name: '',
                                email: '',
                                device_type: device_2['device_type'],
                                device_token: device_2['device_token'],
                            });
                            faceBookAuth_1();
                        });
                    }
                    else {
                        me.restProvider.alert('Sorry! unable to process your request');
                    }
                }).catch(function (err) {
                    me.restProvider.dismissLoader();
                    console.log('FB catch ::', err);
                    me.restProvider.alert('Sorry! unable to process your request');
                });
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.backToHome = function () {
        var _this = this;
        this.zone.run(function () {
            _this.navCtrl.navigateRoot('/tabs/tab1');
        });
    };
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], RegisterPage.prototype, "document", void 0);
    RegisterPage = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        __metadata("design:paramtypes", [RestapiProvider,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            Events,
            Storage,
            FormBuilder,
            GooglePlus,
            NgZone,
            Facebook])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map