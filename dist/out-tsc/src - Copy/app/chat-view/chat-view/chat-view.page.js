import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/chat';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapis/restapis';
var ChatViewPage = /** @class */ (function () {
    function ChatViewPage(router, route, actionSheetController, modalController, storage, zone, restProvider, toastCtrl) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.actionSheetController = actionSheetController;
        this.modalController = modalController;
        this.storage = storage;
        this.zone = zone;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.loggedInUserData = CometChat.getLoggedinUser();
        this.listenerId = 'OneOnOneMessageListners';
        this.showImage = 0;
        this.imageUrl = '';
        this.route.queryParams.subscribe(function (params) {
            console.log('params: ', params);
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.currentData = _this.router.getCurrentNavigation().extras.state.user;
            }
        });
    }
    ChatViewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () {
            console.log('scrolled caled');
            _this.content.scrollToBottom(300);
        }, 2000);
        this.updateNotification();
    };
    ChatViewPage.prototype.updateNotification = function () {
        // send message to subscribers via observable subject
        this.restProvider.sendMessage('');
    };
    ChatViewPage.prototype.ngOnInit = function () {
        var _this = this;
        var limit = 30;
        console.log('data of currentData is ', this.currentData);
        var uid = this.currentData['uid'];
        console.log('uid ', uid);
        CometChat.getUser(this.currentData.uid).then(function (user) {
            console.log('User details fetched for user:', user);
            _this.currentData = user;
        }, function (error) {
            console.log('User details fetching failed with error:', error);
        });
        this.messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(this.currentData.uid).build();
        this.loadMessages();
        this.addMessageEventListner();
        this.addTypingListner();
        // this.addDeliveryReadEventListners();
        this.currentUserStatus = this.currentData.status;
        // this.addUserEventListner();
    };
    ChatViewPage.prototype.loadMessages = function () {
        var _this = this;
        this.messagesRequest.fetchPrevious().then(function (messages) {
            console.log('Message list fetched:', messages);
            // Handle the list of messages
            _this.userMessages = messages;
            // this.userMessages.prepend(messages);
            // CometChat.markMessageAsRead(messages);
            console.log('UserMessages are ', _this.userMessages);
            // this.content.scrollToBottom(1500);
            _this.sendReadBulkReceipts();
            _this.moveToBottom();
        }, function (error) {
            console.log('Message fetching failed with error:', error);
        });
    };
    //  addUserEventListner() {
    //   const listenerID = 'UserEventsListner';
    //   CometChat.addUserListener(
    //   listenerID,
    //   new CometChat.UserListener({
    //     onUserOnline: onlineUser => {
    //       console.log('On User Online:', { onlineUser });
    //       if (onlineUser.uid === this.currentData.uid) {
    //         this.currentUserStatus = 'Online';
    //       }
    //     },
    //     onUserOffline: offlineUser => {
    //     console.log('On User Offline:', { offlineUser });
    //     if (offlineUser.uid === this.currentData.uid) {
    //       this.currentUserStatus = 'Offline';
    //     }
    //     }
    //   })
    //   );
    // }
    ChatViewPage.prototype.loadPreviousMessages = function () {
        var _this = this;
        this.messagesRequest.fetchPrevious().then(function (messages) {
            console.log('Message list fetched:', messages);
            // Handle the list of messages
            var newMessages = messages;
            if (newMessages !== '') {
                _this.userMessages = newMessages.concat(_this.userMessages);
            }
            console.log('UserMessages are ', _this.userMessages);
            // this.content.scrollToBottom(1500);
        }, function (error) {
            console.log('Message fetching failed with error:', error);
        });
    };
    ChatViewPage.prototype.moveToBottom = function () {
        console.log('here moving to bottom');
        this.content.scrollToBottom(1500);
    };
    ChatViewPage.prototype.logScrollStart = function () {
        console.log('logScrollStart : When Scroll Starts');
    };
    ChatViewPage.prototype.logScrolling = function ($event) {
        console.log('logScrolling : When Scrolling ', $event.detail.scrollTop);
        if ($event.detail.scrollTop === 0) {
            console.log('scroll reached to top');
            this.loadPreviousMessages();
        }
    };
    ChatViewPage.prototype.logScrollEnd = function () {
        console.log('logScrollEnd : When Scroll Ends');
    };
    ChatViewPage.prototype.addMessageEventListner = function () {
        // var listenerID = "OneOnOneMessage";
        var _this = this;
        CometChat.addMessageListener(this.listenerId, new CometChat.MessageListener({
            onTextMessageReceived: function (textMessage) {
                console.log('Text message successfully', textMessage);
                if (textMessage.receiverID === _this.loggedInUserData.uid && textMessage.sender.uid !== _this.loggedInUserData.uid) {
                    console.log('here the user has pushed 111');
                    _this.userMessages.push(textMessage);
                    // CometChat.markMessageAsRead(textMessage);
                    _this.sendReadReceipts(textMessage);
                    _this.moveToBottom();
                }
                // Handle text message
            },
            onMediaMessageReceived: function (mediaMessage) {
                console.log('Media message received successfully', mediaMessage);
                // Handle media message
            },
            onCutomMessageReceived: function (customMessage) {
                console.log('Media message received successfully', customMessage);
                // Handle media message
            }, onMessageDelivered: function (messageReceipt) {
                console.log('MessageDeliverd', { messageReceipt: messageReceipt });
                _this.updateDeliveredAt(messageReceipt);
                _this.messageStatus = '';
            }, onMessageRead: function (messageReceipt) {
                console.log('MessageRead', { messageReceipt: messageReceipt });
                _this.updatedeReadAt(messageReceipt);
                _this.messageStatus = '';
            }, onTypingStarted: function (typingIndicator) {
                console.log('Typing started :', typingIndicator);
                console.log('Typing uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid === _this.currentData.uid) {
                    _this.currentUserStatus = 'typing....';
                }
            },
            onTypingEnded: function (typingIndicator) {
                console.log('Typing ended :', typingIndicator);
                console.log('onTypingEnded uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid === _this.currentData.uid) {
                    _this.currentUserStatus = _this.currentData.status;
                }
            }
        }));
    };
    ChatViewPage.prototype.addDeliveryReadEventListners = function () {
        var _this = this;
        var listenerId = 'OneOnOneMessageDeliveryReadListners';
        CometChat.addMessageListener(this.listenerId, new CometChat.MessageListener({
            onMessageDelivered: function (messageReceipt) {
                console.log('MessageDeliverd', { messageReceipt: messageReceipt });
                _this.updateDeliveredAt(messageReceipt);
                _this.messageStatus = '';
            }, onMessageRead: function (messageReceipt) {
                console.log('MessageRead', { messageReceipt: messageReceipt });
                _this.updatedeReadAt(messageReceipt);
                _this.messageStatus = '';
            }
        }));
    };
    ChatViewPage.prototype.addTypingListner = function () {
        var _this = this;
        var listenerId = 'OneOnOneTypingListner';
        CometChat.addMessageListener(listenerId, new CometChat.MessageListener({
            onTypingStarted: function (typingIndicator) {
                console.log('Typing started :', typingIndicator);
                console.log('Typing uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid === _this.currentData.uid) {
                    _this.currentUserStatus = 'typing....';
                }
            },
            onTypingEnded: function (typingIndicator) {
                console.log('Typing ended :', typingIndicator);
                console.log('onTypingEnded uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid === _this.currentData.uid) {
                    _this.currentUserStatus = _this.currentData.status;
                }
            }
        }));
    };
    ChatViewPage.prototype.sendMessage = function () {
        var _this = this;
        console.log('tapped on send Message ', this.messageText);
        if (this.messageText !== '') {
            var messageType = CometChat.MESSAGE_TYPE.TEXT;
            var receiverType = CometChat.RECEIVER_TYPE.USER;
            var textMessage = new CometChat.TextMessage(this.currentData.uid, this.messageText, messageType, receiverType);
            CometChat.sendMessage(textMessage).then(function (message) {
                console.log('Message sent successfully:', message);
                // Text Message Sent Successfully
                _this.userMessages.push(message);
                _this.messageText = '';
                // this.content.scrollToBottom(1500);
                _this.moveToBottom();
            }, function (error) {
                console.log('Message sending failed with error:', error);
            });
        }
    };
    ChatViewPage.prototype.checkBlur = function () {
        console.log('checkBlur called');
        var receiverId = this.currentData.uid;
        var receiverType = CometChat.RECEIVER_TYPE.USER;
        var typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.endTyping(typingNotification);
    };
    ChatViewPage.prototype.checkFocus = function () {
        console.log('checkFocus called');
    };
    ChatViewPage.prototype.checkInput = function () {
        console.log('checkInput called');
        var receiverId = this.currentData.uid;
        var receiverType = CometChat.RECEIVER_TYPE.USER;
        var typingNotification = new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.startTyping(typingNotification);
    };
    ChatViewPage.prototype.updatedeReadAt = function (messageReceipt) {
        for (var i = 0; i < this.userMessages.length; i++) {
            if (this.userMessages[i].id === messageReceipt.messageId) {
                console.log('here the Read item is', this.userMessages[i]);
                var timestamp = Number(messageReceipt.timestamp);
                this.userMessages[i].readAt = timestamp;
                console.log('here the readAt is', this.userMessages[i].readAt);
            }
        }
    };
    ChatViewPage.prototype.updateDeliveredAt = function (messageReceipt) {
        for (var i = 0; i < this.userMessages.length; i++) {
            if (this.userMessages[i].id === messageReceipt.messageId) {
                console.log('here the Delivered item is', this.userMessages[i]);
                var timestamp = Number(messageReceipt.timestamp);
                this.userMessages[i].deliveredAt = timestamp;
            }
        }
    };
    ChatViewPage.prototype.sendReadReceipts = function (message) {
        for (var i = 0; i < this.userMessages.length; i++) {
            if (this.userMessages[i].id === message.id && this.userMessages[i].sender.uid !== this.loggedInUserData.uid) {
                console.log('here the sendReadReceipts item is', this.userMessages[i]);
                CometChat.markMessageAsRead(this.userMessages[i]);
            }
        }
    };
    ChatViewPage.prototype.sendReadBulkReceipts = function () {
        for (var i = 0; i < this.userMessages.length; i++) {
            if (this.userMessages[i].receiver !== this.currentData.uid) {
                CometChat.markMessageAsRead(this.userMessages[i]);
            }
        }
    };
    // dataURItoBlob(dataURI) {
    //   const byteString = atob(dataURI.split(',')[1]);
    //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //   const ab = new ArrayBuffer(byteString.length);
    //   const ia = new Uint8Array(ab);
    //   for (let i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //   }
    //   const bb = new Blob([ab], {type: mimeString});
    //   return bb;
    // }
    // sendMediaMessage() {
    //   let messageType = CometChat.MESSAGE_TYPE.IMAGE;
    //   if (this.messageMedia.type.split('/')[0] === 'image') {
    //       messageType = CometChat.MESSAGE_TYPE.IMAGE;
    //   } else if (this.messageMedia.type.split('/')[0] === 'video') {
    //       messageType = CometChat.MESSAGE_TYPE.VIDEO;
    //   } else {
    //       messageType = CometChat.MESSAGE_TYPE.FILE;
    //   }
    //   const receiverType = CometChat.RECEIVER_TYPE.USER;
    //   const mediaMessage = new CometChat.MediaMessage(this.currentData.uid, this.messageMedia.file, messageType, receiverType);
    //   console.log('mediaMessage', mediaMessage);
    //   CometChat.sendMessage(mediaMessage)
    //   .then(message => {
    //       console.log('cometchat send media message', message);
    //       this.userMessages.push(message);
    //       this.messageMedia = {};
    //       this.moveToBottom();
    //   },
    //   error => {
    //       console.log('Media message sending failed with error', error);
    //   }
    //   );
    // }
    ChatViewPage.prototype.goBack = function () {
        var _this = this;
        this.storage.get('USERPROFILE').then(function (userObj) {
            if (userObj) {
                if (userObj.type == 'coach') {
                    _this.router.navigate(['tabs/tab5/chat-list']);
                }
                else if (userObj.type == 'user') {
                    _this.router.navigate(['tabs/tab5']);
                }
                console.log('user type', userObj.type);
            }
            else {
                _this.zone.run(function () {
                    _this.router.navigate(['login']);
                });
            }
        });
    };
    __decorate([
        ViewChild('content', null),
        __metadata("design:type", Object)
    ], ChatViewPage.prototype, "content", void 0);
    ChatViewPage = __decorate([
        Component({
            selector: 'app-chat-view',
            templateUrl: './chat-view.page.html',
            styleUrls: ['./chat-view.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            ActionSheetController,
            ModalController,
            Storage,
            NgZone,
            RestapiProvider,
            ToastController])
    ], ChatViewPage);
    return ChatViewPage;
}());
export { ChatViewPage };
//# sourceMappingURL=chat-view.page.js.map