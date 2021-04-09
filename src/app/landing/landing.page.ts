import { Component, OnInit,NgZone,ViewChild,Inject} from '@angular/core';
import { NavController,IonSlides,AlertController  } from '@ionic/angular';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { DOCUMENT} from '@angular/common';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
	slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom:false
  };
  splashScreenArray:any;
  currentIndex:any = 0;
  @ViewChild('splashSlider',null) splashSlider: IonSlides;
  @Inject(DOCUMENT) document:HTMLElement;
  constructor(public restProvider:RestapiProvider,private zone: NgZone, public  navCtrl : NavController
              ,private network: Network,
              public alertController:AlertController) { this.splashScreenArray=[];
               this.listenConnection();

              }

  private listenConnection(): void {
    this.network.onConnect().subscribe(() => {
        this.ngOnInit();
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Network connected please restart the app',
      buttons: ['OK']
    });

    await alert.present();
    this.ngOnInit();
  }
  private retriveConnection(): void {
  this.network.onConnect().subscribe(() => {
      this.ngOnInit();
    });
}



  ngOnInit() {
    let me=this;
    me.restProvider.showLoader();
    me.restProvider.getSplashScreenArray(function(r){
      console.log('getSplashScreenArray',r);
      me.splashScreenArray=r;
      me.restProvider.dismissLoader();
      me.checkScreen();
    });
  }
  continue(){
  	  // this.zone.run(() => { this.navCtrl.navigateRoot('/login'); });
       this.zone.run(() => { this.navCtrl.navigateRoot('/tabs/tab1'); });
  }
  stopAllVideo(){
    let me=this;
    me.splashScreenArray.forEach((item, index) => {
        if(item.upload_type=='video'){
          let videoEle= <HTMLVideoElement>  document.getElementById('html-video-cmp-'+index);
          if(videoEle)videoEle.pause();
        //  console.log(videoEle);
        }
    });
  }
  checkScreen(){
      let me=this;
      let index=me.currentIndex;
      let screenObj=this.splashScreenArray[index];
      console.log('html-video-cmp-'+index);
      let videoEle= <HTMLVideoElement>  document.getElementById('html-video-cmp-'+index);
      if(screenObj && videoEle){
          videoEle.currentTime = 1;
          videoEle.classList.add("loading");
          videoEle.onloadstart = function() {
              console.log("Starting to load video");
          };
          setTimeout(()=>{
           videoEle.play();
               console.log(" start playing video");
          },500);
          videoEle.oncanplay = function() {
              videoEle.classList.remove("loading");
               console.log("Can start playing video");
          };
      }

  }
  onChangeSlider(){
    let me=this;
    this.splashSlider.getActiveIndex().then((index)=>{
       this.currentIndex = index;
       me.stopAllVideo();
       me.checkScreen();
    });
  }
  term_and_service(){
    this.restProvider.openTermServiceLink();
  }

}
