var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TypeScript file
/**
* Created by moitech
**/
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    Login.prototype.onInit = function () {
        this.gLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        // this.iClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this)
        // this.tPass.addEventListener(egret.Event.CHANGE,this.onPass,this);
    };
    Login.prototype.onOpen = function (para) {
    };
    Login.prototype.onLogin = function () {
        // console.log("11")
        if (!this.tName.text || !this.tPass.text) {
            alert("信息不完整");
            return;
        }
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/login?from=manager&id=" + this.tName.text + "&pass=" + this.tPass.text, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    Login.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        // console.log(request)
        var data = JSON.parse(request.response);
        if (request.response.length > 20) {
            this.onClose();
            var mainUI = Api.ViewManager.getView(MainUI);
            mainUI.LogSuccss(data);
        }
        else {
            alert("登陆失败");
        }
    };
    Login.prototype.onPass = function () {
        this.passWord = this.tPass.text;
        this.tPass.text = "***";
        console.log(this.passWord);
    };
    Login.prototype.onClose = function () {
        Api.ViewManager.closeView(Login);
    };
    return Login;
}(BaseView));
__reflect(Login.prototype, "Login");
