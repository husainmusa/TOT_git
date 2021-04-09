import { Component, Input, OnInit ,NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController,ModalController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from  '../../providers/restapis/restapis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras , Router } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  @Input() value: any;
  @Input() heading: any;
  @Input() type: any;
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
  title = 'I Have a Dream';
filename = 'I_Have_a_Dream.mp3';
curr_playing_file: 'MediaObject';
storageDirectory: any;

is_playing: boolean = false;
is_in_play: boolean = false;
is_ready: boolean = false;

message: any;

duration: any = -1;
position: any = 0;

get_duration_interval: any;
get_position_interval: any;

  constructor(private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public storage:Storage,
    public zone:NgZone,
    public restProvider:RestapiProvider) {}

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
  }
  closeModal() {
        let me= this;
    me.restProvider.getSpotifyPlaylist(function(r:any){
      console.log('getSpotifyPlaylist:::',r);
    });
  }
  controlSeconds(forward){

  }

}
