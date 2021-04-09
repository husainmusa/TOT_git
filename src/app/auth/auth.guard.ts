import { Injectable,NgZone } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
//import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
    constructor(private storage: Storage, private zone: NgZone,public  navCtrl : NavController) {}
    async canActivate(  next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      // todo: apply login status
      const isLoggedIn = await this.storage.get('Id');
      console.log('isLoggedIn',isLoggedIn);
      if (!isLoggedIn) {
        this.zone.run(() => { this.navCtrl.navigateRoot('/login'); });
      }
      return isLoggedIn>0 ? true : false;
    }
}
