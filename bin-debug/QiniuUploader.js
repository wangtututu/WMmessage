var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2017/08/19
 **/
var QiniuUploader = (function () {
    function QiniuUploader() {
    }
    QiniuUploader.Init = function () {
        var uploader = window["Qiniu"].uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
            // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
            // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
            // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
            // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
            // uptoken_func: function(){    // 在需要获取uptoken时，该方法会被调用
            //    // do something
            //    return uptoken;
            // },
            uptoken_url: 'http://192.168.0.199:8099/uptoken',
            get_new_uptoken: false,
            // downtoken_url: '/downtoken',
            // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
            unique_names: true,
            // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
            domain: 'ouxeonbf7.bkt.clouddn.com',
            // container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
            max_file_size: '4mb',
            // flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
            max_retries: 3,
            // dragdrop: true,                     // 开启可拖曳上传
            chunk_size: '4mb',
            auto_start: true,
            //x_vars : {
            //    查看自定义变量
            //    'time' : function(up,file) {
            //        var time = (new Date()).getTime();
            // do something with 'time'
            //        return time;
            //    },
            //    'size' : function(up,file) {
            //        var size = file.size;
            // do something with 'size'
            //        return size;
            //    }
            //},
            init: {
                'FilesAdded': function (up, files) {
                    // plupload.each(files, function(file) {
                    // 文件添加进队列后，处理相关的事情
                    // });
                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前，处理相关的事情
                },
                'UploadProgress': function (up, file) {
                    // 每个文件上传时，处理相关的事情
                },
                'FileUploaded': function (up, file, info) {
                    if (QiniuUploader.onComplete) {
                        QiniuUploader.onComplete(info);
                    }
                    // console.log(info);
                    // 每个文件上传成功后，处理相关的事情
                    // 其中info是文件上传成功后，服务端返回的json，形式如：
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    // 查看简单反馈
                    // var domain = up.getOption('domain');
                    // var res = parseJSON(info);
                    // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                },
                'Error': function (up, err, errTip) {
                    //上传出错时，处理相关的事情
                },
                'UploadComplete': function () {
                    //队列文件处理完毕后，处理相关的事情
                },
                'Key': function (up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在unique_names: false，save_key: false时才生效
                    var key = "";
                    // do something with key here
                    return key;
                }
            }
        });
    };
    return QiniuUploader;
}());
__reflect(QiniuUploader.prototype, "QiniuUploader");
