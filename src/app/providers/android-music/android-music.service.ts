import { Injectable,NgZone  } from '@angular/core';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file/ngx';
import { NavController,ModalController, MenuController, ToastController, AlertController,
         LoadingController, Events } from '@ionic/angular';
import { RestapiProvider } from  '../restapis/restapis';
import { Diagnostic } from "@ionic-native/diagnostic";
@Injectable({
  providedIn: 'root'
})
export class AndroidMusicService {
_fileList=[];
folders=[];

  constructor(public file            : File,
              public loadingCtrl     : LoadingController,
              public restProvider    : RestapiProvider,
              public alertCtrl       : AlertController ) {   
  }
  clean(){
    this.folders=[];
    this._fileList=[];
  }
  cleaneSong(){
    this._fileList=[];
  }
  getAudio(){
  	let me=this;
  	this.presentLoadingWithOptions(5000,'Preparing Albums & Music Please Wait...');
      this.file.listDir(this.file.externalRootDirectory, '').then((result) => {
        for(let item of result)
        {
          if(item.isDirectory == true && item.name != '.' && item.name!= '..')
          {
            this.getFileList(item.name);
            //Get all the files inside the folder. recursion will probably be useful here.
          }
          else if (item.isFile == true)
          { 
            //File found
            let fileExt = item.name.split('.').pop();
            if(fileExt=='mp3'){
            	this.file.resolveLocalFilesystemUrl(item.nativeURL).then(  function(entry) {
				        var nativePath = entry.toInternalURL();
		            me._fileList.push({
		              name: item.name,
		              path: nativePath,
                  folder: item.fullPath
		            });
                let splitted = item.fullPath.split("/", 3); 
                me.folders.push({
                  folder: splitted[1],
                  path: nativePath
                });
				     });

            }
          }
        }
      },
      (error) => {
        console.log('e::',error);
      });

  }

  getFileList(path: string): any{
  	let me=this;
    let file = new File();
    this.file.listDir(this.file.externalRootDirectory, path)
    .then((result)=>{
      for(let item of result)
      {
        if(item.isDirectory == true && item.name != '.' && item.name != '..')
        {
          this.getFileList(path + '/' + item.name);
        }
        else
        {
          let fileExt = item.name.split('.').pop();
            if(fileExt=='mp3'){
            	this.file.resolveLocalFilesystemUrl(item.nativeURL).then( function(entry) {
				    var nativePath = entry.toInternalURL();
		            me._fileList.push({
		              name: item.name,
		              path: nativePath,
                  folder: item.fullPath
		            });
                let splitted = item.fullPath.split("/", 3); 
                me.folders.push({
                  folder: splitted[1]
                });
				     });
            }
        }
      }
    },(error)=>{
      console.log('erros::::',error);
    })
  }

  getRootFile(){
		this.file.checkDir(this.file.dataDirectory, '').then(res => console.log('Directory exists',res)).catch(err =>
	    console.log('Directory doesnt exist'));
  }

  getAlbums(){
    var newarr = [];
    for (var i=0; i<this.folders.length; i++) {
      if(i==0){
        newarr.push(this.folders[i])
      }
      else if (this.folders[i].folder!=this.folders[i-1].folder){
         newarr.push(this.folders[i]);
      }
    }
    return newarr;
  }
  getSongByAlbum(a){
       let me=this;
    this.presentLoadingWithOptions(1000,'Preparing Playlist Please Wait...');
      this.file.listDir(this.file.externalRootDirectory, a).then((result) => {
        console.log('dirctory found',result)
        for(let item of result)
        {
          if (item.isFile == true)
          { 
            let fileExt = item.name.split('.').pop();
            if(fileExt=='mp3'){
              this.file.resolveLocalFilesystemUrl(item.nativeURL).then(  function(entry) {
                var nativePath = entry.toInternalURL();
                me._fileList.push({
                  name: item.name,
                  path: nativePath,
                  folder: item.fullPath
                });
                let splitted = item.fullPath.split("/", 3); 
                me.folders.push({
                  folder: splitted[1],
                  path: nativePath
                });
             });
            }
          }
        }
      },
      (error) => {
        console.log('e::',error);
      });
  }
  getAllAudio(){
    if(this._fileList){
      var newarr = [];
      for (var i=0; i<this._fileList.length; i++) {
        if(i==0){
          newarr.push(this._fileList[i])
        }
        else if (this._fileList[i].name!=this._fileList[i-1].name){
           newarr.push(this._fileList[i]);
        }
      }
    return newarr;
    }else{
      this.presentAlert();
    }
  }

  async presentLoadingWithOptions(t,txt) {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: t,
      message: txt,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Sorry !!',
      //subHeader: 'You have finished this workout',
      cssClass: 'secondary',
      message: 'No Audio Found',
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler:  () => {
              this.restProvider.getApp('','');
        }
      }]
    });
    await alert.present();
  }
} 
