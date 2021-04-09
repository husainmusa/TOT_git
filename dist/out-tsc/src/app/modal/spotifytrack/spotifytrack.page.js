import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestapiProvider } from '../../providers/restapis/restapis';
import { SafepipePipe } from '../../safepipe.pipe';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
var appID = environment.appID;
var apiKey = environment.apiKey;
var serviceAPI = environment.serviceAPI;
var applePayMerchantID = environment.applePayMerchantID;
var stripeSecretKey = environment.stripeSecretKey;
var stripePublishableKey = environment.stripePublishableKey;
var SpotifytrackPage = /** @class */ (function () {
    function SpotifytrackPage(modalCtrl, SafepipePipe, restProvider) {
        this.modalCtrl = modalCtrl;
        this.SafepipePipe = SafepipePipe;
        this.restProvider = restProvider;
        this.spotifyToken = localStorage.getItem("spotifyToken");
        this.refreshToken = localStorage.getItem("spotifyRefreshToken");
        var httpSpotifyOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.spotifyToken
            })
        };
    }
    SpotifytrackPage.prototype.ngOnInit = function () {
        console.log('tracjks::', this.tracks = this.restProvider.getSpofityTrackDetail());
        if (this.tracks) {
            console.log('newTrack', this.newUrl = 'https://open.spotify.com/embed/album/' + this.tracks.items[0].track.album.id);
            // this.url='https://api.spotify.com/v1/tracks/0bVp6yZEUrJzOm2agoFYZm?token='+this.spotifyToken+'&refreshtoken='+this.refreshToken;
            console.log('url', this.url);
        }
    };
    SpotifytrackPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
        var modalData = this.restProvider.getModalData();
        this.restProvider.present_Modal(modalData.data, modalData.heading, '');
    };
    SpotifytrackPage = __decorate([
        Component({
            selector: 'app-spotifytrack',
            templateUrl: './spotifytrack.page.html',
            styleUrls: ['./spotifytrack.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            SafepipePipe,
            RestapiProvider])
    ], SpotifytrackPage);
    return SpotifytrackPage;
}());
export { SpotifytrackPage };
//# sourceMappingURL=spotifytrack.page.js.map