// TypeScript file
/**
* Created by moitech
**/
class AddClass extends BaseView {
    private lName1: eui.Label;
	private classTxt: eui.TextInput;
	private classBtn: eui.Button;
    private list:eui.List;
	
    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.classBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.list.itemRenderer = DelClassItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onDel,this);
    }

    public onOpen(para): void {
        this.onGetMsg();
    }
    private onClick(){
        if(!this.classTxt.text){
            alert("请填写信息");
            return;
        }
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/addterms?name=" + this.classTxt.text, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request.response)
        this.onClear();
        this.onGetMsg();
    }
    private onClear():void{  
        this.classTxt.text = null;
    }
    private onGetMsg(): void {
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/terms", egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetClassComplete, this);
    }
    private onGetClassComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        this.list.dataProvider = new eui.ArrayCollection(data);
    }
    private onDel(e:egret.Event): void {
        var item = this.list.selectedItem;
        var request = Consts.CreateRequest("http://" + Consts._IP + ":8099/delterms?id=" + item.Term_id, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetDelComplete, this);
    }
    private onGetDelComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(request)
        this.onGetMsg();
    }
}