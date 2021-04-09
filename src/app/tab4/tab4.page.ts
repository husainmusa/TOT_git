import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController,
         LoadingController, Events,PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NotificationsComponent } from './../components/notifications/notifications.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public checkUser:boolean=false;
  apiResult:any;
  userdetails:any;
  subscribedata:any;
  checkGuestUser:any;
  constructor(public navCtrl:NavController,
              public storage:Storage,
              public restProvider:RestapiProvider,
              public popoverCtrl: PopoverController,
              private googlePlus: GooglePlus,
              public alertController: AlertController
   ) { }

  ionViewWillEnter() {
    let me=this;
    me.restProvider.showLoader();
    me.storage.get('Id').then((userID) => {
        me.restProvider.api_method('get','user_plan_detail/'+userID,null,null).subscribe((data)=>{
          me.restProvider.dismissLoader();
          me.apiResult=data;
          if(me.apiResult['status']==='success'){
            me.checkUser=true;

            me.userdetails=me.apiResult.user;
            me.subscribedata=me.apiResult.plan;

            console.log('me.userdetails',me.userdetails);

            me.storage.set('Id', me.apiResult.user.id);
            me.storage.set('USER_Id', me.apiResult.user.id);
            me.storage.set('Name', me.apiResult.user.name);
            me.storage.set('Email', me.apiResult.user.email);
            me.storage.set('USERPROFILE', me.apiResult.user);
            me.restProvider.setUserInfo(me.userdetails);
          }else{
            me.checkUser=false;
            me.restProvider.alert(me.apiResult['message']);
          }
          //console.log('checkUserConfig/',me.apiResult);
        },error=>{
          me.checkUser=false;
          me.restProvider.dismissLoader();
          me.restProvider.alert('Sorry!Detail Not Found');
        });
   });

  }

  ngOnInit() {}

  navigatoEditprofile(){
  		this.navCtrl.navigateRoot('/editprofile');
  }
  backToLogin(){
    this.navCtrl.navigateRoot('/login');
  }
  backToRegister(){
    this.navCtrl.navigateRoot('/register');
  }
  goToPaymentHistory(){
      this.navCtrl.navigateRoot('/paymenthistory');
  }

  async notifications(ev?: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  async unSubscribeConfirm(subscribeID=0){
    let me=this;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to <strong>Unsubscribe</strong>?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            me.unSubscribePlan(subscribeID);
          }
        }
      ]
    });
    await alert.present();
  }

  unSubscribePlan(subscribeID=0){
    let me=this;
    me.restProvider.showLoader();
    me.restProvider.api_method('get','unsubscribe/'+subscribeID,null,null).subscribe((data)=>{
      me.restProvider.dismissLoader();
      me.apiResult=data;
      if(me.apiResult['status']==='success'){
        me.ionViewWillEnter();
        me.restProvider.alert('You are successfully unsubscribed');
      }else{
        me.restProvider.alert('Sorry!unable to process your request');
      }
      //console.log('checkUserConfig/',me.apiResult);
    },error=>{
      me.restProvider.alert('Sorry!unable to process your request');
    });

  }

}
