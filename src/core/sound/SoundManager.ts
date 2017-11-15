/**
 * Created by Saco at 2017/08/09
 **/
class SoundManager {
    private bgSound: egret.Sound;
    private bgSoundChannel: egret.SoundChannel;
    private bgSoundKey: string;
    private bgVolume: number = 1;
    private effVolume: number = 1;
    private isPlayingBg: boolean;
    public BgOn: boolean = true;
    public EffOn: boolean = true;
    public constructor() {
    }

    public onInit(): void {

    }

    public setBgSoundKey(str: string): void {
        this.bgSoundKey = str;
    }

    public playBg(): void {
        if (!this.BgOn) return;
        if (this.isPlayingBg) return;
        if (!this.bgSoundKey) {
            return console.error("bg sound not set");
        }
        if (!this.bgSound) {
            this.bgSound = RES.getRes(this.bgSoundKey);
        }
        this.isPlayingBg = true;
        this.bgSoundChannel = this.bgSound.play(0, 0);
        this.bgSoundChannel.volume = this.bgVolume;
    }

    public stopBg(): void {
        this.isPlayingBg = false;
        this.bgSoundChannel.stop();
    }

    public playEffect(key: string): void {
        if (!this.EffOn) return;
        var effSound: egret.Sound = RES.getRes(key);
        var effSoundChannel = effSound.play(0, 1);
        effSoundChannel.volume = this.effVolume;
    }

    public set BgVolume(value: number) {
        this.bgVolume = value;
        if (this.bgSoundChannel) {
            this.bgSoundChannel.volume = value;
        }
    }

    public set EffVolume(value: number) {
        this.effVolume = value;
    }

    public autoStartBg(): void {
        if (this.isPlayingBg) return;
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onAutoStartBg, this);
    }

    private onAutoStartBg(): void {
        this.playBg();
    }
}
