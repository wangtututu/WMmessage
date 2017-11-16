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
    }

    public onOpen(para): void {
        this._para = para;
        this.lName.text = para.restaurant_name;
    }
    private onAdd(): void {
        Api.ViewManager.openView(AddDish, this._para);
    }
    private onMenu():void{

    }
    private onIndex():void{
        
    }
    private onDay():void{
        // console.log(Time.NOW)
    }
    private onWeek():void{
        
    }
    private onMonth():void{
        
    }
}