var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2017/08/09
 **/
var SoundManager = (function () {
    function SoundManager() {
        this.bgVolume = 1;
        this.effVolume = 1;
        this.BgOn = true;
        this.EffOn = true;
    }
    SoundManager.prototype.onInit = function () {
    };
    SoundManager.prototype.setBgSoundKey = function (str) {
        this.bgSoundKey = str;
    };
    SoundManager.prototype.playBg = function () {
        if (!this.BgOn)
            return;
        if (this.isPlayingBg)
            return;
        if (!this.bgSoundKey) {
            return console.error("bg sound not set");
        }
        if (!this.bgSound) {
            this.bgSound = RES.getRes(this.bgSoundKey);
        }
        this.isPlayingBg = true;
        this.bgSoundChannel = this.bgSound.play(0, 0);
        this.bgSoundChannel.volume = this.bgVolume;
    };
    SoundManager.prototype.stopBg = function () {
        this.isPlayingBg = false;
        this.bgSoundChannel.stop();
    };
    SoundManager.prototype.playEffect = function (key) {
        if (!this.EffOn)
            return;
        var effSound = RES.getRes(key);
        var effSoundChannel = effSound.play(0, 1);
        effSoundChannel.volume = this.effVolume;
    };
    Object.defineProperty(SoundManager.prototype, "BgVolume", {
        set: function (value) {
            this.bgVolume = value;
            if (this.bgSoundChannel) {
                this.bgSoundChannel.volume = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "EffVolume", {
        set: function (value) {
            this.effVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.autoStartBg = function () {
        if (this.isPlayingBg)
            return;
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onAutoStartBg, this);
    };
    SoundManager.prototype.onAutoStartBg = function () {
        this.playBg();
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
