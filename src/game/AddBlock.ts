// TypeScript file
/**
* Created by moitech
**/
class AddBlock extends BaseView {
    private tName: eui.TextInput;
    private gType1: eui.Group;
    private gType2: eui.Group;
    private bPic: eui.Button;
    private lPic: eui.Label;
    private gClick: eui.Group;
    private lTitle: eui.Label;
    private iReturn: eui.Image;
    private tExt:eui.TextInput;
    private _para;
    private _type;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.gClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        this.bPic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
        this.iReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this)
        this.gType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setType1, this)
        this.gType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setType2, this)
    }

    public onOpen(para): void {
        this.onClear();
        if (para) {
            this._para = para;
            this.setMsg(para);
            this.lTitle.text = "修改";
        }
    }
    private onClick() {
        if (this._para) {
            var _name = (this._para.name == this.tName.text) ? "" : ("&name=" + this.tName.text);
            var _pic = (this.lPic.text) ? ("&url=" + this.lPic.text) : "";
            var _type = (this._type == this._para.id) ? "" : ("&type=" + this._type);
            var _ext = (this._para.ext == this.tExt.text) ? "" : ("&type=" + this.tExt.text);
            var data = this._para.id + _name + _type + _pic + _ext;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=mod&id=" + data, egret.HttpMethod.GET);
        } else if (this.tName.text && this._type && this.lPic.text) {
            var _ext = (this.tExt.text) ? ("&type=" + this.tExt.text) : "";
            var data = "name=" + this.tName.text + "&type=" + this._type + "&url=" + this.lPic.text;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=add&" + data, egret.HttpMethod.GET);
        } else {
            alert("请正确填写信息")
        }
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response);
        var data = JSON.parse(request.response);
        if (request.response.length < 20) {
            alert("修改失败");
            return;
        }
        if (this._para) {
            var shouye = Api.ViewManager.getView(Shouye);
            var _data = shouye["_data"];
            for (var i = 0; i < _data.length; i++) {
                if (_data[i].id == data.ID) {
                    _data[i].name = data.Name;
                    _data[i].type = data.Type;
                    _data[i].url = data.Url;
                    break;
                }
            }
            shouye.setData(_data);
            console.log(_data)
        }
        else {
            var shouye = Api.ViewManager.getView(Shouye);
            shouye["getMsg"]();
        }
        Api.ViewManager.closeView(AddBlock)
        // this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    private onPic() {
        QiniuUploader.onComplete = this.onComplete.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    }
    private onComplete(info: any): void {
        if (info) {
            info = JSON.parse(info.response);
            this.lPic.text = info.key;
        }
    }
    private setMsg(data): void {
        this.tName.text = data.name;
        switch (data.type) {
            case "1": this.gType1.getChildAt(2).visible = true;
                this.gType2.getChildAt(2).visible = false;
                this._type = 1;
                break;
            case "2": this.gType2.getChildAt(2).visible = true;
                this.gType1.getChildAt(2).visible = false;
                this._type = 2;
                break;
            default: break;
        }
    }
    private setType1(): void {
        this.gType1.getChildAt(2).visible = true;
        this.gType2.getChildAt(2).visible = false;
        this._type = 1;
    }
    private setType2(): void {
        this.gType2.getChildAt(2).visible = true;
        this.gType1.getChildAt(2).visible = false;
        this._type = 2;
    }
    private onReturn(): void {
        Api.ViewManager.closeView(AddBlock);
    }
    private onClear(): void {
        this.tName.text = null;
        this.gType1.getChildAt(2).visible = false;
        this.gType2.getChildAt(2).visible = false;
        this.lPic.text = null;
        this._type = null;
        this.lTitle.text = "添加";
        this._para = null;
    }
}