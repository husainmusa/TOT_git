// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export var environment = {
    production: true,
    applePayMerchantID: 'merchant.com.fitnessapp.ttof',
    appID: '5189d825db2284',
    apiKey: 'b9929d890607d3188df1715b5524a3d0b4cfb66b',
    paypalMode: 'PayPalEnvironmentSandbox',
    serviceAPI: 'http://216.187.79.152/fitness/api',
    payPalConfig: {
        PayPalEnvironmentProduction: 'AfSgcUASBuJILjX6sHzOu1sMmnoOueY-MLAOFxMqt67PElvhy8-XwFxMWCX7NElQTFFUmCZ6_xjH9L2A',
        PayPalEnvironmentSandbox: 'AfSgcUASBuJILjX6sHzOu1sMmnoOueY-MLAOFxMqt67PElvhy8-XwFxMWCX7NElQTFFUmCZ6_xjH9L2A' // 'YOUR_SANDBOX_CLIENT_ID'
    },
    stripeSecretKey: 'sk_test_fPbPSqNcIHYM138yDR7RaAYX002o4JCDxV',
    stripePublishableKey: 'pk_test_pU1lOlw592Fn70ERXcHtUdLL00QWtFnUlE',
    spotifyClientID: '937e6163c32449c49d433515b9bc09c0',
    spotifyClientSecret: '4d8c2cf152054032b26de5c4d3143ecd',
    spotifyAuthBaseURL: 'https://accounts.spotify.com/authorize',
    spotifyRedirectURL: 'http://fitapp.web-brats.com/callback/',
    spotifyAPIURL: 'https://api.spotify.com/v1/',
    spotifyRefreshTokenURL: 'https://accounts.spotify.com/api/token',
    spotifyScope: ['user-read-recently-played', 'user-read-currently-playing', 'playlist-read-private'],
    lastFMAPIKey: 'bfc55e1de14917e79f807238eb23744c',
    lastFMClientSecret: 'b05128cd0da8ee6313b17d7066b11730',
    lastFMRedirectURL: 'http://fitapp.web-brats.com/callback/',
    lastFMCallbackURL: 'http://fitapp.web-brats.com/callback/'
};
//'http://fitapp.web-brats.com/api';
//Paypal Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//# sourceMappingURL=environment.js.map