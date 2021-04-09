import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RestapiProvider } from '../../providers/restapis/restapis';
var HtmlvideoComponent = /** @class */ (function () {
    function HtmlvideoComponent(alertCtrl, navCtrl, restProvider) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.restProvider = restProvider;
        this.hide_content = true;
        this.img_thumbnil = true;
        this.timer_display = false;
        this.overlay = false;
        this.overlay1 = false;
        this.overlay2 = false;
        this.overlay3 = false;
        this.amrap = false;
        this.emom = false;
        this.equipSelect = false;
        this.total_loading = 0;
        this.curr_loading = 0;
        this.video_Set = 0;
        this.counter = 10;
        this.disable_Back = false;
        this.showTime = false;
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
        this.spotifyPlayer = false;
        this.applePlayer = false;
        this.classOverlay = 'overlay';
        this.classOverlay2 = 'overlay2';
        this.total_footer = [];
        this.count_footer = 0;
        this.end_time = false;
        this.visible_btn = false;
        this.timeBegan = null;
        this.timeStopped = null;
        this.stoppedDuration = 0;
        this.started = null;
        this.running = false;
        this.blankTime = "00:00";
        this.time = "00:00";
        this._poster = '';
        this._loop = '';
    }
    Object.defineProperty(HtmlvideoComponent.prototype, "vid", {
        set: function (videos) {
            this.warmup_res_data = videos.data;
            this.all_video_detail = videos;
            this.count_vid_list_length = this.warmup_res_data.length;
            this.index = 0;
            this.setVideo(); //
            this.category = "amrap";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "swipe", {
        set: function (change) {
            if (change == 'next') {
                this.swipe_vid('next');
            }
            if (change == 'prev') {
                this.swipe_vid('previous');
                console.log('pre');
            }
            if (change == 'play') {
                this.visible_btn = true;
                this.playVideo();
                console.log('play');
                this.resetClock();
                this.showTime = true;
            }
            if (change == 'close') {
                this.stopClock();
                var me_1 = this;
                this.stopAllVideo(function (r) {
                    me_1.workoutFinished(me_1.time);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "poster", {
        get: function () {
            if (typeof this._poster === 'undefined' || this._poster == "" || this._poster == null)
                this._poster = '../assets/images/vid_bg.jpg';
            return this._poster;
        },
        set: function (poster) { this._poster = (poster && poster.trim()) || '../assets/images/vid_bg.jpg'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "autoplay", {
        get: function () {
            //console.log('autoplay GET::',this._autoplay);
            if (typeof this._autoplay === 'undefined')
                this._autoplay = 'true';
            return this._autoplay;
        },
        set: function (autoplay) {
            //console.log('autoplay',autoplay);
            this._autoplay = (autoplay == 'true') ? 'true' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlvideoComponent.prototype, "loop", {
        get: function () {
            if (typeof this._loop === 'undefined')
                this._loop = '';
            return this._loop;
        },
        set: function (loop) {
            this._loop = (loop == 'true') ? 'true' : '';
        },
        enumerable: true,
        configurable: true
    });
    // ngOnChanges(changes: SimpleChanges): void {
    //   console.log('ngOnChanges htmlvideo ::: ',changes);
    // }
    HtmlvideoComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit htmlvideo ::: ', [this.loop, this.autoplay, this.poster, this.video_url]);
    };
    HtmlvideoComponent.prototype.swipe_vid = function (arg) {
        var me = this;
        if (arg == 'next') {
            if (me.index < me.count_vid_list_length) {
                me.index++;
                console.log('here', me.index, me.count_vid_list_length);
            }
        }
        else {
            if (me.index > 0) {
                me.index--;
                console.log('herezs', me.index);
            }
        }
        if (me.index >= me.count_vid_list_length) {
            console.log('heres', me.index);
            me.stopClock();
            me.stopAllVideo(function (r) {
                me.workoutFinished(me.time);
            });
        }
        this.setVideo(); //
    };
    HtmlvideoComponent.prototype.stopAllVideo = function (callback) {
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
    HtmlvideoComponent.prototype.setVideo = function () {
        try {
            this.video_first = this.warmup_res_data[this.index];
            if (this.video_first) {
                this.set = this.video_first.set;
                this.video = this.video_first.video;
                // this.thumbnail=this.video_first.thumbnail;
                this.video_title = this.video_first.video_title;
                var next = this.warmup_res_data[this.index + 1];
                if (next) {
                    this.Next_vid_title = next.video_title;
                }
                else {
                    this.Next_vid_title = 'finished';
                }
                this.playVideo(); //this.video
            }
        }
        catch (e) {
            console.log('setVideo Catch EE ', e);
        }
    };
    HtmlvideoComponent.prototype.playCurrentVideo = function () {
        var me = this;
        if (me.currentVideoEle && typeof me.currentVideoEle.play === 'function') {
            me.currentVideoEle.play();
        }
    };
    HtmlvideoComponent.prototype.pauseCurrentVideo = function () {
        var me = this;
        if (me.currentVideoEle && typeof me.currentVideoEle.pause === 'function') {
            me.currentVideoEle.pause();
        }
    };
    HtmlvideoComponent.prototype.playVideo = function () {
        try {
            var me_2 = this;
            var videoObj = me_2.warmup_res_data[me_2.index];
            console.log('currentObj', videoObj, me_2.index);
            me_2.warmup_res_data.forEach(function (item, index) {
                if (index != me_2.index) {
                    me_2.warmup_res_data[index]['isPlaying'] = 0; // hidden
                }
                var oldVideoEle = document.getElementById(item['id']);
                if (oldVideoEle) {
                    //console.log('is old ended::',oldVideoEle.ended);
                    oldVideoEle.pause();
                    console.log('call 6::::');
                    // this.videoStatus='Pause';
                }
            });
            me_2.warmup_res_data[me_2.index]['isPlaying'] = 1; //show
            var currentVideoEle_1 = document.getElementById(videoObj['id']);
            //console.log('playVideo currentVideoEle:::',currentVideoEle);
            // it's loaded
            // me.restProvider.dismissLoader();
            if (currentVideoEle_1) {
                currentVideoEle_1.currentTime = 0;
                currentVideoEle_1.play();
                // console.log('callll')
                me_2.currentVideoEle = currentVideoEle_1;
                setTimeout(function () {
                    // console.log('callll')
                    currentVideoEle_1.onended = function (event) {
                        console.log('calling end video', event);
                        setTimeout(function () { me_2.swipe_vid('next'); }, 100);
                        console.log('call 7::::');
                    };
                }, 500);
            }
        }
        catch (e) {
            console.log('VIDEO TAG Catch EE ', e);
        }
    };
    HtmlvideoComponent.prototype.stopClock = function () {
        clearInterval(this.started);
    };
    //<----------------- forward time start  ------------------->
    HtmlvideoComponent.prototype.resetClock = function () {
        var me = this;
        me.timestamp_min = 0;
        me.timestamp_sec = 0;
        me.start();
    };
    HtmlvideoComponent.prototype.start = function () {
        var me = this;
        me.started = setInterval(me.startClock.bind(me), 1000);
    };
    HtmlvideoComponent.prototype.startClock = function () {
        var me = this;
        var min = me.timestamp_min;
        var sec = me.timestamp_sec + 1;
        if (sec > 59) {
            min = me.timestamp_min + 1;
            sec = 0;
        }
        me.timestamp_min = min;
        me.timestamp_sec = sec;
        if (me.timestamp_min == me.all_video_detail.time_duration) {
            me.stopClock();
            me.stopAllVideo(function (r) {
                me.workoutFinished(me.time);
            });
        }
        me.time = me.zeroPrefix(min, 2) + ":" + me.zeroPrefix(sec, 2);
    };
    HtmlvideoComponent.prototype.zeroPrefix = function (num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    };
    HtmlvideoComponent.prototype.workoutFinished = function (timeStamp) {
        return __awaiter(this, void 0, void 0, function () {
            var t, me, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pauseCurrentVideo();
                        t = timeStamp;
                        if (this.end_time) {
                            t = '00:00';
                        }
                        me = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Nice Work',
                                //subHeader: 'You have finished this workout',
                                cssClass: 'secondary',
                                message: '<h1>' + t + '</h1><p>You have finished this warmup</p>',
                                buttons: [
                                    {
                                        text: 'Back To warmup Menu',
                                        role: 'cancel',
                                        handler: function () {
                                            _this.navCtrl.navigateRoot('tabs/tab1');
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
    __decorate([
        Inject(DOCUMENT),
        __metadata("design:type", HTMLElement)
    ], HtmlvideoComponent.prototype, "document", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HtmlvideoComponent.prototype, "elementID", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HtmlvideoComponent.prototype, "video_url", void 0);
    __decorate([
        Input('videos'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "vid", null);
    __decorate([
        Input('change'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "swipe", null);
    __decorate([
        Input('poster'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "poster", null);
    __decorate([
        Input('autoplay'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "autoplay", null);
    __decorate([
        Input('loop'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HtmlvideoComponent.prototype, "loop", null);
    HtmlvideoComponent = __decorate([
        Component({
            selector: 'app-htmlvideo',
            templateUrl: './htmlvideo.component.html',
            styleUrls: ['./htmlvideo.component.scss'],
        }),
        __metadata("design:paramtypes", [AlertController,
            NavController,
            RestapiProvider])
    ], HtmlvideoComponent);
    return HtmlvideoComponent;
}());
export { HtmlvideoComponent };
//# sourceMappingURL=htmlvideo.component.js.map