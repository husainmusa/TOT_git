import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, HostListener, NgZone, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestapiProvider } from '../providers/restapis/restapis';
import { LoadingController, AlertController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { AudioProvider } from '../providers/audio/audio';
var PlayVideoPage = /** @class */ (function () {
    function PlayVideoPage(router, route, zone, alertCtrl, loadingCtrl, elementRef, restProvider, audioProvider) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.elementRef = elementRef;
        this.restProvider = restProvider;
        this.audioProvider = audioProvider;
        this.hide_content = true;
        this.img_thumbnil = true;
        this.timer_display = false;
        this.overlay = false;
        this.overlay1 = true;
        this.overlay2 = false;
        this.movements = false;
        this.equip = true;
        this.equipSelect = false;
        this.counter = 10;
        this.set = '';
        this.video = '';
        this.thumbnail = '../assets/images/vid_bg.jpg';
        this.video_title = '';
        this.Next_vid_title = 'Finished';
        this.Next = 0;
        // previous:any=0;
        this.index = 0;
        this.count_vid_list_length = 0;
        this.showWarning = 0;
        this.showSpecialNote = 1;
        this.specialNote = '';
        this.warningNote = '';
        this.timestamp_min = 0;
        this.timestamp_sec = 0;
        this.status = 'none';
        this.timeBegan = null;
        this.timeStopped = null;
        this.stoppedDuration = 0;
        this.started = null;
        this.running = false;
        this.blankTime = "00:00";
        this.time = "00:00";
        this.getScreenSize();
        this.route.queryParams.subscribe(function (params) {
            console.log('params: ', params);
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.id = _this.router.getCurrentNavigation().extras.state.warmup_id;
                _this.type = _this.router.getCurrentNavigation().extras.state.type;
                //console.log(this.id,this.type);
            }
        });
    }
    //@ViewChild('videoPlayer',null) videoPlayer: ElementRef;
    PlayVideoPage.prototype.getScreenSize = function (event) {
        this.scrHeight = window.innerHeight;
        console.log('h', this.scrHeight);
    };
    PlayVideoPage.prototype.ngOnInit = function () {
    };
    PlayVideoPage.prototype.selectEquip = function () {
        console.log('run');
        this.equip = false;
        this.equipSelect = true;
    };
    PlayVideoPage.prototype.opneOverlay = function () {
        this.overlay = true;
        this.overlay1 = false;
    };
    PlayVideoPage.prototype.loadWorkoutVideo = function () {
        var _this = this;
        this.restProvider.showLoader();
        this.restProvider.api_method('get', 'get_workout_vids_detail/' + this.id, null, null).subscribe(function (data) {
            _this.restProvider.dismissLoader();
            console.log('get_workout_vids_detail/', data);
            if (data['status'] == 'success') {
                _this.count_vid_list_length = data['data'].length;
                if (data['data'].length > 0) {
                    _this.warmup_res_data = data['data'];
                    _this.index = 0;
                    _this.thumbnail = data['thumbnail'] ? data['thumbnail'] : '../assets/images/vid_bg.jpg';
                    _this.setVideo(); //
                    //this.video_first=data['data']['0'];
                    //  this.set=this.video_first.set;
                    //  this.video=this.video_first.video;
                    //  this.thumbnail=this.video_first.thumbnail;
                    //this.video_title=this.video_first.video_title;
                    _this.showWarning = data['show_waring_note'] ? data['show_waring_note'] : 0;
                    _this.showSpecialNote = data['show_special_note'] ? data['show_special_note'] : 1;
                    _this.specialNote = data['special_note'] ? data['special_note'] : '';
                    _this.warningNote = data['warning_note'] ? data['warning_note'] : '';
                    //  if(data['data']['1']){
                    //  this.Next_vid_title=data['data']['1']['video_title'];
                    //  }else{
                    //this.Next_vid_title='Finished';
                    // this.previous=0;
                    //  }
                    //  console.log('first_vid',this.video_first)
                    //  console.log('warmup_res_data',this.warmup_res_data);
                }
            }
        }, function (error) {
            console.log('error', error);
            _this.restProvider.dismissLoader();
        });
    };
    PlayVideoPage.prototype.ionViewWillEnter = function () {
        this.loadWorkoutVideo();
    };
    PlayVideoPage.prototype.workoutFinished = function (timeStamp) {
        return __awaiter(this, void 0, void 0, function () {
            var me, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Nice Work',
                                //subHeader: 'You have finished this workout',
                                cssClass: 'secondary',
                                message: '<h1>' + timeStamp + '</h1><p>You have finished this workout</p>',
                                buttons: [
                                    {
                                        text: 'Continue Workout',
                                        role: 'cancel',
                                        handler: function () {
                                            me.close_vid();
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlayVideoPage.prototype.swipe_vid = function (arg) {
        var me = this;
        var timeStamp = this.time;
        if (arg == 'next') {
            this.index++;
        }
        else {
            this.index--;
        }
        if (this.index >= this.count_vid_list_length) {
            console.log('FINISH this.index', this.index, '::count_vid_list_length::', this.count_vid_list_length);
            console.log('time::', timeStamp);
            me.stopClock();
            me.stopAllVideo(function (r) {
                me.workoutFinished(timeStamp);
            });
        }
        else {
            if ((this.index > this.count_vid_list_length - 1) || this.index < 0) {
                this.index = 0;
            }
            this.setVideo(); //
        }
    };
    PlayVideoPage.prototype.stopAllVideo = function (callback) {
        var me = this;
        var workoutVideos = me.warmup_res_data;
        var checkOneByOne = function () {
            if (workoutVideos.length > 0) {
                var item = workoutVideos.pop();
                if (item) {
                    var oldVideoEle = document.getElementById(item['id']);
                    if (oldVideoEle) {
                        oldVideoEle.pause();
                        checkOneByOne();
                    }
                }
                else {
                    checkOneByOne();
                }
            }
            else {
                callback(true);
            }
        };
        checkOneByOne();
    };
    PlayVideoPage.prototype.setVideo = function () {
        try {
            this.video_first = this.warmup_res_data[this.index];
            for (var _i = 0; _i < this.count_vid_list_length; _i++) {
                //console.log(this.index,'footer-indicator-',_i);
                if (document.getElementById('footer-indicator-' + _i)) {
                    document.getElementById('footer-indicator-' + _i).style.background = _i > this.index ? 'var(--ion-color-light)' : 'var(--ion-color-primary)';
                }
            }
            if (this.video_first) {
                this.set = this.video_first.set;
                this.video = this.video_first.video;
                //this.thumbnail=this.video_first.thumbnail;
                this.video_title = this.video_first.video_title;
                if (this.index < this.count_vid_list_length - 1) {
                    var next = this.warmup_res_data[this.index + 1];
                    this.Next_vid_title = next.video_title;
                }
                else {
                    this.Next_vid_title = 'Finished';
                }
                this.playVideo(); //this.video
            }
        }
        catch (e) {
            console.log('setVideo Catch EE ', e);
        }
    };
    PlayVideoPage.prototype.playCurrentVideo = function () {
        var me = this;
        if (me.currentVideoEle && typeof me.currentVideoEle.play === 'function') {
            me.currentVideoEle.play();
        }
    };
    PlayVideoPage.prototype.pauseCurrentVideo = function () {
        var me = this;
        if (me.currentVideoEle && typeof me.currentVideoEle.pause === 'function') {
            me.currentVideoEle.pause();
        }
    };
    PlayVideoPage.prototype.playVideo = function () {
        try {
            var me_1 = this;
            var videoObj = me_1.warmup_res_data[me_1.index];
            me_1.warmup_res_data.forEach(function (item, index) {
                if (index != me_1.index) {
                    me_1.warmup_res_data[index]['isPlaying'] = 0; // hidden
                }
                var oldVideoEle = document.getElementById(item['id']);
                if (oldVideoEle) {
                    //console.log('is old ended::',oldVideoEle.ended);
                    oldVideoEle.pause();
                    console.log('call 6::::');
                    // this.videoStatus='Pause';
                }
            });
            me_1.warmup_res_data[me_1.index]['isPlaying'] = 1; //show
            var currentVideoEle_1 = document.getElementById(videoObj['id']);
            //console.log('playVideo currentVideoEle:::',currentVideoEle);
            if (currentVideoEle_1) {
                currentVideoEle_1.muted = true;
                currentVideoEle_1.currentTime = 0;
                currentVideoEle_1.play();
                me_1.currentVideoEle = currentVideoEle_1;
                setTimeout(function () {
                    currentVideoEle_1.onended = function (event) {
                        console.log('calling end video', event);
                        setTimeout(function () { me_1.swipe_vid('next'); }, 100);
                        console.log('call 7::::');
                    };
                }, 500);
            }
        }
        catch (e) {
            console.log('VIDEO TAG Catch EE ', e);
        }
    };
    PlayVideoPage.prototype.playAudio = function (arg) {
        var _this = this;
        try {
            if (arg == 'beep') {
                this.audioProvider.playStream("../assets/audio/beep.mp3").subscribe(function (event) {
                    var audioObj = event.target;
                    // this.status='videoplay';
                });
            }
            if (arg == 'beep2') {
                this.audioProvider.playStream("../assets/audio/beep_2.mp3").subscribe(function (event) {
                    var audioObj = event.target;
                    switch (event.type) {
                        case 'ended':
                            _this.status = 'beep';
                            var i_1 = 3;
                            var timeDelay = setInterval(function () {
                                i_1--;
                                if (i_1 == 0) {
                                    clearInterval(timeDelay);
                                    console.log('call');
                                    _this.playVideo();
                                }
                            }, 1000);
                    }
                });
                // this.playStream("../assets/audio/beep_2.mp3");
                // let audio = new Audio();
                // audio.src = "../assets/audio/beep_2.mp3";
                // audio.load();
                // audio.play();
                // this.status='beep';
            }
        }
        catch (e) {
            console.log('playAudio Catch Erroor::', arg, e);
        }
    };
    PlayVideoPage.prototype.startCountdown = function () {
        var _this = this;
        var interval = setInterval(function () {
            // console.log(  this.counter);
            _this.counter--;
            if (_this.counter == 5) {
                _this.status = 'timerstart';
            }
            if (_this.counter == 4 || _this.counter == 3 || _this.counter == 2) {
                _this.playAudio('beep');
            }
            if (_this.counter == 1) {
                _this.playAudio('beep2');
            }
            if (_this.counter < 1) {
                _this.resetClock();
                //this.setClock();
                clearInterval(interval);
                _this.timer_display = false;
                // console.log('Ding!');
                _this.overlay = false;
                _this.overlay2 = true;
                _this.img_thumbnil = false;
                // this.playVideo();
            }
            ;
        }, 1000);
    };
    ;
    PlayVideoPage.prototype.stopClock = function () {
        clearInterval(this.started);
    };
    // <-------- forward time interval starts ------->
    PlayVideoPage.prototype.resetClock = function () {
        var me = this;
        me.timestamp_min = 0;
        me.timestamp_sec = 0;
        me.start();
    };
    PlayVideoPage.prototype.start = function () {
        var me = this;
        me.started = setInterval(me.startClock.bind(me), 1000);
    };
    PlayVideoPage.prototype.startClock = function () {
        var me = this;
        var min = me.timestamp_min;
        var sec = me.timestamp_sec + 1;
        if (sec > 59) {
            min = me.timestamp_min + 1;
            sec = 0;
        }
        me.timestamp_min = min;
        me.timestamp_sec = sec;
        me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
    };
    // <-------- forward time interval ends ------->
    // <------------ Reverse time starts ------------>
    PlayVideoPage.prototype.setClock = function () {
        var me = this;
        me.timestamp_min = 2;
        me.timestamp_sec = 59;
        me.startRevCountdown();
    };
    PlayVideoPage.prototype.startRevCountdown = function () {
        var me = this;
        me.started = setInterval(me.startRevClock.bind(me), 1000);
    };
    PlayVideoPage.prototype.startRevClock = function () {
        var me = this;
        var min = me.timestamp_min;
        var sec = me.timestamp_sec - 1;
        if (sec == 0) {
            min = me.timestamp_min - 1;
            sec = 59;
        }
        me.timestamp_min = min;
        me.timestamp_sec = sec;
        me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
    };
    //   <------------ Reverse time interal ends ------------>
    PlayVideoPage.prototype.zeroPrefix = function (num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    };
    PlayVideoPage.prototype.confirmationBox__ = function () {
        var me = this;
        me.stopClock();
        setTimeout(function () {
            console.log('calling start');
            me.start();
        }, 3000);
    };
    PlayVideoPage.prototype.confirmationBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        me.stopClock();
                        me.pauseCurrentVideo();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Quit Workout?',
                                message: 'Do you realy want to quit your workout.',
                                buttons: [
                                    {
                                        text: 'Continue Workout',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                            me.playCurrentVideo();
                                            me.start();
                                        }
                                    },
                                    {
                                        text: 'Quit',
                                        cssClass: 'alert-danger',
                                        handler: function () {
                                            _this.quitWorkoutVideo();
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlayVideoPage.prototype.quitWorkoutVideo = function () {
        var me = this;
        var timeStamp = this.time;
        setTimeout(function () { me.workoutFinished(timeStamp); }, 200);
        //me.close_vid();
    };
    PlayVideoPage.prototype.close_vid = function () {
        var _this = this;
        this.status = 'close';
        this.stopClock();
        this.router.navigate(['/tabs/tab2']);
        return;
        console.log(this.id, this.type);
        if (this.type == 'Workout') {
            this.restProvider.api_method('get', 'get_workout_detail/' + this.id, null, null).subscribe(function (data) {
                console.log('close_vid :: get_workout_detail/::', data);
                if (data['status'] === 'success') {
                    _this.response_data = data['workout'];
                    _this.restProvider.present_Modal(_this.response_data, 'Workout', null);
                    _this.zone.run(function () {
                        _this.router.navigate(['/tabs/tab2']);
                    });
                }
                else {
                }
            }, function (error) {
                console.log('error', error);
            });
        }
        else {
            this.router.navigate(['/tabs/tab2']);
        }
    };
    PlayVideoPage.prototype.start_vid = function () {
        this.hide_content = false;
        this.timer_display = true;
        this.startCountdown();
    };
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PlayVideoPage.prototype, "getScreenSize", null);
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], PlayVideoPage.prototype, "document", void 0);
    PlayVideoPage = __decorate([
        Component({
            selector: 'app-play-video',
            templateUrl: './play-video.page.html',
            styleUrls: ['./play-video.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            NgZone,
            AlertController,
            LoadingController,
            ElementRef,
            RestapiProvider,
            AudioProvider])
    ], PlayVideoPage);
    return PlayVideoPage;
}());
export { PlayVideoPage };
//# sourceMappingURL=play-video.page.js.map