/**
 * Created by Saco at 2016/9/1
 **/
class SimpleLoading {
    private static _instance: SimpleLoading;
    public constructor() {

    }

    public static i(): SimpleLoading {
        if (!this._instance) {
            this._instance = new SimpleLoading();
        }
        return this._instance;
    }

    private isInited;
    private bg: egret.Shape;
    private container: egret.DisplayObjectContainer;
    public showLoading(): void {
        if (!this.isInited) {
            this.initView();
        }
        Api.Layers.getLayer(LayerType.ALERT).addChild(this.container);
    }

    private initView(): void {
        this.container = new egret.DisplayObjectContainer();
        this.container.touchEnabled = true;

        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0, 0.8);
        this.bg.graphics.drawRect(0, 0, Api.StageUtil.stageWidth, Api.StageUtil.stageHeight);
        this.bg.graphics.endFill();
        this.container.addChild(this.bg);

        this.isInited = true;
    }

    public hideLoading(): void {
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
    }

    public setProgress(value: number): void {

    }
}
