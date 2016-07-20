/**
 * 操作localStorage机公用方法
 * Author： www.mybry.com:dunizb
 * Date：2016/7/14 0014.
 */
var App = {
    //自定义key的标识
    constant : {
        TABLE_NAME:"calc",     //表名称
        SEPARATE:"-"            //分隔符
    },
    //获取数据库最新的ID，递增
    getId : function(){
        var id = 0;  //key的索引
        var appDataKey = this.getKeyArray();
        var spearate = this.constant.SEPARATE;
        if(appDataKey.length>0){
            var indexArray = [];    //所有的索引值
            for(var i=0; i<appDataKey.length; i++){
                indexArray.push(parseInt(appDataKey[i].split(spearate)[1]));
            }
            id = this._maxId(indexArray) + 1;
        }
        return id;
    },
    //获取单个数据，索引或者key的名称
    getItem : function(dom){
        var con = dom.value;
        if(isNaN(con)){
            return localStorage.getItem(con);
        }else{
            var key = localStorage.key(parseInt(con));
            return localStorage.getItem(key);
        }
    },
    deleteItem : function(dom){
        var con = dom.value || dom.toString();
        if(isNaN(con)){
            //如果输入*号，删除所有数据
            if(con == "*"){
                var appDataKey = this.getKeyArray();
                for(var i=0; i<appDataKey.length; i++){
                    localStorage.removeItem(appDataKey[i]);
                }
            }else{
                localStorage.removeItem(con);
            }
        }else{
            var key = localStorage.key(parseInt(con));
            localStorage.removeItem(key);
        }
        return true;
    },
    _maxId : function(array){
        array.sort(function(a,b){
            return a - b;
        });
        return array[array.length-1];
    },
    getKeyArray : function(){
        var localStorage = window.localStorage;
        var storageLen = localStorage.length;
        var spearate = this.constant.SEPARATE,
            tableName = this.constant.TABLE_NAME;
        //计算器所有的数据
        var appDataKey = [];
        if(storageLen>0){
            var itemKey = "";
            for(var i=0; i<storageLen; i++){
                //calc-0
                itemKey = localStorage.key(i);
                //判断是否是该应用的数据
                var flagIndex = itemKey.indexOf(spearate);
                if(flagIndex != -1 ){
                    var startWord = itemKey.split(spearate)[0];
                    if(startWord == tableName){
                        appDataKey.push(itemKey);
                    }
                }
            }
        }
        return appDataKey;
    }
};

