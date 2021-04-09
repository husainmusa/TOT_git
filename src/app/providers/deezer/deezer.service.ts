import { Injectable,NgZone } from '@angular/core';
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

// declare var cordova;

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
 deezerCordova 
 // = cordova.plugins.DeezerPlugin;
 albumId:any;
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
              private storage:Storage) { 

  		// this.authDeezer();
  			}

authDeezer(){
  let me=this;
 this.deezerCordova.init(function(data){
console.log('initauth');
me.logIn();
},function(err){
   console.log('initErr');
 }, '387304');

}
logIn(){
  this.deezerCordova.login((s)=>{
    console.log('loggesdIn')
  }, (e)=>{
    console.log('erroorLogInn',e)
  });
}
playTrack(callback:any){
  let me=this;
    this.deezerCordova.pause();
  this.deezerCordova.playTrack((res)=>{
  me.deezerCordova.play();
  	callback(res);
  console.log('track',res);
},(er)=>{
  callback(false);
  console.log('error in play');
},'774466292');
}

playAlbum(callback:any){
	let me =this;
  console.log('albumId',me.albumId);
  me.deezerCordova.playAlbum(function(res){
      callback(res);
  me.deezerCordova.play();
     },function(er){
     	callback(false);
	 },me.albumId);
  }
resume(){
  this.deezerCordova.play();
}
  pauseTrack(){
        this.deezerCordova.pause();
  }
  next(){
        this.deezerCordova.next();
  }
  previous(){
        this.deezerCordova.prev();
  }

  getAlbumId(id){
  	this.albumId=id;
  	console.log('id',this.albumId);
  }



//<------------------ request method ----------------------->
   private extractData(res: Response) {
    let body = res;
    return body || { };
  }
      private handleError(error: HttpErrorResponse) {
       let me=this;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log('EEE::',JSON.stringify(error.error));
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }


 requestGetData(url){
 	 const httOptions = {
         headers: new HttpHeaders({'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                                   'x-rapidapi-key': '5eabcf8e8bmsh8c0ec2d249266c3p1e68c9jsn421a0ea26759'})
        };
         return this.http.get('https://deezerdevs-deezer.p.rapidapi.com/search?q='+url,httOptions)
         .pipe(map(this.extractData),
         catchError(this.handleError)); 
 }





 // <------------- fet data functons -------------------->

searchData(query,callback:any){
   this.requestGetData(query).subscribe((res)=>{ // this.restProvider.dismissLoader();
   		callback(res['data']);
      },error=>{
      	callback(false);
         console.log('error', error);
      });
}

}
