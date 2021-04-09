
import { Component,EventEmitter, OnInit ,Input, OnChanges,Inject, SimpleChanges,Output} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { Storage } from '@ionic/storage';
import { SpotifyService } from './../../providers/spotify/spotify.service';
import { RestapiProvider } from  '../../providers/restapis/restapis';
import { NavController} from '@ionic/angular';

declare var cordova:any;

@Component({
  selector: 'app-spotifysong',
  templateUrl: './spotifysong.component.html',
  styleUrls: ['./spotifysong.component.scss'],
})

export class SpotifysongComponent implements OnInit {
  Spotify = cordova.plugins.SpotifyPlugin;
  firstPlaying:any;
  lastPlaying:any;
  playForfirst:any;
  currentSongIndex=0;
  status=0;
  files:any;
  sckippBack=1;
  skippForward=1;
  index=0;
authkey:any;

playing = false
paused = true;
totalTrack:any;
startOnce=true;
startPlaying=false;

isLoggedIn=0;
visited=false;


  @Input('status')
    set playPause(status:any){
          this.authkey=status;
          if(status=='videoplay'){

          }else if(status=='timerstart'){
              this.pause();
          } else if(status=='close'){
            if(this.playing){
               this.pause();
            }
          }else if(status=='beep'){
            console.log("peep");
            this.play();
          }
      }

  constructor(public navCtrl:NavController,
    private storage:Storage,
    private spotifyservice:SpotifyService,
    private restProvider:RestapiProvider)
    {
      this.restProvider.events.subscribe(res=>{
        this.pause();
      })
      this.files=this.restProvider.getAlbums();
      console.log('-----albumOnComponent-----',this.files);
      let me=this;

      // this.Spotify.Events.onLogedIn=function(arg){
      //   console.log('isLoggedIns', arg);
      //   me.isLoggedIn=1;
      // }
      this.Spotify.Events.onPlay=function(arg){
        console.log('Isplayings', arg);
        me.playing = true;
        me.paused = false;
        me.startPlaying=true;

      }
      this.Spotify.Events.onPause=function(arg){
        console.log('Ispauseds', arg);
        me.playing = false;
        me.paused = true;
      }
      this.Spotify.onPlayError = function(error){
              console.log('--------------------onPlayError------------');
        me.playing = false;
        me.paused = true;
        if(this.visited){
        // me.navCtrl.navigateRoot('/tabs/tab2');
        }else{
          // this.visited=true;
          // console.log('onPlayError1',error)
          // me.spotifyservice.logIn();
          // me.spotifyservice.getToken();
        }

      }

      }

  ngOnInit() {


  }

 play() {
   let me = this;
     me.spotifyservice.play(me.files.uri );
        setTimeout(function(){
        if(me.startOnce){
          if(!me.startPlaying){
            me.startOnce=false;
            me.spotifyservice.presentAlert();
          }
        }
      },2000);
 }

 pause() {
   if(this.playing){
   this.spotifyservice.pause();
   // this.Spotify.pause();
       this.playing = false;
       this.paused = true;
   }
 }

 resume()  {

       this.playing = true;
       this.paused = false;
 }
 next(){
// this.Spotify.next();
this.spotifyservice.next();
 }
 privious(){
// this.Spotify.prev();
this.spotifyservice.previous();
 }
}
