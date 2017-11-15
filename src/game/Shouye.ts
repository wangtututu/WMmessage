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
    }
    private onAdd(): void {
        Api.ViewManager.openView(AddBlock)
    }
    public scrollFunc(e): void {
        e = e || window.event;
        
        var dis = this.scroller.viewport.scrollV;
        if (e.wheelDelta) {
            console.log(e.wheelDelta)
            if (e.wheelDelta == 120) {
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
        this.list.dataProvider = new eui.ArrayCollection(this._data);
        // console.log(this._data)
    }
    private delItem(): void {
        for (var i = 0; i < this._data.length; i++) {
            this._data[i].state = 3;
        }
        this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    private onClear():void{
        this.scroller.viewport.scrollV = 0;
        this.gButton1.visible = true;
        this.gButton2.visible = false;
        this._data = null;
    }
}