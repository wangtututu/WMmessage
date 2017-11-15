var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/9/1
 **/
var SimpleLoading = (function () {
    function SimpleLoading() {
    }
    SimpleLoading.i = function () {
        if (!this._instance) {
            this._instance = new SimpleLoading();
        }
        return this._instance;
    };
    SimpleLoading.prototype.showLoading = function () {
        if (!this.isInited) {
            this.initView();
        }
        Api.Layers.getLayer(LayerType.ALERT).addChild(this.container);
    };
    SimpleLoading.prototype.initView = function () {
        this.container = new egret.DisplayObjectContainer();
        this.container.touchEnabled = true;
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0, 0.8);
        this.bg.graphics.drawRect(0, 0, Api.StageUtil.stageWidth, Api.StageUtil.stageHeight);
        this.bg.graphics.endFill();
        this.container.addChild(this.bg);
        this.isInited = true;
    };
    SimpleLoading.prototype.hideLoading = function () {
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
    };
    SimpleLoading.prototype.setProgress = function (value) {
    };
    return SimpleLoading;
}());
__reflect(SimpleLoading.prototype, "SimpleLoading");
