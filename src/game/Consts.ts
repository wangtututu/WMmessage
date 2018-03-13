// TypeScript file
class Consts{
    //public static _IP = "192.168.0.199";
     public static _IP= "114.67.231.102";
    public static DATA = ["店铺名称1","店铺名称2","店铺名称3","店铺名称4","店铺名称5","店铺名称6","店铺名称7","店铺名称8","店铺名称9"];
    public static LOGIN_STATE;
    public static ClASS_ARR = [];
    public static DISH_ARR = [];
    public static CreateRequest(url:string, method: any):any{
        var request = new egret.HttpRequest();
        request.withCredentials = true;
        request.open(url, method);
        return request;
    }
}