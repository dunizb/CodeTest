/**
 * Author： www.mybry.com:dunizb
 * Date：2016/7/14 0014.
 */
window.onload = function(){
    //点击功能
    clickFunc();
    //移动端滑动功能
    mSwiper();
};

function clickFunc(){
    var calc = document.getElementById("calc"),
        spans = document.getElementById("win-tool").getElementsByTagName("span"),
        equals = document.getElementById("equals"),     //等于号
        remove = document.getElementById("remove"),     //删除符号
        reset = document.getElementById("reset");       //复位按钮

    /*** 三个小按钮 ***/
    var close = document.getElementById("close"),       //关闭按钮
        max = document.getElementById("max"),           //最大化按钮
        mini = document.getElementById("mini");         //最小化按钮

    var resultDiv = document.getElementById("result");  //结果区域

    /*** 历史记录 ***/
    var historyBox = document.getElementById("historyBox"),
        delBtn = historyBox.querySelector(".icon_del");
    var historyUl = historyBox.querySelector("ul");

    /***********鼠标划过三个小按钮显示功能图标***********/
    for(var i=0; i<spans.length; i++){
        //1.1 鼠标划过三个小按钮显示功能图标
        spans[i].onmouseover = function(){
            this.innerHTML = this.dataset.ico;
        };
        spans[i].onmouseout = function(){
            this.innerHTML = "&nbsp;";
        };
    }

    /***********关闭按钮***********/
    close.onclick = function(e){
        var h = calc.offsetHeight + 15;
        calc.style.webkitTransform = "translateY("+ h+"px)";
        calc.style.transform = "translateY("+ h+"px)";
        e.stopPropagation();
    };
    /***********最小化按钮***********/
    mini.onclick = function(e){
        var h = calc.offsetHeight - 28;
        calc.style.webkitTransform = "translateY("+ h+"px)";
        calc.style.transform = "translateY("+ h+"px)";
        e.stopPropagation();
    };
    /***********最大化按钮***********/
    max.onclick = function(){
        var that = this;
        if(calc.classList.contains("flexbox")){        //缩小
            calc.classList.remove("flexbox");
            that.dataset["ico"] = "□";
            that.title = "最大化";
        }else{          //放大
            calc.classList.add("flexbox");
            that.dataset["ico"] = "※";
            that.title = "恢复大小";
        }
        isResOverflow("max");
    };

    /***********点击键盘***********/
    var keyBorders = document.querySelectorAll("#bottom span"),
        express = document.getElementById("express"),//计算表达式
        res =  document.getElementById("res"),  //输出结果
        keyBorde = null;        //键盘
    var preKey = "";
    //符号
    var symbol = {"+":"+","-":"-","×":"×","÷":"÷","=":"="};

    /***********键盘按钮***********/
    for(var j=0; j <keyBorders.length; j++){
        keyBorde = keyBorders[j];

        keyBorde.onclick = function() {
            var number = this.dataset["number"];
            if(number !== "←" || number !== "C"){
                //转换显示符号
                if(isNaN(number)){
                    number = number.replace(/\*/g,"×").replace(/\//g,"÷");
                }

                //去掉初始0
                if(!preKey){
                    res.innerHTML = "";
                }

                //如果点击的是符号键
                if(symbol[number] || preKey == "="){
                    express.innerHTML = res.innerHTML + number;
                    number = "";
                }

                //对0，第二次计算重置上一次结果
                //if(number == "0" && tempRes == "0" || symbol[preKey]){
                //    res.textContent = "";
                //}

                //如果前面直接是符号位,去掉比较值的前导0
                if(symbol[preKey] && symbol[number]){
                    var s = parseFloat(res.innerHTML).toString();
                    res.innerHTML = s.substring(0, s.length-1);
                }
                if(!isResOverflow()){
                    res.innerHTML += number;
                    preKey = number;
                }else{
                    return false;
                }
            }
        };
    }

    /***********相等，计算结果***********/
    equals.onclick = function(){
        var tempRes = express.innerHTML, val = "";
        var resVal = res.innerHTML;
        try{
            if(tempRes){
                var temp = tempRes.replace(/×/g,"*").replace(/÷/,"/");
                val = eval(temp+resVal);
            }
        }catch(error){
            val = "<font style='font-size:12px;color:red'>Erro：计算出错！</font>";
        }finally{
            express.innerHTML = "";
            res.innerHTML = val;
            preKey = "=";
            saveCalcHistory(tempRes+resVal+"="+val);
            isResOverflow("equals");
        }
    };

    /***********复位操作***********/
    reset.onclick = function(){
        res.innerHTML = "";
        express.innerHTML = "";
        res.style.fontSize = "6em";
    };

    /***********减位操作***********/
    remove.onclick = function(){
        var tempRes = res.innerHTML;
        if(tempRes.length>1){
            tempRes = tempRes.substring(0,tempRes.length-1);
            res.innerHTML = tempRes;
        }else{
            res.innerHTML = 0;
        }
    };

    /***********历史功能***********/
    var history = document.getElementById("history"),
        historyBox = document.getElementById("historyBox");
    history.onclick = function(e){
        historyBox.style.webkitTransform = "none";
        historyBox.style.transform = "none";
        e.stopPropagation();

        var keyArray = App.getKeyArray();
        var separate = App.constant.SEPARATE;
        keyArray.sort(function(a,b){
            var n = a.split(separate)[1];
            var m = b.split(separate)[1];
            return m - n;
        });
        var html = [],val = "";
        for(var i=0; i<keyArray.length; i++){
            val = localStorage.getItem(keyArray[i]);
            html.push("<li>"+val+"</li>");
        }
        if(html.length>0){
            historyUl.innerHTML = html.join("");
        }else{
            historyUl.innerHTML = "尚无历史记录";
        }

        //把历史记录一条数据添加到计算器
        var hLis = historyUl.querySelectorAll("li");
        for(var i=0; i<hLis.length; i++){
            hLis[i].onclick = function(){
                var express = this.innerHTML;
                var exp = express.split("=")[0],
                    res = express.split("=")[1];
                resultDiv.querySelector("#express").innerHTML = exp;
                resultDiv.querySelector("#res").innerHTML = res;
            };
        }
    };

    window.onclick = function(e){
        var e = e || window.event;
        var target = e.target.className || e.target.nodeName;
        //如果点击的是历史记录DIV和删除按钮DIV就不隐藏
        var notTarget =  {"con":"con","remove":"remove","UL":"UL"};
        if(!notTarget[target]){
            //如果设置了最小化
            var ts = historyBox.style.transform || historyBox.style.webkitTransform;
            if(ts && ts == "none"){
                historyBox.style.webkitTransform = "translateY(102%)";
                historyBox.style.transform = "translateY(102%)";
            }
        }
    };

    //点击头部恢复大小
    var topDiv = document.getElementById("top");
    topDiv.onclick = function(){
        var ts = calc.style.transform || calc.style.webkitTransform;
        if(ts || ts != "none"){
            calc.style.transform = 'none';
        }
    };

    /***********清空历史记录***********/
    delBtn.onclick = function(e){
        var e = e || window.event;
        e.stopPropagation();
        if(App.deleteItem("*")){
            historyUl.innerHTML = "尚无历史记录";
        }
    };

    /**
     * 保存计算历史记录
     * @param val 要记录的表达式
     */
    function saveCalcHistory(val){
        var key = App.constant.TABLE_NAME + App.constant.SEPARATE + App.getId();
        window.localStorage.setItem(key,val);
    }

    /**********自动设置文字大小************/
    function isResOverflow(type){
        var result = document.getElementById("result"),
            resultW = result.offsetWidth;
        var resDiv = document.getElementById("res"),
            resW = resDiv.offsetWidth;

        var fsw = resW/resultW;
        var fontSize = parseFloat(resDiv.style.fontSize);
        //resW要超出resultW的时候
        if(fsw >= 0.9){
            if(type && type == "equals"){
                resDiv.style.fontSize = fontSize - 2 + "em";
            }
            return true;
        }
        return false;
    }
}

function mSwiper(){
    /**
     * 1.历史记录向下滑动
     * 2.滑动到一定距离隐藏历史记录
     * 3.滑动少于某个距离吸附回去
     */
    var historyBox = document.getElementById("historyBox");
    var startY = 0,
        moveY = 0,
        distanceY = 0,
        isMove = false;
    //缓冲的距离
    var distance = 100;
    //加过渡
    var addTransition = function(){
        historyBox.style.webkitTransition = 'all 0.3s';/*兼容性*/
        historyBox.style.transition = 'all 0.3s';
    }
    //清除过渡
    var removeTransition = function(){
        historyBox.style.webkitTransition = 'none';
        historyBox.style.transition = 'none';
    };
    //定位
    var setTranslateY = function(translateY){
        historyBox.style.webkitTransform = 'translateY('+translateY+')';
        historyBox.style.transform = 'translateY('+translateY+')';
    }

    //滑动事件
    historyBox.addEventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
    });
    historyBox.addEventListener("touchmove",function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removeTransition();
        setTranslateY(distanceY+"px");
        isMove = true;
    });
    historyBox.addEventListener("touchend",function(e){
        if(distanceY > distance){
            addTransition();
            setTranslateY("102%");
        }else{
            addTransition();
            historyBox.style.webkitTransform = 'none';
            historyBox.style.transform = 'none';
        }
        startY = moveY = distanceY = 0;
        isMove = false;
    });

}

