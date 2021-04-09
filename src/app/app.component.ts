import { Component } from '@angular/core';
import {Platform,LoadingController ,AlertController ,Events,ModalController ,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

const appID = environment.appID;
const apiKey = environment.apiKey;
declare var window:any;
declare var cordova:any;
declare var ApplePay:any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress :any;
  timePeriodToExit :any;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    public events: Events,
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController,
    private fcm: FCM,
    public toastController: ToastController,
    private network: Network

  ) {
    let me=this;
    this.platform.ready().then(() => {

      if(this.platform.is('ios')){

        if(typeof window!=='undefined'){
          window.addEventListener('keyboardDidShow', (event) => {
              console.log('calling window key show event::::',event.keyboardHeight,document);
              if(document && typeof document.body!=='undefined'){
                //document.body.classList.add('keyboard-is-open');
              }
          });
          window.addEventListener('keyboardDidHide', () => {
            console.log('calling window key hide event::::',document);
            if(document && typeof document.body!=='undefined'){
              document.body.classList.remove('keyboard-is-open');

            //if we want to remove display tab-bar animation then comment to the bellow line
            //document.body.classList.add('keyboard-is-opened');
            }
          });
        }

      }
    });
     fcm.onNotification().subscribe(data => {
      if (data.wasTapped ) {
        //Notification was received on device tray and tapped by the user.
        console.log('in backqround',data);
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        console.log('in foreground',data);
        me.presentToast(data.title,data.body);
      }
    });
    this.initializeApp();
  }

  confirmExitApp(){
    let me=this;
    this.alertController.create({
      header      : 'Train of Thought Fitness',
      message     : '<p>Are you sure want to exit from app?</p>',
      cssClass    : 'my-custom-popup',
      buttons     : [
        {
          text: "CANCEL",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: "Close",
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    }).then(alert =>{alert.present();});
  }

  initializeApp() {
    // this.initializationCometChat();
    let me=this;

    this.lastTimeBackPress = 0;
    this.timePeriodToExit = 2000;

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.onDisconnect().subscribe(() => {
        this.presentAlert();
      });

      if(this.platform.is('cordova')){
          this.platform.backButton.subscribe(() => {
              let view = this.router.url;
              let baseViews=['/tabs/tab1','/tabs/tab2','/tabs/tab3','/tabs/tab4','/tabs/tab5'];
              if(baseViews.indexOf(view)!=-1){
                  if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                      me.confirmExitApp();
                  }else{
                    this.lastTimeBackPress = new Date().getTime();
                  }
              }
              console.log('this.view',view);
              this.navCtrl.pop();
          });
      }

    });
  }
    async presentToast(h,d){
    const toast = await this.toastController.create({
      header: h,
      message: d,
      position: 'top',
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // }, 
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No network connection !!',
      message:'Please check your connectivity',
      buttons: ['OK']
    });

    await alert.present();
  }



  // initializationCometChat(){
  //     CometChat.init(appID).then(
  //         hasInitialized => {
  //           console.log("Initialization completed successfully");
  //         },
  //         error => {
  //           console.log("Initialization failed with error:", error);
  //         }
  //     );
  //  }
}
