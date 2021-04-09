import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePageModule } from './modal/image/image.module';
import { ApplesongPageModule } from './modal/applesong/applesong.module';
import { SpotifytrackPageModule } from './modal/spotifytrack/spotifytrack.module';
import { AppselectionPageModule } from './modal/appselection/appselection.module';
import { PaymentPageModule } from './payment/payment.module';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
//import { Stripe } from '@ionic-native/stripe/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PopoverPage } from '../app/popoverpage/popoverpage';
import { Network } from '@ionic-native/network/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { DatePipe } from '@angular/common';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';

import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Media } from '@ionic-native/media/ngx'
import { AudioProvider } from './providers/audio/audio';
import { mediaStateReducer } from './providers/store/store';
import { CloudProvider } from './providers/cloud/cloud';
import { StoreModule } from '@ngrx/store';
import { LastFmService } from './providers/lastFM/last-fm.service';
import { SpotifyService } from './providers/spotify/spotify.service';
import {AndroidMusicService} from './providers/android-music/android-music.service';

import { Pipe, PipeTransform } from '@angular/core';
import { SafepipePipe } from './safepipe.pipe';
//import { ApplesongComponent } from './components/applesong/applesong.component';
import { SpotifysongComponent } from './components/spotifysong/spotifysong.component';
import { SpotifyAuth } from '@ionic-native/spotify-auth';

import { FCM } from '@ionic-native/fcm/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

@NgModule({
  declarations: [AppComponent,NotificationsComponent,PopoverPage,],
  entryComponents: [NotificationsComponent,PopoverPage],
  imports: [
            BrowserModule,
            IonicModule.forRoot({mode: 'ios'}),
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            IonicStorageModule.forRoot(),
            StoreModule.forRoot({appState: mediaStateReducer,}),
            ImagePageModule,
            ApplesongPageModule,
            SpotifytrackPageModule,
            AppselectionPageModule,
            PaymentPageModule,
            ],

            providers: [
            StatusBar,
            SplashScreen,
            PayPal,
            //  Stripe,
            GooglePlus,
            Facebook,
            Network,
            FileTransfer,
            Camera,
            Keyboard,
            ApplePay,
            AudioProvider,
            CloudProvider,
            InAppBrowser,
            File,
            FileChooser,
            FileTransfer,
            FileTransferObject,
            Media,
            DatePipe,
            SafepipePipe,
           // ApplesongComponent,
            // SpotifysongComponent,
            LastFmService,
            SpotifyService,
            AndroidMusicService,
            NativeAudio,
            FCM,
            AppAvailability,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
