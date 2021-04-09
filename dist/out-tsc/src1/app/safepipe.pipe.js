import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var SafepipePipe = /** @class */ (function () {
    function SafepipePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafepipePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafepipePipe = __decorate([
        Pipe({
            name: 'safepipe'
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SafepipePipe);
    return SafepipePipe;
}());
export { SafepipePipe };
//# sourceMappingURL=safepipe.pipe.js.map