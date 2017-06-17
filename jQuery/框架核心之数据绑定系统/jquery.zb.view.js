(function($) {
    $.fn.NBadd = function(json) {
        var objType = function(obj) {
            var _objType = toString.apply(obj);
            //[object Array]
            //[object Object]
            //[object String]
            return _objType.split(' ')[1].slice(0,-1).toLowerCase();
        };

        var eachElement = function(el, json, _arr) {
            for (var key in json) {
                var _el = el.find(key);//标签、子元素
                if(_arr) _el = _arr.template.find(key);
                if(_el.length === 0) _el = el.find("#"+key);//ID
                if(_el.length === 0) _el = el.find("."+key);//class
                if(_el.length === 0) _el = el.find("[name='"+key+"']");//name

                var _type = objType(json[key]);
                if(_type === 'object'){
                    if(_el.length === 0) _el = el;

                    if(_arr) {
                        _arr.cloneMod = false;
                        _arr.template = _arr.template.clone();//克隆自己
                        _arr.template_parent.append(_arr.template);
                    }

                    eachElement(_el, json[key], _arr);//递归

                }else if(_type === 'array') {
                    if(_el.length === 0) _el = el;
                    var _temp = {
                        template: _el.eq(0).clone(),//克隆对象
                        template_parent: _el.parent(),//列表容器元素
                        cloneMod: true //克隆模式（1：处理数组时，0：处理对象时）
                    };

                    _el.remove();
                    eachElement(_el, json[key], _temp);//递归
                }else{
                    //string
                    if(_arr && _arr.cloneMod) {
                        _arr.template = _arr.template.clone();//克隆自己
                        _arr.template_parent.append(_arr.template);
                    }

                    if(_el.length) {
                        _el.html(json[key]);
                    }else{
                        _el = el;
                        if(_arr) _el = _arr.template;
                        if(isNaN(key)) {
                            _el.attr(key, json[key]);
                        }else{
                            _el.html(json[key]);
                        }
                    }
                }
            }
        };

        if(json) eachElement(this, json);

        return this;//为了能链式调用
    };
})(jQuery);