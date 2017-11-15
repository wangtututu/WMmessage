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
var ClassListItem = (function (_super) {
    __extends(ClassListItem, _super);
    function ClassListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = ClassListItemSkin;
        return _this;
    }
    ClassListItem.prototype.childrenCreated = function () {
        this.gClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.iXuan.visible = false;
    };
    ClassListItem.prototype.dataChanged = function () {
        this.lName.text = this.data.Name;
        for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
            if (Consts.ClASS_ARR[i].id == this.data.Term_id) {
                this.iXuan.visible = true;
                break;
            }
        }
    };
    ClassListItem.prototype.onClick = function () {
        console.log("111");
        if (this.iXuan.visible) {
            this.iXuan.visible = false;
            for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
                if (Consts.ClASS_ARR[i].id == this.data.Term_id) {
                    Consts.ClASS_ARR.splice(i, 1);
                    // console.log(Consts.ClASS_ARR)
                }
            }
        }
        else {
            this.iXuan.visible = true;
            var _class = {
                id: this.data.Term_id,
                name: this.data.Name
            };
            Consts.ClASS_ARR.push(_class);
            // console.log(Consts.ClASS_ARR)
        }
    };
    return ClassListItem;
}(eui.ItemRenderer));
__reflect(ClassListItem.prototype, "ClassListItem");
