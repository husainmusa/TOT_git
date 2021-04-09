import { Component,NgZone } from '@angular/core';
import { NavigationExtras , Router } from '@angular/router';
import { PopoverController, NavController, LoadingController, AlertController  } from '@ionic/angular';
import { CometChat} from '@cometchat-pro/chat';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage'; 
import { environment } from '../../environments/environment';

const appID = environment.appID;
const apiKey = environment.apiKey;


@Component({
    template: `
      <ion-list>
      <ion-item (click)="chatViewPage()" color="light" class="">
        <p style="width:100%;">&nbsp;&nbsp;Live Chat</p>
      </ion-item>
      </ion-list>
    `,
   styles: [`.ion-list {
    &.list-ios {
        margin-bottom: 0;
    }
}`]
  })
  export class PopoverPage {

    // public userUID: string;
    // public appID: string  = '5189d825db2284';
    // public apiKey: string = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';
    coachData:any;
    userData:any;
    constructor(
      private router       : Router,
      private popOverCtrl  : PopoverController,
      private navController: NavController,
      private zone         : NgZone,
      public  restProvider : RestapiProvider,
      public  storage      : Storage,
      private loadingController: LoadingController,


     ) {}

    ngOnInit(){
   
    }
    ionViewWillEnter(){   

    }

    chatViewPage(){
           CometChat.getLoggedinUser().then(
            user => {
              this.popOverCtrl.dismiss();
              console.log('Check Login:', { user });
              this.viewChat();
            },
            error => {
              this.popOverCtrl.dismiss();
              this.loginComChat();
              console.log('Login Error:', { error });
              // User login failed, check error and take appropriate action.
            }
          );
    }

    async viewChat(){

          const loading = await this.loadingController.create({
          message: 'Please Wait',
          spinner: 'dots',

          translucent: true
          });
          loading.present();

        CometChat.getUser('fitness_coach').then(
            user => {
                  console.log('Check Login:', { user });

                  this.userData = user;
                  const navigationExtras: NavigationExtras = {
                  state : {
                  user : this.userData
                  }
                  };
                  loading.dismiss();
                  this.zone.run(() => {
                    this.router.navigate(['tabs/tab5/chat-view'], navigationExtras);
                  });
              
            },
            error => {
              loading.dismiss();
              console.log('Login Error:', { error });
              let msg='Service Error:'+ error ;
              this.restProvider.alert(msg);
              // User login failed, check error and take appropriate action.
            }
        );
      
  }




  async loginComChat(){
 
        const loading = await this.loadingController.create({
        message: 'Please Wait',
        spinner: 'dots',

        translucent: true
        });
        loading.present();

        this.storage.get('USERPROFILE').then((userObj) => {
            if (userObj) {

              this.restProvider.api_method('get','cometChatCreateUser/'+userObj.name+'/'+userObj.id,null,null).subscribe((data)=>{
              if(data['status']==='success'){
                console.log(data['message']);
                // loading.dismiss();
                let UID =userObj.id;
                 CometChat.login(UID,apiKey).then(
                    user => {
                      loading.dismiss();
                      console.log('Login Successful:', { user });
                      this.viewChat();
                    },
                    error => {

                      loading.dismiss();
                      console.log('Login Error:',error.message);
                      // User login failed, check error and take appropriate action.
                    }
                  );
                
              }else if(data['status']==='error'){
                loading.dismiss();
                let $msg='error Something bad happened; please try again later';
                this.restProvider.alert($msg);
                this.router.navigate(['tabs/tab5']);
              }
            },
            error=>{
            loading.dismiss();  
            let $msg='server error:'+error;
            this.restProvider.alert($msg);
            console.log('error', error);
            });
              
            }else{
               this.zone.run(() => {
                  this.router.navigate(['login']);
                });
            }
       
         });  

}


    // coachStatus(){
      
    //       CometChat.getUser('fitness_coach').then(
    //       user => {
    //         console.log('User details fetched for user:', user);
    //         this.coachData=user['status'];
    //         console.log(this.coachData);
    //       },
    //       error => {
    //         console.log('User details fetching failed with error:', error);
    //       }
    //       );
    // }
 
  
}
