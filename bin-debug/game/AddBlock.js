var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TypeScript file
/**
* Created by moitech
**/
var AddBlock = (function (_super) {
    __extends(AddBlock, _super);
    function AddBlock() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    AddBlock.prototype.onInit = function () {
        this.gClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.bPic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
        this.iReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setType1, this);
        this.gType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setType2, this);
    };
    AddBlock.prototype.onOpen = function (para) {
        this.onClear();
        if (para) {
            this._para = para;
            this.setMsg(para);
            this.lTitle.text = "修改";
        }
    };
    AddBlock.prototype.onClick = function () {
        if (this._para) {
            var _name = (this._para.name == this.tName.text) ? "" : ("&name=" + this.tName.text);
            var _pic = (this.lPic.text) ? ("&url=" + this.lPic.text) : "";
            var _type = (this._type == this._para.id) ? "" : ("&type=" + this._type);
            var data = this._para.id + _name + _type;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=mod&id=" + data, egret.HttpMethod.GET);
        }
        else if (this.tName.text && this._type && this.lPic.text) {
            var data = "name=" + this.tName.text + "&type=" + this._type + "&url=" + this.lPic.text;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=add&" + data, egret.HttpMethod.GET);
        }
        else {
            alert("请正确填写信息");
        }
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    AddBlock.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
        if (request.response == "failed:need login") {
            alert("请登录");
        }
        Api.ViewManager.closeView(AddBlock);
        // this.list.dataProvider = new eui.ArrayCollection(this._data);
    };
    AddBlock.prototype.onPic = function () {
        QiniuUploader.onComplete = this.onComplete.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    };
    AddBlock.prototype.onComplete = function (info) {
        if (info) {
            info = JSON.parse(info.response);
            this.lPic.text = info.key;
        }
    };
    AddBlock.prototype.setMsg = function (data) {
        this.tName.text = data.name;
        switch (data.type) {
            case "1":
                this.gType1.getChildAt(2).visible = true;
                this.gType2.getChildAt(2).visible = false;
                this._type = 1;
                break;
            case "2":
                this.gType2.getChildAt(2).visible = true;
                this.gType1.getChildAt(2).visible = false;
                this._type = 2;
                break;
            default: break;
        }
    };
    AddBlock.prototype.setType1 = function () {
        this.gType1.getChildAt(2).visible = true;
        this.gType2.getChildAt(2).visible = false;
        this._type = 1;
    };
    AddBlock.prototype.setType2 = function () {
        this.gType2.getChildAt(2).visible = true;
        this.gType1.getChildAt(2).visible = false;
        this._type = 2;
    };
    AddBlock.prototype.onReturn = function () {
        Api.ViewManager.closeView(AddBlock);
    };
    AddBlock.prototype.onClear = function () {
        this.tName.text = null;
        this.gType1.getChildAt(2).visible = false;
        this.gType2.getChildAt(2).visible = false;
        this.lPic.text = null;
        this._type = null;
        this.lTitle.text = "添加";
    };
    return AddBlock;
}(BaseView));
__reflect(AddBlock.prototype, "AddBlock");
