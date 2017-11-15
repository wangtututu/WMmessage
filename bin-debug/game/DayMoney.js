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
var DayMoney = (function (_super) {
    __extends(DayMoney, _super);
    function DayMoney() {
        return _super.call(this) || this;
    }
    DayMoney.prototype.onInit = function () {
        this.list.itemRenderer = MoneyItem;
        this.openLayer = LayerType.UI_TOP;
    };
    DayMoney.prototype.onOpen = function (para) {
        // var data = [{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // }]
        // this.list.dataProvider = new eui.ArrayCollection(data)
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?id=&from=0&to=", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    DayMoney.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log(request);
    };
    return DayMoney;
}(BaseView));
__reflect(DayMoney.prototype, "DayMoney");
