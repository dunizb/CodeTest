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
            that.dataset["ico"] = "口";
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
    var preKey = "",            //上一次按的键盘
        isFromHistory = false;  //是否来自历史记录
    //符号
    var symbol = {"+":"+","-":"-","×":"*","÷":"/","=":"="};

    /***********键盘按钮***********/
    for(var j=0; j <keyBorders.length; j++){
        keyBorde = keyBorders[j];

        keyBorde.onclick = function() {
            var number = this.dataset["number"];
            var resVal = res.innerHTML;
            var exp = express.innerHTML;
            //表达式最后一位的符号
            var expressEndSymbol = exp.substring(exp.length-1,exp.length);
            if(number !== "←" || number !== "C"){
                //转换显示符号
                if(isNaN(number)){
                    number = number.replace(/\*/g,"×").replace(/\//g,"÷");
                }
                if(isResOverflow(resVal.length+1)){
                    return;
                }
                //点击的是符号
                //计算上一次的结果
                if(symbol[number]){
                    //上一次点击的是不是符号键
                    if(symbol[preKey]){
                        express.innerHTML = exp.slice(0,-1) + number;
                    }else{
                        if(exp == ""){
                            express.innerHTML = resVal + number;
                        }else{
                            express.innerHTML += resVal + number;
                        }
                        if(symbol[expressEndSymbol]){
                            exp = express.innerHTML.replace(/×/g,"*").replace(/÷/,"/");
                            res.innerHTML = eval(exp.slice(0,-1));
                        }
                    }
                }else{
                    //如果首位是符号，0
                    if(symbol[number] || symbol[preKey] || resVal=="0"){
                        res.innerHTML = "";
                    }
                    res.innerHTML += number;
                }
                preKey = number;
            }
        };
    }

    /***********相等，计算结果***********/
    equals.onclick = function(){
        var expVal = express.innerHTML, val = "";
        var resVal = res.innerHTML;
        //表达式最后一位的符号
        if(resVal && resVal !== "0"){
            var expressEndSymbol = expVal.substring(expVal.length-1,expVal.length);
            try{
                if(!isFromHistory){
                    var temp = "";
                    if(symbol[expressEndSymbol] && resVal){
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                        temp = eval(temp.slice(0,-1)) + symbol[expressEndSymbol] + resVal;
                    }else{
                        temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                    }
                    val = eval(temp);
                }else{
                    val = resVal;
                }
            }catch(error){
                val = "<span style='font-size:1em;color:red'>Erro：计算出错！</span>";
            }finally{
                express.innerHTML = "";
                res.innerHTML = val;
                preKey = "=";
                saveCalcHistory(expVal+resVal+"="+val);
                isResOverflow(resVal.length);
            }
        }
    };

    /***********移动端拨号功能***********/
    equals.ondblclick = function(){
        console.log("打电话");
    };

    /***********复位操作***********/
    reset.onclick = function(){
        res.innerHTML = "0";
        express.innerHTML = "";
        res.style.fontSize = "6em";
    };

    /***********减位操作***********/
    remove.onclick = function(){
        var tempRes = res.innerHTML;
        if(tempRes.length>1){
            tempRes = tempRes.slice(0,-1);
            res.innerHTML = tempRes;
        }else{
            res.innerHTML = 0;
        }
    };

    /***********历史功能***********/
    var history = document.getElementById("history"),
        historyBox = document.getElementById("historyBox");
    var about = document.getElementById("about");
    about.onclick = history.onclick = function(e){
        e = e || window.event;
        var target = e.target.id || window.event.srcElement.id;

        historyBox.style.webkitTransform = "none";
        historyBox.style.transform = "none";
        e.stopPropagation();
        //点击的是历史
        if(target == "history"){
            var keyArray = Mybry.wdb.getKeyArray();
            var separate = Mybry.wdb.constant.SEPARATE;
            keyArray.sort(function(a,b){
                var n = a.split(separate)[1];
                var m = b.split(separate)[1];
                return m - n;
            });
            var html = [],val = "";
            for(var i=0; i<keyArray.length; i++){
                val = Mybry.wdb.getItem(keyArray[i]);
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
                    isFromHistory = true;
                };
            }
        }
        //点击的是关于
        if(target == "about"){
            historyBox.children[0].children[0].innerHTML = `
                <div style='padding:5px;color:#000;'>
                    <p>1. 该计算器布局使用Flex布局</p>
                    <p>2. 对异常进行了处理</p>
                    <p>3. 作者：dunizb，www.mybry.com版权所有</p>
                    <p>4. bug与建议：ibing@outlook.com</p>
                    <p>※Build 1240. Version：3.0</p>
                </div>
            `;
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
        if(Mybry.wdb.deleteItem("*")){
            historyUl.innerHTML = "尚无历史记录";
        }
    };

    /**
     * 保存计算历史记录
     * @param val 要记录的表达式
     */
    function saveCalcHistory(val){
        var key = Mybry.wdb.constant.TABLE_NAME + Mybry.wdb.constant.SEPARATE + Mybry.wdb.getId();
        window.localStorage.setItem(key,val);
    }

    /**********自动设置文字大小************/
    function isResOverflow(leng){
        var calc = document.getElementById("calc");
        var w = calc.style.width || getComputedStyle(calc).width || calc.currentStyle.width;
            w = parseInt(w);

        //判断是否是移动端
        if(Mybry.browser.versions.android || Mybry.browser.versions.iPhone || Mybry.browser.versions.iPad) {
            if(leng > 8){
                return true;
            }
        }else{
            if(leng > 10){
                if(w == 300) {
                    max.click();
                }else{
                    if(leng > 16){
                        return true;
                    }
                }
            }
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

