import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController,LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiProvider } from  '../providers/restapis/restapis';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.page.html',
  styleUrls: ['./paymenthistory.page.scss'],
})
export class PaymenthistoryPage implements OnInit {
  payment_history:any;
  userID:any;
  constructor(public navCtrl:NavController,
    public storage:Storage,
    public restProvider:RestapiProvider) {

    }

   ngOnInit() {

   }

  ionViewWillEnter() {
    let me=this;
    me.restProvider.showLoader();
    me.storage.get('Id').then((userID) => {
       me.userID=userID;
       console.log('this.userInfo',me.userID);
       me.restProvider.api_method('get','payment_history/'+me.userID,'null','null').subscribe((data)=>{
         console.log('payment_history/',data);
         me.restProvider.dismissLoader();
         if(data['status']=='success'){
           this.payment_history=data['data'];
         }else{
           me.restProvider.alert(data['message']);
           me.navCtrl.navigateRoot('/tabs/tab4');
         }
       },error=>{
         console.log('payment_history/ EEORR:',error);
         me.restProvider.dismissLoader();
         me.restProvider.alert("Sorry! you haven't make any payment yet!!");
         me.navCtrl.navigateRoot('/tabs/tab4');
       });
    });
  }

 navigaToback(){
  		this.navCtrl.navigateRoot('/tabs/tab4');
  }

}
