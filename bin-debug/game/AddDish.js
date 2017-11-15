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
var AddDish = (function (_super) {
    __extends(AddDish, _super);
    function AddDish() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    AddDish.prototype.onInit = function () {
        this.bPic0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic, this);
        this.bPic1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDescPic, this);
        this.gAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
    };
    AddDish.prototype.onOpen = function (para) {
        console.log(para);
        this.tID.text = para.id;
    };
    AddDish.prototype.onPic = function () {
        QiniuUploader.onComplete = this.onComplete.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    };
    AddDish.prototype.onDescPic = function () {
        QiniuUploader.onComplete = this.onComplete1.bind(this);
        var a = document.getElementById("pickfiles");
        a.dispatchEvent(new Event("click"));
    };
    AddDish.prototype.onComplete = function (info) {
        if (info) {
            info = JSON.parse(info.response);
            this.lPic.text = info.key;
        }
    };
    AddDish.prototype.onComplete1 = function (info) {
        if (info) {
            info = JSON.parse(info.response);
            this.lDescPic.text = info.key;
        }
    };
    AddDish.prototype.getMsg = function () {
        if (parseFloat(this.tPrice.text) && this.tName.text && this.tDesc.text) {
            var _price = parseFloat(this.tPrice.text) * 100;
            var data;
        }
    };
    AddDish.prototype.onAdd = function () {
    };
    return AddDish;
}(BaseView));
__reflect(AddDish.prototype, "AddDish");
