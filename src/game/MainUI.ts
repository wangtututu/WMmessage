// TypeScript file
/**
* Created by moitech
**/
class MainUI extends BaseView {
    private scroller1: eui.Scroller;
    private gMainBtn: eui.Group;
    private gListBtn: eui.Group;
    private gShopBtn:eui.Group;
    private gManBtn:eui.Group;
    private lLogin:eui.Label;


    public constructor() {
        super();
    }

    public onInit(): void {
        this.gMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMain, this);
        this.gListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetList, this);
        // this.lLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.gShopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShop, this);
        this.gManBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMan, this);
    }

    public onOpen(para): void {
        this.onClear();
        // this.onMain();

    }
    private onClear(): void {
        this.scroller1.viewport.scrollV = 0;
    }
    private onMain(): void {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(Shouye);
    }
    private onGetList(): void {
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(ShopList);
    }
    private onLogin():void{
        Api.ViewManager.openView(Login)
    }
    private onShop():void{
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(AddShop);
    }
    private onMan():void{
        Api.ViewManager.closeViewsByLayer(LayerType.UI_TOP);
        Api.ViewManager.openView(AddMan);
    }
    public LogSuccss(a:any):void{
        this.lLogin.text = a.ID;
        console.log(a)
        this.onMain();
        // this.lLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this)
        this.lLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetail, this)
    }
    private onDetail(){
        alert("详情")
    }
}