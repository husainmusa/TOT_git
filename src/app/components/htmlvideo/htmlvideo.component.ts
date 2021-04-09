import { Component, OnInit ,Input, OnChanges,Inject, SimpleChanges} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {LoadingController ,AlertController} from '@ionic/angular';
import { NavController} from '@ionic/angular';
import { RestapiProvider } from  '../../providers/restapis/restapis';

import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-htmlvideo',
  templateUrl: './htmlvideo.component.html',
  styleUrls: ['./htmlvideo.component.scss'],
})
export class HtmlvideoComponent implements OnInit {
  scrHeight:any;
  response_data:any;
  hide_content:boolean=true;
  img_thumbnil:boolean=true;

  timer_display:boolean=false;
  overlay:boolean=false;
  overlay1:boolean=false;
  overlay2:boolean=false;
  overlay3:boolean=false;
  amrap:boolean=false;
  emom:boolean=false;
  equipSelect:boolean=false;
  total_loading=0;
  curr_loading=0;

  warmup_res_data:any;
  video_first:any;
  all_video_detail:any;

  video_Set=0;
  id:any;
  type:any;
  category:any;
  equipImg:any;
  counter:any=10;
  total_Set:any;
  disable_Back=false;
  showTime=false;

  set:any='';
  video:any='';
  thumbnail:any='../assets/images/vid_bg.jpg';
  video_title:any='';
  Next_vid_title:any='Finished';
  Next:any=0;
  // previous:any=0;
  index:any=0;
  count_vid_list_length:any=0;

  showWarning:any=0;
  showSpecialNote:any=1;
  specialNote:any='';
  warningNote:any='';

  timestamp_min:any=0;
  timestamp_sec:any=0;
  currentVideoEle:any;
  status='none';
  authkey:any;
  spotifyPlayer=false;
  applePlayer=false;
  classOverlay='overlay';
  classOverlay2='overlay2';
  total_footer=[];
  count_footer=0;
  end_time=false;
  visible_btn=false;
  thumbEmage:any;
public timeBegan = null
public timeStopped:any = null
public stoppedDuration:any = 0
public started = null
public running = false
public blankTime = "00:00"
public time = "00:00"

  @Inject(DOCUMENT) document:HTMLElement;
  @Input() elementID: any;
  @Input() video_url: string;
  private _poster = '';
  private _loop = '';
  private _autoplay: any;

  @Input('videos')
  set vid(videos){
    this.warmup_res_data=videos.data;
    this.all_video_detail=videos;
    this.count_vid_list_length=this.warmup_res_data.length;
    this.index=0;
    this.setVideo();//
    this.category="amrap";
  }
  @Input('change')
    set swipe(change){
      if(change=='next'){
        this.swipe_vid('next');
      }
      if(change=='prev'){
        this.swipe_vid('previous');
      }
      if(change=='play'){
        this.visible_btn=true;
        this.playVideo();
                this.resetClock();
                this.showTime=true;
      }
      if(change=='close'){
        this.stopClock();
        let me=this;
        this.stopAllVideo(function(r){
          me.workoutFinished(me.time);
        });
      }
    }
  @Input('poster')
  set poster(poster) {this._poster = (poster && poster.trim()) || '../assets/images/vid_bg.jpg';}
  get poster() {
    if(typeof this._poster==='undefined' || this._poster=="" || this._poster==null)this._poster='../assets/images/vid_bg.jpg';
    return this._poster;
  }

  @Input('autoplay')
  set autoplay(autoplay: any) {
    //console.log('autoplay',autoplay);
    this._autoplay = (autoplay=='true') ? 'true' : '';
  }
  get autoplay(): any {
    //console.log('autoplay GET::',this._autoplay);
    if(typeof this._autoplay==='undefined')this._autoplay='true';
    return this._autoplay;
  }

  @Input('loop')
  set loop(loop:any) {
    this._loop = (loop=='true') ? 'true' : '';
  }
  get loop(){
    if(typeof this._loop==='undefined')this._loop='';
    return this._loop;
  }

  constructor(public alertCtrl     : AlertController,
              public navCtrl: NavController,
              private restProvider:RestapiProvider) {

  }
  ngOnInit() {
      console.log('ngOnInit htmlvideo ::: ',[this.loop,this.autoplay,this.poster,this.video_url]);
  }

swipe_vid(arg){
  let me=this;
  if(arg=='next'){
    if(me.index <me.count_vid_list_length){
      me.index++;
    }

  }else{
    if(me.index >0){
      me.index--;
    }

  }
  if(me.index>=me.count_vid_list_length){
    me.stopClock();
    me.stopAllVideo(function(r){
      me.workoutFinished(me.time);
    });
  }

    this.setVideo();//
  }
stopAllVideo(callback){
  let me=this;
  let workoutVideos=me.warmup_res_data;
  let checkOneByOne=function(){
    if(workoutVideos.length>0){
      let item=workoutVideos.pop();
      if(item){
        let oldVideoEle = <HTMLVideoElement> document.getElementById(item['id']);
        if(oldVideoEle){ oldVideoEle.pause(); checkOneByOne();}
      }else{
        checkOneByOne();
      }
    }else{
      callback(true);
    }
  }
  checkOneByOne();
}
setVideo(){
  try{

    this.video_first = this.warmup_res_data[this.index];

    if(this.video_first){

      this.set=this.video_first.set;
      this.video=this.video_first.video;
      // this.thumbnail=this.video_first.thumbnail;
      this.video_title=this.video_first.video_title;
        let next=this.warmup_res_data[this.index+1];
        if(next){
                  this.Next_vid_title=next.video_title;
        }else{
          this.Next_vid_title='finished';
        }

      this.playVideo();//this.video
    }

  }catch(e){
    console.log('setVideo Catch EE ',e);
  }
}
playCurrentVideo(){
  let me=this;
  if(me.currentVideoEle && typeof me.currentVideoEle.play === 'function'){
    me.currentVideoEle.play();
  }
}
pauseCurrentVideo(){
  let me=this;
  if(me.currentVideoEle && typeof me.currentVideoEle.pause === 'function'){
    me.currentVideoEle.pause();
  }
}

isLoaded(){
  let me=this;
  let videoObj =me.warmup_res_data[me.index];
  let currentVideoEle = <HTMLVideoElement> document.getElementById(videoObj['id']);
  return currentVideoEle.readyState;
}
playVideo(){

  try{

    let me=this;
    let videoObj =me.warmup_res_data[me.index];
    me.warmup_res_data.forEach((item, index) => {
        if(index!=me.index){
          me.warmup_res_data[index]['isPlaying']=0; // hidden
        }
        let oldVideoEle = <HTMLVideoElement> document.getElementById(item['id']);
        if(oldVideoEle){
          oldVideoEle.pause();
        }
    });

    me.warmup_res_data[me.index]['isPlaying']=1;//show

    let currentVideoEle = <HTMLVideoElement> document.getElementById(videoObj['id']);
          if(currentVideoEle){
            currentVideoEle.currentTime = 0;
            currentVideoEle.play();
            me.currentVideoEle=currentVideoEle;
            setTimeout(function(){
              currentVideoEle.onended = (event) => {
                  setTimeout(function(){me.swipe_vid('next');},100);
              };
            },500);
          }
  }catch(e){
    console.log('VIDEO TAG Catch EE ',e);
  }

}

stopClock(){
  clearInterval(this.started);
}
//<----------------- forward time start  ------------------->
resetClock() {
  let me=this;
  me.timestamp_min=0;
  me.timestamp_sec=0;
  me.start();
}
start() {
  let me=this;
  me.started = setInterval(me.startClock.bind(me), 1000);
}
startClock(){
  let me=this;
  let min=me.timestamp_min;
  let sec=me.timestamp_sec+1;
  if(sec>59){
    min=me.timestamp_min+1;
    sec=0;
  }

  me.timestamp_min=min;
  me.timestamp_sec=sec;
  if(me.timestamp_min==me.all_video_detail.time_duration){
    me.stopClock();
    me.stopAllVideo(function(r){
      me.workoutFinished(me.time);
    });
  }
  me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
}
zeroPrefix(num, digit) {
  let zero = '';
  for(let i = 0; i < digit; i++) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
}
async workoutFinished(timeStamp) {
  this.pauseCurrentVideo();
  let t=timeStamp;
  if(this.end_time){
    t='00:00';
  }
  let me=this;
  const alert = await this.alertCtrl.create({
    header: 'Nice Work',
    //subHeader: 'You have finished this workout',
    cssClass: 'tertiary',
    message: '<h2>'+t+'</h1><p>Warmup Finished</p>',
		buttons: [
		{
		  text: 'Back To Warmup Menu',
      role: 'cancel',
		  handler:  () => {
  		this.navCtrl.navigateRoot('tabs/tab1');
		  }
		}]
	});
	await alert.present();
}

}
