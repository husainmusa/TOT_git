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


declare var cordova;

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
 deezerCordova = cordova.plugins.DeezerPlugin;
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
              private storage:Storage) { this.authDeezer();}

authDeezer(){
 this.deezerCordova.init(function(data){
      console.log('set in it',data);
  //     cordova.plugins.DeezerPlugin.login((res)=>{
  //       console.log('login success',res);
  //     },(er)=>{
  //         console.log('login error',er);
  //    });
  //  cordova.plugins.DeezerPlugin.playAlbum((res)=>{
  //    console.log('album is playing',res);
  //    cordova.plugins.DeezerPlugin.play();
  //  },(er)=>{
  //      console.log('play error',er);
  // },'119606');

},function(err){
   console.log('initErr');
 }, '387304');

}
playTest(){

     this.deezerCordova.init((data)=>{
       console.log('init',data);
       this.deezerCordova.playAlbum((res)=>{
       console.log('AlbumPlay',res);
       this.deezerCordova.play();
     },(er)=>{
       console.log('reserr');
     },'114638932');

     },(err)=>{
       console.log('initErr');
     }, '387304');
}
playTrack(){
    this.deezerCordova.pause();
  this.deezerCordova.playTrack((res)=>{
  console.log('track',res);
},(er)=>{
  console.log('err');
},'774466292');
}

playAlbum(){
    this.deezerCordova.playAlbum(function(res){
    console.log('loin',res);
    this.deezerCordova.play();
  },function(er){
    console.log('initErr');
  },'119606');
  this.deezerCordova.play();
  }
play(){
  this.deezerCordova.play();
}
  pause(){
        this.deezerCordova.pause();
  }
  next(){
        this.deezerCordova.next();
  }
  previous(){
        this.deezerCordova.prev();
  }
}
