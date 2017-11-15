/**
 * Created by Saco at 2017/01/24
 **/
class WXShare {
    public static ShareTitle = "奥盟斗地主";
    public static ShareContent = "奥盟斗地主";
    public static ShareIcon = "http://xyfy.egret-labs.org/ddz/icon.jpg";
    public static ShareLink = "http://xyfy.egret-labs.org/ddz/index.html";
    public static GameLink = "http://xyfy.egret-labs.org/ddz/index.html";
    public static initShare(data): void {
        var wx = window["wx"];
        if (!wx) {
            return;
        }
        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
        });

        wx.ready(function() {
            WXShare.share();
        })
    }

    public static share(): void {
        var wx = window["wx"];
        if (!wx) {
            return;
        }
        wx.onMenuShareTimeline({
            title: WXShare.ShareTitle,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareAppMessage({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            type: '',
            dataUrl: '',
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareQQ({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareWeibo({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareQZone({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });
    }
}
