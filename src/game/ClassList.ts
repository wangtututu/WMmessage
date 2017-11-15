// TypeScript file
/**
* Created by moitech
**/
class ClassList extends BaseView {
    private rReturn: eui.Rect;
    private list: eui.List;
    private gClickBtn: eui.Group;

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
        this.list.itemRenderer = ClassListItem;
    }

    public onInit(): void {
        this.rReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gClickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        
    }

    public onOpen(para): void {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/terms", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        // console.log(data)
        this.list.dataProvider = new eui.ArrayCollection(data)
    }
    private onReturn() {
        Api.ViewManager.closeView(ClassList);
    }
    private onClick(): void {
        Api.ViewManager.closeView(ClassList);
        // console.log(Consts.ClASS_ARR)
        var addShop = Api.ViewManager.getView(AddShop)
        var data = "";
        for(var i = 0;i<Consts.ClASS_ARR.length;i++){
            data = data + Consts.ClASS_ARR[i].name + " ";
        }
        addShop["tClass"].text = data;
    }
}