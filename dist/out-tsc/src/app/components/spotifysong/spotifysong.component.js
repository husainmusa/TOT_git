import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SpotifyService } from './../../providers/spotify/spotify.service';
import { RestapiProvider } from '../../providers/restapis/restapis';
import { NavController } from '@ionic/angular';
var SpotifysongComponent = /** @class */ (function () {
    function SpotifysongComponent(navCtrl, storage, spotifyservice, restProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.spotifyservice = spotifyservice;
        this.restProvider = restProvider;
        this.Spotify = cordova.plugins.SpotifyPlugin;
        this.currentSongIndex = 0;
        this.status = 0;
        this.sckippBack = 1;
        this.skippForward = 1;
        this.index = 0;
        this.playing = false;
        this.paused = true;
        this.isLoggedIn = 0;
        this.visited = false;
        this.files = this.restProvider.getAlbums();
        console.log('-----albumOnComponent-----', JSON.stringify(this.files));
        var me = this;
        // this.Spotify.Events.onLogedIn=function(arg){
        //   console.log('isLoggedIns', arg);
        //   me.isLoggedIn=1;
        // }
        this.Spotify.Events.onPlay = function (arg) {
            console.log('Isplayings', arg);
            me.playing = true;
            me.paused = false;
        };
        this.Spotify.Events.onPause = function (arg) {
            console.log('Ispauseds', arg);
            me.playing = false;
            me.paused = true;
        };
        this.Spotify.onPlayError = function (error) {
            console.log('--------------------onPlayError------------');
            me.playing = false;
            me.paused = true;
            if (this.visited) {
                // me.navCtrl.navigateRoot('/tabs/tab2');
            }
            else {
                // this.visited=true;
                // console.log('onPlayError1',error)
                // me.spotifyservice.logIn();
                // me.spotifyservice.getToken();
            }
        };
    }
    Object.defineProperty(SpotifysongComponent.prototype, "playPause", {
        set: function (status) {
            this.authkey = status;
            if (status == 'videoplay') {
            }
            else if (status == 'timerstart') {
                this.pause();
            }
            else if (status == 'close') {
                if (this.playing) {
                    this.pause();
                }
            }
            else if (status == 'beep') {
                console.log("peep");
                this.play();
            }
        },
        enumerable: true,
        configurable: true
    });
    SpotifysongComponent.prototype.ngOnInit = function () {
    };
    SpotifysongComponent.prototype.play = function () {
        var me = this;
        me.spotifyservice.play(this.files.uri);
        me.playing = true;
        me.paused = false;
    };
    SpotifysongComponent.prototype.pause = function () {
        this.spotifyservice.pause();
        // this.Spotify.pause();
        this.playing = false;
        this.paused = true;
    };
    SpotifysongComponent.prototype.resume = function () {
        this.playing = true;
        this.paused = false;
    };
    SpotifysongComponent.prototype.next = function () {
        // this.Spotify.next();
        this.spotifyservice.next();
    };
    SpotifysongComponent.prototype.privious = function () {
        // this.Spotify.prev();
        this.spotifyservice.previous();
    };
    __decorate([
        Input('status'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SpotifysongComponent.prototype, "playPause", null);
    SpotifysongComponent = __decorate([
        Component({
            selector: 'app-spotifysong',
            templateUrl: './spotifysong.component.html',
            styleUrls: ['./spotifysong.component.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Storage,
            SpotifyService,
            RestapiProvider])
    ], SpotifysongComponent);
    return SpotifysongComponent;
}());
export { SpotifysongComponent };
//# sourceMappingURL=spotifysong.component.js.map