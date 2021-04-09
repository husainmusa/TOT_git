import { Component, OnInit ,NgZone} from '@angular/core';
import { NavController, MenuController, ToastController, AlertController,
         LoadingController, Events,PopoverController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { RestapiProvider } from  '../../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    public appID: string = '5189d825db2284';
    public apiKey: string = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';

  constructor(public navCtrl:NavController,
    public storage:Storage,
    private googlePlus: GooglePlus,
    public restProvider:RestapiProvider,
    public popoverCtrl: PopoverController,
     private zone: NgZone,
     private fb: Facebook,) { }

  ngOnInit() {
  }

  async  goToPaymentHistory(){
      this.popoverCtrl.dismiss();
        this.zone.run(() => {
                this.navCtrl.navigateRoot('/paymenthistory');
            });

  }
    navigatoEditprofile(){
    	 this.popoverCtrl.dismiss();
         this.zone.run(() => {
                this.navCtrl.navigateRoot('/editprofile');
            });

  }
    logout(){
  	// console.log('working');
    let me =this;
  	this.popoverCtrl.dismiss();
    me.storage.clear().then(() => {
      me.googlePlus.logout().then(res =>{}, err =>{console.log(err);});
      me.fb.logout().then(res => {console.log('fb log res',res);}, err => {console.log('fb logout error',err);});
      
      me.storage.remove('Id').then(() => {
          me.storage.remove('USERPROFILE').then(() => {
            me.storage.remove('USER_Id');
            me.storage.remove('Name');
            me.storage.remove('Email');
            me.storage.remove('USER_ID');
            me.zone.run(() => {
                me.navCtrl.navigateRoot('/login');
            });
          });
      });



    });

  }


  async logoutCometChat(){

      CometChat.logout().then(() => {
        console.log('Logout completed successfully');
        // this.router.navigate(['login']);
      }, error => {
        console.log('Logout failed with exception:', {error});
      });

   }

}
