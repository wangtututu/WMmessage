// TypeScript file
/**
* Created by moitech
**/
class AddMan extends BaseView {
    private tName: eui.TextInput;
    private tPhone: eui.TextInput;
    private tAddr: eui.TextInput;
    private tPass: eui.TextInput;
    private tQQ: eui.TextInput;
    private tArea: eui.TextInput;
    private tShopID: eui.TextInput;
    private gType1: eui.Group;
    private iType1: eui.Image;
    private gType2: eui.Group;
    private iType2: eui.Image;
    private gType3: eui.Group;
    private iType3: eui.Image;
    private gAddBtn: eui.Group;

    private _roletype;
    private _res;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.gType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType1, this);
        this.gType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType2, this);
        this.gType3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onType3, this);
    }

    public onOpen(para): void {
        this.onClear();
        if (para) {
            this.tShopID.text = para;
        }
    }
    private onAdd(): void {
        var data = "id=" + this.tPhone.text + "&area=" + this.tArea.text + "&name=" + this.tName.text + "&ddr=" + this.tAddr.text + "&pass=" + this.tPass.text + "&qq=" + this.tQQ.text + "&roletype=" + this._roletype + "&res=" + this._res;
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/register?" + data, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        
    }
    private onType1(): void {
        if (this.iType1.visible) return;
        this.iType1.visible = true;
        this.iType2.visible = false;
        this.iType3.visible = false;
        this._roletype = 2;
    }
    private onType2(): void {
        if (this.iType2.visible) return;
        this.iType2.visible = true;
        this.iType1.visible = false;
        this.iType3.visible = false;
        this._roletype = 3;
    }
    private onType3(): void {
        if (this.iType3.visible) return;
        this.iType3.visible = true;
        this.iType1.visible = false;
        this.iType2.visible = false;
        this._roletype = 1;
    }
    private onClear(): void {
        this.tName.text = "";
        this.tPhone.text = "";
        this.tAddr.text = "";
        this.tPass.text = "";
        this.tQQ.text = "";
        this.tShopID.text = "";
        this.tArea.text = "";
        this.iType1.visible = false;
        this.iType2.visible = false;
        this.iType3.visible = false;
    }
}