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
var ShopList = (function (_super) {
    __extends(ShopList, _super);
    function ShopList() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    ShopList.prototype.onInit = function () {
        this.list.itemRenderer = ShopItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        this.lAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
    };
    ShopList.prototype.onOpen = function (para) {
        this.getMsg();
    };
    ShopList.prototype.getMsg = function () {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/hotshangjia?page=1", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    ShopList.prototype.onChange = function () {
        Api.ViewManager.closeView(ShopList);
        Api.ViewManager.openView(ShopDetail, this.list.selectedItem);
    };
    ShopList.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        // console.log(request.response)
        var data = JSON.parse(request.response);
        this.list.dataProvider = new eui.ArrayCollection(data);
    };
    ShopList.prototype.onAdd = function () {
        Api.ViewManager.openView(AddShop);
    };
    return ShopList;
}(BaseView));
__reflect(ShopList.prototype, "ShopList");
