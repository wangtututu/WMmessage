// TypeScript file
/**
* Created by moitech
**/
class ClassList extends BaseView {
    private rReturn: eui.Rect;
    private list: eui.List;
    private gClickBtn: eui.Group;
    private index;

    public constructor() {
        super();
        
    }

    public onInit(): void {
        this.openLayer = LayerType.UI_TOP;
        this.list.itemRenderer = ClassListItem;
        this.rReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gClickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

    }

    public onOpen(para): void {
        this.index = para;
        this.onGetMsg();
    }
    private onGetMsg(): void {
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
        if (this.index == "class") {
            this.list.dataProvider = new eui.ArrayCollection(data);
        } else {
            var _arr = [];
            for (var j = 0; j < Consts.DISH_ARR.length; j++) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Term_id == Consts.DISH_ARR[j]) {
                        _arr.push(data[i]);
                        continue;
                    }
                }
            }
            this.list.dataProvider = new eui.ArrayCollection(_arr);
        }

    }
    private onReturn() {
        Api.ViewManager.closeView(ClassList);
    }
    private onClick(): void {
        Api.ViewManager.closeView(ClassList);
        // console.log(Consts.ClASS_ARR)
        var data = "";
        for (var i = 0; i < Consts.ClASS_ARR.length; i++) {
            data = data + Consts.ClASS_ARR[i].name + " ";
        }
        if (this.index == "dish") {
            var addShop = Api.ViewManager.getView(AddDish)
            addShop["tOwner"].text = data;
        } else if (this.index == "class") {
            var addShop = Api.ViewManager.getView(AddShop)
            addShop["tClass"].text = data;
        }

    }
}