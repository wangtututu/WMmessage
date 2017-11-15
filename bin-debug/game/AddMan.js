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
var AddMan = (function (_super) {
    __extends(AddMan, _super);
    function AddMan() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    AddMan.prototype.onInit = function () {
        this.gType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType1, this);
        this.gType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType2, this);
        this.gType3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType3, this);
    };
    AddMan.prototype.onOpen = function (para) {
        this.onClear();
        if (para) {
            this.tShopID.text = para;
        }
    };
    AddMan.prototype.onAdd = function () {
        var data = "id=" + this.tPhone.text + "&area=" + this.tArea.text + "&name=" + this.tName.text + "&ddr=" + this.tAddr.text + "&pass=" + this.tPass.text + "&qq=" + this.tQQ.text + "&roletype=" + this._roletype + "&res=" + this._res;
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/register?" + data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    AddMan.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
    };
    AddMan.prototype.onType1 = function () {
        if (this.iType1.visible)
            return;
        this.iType1.visible = true;
        this.iType2.visible = false;
        this.iType3.visible = false;
        this._roletype = 2;
    };
    AddMan.prototype.onType2 = function () {
        if (this.iType2.visible)
            return;
        this.iType2.visible = true;
        this.iType1.visible = false;
        this.iType3.visible = false;
        this._roletype = 3;
    };
    AddMan.prototype.onType3 = function () {
        if (this.iType3.visible)
            return;
        this.iType3.visible = true;
        this.iType1.visible = false;
        this.iType2.visible = false;
        this._roletype = 1;
    };
    AddMan.prototype.onClear = function () {
        this.tName.text = "";
        this.tPhone.text = "";
        this.tAddr.text = "";
        this.tPass.text = "";
        this.tQQ.text = "";
        this.tShopID.text = "";
        this.tArea.text = "";
        this.iType1.visible = false;
        this.iType2.visible = false;
        this.iType3.visible = false;
    };
    return AddMan;
}(BaseView));
__reflect(AddMan.prototype, "AddMan");
