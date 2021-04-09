import { Injectable,NgZone , EventEmitter} from '@angular/core';
import {Platform,LoadingController ,AlertController ,Events,ModalController ,NavController } from '@ionic/angular';
import { Observable, of, throwError ,Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ImagePage } from './../../modal/image/image.page';
import { AppselectionPage } from './../../modal/appselection/appselection.page';
//import { ModalController ,NavController} from '@ionic/angular';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../environments/environment';
import { Network } from '@ionic-native/network/ngx';

import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import {  Router } from '@angular/router';

declare var cordova:any;
const appID = environment.appID;
const apiKey = environment.apiKey;
const serviceAPI = environment.serviceAPI;
const applePayMerchantID=environment.applePayMerchantID;
const stripeSecretKey=environment.stripeSecretKey;
const stripePublishableKey=environment.stripePublishableKey;

 

const httpOptions = {
 headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})

export class RestapiProvider {
  public events: EventEmitter<any>;
  public  url = serviceAPI;
  public id:any;
  public notification: string;
  private subject = new Subject<any>();
  public apiResponse:any;
  public inAppBrowserRef:any;
  userDetail:any;
  albums:any;
  selecedAlbum:any;
  selectApp:any;
  songSelected:any;
  spotifyTrackData:any;
  presentModalData={
         'data':{},
         'heading':{},
         'vid_Title':{},
       }
  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public modalController: ModalController,
              private zone: NgZone,
              private router: Router,
              private network: Network,
              private navCtrl: NavController,
              private platform: Platform,
              private applePay: ApplePay,
              private iab: InAppBrowser,
              private storage:Storage
              ) {
                this.events = new EventEmitter();
              }
    getData(){
      fetch("https://devru-raaga-v1.p.rapidapi.com/json/homepage-v3.asp?l=H", {
    	"method": "GET",
    	"headers": {
        "mode": "no-cors",
    		"x-rapidapi-host": "devru-raaga-v1.p.rapidapi.com",
    		"x-rapidapi-key": "1fede59132msh6756c5d889f8783p1ce0cajsn371453f5c2a3",

    	}
    })
    .then(response => {
    	console.log(response);
    })
    .catch(err => {
    	console.log(err);
    });
    }

  getDeviceInfo() {
    return {
      'device_type':'Android',
      'device_token':'ios-'+Math.random()*100000000000000000
    }
  }
  setUserInfo(userInfoObj: any) {
    this.userDetail=userInfoObj;
  }
  getUserInfo() {
    return this.userDetail;
  }
  sendMessage(message: string) {
        this.subject.next({ text: message });
  }
  getSplashScreenArray(callback) { //api_method('get','warmup',null,null)
    let me=this;
    me.api_method('get','splash_screen',null,null).subscribe((data)=>{
      me.apiResponse=data;
      callback(me.apiResponse.data ? me.apiResponse.data : []);
    },error=>{
        console.log('splash_screen EEEORRR:::',error);callback([]);
        me.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'No network connection !!',
      message:'Please check your connectivity',
      buttons: ['OK']
    });

    await alert.present();
  }
  getMessage(): Observable<any> {
        return this.subject.asObservable();
  }
  selectedSpotifyTrack(data){
    this.selecedAlbum=data;
    // console.log('hereSelect',data);
  }
  getAlbums(){
    // console.log('hereReturn',this.selecedAlbum);
    return this.selecedAlbum
  }
  getApp(app,status){
  this.selectApp=app;
  this.songSelected=status;
  }
  returnApp(){
    return this.selectApp;
  }
  getModalData(){
    return this.presentModalData;
  }
  getSpofityTrackDetail(){
    return this.spotifyTrackData;
  }

   //loading
  isLoading = false;

  async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 5000,
      spinner: 'circles',
      cssClass: 'custom-loading'
    }).then(a => {
      a.present().then(() => {
        console.log();
        if (!this.isLoading) {
          a.dismiss().then(() =>
           console.log()

           );
        }
      });
    });
  }

  async dismissLoader() {
    // return await this.loadingCtrl.dismiss().then(() => console.log());
    try{
      if(this.isLoading==true){
        this.isLoading = false;
        return await this.loadingCtrl.dismiss();
      }
    }catch(e){ console.log('dismissLoader::',e) }
  }

     //loading
  isLoading_payment = false;

  async showLoaderPayment() {
    this.isLoading_payment = true;
    return await this.loadingCtrl.create({
       message: 'Process',
       spinner: 'circles',
       cssClass: 'custom-loading'
    }).then(a => {
      a.present().then(() => {
        console.log();
        if (!this.isLoading_payment) {
          a.dismiss().then(() =>
           console.log()

           );
        }
      });
    });
  }

  async dismissLoaderPayment() {
    this.isLoading_payment = false;
    return await this.loadingCtrl.dismiss().then(() => console.log());
  }


  //without duration
  _isLoading = false;

  async _showLoader() {
    this._isLoading = true;
    return await this.loadingCtrl.create({


    }).then(a => {
      a.present().then(() => {
        console.log();
        if (!this._isLoading) {
          a.dismiss().then(() =>
           console.log()

           );
        }
      });
    });
  }

  async _dismissLoader() {
    this._isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log());
  }

  async alert(msg) {
      let alert =await this.alertCtrl.create({
        header: 'Message',
        message: msg,
        buttons: ['ok'],
        mode:'ios'
      });
      alert.present();
  }

  async confirmationBox(msg) {
      const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Confirm',
          handler:  () => {
            this.modalController.dismiss();
            this.zone.run(() => {
            this.navCtrl.navigateRoot('/login');
            });
        }
        }
      ]
    });

    await alert.present();
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

    private handleError(error: HttpErrorResponse) {
       let me=this;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('EEE::',JSON.stringify(error.error));
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

    }


    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


  api_method(method,url_name,user,data){
      if(method=='post'){

        let v = new FormData();
        for(let k in user) v.append(k,user[k]);
        return this.http.post(this.url+'/'+url_name,v).pipe(map(this.extractData),
          catchError(this.handleError));

      }else{

         return this.http.get(this.url+'/'+url_name,httpOptions).pipe(map(this.extractData),
         catchError(this.handleError));

      }
  }

  // async present_Modal(data,vid_Title,heading,message=null) {
  //     // console.log('present_Modal',vid_Title.data);
  //     this.presentModalData={
  //            'data':data,
  //            'heading':heading,
  //            'vid_Title':vid_Title
  //          }
  //     let temp = data;
  //     let check_message= message && message!=null ? 'ask_message' : '';
  //     console.log('selecte_app',this.selectApp, this.presentModalData, this.songSelected);
  //     const modal = await this.modalController.create({
  //       component: ImagePage,
  //       componentProps: {
  //         heading       :  heading,
  //         id            :  temp.id,
  //         type          :  temp.video_type,
  //         ask_a_coach   :  check_message,
  //         calories      :  temp.calories,
  //         time_duration :  temp.time_duration,
  //         image         :  temp.thumbnail,
  //         hor_image     :  temp.horz_img ? temp.horz_img : temp.thumbnail,
  //         video         :  temp.video,
  //         name          :  temp.video_title,
  //         overview      :  temp.video_description,
  //         tips          :  temp.tips,
  //         instructions  :  temp.instructions,
  //         app           :  this.selectApp,
  //         status        :  this.songSelected,
  //         category      :  temp.category,
  //         equipImg      :  temp.equipImg,
  //         vid_Title     :  vid_Title.data,
  //         sets          :  temp.sets
  //       }
  //     });
  //     return await modal.present();
  // }
  async present_Modal(data,vid_Title,heading,message=null) {      
    // console.log('present_Modal',vid_Title.data);      
    this.presentModalData={             
      'data':data,             
      'heading':heading,             
      'vid_Title':vid_Title           
    }      
    let temp = data;      
    let check_message= message && message!=null ? 'ask_message' : '';      
    console.log('selecte_app',this.selectApp, this.presentModalData, this.songSelected);      
    const modal = await this.modalController.create({        
      component: ImagePage,        
      componentProps: {          
        heading       :  heading,          
        id            :  temp.id,          
        type          :  temp.video_type,          
        ask_a_coach   :  check_message,          
        calories      :  temp.calories,          
        time_duration :  temp.time_duration,          
        image         :  temp.thumbnail,          
        hor_image     :  temp.horz_img ? temp.horz_img : temp.thumbnail,          
        video         :  temp.video,          
        name          :  temp.video_title,          
        overview      :  temp.video_description,          
        tips          :  temp.tips,          
        instructions  :  temp.instructions,          
        short_description: temp.short_description,          
        app           :  this.selectApp,          
        status        :  this.songSelected,          
        category      :  temp.category,          
        equipImg      :  temp.equipImg,          
        vid_Title     :  vid_Title.data,          
        sets          :  temp.sets        
      }      
    });      
    return await modal.present();  
  }

  async present_Modal_coach(_heading,id){
      let check_message='ask_message';
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading,id:id,ask_a_coach:check_message}
      });
      return await modal.present();
  }
  async present_Modal_selectApp(_heading,id){
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading}
      });
      return await modal.present();
  }
  async present_Modal_Album(_heading,id,data){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading, newData:data}
      });
      return await modal.present();
  }
  async present_Modal_Apple_Album(_heading,id,data){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading, newData:data}
      });
      return await modal.present();
  }
  async present_Modal_Apple_Track(_heading,id,data){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading, newData:data}
      });
      return await modal.present();
  }
  async present_Modal_Open_Player(_heading,id,data){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading, newData:data}
      });
      return await modal.present();
  }

  async present_Modal_Spotify_Player(_heading,id,data){
    console.log('calling-modal:::',JSON.stringify(data))

      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading, newData:data}
      });
      return await modal.present();
  }
    async present_Modal_Deezer_Album(_heading,id){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading}
      });
      return await modal.present();
  }
      async present_Modal_Android_album(_heading,id,data){
    console.log('calling-modal:::')
      const modal = await this.modalController.create({
        component: ImagePage,
        componentProps: {heading:_heading,newData:data}
      });
      return await modal.present();
  }



  // test_api(){
  //   let url='http://192.168.1.2:8000/api/get_workout_vids_detail/1';
  //    return this.http.get(url,httpOptions).pipe(map(this.extractData),
  //        catchError(this.handleError));
  // }

  //comeTchat
  initializationCometChat(){

   CometChat.init(appID).then(
      hasInitialized => {
        console.log("Initialization completed successfully", hasInitialized);
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take apppropriate action.
      });
   }




   checkCometChatLogin(UID){

      CometChat.getLoggedinUser().then(
            user => {
              console.log('User Login Detail:', { user });

            },
            error => {
              this.loginComChat(UID);
              console.log('Login Error:', { error });
              // User login failed, check error and take appropriate action.
            }
          );
   }

   loginComChat(UID){
      CometChat.login(UID,apiKey).then(
        user => {
        console.log('Login Successful:', { user });
        },
        error => {
        console.log('Login Error:',error.message);
        }
      );
   }

  checkLogoutUserComChat(UID){

    CometChat.getLoggedinUser().then(
            user => {
              console.log('User Login Detail:', { user });
              this.logoutCometChat();

            },
            error => {

              console.log('Login Error:', { error });
              // User login failed, check error and take appropriate action.
            }
          );

  }

  logoutCometChat(){
      CometChat.logout().then(() => {
        console.log('Logout completed successfully');
        // this.router.navigate(['login']);
      }, error => {
        console.log('Logout failed with exception:', {error});
      });
  }

  /*----Apply Apple Payment-----*/
  async makePaymentByApplePay(item:any,currencyCode:any,callback:any){
    let me=this;
    let order: any = {
      items: item,
      shippingMethods: [],//[{identifier: 'Free',label: 'Free',detail: 'Now',amount: 0}],
      merchantIdentifier: applePayMerchantID,
      currencyCode: currencyCode,
      countryCode: 'US',
      billingAddressRequirement: 'none',
      shippingAddressRequirement: 'none',
      shippingType: 'service',
      merchantCapabilities: ['3ds', 'debit', 'credit'],
      supportedNetworks: ['visa', 'amex']
    }
    await me.applePay.canMakePayments().then((message) => {
      console.log('canMakePayments SUCC::',message);

      me.doApplePayment(order,function(state:any,obj:any){

        if(state==false){
          me.applePay.completeLastTransaction('failure');
        }else{
          me.applePay.completeLastTransaction('success');
        }
        callback(state,obj);
      });

    }).catch((error) => {
      console.log('canMakePayments FFF::',error);
      callback(false,error);
    });
  }
 async doApplePayment(order:any,callback:any){
    let me= this;
    try{
      await me.applePay.makePaymentRequest(order).then(obj => {
        console.log('makePaymentRequest SUC::',JSON.stringify(obj));
        callback(true,obj);
      }).catch((error) => {
        console.log('makePaymentRequest Err::',error);
        callback(false,error);

      });
    }catch(e){
      console.log('makePaymentRequest Catch::::',e);
      callback(false,e);
    }

  }
  /*----Apply Apple Payment-----*/

/*----Start: spotify API cordova-----*/
closeWindow(){
  let me =this;
  if(me.inAppBrowserRef){
    me.inAppBrowserRef.removeEventListener('loadstart', function(){});
    me.inAppBrowserRef.removeEventListener('loaderror', function(){});
    me.inAppBrowserRef.close();
  }
}

openTermServiceLink(){
  this.openLink(environment.termservice);
}
openLink(url){
  const options="location=no,clearcache=yes,hardwareback=no,closebuttoncaption=cancel";
  cordova.InAppBrowser.open(url, '_blank', options);
}


authSpotity(callback:any){
  let me =this;
  let url = environment.spotifyAuthBaseURL;
      url += '?response_type=code';
      url += '&client_id=' + encodeURIComponent(environment.spotifyClientID);
      url += '&scope=' + encodeURIComponent(environment.spotifyScope.join(' '));
      url += '&redirect_uri=' + encodeURIComponent(environment.spotifyRedirectURL);
      url += '&state=' + encodeURIComponent('android-'+Math.random()*100000000000000000);


  const options="location=no,clearcache=yes,hardwareback=no,closebuttoncaption=cancel";

  me.closeWindow();
  me.inAppBrowserRef = cordova.InAppBrowser.open(url, '_blank', options);
  me.inAppBrowserRef.addEventListener('loadstart', function(params) {
      console.log('loadstart calling',url);
      console.log('params calling',params);
      let splitStr=environment.spotifyRedirectURL+'/?';
      if(params.url.indexOf(splitStr)!=-1){ //

        let resToken=params.url.split(splitStr);
        let paramsObj=null;

        let queryString="";
        if(resToken[0] && resToken[0]!="")queryString=resToken[0];
        if(resToken[1] && resToken[1]!="")queryString=resToken[1];
        if(queryString!=""){
          paramsObj = queryString.split("&").reduce(function(prev, curr, i, arr) {
              let p = curr.split("=");
              prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
              return prev;
          }, {});
        }


        if(paramsObj!=null){
          let postObj={
            grant_type:"authorization_code",
            code:paramsObj['code'],
            redirect_uri:environment.spotifyRedirectURL,
            client_id:environment.spotifyClientID,
            client_secret:environment.spotifyClientSecret
          };
          me.getSpotifyToken(postObj,function(dataObj){
              console.log('API getSpotifyToken::::',JSON.stringify(dataObj));
              me.closeWindow();
              callback(true,dataObj);
          });
        }else{
          console.log('here1');
          callback(false,'access_denied');
        }
      }
      if(params.url.indexOf('error')!=-1){
        me.closeWindow();
        callback(false,'access_denied');
      }
  });
  me.inAppBrowserRef.addEventListener('loaderror', function(params) {
    me.closeWindow();
    console.log('here2');
    callback(false,'access_denied');
  });

}
spotifyAPICall(method:any='GET',endPoint:any,params:any,callback){
  let me =this;
  let spotifyToken=localStorage.getItem("spotifyToken");
  console.log('spotify token:::', JSON.stringify(spotifyToken))
  const httpSpotifyOptions = {
   headers: new HttpHeaders({
     'Authorization':'Bearer '+spotifyToken
   })
  };
  me.http.get(environment.spotifyAPIURL+endPoint,httpSpotifyOptions).subscribe((data)=>{
    //The access token expired
    console.log('resData',data);
    if(data['error']){
      let msgError='invalid authorization';
      if(data['error']['error'] && data['error']['error']['message']){
        msgError=data['error']['error']['message'];
      }
      if(data['error'] && data['error']['message']){
        msgError=data['error']['message'];
      }
      me.needRefreshTokenInSpotify(data);
      callback(false,msgError);
    }else{
      callback(true,data);
    }

  },error=>{
    me.needRefreshTokenInSpotify(error);
    callback(false,error);
  })

}
needRefreshTokenInSpotify(data:any){
  let me =this;
  let msgError='invalid authorization';
  if(data['error']['error'] && data['error']['error']['message']){
    msgError=data['error']['error']['message'];
  }
  if(data['error'] && data['error']['message']){
    msgError=data['error']['message'];
  }
  if(msgError.indexOf('expired')!=-1 && msgError.indexOf('token')!=-1){
    me.getSpotifyToken({
      grant_type:"refresh_token",
      refresh_token:localStorage.getItem("spotifyRefreshToken"),
      client_id:environment.spotifyClientID,
      client_secret:environment.spotifyClientSecret
    },function(refreshToken){
      console.log('refreshToken',JSON.stringify(refreshToken));
      if(refreshToken && refreshToken['access_token']){
        localStorage.setItem('spotifyToken', refreshToken['access_token']);
      }
    });
  }

}
getSpotifyToken(postObj:any={},callback:any){
  let me =this;
  me.api_method('post','spotifyToken',postObj,null).subscribe((data)=>{
      console.log('API spotifyToken SUC::::',JSON.stringify(data));
      callback(data);
  },error=>{
    console.log('API spotifyToken Err::::',JSON.stringify(error));
    callback(false);
  });
}
getSpotifyPlaylistTracks(playlistID:any,callback:any){
  console.log('trackId:::', playlistID);
  let me =this;
  me.spotifyAPICall('GET','playlists/'+playlistID+'/tracks?limit=100',null,function(status,d){
    callback(d);
    me.spotifyTrackData=d;
        // console.log('tacks::::',JSON.stringify(me.spotifyTrackData));
  });
}
getSpotifyPlaylist(callback:any){
  // this.present_Modal_Album('Albums','id','data');

  let me =this;
  let spotifyToken=localStorage.getItem("spotifyToken");
  if(spotifyToken==null || typeof spotifyToken=='undefined' || spotifyToken==''){

    me.authSpotity(function(status:any,authRes:any){
      console.log('authSpotity::',status,JSON.stringify(authRes));
      if(status==true && authRes['access_token']!=''){
        localStorage.setItem('spotifyToken', authRes['access_token']);
        localStorage.setItem('spotifyRefreshToken', authRes['refresh_token']);
        me.spotifyAPICall('GET','me/playlists?limit=50',null,function(status,d){
          if(d['items'] && d['total']>0){
            let usersByFood = d['items'].map(item => {
                let container = {};
                container['id'] = item.id;
                container['name'] = item.name;
                container['image'] = item['images'] && item['images'][0] ? item['images'][0]['url'] : '';
                container['total_tracks']= item['tracks'] && item['tracks']['total'] ? item['tracks']['total'] : 0;
                return container;
            });
            console.log('playlists::',JSON.stringify(usersByFood),JSON.stringify(d));
            callback(usersByFood);
          }else{
            callback([]);
          }
        });
      }else{
        callback(status,'unable to authorize');
      }
    })
  }else{
    me.spotifyAPICall('GET','me/playlists?limit=50',null,function(status,d){
      // console.log('playlists:::',JSON.stringify(d),status, d);
      if(status == true){
        me.albums=d['items'];
         // console.log('albums::', JSON.stringify(me.albums));
        me.present_Modal_Album('Albums','id',d['items']);
        // this.router.navigate(['albums']);
        // this.navCtrl.navigateRoot('/albums');
      }
    });

  }


}

/*----End : spotify API-----*/
}
