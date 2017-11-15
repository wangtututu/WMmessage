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
var ShouyeItem = (function (_super) {
    __extends(ShouyeItem, _super);
    function ShouyeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = ShouyeItemSkin;
        return _this;
    }
    ShouyeItem.prototype.childrenCreated = function () {
        this.gDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        this.gChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
    };
    ShouyeItem.prototype.dataChanged = function () {
        var _this = this;
        RES.getResByUrl(this.data.url, function (data) {
            _this.iPic.source = data;
        }, this, "image");
        this.lName.text = this.data.name;
        switch (this.data.state) {
            case 1:
                this.gChange.visible = false;
                this.gDel.visible = false;
                break;
            case 2:
                this.gChange.visible = true;
                this.gDel.visible = false;
                break;
            case 3:
                this.gChange.visible = false;
                this.gDel.visible = true;
                break;
            default:
                this.gChange.visible = false;
                this.gDel.visible = false;
                break;
        }
    };
    ShouyeItem.prototype.onDel = function () {
        // alert("删除" + this.data.name)
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=del&id=" + this.data.id, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    ShouyeItem.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
        if (request.response) { }
        // this.list.dataProvider = new eui.ArrayCollection(this._data);
    };
    ShouyeItem.prototype.onChange = function () {
        // alert("修改" + this.data.name)
        Api.ViewManager.openView(AddBlock, this.data);
    };
    return ShouyeItem;
}(eui.ItemRenderer));
__reflect(ShouyeItem.prototype, "ShouyeItem");
