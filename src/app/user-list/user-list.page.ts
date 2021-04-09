import { Component, OnInit, ViewChild } from '@angular/core';
import { CometChat ,} from '@cometchat-pro/chat';
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public userUID: string;
  // tslint:disable-next-line:no-inferrable-types
  public appID: string = '5189d825db2284';
  public apiKey: string = 'b9929d890607d3188df1715b5524a3d0b4cfb66b';


  public userListArray: any = [];
  public userData: any;
  public refresh: any = 0;
  public unblockUserUID:  any = '';
  private limit: any = 30;
  private usersRequest: any;
  constructor(
  private router: Router,
  ) {}

  ngOnInit() {

    CometChat.init(this.appID).then(

      () => {
        console.log('Initialization completed successfully');
        CometChat.getLoggedinUser().then(
            user => {
        
              console.log('Check Login:', { user });
            
            },
            error => {
    
              this.loginComChat();
              console.log('Login Error:', { error });
              // User login failed, check error and take appropriate action.
            }
          );

       
      },
      error => {
        console.log('Initialization failed with error:', error);
         
      }

    );
    this.limit = 30;
    this.usersRequest = new CometChat.UsersRequestBuilder().setLimit(this.limit).build();
    this.getUserList();
    this.addUserEventListner();
   
  }

  loginComChat(){
  	CometChat.init(this.appID).then(

      () => {
        console.log('Initialization completed successfully');

        CometChat.login('fitness_coach', this.apiKey).then(
          user => {
             this.getUserList();
            console.log('Login Successful:', { user });
            
          },
          error => {
          	console.log('Login error:',error);
            // User login failed, check error and take appropriate action.
          }
        );
        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
       
        // Check the reason for error and take apppropriate action.
      }

    );
  }

  ionViewWillEnter() {
    console.log('ion view will enter tab 1');
    this.ngOnInit();
  }
  

  getUserList() {
    this.usersRequest.fetchNext().then(
    userList => {
      if (userList.length > 0) {


        console.log("User list received:", userList);
        this.userListArray = userList;
      }
    },
    error => {
      console.log('User list fetching failed with error:', error);
      }
    );
  }

  tappedOnItems(event, user) {
    console.log('here tappedOnItems ' + user);
    // tslint:disable-next-line:no-shadowed-variable
    this.userListArray.map(item => {
      if (item.uid === user.uid) {
        item.unreadCount = 0;
      }
    });
    this.userData = user;
    console.log('{{user.name}}');
    const navigationExtras: NavigationExtras = {
      state : {
        user : this.userData
      }
    };
    this.router.navigate(['tabs/tab5/chat-view'], navigationExtras);
  }

  loadNextUsers(event) {
    console.log(event);
    console.log('UserList Array 0 :', this.userListArray);
    this.usersRequest.fetchNext().then(
      userList => {
          console.log('User list received:', userList);
          if (userList !== '') {
            this.userListArray = this.userListArray.concat(userList);
            console.log('UserList Array 1 :', this.userListArray);
          }
      },
      error => {
        console.log('User list fetching failed with error:', error);
        }
      );
  }

  addUserEventListner() {
    // const listenerID = 'sana';

    // CometChat.addUserListener(
    // listenerID,
    // new CometChat.UserListener({
    //   onUserOnline: onlineUser => {
    //     console.log('On User Online:', { onlineUser });
    //     for (let i = 0; i < this.userListArray.length; i++) {
    //       if (this.userListArray[i].uid === onlineUser.uid) {
    //         this.userListArray[i].status = 'Online';
    //       }
    //     }

    //   },
    //   onUserOffline: offlineUser => {
    //   console.log('On User Offline:', { offlineUser });
    //     for (let i = 0; i < this.userListArray.length; i++) {
    //       if (this.userListArray[i].uid === offlineUser.uid) {
    //         this.userListArray[i].status = 'Offline';
    //       }
    //     }
    //   }
    // })
    // );
  }




}

