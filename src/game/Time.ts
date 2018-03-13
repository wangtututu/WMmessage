// TypeScript file
class Time {
    // 返回日期格式：
    // t 
    //true-年/月/日，false-年/月
    public static GET_TIME(t, b: boolean): string {
        var date = new Date(t)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (b) {
            var data = year + '/' + month + '/' + day;
        } else {
            var data = year + '/' + month;
        }
        return data;
    }
    // 返回今天0时的日期对象
    public static GET_DAY(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var time = year + "-" + month + "-" + day;
        var data = Date.parse(new Date(time).toString());
        return data;
    }
    // 返回6天前0时的日期对象
    public static GET_WEEK() {
        var date = new Date(new Date().getTime() - 6 * 24 * 3600 * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var time = year + "-" + month + "-" + day;
        var data = Date.parse(new Date(time).toString())
        return data;
    }
    // 返回本月1日0时的日期对象
    public static GET_MONTH(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var time = year + "-" + month + "-" + 1;
        var data = Date.parse(new Date(time).toString())
        return data;
    }
}