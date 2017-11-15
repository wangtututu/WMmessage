// TypeScript file
/**
* Created by moitech
**/
class ShopDetail extends BaseView {
    private lName: eui.Label;
    private lAdd: eui.Label;
    private _para;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.lAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
    }

    public onOpen(para): void {
        this._para = para;
        this.lName.text = para.restaurant_name;
    }
    private onAdd(): void {
        Api.ViewManager.openView(AddDish, this._para);
    }
}