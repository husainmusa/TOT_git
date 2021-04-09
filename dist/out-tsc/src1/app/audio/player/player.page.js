import { __decorate, __metadata } from "tslib";
import { Component, Input, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapis/restapis';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
var PlayerPage = /** @class */ (function () {
    function PlayerPage(navCtrl, router, modalCtrl, sanitizer, formBuilder, storage, zone, restProvider) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.zone = zone;
        this.restProvider = restProvider;
        this.checkUser = false;
        this.checkUser_payment = 0;
        this.title = 'I Have a Dream';
        this.filename = 'I_Have_a_Dream.mp3';
        this.is_playing = false;
        this.is_in_play = false;
        this.is_ready = false;
        this.duration = -1;
        this.position = 0;
    }
    PlayerPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.video = this.sanitizer.bypassSecurityTrustStyle(this.value);
        this.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                _this.checkUser = true;
                _this.user_id = userObj.id;
                _this.checkUser_payment = userObj.user_type;
                _this.userInfo = userObj;
                console.log('userObj ::: ', userObj);
            }
            else {
                _this.checkUser = false;
            }
        });
    };
    PlayerPage.prototype.closeModal = function () {
        var me = this;
        me.restProvider.getSpotifyPlaylist(function (r) {
            console.log('getSpotifyPlaylist:::', r);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PlayerPage.prototype, "value", void 0);
    PlayerPage = __decorate([
        Component({
            selector: 'app-player',
            templateUrl: './player.page.html',
            styleUrls: ['./player.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Router,
            ModalController,
            DomSanitizer,
            FormBuilder,
            Storage,
            NgZone,
            RestapiProvider])
    ], PlayerPage);
    return PlayerPage;
}());
export { PlayerPage };
//# sourceMappingURL=player.page.js.map