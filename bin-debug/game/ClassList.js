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
var ClassList = (function (_super) {
    __extends(ClassList, _super);
    function ClassList() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        _this.list.itemRenderer = ClassListItem;
        return _this;
    }
    ClassList.prototype.onInit = function () {
        this.rReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gClickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    ClassList.prototype.onOpen = function (para) {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/terms", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    ClassList.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        // console.log(data)
        this.list.dataProvider = new eui.ArrayCollection(data);
    };
    ClassList.prototype.onReturn = function () {
        Api.ViewManager.closeView(ClassList);
    };
    ClassList.prototype.onClick = function () {
        Api.ViewManager.closeView(ClassList);
        // console.log(Consts.ClASS_ARR)
        var addShop = Api.ViewManager.getView(AddShop);
        var data = "";
        for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
            data = data + Consts.ClASS_ARR[i].name + " ";
        }
        addShop["tClass"].text = data;
    };
    return ClassList;
}(BaseView));
__reflect(ClassList.prototype, "ClassList");
