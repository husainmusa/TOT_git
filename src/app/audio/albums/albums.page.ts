import { Component, OnInit } from '@angular/core';
import { RestapiProvider } from  '../../providers/restapis/restapis';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  constructor(private provider:RestapiProvider) {
   }

  ngOnInit() {
        console.log('albumpage-call-data::',this.provider.getAlbums());
  }
  testClick(){
  	
  }

}
