import { Component } from '@angular/core';
import { RestapiProvider } from  '../providers/restapis/restapis';
import { Storage } from '@ionic/storage';  
import { CometChat } from '@cometchat-pro/chat';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
 messages: any[] = [];

  subscription: Subscription;
  countMessage:any='';
  responseData:any;
  constructor(public restProvider:RestapiProvider,
  	          public storage:Storage,) {

				this.subscription = this.restProvider.getMessage().subscribe(message => {
					if (message) {
						this.messages.push(message);
						console.log('after',message);
						this.countMessage=message.text;
					} else {
						// clear messages when empty message received
						this.messages = [];
						console.log('before',this.messages);
					}
				});
  }

    ionViewWillEnter(){

    	this.ngOnInit();

    }
    
	ngOnInit(){
	  // this.myNotification();

	}  

	ngClicktab(){
        // this.myNotification();

    	// console.log('enter tabs f')
	}
    //live chat
	myNotification(){
		this.storage.get('USERPROFILE').then((userObj) => {
			if (userObj) {
				if(userObj.type=='user'){
					let UID=userObj.id;

					this.restProvider.api_method('get','cometChatGetUserUnreadMessageCount/'+userObj.id+'/'+'fitness_coach','null','null').subscribe((data)=>{

						if(data['status']=='success'){
							if(data['data'] != ''){
								console.log(data['data']);
							this.responseData=data['data'][0];
							this.countMessage=this.restProvider.notification=this.responseData['count'];	
						}else{
							this.countMessage=this.restProvider.notification='';	

						}
							

						}else if(data['status']=='error'){
							this.countMessage=this.restProvider.notification='';
							console.log(this.countMessage);
						}
					},
					error=>{
					console.log('api error:' ,error);

					});


				}
	      }
	    });
	}

  
}

