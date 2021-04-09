import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {LoadingController ,AlertController} from '@ionic/angular';
import { NavController} from '@ionic/angular';
import { RestapiProvider } from  '../restapis/restapis';
declare var cordova:any;

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  Spotify = cordova.plugins.SpotifyPlugin;
  isLoggedIn=0;
  isPlaying=0;
  currentPosition:any;
  token:any;
  constructor(public event:Events,public navCtrl:NavController,
              private storage:Storage,
              public alertCtrl     : AlertController,
              public  restProvider : RestapiProvider,) {
    let me=this;
    let token:any
    // Check token
    if(me.isLoggedIn==0){
      me.logIn();
    }

    cordova.plugins.SpotifyPlugin.Events.onLogedIn=function(arg){
      me.restProvider.dismissLoader();
      me.isLoggedIn=1;
      console.log('--------------------onLogedIn------------');
      me.getToken();

    }
    cordova.plugins.SpotifyPlugin.Events.onDidNotLogin=function(arg){
      me.restProvider.dismissLoader();
            console.log('--------------------onDidNotLogin------------',arg);
      me.presentAlert();
    }
     cordova.plugins.SpotifyPlugin.onPosition=function(arg){
       me.currentPosition=arg;
       console.log('--------------------onPosition------------');
    }
    cordova.plugins.SpotifyPlugin.Events.onAudioFlush=function(arg){
      console.log('--------------------onAudioFlush------------');
    }

  }
  authSpotify(){
    let me=this;
    let spotifyToken=localStorage.getItem("spotifyToken");
    cordova.plugins.SpotifyPlugin.auth(spotifyToken,'937e6163c32449c49d433515b9bc09c0');
  }
  getToken(){
    let me=this;
    me.Spotify.getToken((res)=>{
      console.log('--------------------getToken------------',res);
      localStorage.setItem('SpotifyToken', res);
      me.token=res;
      cordova.plugins.SpotifyPlugin.auth(res,'937e6163c32449c49d433515b9bc09c0');
    },(e)=>{
      console.log('--------------------getToken------------',e);
    console.log('local-storageToken',localStorage.getItem('SpotifyToken'))
      localStorage.remove('SpotifyToken');
      // me.logIn();
    });
  }
  getLogin(){
    return this.isLoggedIn;
  }
  logIn(){ 
    cordova.plugins.SpotifyPlugin.login('937e6163c32449c49d433515b9bc09c0', 'procoders://spotify', 'http://fitapp.web-brats.com/api');
   this.getToken();
  }

  play(uri){
      let me=this;
    if(this.isLoggedIn==1){
      console.log('play::',uri,me.token);
        cordova.plugins.SpotifyPlugin.play(uri);
    }
  }
  pause(){
    this.Spotify.pause();
  }
  next(){
    this.Spotify.next();
  }
  previous(){
    this.Spotify.prev();
  }
  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Sorry !!',
      //subHeader: 'You have finished this workout',
      cssClass: 'secondary',
      message: 'You might not be a premium user or spotify is currently not working',
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler:  () => {
        this.navCtrl.navigateRoot('tabs/tab2');
        }
      }]
    });
    await alert.present();
  }
}




// <-----old facebook plugin data --------->
// {
//     if (!url) {
//         return NO;
//     }

//     [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:[options valueForKey:@"UIApplicationOpenURLOptionsSourceApplicationKey"] annotation:0x0];
//

//     NSLog(@"FB handle url: %@", url);
//
//     // Call existing method
//     return [self swizzled_application:application openURL:url sourceApplication:[options valueForKey:@"UIApplicationOpenURLOptionsSourceApplicationKey"] annotation:0x0];
// }

// <-----new facebook plugin data --------->
// link= https://github.com/apache/cordova-ios/issues/476

// {
//      if (!url) {
//          return NO;
//      }
//
//      NSMutableDictionary * openURLData = [[NSMutableDictionary alloc] init];
//
//      [openURLData setValue:url forKey:@"url"];
//
//      if (options[UIApplicationOpenURLOptionsSourceApplicationKey]) {
//          [openURLData setValue:options[UIApplicationOpenURLOptionsSourceApplicationKey] forKey:@"sourceApplication"];
//      }
//
//      if (options[UIApplicationOpenURLOptionsAnnotationKey]) {
//          [openURLData setValue:options[UIApplicationOpenURLOptionsAnnotationKey] forKey:@"annotation"];
//      }
//
//      // all plugins will get the notification, and their handlers will be called
//      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
//      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLWithAppSourceAndAnnotationNotification object:openURLData]];
//
//      return YES;
//  }
