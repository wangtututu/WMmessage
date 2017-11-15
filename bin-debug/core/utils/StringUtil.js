var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2017/07/01
 **/
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.prototype.stringLength = function (str) {
        var len = 0;
        var charCode;
        for (var i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0x4E00 && charCode <= 0x9FA5) {
                len++;
            }
            else {
                len += 0.5;
            }
        }
        return len;
    };
    StringUtil.prototype.substrByLength = function (str, len) {
        var len2 = 0;
        var charCode;
        for (var i = 0; i < str.length; i++) {
            if (len2 >= len) {
                return str.substr(0, i) + "...";
            }
            charCode = str.charCodeAt(i);
            if (charCode >= 0x4E00 && charCode <= 0x9FA5) {
                len2++;
            }
            else {
                len2 += 0.5;
            }
        }
        return str;
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
