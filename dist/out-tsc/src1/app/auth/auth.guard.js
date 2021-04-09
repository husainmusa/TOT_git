import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(storage, zone, navCtrl) {
        this.storage = storage;
        this.zone = zone;
        this.navCtrl = navCtrl;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoggedIn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('Id')];
                    case 1:
                        isLoggedIn = _a.sent();
                        console.log('isLoggedIn', isLoggedIn);
                        if (!isLoggedIn) {
                            this.zone.run(function () { _this.navCtrl.navigateRoot('/login'); });
                        }
                        return [2 /*return*/, isLoggedIn > 0 ? true : false];
                }
            });
        });
    };
    AuthGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage, NgZone, NavController])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map