import { Component,EventEmitter, OnInit ,Input, OnChanges,Inject, SimpleChanges,Output} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { DeezerService } from '../../providers/deezer/deezer.service';

@Component({
  selector: 'app-deezer',
  templateUrl: './deezer.component.html',
  styleUrls: ['./deezer.component.scss'],
})
export class DeezerComponent implements OnInit {
playing=false;
paused=true;
firstPlay=true;


  @Input('status')
    set playPause(status:any){
          if(status=='videoplay'){

          }else if(status=='timerstart'){

          } else if(status=='close'){
            this.pause();
          }else if(status=='beep'){

            console.log("peep");
          }
      }

  constructor(private deezer:DeezerService) {
   }
  ngOnInit() {
  }
  play(){
    let me=this;
    if(me.firstPlay){
        me.deezer.playAlbum(function(res){
          if(res){
            me.firstPlay=false;
            me.playing=true;
            me.paused=false;
          }else{
            console.log('error in play');
          }
        });
    }else{
      me.deezer.resume();
      me.playing=true;
      me.paused=false;
    }
  }
  pause(){
    this.deezer.pauseTrack();
    this.playing=false;
    this.paused=true;
  }
  previous(){
    this.deezer.previous();
  }
  next(){
    this.deezer.next();
  }
}
