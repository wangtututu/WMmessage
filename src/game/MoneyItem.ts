// TypeScript file
/**
* Created by moitech
**/
class MoneyItem extends eui.ItemRenderer {
    private lName: eui.Label;
	private lMoney: eui.Label;
	private lOther: eui.Label;
	
    public constructor() {
        super();
        this.skinName = MoneyItemSkin;
    }

    public childrenCreated(): void {

    }

    public dataChanged(): void {
        this.lName.text = this.data.Name;
        this.lMoney.text = this.data.Money;
        this.lOther.text = this.data.Other;
    }

}