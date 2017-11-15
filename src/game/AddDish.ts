// TypeScript file
/**
* Created by moitech
**/
class AddDish extends BaseView {
    private tID: eui.TextInput;
    private tName: eui.TextInput;
    private tPrice: eui.TextInput;
    private tOwner0: eui.TextInput;
    private tDesc: eui.TextInput;
    private bPic0: eui.Button;
    private lPic: eui.Label;
    private bPic1: eui.Button;
    private lDescPic: eui.Label;
    private gAddBtn: eui.Group;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.bPic0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
        this.bPic1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDescPic, this);
        this.gAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
    }

    public onOpen(para): void {
        console.log(para)
        this.tID.text = para.id;
    }
    private onPic(): void {
        QiniuUploader.onComplete = this.onComplete.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    }
    private onDescPic(): void {
        QiniuUploader.onComplete = this.onComplete1.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    }
    private onComplete(info: any): void {
        if (info) {
            info = JSON.parse(info.response);
            this.lPic.text = info.key;
        }
    }
    private onComplete1(info: any): void {
        if (info) {
            info = JSON.parse(info.response);
            this.lDescPic.text = info.key;
        }
    }
    private getMsg(): void {
        if (parseFloat(this.tPrice.text) && this.tName.text && this.tDesc.text) {
            var _price = parseFloat(this.tPrice.text) * 100;
            var data
        }
    }
    private onAdd():void{
        
    }
}