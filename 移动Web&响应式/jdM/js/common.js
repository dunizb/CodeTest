/**
 * Created by Administrator on 2016/7/14 0014.
 */
/*命名空间  防止命名冲突*/
window.mybry = {};

/*区分模块*/
mybry.transitionEnd  = function(dom,callback){
    /*
     * 1.给谁加过渡结束事件
     * 2.过渡结束之后我们需要去干一件什么事情
     * */

    //基本的判断
    if(!dom || typeof dom != 'object' ) return false;

    dom.addEventListener('transitionEnd',function(){
        //处理业务
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd',function(){
        //处理业务
        callback && callback();
    });
};

mybry.tap = function(dom,callback){
    //基本的判断
    if(!dom || typeof dom != 'object' ) return false;
    var startTime = 0,isMove = false;
    dom.addEventListener('touchstart',function(e){
        startTime = Date.now();
    });
    dom.addEventListener('touchmove',function(e){
        isMove = true;
    });
    dom.addEventListener('touchend',function(e){
        if((Date.now()-startTime) < 150 && !isMove){
            //处理业务
            callback && callback(e);
        }
        //重置参数
        startTime = 0,isMove = false;
    });
};
