import { Component ,OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePage } from './../modal/image/image.page';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { NavController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
heading:any;
content:any;
techniquedata:any;
tenique_dtl:any;

  constructor(public modalController: ModalController,
              public restProvider:RestapiProvider,
              public navCtrl: NavController,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              public events:Events,
              public storage:Storage,) {}


     doRefresh(event) {
      // console.log('Begin async operation');
          this.get_data();
          setTimeout(() => {
            // console.log('Async operation has ended');
            event.target.complete();
          }, 2000);
    }
   ionViewWillEnter() {
      this.get_data();
   }
   ngOnInit() {
        this.get_data();
   }
   get_data(){
        this.restProvider.showLoader();
        this.restProvider.api_method('get','technique',null,null).subscribe((data)=>{
        this.restProvider.dismissLoader();
           // console.log(data);
           this.techniquedata=data;
           // console.log(this.techniquedata);
           if(data['status']==='success'){
              this.techniquedata=data['technique'];
              // console.log(this.techniquedata);
            }else if(data['status']==='error'){
              console.log('error_api',data['status']);
            }

        },
        error=>{
          console.log('error', error);
          this.restProvider.dismissLoader();
        });

   }
  async presentModal(id) {
      // console.log(id);
       this.restProvider.showLoader();
       this.restProvider.api_method('get','get_technique_detail/'+id,null,null).subscribe((data)=>{ // this.restProvider.dismissLoader();
       console.log('get_technique_detail/',data);
       if(data['status']==='success'){
          this.tenique_dtl=data['technique'];
          this.restProvider.present_Modal(this.tenique_dtl,'Technique',null);
          this.restProvider.dismissLoader();
        }else{
           this.restProvider.dismissLoader();
        }
      },
      error=>{
         this.restProvider.dismissLoader();
        console.log('error', error);
      });

  }




}
