import { Component, ViewChild ,OnInit,Inject ,NgZone,HostListener} from '@angular/core';
//import { HostListener } from "@angular/core";
//import { IonContent } from '@ionic/angular';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Platform, NavController, MenuController, ToastController, AlertController,LoadingController, Events,IonContent,ModalController,NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePage } from './../modal/image/image.page';
import { PaymentPage } from './../payment/payment.page';
//import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras} from '@angular/router';
import { DOCUMENT} from '@angular/common';
import { Media } from '@ionic-native/media/ngx'
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
// import {CloudProvider} from '../providers/cloud/cloud';


//import { ApplePay } from '@ionic-native/apple-pay/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

    mydata:any;
    checkUser_payment:any;
    warmupdata:any;
    plansdata:any;
    aboutdata:any;
    warmup_dtl:any;
    freePlan:any;
    warmupMainScreen:any;
    scroll:any=0;
    plan_id:any='';
    background_img:any='../assets/images/warmup_cover.jpg';
    audioFile: any;
    _fileList;

    skeleton_show:boolean=true;
    skeletonCloud_show:boolean=false;
    apiResult:any;
    userInfo:any;
    moveToPlan:any;
    meGuest:any;
    FCM_token:any;
    @Inject(DOCUMENT) document:HTMLElement;
    @ViewChild(IonContent,null) content: IonContent;
    scrHeight:any;
    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.scrHeight = window.innerHeight-120;
    }

    // Constructor
    constructor(public restProvider:RestapiProvider,
                public navCtrl: NavController,
                public menuCtrl: MenuController,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                private formBuilder: FormBuilder,
                private zone         : NgZone,
                public events:Events,
                public storage:Storage,
                public modalController: ModalController,
                public router       : Router,
                public route        : ActivatedRoute,
                private fileChooser: FileChooser,
                private media: Media,
                private fcm          : FCM,
                public file: File,
                // public cloudProvider : CloudProvider,
                //private applePay: ApplePay
              ) {
                this.getScreenSize();
                this.fcm.getToken().then(token => {
                       console.log('token::',token);
                       this.FCM_token=token;
                });
    }
    check(){
      this.restProvider.getData();
    }
    checkSong(){
      this._fileList = [];
      // this.getMp3();
      // require("../../../node_modules/cordova-plugin-applemusic")
        // this.cloudProvider.getApplePlayList(function(data:any){
        //   console.log('Final responce Playlist:::', JSON.stringify(data));
        // });
    }

    getMp3() {
      // this.file.checkDir(this.file.	syncedDataDirectory, 'downloads')
      // .then(_ => console.log('Directory exists')).catch(err =>
      //            console.log('Directory doesnt exist'));
     this.file.listDir(this.file.syncedDataDirectory, '').then((result) => {
       console.log('function run::', JSON.stringify(result));
       for (let item of result) {
         if (item.isDirectory == true && item.name != '.' && item.name != '..')
     {
            console.log('get file::', JSON.stringify(item));
           this.getFileList(item.name);
         }
         else if (item.isFile == true) {
           this.saveFileToArray(item);
         }
       }
     },
       (error) => {
         console.log('Error:::',error);
       });
    }

    saveFileToArray(item) {
     let extn = item.fullPath.split(".").pop();
      if (extn == 'mp3' || extn == 'm4a') {
       console.log("mp3 found");
       this._fileList.push({
       name: item.name,
       path: item.fullPath
     })
     }
    }

    public getFileList(path: string): any {
     let file = new File();
      this.file.listDir(file.externalRootDirectory, path)
      .then((result) => {
       for (let item of result) {
         if (item.isDirectory == true && item.name != '.' && item.name != '..')
        {
           this.getFileList(path + '/' + item.name);
         }
         else {
           this.saveFileToArray(item);
         }
       }
     }, (error) => {
       console.log(error);
     })
    }



  checkSpotify(){
    let me= this;
    me.restProvider.getSpotifyPlaylist(function(r:any){
      console.log('getSpotifyPlaylist:::',r);
    });
  }
  checkApplePay(){
    let me= this;//Train of Thought Fitness
    let item:any=[{label: '3 x Basket Items',amount: 4.99}];
    /*me.restProvider.makePaymentByApplePay(item,'USD',function(status:any,message:any){

      me.restProvider.api_method('post','testRes',{status:status,res:JSON.stringify(message)},null).subscribe((data)=>{
          me.restProvider.alert(JSON.stringify(message));
      },error=>{
        me.restProvider.alert(JSON.stringify(message));
      });
    });*/
  }

  doRefresh(event) {
    this.warmup_data();
    setTimeout(() => {
      event.target.complete();
    }, 3000);
  }
  ngOnInit() {
    this.checkUser();
  }
  checkUser(){
    let me=this;
    console.log('checkUser');
    //me.restProvider.showLoader();
    me.storage.get('Id').then((userID) => {
      if (!userID) {
        me.updateConfig();
        //me.isGuestUser();
      }else{
        me.restProvider.api_method('get','checkUserConfig/'+userID,null,null).subscribe((data)=>{
          //me.restProvider.dismissLoader();
          me.apiResult=data;
          if(me.apiResult['status']==='success'){
            me.userInfo=me.apiResult.success;
            me.restProvider.api_method('get','updateFCM/'+me.FCM_token+'/'+me.apiResult.success.id+'/ios',null,null).subscribe((r)=>{
              console.log('runnn',r);
            })
            me.storage.set('Id', me.apiResult.success.id);
            me.storage.set('USER_Id', me.apiResult.success.id);
            me.storage.set('Name', me.apiResult.success.name);
            me.storage.set('Email', me.apiResult.success.email);
            me.storage.set('USERPROFILE', me.apiResult.success);
            me.restProvider.setUserInfo(me.userInfo);
          }else{
            me.updateConfig();
          }
          //me.isGuestUser();
          //console.log('checkUserConfig/',me.apiResult);
        },error=>{
          //me.restProvider.dismissLoader();
          me.updateConfig();
          //me.isGuestUser();
        });
      }
   });
  }
  ionViewWillEnter() {
    let me=this;
    me.userInfo=me.restProvider.getUserInfo();
    console.log('ionViewWillEnter',me.userInfo);
    if(typeof me.userInfo==='undefined'){me.checkUser();}
    me.warmup_data();
    me.isGuestUser();
  }
  isGuestUser(){
    let me=this;
    setTimeout(function(){
      me.storage.get('ShowGuestMsg').then((ShowGuestMsg) => {
        if(ShowGuestMsg){
          me.storage.remove('ShowGuestMsg').then(() => {
            me.showGuestMsg();
          });
        }
      });
    },500);
  }
 warmup_data(){
     // this.restProvider.showLoader();
      let me=this;
       this.restProvider.api_method('get','warmup',null,null).subscribe((data)=>{
           this.mydata=data;
           if(data['message']==='success'){
              this.warmupdata=data['warmup'];
              this.aboutdata=data['about'];
              this.plansdata=data['plan'];
              this.freePlan=data['free_trail'];
              this.warmupMainScreen=data['warmup_screen'];
              // console.log(this.warmupdata);
            }else if(data['message']==='error'){
                 this.warmupdata='';
                 this.aboutdata='';
                 this.plansdata='';
                 this.mydata='';
                 this.freePlan=false;
                 this.warmupMainScreen=false;
            }
            // Start : move scroll to plan section when it will come from another page
            setTimeout(function(){
              me.route.queryParams.subscribe(params => {
                  //console.log('this.queryParams',params);
                  if(params["moveToPlan"] && params["moveToPlan"]=='true'){
                    me.ScrollToBottom();
                  }
              });
            },500);
            // End : move scroll to plan section when it will come from another page

        },error=>{
          console.log('error', error);
          this.set_timer();
        // this.restProvider.dismissLoader();
      });

 }
 async showGuestMsg(){
   let me=this;
   if(me.meGuest)return;
   me.meGuest = await me.alertCtrl.create({
     header: 'Complete Your Profile',
     message: "Thanks for joining us, please complete your profile so you can get access all feature's",
     buttons: [
       {
         text: "I'll do it later",
         role: 'cancel',
         cssClass: 'secondary',
         handler: (blah) => {
           me.meGuest=null;
         }
       }, {
         text: "Let's do it now",
         handler: () => {
           me.meGuest=null;
           me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
         }
       }
     ]
   });


   await me.meGuest.present();
 }
 async showSubscribeMessage(){
   let me=this;
   const alert = await me.alertCtrl.create({
     header: 'Congratulation',
     message: "Thanks for joining us, your subscribed plan is activated from now",
     buttons: [
        {
         text: "got it!",
         handler: () => {
           me.zone.run(() => { me.navCtrl.navigateRoot('paymenthistory');});
         }
       }
     ]
   });

   await alert.present();
 }
 set_timer(){
   let me=this;
   setTimeout(function() {
    console.log('10 sec');
    me.skeleton();
    me.resCall();
   }, 7000);
 }
 resCall(){
   let me=this;
    setTimeout(function() {
     me.warmup_data();
    }, 2000);
 }
 skeleton(){
     this.skeleton_show=   false;
     this.skeletonCloud_show=   true;
 }


  ScrollToBottom(){
    //this.scroll=0;
    //this.content.scrollToBottom(1500);
    let me=this;
    let yOffset = 0;
    if(document.getElementById('cardAbout')){
       yOffset = document.getElementById('cardAbout').offsetTop;
    }
    this.scroll = yOffset;
    this.content.scrollToPoint(0, yOffset, 1800);
    //cardAbout
    console.log('this.scroll',this.scroll);
    this.moveToPlan=null;
  }
  alert(){
      let msg='Already subscribed';
      this.restProvider.alert(msg);
  }

  onScroll(event){
    let yOffset = 0;
    let scrollTop=event.detail.scrollTop;
    if(document.getElementById('cardAbout')){
       yOffset = document.getElementById('cardAbout').offsetTop;
    }
    let getTens=function(num,m=0){
      if(num>0){
        let placeValue = 1;
        let numStr= num.toString(10).split("");
        for(let i=0;i<(numStr.length-1);i++)placeValue *= 10;
        num = parseInt(numStr[0])*placeValue;
        if(m>0)num =num-placeValue;
      }
      return num;
    }
    if(getTens(scrollTop,0)>getTens(yOffset,1)){
      this.scroll=yOffset;
    }else{
      this.scroll=0;
    }
    //console.log(scrollTop,"logScroll : ",getTens(scrollTop,0),":::",this.scroll,':scroll:',getTens(yOffset,1));
  }
  async applySubscribePlan(objData){
    let me=this;
    console.log('applySubscribePlan:::',objData);
    const modal = await me.modalController.create({
      component: PaymentPage,
      componentProps: objData
    });
    return await modal.present();
  }
  applyFreeSubscriptionPlan(objData){
    let me=this;
    if(typeof objData === 'undefined' || typeof objData.planType === 'undefined') {
      me.restProvider.alert('Sorry! Unable to find selected plan');
      return ;
    }
    let postObj={
      user_id        : objData.userID,
      plan_id        : objData.planType,
      transaction_id : 'Free-Plan-'+Math.random()*100000000000000000,
      amount         : 0,
      payment_mode   :'FREE-PLAN-SUBSCRIPTION',
      currency       : 'USD'
    };
    console.log('plan_id',objData.planType);
    console.log('user_id',objData.userID);
    me.restProvider.showLoader();
    me.restProvider.api_method('post','buyPlan',postObj,null).subscribe((data)=>{
        me.restProvider.dismissLoader();
        me.apiResult=data;
        if(me.apiResult['status']==='success'){
          //me.zone.run(() => { me.navCtrl.navigateRoot('paymenthistory');});
          me.showSubscribeMessage();
        }else{
          me.restProvider.alert(me.apiResult['message']);
        }
    },error=>{
      console.log('error',error);
      me.restProvider.dismissLoader();
      me.restProvider.alert('Sorry! Unable to process your request');
    });

  }
  checkSubscribePlan(objData){
      let me=this;
      if(typeof objData === 'undefined' || typeof objData.planType === 'undefined') {
        me.restProvider.alert('Sorry! Unable to find selected plan');
        return ;
      }
      me.restProvider.showLoader();
      me.restProvider.api_method('get','get_plan_detail/'+objData['planType'],null,null).subscribe((data)=>{
        me.restProvider.dismissLoader();
        //console.log('get_plan_detail:::',data);
        if(data['status']==='success'){
          objData['planDetail']=data['plan'];
          me.applySubscribePlan(objData);
        }else{
          me.restProvider.alert('Sorry! Unable to find selected plan');
        }
      },error=>{
        me.restProvider.dismissLoader();
        me.restProvider.alert('Sorry! Unable to find selected plan');
      });
  }
  async askForCompleteProfile(){
    let me=this;
    const confirm = await me.alertCtrl.create({
      header: 'Subscribe Plan',
      message: "Please Complete your profile detail first, would you like to complete your profile now?",
      buttons: [
         {
          text: "I'll do it later",
          handler: () => {

          }
        },
        {
         text: "Let's do it now",
         handler: () => {
           me.zone.run(() => { me.navCtrl.navigateRoot('/editprofile');});
         }
       }
      ]
    });

    await confirm.present();
  }
  subscribePlan(id){
    let me=this;
    me.storage.get('USERPROFILE').then((userObj) => {
      console.log('USERPROFILE',userObj);
      if(userObj && userObj.id >0 ){
          if(userObj.isProfileCompleted>0){
            if(id=='FREE'){
                me.applyFreeSubscriptionPlan({userID:userObj.id,planType:id});
            }else{
                me.checkSubscribePlan({userID:userObj.id,planType:id});
            }
          }else{
            me.askForCompleteProfile();
          }

      }else{
        me.restProvider.alert('Sorry! Unable to find selected plan');
      }
    });
  }
  updateConfig(){
    let me=this;
    me.storage.get('USERPROFILE').then((userObj) => {
      if (userObj) {
        userObj['plan_id']=0;
        userObj['isFeatureEnabled']=0;
        me.storage.set('USERPROFILE',userObj);
        me.restProvider.setUserInfo(userObj);
      }
    });
  }



   async presentModal(id) {
      // console.log(id);
       this.restProvider.showLoader();
       this.restProvider.api_method('get','get_warmup_detail/'+id,null,null).subscribe((data)=>{ // this.restProvider.dismissLoader();
       console.log(data);

       if(data['status']==='success'){
          this.restProvider.dismissLoader();
          this.warmup_dtl=data['warmup'];
          let heading='Warmup';
          this.restProvider.present_Modal(this.warmup_dtl,heading,null);
        }else if(data['status']==='error'){
           this.restProvider.dismissLoader();
        }
      },
      error=>{
         this.restProvider.dismissLoader();
        console.log('error', error);
      });

  }

   async presentVideo(id) {
      // console.log(id);

      this.restProvider.showLoader();
       this.restProvider.api_method('get','get_warmup_vids_detail/'+id,null,null).subscribe((data)=>{
       console.log(data);
       if(data['status']==='success'){
          this.restProvider.dismissLoader();
          const navigationExtras: NavigationExtras = {
            state : {
              data : data,
              vid_type:'warmup'
            }
          };
          this.zone.run(() => {
            this.router.navigate(['full-video'], navigationExtras);
          });

        }else{
           this.restProvider.alert('video not found');
           this.restProvider.dismissLoader();
        }
      },
      error=>{
         this.restProvider.dismissLoader();
         this.restProvider.alert('Oops something went wrong');
         console.log('error', error);
      });

  }






}
