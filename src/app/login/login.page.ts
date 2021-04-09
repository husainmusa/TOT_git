import { Component, OnInit,NgZone,Inject } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController,
         LoadingController,Platform, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from  '../validators/password';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { CometChat} from '@cometchat-pro/chat';
import { environment } from '../../environments/environment';
import { FCM } from '@ionic-native/fcm/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

import * as fbauth from '../../assets/js/openfb.js';

const appID = environment.appID;
const apiKey = environment.apiKey;

import { DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //public appID: string = '5189d825db2284';
  //public apiKey: string = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';

	public onLoginForm: FormGroup;
  public socilaForm: FormGroup;
  public facebookForm: FormGroup;
	public onRegisterForm: FormGroup;
  public onVerify: FormGroup;
  public onResetForm: FormGroup;
  public guestForm: FormGroup;
  apiData:any;
  fb_resp:any;
  email:any;
  id:any;
  me:any;
  FCM_token:any;
  public show_dialog : boolean = true;
  public show_verify : boolean = false;
  public show_reset : boolean = false;
  public user_login : boolean = true;
  public guest_user : boolean = false;
  public skip : boolean = false;

  public pageTitle : any;
  @Inject(DOCUMENT) document:HTMLElement;
  constructor(public  restProvider : RestapiProvider,
              public  navCtrl      : NavController,
              public  menuCtrl     : MenuController,
              public  toastCtrl    : ToastController,
              public  alertCtrl    : AlertController,
              public  loadingCtrl  : LoadingController,
              private formBuilder  : FormBuilder,
              public  events       : Events,
              public  storage      : Storage,
              private googlePlus   : GooglePlus,
              private zone         : NgZone,
              private fcm          : FCM,
              private fb           : Facebook,
              private appAvailability: AppAvailability, 
              private platform: Platform) {
                this.pageTitle="Login";
                      this.fcm.getToken().then(token => {
                       console.log('token::',token);
                       this.FCM_token=token;
                      });
              }

 ionViewWillEnter(){
  console.log('fbauth',fbauth.openFB)
   this.ngOnInit();
 }

 ngOnInit() {

  	this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
         Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      'password': [null, Validators.compose([Validators.required])],
    });

    this.guestForm = this.formBuilder.group({
      'age':    [null, Validators.compose([Validators.required])],
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
        Validators.required,Validators.maxLength(30),Validators.minLength(6)
      ])],
      'password_confirmation': [null, Validators.compose([
        Validators.required,Validators.maxLength(30),Validators.minLength(6)
      ])]
    },{
      validator: passwordValidator.MatchPassword // Inject the provider method
    });

      this.storage.get('GUESTPROFILE').then((userObj) => {
        if (userObj) {
            this.skip=false;
        }else{
           this.skip=true;
        }
        });




  }

  reset(){
       this.onLoginForm.reset();
  }
  reset_guest_from(){
    this.guestForm.reset();
    this.guestForm.controls['weight_unit'].setValue('KG');
  }

  async signIn() {
      let me=this;
      let error=[];
      me.clear_guest_user();
      if(this.onLoginForm.value['email']=="" || this.onLoginForm.value['email']==null){
        error.push('Please Enter Valid Email Address');
      }
      if(this.onLoginForm.value['password']=="" || this.onLoginForm.value['password']==null){
        error.push('Please Enter Password');
      }
      if(error.length>0){
        me.restProvider.alert(error.join('<br>'));
        return true;
      }


      me.restProvider.showLoader();
      me.restProvider.api_method('post','login',this.onLoginForm.value,'null').subscribe((data)=>{
        me.restProvider.dismissLoader();
        me.apiData=data;
        if(me.apiData.status==='success'){
          let msg='Login successfully';
          me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.success.id+'/ios',null,null).subscribe((r)=>{
            console.log('runnn',r);
          })
          me.storage.set('Id', me.apiData.success.id);
          me.storage.set('USER_Id', me.apiData.success.id);
          me.storage.set('Name', me.apiData.success.name);
          me.storage.set('Email', me.apiData.success.email);
          me.storage.set('USERPROFILE', me.apiData.success);
          if(me.apiData.success.type=='coach'){
            me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab5/chat-list');});
            //me.restProvider.alert(msg);
          }else{
            me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
            //me.restProvider.alert(msg);
          }
        }else{
            let msg=me.apiData && me.apiData.message? me.apiData.message : 'credential does not match !!';
	          me.restProvider.alert(msg);
        }

      }, error=>{
        console.log('login ERROR:',error);
        me.restProvider.dismissLoader();
      });
	}

	  async forgotPass() {
    const alert = await this.alertCtrl.create({
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
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Confirm',
          handler:  (data) => {
          this.forgetPassword(data);}
        }
      ]
    });

    await alert.present();
  }

	  async  forgetPassword(userData){


        this.clear_guest_user();

      //show loader
      this.restProvider.showLoader();
      //send data to server

      this.restProvider.api_method('post','forgetPassword',userData,'null').subscribe((data)=>{

       this.apiData=data;
       console.log(this.apiData.data);
       //check credential is valid or not
        if(this.apiData.status === 'error'){
            this.restProvider.dismissLoader();
            this.restProvider.alert(this.apiData.message);
          }else{

            //hide loader
            this.pageTitle="Reset Password";
            this.show_dialog  = false;
	          this.show_verify  = true;
            this.restProvider.dismissLoader();

             localStorage.setItem("verify_email",this.apiData.data.email);
             localStorage.setItem("verify_id",this.apiData.data.email);
             let msg='A One Time Passcode has been sent to your Email Address. Please enter the OTP to verify your Email Address.if you cannot see the email in your inbox, make sure to check your SPAM folder.';

            this.restProvider.alert(msg);
            this.apiData=data;
            console.log(this.apiData);
          }
        },
      error=>{
        console.log(error);
        this.restProvider.dismissLoader();
      });

   }


 async Verify(){

     this.clear_guest_user();

   this.email=localStorage.getItem("verify_email");
   this.id=localStorage.getItem("verify_id");

  console.log('',this.email);

 	this.onVerify.controls['email'].setValue(this.email);
 	console.log(this.onVerify.value);

  	   this.restProvider.showLoader();
	     this.restProvider.api_method('post','verify_password_otp',this.onVerify.value,'null').subscribe((data)=>{
	     this.restProvider.dismissLoader();
	     this.apiData=data;

	     if(this.apiData.error === 'Otp not correct'){
	          // this.presentAlert();
	          let msg='Invalid OTP! Please enter valid OTP';
	          this.restProvider.alert(msg);
	        }else if(this.apiData.message === 'otp is correct'){

             localStorage.setItem("verify_email",this.apiData.success.email);
             localStorage.setItem("verify_id",this.apiData.success.id);
	           //console.log(this.apiData.success);

	         /* this.storage.set('USER_Id', this.apiData.success.id);
            this.storage.set('Name', this.apiData.success.name);
            this.storage.set('Email', this.apiData.success.email);
            this.storage.set('USERPROFILE', this.apiData.success);*/


	          let msg='OTP verified successfully';
	          this.restProvider.alert(msg);
            this.show_verify  = false;
            this.show_reset  = true;
	          // this.navCtrl.navigateRoot('/tabs/tab1');
	        }
	      },
	    error=>{
	      console.log( error);
	      this.restProvider.dismissLoader();
	    });

  }


async resetPassword(){
  let me=this;
  me.clear_guest_user();

  this.id=localStorage.getItem("verify_id");
  this.onResetForm.controls['user_id'].setValue(this.id);
  console.log('onResetForm',this.onResetForm.value);

  let error=[];
  if(this.onResetForm.value['password']=="" || this.onResetForm.value['password']==null){
    error.push('Please Enter New Password');
  }
  if(this.onResetForm.value['password_confirmation']=="" || this.onResetForm.value['password_confirmation']==null){
    error.push('Please Enter Confirmation Password');
  }
  if(this.onResetForm.value['password_confirmation']!== this.onResetForm.value['password']){
      error.push('Confirmation Password and New Password does not match');
  }
  if(error.length>0){
    me.restProvider.alert(error.join('<br>'));
    return true;
  }

  this.restProvider.showLoader();
  this.restProvider.api_method('post','reset_paasword',this.onResetForm.value,'null').subscribe((data)=>{
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


       me.restProvider.alert('Password Verify Successfully!!');
       me.show_verify  = false;
       me.show_reset  = true;
       if(me.apiData.data.type=='coach'){
         me.zone.run(() => {
              me.navCtrl.navigateRoot('/tabs/tab5/chat-list');
         });
       }else{
         me.zone.run(() => {
              me.navCtrl.navigateRoot('/tabs/tab1');
         });
       }
     }else{
       me.restProvider.alert('Invalid OTP');
     }

  },error=>{
     console.log('reset_paasword ERROR:', error);
     me.restProvider.dismissLoader();
  });

}
cometChatLogin(name,id){
             this.restProvider.api_method('get','cometChatCreateUser/'+name+'/'+id,null,null).subscribe((data)=>{
              if(data['status']==='success'){
                      console.log('create user cometchat Message:',data['message']);
                      let UID =id;
                      // this.restProvider.logoutCometChat();
                      this.restProvider.loginComChat(UID);

                      this.zone.run(() => {
                      this.navCtrl.navigateRoot('/tabs/tab1');
                      });


              }else if(data['status']==='error'){

                console.log('create user cometchat error:',data['status']);

              }
            },
            error=>{
                // let $msg='server error:'+error;
                // this.restProvider.alert($msg);
                console.log('error', error);
            });

}



goToRegister(){
  this.zone.run(() => {
      this.navCtrl.navigateRoot('/register');
  });
}

async doGoogleLogin(){
  let me =this;
  me.clear_guest_user();
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
// <----------------NOTE---------------------->
// Replace section where NSLog(@"FB handle url: %@", url); is written
//  For more details please check spotify.service.ts commented code
//Update facebook plugin with link= https://github.com/apache/cordova-ios/issues/476
// <----------------NOTE---------------------->
async facebookLogin(){
  let app;
  let me=this;
  if (this.platform.is('ios')) {
    app = 'fb://';
  } else if (this.platform.is('android')) {
    app = 'com.facebook.katana';
  }
  me.clear_guest_user();
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

goBackLogin(){
  this.show_verify  = false;
  this.show_reset  = false;
  this.show_dialog  = true;
  this.pageTitle="Login";
  this.zone.run(() => {this.navCtrl.navigateRoot('/login');});
}

user_info(){
  this.user_login=false;
  this.guest_user=true;
  this.pageTitle="Login";
  this.applyOnSel();
  this.reset_guest_from();
}
applyOnSel(){
  try{
   // document.querySelector('#guest_weight_unit').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
    setTimeout(function(){
      let selWeightEl=document.getElementById('guest_weight_unit');
      console.log("querySelector", selWeightEl);
      if(selWeightEl && selWeightEl!=null && typeof selWeightEl !=='undefined'){
        selWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
      }
    },500);
  }catch(e){
    console.log("applyOnSel",e)
  }
}
guestSubmit(){
  let me=this;
  let formObj=this.guestForm.value;
  let error=[];
  if(formObj['age']==null || formObj['age']=='' || formObj['age']<10 || formObj['age']>100){
    error.push('Age should be between 10-100');
  }
  if(formObj['body_weight']==null || formObj['body_weight']=='' || formObj['body_weight']<25){
    error.push('Weight should be greaterthen 25');
  }
  if(formObj['fitness_level']==null || formObj['fitness_level']==''){
    error.push('Fitness Level is required');
  }
  if(formObj['gender']==null || formObj['gender']==''){
    error.push('Gender is required');
  }
  if(formObj['weight_unit']==null || formObj['weight_unit']==''){
    formObj['weight_unit']='KG';
  }


  if(error.length>0){
    console.log('Error',error);
     me.restProvider.alert(error.join('<br>'));
  }else{
    console.log('GO to Submit');
     let device=me.restProvider.getDeviceInfo();

     formObj['device_type']=device['device_type'];
     formObj['device_token']=device['device_token'];
     formObj['RequestType']='GUEST';
     me.restProvider.showLoader();
     me.restProvider.api_method('post','register',formObj,'null').subscribe((data)=>{
       me.restProvider.dismissLoader();
       me.apiData=data;

       if(me.apiData.status === 'success'){
         me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiData.success.id+'/ios',null,null).subscribe((r)=>{
            console.log('runnn',r);
          })
          me.storage.set('Id', me.apiData.success.id);
          me.storage.set('USER_Id', me.apiData.success.id);
          me.storage.set('Name', me.apiData.success.name);
          me.storage.set('Email', me.apiData.success.email);
          me.storage.set('USERPROFILE', me.apiData.success);
          me.storage.set('ShowGuestMsg',me.apiData.success.id);
          me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
          /*if(me.apiData.success.email=='' || me.apiData.success.email==null || me.apiData.success.email=='NULL'){
              me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
          }else{
              me.zone.run(() => { me.navCtrl.navigateRoot('/tabs/tab1');});
          }*/

       }else{
         me.restProvider.alert(me.apiData.message);
       }

     },error=>{
       me.restProvider.dismissLoader();
     });
  }

}
setmaxlen(e,maxl=2) {
  let myval = e.currentTarget.value;
  return maxl<myval.length ? false : true;
}
guest_back_to_login(){

  this.user_login=true;
  this.guest_user=false;

}


clear_guest_user(){
  this.storage.remove('GUESTPROFILE').then(() => {});
}

}
