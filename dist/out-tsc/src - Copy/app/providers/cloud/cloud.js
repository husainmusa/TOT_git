import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
// declare var deezerCordova = cordova.plugins.DeezerPlugin;
var CloudProvider = /** @class */ (function () {
    function CloudProvider() {
        this.files = [
            { url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3',
                name: 'Perfect by Ed Sheeran'
            },
            {
                url: 'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
                name: 'Man Atkeya Beparwah by Nusrat Fateh Ali Khan'
            },
            { url: 'https://ia801503.us.archive.org/15/items/TheBeatlesPennyLane_201805/The%20Beatles%20-%20Penny%20Lane.mp3',
                name: 'Penny Lane by The Beatles'
            }
        ];
    }
    CloudProvider.prototype.getFiles = function () {
        return of(this.files);
    };
    CloudProvider.prototype.authDeezer = function () {
        cordova.plugins.DeezerPlugin.init(function (data) {
            console.log('init', data);
            cordova.plugins.DeezerPlugin.playAlbum(function (res) {
                console.log('AlbumPlay', res);
                cordova.plugins.DeezerPlugin.play();
            }, function (er) {
                console.log('reserr');
            }, '119606');
        }, function (err) {
            console.log('initErr');
        }, '387304');
    };
    CloudProvider = __decorate([
        Injectable()
    ], CloudProvider);
    return CloudProvider;
}());
export { CloudProvider };
//# sourceMappingURL=cloud.js.map