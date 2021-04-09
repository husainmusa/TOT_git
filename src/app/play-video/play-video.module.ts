import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayVideoPage } from './play-video.page';
import { SharedModule } from './../shared/shared.module';

import { SafepipePipe } from '../safepipe.pipe';
import { DeezerComponent } from '../components/deezer/deezer.component';
import { AndroidaudioComponent } from '../components/androidaudio/androidaudio.component';
import { SpotifysongComponent } from '../components/spotifysong/spotifysong.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

const routes: Routes = [
  {
    path: '',
    component: PlayVideoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    RoundProgressModule
  ],
  declarations: [PlayVideoPage,DeezerComponent,AndroidaudioComponent,SpotifysongComponent]
})
export class PlayVideoPageModule {}
