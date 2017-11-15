/**
 * Created by Saco at 2017/08/09
 **/
class AnimationUtil {
    public addTouchScaleEffect(dis: egret.DisplayObject) {
        if (dis.width && dis.height) {
            dis.anchorOffsetX = dis.width / 2;
            dis.anchorOffsetY = dis.height / 2;
            dis.x += dis.width / 2;
            dis.y += dis.height / 2;
        }
        dis.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBtn, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchBtnEnd, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchBtnEnd, this);
    }

    private onTouchBtn(e: egret.TouchEvent): void {
        var dis = e.currentTarget;
        dis.scaleX = 1;
        dis.scaleY = 1;
        egret.Tween.removeTweens(dis);
        egret.Tween.get(dis).to({ scaleX: 0.93, scaleY: 0.93 }, 100);
    }

    private onTouchBtnEnd(e: egret.TouchEvent): void {
        var dis = e.currentTarget;
        egret.Tween.removeTweens(dis);
        egret.Tween.get(dis).to({ scaleX: 1, scaleY: 1 }, 100);
    }
}

