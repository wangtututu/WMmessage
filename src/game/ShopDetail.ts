// TypeScript file
/**
* Created by moitech
**/
class ShopDetail extends BaseView {
    private lName: eui.Label;
    private lAdd: eui.Label;
    private gIntex: eui.Group;
    private gMenu: eui.Group;
    private gDay: eui.Group;
    private gWeek: eui.Group;
    private gMonth: eui.Group;
    private gBus1: eui.Group;
    private gBus0: eui.Group;
    private lModify:eui.Label;
    private _para;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.lAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
        this.gIntex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIndex, this);
        this.gMenu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
        this.gDay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDay, this);
        this.gWeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWeek, this);
        this.gMonth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMonth, this);
        this.gBus1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBus1, this);
        this.gBus0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBus0, this);
        this.lModify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onModify, this);
    }

    public onOpen(para): void {
        this._para = para;
        this.lName.text = para.restaurant_name;
        Consts.DISH_ARR = JSON.parse(para.shopclass);
        if (this._para.business == 1) {
            this._state = true;
            this.gBus1.getChildAt(1)["textColor"] = 0xff0000;
            this.gBus0.getChildAt(1)["textColor"] = 0x999999;
        } else {
            this.gBus0.getChildAt(1)["textColor"] = 0xff0000;
            this.gBus1.getChildAt(1)["textColor"] = 0x999999;
            this._state = false;
        }
    }
    private onAdd(): void {
        Api.ViewManager.openView(AddDish, this._para);
    }
    private onMenu(): void {

    }
    private onIndex(): void {

    }
    private onDay(): void {
        // console.log(Time.NOW)
    }
    private onWeek(): void {

    }
    private onMonth(): void {

    }
    private onModify():void{
        Api.ViewManager.openView(AddShop,this._para)
    }
    private _state = null;
    private onBus1(): void {
        if (this._state) return;
        this._state = true;
        this.setBus(this._state)
    }
    private onBus0(): void {
        if (!this._state) return;
        this._state = false;
        this.setBus(this._state)
    }
    private setBus(s): void {
        if (s) {
            this.gBus1.getChildAt(1)["textColor"] = 0xff0000;
            this.gBus0.getChildAt(1)["textColor"] = 0x999999;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/shanghu/modify?resid=" + this._para.id + "&business=1", egret.HttpMethod.GET);
        } else {
            this.gBus0.getChildAt(1)["textColor"] = 0xff0000;
            this.gBus1.getChildAt(1)["textColor"] = 0x999999;
            var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/shanghu/modify?resid=" + this._para.id + "&business=0", egret.HttpMethod.GET);
        }
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
    }
}