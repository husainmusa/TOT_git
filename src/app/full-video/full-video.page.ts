import { Component, OnInit,NgZone,HostListener,Output, EventEmitter ,ViewChild,ElementRef,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';
import {AudioProvider} from '../providers/audio/audio';
import { RestapiProvider } from  '../providers/restapis/restapis';

@Component({
  selector: 'app-full-video',
  templateUrl: './full-video.page.html',
  styleUrls: ['./full-video.page.scss'],
})
export class FullVideoPage implements OnInit {
  public currentData:any;
  public tab:any;
  video_url:any;
  public thumbnail_url:any;
  scrHeight:any;
  @HostListener('window:resize', ['$event'])
  @ViewChild('videotemp',null) videotemp;
  getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
  }
  index=0;
  total_vid:any;
  vid_type:any;
  show_arrow=false;
  visible_image=false;
  visible_video=true;
  vid_array:any;
  change:any;
  visiblePlay=false;
  counter=0;
  timer_display=false;
  constructor(private router : Router,
              private route  : ActivatedRoute,
               public navCtrl: NavController,
              private zone   : NgZone,
              private elementRef   : ElementRef,
               public audioProvider : AudioProvider,
              public restProvider    : RestapiProvider){
					this.route.queryParams.subscribe(params => {
					if (this.router.getCurrentNavigation().extras.state) {
    					this.currentData = this.router.getCurrentNavigation().extras.state.data;
              this.vid_array= this.router.getCurrentNavigation().extras.state.data;
    					this.tab = this.router.getCurrentNavigation().extras.state.tab;
              if(this.router.getCurrentNavigation().extras.state.vid_type=='warmup'){
                // this.restProvider.showLoader();
                this.thumbnail_url=this.currentData.thumbnail;
                this.vid_type='warmup';
                this.show_arrow=true;
                    this.visiblePlay=true;
                    this.timer_display=true;
                    this.startCountdown();
              }else{
                this.video_url=this.currentData.video;
                this.thumbnail_url=this.currentData.thumbnail;
              }
          }
    });
  }

  ngOnInit() {

  }
  startCountdown(){   
      let interval=0,counter=20;   
      let isReady=()=>{     
        let videoLoaded=(<any>this.videotemp) ? (<any>this.videotemp).isLoaded() : -1;     
        console.log('videoLoaded::',videoLoaded) 
         // || this.counter < 1    
        if(videoLoaded==4 ){       
          this.playVid();       
          this.timer_display=false;     
        }else{       
          this.counter++;       
          setTimeout(isReady,1000);     
        }   
      } 

      let isVideoTagReady=()=>{     
        console.log(interval,'this.videotemp::',this.videotemp);      
        if(interval>10)return;      
        if(typeof this.videotemp!=='undefined'){       
          isReady();     
        }else{       
          setTimeout(isVideoTagReady,100);       
          interval++;     
        }   
      }  

      isVideoTagReady();  

   }

  close_vid(){

  	if(this.tab=='technique'){
  		this.navCtrl.navigateRoot('tabs/tab3');
  	}else{
      if(!this.visiblePlay){
      this.change='close';
    }else{
    this.navCtrl.navigateRoot('tabs/tab1');
    }
  	}
  }
  swipeVideoPrevious(){
    this.change='prev'
  }
  swipeVideoNext(){
    this.change='next'
  }
  playVid(){
    this.change='play'
    this.visiblePlay=false;
  }

}
