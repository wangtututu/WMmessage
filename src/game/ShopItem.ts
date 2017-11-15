// TypeScript file
/**
* Created by moitech
**/
class ShopItem extends eui.ItemRenderer {
    private iImg: eui.Image;
    private lName: eui.Label;
    private gBtn: eui.Group;


    public constructor() {
        super();
        this.skinName = ShopItemSkin;
    }

    public childrenCreated(): void {
        this.gBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
    }

    public dataChanged(): void {
        this.lName.text = this.data.restaurant_name;
        RES.getResByUrl(this.data.pic, (data) => {
            this.iImg.source = data;
        }, this, "image");
    }
    private onBtn(): void {

    }
}