function Vue(options){
    var context = document.querySelector(options.el);
    var html = context.innerHTML;
    var data = options.data;
    var regex = /(\{\{\s*([\w]+)\s*\}\})/g;
    while(regex.exec(html)){    
        console.log(1)
        html = html.replace(new RegExp(RegExp.$1, "g"), data[RegExp.$2]);// 只进来2次
        //html = html.replace(RegExp.$1, data[RegExp.$2]);// 进来3次
        // console.log(RegExp.$1 + "："+ RegExp.$2);
    }

    context.innerHTML = html;
}