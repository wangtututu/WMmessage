// TypeScript file
/**
* Created by moitech
**/
class ClassListItem extends eui.ItemRenderer {
    private lName: eui.Label;
    private iXuan: eui.Image;
    private gClick:eui.Group;

    public constructor() {
        super();
        this.skinName = ClassListItemSkin;

    }

    public childrenCreated(): void {
        this.gClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.iXuan.visible = false;
    }

    public dataChanged(): void {
        this.lName.text = this.data.Name;
        for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
             if (Consts.ClASS_ARR[i].id == this.data.Term_id){
                 this.iXuan.visible = true;
                 break;
             }
        }
    }
    private onClick(): void {
        console.log("111")
        if (this.iXuan.visible) {
            this.iXuan.visible = false;
            for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
                if (Consts.ClASS_ARR[i].id == this.data.Term_id) {
                    Consts.ClASS_ARR.splice(i, 1);
                    // console.log(Consts.ClASS_ARR)
                }
            }
        } else {
            this.iXuan.visible = true;
            var _class = {
                id: this.data.Term_id,
                name: this.data.Name
            }
            Consts.ClASS_ARR.push(_class);
            // console.log(Consts.ClASS_ARR)
        }
    }
}