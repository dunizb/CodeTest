/**
 * @author zhousg
 * @Date 2016-02-04
 * @Method 滑动方法  针对一个大容器内部的容器做滑动封装
 * @param
 * args args.swipeDom 大容器对象
 * args.swipeType 滑动类型
 * args.swipeDistance 缓冲距离
 * 注意：子容器的高宽度是取的内容的高宽 所以padding的大小有影响
 */
if(!window.itcast){
    window.itcast = {};
}
itcast.iScroll = function(args){
    /*调用的时候没有初始化的话就是初始化一次*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
itcast.iScroll.prototype = {
    constructor:itcast.iScroll,
    init:function(args){
        /*局部变量来接受当前的this*/
        var that  = this;
        /*如果传入的对象是一个Dom对象就把他看作是我们的大容器盒子*/
        if(args.swipeDom && typeof  args.swipeDom == 'object'){
            that.parentDom = args.swipeDom;
        }
        /*如果不存在父容器就停止初始化*/
        if(!that.parentDom) return false;
        /*找到子容器*/
        that.childDom = that.parentDom.children&&that.parentDom.children[0]?that.parentDom.children[0]:'';
        /*如果不存在子容器就停止初始化*/
        if(!that.childDom) return false;
        /*初始化传入的参数*/
        that.settings = {};
        /*默认类型  默认的Y轴滑动 如果不是y的话就是以x轴开始滑动*/
        that.settings.swipeType = args.swipeType?args.swipeType:'y';
        /*默认的缓冲滑动距离*/
        that.settings.swipeDistance = args.swipeDistance>=0?args.swipeDistance:150;
        /*初始化滑动*/
        that._scroll();
    },
    /*对外开放的设置定位的方法*/
    setTranslate:function(translate){
        this.currPostion = translate;
        this._addTransition();
        this._changeTranslate(this.currPostion);
    },
    _addTransition:function(){
        this.childDom.style.transition = "all .2s ease";
        this.childDom.style.webkitTransition = "all .2s ease";/*兼容 老版本webkit内核浏览器*/
    },
    _removeTransition:function(){
        this.childDom.style.transition = "none";
        this.childDom.style.webkitTransition = "none";/*兼容 老版本webkit内核浏览器*/
    },
    _changeTranslate:function(translate){
        if(this.settings.swipeType == 'y'){
            this.childDom.style.transform = "translateY("+translate+"px)";
            this.childDom.style.webkitTransform = "translateY("+translate+"px)";
        }else{
            this.childDom.style.transform = "translateX("+translate+"px)";
            this.childDom.style.webkitTransform = "translateX("+translate+"px)";
        }
    },
    _scroll:function(){
        /*局部变量来接受当前的this*/
        var that = this;
        /*滑动的类型*/
        var type = that.settings.swipeType == 'y'?true:false;
        /*父容器的高度或宽度*/
        var parentHeight = type?that.parentDom.offsetHeight:that.parentDom.offsetWidth;
        /*子容器的高度或宽度*/
        var childHeight = type?that.childDom.offsetHeight:that.childDom.offsetWidth;

        /*子容器没有父容器大的时候*/
        if(childHeight < parentHeight){
            if(type){
                that.childDom.style.height = parentHeight + 'px';
                childHeight = parentHeight;
            }else{
                that.childDom.style.width = parentHeight + 'px';
                childHeight = parentHeight;
            }
        }

        /*缓冲距离*/
        var distance = that.settings.swipeDistance;
        /*区间*/
        /*左侧盒子定位的区间*/
        that.maxPostion = 0;
        that.minPostion = -(childHeight-parentHeight);
        /*设置滑动的当前位置*/
        that.currPostion = 0;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
        /*1.滑动*/
        that.childDom.addEventListener('touchstart',function(e){
            /*初始的Y的坐标*/
            that.startPostion = type?e.touches[0].clientY: e.touches[0].clientX;
        },false);
        that.childDom.addEventListener('touchmove',function(e){
            e.preventDefault();
            /*不停的做滑动的时候记录的endY的值*/
            that.endPostion = type?e.touches[0].clientY: e.touches[0].clientX;
            that.movePostion = that.startPostion - that.endPostion;/*计算了移动的距离*/

            /*2.滑动区间*/
            /*就是滑动区间*/
            if((that.currPostion-that.movePostion)<(that.maxPostion+distance)
                &&
                (that.currPostion-that.movePostion)>(that.minPostion -distance)){
                that._removeTransition();
                that._changeTranslate(that.currPostion-that.movePostion);
            }
        },false);
        window.addEventListener('touchend',function(e){
            /*在限制滑动区间之后 重新计算当前定位*/
            /*判断是否在我们的合理定位区间内*/
            /*先向下滑动 */
            if((that.currPostion-that.movePostion) > that.maxPostion){
                that.currPostion = that.maxPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            /*想上滑动的时候*/
            else if((that.currPostion-that.movePostion) < that.minPostion){
                that.currPostion = that.minPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            /*正常的情况*/
            else{
                that.currPostion = that.currPostion-that.movePostion;
            }
            that._reset();
        },false);

    },
    _reset:function(){
        var that = this;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
    }
};