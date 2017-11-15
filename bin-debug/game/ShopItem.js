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
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = ShopItemSkin;
        return _this;
    }
    ShopItem.prototype.childrenCreated = function () {
        this.gBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
    };
    ShopItem.prototype.dataChanged = function () {
        var _this = this;
        this.lName.text = this.data.restaurant_name;
        RES.getResByUrl(this.data.pic, function (data) {
            _this.iImg.source = data;
        }, this, "image");
    };
    ShopItem.prototype.onBtn = function () {
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
