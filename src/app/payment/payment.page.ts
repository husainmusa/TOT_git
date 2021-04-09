import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, MenuController, ToastController,AlertController,LoadingController, Events,ModalController ,NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const payPalConfig = environment.payPalConfig;
const paypalMode = environment.paypalMode;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  public responseAPI: any;
  public userID: any;
  public planDetail: any;
	constructor(public restProvider:RestapiProvider,
      				public navCtrl: NavController,
      				public menuCtrl: MenuController,
      				public toastCtrl: ToastController,
      				public alertCtrl: AlertController,
      				public loadingCtrl: LoadingController,
      				public formBuilder: FormBuilder,
      				public events:Events,
      				public storage:Storage,
      				public zone: NgZone,
              public payPal: PayPal,
              public navParams: NavParams,
              public modalController :ModalController
  ){
    console.log('navParams::',this.navParams);
    this.userID=this.navParams.get('userID');
    this.planDetail=this.navParams.get('planDetail');
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
	ngOnInit() {

	}
  ionViewWillEnter() {

  }
  applySubscription(paymentObj){
     let me = this;
     let postObj={
       user_id        : me.userID,
       plan_id        : me.planDetail.plan_id,
       transaction_id : '',//paymentObj.id,
       amount         : me.planDetail.actual_amt,
       payment_mode   :'APPLE_PAY',
       currency       : me.planDetail.plan_currency,
       response_json  : paymentObj
     };
     me.restProvider.showLoader();
     me.restProvider.api_method('post','buyPlan',postObj,null).subscribe((data)=>{
         me.restProvider.dismissLoader();
         me.responseAPI=data;
         if(me.responseAPI['status']==='success'){
           me.cancelPayment();
           //me.navCtrl.navigateRoot('paymenthistory');
           me.showSubscribeMessage();
         }else{
           me.restProvider.alert(me.responseAPI['message']);
         }
     },error=>{
       me.restProvider.dismissLoader();
       me.restProvider.alert('Sorry! Unable to process your request');
     });
  }
  userPayment_applepay(){
    let me= this;//Train of Thought Fitness
    let item:any=[{label: 'Subscribe Plan For '+me.planDetail.plan_duration,amount: me.planDetail.actual_amt}];
    me.restProvider.makePaymentByApplePay(item,me.planDetail.plan_currency,function(status:any,message:any){

      if(status==true){
        me.applySubscription(JSON.stringify(message));
      }else{
        me.restProvider.alert(JSON.stringify(message));
      }
    });
  }
	userPayment(){
	    let me = this;
      const payPalConfig = environment.payPalConfig;
      const paypalMode = environment.paypalMode;
      me.payPal.init(payPalConfig).then((ready) => {
        me.payPal.prepareToRender('PayPalEnvironmentSandbox',new PayPalConfiguration({acceptCreditCards:false})).then((s) => {
          let payment = new PayPalPayment(me.planDetail.actual_amt, me.planDetail.plan_currency, 'Subscribe Plan For '+me.planDetail.plan_duration, 'sale');
          me.payPal.renderSinglePaymentUI(payment).then((paymentDetail) => {
            console.log('SUC Payment Paypal ::',paymentDetail);
            me.responseAPI=paymentDetail;
            if(me.responseAPI.response.id){
              me.applySubscription(me.responseAPI.response);
            }else{
              me.restProvider.alert('Sorry! Unable to process payment request');
            }
          },(uiError)=>{
            // Error or render dialog closed without being successful
            console.log('Paypal Error or render dialog closed without being successful ::',uiError);
            me.restProvider.alert('Sorry! Unable to process payment request');
          });
        },(configError)=>{
          console.log('Paypal Error in configuration ::',configError);
          me.restProvider.alert('Sorry! Unable to process payment request');
        });
      },(readyError) => {
        console.log('paypal init error ::',readyError);
        me.restProvider.alert('Sorry! Unable to process payment request');
      });
  }

	goBack(){
		this.storage.remove('PLANDETAILS').then(() => {
		    this.navCtrl.navigateRoot('/tabs/tab1');
		});
	}
  cancelPayment(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
