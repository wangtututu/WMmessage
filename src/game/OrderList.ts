// TypeScript file
/**
* Created by moitech
**/
class OrderList extends BaseView {
    private scroller: eui.Scroller;
	private list: eui.List;
	private lLast: eui.Label;
	private lNext: eui.Label;
	private _page;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.list.itemRenderer = OrderItem;
        this.lLast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLast, this);
        this.lNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
        window.onmousewheel = document.onmousewheel = this.scrollFunc.bind(this);
        // 兼容火狐
        document.addEventListener('DOMMouseScroll', this.scrollFunc.bind(this), false)
    }

     public onOpen(para): void {
        this._page = 0;
        this.getMsg(this._page);
        this.scroller.viewport.scrollV = 0;
    }
    private getMsg(t) {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/allorder?page=" + t, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;

        if (request.response.length > 20 || this._page == 0) {
            var data = JSON.parse(request.response)
            console.log(data)
            this.list.dataProvider = new eui.ArrayCollection(data);
        } else {
            this._page--;
            this.getMsg(this._page)
        }
    }
    private onLast(): void {
        this._page--;
        this._page = this._page < 0 ? 0 : this._page;
        this.getMsg(this._page)
    }
    private onNext(): void {
        this._page++;
        this.getMsg(this._page)
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
}
