// TypeScript file
/**
* Created by moitech
**/
class UserItem extends eui.ItemRenderer {
    private gMask: eui.Group;
	private lName: eui.Label;
	private lQQ: eui.Label;
	private lRes: eui.Label;
	
    public constructor() {
        super();
        this.skinName = UserItemSkin;
    }

    public childrenCreated(): void {
        this.gMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    public dataChanged(): void {
        this.lName.text = this.data.User_name;
        this.lQQ.text = this.data.Qq;
         this.lRes.text = this.data.Address;
    }
    private onClick():void{
        // alert("详情");
        Api.ViewManager.openView(ModifyMan,this.data);
    }
}