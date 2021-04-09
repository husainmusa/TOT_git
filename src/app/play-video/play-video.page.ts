import { Component,Output, EventEmitter, OnInit,HostListener,NgZone ,ViewChild,ElementRef,Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestapiProvider } from  '../providers/restapis/restapis';
import {LoadingController ,AlertController} from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import {AudioProvider} from '../providers/audio/audio';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.page.html',
  styleUrls: ['./play-video.page.scss'],
})
export class PlayVideoPage implements OnInit {
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

    set:any='';
    video:any='';
    thumbnail:any='../assets/images/vid_bg.jpg';
    video_title:any='';
    Next_vid_title:any='';
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
    visiblePlayerAndroid=false;
    visiblePlayerDeezer=false;
    visiblePlayerSpotify=false;
    classOverlay='overlay';
    classOverlay2='overlay2';
    total_footer=[];
    count_footer=0;
    end_time=false;
    display_innerTime=false;
    wait_videoTime=3;
    innertimer_display=false;
    swipeType='next';
    interval:any;
  public timeBegan = null
  public timeStopped:any = null
  public stoppedDuration:any = 0
  public started = null
  public running = false
  public blankTime = "00:00"
  public time = "00:00"

  //@ViewChild('videoPlayer',null) videoPlayer: ElementRef;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      console.log('h',this.scrHeight);
  }
  @Inject(DOCUMENT) document:HTMLElement;

  constructor( private router       : Router,
      			   private route        : ActivatedRoute,
      			   private zone         : NgZone,
      			   public alertCtrl     : AlertController,
      			   public loadingCtrl   : LoadingController,
      			   private elementRef   : ElementRef,
      			   public  restProvider : RestapiProvider,
               public audioProvider : AudioProvider,
               private keyboard     : Keyboard
			       )
  {
            let v =this.restProvider.returnApp();
            console.log('v',v);
      if(v=='Spotify'){
        this.visiblePlayerSpotify=true;
        this.classOverlay='overlayPlayer';
        this.classOverlay2='overlay2Player';
      }else if(v=='Android'){
        this.visiblePlayerAndroid=true;
        this.classOverlay='overlayPlayer';
        this.classOverlay2='overlay2Player';
        this.restProvider.dismissLoader();
      }else{
        this.restProvider.dismissLoader();
      }
		   this.getScreenSize();
		   this.route.queryParams.subscribe(params => {
		       // console.log('params: ', params);
		      if (this.router.getCurrentNavigation().extras.state) {
			         this.id = this.router.getCurrentNavigation().extras.state.warmup_id;
			         this.type = this.router.getCurrentNavigation().extras.state.type;
               this.category = this.router.getCurrentNavigation().extras.state.category;
               this.equipImg = this.router.getCurrentNavigation().extras.state.equipImg;
               this.total_Set = this.router.getCurrentNavigation().extras.state.sets;
               console.log('cat',this.category);
               if(this.category=="amrap"){
                 this.disable_Back=true;
                 this.overlay1=true;
                 this.amrap=true;
                 console.log('amrap');
               } else if(this.category=="emom"){
                 this.overlay1=true;
                 this.disable_Back=true;
                 this.equipSelect=true;
                 console.log('emom');
               }else{
                 this.overlay=true;
                 console.log('amrapemom');
               }

			         console.log(this.id,this.type,this.category);
		      }
		    });
   }



ngOnInit() {


}
ionViewWillEnter(){
  this.loadWorkoutVideo();
}
ionViewWillLeave(){
  console.log('call');
  this.status='close';
  this.stopClock();
  clearInterval(this.interval);
  this.restProvider.events.emit('close');
  return;

}

doSomethingWithCurrentValue(event){

}
closeKeyboard(event){
  this.keyboard.hide();
  // console.log('runnn',event.target);
  // event.blur();
  this.status=this.authkey;
}
selectEquip(){
  console.log('run');
  this.emom=false;
  this.equipSelect=true;
}
opneOverlay(){
  this.overlay=true;
  this.overlay1=false;
}


loadWorkoutVideo(){
  this.restProvider.showLoader();
  this.restProvider.api_method('get','get_workout_vids_detail/'+this.id,null,null).subscribe((data)=>{
     this.restProvider.dismissLoader();
     console.log('get_workout_vids_detail/',data);
     if(data['status']=='success'){
       this.count_vid_list_length=data['data'].length;
       if(data['data'].length > 0){

           this.warmup_res_data=data['data'];
           this.all_video_detail=data;
           this.index=0;
           this.thumbnail=data['horz_img'] ? data['horz_img'] : '../assets/images/vid_bg.jpg';
           this.setVideo();//
           //this.video_first=data['data']['0'];

         //  this.set=this.video_first.set;
         //  this.video=this.video_first.video;
         //  this.thumbnail=this.video_first.thumbnail;
           //this.video_title=this.video_first.video_title;
           let t_set=this.count_vid_list_length*this.total_Set;
           for(let i=0; i<t_set; i++){
             this.total_footer.push(i);
           }
           // console.log('foo',this.total_footer);

           this.showWarning  = data['show_waring_note'] ? data['show_waring_note'] : 0;
           this.showSpecialNote  =data['show_special_note'] ? data['show_special_note'] : 1;
           this.specialNote  = data['special_note'] ? data['special_note'] : '';
           this.warningNote  = data['warning_note'] ? data['warning_note'] : '';

         //  if(data['data']['1']){
           //  this.Next_vid_title=data['data']['1']['video_title'];
         //  }else{
             //this.Next_vid_title='Finished';
             // this.previous=0;
         //  }

         //  console.log('first_vid',this.video_first)
         //  console.log('warmup_res_data',this.warmup_res_data);
         setTimeout(()=>{           this.preloadVideos(true);         },100);
       }
     }
 },error=>{
     console.log('error', error);
     this.restProvider.dismissLoader();
 });
}

preloadVideos(type){  
  let me=this;  if(type){    
    me.warmup_res_data.forEach((item, index) => {      
      if(index<2){        
        let oldVideoEle = <HTMLVideoElement> document.getElementById(item['id']);                
        if(oldVideoEle){          
          oldVideoEle.preload="metadata";          
          // console.log('preload',index,oldVideoEle);        
        }      
      }    
    });  
  }else{    
    me.warmup_res_data.forEach((item, index) => {      
      if(index<= this.index+1){        
        let oldVideoEle = <HTMLVideoElement> document.getElementById(item['id']);        
        if(oldVideoEle){          
          oldVideoEle.preload="metadata";          
          // console.log('preload',index,oldVideoEle);        
        }      
      }    
    });  
  }
}

async workoutFinished(timeStamp) {
  let t=timeStamp;
  if(this.end_time){
    t='00:00';
  }
  let me=this;
  const alert = await this.alertCtrl.create({
    header: 'Nice Work',
    //subHeader: 'You have finished this workout',
    cssClass: 'tertiary',
    message: '<h1>'+t+'</h1><p>You have finished this workout</p>',
		buttons: [
		{
		  text: 'Back To Workout Menu',
      role: 'cancel',
		  handler:  () => {
		    me.close_vid();
		  }
		}]
	});
	await alert.present();
}
swipe_vid(arg){
  let me=this;
  let timeStamp=this.time;
  if(arg=='next'){
    this.index++;
    this.swipeType='next';
  }else{
    this.swipeType='';
    this.index--;
  }

  if(this.index>=this.count_vid_list_length){
    console.log('call')
      if(me.category=="emom"){
        // me.timestamp_min=min;
        // me.timestamp_sec=sec;
        let min=me.timestamp_min*60;
        me.total_loading=min+me.timestamp_sec;
        me.curr_loading=min+me.timestamp_sec;
        console.log(me.total_loading,me.curr_loading)
        if(me.video_Set<=me.total_Set){
          console.log('FINISH this.index',this.index,'::count_vid_list_length::',this.count_vid_list_length);
          console.log('time::',timeStamp);
          this.overlay2=false;
          this.overlay3=true;
          this.pauseCurrentVideo();
          // me.stopClock();
          // me.stopAllVideo(function(r){
          //   me.workoutFinished(timeStamp);
          // });
        }else{
          me.endWaitingTime();
        }
      }else if(me.category=="amrap"){
          me.index=0;
          me.setVideo();

      }else if(me.category=="for_time"){
        if(me.video_Set<me.total_Set-1){
          me.index=0;
          me.setVideo();
          me.video_Set++;
        }else{
          console.log('FINISH this.index',this.index,'::count_vid_list_length::',this.count_vid_list_length);
          console.log('time::',timeStamp);
          me.stopClock();
          me.stopAllVideo(function(r){
            me.workoutFinished(timeStamp);
          });
        }


      }else{
        console.log('FINISH this.index',this.index,'::count_vid_list_length::',this.count_vid_list_length);
        console.log('time::',timeStamp);
        me.stopClock();
        me.stopAllVideo(function(r){
          me.workoutFinished(timeStamp);
        });
      }

  }else{
    if((this.index > this.count_vid_list_length-1) || this.index < 0 ){
      this.index=0;
    }
    this.setVideo();//
  }

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

    if(this.swipeType=='next'){
        this.count_footer++;
      }else{
        this.count_footer--;
      }
      // console.log(this.count_footer,this.total_footer);
    for (let _i = 0; _i < this.total_footer.length; _i++) {
       // console.log(this.count_footer,'footer-indicator-',_i,_i>this.count_footer-1 ? 'var(--ion-color-light)' :'var(--ion-color-primary)');
       if(document.getElementById('footer-indicator-'+_i)){
         document.getElementById('footer-indicator-'+_i).style.background= _i>this.count_footer-1 ? 'var(--ion-color-light)' :'var(--ion-color-primary)'  ;
         // console.log()
       }
    }
      // console.log(this.count_footer)
    if(this.video_first){
      this.set=this.video_first.set;
      this.video=this.video_first.video;
      //this.thumbnail=this.video_first.thumbnail;
      this.video_title=this.video_first.video_title;

      if(this.index < this.count_vid_list_length-1){
        let next=this.warmup_res_data[this.index+1];
        this.Next_vid_title=next.video_title;
      }else{
        this.Next_vid_title='';
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
          //console.log('is old ended::',oldVideoEle.ended);
          oldVideoEle.pause();
          // console.log('call 6::::');
          // this.videoStatus='Pause';
        }
    });

    me.warmup_res_data[me.index]['isPlaying']=1;//show

    let currentVideoEle = <HTMLVideoElement> document.getElementById(videoObj['id']);
    //console.log('playVideo currentVideoEle:::',currentVideoEle);

    if(currentVideoEle){
      currentVideoEle.muted=true;
      currentVideoEle.currentTime = 0;
      currentVideoEle.play();
      // console.log('callll')
      me.currentVideoEle=currentVideoEle;
      setTimeout(function(){
        // console.log('callll')
        currentVideoEle.onended = (event) => {
            // console.log('calling end video',event);
            setTimeout(function(){me.swipe_vid('next');},100);
            // console.log('call 7::::');
        };
      },500);
    }
  }catch(e){
    console.log('VIDEO TAG Catch EE ',e);
  }

}


playAudio(arg){
try{
  if(arg=='beep'){
    this.audioProvider.playStream("../assets/audio/beep.mp3").subscribe(event => {
      const audioObj = event.target;
      // this.status='videoplay';
    });
  }
  if(arg=='beep2'){
    this.innertimer_display=true;
      this.audioProvider.playStream("../assets/audio/beep_2.mp3").subscribe(event => {
        const audioObj = event.target;
        switch (event.type) {
          case 'ended':
          this.status='beep';
          
          var timeDelay = setInterval(() => {
            this.wait_videoTime--;
            if(this.wait_videoTime==0){
              clearInterval(timeDelay);
              console.log('call');
              this.innertimer_display=false;
              this.display_innerTime=true;
              if(this.category=="amrap" || this.category=="emom"){
                this.setClock();
              }else{this.resetClock();}
              this.playVideo();

            }
          }, 1000);
        }
      });
      // this.playStream("../assets/audio/beep_2.mp3");
      // let audio = new Audio();
      // audio.src = "../assets/audio/beep_2.mp3";
      // audio.load();
      // audio.play();
      // this.status='beep';
  }
}catch(e){
  console.log('playAudio Catch Erroor::',arg,e);
}


}

startCountdown(){

  this.interval = setInterval(() => {
      // console.log(  this.counter);
      this.counter--;
      if(this.counter==5 ){
        this.status='timerstart';
      }
      if(this.counter==4 || this.counter==3 || this.counter==2){
        this.playAudio('beep');
      }
      if(this.counter == 1 ){
        this.playAudio('beep2');
      }
      if(this.counter < 1 ){
        //this.start();
        clearInterval(this.interval);
        this.timer_display=false;
        // console.log('Ding!');
        this.overlay=false;
        this.overlay2=true;
        this.img_thumbnil=false;
        // this.playVideo();
      };
  }, 1000);
};
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
  if(this.category=="amrap" || this.category=="emom"){
  me.startRevCountdown();
  }else{
  me.started = setInterval(me.startClock.bind(me), 1000);

  }
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
  if(me.timestamp_min==me.all_video_detail.totalTime){
    me.pauseCurrentVideo();
    me.stopClock();
    me.quitWorkoutVideo();
  }
  me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
}
//<---------------------- forward clock end ------------->
//<----------------- reverse time start  ------------------->

setClock() {
  let me=this;
  //me.all_video_detail.totalTime
  if(this.category=="amrap" || this.category=="for_time" ){
    me.timestamp_min=me.all_video_detail.totalTime;
  }else{
    me.timestamp_min=me.all_video_detail.timePerSet;
  }

  me.timestamp_sec=1;
  me.startRevCountdown();
}
startRevCountdown() {
  let me=this;
  me.started = setInterval(me.startRevClock.bind(me), 1000);
}
startRevClock(){
  let me=this;
  me.curr_loading--;
  let min=me.timestamp_min;
  let sec=me.timestamp_sec-1;
  if(sec==0){
    min=me.timestamp_min-1;
    sec=59;
  }
  if(min==0 && sec==1){

    if(this.category=="emom"){
  me.pauseCurrentVideo();
   me.stopClock();
   min=me.all_video_detail.timePerSet;
   sec=1;
    me.video_Set++;
    // console.log('video set',me.video_Set)
    me.overlay2=true;
    me.overlay3=false;
      me.index=0;
    if(me.video_Set<me.total_Set){
      me.setVideo();
      console.log(me.warmup_res_data[me.index])
      me.setClock();
    }else{
      this.status='close';
      this.stopClock();
      me.end_time=true;
      me.quitWorkoutVideo();
    }
  }else{
    this.status='close';
    this.stopClock();
    me.end_time=true;
    me.quitWorkoutVideo();
  }
  }
  me.timestamp_min=min;
  me.timestamp_sec=sec;
  me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
}

//<---------------------- rev clock end ------------->

zeroPrefix(num, digit) {
  let zero = '';
  for(let i = 0; i < digit; i++) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
}
endWaitingTime(){
  this.router.navigate(['/tabs/tab2'] );
}
confirmationBox__() {
  let me=this;
  me.stopClock();
  setTimeout(function(){
    console.log('calling start');
    me.start();
  },3000);
}
async confirmationBox() {
  let me=this;
      me.pauseCurrentVideo();
  if(this.category=="emom"){
    // me.stopClock();
      me.stopClock();
    me.pauseCurrentVideo();
  }else{
    me.stopClock();
    me.pauseCurrentVideo();
  }


	const alert = await this.alertCtrl.create({
	header: 'You have now paused your workout',
	message: 'To continue workout click here',
		buttons: [
		{
		  text: 'Continue Workout',
		  role: 'cancel',
		  handler: () => {
		    console.log('Confirm Cancel');
         if(me.category=="amrap" || me.category=="emom"){
           me.video_Set=0;
           if(!me.overlay3){
             me.playCurrentVideo();
              console.log('Confirm yrefxdfgfdg');
              me.start();
           }else{
             me.start();
           }
         }else{
          me.playCurrentVideo();
          me.start();
         }
		  }
		},
		{
		  text: 'Finish Workout',
		  cssClass: 'alert-danger',
		  handler:  () => {
		    this.quitWorkoutVideo();
		  }
		}]
	});
	await alert.present();
}
quitWorkoutVideo(){
  let me=this;
  let timeStamp=this.time;
  setTimeout(function(){me.workoutFinished(timeStamp);},200);
  //me.close_vid();
}
close_vid(){
  // if(this.category=="emom"){
  //   if(this.video_Set>=3){
  //           this.router.navigate(['/tabs/tab2'] );
  //       }else{
  //         this.overlay2=false;
  //         this.overlay3=true;
  //       }
  //     }else{
    this.status='close';
    this.stopClock();
    this.router.navigate(['/tabs/tab2'] );
     clearInterval(this.interval); 
    return;

    console.log(this.id,this.type);
    if(this.type=='Workout'){
        this.restProvider.api_method('get','get_workout_detail/'+this.id,null,null).subscribe((data)=>{
          console.log('close_vid :: get_workout_detail/::',data);
          if(data['status']==='success'){

            this.response_data=data['workout'];
            this.restProvider.present_Modal(this.response_data,'Workout',null);
            this.zone.run(() => {
              this.router.navigate(['/tabs/tab2'] );
            });

          }else{

          }
        },error=>{
            console.log('error', error);
        });
    }else{
      this.router.navigate(['/tabs/tab2'] );
    }
  // }


}

start_vid(){
	this.hide_content=false;
	this.timer_display=true;
	this.startCountdown();
}

}
