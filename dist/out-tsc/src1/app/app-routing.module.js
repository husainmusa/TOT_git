import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
var routes = [
    { path: '', loadChildren: './landing/landing.module#LandingPageModule' },
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
    { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
    { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
    { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' },
    { path: 'paymenthistory', loadChildren: './paymenthistory/paymenthistory.module#PaymenthistoryPageModule' },
    { path: 'chat-view', loadChildren: './chat-view/chat-view/chat-view.module#ChatViewPageModule' },
    { path: 'user-list', loadChildren: './user-list/user-list.module#UserListPageModule' },
    { path: 'play-video', loadChildren: './play-video/play-video.module#PlayVideoPageModule' },
    { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
    { path: 'full-video', loadChildren: './full-video/full-video.module#FullVideoPageModule' },
    { path: 'appselection', loadChildren: './modal/appselection/appselection.module#AppselectionPageModule' },
    { path: 'albums', loadChildren: './audio/albums/albums.module#AlbumsPageModule' },
    { path: 'player', loadChildren: './audio/player/player.module#PlayerPageModule' },
    { path: 'spotifytrack', loadChildren: './modal/spotifytrack/spotifytrack.module#SpotifytrackPageModule' },
    { path: 'applesong', loadChildren: './modal/applesong/applesong.module#ApplesongPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map