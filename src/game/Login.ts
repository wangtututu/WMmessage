// TypeScript file
/**
* Created by moitech
**/
class Login extends BaseView {
    private tName: eui.TextInput;
    private tPass: eui.TextInput;
    private gLogin: eui.Group;
    private iClose: eui.Image;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP
    }

    public onInit(): void {
        this.gLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.iClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this)
        // this.tPass.addEventListener(egret.Event.CHANGE,this.onPass,this);
    }

    public onOpen(para): void {

    }
    private onLogin(): void {
        // console.log("11")
        if (!this.tName.text || !this.tPass.text) return;
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/login?from=manager&id=" + this.tName.text + "&pass=" + this.tPass.text, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        // console.log(request)
        var data = JSON.parse(request.response)
        if (request.response.length > 10) {
            this.onClose();
            var mainUI = Api.ViewManager.getView(MainUI);
            mainUI.LogSuccss(data)
        }else{
            alert("登陆失败")
        }
    }
    private passWord;
    private onPass(): void {
        this.passWord = this.tPass.text;
        this.tPass.text = "***"
        console.log(this.passWord)
    }
    private onClose() {
        Api.ViewManager.closeView(Login)
    }
}