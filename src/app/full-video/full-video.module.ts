import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FullVideoPage } from './full-video.page';
import { SharedModule } from './../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: FullVideoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FullVideoPage]
})
export class FullVideoPageModule {}
