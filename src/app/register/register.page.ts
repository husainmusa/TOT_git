import { Component, OnInit,NgZone,Inject } from '@angular/core';
import { NavController,Platform, MenuController, ToastController, AlertController,LoadingController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { passwordValidator } from  '../validators/password';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { DOCUMENT} from '@angular/common';
import { FCM } from '@ionic-native/fcm/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

import * as fbauth from '../../assets/js/openfb.js';
@Component({
  selector    :  'app-register',
  templateUrl :  './register.page.html',
  styleUrls   : ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  public onRegisterForm: FormGroup;
  public onVerify      : FormGroup;
  public socilaForm    : FormGroup;
  public facebookForm  : FormGroup;
  public show_dialog   : boolean = true;
  public show_verify   : boolean = false;
  public show_women_status:boolean=false;
  public apiData       : any;
  public guestUserDtl  : any=[];
  FCM_token:any;
  @Inject(DOCUMENT) document:HTMLElement;
  public cssOptions : any;
  constructor(
              public restProvider: RestapiProvider,
              public navCtrl     : NavController,
              public menuCtrl    : MenuController,
              public toastCtrl   : ToastController,
              public alertCtrl   : AlertController,
              public loadingCtrl : LoadingController,
              public events      : Events,
              public storage     : Storage,
              private formBuilder: FormBuilder,
              private googlePlus : GooglePlus,
              private zone       : NgZone,
              private fcm          : FCM,
              private fb         : Facebook,
              private appAvailability: AppAvailability, 
              private platform: Platform) {
                this.cssOptions={
                  cssClass: 'select-box-class'
                }
                this.fcm.getToken().then(token => {
                 console.log('token::',token);
                 this.FCM_token=token;
                });
              }

  ionViewWillEnter(){
    this.applyOnSel();
    this.ngOnInit();
  }
  applyOnSel(){
    try{
     // document.querySelector('#guest_weight_unit').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
      setTimeout(function(){
        let selWeightEl=document.getElementById('weight_unit');
        if(selWeightEl && selWeightEl!=null && typeof selWeightEl !=='undefined' && selWeightEl.shadowRoot.querySelector('button')){
          selWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }
        let selTargetWeightEl=document.getElementById('target_weight_unit');
        if(selTargetWeightEl && selTargetWeightEl!=null && typeof selTargetWeightEl !=='undefined' && selTargetWeightEl.shadowRoot.querySelector('button')){
          selTargetWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }
        let selHeightUnitFeetEl=document.getElementById('height_unit-feet');
        if(selHeightUnitFeetEl && selHeightUnitFeetEl!=null && typeof selHeightUnitFeetEl !=='undefined' && selHeightUnitFeetEl.shadowRoot.querySelector('button')){
          selHeightUnitFeetEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }
        let selHeightUnitInchEl=document.getElementById('height_unit');
        if(selHeightUnitInchEl && selHeightUnitInchEl!=null && typeof selHeightUnitInchEl !=='undefined' && selHeightUnitInchEl.shadowRoot.querySelector('button')){
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

      },500);
    }catch(e){
      console.log("applyOnSel",e)
    }
  }
  ngOnInit() {

    this.onRegisterForm = this.formBuilder.group({
      'name'    : [null, Validators.compose([Validators.required])],
      'email'   : [null, Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      'age':    [null, Validators.compose([Validators.required])],
      'mobile':    [null],
      'height':    [null],
      'height_feet':    ["5"],
      'height_inches':    ["4"],
      'body_height': [null],
      'body_weight': [null, Validators.compose([Validators.required])],
      'targeted_weight': [null, Validators.compose([Validators.required])],
      'gender': [null, Validators.compose([Validators.required])],
      'interested_in': [null, Validators.compose([Validators.required])],
      'women_status': [null,],
      'fitness_level': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required,Validators.maxLength(30),Validators.minLength(6)])],
      'password_confirmation': [null, Validators.compose([Validators.required,Validators.maxLength(30),Validators.minLength(6)])],
      'device_token': [null],
      'device_type' : [null],
      'weight_unit' : ['KG'],
      'target_weight_unit' : ['KG'],
      'height_unit':['CM']
      },
    {validator: passwordValidator.MatchPassword });


    this.onVerify = this.formBuilder.group({
        'otp'  : [null, Validators.compose([Validators.required])],
        'email': [null],
    });
   }

  reset(){
       this.onRegisterForm.reset();
  }

  IsNumeric(e,dig)
    {

      let _dig=dig-1;
      // console.log(_dig,dig);
      let specialKeys = new Array();
      // console.log(e);
      let myval =e.target.value;
      // console.log(myval.length,myval);
      specialKeys.push(8);
      let keyl = myval.length;
      let keyCode = e.which ? e.which : e.keyCode;
      //let ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
      let ret = (keyl<=_dig);
      // document.getElementById("error").style.display = ret ? "none" : "inline";
      return ret;
    }


  async signUp(){
    let me=this;
    let formObj=this.onRegisterForm.value;
    let error=[];
    let matchStatus1=true;
    let matchStatus2=true;
    if(formObj['age']==null || formObj['age']=='' || formObj['age']<10 || formObj['age']>100){
      error.push('Age should be between 10-100');
    }
    if(formObj['body_weight']==null || formObj['body_weight']=='' || formObj['body_weight']<25){
      error.push('Weight should be greaterthen 25');
    }
    if(formObj['fitness_level']==null || formObj['fitness_level']==''){
      error.push('Fitness Level is required');
    }
    if(formObj['name']==null || formObj['name']==''){
      error.push('Name is required');
    }
    if(formObj['gender']==null || formObj['gender']==''){
      error.push('Gender is required');
    }
    if(formObj['email']==null || formObj['email']=='' || me.onRegisterForm.get('email').hasError('pattern')){
      error.push('Invalid E-Mail ID');
    }
    /*if(formObj['height_feet']==null || formObj['height_feet']=='' || parseInt(formObj['height_feet'])<1){
      error.push('height feet is required');
    }
    if(formObj['height_inches']==null || formObj['height_inches']=='' || parseInt(formObj['height_inches'])<1){
      error.push('height inch is required');
    }*/

    if(formObj['height_unit']=='FEET'){
      let f=formObj['height_feet'];let fi=formObj['height_inches'];
      if(formObj['height_feet']==null || formObj['height_feet']==''){
        f=3;
      }
      if(formObj['height_inches']==null || formObj['height_inches']==''){
        fi=0;
      }
      formObj['body_height'] = [f,fi].join('.');
    }
    if(formObj['body_height']==null || formObj['body_height']=='' || parseInt(formObj['body_height'])<1){
      error.push('height is required');
    }

    if(formObj['interested_in']==null || formObj['interested_in']==''){
      error.push('Goals is required');
    }
    if(formObj['interested_in']!='stay in shape'){
      if(formObj['targeted_weight']==null || formObj['targeted_weight']=='' || formObj['targeted_weight']<1){
        error.push('targeted weight is required');
      }
    }
    if(formObj['password']==null || formObj['password']==''  || me.onRegisterForm.get('password').hasError('minlength')){
      error.push('password is required and atleast 6 chatacters');matchStatus1=false;
    }
    if(formObj['password_confirmation']==null || formObj['password_confirmation']=='' || me.onRegisterForm.get('password_confirmation').hasError('minlength')){
      error.push('confirm password is required and atleast 6 chatacters');matchStatus2=false;
    }
    if(matchStatus1==true && matchStatus2==true && (formObj['password_confirmation']!=formObj['password'])){
      error.push('confirm password and password does not match');
    }
    if(formObj['interested_in']=="lose weight"){
      if(parseInt(formObj['body_weight']) < parseInt(formObj['targeted_weight'])){
        error.push('target weight should be lessthen body weight');
      }
    }
    if(formObj['interested_in']=="gain muscle"){
      if(parseInt(formObj['targeted_weight']) < parseInt(formObj['body_weight'])){
        error.push('target weight should be greaterthen body weight');
      }
    }

    if(formObj['weight_unit']==null || formObj['weight_unit']==''){
      formObj['weight_unit']='KG';
    }
    if(formObj['target_weight_unit']==null || formObj['target_weight_unit']==''){
      formObj['target_weight_unit']='KG';
    }

    //console.log(error,'formObj interested_in',formObj);
    //return ;


    if(error.length>0){
      console.log('Error',error);
       me.restProvider.alert(error.join('<br>'));
    }else{
      console.log('GO to Submit',formObj);
       let device=me.restProvider.getDeviceInfo();
       formObj['device_type']=device['device_type'];
       formObj['device_token']=device['device_token'];

       formObj['RequestType']='Registration';


       me.restProvider.showLoader();
       me.restProvider.api_method('post','register',formObj,'null').subscribe((data)=>{
         me.restProvider.dismissLoader();
         me.apiData=data;
           console.log('register response',me.apiData);
         if(me.apiData.status === 'success'){

           me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.success.id+'/ios',null,null).subscribe((r)=>{
            console.log('runnn',r);
          })
            me.storage.set('USER_Id', me.apiData.success.id);
            me.storage.set('Name', me.apiData.success.name);
            me.storage.set('Email', me.apiData.success.email);
            me.storage.set('USERPROFILE', me.apiData.success);


            me.storage.set('Id', me.apiData.success.id).then(()=>{
              if(me.apiData.success.email=='' || me.apiData.success.email==null || me.apiData.success.email=='NULL'){
                  me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
              }else{
                  me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
              }
            })


         }else{
            me.restProvider.alert(me.apiData.message);
         }

       },error=>{
          me.restProvider.dismissLoader();
       });
    }

  }
 async Verify(){


 	this.onVerify.controls['email'].setValue(this.apiData.success.email);
 	console.log(this.onVerify.value);

  	   this.restProvider.showLoader();
	     this.restProvider.api_method('post','verifyOtp',this.onVerify.value,'null').subscribe((data)=>{
	     this.restProvider.dismissLoader();
	     this.apiData=data;

	     if(this.apiData.error === 'Otp not correct'){
	          // this.presentAlert();
	          let msg='Otp not correct';
	          this.restProvider.alert(msg);
	        }else if(this.apiData.message === 'otp is correct'){

            this.restProvider.api_method('get','updateFCM/'+this.FCM_token+'/'+this.apiData.success.id+'/ios',null,null).subscribe((r)=>{
            console.log('runnn',r);
          })
	          // console.log(this.apiData.success);
	          this.storage.set('Id'         ,this.apiData.success.id);
	          this.storage.set('Name'       ,this.apiData.success.name);
	          this.storage.set('Email'      ,this.apiData.success.email);
            this.storage.set('USERPROFILE',this.apiData.success);

            this.storage.get('USERPROFILE').then((userObj) => {
            if (userObj) {
                console.log('obj_rg',userObj);
              }
            });

	          let msg='Registered Successfully';
	          this.restProvider.alert(msg);
	          this.navCtrl.navigateRoot('/editprofile');
	        }
	      },
	    error=>{
	      console.log( error);
	      this.restProvider.dismissLoader();
	    });

  }


  goToLogin(){
  	this.navCtrl.navigateRoot('/login');
  }

async doGoogleLogin(){
  let me =this;
  me.socilaForm = me.formBuilder.group({
    'email': [null],
    'name': [null],
    'social_id': [null],
    'device_token': [null],
    'device_type': [null],
  });
  let device=me.restProvider.getDeviceInfo();

  me.restProvider.showLoader();
  this.googlePlus.login({}).then(res=>{
    console.log('googlePlus success :::',res);
    me.socilaForm.patchValue({
      email: res.email,
      name: res.displayName,
      social_id: res.userId,
      device_type: device['device_type'],
      device_token:device['device_token'],
    });
    me.restProvider.api_method('post','social_login',me.socilaForm.value,'null').subscribe((data)=>{
        me.restProvider.dismissLoader();
        me.apiData=data;
        if(me.apiData.status === 'success'){
          me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.data.id+'/ios',null,null).subscribe((r)=>{
            console.log('runnn',r);
          })
          me.storage.set('Id', me.apiData.data.id);
          me.storage.set('USER_Id', me.apiData.data.id);
          me.storage.set('Name', me.apiData.data.name);
          me.storage.set('Email', me.apiData.data.email);
          me.storage.set('USERPROFILE', me.apiData.data);

          me.restProvider.alert('Login Successfully !!');

          if(me.apiData.data.email=='' || me.apiData.data.email=='null' || me.apiData.data.email=='NULL'){
              me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
          }else{
              me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
          }

        }else{
          me.restProvider.alert(me.apiData.message);
        }

    },error=>{
      me.restProvider.dismissLoader();
      me.restProvider.alert('Sorry! unable to process your request');
    });

  }).catch(err => {
    me.restProvider.dismissLoader();
    console.log('googlePlus catch ::',err);
    me.restProvider.alert('Sorry! unable to process your request');
  });

}

  showWomenStatus($event){

            let gender=$event.target.value;
            // console.log('ws',$event.target.value);
            if(gender=='female'){
                    this.show_women_status=true;
            }else{
                    this.show_women_status=false;
            }

  }


// async facebookLogin(){
//   let me=this;
//   me.facebookForm = me.formBuilder.group({
//     'social_id': [null],
//     'name': [null],
//     'email': [null],
//     'device_token': [null],
//     'device_type': [null],
//   });

//   me.restProvider.showLoader();
//   me.fb.login(['public_profile','email']).then((res: FacebookLoginResponse) => {
//     console.log('Logged into Facebook!', res);
//     me.restProvider.dismissLoader();
//     if(res.status == "connected" && res.authResponse.userID!="") {
//       let fb_id = res.authResponse.userID;
//       let fb_token = res.authResponse.accessToken;
//       let faceBookAuth=function(){
//         me.restProvider.api_method('post','social_login',me.facebookForm.value,'null').subscribe((data)=>{
//             me.restProvider.dismissLoader();
//             me.apiData=data;
//             if(me.apiData.status === 'success'){
//               me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.data.id+'/ios',null,null).subscribe((r)=>{
//                 console.log('runnn',r);
//               })
//               me.storage.set('Id', me.apiData.data.id);
//               me.storage.set('USER_Id', me.apiData.data.id);
//               me.storage.set('Name', me.apiData.data.name);
//               me.storage.set('Email', me.apiData.data.email);
//               me.storage.set('USERPROFILE', me.apiData.data);

//               me.restProvider.alert('Login Successfully !!');

//               if(me.apiData.data.email=='' || me.apiData.data.email=='null' || me.apiData.data.email=='NULL'){
//                   me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
//               }else{
//                   me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
//               }

//             }else{
//               me.restProvider.alert(me.apiData.message);
//             }

//         },error=>{
//           me.restProvider.dismissLoader();
//           me.restProvider.alert('Sorry! unable to process your request');
//         });

//       }
//       let device=me.restProvider.getDeviceInfo();

//       me.restProvider.showLoader();

//       this.fb.api("/me?fields=name,gender,email", []).then((user) => {
//         me.facebookForm.patchValue({
//             social_id:fb_id,
//             name: (user && typeof user.name !=='undefined') ?  user.name : '',
//             email:(user && typeof user.email !=='undefined') ?  user.email : '',
//             device_type: device['device_type'],
//             device_token:device['device_token'],
//          });
//          faceBookAuth();
//       }).catch(errFB =>{
//           me.facebookForm.patchValue({
//             social_id:fb_id,
//             name:'',
//             email:'',
//             device_type: device['device_type'],
//             device_token:device['device_token'],
//           });

//           faceBookAuth();
//       });

//     }else{
//       me.restProvider.alert('Sorry! unable to process your request');
//     }

//   }).catch(err =>{
//     me.restProvider.dismissLoader();
//     console.log('FB catch ::',err);
//     me.restProvider.alert('Sorry! unable to process your request');
//   });

// }


async facebookLogin(){
  let app;
  let me=this;
  if (this.platform.is('ios')) {
    app = 'fb://';
  } else if (this.platform.is('android')) {
    app = 'com.facebook.katana';
  }
  me.facebookForm = me.formBuilder.group({
    'social_id': [null],
    'name': [null],
    'email': [null],
    'device_token': [null],
    'device_type': [null],
  });
  this.appAvailability.check(app).then((yes: boolean) => {
    console.log(app + ' is available')
    let device=me.restProvider.getDeviceInfo();
    me.restProvider.showLoader();
    me.fb.login(['public_profile','email']).then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      me.restProvider.dismissLoader();
      if(res.status == "connected" && res.authResponse.userID!="") {
        let fb_id = res.authResponse.userID;
        let fb_token = res.authResponse.accessToken;
        let faceBookAuth=function(){
          me.restProvider.api_method('post','social_login',me.facebookForm.value,'null').subscribe((data)=>{
              me.restProvider.dismissLoader();
              me.apiData=data;
              console.log('me.apiData',me.apiData);
              if(me.apiData.status === 'success'){
                me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.data.id+'/ios',null,null).subscribe((r)=>{
              console.log('runnn',r);
            })
                me.storage.set('Id', me.apiData.data.id);
                me.storage.set('USER_Id', me.apiData.data.id);
                me.storage.set('Name', me.apiData.data.name);
                me.storage.set('Email', me.apiData.data.email);
                me.storage.set('USERPROFILE', me.apiData.data);

                me.restProvider.alert('Login Successfully !!');

                if(me.apiData.data.email=='' || me.apiData.data.email=='null' || me.apiData.data.email=='NULL'){
                    me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
                }else{
                    me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
                }

              }else{
                me.restProvider.alert(me.apiData.message);
              }

          },error=>{
            me.restProvider.dismissLoader();
            me.restProvider.alert('Sorry! unable to process your request');
          });

        }

        me.restProvider.showLoader();
        this.fb.api("/me?fields=name,gender,email", []).then((user) => {
          me.facebookForm.patchValue({
              social_id:fb_id,
              name: (user && typeof user.name !=='undefined') ?  user.name : '',
              email:(user && typeof user.email !=='undefined') ?  user.email : '',
              device_type: device['device_type'],
              device_token:device['device_token'],
          });
          faceBookAuth();
        }).catch(errFB =>{
            me.facebookForm.patchValue({
              social_id:fb_id,
              name:'',
              email:'',
              device_type: 'android',
              device_token:'android'+Math.random()*100000000000000000,
            });
            faceBookAuth();
        });

      }else{
        me.restProvider.alert('Sorry! unable to process your request');
      }

    }).catch(err =>{
      me.restProvider.dismissLoader();
      console.log('FB catch ::',err);
      me.restProvider.alert('Sorry! unable to process your request');
    });
  },(no: boolean) =>{
    console.log(app + ' is NOT available');
    me.fbLoginByScript();
  });

}

fbLoginByScript(){
  let me=this;
  let device=me.restProvider.getDeviceInfo();
  fbauth.openFB.init({appId: '125365139463406'});
  me.restProvider.showLoader();
  fbauth.openFB.login((res)=>{
    me.restProvider.dismissLoader();
    console.log('fbResponce',res);
      if(res.status == "connected" && res.authResponse.userID!="") {
        // let fb_id = '';
        // let fb_token = res.authResponse.accessToken;
        let faceBookAuth=function(){
          me.restProvider.api_method('post','social_login',me.facebookForm.value,'null').subscribe((data)=>{
              me.restProvider.dismissLoader();
              me.apiData=data;
              console.log('me.apiData',me.apiData);
              if(me.apiData.status === 'success'){
                me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.data.id+'/ios',null,null).subscribe((r)=>{
              console.log('runnn',r);
            })
                me.storage.set('Id', me.apiData.data.id);
                me.storage.set('USER_Id', me.apiData.data.id);
                me.storage.set('Name', me.apiData.data.name);
                me.storage.set('Email', me.apiData.data.email);
                me.storage.set('USERPROFILE', me.apiData.data);

                me.restProvider.alert('Login Successfully !!');

                if(me.apiData.data.email=='' || me.apiData.data.email=='null' || me.apiData.data.email=='NULL'){
                    me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
                }else{
                    me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
                }

              }else{
                me.restProvider.alert(me.apiData.message);
              }

          },error=>{
            me.restProvider.dismissLoader();
            me.restProvider.alert('Sorry! unable to process your request');
          });

        }
        me.restProvider.showLoader();
        fbauth.openFB.api({
          path: "/me?fields=name,gender,email",
          success: (user)=> {
              console.log('fbCredentialsuser',user);
              me.facebookForm.patchValue({
                  social_id:user.id || '',
                  fb_id:user.id || '',
                  name: (user && typeof user.name !=='undefined') ?  user.name : '',
                  email:(user && typeof user.email !=='undefined') ?  user.email : '',
                  device_type: device['device_type'],
                  device_token:device['device_token'],
              });
              faceBookAuth();
          },error: (errorHandler)=>{
            console.log('fbCredentials',errorHandler);
            me.facebookForm.patchValue({
              social_id:'',
              fb_id:'',
              name:'',
              email:'',
              device_type: 'android',
              device_token:'android'+Math.random()*100000000000000000,
            });
            faceBookAuth();
          }
        });

      }else{
        me.restProvider.alert('Sorry! unable to process your request');
      }
  }, {scope: 'email,public_profile'});
}
backToHome(){
  this.zone.run(() => {
    this.navCtrl.navigateRoot('/tabs/tab1');
  });
}

}
