/**
 * Created by Administrator on 2016/7/14 0014.
 */
window.onload = function(){
    //搜索条背景渐变效果
    searchBar();
    //轮播图
    banner();
    //倒计时
    downTime();
};

/**
 * 搜索条背景渐变效果
 */
function searchBar(){
    //1.默认的是透明/
    //2.滑动页面的时候颜色逐渐加深或变浅
    //3.往下滑动页面的时候到一定距离的时候颜色不做改变  过了轮播图

    var search = document.querySelector('.jd_header_box'),  //搜索盒子
        banner = document.querySelector('.jd_banner'),      //轮播图盒子
        height = banner.offsetHeight;                       //获取高度

    //监听页面的滑动
    window.onscroll = function(){
        //获取页面现在距离顶部的高度
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        //定义默认的透明度
        var opacity = (top > height) ? 0.85 : 0.85*(top/height);
        //操作dom
        search.style.background = "rgba(201,21,35,"+opacity+")";
    };
}

/**
 * 轮播图
 */
function banner(){
    //获取DOM元素
    var banner = document.querySelector('.jd_banner'),          //大盒子
        bannerWidth = banner.offsetWidth,                       //盒子宽度
        imageBox = banner.querySelector('ul:first-child'),      //图片盒子
        pointBox = banner.querySelector('.dian'),               //点盒子
        points = pointBox.querySelectorAll('li');               //索引的点

    /**
     * 公用方法
     */
    //加过度
    var addTransition = function(){
        imageBox.style.webkitTransition = 'all 0.3s';/*兼容性*/
        imageBox.style.transition = 'all 0.3s';
    }
    //清除过渡
    var removeTransition = function(){
        imageBox.style.webkitTransition = 'none';
        imageBox.style.transition = 'none';
    };
    //定位
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
        imageBox.style.transform = 'translateX('+translateX+'px)';
    };

    //自动轮播核心代码
    var index = 1,      //轮播索引
        timerId = null; //定时器
    var autoPlay = function(){
        timerId = setInterval(function(){
            index++;

            //加过渡
            addTransition();
            //定位
            setTranslateX(-index*bannerWidth);
        },2000);
    };

    autoPlay();

    //监听过渡结束事件
    mybry.transitionEnd(imageBox,function(){
        //一直保持在 0-9 索引
        if(index >= points.length+1){
            index = 1;
            //移除过渡
            removeTransition();
            //定位
            setTranslateX(-index*bannerWidth);
        }else if(index <= 0){
            index = 8;
            //移除过渡
            removeTransition();
            //定位
            setTranslateX(-index*bannerWidth);
        }

        changePoint();
    });

    //改变点的高亮
    var changePoint = function(){
        //清除当前样式
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove('now');
        }
        //给对应的加上样式
        points[index-1].classList.add('now');
    };

    //滑动手指触摸滑动的时候轮播图也能随着滑动  停止轮播
    var startX = 0,     //起始位置
        moveX = 0,      //移动的位置
        distanceX = 0;  //改变的距离

    var isMove = false;  //记录用户是否滑动过

    imageBox.addEventListener("touchstart",function(e) {
        //记录开始位子的坐标
        startX = e.touches[0].clientX;
        //清除定时器
        clearInterval(timerId);
    });
    imageBox.addEventListener("touchmove",function(e){
        //记录滑动的时候的x的坐标 会随时改变
        moveX = e.touches[0].clientX;
        //计算滑动的距离  数值 可以为负也可以为正
        distanceX = moveX - startX;
        //清除过渡
        removeTransition();
        //当前的定位加上改变的距离  就是将要去做定位的那个位置
        setTranslateX(-index*bannerWidth+distanceX);

        isMove = true;
    });
    window.addEventListener("touchend",function(e){
        //不超过一定的距离需要吸附回去
        //超过了一定的距离  需要跳转上一张或下一张
        if(Math.abs(distanceX) > bannerWidth/3 && isMove){
            if(distanceX > 0){
                index--;
            }else{
                index++;
            }
            //加过渡
            addTransition();
            //定位
            setTranslateX(-index*bannerWidth);
        }else{
            //不超过一定的距离需要吸附回去
            addTransition();
            setTranslateX(-index*bannerWidth);
        }

        //重置参数
        startX = moveX = distanceX = 0;
        isMove = false;

        //重新加上定时器
        clearInterval(timerId); //防止定时器累加
        autoPlay();
    });
}

/**
 * 倒计时
 */
function downTime(){
    /*
     * 1.需要倒计时的事件  是后台给你  假设一个时间
     * 2.每一秒钟去改变6个盒子的内容
     */
    var skTime = document.querySelector('.sk_time'),    //时间盒子
        spans = skTime.querySelectorAll("span");        //每一个时间span

    //加上截至时间
    var endTime = 4*60*60;

    var timerId = setInterval(function(){
        endTime--;
        //时间必须大于0
        if(endTime < 0)return false;

        //格式化时间
        var h = Math.floor(endTime/3600),
            m = Math.floor(endTime%3600/60),
            s = endTime%60;

        //设置时间
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000);
}