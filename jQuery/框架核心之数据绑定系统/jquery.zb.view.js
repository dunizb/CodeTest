(function($) {
    $.fn.NBadd = function(json) {
        var objType = function(obj) {
            var _objType = toString.apply(obj);
            //[object Array]
            //[object Object]
            //[object String]
            return _objType.split(' ')[1].slice(0,-1).toLowerCase();
        };

        var eachElement = function(el, json) {
            for (var key in json) {
                var _el = el.find(key);//标签、子元素
                if(_el.length === 0) _el = el.find("#"+key);//ID
                if(_el.length === 0) _el = el.find("."+key);//class
                if(_el.length === 0) _el = el.find("[name='"+key+"']");//name

                console.log(objType(json[key]));
            }
        };

        if(json) eachElement(this, json);

        return this;//为了能链式调用
    };
})(jQuery);