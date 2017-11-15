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
var ShopDetail = (function (_super) {
    __extends(ShopDetail, _super);
    function ShopDetail() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    ShopDetail.prototype.onInit = function () {
        this.lAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
    };
    ShopDetail.prototype.onOpen = function (para) {
        this._para = para;
        this.lName.text = para.restaurant_name;
    };
    ShopDetail.prototype.onAdd = function () {
        Api.ViewManager.openView(AddDish, this._para);
    };
    return ShopDetail;
}(BaseView));
__reflect(ShopDetail.prototype, "ShopDetail");
