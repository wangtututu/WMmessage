// TypeScript file
/**
* Created by moitech
**/
class AddShop extends BaseView {
    private tName: eui.TextInput;
    private tPhone: eui.TextInput;
    private tAddr: eui.TextInput;
    private tOwner: eui.TextInput;
    private tDesc: eui.TextInput;
    private tTp: eui.TextInput;
    private lQisong: eui.TextInput;
    private tPeisong: eui.TextInput;
    private tClass: eui.TextInput;
    private bClass: eui.Button;
    private tMan1: eui.TextInput;
    private tJian1: eui.TextInput;
    private tMan3: eui.TextInput;
    private tJian3: eui.TextInput;
    private tMan2: eui.TextInput;
    private tJian2: eui.TextInput;
    private gAddBtn: eui.Group;
    private lPic: eui.Label;
    private bPic: eui.Button;
    private tHot: eui.TextInput;
    private tScale: eui.TextInput;
    private index;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {

        this.gAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.bClass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClass, this);
        this.bPic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
    }

    public onOpen(para): void {
        this.onClear();
        if (para) {
            this.index = 0;
            this.setMsg(para);
        } else {
            this.index = 1;
        }
    }
    private onClick(): void {
        if (this.index == 0) {
            this.onModify();
        } else {
            this.onAdd();
        }
    }
    private _class;
    private setMsg(data): void {
        this.gAddBtn.getChildAt(1)["text"] = "确认更改";
        this.tName.text = data.restaurant_name;
        this.tPhone.text = data.contect_tel;
        this.tAddr.text = data.restaurant_addr;
        this.tDesc.text = data.restaurant_desc;
        this.tOwner.text = data.owner_name;
        this.tHot.text = data.hot;
        this.tScale.text = data.percent;
        var send = data.sendstandard.length > 15 ? JSON.parse(data.sendstandard) : "";
        this.lQisong.text = send.min;
        this.tPeisong.text = send.fee;
        var fee = data.fee_standard;
        fee = JSON.parse(fee);
        if (fee.length > 0) {
            this.tMan1.text = fee[0].max;
            this.tJian1.text = fee[0].fee;
            if (fee.length > 1) {
                this.tMan2.text = fee[1].max;
                this.tJian2.text = fee[1].fee;
                if (fee.length > 2) {
                    this.tMan3.text = fee[2].max;
                    this.tJian3.text = fee[2].fee;
                }
            }
        }
        this.tTp.text = data.tp;
        this._class = JSON.parse(data.shopclass);
        this.getClass();
    }
    private onAdd(): void {
        var data = this.getMsg();
        if (!data) {
            alert("请完善信息");
            return;
        }
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/sregister?" + data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        if (request.response.length > 20) {
            var data = JSON.parse(request.response)
            Api.ViewManager.openView(AddMan, data.ID);
            Consts.ClASS_ARR = [];
        } else {
            alert("添加失败");
        }
    }
    private onModify(): void {
        var data = this.getMsg();
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modify?" + data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onClass(): void {
        Api.ViewManager.openView(ClassList, 'class');
    }
    private onPic(e: egret.Event): void {
        // console.log("111")
        QiniuUploader.onComplete = this.onComplete.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));

    }
    private getClass(): void {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/terms", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onClassGetComplete, this);
    }
    private onClassGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        // console.log(data)
        var txt = "";
        for (var i = 0; i < this._class.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (data[j].Term_id == this._class[i]) {
                    var _class = {
                        id: data[j].Term_id,
                        name: data[j].Name
                    }
                    Consts.ClASS_ARR.push(_class);
                    if (!data[j].Name) continue;
                    txt += data[j].Name + " ";
                }
            }

        }
        this.tClass.text = txt;
    }
    private picUrl;
    private onComplete(info: any): void {
        if (info) {
            info = JSON.parse(info.response);
            //this._img.source = "http://ouxeonbf7.bkt.clouddn.com/" + info.key;
            // RES.getResByUrl("http://ouxeonbf7.bkt.clouddn.com/" + info.key, (data) => {
            //     this._img.source = data;
            // }, this, "image");
            //this._img.touchEnabled = false;
            this.lPic.text = info.key;
            this.picUrl = info.key;
            console.log(info.key)

        }
    }
    private getMsg() {
        if (this.tName.text && this.tPhone.text && this.tAddr.text && this.tOwner.text && this.tDesc.text && Consts.ClASS_ARR.length && this.tTp.text) {
            var _min = this.lQisong.text ? this.lQisong.text : " ";
            var _fee = this.tPeisong.text ? this.tPeisong.text : " "
            var _send = '{"min":' + _min + ',"fee":' + _fee + '}';
            var _fees;
            var fee1 = "";
            var fee2 = "";
            var fee3 = "";
            if (this.tMan1.text && this.tJian1.text) {
                fee1 = '{"max":' + this.tMan1.text + ',"fee":' + this.tJian1.text + '}';
            }
            if (this.tMan2.text && this.tJian2.text) {
                fee2 = ',{"max":' + this.tMan2.text + ',"fee":' + this.tJian2.text + '}';
            }
            if (this.tMan3.text && this.tJian3.text) {
                fee3 = ',{"max":' + this.tMan3.text + ',"fee":' + this.tJian3.text + '}';
            }
            _fees = '[' + fee1 + fee2 + fee3 + ']';

            var _class = "[";
            if (Consts.ClASS_ARR.length) {
                _class += '"' + Consts.ClASS_ARR[0].id + '"';
                for (var i = 1; i < Consts.ClASS_ARR.length; i++) {
                    _class += ',"' + Consts.ClASS_ARR[i].id + '"';
                }
            }
            _class += "]";
            var data = "name=" + this.tName.text + "&tel=" + this.tPhone.text + "&addr=" + this.tAddr.text + "&owner=" + this.tOwner.text + "&desc=" + this.tDesc.text + "&pic=" + this.picUrl + "&class=" + _class + "&sendstandard=" + _send + "&tp=" + this.tTp.text + "&feestandard=" + _fees + "&hot=" + this.tHot.text + "&percent=" + this.tScale.text;
            console.log(data)
            return data;
        } else {
            return null;
        }
    }
    private onClear(): void {
        this.tName.text = null;
        this.tPhone.text = null;
        this.tAddr.text = null;
        this.tOwner.text = null;
        this.tDesc.text = null;
        this.tTp.text = null;
        this.lQisong.text = null;
        this.tPeisong.text = null;
        this.tClass.text = null;
        this.tMan1.text = null;
        this.tJian1.text = null;
        this.tMan3.text = null;
        this.tJian3.text = null;
        this.tMan2.text = null;
        this.tJian2.text = null;
        Consts.ClASS_ARR = [];
        this.lPic.text = null;
        this.picUrl = null;
    }
}