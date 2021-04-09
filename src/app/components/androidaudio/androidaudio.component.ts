import { Component,EventEmitter, OnInit ,Input, OnChanges,Inject, SimpleChanges,Output} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import {AndroidMusicService} from '../../providers/android-music/android-music.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { RestapiProvider } from  '../../providers/restapis/restapis';

import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-androidaudio',
  templateUrl: './androidaudio.component.html',
  styleUrls: ['./androidaudio.component.scss'],
})
export class AndroidaudioComponent implements OnInit {
playing=false;
paused=true;
firstPlay=true;
audio_list:any;
index=0;
totalTrack:any;
file: MediaObject;

  @Input('status')
    set playPause(status:any){
          if(status=='videoplay'){

          }else if(status=='timerstart'){
            //this.pause();
          } else if(status=='close'){
            this.endPlayer();
          }else if(status=='beep'){
            this.play();
          }
      }

  constructor(
              private androidMusic: AndroidMusicService,
              private media: Media,
              private restProvider:RestapiProvider) {
                this.audio_list=this.androidMusic.getAllAudio();
                this.totalTrack=this.audio_list.length-1;
                console.log('audio list',this.audio_list,this.totalTrack);
                this.restProvider.events.subscribe(res=>{
                  this.endPlayer();
                })
               }

  ngOnInit() {}

  play(){
    if(this.audio_list){
      
      if(this.index>=0 && this.index<=this.totalTrack){
        if(this.firstPlay){
          console.log('playing Media',this.audio_list[this.index].path);
        this.file = this.media.create(this.audio_list[this.index].path);
        this.file.play();
        this.firstPlay=false;
        this.playing=true;
        }else{
          this.file.play();
          console.log('resuming Media',this.audio_list[this.index].path);
            this.playing=true;
        }
      }
    }
  }
  pause(){
    // this.audioProvider.pause();
    this.file.stop();
    this.playing=false;
  }
  previous(){
    this.file.release();
    this.index--;
    this.firstPlay=true;
    this.play();
  }
  next(){
    this.file.release();
    this.index++;
    this.firstPlay=true;
    this.play();
  }
  stop(){
    this.file.stop();
    this.playing=false;
  }
  endPlayer(){
    this.file.release();
    this.playing=false;
  }
}
