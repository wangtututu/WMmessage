// TypeScript file
/**
* Created by moitech
**/
class ModifyMan extends BaseView {
    private tName: eui.TextInput;
    private tAddr: eui.TextInput;
    private tPass: eui.TextInput;
    private tQQ: eui.TextInput;
    private tShopID: eui.TextInput;
    private gPass: eui.Group;
    private iPass: eui.Image;
    private gAddBtn: eui.Group;
    private gReturn:eui.Group;
    private _para;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.gAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.gPass.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPass,this);
        this.gReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
    }

    public onOpen(para): void {
        this.onClear();
        this._para = para;
        this.setMsg();
    }
    private setMsg(): void {
        this.tName.text = this._para.User_name;
        this.tAddr.text = this._para.Address;
        this.tPass.text = this._para.Password;
        this.tQQ.text = this._para.Qq;
        this.tShopID.text = this._para.Restaurant_id;
    }
    private onPass():void{
        if(this.iPass.visible){
            this.iPass.visible = false;
            return;
        }
        this.iPass.visible = true;
    }
    private onClick(): void {
        var _name = (this.tName.text == this._para.User_name) ? "" : ("&name=" + this.tName.text);
        var _addr = (this.tAddr.text == this._para.Address) ? "" : ("&addr=" + this.tAddr.text);
        var _pass = (this.tPass.text == this._para.Password) ? "" : ("&pass=" + this.tPass.text);
        var _qq = (this.tQQ.text == this._para.Qq) ? "" : ("&qq=" + this.tQQ.text);
        var _res = (this.tShopID.text == this._para.Restaurant_id) ? "" : ("&pass=" + this.tShopID.text);
        var _terminate = this.iPass.visible ? ("&terminate=" + new Date().getDate()) : "";
        var _data = this._para.ID + _name + _addr + _pass + _qq + _res + _terminate;
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/modifyuser?id=" + _data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response);
        if(request.response > 10){
            Api.ViewManager.closeView(ModifyMan)
        }else{
            alert("修改失败")
        }
    }
    private onReturn():void{
        Api.ViewManager.closeView(ModifyMan)
    }
    private onClear(): void {
        this.tName.text = null;
        this.tAddr.text = null;
        this.tPass.text = null;
        this.tQQ.text = null;
        this.tShopID.text = null;
        this._para = null;
        this.iPass.visible = false;
    }
}