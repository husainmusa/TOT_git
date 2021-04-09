import { Component, Input, OnInit ,NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController,ModalController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from  '../../providers/restapis/restapis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras , Router } from '@angular/router';
import { SafepipePipe } from '../../safepipe.pipe';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {pluck, filter, map, distinctUntilChanged} from 'rxjs/operators';


declare var cordova:any;
const appID = environment.appID;
const apiKey = environment.apiKey;
const serviceAPI = environment.serviceAPI;
const applePayMerchantID=environment.applePayMerchantID;
const stripeSecretKey=environment.stripeSecretKey;
const stripePublishableKey=environment.stripePublishableKey;

@Component({
  selector: 'app-spotifytrack',
  templateUrl: './spotifytrack.page.html',
  styleUrls: ['./spotifytrack.page.scss'],
})
export class SpotifytrackPage implements OnInit {
tracks:any;
newUrl:any;
url:any;
spotifyToken:any;
refreshToken:any;
  constructor(private modalCtrl: ModalController,
              private SafepipePipe : SafepipePipe,
              public  restProvider : RestapiProvider,) {

              this.spotifyToken=localStorage.getItem("spotifyToken");
              this.refreshToken= localStorage.getItem("spotifyRefreshToken")
                const httpSpotifyOptions = {
                  headers: new HttpHeaders({
                    'Authorization':'Bearer '+this.spotifyToken
                  })
                 };
            }

  ngOnInit() {
    console.log('tracjks::',this.tracks = this.restProvider.getSpofityTrackDetail());
    if(this.tracks){
    console.log('newTrack',this.newUrl='https://open.spotify.com/embed/album/'+this.tracks.items[0].track.album.id);
     // this.url='https://api.spotify.com/v1/tracks/0bVp6yZEUrJzOm2agoFYZm?token='+this.spotifyToken+'&refreshtoken='+this.refreshToken;
    console.log('url',this.url);
  }

  }
  closeModal() {
    this.modalCtrl.dismiss();
    let modalData=this.restProvider.getModalData()
    this.restProvider.present_Modal(modalData.data,modalData.heading,'')
  }

}
