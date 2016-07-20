/**
 * Created by Administrator on 2016/7/14 0014.
 */
window.onload = function(){
    /*左侧滑动*/
    leftSwiper();
    /*右侧滑动*/
    rightSwiper();
}


/*
 * ==========================左侧滑动==========================
 * 1.滑动          touch
 * 2.滑动到一定的距离不能在允许滑动   滑动区间
 * 3.滑动超过了0 最小定位 需要让它定位回去    吸附   定位区间
 * 4.点改变当前样式  改变class
 * 5.点击的时候需要定位在顶部  当不满足定位条件的时候需要固定  判断到底点的是那个盒子
 * */
function leftSwiper(){
    var parentDom = document.querySelector('.jd_cate_left'),    //父盒子
        childDom = parentDom.querySelector('ul');               //子盒子
    var lis = childDom.querySelectorAll("li");

    var parentHeight = parentDom.offsetHeight,      //父盒子的高度
        childHeight = childDom.offsetHeight;        //子盒子的高度

    //计算定位区间
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    //console.log('定位区间：'+minPosition+'----'+maxPosition);

    //缓冲的距离
    var distance = 150;

    //滑动区间
    var maxSwiper = maxPosition + distance;
    var minSwiper = minPosition - distance;
    //console.log('滑动区间：'+minSwiper+'----'+maxSwiper);

    //程序的核心点  当前的定位
    var currY = 0;

    /****公用方法****/
    //加过渡
    var addTransition = function(){
        childDom.style.webkitTransition = 'all 0.3s';/*兼容性*/
        childDom.style.transition = 'all 0.3s';
    };
    //清除过渡
    var removeTransition = function(){
        childDom.style.webkitTransition = 'none';
        childDom.style.transition = 'none';
    };
    //定位
    var setTranslateY = function(translateY){
        childDom.style.webkitTransform = 'translateY('+translateY+'px)';
        childDom.style.transform = 'translateY('+translateY+'px)';
    };

    /****滑动****/
    var startY = 0;
    var moveY =0;
    var distanceY =0;
    var isMove = false;

    childDom.addEventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
    });
    childDom.addEventListener("touchmove",function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        //清除过渡
        removeTransition();
        if((currY + distanceY)>minSwiper && (currY + distanceY) < maxSwiper){
            //定位
            setTranslateY(currY+distanceY);
        }

        isMove = true;
    });
    window.addEventListener("touchend",function(e){
        //滑动超过了0 最小定位 需要让它定位回去    吸附   定位区间
        if((currY+distanceY) > maxPosition){
            currY = maxPosition;
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currY);
        }else if((currY + distanceY ) < minPosition){
            currY = minPosition;
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currY);
        }else{
            /*正常的情况*/
            currY = currY + distanceY;
        }


        /*重置参数*/
        startY = 0;
        moveY = 0;
        distanceY = 0;
        isMove = false;
    });

    mybry.tap(childDom,function(e){
        //当前点击的li
        var currLi = e.target.parentNode;
        //点改变当前样式  改变class
        for(var i=0; i<lis.length; i++){
            lis[i].classList.remove("now");
            lis[i].index = i;
        }
        currLi.classList.add("now");

        //点击的时候需要定位在顶部  当不满足定位条件的时候需要固定  判断到底点的是那个盒子
        var translateY = -currLi.index * 50;
        /*在定位区间内运动*/
        if(translateY > minPosition){
            /*注意：要记录当前的currY*/
            currY = translateY;
            addTransition();
            setTranslateY(currY);
        }else{
            currY = minPosition;
            setTranslateY(currY);
        }
    });

}

function rightSwiper(){
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_cate_right'),
        swipeType:'y',
        swipeDistance:100
    });
}