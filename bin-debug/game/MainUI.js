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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        return _super.call(this) || this;
    }
    MainUI.prototype.onInit = function () {
        this.gMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMain, this);
        this.gListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetList, this);
        // this.lLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.gShopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShop, this);
        this.gManBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMan, this);
    };
    MainUI.prototype.onOpen = function (para) {
        this.onClear();
        // this.onMain();
    };
    MainUI.prototype.onClear = function () {
        this.scroller1.viewport.scrollV = 0;
    };
    MainUI.prototype.onMain = function () {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(Shouye);
    };
    MainUI.prototype.onGetList = function () {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(ShopList);
    };
    MainUI.prototype.onLogin = function () {
        Api.ViewManager.openView(Login);
    };
    MainUI.prototype.onShop = function () {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(AddShop);
    };
    MainUI.prototype.onMan = function () {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(AddMan);
    };
    MainUI.prototype.LogSuccss = function (a) {
        this.lLogin.text = a.ID;
        console.log(a);
        this.onMain();
        // this.lLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this)
        this.lLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetail, this);
    };
    MainUI.prototype.onDetail = function () {
        alert("详情");
    };
    return MainUI;
}(BaseView));
__reflect(MainUI.prototype, "MainUI");
