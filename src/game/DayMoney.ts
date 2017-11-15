// TypeScript file
/**
* Created by moitech
**/
class DayMoney extends BaseView {
    private list:eui.List;
    public constructor() {
        super();
        
    }

    public onInit(): void {
        this.list.itemRenderer = MoneyItem;
        this.openLayer = LayerType.UI_TOP;
    }

    public onOpen(para): void {
        // var data = [{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // },{
        //     "Name":"张姐烤肉拌饭",
        //     "Money":"1000.35",
        //     "Other":"起亚回来看"
        // }]
        // this.list.dataProvider = new eui.ArrayCollection(data)
         var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/admin/orderstatistics?id=&from=0&to=", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
     private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request)
    }
}