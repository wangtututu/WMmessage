var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2017/08/09
 **/
var AnimationUtil = (function () {
    function AnimationUtil() {
    }
    AnimationUtil.prototype.addTouchScaleEffect = function (dis) {
        if (dis.width && dis.height) {
            dis.anchorOffsetX = dis.width / 2;
            dis.anchorOffsetY = dis.height / 2;
            dis.x += dis.width / 2;
            dis.y += dis.height / 2;
        }
        dis.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBtn, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchBtnEnd, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchBtnEnd, this);
    };
    AnimationUtil.prototype.onTouchBtn = function (e) {
        var dis = e.currentTarget;
        dis.scaleX = 1;
        dis.scaleY = 1;
        egret.Tween.removeTweens(dis);
        egret.Tween.get(dis).to({ scaleX: 0.93, scaleY: 0.93 }, 100);
    };
    AnimationUtil.prototype.onTouchBtnEnd = function (e) {
        var dis = e.currentTarget;
        egret.Tween.removeTweens(dis);
        egret.Tween.get(dis).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    return AnimationUtil;
}());
__reflect(AnimationUtil.prototype, "AnimationUtil");
