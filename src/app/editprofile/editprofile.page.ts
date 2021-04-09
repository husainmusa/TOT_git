import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, MenuController, ToastController, AlertController,LoadingController, Events, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';



import { environment } from '../../environments/environment';

const serviceAPI = environment.serviceAPI;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  userdetails:any;
  apiData:any;
  uploadData:any;
  actionSheet:any;
  sourceType:any;
  myrLoader:any;
  fileUploadName:any;
  currentImage:any;
  currentweightUnit:any;
  userImage:any='../assets/images/avatar3.png';
  public onEditForm: FormGroup;
  public show_women_status:boolean=false;
  public isReadOnly:boolean=true;

  public cssOptions : any;
  constructor(public navCtrl:NavController,
              public storage:Storage ,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController,
              public formBuilder: FormBuilder,
              public camera: Camera,
              public transfer: FileTransfer,
              public restProvider:RestapiProvider) {
                this.cssOptions={
                  cssClass: 'select-box-class'
                }
              }

  ngOnInit() {

    this.onEditForm = this.formBuilder.group({
      'user_id'        : [''],
      'email'          : ['', Validators.compose([Validators.required])],
      'name'           : ['', Validators.compose([Validators.required])],
      'age'            : ['', Validators.compose([Validators.required])],
      'body_weight'    : ['', Validators.compose([Validators.required])],
      'current_weight'    : ['', Validators.compose([Validators.required])],
      'body_height'    : [null, Validators.compose([Validators.required])],
      'height'         : [''],
      'targeted_weight': ['', Validators.compose([Validators.required])],
      'gender'         : ['', Validators.compose([Validators.required])],
      'fitness_level'  : ['', Validators.compose([Validators.required])],
      'interested_in'  : ['', Validators.compose([Validators.required])],
      'women_status'   : [''],
      'file'            : [''],
      'weight_unit'     : ['KG'],
      'cweight_unit'     : ['KG'],
      'target_weight_unit' : ['KG'],
      'height_unit'       :['CM'],
      'password': [null, Validators.compose([,Validators.maxLength(30),Validators.minLength(6)])],
      'password_confirmation': [null, Validators.compose([Validators.maxLength(30),Validators.minLength(6)])],
      'height_feet':    ["5"],
      'height_inches':    ["4"]
    });

    this.storage.get('USERPROFILE').then(userObj => {
        if (userObj) {
           console.log('user_obj',userObj);
              this.userdetails = userObj;
              if(userObj['image'] && userObj['image']!=null && userObj['image']!=''){
                this.userImage=userObj['image'];
              }
              this.currentweightUnit=this.userdetails.weight_unit;
              let hFeet='3';
              let hinchaes='4';
              if(this.userdetails.body_height){
                let hh=this.userdetails.body_height.toString().split('.');
                hFeet=(hh[0] && typeof hh[0]!=='undefined') ? hh[0] :'3';
                hinchaes=(hh[1] && typeof hh[1]!=='undefined') ? hh[1] :'4';
              //  console.log(hh,'GGG',[hFeet,hinchaes]);
              }

              this.onEditForm.patchValue({
                  user_id        : this.userdetails.id,
                  email          : this.userdetails.email,
                  name           : this.userdetails.name,
                  age            : this.userdetails.age,
                  body_weight    : this.userdetails.body_weight,
                  current_weight : this.userdetails.current_weight,
                  body_height : this.userdetails.body_height,
                  targeted_weight: this.userdetails.targeted_weight,
                  gender         : this.userdetails.gender,
                  fitness_level  : this.userdetails.fitness_level ,
                  interested_in  : this.userdetails.interested_in,
                  women_status   : this.userdetails.women_status ,
                  height_unit         : this.userdetails.height_unit ,
                  mobile         : this.userdetails.mobile ,
                  weight_unit         : this.userdetails.weight_unit ,
                  cweight_unit         : this.userdetails.weight_unit ,
                  target_weight_unit         : this.userdetails.target_weight_unit ,

                  height_feet         : hFeet ,
                  height_inches         : hinchaes ,
              });

              if(this.userdetails.gender=='female'){
                  this.show_women_status=true;
              }

              if(this.userdetails.email==''){
                this.isReadOnly=false;
              }
               // console.log('userdetail_value', this.userdetails);
        }
      });
  }
  // ngOnInit() {

  // }
  ionViewWillEnter(){
    this.applyOnSel();
  }
  applyOnSel(){
    try{
     // document.querySelector('#guest_weight_unit').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
      setTimeout(function(){
        let selWeightEl=document.getElementById('weight_unit');
        if(selWeightEl && selWeightEl!=null && typeof selWeightEl !=='undefined' && selWeightEl.shadowRoot.querySelector('button')){
          selWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }
        let selTargetWeightEl=document.getElementById('target_weight_unit');
        if(selTargetWeightEl && selTargetWeightEl!=null && typeof selTargetWeightEl !=='undefined' && selTargetWeightEl.shadowRoot.querySelector('button')){
          selTargetWeightEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }
        let selHeightUnitFeetEl=document.getElementById('height_unit');
        if(selHeightUnitFeetEl && selHeightUnitFeetEl!=null && typeof selHeightUnitFeetEl !=='undefined' && selHeightUnitFeetEl.shadowRoot.querySelector('button')){
          selHeightUnitFeetEl.shadowRoot.querySelector('button').setAttribute('style', 'width:35%;right:0!important;left:auto!important;');
        }

      },500);
    }catch(e){
      console.log("applyOnSel",e)
    }
  }
showWomenStatus($event){
    let gender=$event.target.value;
    if(gender=='female'){
        this.show_women_status=true;
    }else{
        this.show_women_status=false;
    }

  }


    presentActionSheet() {
      let me=this;
      this.actionSheet = this.actionSheetController.create({
        header: 'Select Image Source',
        cssClass: 'action-sheets-groups-page',
        buttons: [ {
           text: 'Camera',
           icon: 'camera',
           handler: () => {
              //this.sourceType =  this.camera.PictureSourceType.CAMERA;
              //me.backgroundMode.enable();
              setTimeout(function(){me.takePicture("CAMERA");},500);
           }
         },
         {
           text: 'Gallery',
           icon: 'image',
           handler: () => {
             //this.sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
            // me.backgroundMode.enable();
             setTimeout(function(){me.takePicture("Gallery");},500);
           }
         }]
      }).then(actionsheet => {
        actionsheet.present();
      });
  }

  async takePicture(sourceType) {

  let me = this;
  if(sourceType=="CAMERA"){
    this.sourceType =  this.camera.PictureSourceType.CAMERA;
  }else{
    this.sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
  }
  me.myrLoader = await me.loadingController.create({
    message: 'Processing...'
  });
  me.myrLoader.present();




  this.camera.cleanup();


    const options: CameraOptions = {
      quality: 76,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      saveToPhotoAlbum:true,
      sourceType: this.sourceType
    }


    this.camera.getPicture(options).then((imageData) => {
      //  me.backgroundMode.disable();

      let filename,path;
      this.currentImage =  imageData;
        if (this.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
             path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
             filename = imageData.substring(imageData.lastIndexOf('/') + 1);
            let index = filename.indexOf('?');
            if (index > -1) {
              filename = filename.substring(0,index);
            }
        }
        if (this.sourceType === this.camera.PictureSourceType.CAMERA) {
             filename = imageData.substring(imageData.lastIndexOf('/') + 1);
             path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
             let index = filename.indexOf('?');
            if (index > -1) {
              filename = filename.substring(0,index);
            }
        }
        this.fileUploadName=filename;

      //this.reqFormObj.push(data);


      console.log('ssss',this.fileUploadName);



      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.fileUploadName,
        chunkedMode: false,
        httpMethod: 'POST',
        params :  {'file_type':'doctype'}
      }
      console.log(serviceAPI,'options',options,'POST-URL:::',serviceAPI+'/upload_image/'+this.userdetails.id);
      fileTransfer.upload(this.currentImage, serviceAPI+'/upload_image/'+this.userdetails.id, options)
       .then((data) => {
         console.log('uploaded data',data);
         me.myrLoader.dismiss();
         me.uploadData=JSON.parse(data['response']);
         if(me.uploadData['status']=='success'){
           me.userImage=me.uploadData['success'];
         }
         me.restProvider.alert(me.uploadData['message']);
       }, (err) => {
         console.log('/upload_image/',err);
         me.restProvider.alert('Sorry!unable to process your request');
         me.myrLoader.dismiss();
       });

    }, (err) => {
    // me.backgroundMode.disable();
     me.restProvider.alert('Sorry!unable to process your request');
     me.myrLoader.dismiss();
     console.log("Camera issue:" + err);
    });
  }

  IsNumeric(e,dig)
      {

        let _dig=dig-1;
        // console.log(_dig,dig);
        let specialKeys = new Array();
        // console.log(e);
        let myval =e.target.value;
        // console.log(myval.length,myval);
        specialKeys.push(8);
        let keyl = myval.length;
        let keyCode = e.which ? e.which : e.keyCode;
        //let ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        let ret = (keyl<=_dig);
        // document.getElementById("error").style.display = ret ? "none" : "inline";
        return ret;
      }

  editUserData(){
       // console.log('update profile',this.onEditForm.value);
       let me=this;
       let error=[];
       let formObj=this.onEditForm.value;
       let msg='profile Update successfully';
       //me.userImage

       console.log('update profile',formObj);

       if(formObj['age']==null || formObj['age']=='' || formObj['age']<10 || formObj['age']>100){
         error.push('Age should be between 10-100');
       }
       if(formObj['body_weight']==null || formObj['body_weight']=='' || formObj['body_weight']<25){
         error.push('Weight should be greaterthen 25');
       }
       if(formObj['fitness_level']==null || formObj['fitness_level']==''){
         error.push('Fitness Level is required');
       }
       if(formObj['name']==null || formObj['name']==''){
         error.push('Name is required');
       }
       if(formObj['gender']==null || formObj['gender']==''){
         error.push('Gender is required');
       }
       if(formObj['email']==null || formObj['email']=='' || me.onEditForm.get('email').hasError('pattern')){
         error.push('Invalid E-Mail ID');
       }

       if(formObj['height_unit']=='FEET'){
         let f=formObj['height_feet'];let fi=formObj['height_inches'];
         if(formObj['height_feet']==null || formObj['height_feet']==''){
           f=3;
         }
         if(formObj['height_inches']==null || formObj['height_inches']==''){
           fi=0;
         }
         formObj['body_height'] = [f,fi].join('.');
       }
       if(formObj['body_height']==null || formObj['body_height']=='' || parseInt(formObj['body_height'])<1){
         error.push('height is required');
       }

       /*if(formObj['height_inches']==null || formObj['height_inches']=='' || parseInt(formObj['height_inches'])<1){
         error.push('height inch is required');
       }*/
       if(formObj['interested_in']!='stay in shape'){
         if(formObj['targeted_weight']==null || formObj['targeted_weight']=='' || formObj['targeted_weight']<1){
           error.push('targeted weight is required');
         }
       }

       if(formObj['interested_in']==null || formObj['interested_in']==''){
         error.push('Goals is required');
       }
       if(formObj['height_unit']==null || formObj['height_unit']==''){
         formObj['height_unit']='CM';
       }
       if(formObj['weight_unit']==null || formObj['weight_unit']==''){
         formObj['weight_unit']='KG';
       }
       if(formObj['target_weight_unit']==null || formObj['target_weight_unit']==''){
         formObj['target_weight_unit']='KG';
       }


       if(formObj['interested_in']=="lose weight"){
         if(parseInt(formObj['body_weight']) < parseInt(formObj['targeted_weight'])){
           error.push('target weight should be lessthen body weight');
         }
       }

       if(formObj['interested_in']=="gain muscle"){
         if(parseInt(formObj['targeted_weight']) < parseInt(formObj['body_weight'])){
           error.push('target weight should be greaterthen body weight');
         }
       }
       if(formObj['password']!="" && formObj['password_confirmation']!=""){
         if(formObj['password']!=formObj['password_confirmation']){
           error.push('password & confirm password does not match');
         }
       }


       if(error.length>0){
          console.log('Error',error);
          me.restProvider.alert(error.join('<br>'));
       }else{
         this.restProvider.showLoader();
         this.restProvider.api_method('post','profile',formObj,'null').subscribe((data)=>{
            this.apiData=data;
            if(this.apiData.status === 'success'){
              this.restProvider.dismissLoader();
              msg='Profile Updated successfully';

              setTimeout(function(){
                me.navCtrl.navigateRoot('/tabs/tab4');
                /*setTimeout(function(){
                  me.restProvider.alert(msg);
                },500);*/
              },500);
            }else{
              this.restProvider.dismissLoader();
              msg='Something went wrong';
              if(this.apiData.message && this.apiData.message!=''){
                msg=this.apiData.message;
              }
              setTimeout(function(){me.restProvider.alert(msg);},500);
            }

        },
        error=>{
          console.log( error);
          this.restProvider.dismissLoader();
        });
       }

  }

  navigaToback(){
      this.navCtrl.navigateRoot('/tabs/tab4');
  }

}
