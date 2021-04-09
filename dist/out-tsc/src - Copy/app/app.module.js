import { __decorate } from "tslib";
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
import { AppselectionPageModule } from './modal/appselection/appselection.module';
import { PaymentPageModule } from './payment/payment.module';
import { PayPal } from '@ionic-native/paypal/ngx';
//import { Stripe } from '@ionic-native/stripe/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PopoverPage } from '../app/popoverpage/popoverpage';
import { Network } from '@ionic-native/network/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ApplePay } from '@ionic-native/apple-pay/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Media } from '@ionic-native/media/ngx';
import { AudioProvider } from './providers/audio/audio';
import { mediaStateReducer } from './providers/store/store';
import { CloudProvider } from './providers/cloud/cloud';
import { StoreModule } from '@ngrx/store';
import { SafepipePipe } from './safepipe.pipe';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, NotificationsComponent, PopoverPage],
            entryComponents: [NotificationsComponent, PopoverPage],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                IonicStorageModule.forRoot(),
                StoreModule.forRoot({ appState: mediaStateReducer }),
                ImagePageModule,
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
                FileTransfer,
                FileTransferObject,
                Media,
                DatePipe,
                SafepipePipe,
                VideoPlayer,
                BackgroundMode,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map