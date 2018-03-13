// TypeScript file
/**
* Created by moitech
**/
class DelClassItem extends eui.ItemRenderer {
    private classname: eui.Label;

    public constructor() {
        super();
        this.skinName = DelClassItemSkin;
    }

    public childrenCreated(): void {
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDel,this)
    }

    public dataChanged(): void {
        this.classname.text = this.data.Name;
    }
    private onDel():void{
        this.onGetMsg();
    }
    private onGetMsg(): void {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/delterms?id=" + this.data.Term_id, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetClassComplete, this);
    }
    private onGetClassComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request)
    }
}