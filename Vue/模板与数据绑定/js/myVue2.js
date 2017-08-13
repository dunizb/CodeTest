function Vue(options){
    var context = document.querySelector(options.el);
    var html = context.innerHTML;
    var data = options.data;
    var regex = /(\{\{\s*([\w]+)\s*\}\})/g;
    while(regex.exec(html)){    
        html = html.replace(new RegExp(RegExp.$1, "g"), data[RegExp.$2]);// 只进来2次
    }

    // 匹配v-bind指令
    regex = /(v\-bind:([\w\-]+)=\"([\w]+)\")/g;
    while(regex.exec(html)){    
        console.log(RegExp.$1+" > "+RegExp.$2+" > "+RegExp.$3);
        html = html.replace(new RegExp(RegExp.$1, "g"), RegExp.$2+"="+data[RegExp.$3]);// 只进来2次
    }

    context.innerHTML = html;
}