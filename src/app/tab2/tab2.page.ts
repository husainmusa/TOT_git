import { Component ,OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePage } from './../modal/image/image.page';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { NavController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {
      segmentCategory=1;
      mydata:any;
      workoutdata:any;
      visibleWorkoutData:any=[];
      workout_dtl:any;
      checkUser_payment:any=0;
      apiResult:any;
      userInfo:any;
      segments=[];
      ind=1;
      // 'Warmups','Streching','Strech and Conditioning'
      constructor(
        public modalController : ModalController,
        public restProvider    : RestapiProvider,
        public navCtrl         : NavController,
        public menuCtrl        : MenuController,
        public toastCtrl       : ToastController,
        public alertCtrl       : AlertController,
        public loadingCtrl     : LoadingController,
        private formBuilder    : FormBuilder,
        public events          : Events,
        public storage         : Storage) {

     }


   doRefresh(event) {
        this.get_data();
        setTimeout(() => {
          event.target.complete();
        }, 2000);
    }

  ionViewWillEnter() {

  }
  ngOnInit() {
    let me=this;
    me.checkUser(function(){
       me.get_data();
    });
    //this.checkUser();
  }
  checkUser(callback=null){
    let me=this;
    //console.log('checkUser');
    me.restProvider.showLoader();
    me.storage.get('Id').then((userID) => {
      if (!userID) {
        me.updateConfig();
        if(callback)callback(me.userInfo);
      }else{
        me.restProvider.api_method('get','checkUserConfig/'+userID,null,null).subscribe((data)=>{
          me.restProvider.dismissLoader();
          me.apiResult=data;
          //console.log('checkUserConfig',me.apiResult);
          if(me.apiResult['status']==='success'){
            me.userInfo=me.apiResult.success;
            me.restProvider.setUserInfo(me.userInfo);
          }else{
            me.updateConfig();
          }
          if(callback)callback(me.userInfo);
          //console.log('checkUserConfig/',me.apiResult);
        },error=>{
          me.restProvider.dismissLoader();
          me.updateConfig();
          if(callback)callback(me.userInfo);
        });
      }
   });
  }
  segmentChanged(event){
    // console.log(+event.detail.value);
    this.ind= +event.detail.value;
    this.visibleWorkoutData=this.workoutdata[this.ind];
    // console.log(this.ind);
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
  get_data(){
    this.restProvider.showLoader();
    this.restProvider.api_method('get','workout',null,null).subscribe((data)=>{
        this.restProvider.dismissLoader();
         console.log(data);
        this.mydata=data;
        if(data['message']==='success'){
          //this.workoutdata=data['workout'];
          this.segments=data['workout']['tab_category'];
          this.ind=data['workout']['tab_category'][0]['tab_id'];
          this.workoutdata=data['workout']['workout'];
          this.visibleWorkoutData=data['workout']['workout'][1];
        // console.log(this.workoutdata);
          setTimeout(()=>{
            document.getElementById(this.segments[0].tab_id).click();
          },300);
        }else{
          this.workoutdata='';
          this.mydata='';
        }
    },error=>{
      console.log('error', error);
      this.restProvider.dismissLoader();
    });

  }

  async presentModal(id) {
      // console.log(id);
      this.restProvider.getApp('','');
    this.restProvider.showLoader();
    this.restProvider.api_method('get','get_workout_detail/'+id,null,null).subscribe((data)=>{

      if(data['status']==='success'){
        this.restProvider.api_method('get','get_workout_vids_detail/'+id,null,null).subscribe((detail)=>{

          this.workout_dtl=data['workout'];
          // this.workout_dtl=this.workout_dtl.concat(detail);
          console.log('this.workout_dtl,detail',this.workout_dtl,detail)
          this.restProvider.present_Modal(this.workout_dtl,detail,'Workout',null);
          this.restProvider.dismissLoader();
          },error=>{
            this.restProvider.dismissLoader();
            console.log('get_workout_detail error::', error);
          });
      }else{
        this.restProvider.dismissLoader();
      }

    },error=>{
      this.restProvider.dismissLoader();
      console.log('get_workout_detail error::', error);
    });

  }

  check_type(type,id){
    // console.log(type);

    this.restProvider.getApp('','');
    if(type==0){
            let msg='Please subscribe our plans for paid videos';
            this.restProvider.alert(msg);
            this.navCtrl.navigateRoot('/tabs/tab1');
    }else{
       this.restProvider.api_method('get','get_workout_detail/'+id,null,null).subscribe((data)=>{ // this.restProvider.dismissLoader();

       if(data['status']==='success'){
          this.workout_dtl=data['workout'];
            let heading='Workout';
          this.restProvider.present_Modal(this.workout_dtl,heading,null);
        }else if(data['status']==='error'){

        }
      },
      error=>{
        console.log('error', error);
      });
    }

  }



}
