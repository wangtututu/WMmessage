// TypeScript file
/**
* Created by moitech
**/
class ShopListItem extends eui.ItemRenderer {
    private lName: eui.Label;
    private rBtn: eui.Rect;

    public constructor() {
        super();
        this.skinName = ShopListItemSkin;
    }

    public childrenCreated(): void {
        this.rBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
    }

    public dataChanged(): void {
        this.lName.text = this.data;
    }
    private onBtn(): void {
        
    }
}