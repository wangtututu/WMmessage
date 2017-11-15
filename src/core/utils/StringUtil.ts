/**
 * Created by Saco at 2017/07/01
 **/
class StringUtil {
    public stringLength(str: string): number {
        var len = 0;
        var charCode;
        for (var i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0x4E00 && charCode <= 0x9FA5) {
                len++;
            } else {
                len += 0.5;
            }
        }
        return len;
    }

    public substrByLength(str: string, len: number): string {
        var len2 = 0;
        var charCode;
        for (var i = 0; i < str.length; i++) {
            if (len2 >= len) {
                return str.substr(0, i) + "...";
            }
            charCode = str.charCodeAt(i);
            if (charCode >= 0x4E00 && charCode <= 0x9FA5) {
                len2++;
            } else {
                len2 += 0.5;
            }
        }
        return str;
    }
}

