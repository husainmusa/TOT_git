import { Component, Input, OnInit ,NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController,ModalController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from  '../../providers/restapis/restapis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras , Router } from '@angular/router';
import { SpotifytrackPage } from './../../modal/spotifytrack/spotifytrack.page';
import { SafepipePipe } from '../../safepipe.pipe';
import {pluck, filter, map, distinctUntilChanged} from 'rxjs/operators';
import{DeezerService} from '../../providers/deezer/deezer.service';
import {AndroidMusicService} from '../../providers/android-music/android-music.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  @Input() value: any;
  @Input() heading: any;
  @Input() app: any;
  @Input() type: any;
  @Input() ask_a_coach: any;
  public video: any;
  public overview: any;
  public tips: any;
  public name: any;
  public instructions: any;
  public technique_dtl: any;

  public checkUser:boolean=false;
  public coachForm: FormGroup;
  apiData:any;
  user_id:any;
  userInfo:any;
  checkUser_payment:any=0;
  albumData:any;
  searchInput:any;



  constructor(private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private SafepipePipe : SafepipePipe,
    public storage:Storage,
    public zone:NgZone,
    public restProvider:RestapiProvider,
    public deezer:DeezerService,
    public loadingController : LoadingController,
    private androidMusic: AndroidMusicService) {console.log('heading',this.heading)}

  ngOnInit() {
    // this.video = this.sanitizer.bypassSecurityTrustStyle(this.value);
      this.storage.get('USERPROFILE').then((userObj) => {
        if (userObj) {
          this.checkUser=true;
          this.user_id=userObj.id;
          this.checkUser_payment=userObj.user_type;
          this.userInfo=userObj;
          console.log('userObj ::: ',userObj);
        }else{
          this.checkUser=false;
        }
     });
    this.coachForm = this.formBuilder.group({
        'user_id'   : [null],
        'video_id'  : [null],
        'video_type': [null],
        'message'   : [null, Validators.compose([Validators.required])],
    });
  }
  selectApp(id){
        this.modalCtrl.dismiss();
    this.restProvider.present_Modal_selectApp('Select_App',id);
  }
  openDeezer(){
     let me= this;
     let data='dshf';
    me.modalCtrl.dismiss();
    me.restProvider.getApp('Deezer','true');
      me.restProvider.present_Modal_Deezer_Album('Albums','id');
  }
  selectAlbum(id){
    let me=this;
    me.modalCtrl.dismiss();
    me.deezer.getAlbumId(id);
    let modalData=me.restProvider.getModalData()
    me.restProvider.present_Modal(modalData.data,modalData.heading,modalData.heading,'')
  }
    updateList(){
      let me=this;
      this.deezer.searchData(me.searchInput,function(res){
        me.albumData=res;
        console.log(me.albumData);
      })
    }

    openAndroidMusic(){
           let me= this;
           setTimeout(function(){
            me.modalCtrl.dismiss();
            },5000);
           this.androidMusic.clean();
           this.presentLoading()
           this.androidMusic.getAudio();
    }

    openAndroidPlayer(data){
        let d=data.folder;
      let me= this;
        me.androidMusic.cleaneSong()
      setTimeout(function(){
            me.modalCtrl.dismiss();
            },2000);
      me.restProvider.getApp('Android','true');
      if(data==''){
        console.log('call');
        this.androidMusic.getAudio();
        let modalData=me.restProvider.getModalData();
        setTimeout(function(){
        me.restProvider.present_Modal(modalData.data,modalData.heading,modalData.heading,'')
        },5000);
      }else{
        me.androidMusic.getSongByAlbum(d);
        let modalData=me.restProvider.getModalData();
        setTimeout(function(){
        me.restProvider.present_Modal(modalData.data,modalData.heading,modalData.heading,'')
        },2000);
      }
    }

  OpenVIdeoPage(data){
    this.modalCtrl.dismiss();
  }

  openPlayer(){
    console.log('functionCall:::: ')
        this.modalCtrl.dismiss();
        this.restProvider.getApp('Apple','true');
        let modalData=this.restProvider.getModalData()
        console.log('at image',modalData)
        this.restProvider.present_Modal(modalData.data,modalData.vid_Title,'Workout','')
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  openSpotify(id){
    let me= this;
      me.modalCtrl.dismiss();
    me.restProvider.getSpotifyPlaylist(function(r:any){
      console.log('getSpotifyPlaylist:::',r);
    });
  }

 openSpotifyTrack(data,id) {
   let me=this;
      me.restProvider.selectedSpotifyTrack(data);
    me.restProvider.getApp('Spotify','true');
    let modalData=this.restProvider.getModalData();
    me.restProvider.getSpotifyPlaylistTracks(data.id,function(r:any){
        me.modalCtrl.dismiss();
        localStorage.setItem('getSpotifyTracks', r);
      let modalData=me.restProvider.getModalData();
      me.restProvider.present_Modal(modalData.data,modalData.vid_Title,modalData.heading,'')
    });
  }


  ionViewWillEnter() {
    console.log('img ionViewWillEnter')
  }


 alertMessage(){
    let msg='Only Registered User Can Contact Us !!';
    this.restProvider.alert(msg);
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async openFullVideo(id){
      this.restProvider.showLoader();
       this.restProvider.api_method('get','get_technique_detail/'+id,null,null).subscribe((data)=>{ 
       if(data['status']==='success'){
            this.modalCtrl.dismiss();
            this.restProvider.dismissLoader();
            this.technique_dtl = data['technique'];
            const navigationExtras: NavigationExtras = {
              state : {
                data : this.technique_dtl,
                tab : 'technique',
              }
            };
            this.zone.run(() => {
              this.router.navigate(['full-video'], navigationExtras);
            });

        }else{
           this.restProvider.alert('video not found');
           this.restProvider.dismissLoader();
        }
      },error=>{
         this.restProvider.dismissLoader();
         this.restProvider.alert('oops something went wrong');
         console.log('error', error);
      });

  }


  sendCoach(heading,id,user_id){

     this.restProvider.showLoader();
     this.coachForm.controls['user_id'].setValue(user_id);
     this.coachForm.controls['video_id'].setValue(id);
     this.coachForm.controls['video_type'].setValue(heading);
       this.restProvider.api_method('post','ask_a_question',this.coachForm.value,'null').subscribe((data)=>{
       this.restProvider.dismissLoader();
       this.apiData=data;

       if(this.apiData.status === 'error'){
            let msg='Oops Something Went Wong !!';
            this.restProvider.alert(msg);
          }else if(this.apiData.status==='success'){
            console.log(this.apiData.coach);
            this.coachForm.reset();
            let msg='Message Sent Successfully !!!';
            this.restProvider.alert(msg);
            this.modalCtrl.dismiss();
          }
        },
      error=>{
        console.log( error);
        this.restProvider.dismissLoader();
      });

  }

  openAskMessage(heading,id){
    if(this.checkUser==true ){
      if(this.userInfo.hasSubscription>0 && this.userInfo.isProfileCompleted>0){
        this.restProvider.present_Modal_coach(heading,id);
      }else{
        if(this.userInfo.hasSubscription==0){
          let msg=' Sorry! You did not subscribed any plan, Please subscribe any plan first';
          this.restProvider.confirmationBox(msg);
        }else{
          this.modalCtrl.dismiss();
          this.zone.run(() => {
            this.router.navigate(['editprofile']);
          });
        }
      }
    }else{
      let msg='Only Registered User Can Contact with Coach!!';
      this.restProvider.confirmationBox(msg);
    }
  }

  openVideo(heading,id,category,equipImg,sets){
        let me=this;
        this.restProvider.showLoader();
         let tracks = this.restProvider.getSpofityTrackDetail();
        console.log('track', tracks);
        // if(tracks){
          this.restProvider.api_method('get','get_workout_vids_detail/'+id,null,null).subscribe((data)=>{

              if(data['status']=='success'){
                if(data['data'].length > 0){
                  this.modalCtrl.dismiss();
                  const navigationExtras: NavigationExtras = {
                    state : {
                      warmup_id : id,
                      type : heading,
                      category: category,
                      equipImg: equipImg,
                      sets: sets
                    }
                  };
                  this.zone.run(() => {
                    this.router.navigate(['/play-video'], navigationExtras);
                  });
                }else{
                  let msg='No Video Found !!';
                  this.restProvider.alert(msg);
                }
              }else{
                let msg='oops something went wrong!!';
                this.restProvider.alert(msg);
              }

          },error=>{
            console.log('error', error);
            this.restProvider.dismissLoader();
          });



  }

  redirectToPlan(){
    this.modalCtrl.dismiss();
    let scroll=1;
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      queryParams:{
        moveToPlan : true,
      }
    };
    this.zone.run(() => {
      this.router.navigate(['/tabs/tab1'], navigationExtras);
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    let i=this.androidMusic.getAlbums();
    
    console.log('folders:::',i);
    this.restProvider.present_Modal_Android_album('Android Music','id',i);
  }

}
