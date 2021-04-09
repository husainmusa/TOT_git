import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { RestapiProvider } from '../../providers/restapis/restapis';
var AlbumsPage = /** @class */ (function () {
    function AlbumsPage(provider) {
        this.provider = provider;
    }
    AlbumsPage.prototype.ngOnInit = function () {
        console.log('albumpage-call-data::', this.provider.getAlbums());
    };
    AlbumsPage = __decorate([
        Component({
            selector: 'app-albums',
            templateUrl: './albums.page.html',
            styleUrls: ['./albums.page.scss'],
        }),
        __metadata("design:paramtypes", [RestapiProvider])
    ], AlbumsPage);
    return AlbumsPage;
}());
export { AlbumsPage };
//# sourceMappingURL=albums.page.js.map