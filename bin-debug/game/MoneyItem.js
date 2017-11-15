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
var MoneyItem = (function (_super) {
    __extends(MoneyItem, _super);
    function MoneyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = MoneyItemSkin;
        return _this;
    }
    MoneyItem.prototype.childrenCreated = function () {
    };
    MoneyItem.prototype.dataChanged = function () {
        this.lName.text = this.data.Name;
        this.lMoney.text = this.data.Money;
        this.lOther.text = this.data.Other;
    };
    return MoneyItem;
}(eui.ItemRenderer));
__reflect(MoneyItem.prototype, "MoneyItem");
