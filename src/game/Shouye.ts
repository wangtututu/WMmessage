// TypeScript file
/**
* Created by moitech
**/
class Shouye extends BaseView {
    private list: eui.List;
    private bAdd: eui.Button;
    private bChange: eui.Button;
    private bDel: eui.Button;
    private bDown: eui.Button;
    private gButton1: eui.Group;
    private gButton2: eui.Group;
    private scroller: eui.Scroller;
    private dayNum: eui.Label;
    private dayCash: eui.Label;
    private weekNum: eui.Label;
    private weekCash: eui.Label;
    private monNum: eui.Label;
    private monCash: eui.Label;
    private dayTime: eui.Label;
    private weekTime: eui.Label;
    private monTime: eui.Label;


    public constructor() {
        super();
    }

    public onInit(): void {
        this.openLayer = LayerType.UI_TOP;
        this.list.itemRenderer = ShouyeItem;
        this.bAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        this.bChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.bDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        this.bDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDown, this);
        window.onmousewheel = document.onmousewheel = this.scrollFunc.bind(this);
        // 兼容火狐
        document.addEventListener('DOMMouseScroll', this.scrollFunc.bind(this), false)
    }

    public onOpen(para): void {
        this.onClear();
        this.getMsg();
        this.getDay(Time.GET_DAY());
        this.getWeek(Time.GET_WEEK());
        this.getMonth(Time.GET_MONTH());
    }
    private onAdd(): void {
        Api.ViewManager.openView(AddBlock)
    }
    public scrollFunc(e): void {
        e = e || window.event;

        var dis = this.scroller.viewport.scrollV;
        if (e.wheelDelta) {
            console.log(e.wheelDelta)
            if (e.wheelDelta > 0) {
                dis -= 20;
                dis = (dis >= 0) ? dis : 0;
            } else {
                dis += 20;
                var _dis = this.scroller.viewport.contentHeight - this.scroller.height;
                dis = (dis >= _dis) ? _dis : dis;
            }
        } else if (e.detail) { // 兼容火狐
            console.log(e.detail)
            if (e.detail == -3) {
                dis -= 20;
                dis = (dis >= 0) ? dis : 0;
            } else {
                dis += 20;
                var _dis = this.scroller.viewport.contentHeight - this.scroller.height;
                dis = (dis >= _dis) ? _dis : dis;
            }
        }
        this.scroller.viewport.scrollV = dis;
    }
    private onChange(): void {
        this.changeItem();
        this.gButton1.visible = false;
        this.gButton2.visible = true;
    }
    private onDel(): void {
        this.delItem();
        this.gButton1.visible = false;
        this.gButton2.visible = true;
    }
    private onDown(): void {
        this.Item();
        this.gButton1.visible = true;
        this.gButton2.visible = false;
    }
    private getMsg(): void {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/termmenu", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private _data;
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        this._data = JSON.parse(request.response);
        console.log(this._data)
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    private Item(): void {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 1;
        }
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    private changeItem(): void {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 2;
        }
        console.log(this._data)
        this.list.dataProvider = new eui.ArrayCollection(this._data);
        // console.log(this._data)
    }
    private delItem(): void {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 3;
        }
        console.log(this._data)
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    public setData(arr): void {
        this.list.dataProvider = new eui.ArrayCollection(arr);
    }
    private getDay(data): void {
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        console.log(data)
        this.dayTime.text = "(" + Time.GET_TIME(data, true) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" + Math.ceil(data/1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onDayComplete, this);
    }
    private onDayComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        var data = JSON.parse(request.response)
        this.dayNum.text = data.num;
        this.dayCash.text = data.price;
    }
    private getWeek(data): void {
        console.log(data)
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        this.weekTime.text = "(" + Time.GET_TIME(data, true) + " - " + Time.GET_TIME(new Date(), true) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" +  Math.ceil(data/1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onWeekComplete, this);
    }
    private onWeekComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        var data = JSON.parse(request.response)
        this.weekNum.text = data.num;
        this.weekCash.text = data.price;
    }
    private getMonth(data): void {
        console.log(data)
        // var data = Time.GET_TIME(Time.GET_DAY, true);
        this.monTime.text = "(" + Time.GET_TIME(data, false) + ")";
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?from=" +  Math.ceil(data/1000), egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onMonthComplete, this);
    }
    private onMonthComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        var data = JSON.parse(request.response)
        this.monNum.text = data.num;
        this.monCash.text = data.price;
    }
    private onClear(): void {
        this.scroller.viewport.scrollV = 0;
        this.gButton1.visible = true;
        this.gButton2.visible = false;
        this._data = null;
    }
}