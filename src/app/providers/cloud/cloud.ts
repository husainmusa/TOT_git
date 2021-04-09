import { Injectable,NgZone } from '@angular/core';
import { of } from 'rxjs';

// declare var cordova:any;

@Injectable()
export class CloudProvider {
  selectedTrack:any;
  files:any;
  status=0;
  isInit:boolean=false;
  i=0;
  constructor(){
    // this.initiallizeAppleMusic();
  }
  getFiles() {
    return(this.files);
  }

  initiallizeAppleMusic(callback?){
    // console.log('function call::',JSON.stringify(cordova));
    cordova.exec((data) => {this.isInit=true; callback && callback(true);}, (err) => {this.isInit=false;callback && callback(false);}, "AppleMusic", "init", []);
  }

  getAuthorizeStatus(callback:any){
     cordova.exec((statusCode) => {
        console.log('AuthorizationStatus',JSON.stringify(statusCode))

        if(statusCode!='2'){
          cordova.exec((data) => {callback(true,data);},(e)=>{callback(false,e);},"AppleMusic", "requestAuthorization", []);
        }else{
          callback(true,statusCode);
        }
     }, (err) => {
          callback(false,err);
     }, "AppleMusic", "getStatus", []);
  }

  getApplePlayList(callback:any){
    console.log('getApplePlayList:::');
    let _this=this;
    let getAuth=function(res){
      console.log('getApplePlayList::: getAuth::');
      _this.getAuthorizeStatus((statusCode,obj)=>{
        if(statusCode){
          cordova.exec((dataList) => {res(dataList);},(err) => {res([]);}, "AppleMusic", "getPlayLists", []);
        }else{
          res([]);
        }
      });
    }
    if(this.isInit){
        getAuth(callback);
    }else{
      this.initiallizeAppleMusic((s)=>{
        if(s==true){
          getAuth(callback);
        }else{
          callback([]);
        }
      });
    }
  }

  getAppleTrack(playlistId, callback:any){
   console.log('function call', JSON.stringify(playlistId));
   cordova.exec((data) => {
      console.log("track::",data)
      this.files=data;

      callback(data)
    },(err) => {
      console.log("Error Initializing track")
    }, "AppleMusic", "getSongs", [playlistId]);
  }

  playTrack(trackId){
    cordova.exec((data) => {
       console.log("trackPlaying::",trackId);
     },(err) => {
       console.log("Error in playing track")
     }, "AppleMusic", "playTrack", [trackId]);
  }
  pauseTrack(){
    cordova.exec((data) => {
       console.log("trackPaused::");
     },(err) => {
       console.log("Error in pausing track")
     }, "AppleMusic", "pause", []);
  }
  resumeTrack(){
    cordova.exec((data) => {
       console.log("trackResume::");
     },(err) => {
       console.log("Error in resuming track")
     }, "AppleMusic", "resume", []);
  }
  stopTrack(){
    cordova.exec((data) => {
       console.log("trackStopped::");
     },(err) => {
       console.log("Error in stopping track")
     }, "AppleMusic", "stop", []);
  }

 storeSelectedTrack(data){
   this.selectedTrack=data;
 }
 getSelectedTrack(){
   return this.selectedTrack;
 }
playstatus(s){
  this.status=s;
}
getPlayStatus(){
  return this.status;
}

}
