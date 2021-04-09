import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { NavController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { RestapiProvider } from '../providers/restapis/restapis';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { environment } from '../../environments/environment';
var serviceAPI = environment.serviceAPI;
var EditprofilePage = /** @class */ (function () {
    function EditprofilePage(navCtrl, storage, actionSheetController, loadingController, formBuilder, camera, transfer, restProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.actionSheetController = actionSheetController;
        this.loadingController = loadingController;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.transfer = transfer;
        this.restProvider = restProvider;
        this.userImage = '../assets/images/avatar3.png';
        this.show_women_status = false;
        this.isReadOnly = true;
        this.cssOptions = {
            cssClass: 'select-box-class'
        };
    }
    EditprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.onEditForm = this.formBuilder.group({
            'user_id': [''],
            'email': ['', Validators.compose([Validators.required])],
            'name': ['', Validators.compose([Validators.required])],
            'age': ['', Validators.compose([Validators.required])],
            'body_weight': ['', Validators.compose([Validators.required])],
            'current_weight': ['', Validators.compose([Validators.required])],
            'body_height': [null, Validators.compose([Validators.required])],
            'height': [''],
            'targeted_weight': ['', Validators.compose([Validators.required])],
            'gender': ['', Validators.compose([Validators.required])],
            'fitness_level': ['', Validators.compose([Validators.required])],
            'interested_in': ['', Validators.compose([Validators.required])],
            'women_status': [''],
            'file': [''],
            'weight_unit': ['KG'],
            'cweight_unit': ['KG'],
            'target_weight_unit': ['KG'],
            'height_unit': ['CM'],
            'password': [null, Validators.compose([, Validators.maxLength(30), Validators.minLength(6)])],
            'password_confirmation': [null, Validators.compose([Validators.maxLength(30), Validators.minLength(6)])],
            'height_feet': ["5"],
            'height_inches': ["4"]
        });
        this.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                console.log('user_obj', userObj);
                _this.userdetails = userObj;
                if (userObj['image'] && userObj['image'] != null && userObj['image'] != '') {
                    _this.userImage = userObj['image'];
                }
                _this.currentweightUnit = _this.userdetails.weight_unit;
                var hFeet = '3';
                var hinchaes = '4';
                if (_this.userdetails.body_height) {
                    var hh = _this.userdetails.body_height.toString().split('.');
                    hFeet = (hh[0] && typeof hh[0] !== 'undefined') ? hh[0] : '3';
                    hinchaes = (hh[1] && typeof hh[1] !== 'undefined') ? hh[1] : '4';
                    //  console.log(hh,'GGG',[hFeet,hinchaes]);
                }
                _this.onEditForm.patchValue({
                    user_id: _this.userdetails.id,
                    email: _this.userdetails.email,
                    name: _this.userdetails.name,
                    age: _this.userdetails.age,
                    body_weight: _this.userdetails.body_weight,
                    current_weight: _this.userdetails.current_weight,
                    targeted_weight: _this.userdetails.targeted_weight,
                    gender: _this.userdetails.gender,
                    fitness_level: _this.userdetails.fitness_level,
                    interested_in: _this.userdetails.interested_in,
                    women_status: _this.userdetails.women_status,
                    height_unit: _this.userdetails.height_unit,
                    mobile: _this.userdetails.mobile,
                    weight_unit: _this.userdetails.weight_unit,
                    cweight_unit: _this.userdetails.weight_unit,
                    target_weight_unit: _this.userdetails.target_weight_unit,
                    height_feet: hFeet,
                    height_inches: hinchaes,
                });
                if (_this.userdetails.gender == 'female') {
                    _this.show_women_status = true;
                }
                if (_this.userdetails.email == '') {
                    _this.isReadOnly = false;
                }
                // console.log('userdetail_value', this.userdetails);
            }
        });
    };
    // ngOnInit() {
    // }
    EditprofilePage.prototype.ionViewWillEnter = function () {
        this.applyOnSel();
    };
    EditprofilePage.prototype.applyOnSel = function () {
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
                var selHeightUnitFeetEl = document.getElementById('height_unit');
                if (selHeightUnitFeetEl && selHeightUnitFeetEl != null && typeof selHeightUnitFeetEl !== 'undefined' && selHeightUnitFeetEl.shadowRoot.querySelector('button')) {
                    selHeightUnitFeetEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
                }
            }, 500);
        }
        catch (e) {
            console.log("applyOnSel", e);
        }
    };
    EditprofilePage.prototype.showWomenStatus = function ($event) {
        var gender = $event.target.value;
        if (gender == 'female') {
            this.show_women_status = true;
        }
        else {
            this.show_women_status = false;
        }
    };
    EditprofilePage.prototype.presentActionSheet = function () {
        var me = this;
        this.actionSheet = this.actionSheetController.create({
            header: 'Select Image Source',
            cssClass: 'action-sheets-groups-page',
            buttons: [{
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        //this.sourceType =  this.camera.PictureSourceType.CAMERA;
                        //me.backgroundMode.enable();
                        setTimeout(function () { me.takePicture("CAMERA"); }, 500);
                    }
                },
                {
                    text: 'Gallery',
                    icon: 'image',
                    handler: function () {
                        //this.sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
                        // me.backgroundMode.enable();
                        setTimeout(function () { me.takePicture("Gallery"); }, 500);
                    }
                }]
        }).then(function (actionsheet) {
            actionsheet.present();
        });
    };
    EditprofilePage.prototype.takePicture = function (sourceType) {
        return __awaiter(this, void 0, void 0, function () {
            var me, _a, options;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        me = this;
                        if (sourceType == "CAMERA") {
                            this.sourceType = this.camera.PictureSourceType.CAMERA;
                        }
                        else {
                            this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
                        }
                        _a = me;
                        return [4 /*yield*/, me.loadingController.create({
                                message: 'Processing...'
                            })];
                    case 1:
                        _a.myrLoader = _b.sent();
                        me.myrLoader.present();
                        this.camera.cleanup();
                        options = {
                            quality: 76,
                            destinationType: this.camera.DestinationType.NATIVE_URI,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE,
                            correctOrientation: true,
                            saveToPhotoAlbum: true,
                            sourceType: this.sourceType
                        };
                        this.camera.getPicture(options).then(function (imageData) {
                            //  me.backgroundMode.disable();
                            var filename, path;
                            _this.currentImage = imageData;
                            if (_this.sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                                path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
                                filename = imageData.substring(imageData.lastIndexOf('/') + 1);
                                var index = filename.indexOf('?');
                                if (index > -1) {
                                    filename = filename.substring(0, index);
                                }
                            }
                            if (_this.sourceType === _this.camera.PictureSourceType.CAMERA) {
                                filename = imageData.substring(imageData.lastIndexOf('/') + 1);
                                path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
                                var index = filename.indexOf('?');
                                if (index > -1) {
                                    filename = filename.substring(0, index);
                                }
                            }
                            _this.fileUploadName = filename;
                            //this.reqFormObj.push(data);
                            console.log('ssss', _this.fileUploadName);
                            var fileTransfer = _this.transfer.create();
                            var options = {
                                fileKey: 'file',
                                fileName: _this.fileUploadName,
                                chunkedMode: false,
                                httpMethod: 'POST',
                                params: { 'file_type': 'doctype' }
                            };
                            console.log(serviceAPI, 'options', options, 'POST-URL:::', serviceAPI + '/upload_image/' + _this.userdetails.id);
                            fileTransfer.upload(_this.currentImage, serviceAPI + '/upload_image/' + _this.userdetails.id, options)
                                .then(function (data) {
                                console.log('uploaded data', data);
                                me.myrLoader.dismiss();
                                me.uploadData = JSON.parse(data['response']);
                                if (me.uploadData['status'] == 'success') {
                                    me.userImage = me.uploadData['success'];
                                }
                                me.restProvider.alert(me.uploadData['message']);
                            }, function (err) {
                                console.log('/upload_image/', err);
                                me.restProvider.alert('Sorry!unable to process your request');
                                me.myrLoader.dismiss();
                            });
                        }, function (err) {
                            // me.backgroundMode.disable();
                            me.restProvider.alert('Sorry!unable to process your request');
                            me.myrLoader.dismiss();
                            console.log("Camera issue:" + err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditprofilePage.prototype.IsNumeric = function (e, dig) {
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
    EditprofilePage.prototype.editUserData = function () {
        var _this = this;
        // console.log('update profile',this.onEditForm.value);
        var me = this;
        var error = [];
        var formObj = this.onEditForm.value;
        var msg = 'profile Update successfully';
        //me.userImage
        console.log('update profile', formObj);
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
        if (formObj['email'] == null || formObj['email'] == '' || me.onEditForm.get('email').hasError('pattern')) {
            error.push('Invalid E-Mail ID');
        }
        if (formObj['height_unit'] == 'FEET') {
            var f = formObj['height_feet'];
            var fi = formObj['height_inches'];
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
        /*if(formObj['height_inches']==null || formObj['height_inches']=='' || parseInt(formObj['height_inches'])<1){
          error.push('height inch is required');
        }*/
        if (formObj['targeted_weight'] == null || formObj['targeted_weight'] == '' || formObj['targeted_weight'] < 1) {
            error.push('targeted weight is required');
        }
        if (formObj['interested_in'] == null || formObj['interested_in'] == '') {
            error.push('Goals is required');
        }
        if (formObj['height_unit'] == null || formObj['height_unit'] == '') {
            formObj['height_unit'] = 'CM';
        }
        if (formObj['weight_unit'] == null || formObj['weight_unit'] == '') {
            formObj['weight_unit'] = 'KG';
        }
        if (formObj['target_weight_unit'] == null || formObj['target_weight_unit'] == '') {
            formObj['target_weight_unit'] = 'KG';
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
        if (formObj['password'] != "" && formObj['password_confirmation'] != "") {
            if (formObj['password'] != formObj['password_confirmation']) {
                error.push('password & confirm password does not match');
            }
        }
        if (error.length > 0) {
            console.log('Error', error);
            me.restProvider.alert(error.join('<br>'));
        }
        else {
            this.restProvider.showLoader();
            this.restProvider.api_method('post', 'profile', formObj, 'null').subscribe(function (data) {
                _this.apiData = data;
                if (_this.apiData.status === 'success') {
                    _this.restProvider.dismissLoader();
                    msg = 'Profile Updated successfully';
                    setTimeout(function () {
                        me.navCtrl.navigateRoot('/tabs/tab4');
                        setTimeout(function () {
                            me.restProvider.alert(msg);
                        }, 500);
                    }, 500);
                }
                else {
                    _this.restProvider.dismissLoader();
                    msg = 'Something went wrong';
                    if (_this.apiData.message && _this.apiData.message != '') {
                        msg = _this.apiData.message;
                    }
                    setTimeout(function () { me.restProvider.alert(msg); }, 500);
                }
            }, function (error) {
                console.log(error);
                _this.restProvider.dismissLoader();
            });
        }
    };
    EditprofilePage.prototype.navigaToback = function () {
        this.navCtrl.navigateRoot('/tabs/tab4');
    };
    EditprofilePage = __decorate([
        Component({
            selector: 'app-editprofile',
            templateUrl: './editprofile.page.html',
            styleUrls: ['./editprofile.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            ActionSheetController,
            LoadingController,
            FormBuilder,
            Camera,
            FileTransfer,
            RestapiProvider])
    ], EditprofilePage);
    return EditprofilePage;
}());
export { EditprofilePage };
//# sourceMappingURL=editprofile.page.js.map