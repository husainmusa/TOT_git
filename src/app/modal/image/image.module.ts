import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SafepipePipe } from '../../safepipe.pipe';


import { IonicModule } from '@ionic/angular';

import { ImagePage } from './image.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImagePage, SafepipePipe],
  entryComponents: [ImagePage]
})
export class ImagePageModule {}
