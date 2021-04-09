import { Component, OnInit ,NgZone} from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { CometChat } from '@cometchat-pro/chat';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popoverpage/popoverpage';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['../tab1/tab1.page.scss'],
})

export class Tab5Page implements OnInit {
  //CometChat variables
  public userUID: string;
  public appID: string = '5189d825db2284';
  public apiKey: string = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';

  //variables
  public checkUser : boolean=false;
  public coachForm : FormGroup;
  public user_id   : any;
         apiData   : any;
         chat_data : any;
         hasSubscription : any;

  constructor(public  navCtrl      : NavController,
              public  storage      : Storage,
              public  restProvider : RestapiProvider,
              private formBuilder  : FormBuilder,
              private zone         : NgZone,
              private loadingController: LoadingController,
              private alertController  : AlertController,
              private router           : Router,
              public  popoverCtrl       : PopoverController,
              ){
                this.coachForm = this.formBuilder.group({
                    'user_id'   : [null],
                    'message'   : [null, Validators.compose([Validators.required])],
                });
                this.hasSubscription=0;
              }

  doRefresh(event) {

  }


  ionViewWillEnter(){
    let me=this;
    me.storage.get('USERPROFILE').then((userObj) => {
      console.log('USERPROFILE',userObj);
      me.chat_data=true;
      if(userObj && userObj.id >0 ){
            me.user_id=userObj.id;
            me.hasSubscription=userObj.hasSubscription;
            me.coachForm.patchValue({
                user_id : userObj.id
            });

      }else{
        me.restProvider.alert('Sorry! Unable to find selected plan');
      }
    });
  }

  ngOnInit() {

  }

  sendCoach(){
     let me=this;
     let msg='';
     console.log(this.coachForm.value);
     me.coachForm.patchValue({
         user_id : me.user_id
     });
     if(this.coachForm.value['message']=='' || this.coachForm.value['message']==null){
       this.restProvider.alert('Please Enter your query');return;
     }
      this.restProvider.showLoader();
      this.restProvider.api_method('post','ask_a_question',this.coachForm.value,'null').subscribe((data)=>{
          this.restProvider.dismissLoader();

          this.apiData=data;
          if(this.apiData.status === 'success'){
            this.coachForm.reset();
            msg='Message Sent';
          }else{
            msg='Oops Something Went Wong !!';
          }
          this.restProvider.alert(msg);

        },error=>{
          this.restProvider.dismissLoader();
      });

  }


  async openMenu(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent
    });
    popover.present();
  }

}
