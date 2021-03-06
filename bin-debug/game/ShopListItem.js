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
var ShopListItem = (function (_super) {
    __extends(ShopListItem, _super);
    function ShopListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = ShopListItemSkin;
        return _this;
    }
    ShopListItem.prototype.childrenCreated = function () {
        this.rBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
    };
    ShopListItem.prototype.dataChanged = function () {
        this.lName.text = this.data;
    };
    ShopListItem.prototype.onBtn = function () {
    };
    return ShopListItem;
}(eui.ItemRenderer));
__reflect(ShopListItem.prototype, "ShopListItem");
