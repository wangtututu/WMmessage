// TypeScript file
/**
* Created by moitech
**/
class ShopList extends BaseView {
    private gStage: eui.Group;
    private lName: eui.Label;
    private scroller: eui.Scroller;
    private list: eui.List;
    private lAdd:eui.Label;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.list.itemRenderer = ShopItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        this.lAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAdd,this);
    }

    public onOpen(para): void {
        this.getMsg();
    }
    private getMsg() {
        
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/hotshangjia?page=1", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);

    }
    private onChange() {
        Api.ViewManager.closeView(ShopList)
        Api.ViewManager.openView(ShopDetail, this.list.selectedItem);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        // console.log(request.response)
        var data = JSON.parse(request.response)
        this.list.dataProvider = new eui.ArrayCollection(data)
    }
    private onAdd(){
        Api.ViewManager.openView(AddShop);
    }
}