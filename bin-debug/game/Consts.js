var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Consts = (function () {
    function Consts() {
    }
    Consts.CreateRequest = function (url, method) {
        var request = new egret.HttpRequest();
        request.withCredentials = true;
        request.open(url, method);
        return request;
    };
    Consts._IP = "192.168.0.199";
    Consts.DATA = ["店铺名称1", "店铺名称2", "店铺名称3", "店铺名称4", "店铺名称5", "店铺名称6", "店铺名称7", "店铺名称8", "店铺名称9"];
    Consts.ClASS_ARR = [];
    return Consts;
}());
__reflect(Consts.prototype, "Consts");
