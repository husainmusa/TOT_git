import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HtmlvideoComponent } from '../components/htmlvideo/htmlvideo.component';


@NgModule({
  declarations: [
    HtmlvideoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HtmlvideoComponent
  ]
})
export class SharedModule { }
