import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpotifytrackPage } from './spotifytrack.page';
import { SafepipePipe } from '../../safepipe.pipe';
const routes: Routes = [
  {
    path: '',
    component: SpotifytrackPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SpotifytrackPage]
})
export class SpotifytrackPageModule {}
