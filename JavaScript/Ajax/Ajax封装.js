/**
 * Created by Administrator on 2016/9/15 0015.
 */
function ajax(obj){

}

function ajax4json(obj){
    // 默认配置参数
    var settings = {
        type : 'get',
        url : '#',
        dataType : 'text',
        async : 'true',
        data : {}
    }
    // 覆盖默认值
    for(var key in obj){
        settings[key] = obj[key];
    }
    // 创建对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    /*
     拼接字符串，把如下形式的对象转换成字符串（username=admin&password=123）
     data : {
     username : uname,
     password : pw
     }
     */
    var str = '';
    for(attr in settings.data){
        str += attr + '=' + settings.data[attr] + '&';
    }
    if(str.length > 0){
        str = str.substring(0,str.length-1);
    }

    // 处理get请求的参数
    if(settings.type == 'get'){
        // get请求参数通过url传递
        settings.url = settings.url + '?' + str;
    }
    // 准备发送
    xhr.open(settings.type,settings.url,settings.async);

    // 请求参数（post）
    var param = null;
    if(settings.type == 'post'){
        param = str;//post请求的参数要通过send发送
        // post请求必须设置头信息，如果不设置，参数无法传递到后台
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    }
    // 执行发送动作
    xhr.send(param);
    // 处理回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                // 服务器响应数据
                var d = xhr.responseText;
                if(settings.dataType == 'json'){
                    //d = eval('('+d+')');//把字符串转成json对象
                    // JSON对象是ES5提供的新特性；腻子脚本（自己实现了JSON对象和对应的方法）
                    d = JSON.parse(d);//把字符串转成json对象
                }
                settings.success(d);
            }
        }
    }

}


function ajax4jsonp(obj){
    var settings = {
        url : '#',
        jsonp : 'callback',
        data : {}
    }
    for(var key in obj){
        settings[key] = obj[key];
    }

    var methodName = 'jQuery1231231231231233454353_12312312312';
    if(settings.jsonpCallback){
        methodName = settings.jsonpCallback;
    }

    // 回调函数如何处理？
    window[methodName] = function(data){
        // 这里就是回调函数，data就是服务器返回的数据
        settings.success(data);
    }

    var str = '';
    for(attr in settings.data){
        str += attr + '=' + settings.data[attr] + '&';
    }
    if(str.length > 0){
        str = str.substring(0,str.length-1);
    }

    var script = document.createElement('script');
    var param = settings.url + '?' + settings.jsonp + '=' + methodName;
    if(str.length > 0){
        param += '&' + str;
    }
    script.src = param;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

}