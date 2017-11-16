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
var Shouye = (function (_super) {
    __extends(Shouye, _super);
    function Shouye() {
        return _super.call(this) || this;
    }
    Shouye.prototype.onInit = function () {
        this.openLayer = LayerType.UI_TOP;
        this.list.itemRenderer = ShouyeItem;
        this.bAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        this.bChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.bDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        this.bDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDown, this);
        window.onmousewheel = document.onmousewheel = this.scrollFunc.bind(this);
        // 兼容火狐
        document.addEventListener('DOMMouseScroll', this.scrollFunc.bind(this), false);
    };
    Shouye.prototype.onOpen = function (para) {
        this.onClear();
        this.getMsg();
        this.getDay(Time.GET_DAY());
        this.getWeek(Time.GET_WEEK());
        this.getMonth(Time.GET_MONTH());
    };
    Shouye.prototype.onAdd = function () {
        Api.ViewManager.openView(AddBlock);
    };
    Shouye.prototype.scrollFunc = function (e) {
        e = e || window.event;
        var dis = this.scroller.viewport.scrollV;
        if (e.wheelDelta) {
            console.log(e.wheelDelta);
            if (e.wheelDelta > 0) {
                dis -= 20;
                dis = (dis >= 0) ? dis : 0;
            }
            else {
                dis += 20;
                var _dis = this.scroller.viewport.contentHeight - this.scroller.height;
                dis = (dis >= _dis) ? _dis : dis;
            }
        }
        else if (e.detail) {
            console.log(e.detail);
            if (e.detail == -3) {
                dis -= 20;
                dis = (dis >= 0) ? dis : 0;
            }
            else {
                dis += 20;
                var _dis = this.scroller.viewport.contentHeight - this.scroller.height;
                dis = (dis >= _dis) ? _dis : dis;
            }
        }
        this.scroller.viewport.scrollV = dis;
    };
    Shouye.prototype.onChange = function () {
        this.changeItem();
        this.gButton1.visible = false;
        this.gButton2.visible = true;
    };
    Shouye.prototype.onDel = function () {
        this.delItem();
        this.gButton1.visible = false;
        this.gButton2.visible = true;
    };
    Shouye.prototype.onDown = function () {
        this.Item();
        this.gButton1.visible = true;
        this.gButton2.visible = false;
    };
    Shouye.prototype.getMsg = function () {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/termmenu", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    Shouye.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        this._data = JSON.parse(request.response);
        console.log(this._data);
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    };
    Shouye.prototype.Item = function () {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 1;
        }
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    };
    Shouye.prototype.changeItem = function () {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 2;
        }
        console.log(this._data);
        this.list.dataProvider = new eui.ArrayCollection(this._data);
        // console.log(this._data)
    };
    Shouye.prototype.delItem = function () {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 3;
        }
        console.log(this._data);
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    };
    Shouye.prototype.setData = function (arr) {
        this.list.dataProvider = new eui.ArrayCollection(arr);
    };
    Shouye.prototype.getDay = function (data) {
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        console.log(data);
        this.dayTime.text = "(" + Time.GET_TIME(data, true) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" + Math.ceil(data / 1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onDayComplete, this);
    };
    Shouye.prototype.onDayComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
        var data = JSON.parse(request.response);
        this.dayNum.text = data.num;
        this.dayCash.text = data.price;
    };
    Shouye.prototype.getWeek = function (data) {
        console.log(data);
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        this.weekTime.text = "(" + Time.GET_TIME(data, true) + " - " + Time.GET_TIME(new Date(), true) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" + Math.ceil(data / 1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onWeekComplete, this);
    };
    Shouye.prototype.onWeekComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
        var data = JSON.parse(request.response);
        this.weekNum.text = data.num;
        this.weekCash.text = data.price;
    };
    Shouye.prototype.getMonth = function (data) {
        console.log(data);
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        this.monTime.text = "(" + Time.GET_TIME(data, false) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" + Math.ceil(data / 1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onMonthComplete, this);
    };
    Shouye.prototype.onMonthComplete = function (event) {
        var request = event.currentTarget;
        console.log(request.response);
        var data = JSON.parse(request.response);
        this.monNum.text = data.num;
        this.monCash.text = data.price;
    };
    Shouye.prototype.onClear = function () {
        this.scroller.viewport.scrollV = 0;
        this.gButton1.visible = true;
        this.gButton2.visible = false;
        this._data = null;
    };
    return Shouye;
}(BaseView));
__reflect(Shouye.prototype, "Shouye");
