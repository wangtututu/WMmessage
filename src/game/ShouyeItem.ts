// TypeScript file
/**
* Created by moitech
**/
class ShouyeItem extends eui.ItemRenderer {
    private iPic: eui.Image;
    private lName: eui.Label;
    private gDel: eui.Group;
    private gChange: eui.Group;

    public constructor() {
        super();
        this.skinName = ShouyeItemSkin;
    }

    public childrenCreated(): void {
        this.gDel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDel, this);
        this.gChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
    }

    public dataChanged(): void {
        RES.getResByUrl(this.data.url, (data) => {
            this.iPic.source = data;
        }, this, "image");
        this.lName.text = this.data.name;
        switch (this.data.state) {
            case 1: this.gChange.visible = false; this.gDel.visible = false; break;
            case 2: this.gChange.visible = true; this.gDel.visible = false; break;
            case 3: this.gChange.visible = false; this.gDel.visible = true; break;
            default: this.gChange.visible = false; this.gDel.visible = false; break;
        }

    }
    private onDel(): void {
        // alert("删除" + this.data.name)
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifytermmenu?state=del&id=" + this.data.id, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response);
        if (request.response) { }
        // this.list.dataProvider = new eui.ArrayCollection(this._data);
    }
    private onChange(): void {
        // alert("修改" + this.data.name)
        Api.ViewManager.openView(AddBlock,this.data);
    }

}