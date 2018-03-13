// TypeScript file
/**
* Created by moitech
**/
class OrderItem extends eui.ItemRenderer {
    private gMask: eui.Group;
    private lTime: eui.Label;
    private llAddr: eui.Label;
    private lState: eui.Label;
    private lShop: eui.Label;
    private lSender: eui.Label;
    private lOrderid: eui.Label;

    public constructor() {
        super();
        this.skinName = OrderItemSkin;
    }

    public childrenCreated(): void {

    }

    public dataChanged(): void {
        this.setMsg();
    }
    private setMsg(): void {
        this.lTime.text = this.setTime(this.data.Create_date);
        var _send = JSON.parse(this.data.Send_addr);
        this.llAddr.text = _send[0].Addr;
        this.lState.text = this.setStatus(this.data.Order_status);
        this.lShop.text = this.data.Restaurant;
        this.lSender.text = this.data.Deliver_id;
        this.lOrderid.text = this.data.ID;
    }
    private setStatus(type): string {
        var txt;
        switch (type) {
            case "0": txt = "订单未支付"; break;
            case "1": txt = "订单已支付"; break;
            case "2": txt = "订单配送中"; break;
            case "3": txt = "订单完成"; break;
            case "8": txt = "用户申请退款"; break;
            case "9": txt = "订单退款"; break;
            default: txt = "无"; break;
        }
        return txt;
    }
    private setTime(data: number): string {
        var time = new Date();
        time.setTime(data);
        var year = time.getFullYear();
        var mouth = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
        var day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        var sec = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        var timeText = year + "/" + mouth + "/" + day + " " + hour + ":" + min + ":" + sec;
        return timeText;
    }

}