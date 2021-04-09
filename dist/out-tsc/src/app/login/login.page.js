import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, NgZone, Inject } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password';
import { RestapiProvider } from '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { environment } from '../../environments/environment';
var appID = environment.appID;
var apiKey = environment.apiKey;
import { DOCUMENT } from '@angular/common';
var LoginPage = /** @class */ (function () {
    function LoginPage(restProvider, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder, events, storage, googlePlus, zone, fb) {
        this.restProvider = restProvider;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.events = events;
        this.storage = storage;
        this.googlePlus = googlePlus;
        this.zone = zone;
        this.fb = fb;
        this.show_dialog = true;
        this.show_verify = false;
        this.show_reset = false;
        this.user_login = true;
        this.guest_user = false;
        this.skip = false;
        this.pageTitle = "Login";
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.ngOnInit();
    };
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.onLoginForm = this.formBuilder.group({
            'email': [null, Validators.compose([
                    Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ])],
            'password': [null, Validators.compose([Validators.required])],
        });
        this.guestForm = this.formBuilder.group({
            'age': [null, Validators.compose([Validators.required])],
            'body_weight': [null, Validators.compose([Validators.required])],
            'gender': [null, Validators.compose([Validators.required])],
            'weight_unit': ['KG'],
            'fitness_level': [null, Validators.compose([Validators.required])],
        });
        this.onVerify = this.formBuilder.group({
            'otp': [null, Validators.compose([
                    Validators.required
                ])],
            'email': [null],
        });
        this.onResetForm = this.formBuilder.group({
            'user_id': [null],
            'password': [null, Validators.compose([
                    Validators.required, Validators.maxLength(30), Validators.minLength(6)
                ])],
            'password_confirmation': [null, Validators.compose([
                    Validators.required, Validators.maxLength(30), Validators.minLength(6)
                ])]
        }, {
            validator: passwordValidator.MatchPassword // Inject the provider method
        });
        this.storage.get('GUESTPROFILE').then(function (userObj) {
            if (userObj) {
                _this.skip = false;
            }
            else {
                _this.skip = true;
            }
        });
    };
    LoginPage.prototype.reset = function () {
        this.onLoginForm.reset();
    };
    LoginPage.prototype.reset_guest_from = function () {
        this.guestForm.reset();
        this.guestForm.controls['weight_unit'].setValue('KG');
    };
    LoginPage.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, error;
            return __generator(this, function (_a) {
                me = this;
                error = [];
                me.clear_guest_user();
                if (this.onLoginForm.value['email'] == "" || this.onLoginForm.value['email'] == null) {
                    error.push('Please Enter Valid Email Address');
                }
                if (this.onLoginForm.value['password'] == "" || this.onLoginForm.value['password'] == null) {
                    error.push('Please Enter Password');
                }
                if (error.length > 0) {
                    me.restProvider.alert(error.join('<br>'));
                    return [2 /*return*/, true];
                }
                me.restProvider.showLoader();
                me.restProvider.api_method('post', 'login', this.onLoginForm.value, 'null').subscribe(function (data) {
                    me.restProvider.dismissLoader();
                    me.apiData = data;
                    if (me.apiData.status === 'success') {
                        var msg = 'Login successfully';
                        me.storage.set('Id', me.apiData.success.id);
                        me.storage.set('USER_Id', me.apiData.success.id);
                        me.storage.set('Name', me.apiData.success.name);
                        me.storage.set('Email', me.apiData.success.email);
                        me.storage.set('USERPROFILE', me.apiData.success);
                        if (me.apiData.success.type == 'coach') {
                            me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab5/chat-list'); });
                            me.restProvider.alert(msg);
                        }
                        else {
                            me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab1'); });
                            me.restProvider.alert(msg);
                        }
                    }
                    else {
                        var msg = me.apiData && me.apiData.message ? me.apiData.message : 'credential does not match !!';
                        me.restProvider.alert(msg);
                    }
                }, function (error) {
                    console.log('login ERROR:', error);
                    me.restProvider.dismissLoader();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.forgotPass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Forgot Password?',
                            message: 'Enter you email address to send a reset link password.',
                            inputs: [
                                {
                                    name: 'email',
                                    type: 'email',
                                    placeholder: 'Email'
                                }
                            ],
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
                                    handler: function (data) {
                                        _this.forgetPassword(data);
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
    LoginPage.prototype.forgetPassword = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.clear_guest_user();
                //show loader
                this.restProvider.showLoader();
                //send data to server
                this.restProvider.api_method('post', 'forgetPassword', userData, 'null').subscribe(function (data) {
                    _this.apiData = data;
                    console.log(_this.apiData.data);
                    //check credential is valid or not
                    if (_this.apiData.status === 'error') {
                        _this.restProvider.dismissLoader();
                        _this.restProvider.alert(_this.apiData.message);
                    }
                    else {
                        //hide loader
                        _this.pageTitle = "Reset Password";
                        _this.show_dialog = false;
                        _this.show_verify = true;
                        _this.restProvider.dismissLoader();
                        localStorage.setItem("verify_email", _this.apiData.data.email);
                        localStorage.setItem("verify_id", _this.apiData.data.email);
                        var msg = 'A One Time Passcode has been sent to your Email Address. Please enter the OTP to verify your Email Address.if you cannot see the email in your inbox, make sure to check your SPAM folder.';
                        _this.restProvider.alert(msg);
                        _this.apiData = data;
                        console.log(_this.apiData);
                    }
                }, function (error) {
                    console.log(error);
                    _this.restProvider.dismissLoader();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.Verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.clear_guest_user();
                this.email = localStorage.getItem("verify_email");
                this.id = localStorage.getItem("verify_id");
                console.log('', this.email);
                this.onVerify.controls['email'].setValue(this.email);
                console.log(this.onVerify.value);
                this.restProvider.showLoader();
                this.restProvider.api_method('post', 'verify_password_otp', this.onVerify.value, 'null').subscribe(function (data) {
                    _this.restProvider.dismissLoader();
                    _this.apiData = data;
                    if (_this.apiData.error === 'Otp not correct') {
                        // this.presentAlert();
                        var msg = 'Invalid OTP! Please enter valid OTP';
                        _this.restProvider.alert(msg);
                    }
                    else if (_this.apiData.message === 'otp is correct') {
                        localStorage.setItem("verify_email", _this.apiData.success.email);
                        localStorage.setItem("verify_id", _this.apiData.success.id);
                        //console.log(this.apiData.success);
                        /* this.storage.set('USER_Id', this.apiData.success.id);
                       this.storage.set('Name', this.apiData.success.name);
                       this.storage.set('Email', this.apiData.success.email);
                       this.storage.set('USERPROFILE', this.apiData.success);*/
                        var msg = 'OTP verified successfully';
                        _this.restProvider.alert(msg);
                        _this.show_verify = false;
                        _this.show_reset = true;
                        // this.navCtrl.navigateRoot('/tabs/tab1');
                    }
                }, function (error) {
                    console.log(error);
                    _this.restProvider.dismissLoader();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.resetPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, error;
            return __generator(this, function (_a) {
                me = this;
                me.clear_guest_user();
                this.id = localStorage.getItem("verify_id");
                this.onResetForm.controls['user_id'].setValue(this.id);
                console.log('onResetForm', this.onResetForm.value);
                error = [];
                if (this.onResetForm.value['password'] == "" || this.onResetForm.value['password'] == null) {
                    error.push('Please Enter New Password');
                }
                if (this.onResetForm.value['password_confirmation'] == "" || this.onResetForm.value['password_confirmation'] == null) {
                    error.push('Please Enter Confirmation Password');
                }
                if (this.onResetForm.value['password_confirmation'] !== this.onResetForm.value['password']) {
                    error.push('Confirmation Password and New Password does not match');
                }
                if (error.length > 0) {
                    me.restProvider.alert(error.join('<br>'));
                    return [2 /*return*/, true];
                }
                this.restProvider.showLoader();
                this.restProvider.api_method('post', 'reset_paasword', this.onResetForm.value, 'null').subscribe(function (data) {
                    me.restProvider.dismissLoader();
                    me.apiData = data;
                    if (me.apiData.status === 'success') {
                        me.storage.set('Id', me.apiData.data.id);
                        me.storage.set('USER_Id', me.apiData.data.id);
                        me.storage.set('Name', me.apiData.data.name);
                        me.storage.set('Email', me.apiData.data.email);
                        me.storage.set('USERPROFILE', me.apiData.data);
                        me.restProvider.alert('Password Verify Successfully!!');
                        me.show_verify = false;
                        me.show_reset = true;
                        if (me.apiData.data.type == 'coach') {
                            me.zone.run(function () {
                                me.navCtrl.navigateRoot('/tabs/tab5/chat-list');
                            });
                        }
                        else {
                            me.zone.run(function () {
                                me.navCtrl.navigateRoot('/tabs/tab1');
                            });
                        }
                    }
                    else {
                        me.restProvider.alert('Invalid OTP');
                    }
                }, function (error) {
                    console.log('reset_paasword ERROR:', error);
                    me.restProvider.dismissLoader();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.cometChatLogin = function (name, id) {
        var _this = this;
        this.restProvider.api_method('get', 'cometChatCreateUser/' + name + '/' + id, null, null).subscribe(function (data) {
            if (data['status'] === 'success') {
                console.log('create user cometchat Message:', data['message']);
                var UID = id;
                // this.restProvider.logoutCometChat();
                _this.restProvider.loginComChat(UID);
                _this.zone.run(function () {
                    _this.navCtrl.navigateRoot('/tabs/tab1');
                });
            }
            else if (data['status'] === 'error') {
                console.log('create user cometchat error:', data['status']);
            }
        }, function (error) {
            // let $msg='server error:'+error;
            // this.restProvider.alert($msg);
            console.log('error', error);
        });
    };
    LoginPage.prototype.goToRegister = function () {
        var _this = this;
        this.zone.run(function () {
            _this.navCtrl.navigateRoot('/register');
        });
    };
    LoginPage.prototype.doGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, device;
            return __generator(this, function (_a) {
                me = this;
                me.clear_guest_user();
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
    // <----------------NOTE---------------------->
    // Replace section where NSLog(@"FB handle url: %@", url); is written
    //  For more details please check spotify.service.ts commented code
    //Update facebook plugin with link= https://github.com/apache/cordova-ios/issues/476
    // <----------------NOTE---------------------->
    LoginPage.prototype.facebookLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, device;
            var _this = this;
            return __generator(this, function (_a) {
                me = this;
                me.clear_guest_user();
                me.facebookForm = me.formBuilder.group({
                    'social_id': [null],
                    'name': [null],
                    'email': [null],
                    'device_token': [null],
                    'device_type': [null],
                });
                device = me.restProvider.getDeviceInfo();
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
                        me.restProvider.showLoader();
                        _this.fb.api("/me?fields=name,gender,email", []).then(function (user) {
                            me.facebookForm.patchValue({
                                social_id: fb_id_1,
                                name: (user && typeof user.name !== 'undefined') ? user.name : '',
                                email: (user && typeof user.email !== 'undefined') ? user.email : '',
                                device_type: device['device_type'],
                                device_token: device['device_token'],
                            });
                            faceBookAuth_1();
                        }).catch(function (errFB) {
                            me.facebookForm.patchValue({
                                social_id: fb_id_1,
                                name: '',
                                email: '',
                                device_type: 'android',
                                device_token: 'android' + Math.random() * 100000000000000000,
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
    LoginPage.prototype.backToHome = function () {
        var _this = this;
        this.zone.run(function () {
            _this.navCtrl.navigateRoot('/tabs/tab1');
        });
    };
    LoginPage.prototype.goBackLogin = function () {
        var _this = this;
        this.show_verify = false;
        this.show_reset = false;
        this.show_dialog = true;
        this.pageTitle = "Login";
        this.zone.run(function () { _this.navCtrl.navigateRoot('/login'); });
    };
    LoginPage.prototype.user_info = function () {
        this.user_login = false;
        this.guest_user = true;
        this.pageTitle = "Login";
        this.applyOnSel();
        this.reset_guest_from();
    };
    LoginPage.prototype.applyOnSel = function () {
        try {
            // document.querySelector('#guest_weight_unit').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
            setTimeout(function () {
                var selWeightEl = document.getElementById('guest_weight_unit');
                console.log("querySelector", selWeightEl);
                if (selWeightEl && selWeightEl != null && typeof selWeightEl !== 'undefined') {
                    selWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
            }, 500);
        }
        catch (e) {
            console.log("applyOnSel", e);
        }
    };
    LoginPage.prototype.guestSubmit = function () {
        var me = this;
        var formObj = this.guestForm.value;
        var error = [];
        if (formObj['age'] == null || formObj['age'] == '' || formObj['age'] < 10 || formObj['age'] > 100) {
            error.push('Age should be between 10-100');
        }
        if (formObj['body_weight'] == null || formObj['body_weight'] == '' || formObj['body_weight'] < 25) {
            error.push('Weight should be greaterthen 25');
        }
        if (formObj['fitness_level'] == null || formObj['fitness_level'] == '') {
            error.push('Fitness Level is required');
        }
        if (formObj['gender'] == null || formObj['gender'] == '') {
            error.push('Gender is required');
        }
        if (formObj['weight_unit'] == null || formObj['weight_unit'] == '') {
            formObj['weight_unit'] = 'KG';
        }
        if (error.length > 0) {
            console.log('Error', error);
            me.restProvider.alert(error.join('<br>'));
        }
        else {
            console.log('GO to Submit');
            var device_1 = me.restProvider.getDeviceInfo();
            formObj['device_type'] = device_1['device_type'];
            formObj['device_token'] = device_1['device_token'];
            formObj['RequestType'] = 'GUEST';
            me.restProvider.showLoader();
            me.restProvider.api_method('post', 'register', formObj, 'null').subscribe(function (data) {
                me.restProvider.dismissLoader();
                me.apiData = data;
                if (me.apiData.status === 'success') {
                    me.storage.set('Id', me.apiData.success.id);
                    me.storage.set('USER_Id', me.apiData.success.id);
                    me.storage.set('Name', me.apiData.success.name);
                    me.storage.set('Email', me.apiData.success.email);
                    me.storage.set('USERPROFILE', me.apiData.success);
                    me.storage.set('ShowGuestMsg', me.apiData.success.id);
                    me.zone.run(function () { me.navCtrl.navigateRoot('/tabs/tab1'); });
                    /*if(me.apiData.success.email=='' || me.apiData.success.email==null || me.apiData.success.email=='NULL'){
                        me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
                    }else{
                        me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
                    }*/
                }
                else {
                    me.restProvider.alert(me.apiData.message);
                }
            }, function (error) {
                me.restProvider.dismissLoader();
            });
        }
    };
    LoginPage.prototype.setmaxlen = function (e, maxl) {
        if (maxl === void 0) { maxl = 2; }
        var myval = e.currentTarget.value;
        return maxl < myval.length ? false : true;
    };
    LoginPage.prototype.guest_back_to_login = function () {
        this.user_login = true;
        this.guest_user = false;
    };
    LoginPage.prototype.clear_guest_user = function () {
        this.storage.remove('GUESTPROFILE').then(function () { });
    };
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], LoginPage.prototype, "document", void 0);
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [RestapiProvider,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder,
            Events,
            Storage,
            GooglePlus,
            NgZone,
            Facebook])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map