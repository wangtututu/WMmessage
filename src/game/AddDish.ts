// TypeScript file
/**
* Created by moitech
**/
class AddDish extends BaseView {
    private tID: eui.TextInput;
    private tName: eui.TextInput;
    private tPrice: eui.TextInput;
    private tOwner: eui.TextInput;
    private tDesc: eui.TextInput;
    private bPic0: eui.Button;
    private lPic: eui.Label;
    private bPic1: eui.Button;
    private lDescPic: eui.Label;
    private gAddBtn: eui.Group;
    private classBtn:eui.Rect;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.bPic0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
        this.bPic1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDescPic, this);
        this.gAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        this.classBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClass, this);
    }

    public onOpen(para): void {
        this.onClear()
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
    private onClass(): void {
        Api.ViewManager.openView(ClassList, this.tID.text);
    }
    private onAdd(): void {
        var data = this.getData();
        if (!data) {
            alert("请完善信息");
            return;
        }
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/adddish" + data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        if (request.response.length > 20) {
            Consts.ClASS_ARR = [];
        } else {
            alert("添加失败");
        }
    }
    private getData(): string {
        var _class = "[";
        if (Consts.ClASS_ARR.length) {
            _class += '"' + Consts.ClASS_ARR[0].id + '"';
            for (var i = 1; i < Consts.ClASS_ARR.length; i++) {
                _class += ',"' + Consts.ClASS_ARR[i].id + '"';
            }
        }
        _class += "]";
        var data = `?name=${this.tName.text}&price=${this.tPrice.text}&desc=${this.tDesc.text}&class=${_class}&pic=${this.lPic.text}&descpic=${this.lDescPic.text}`;
        return data;
    }
    private onClear():void{
        this.tName.text = null;
        this.tPrice.text = null;
        this.lPic.text = null;
        this.tOwner.text = null;
        this.tDesc.text = null;
        this.lDescPic.text = null;
    }
}