/**
 * Created by Administrator on 2016/7/17 0017.
 */
$(function(){
    /*轮播图*/
    banner();

    /**产品滑动标签页*/
    productTab();

    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});

function banner() {
    /*
     * 1.准备数据    json格式的数组
     * 2.解析数据转化成html结构  之前的做法：拼接字符串  （现在：模版引擎  underscore template方法）
     *   判断当前是移动端还是非移动端  决定你要渲染的html结构
     * 3.渲染到页面当中
     * 4.监听到屏幕的宽度  html结构的切换  渲染
     * */


    /*准备数据 */
    var imageList = [
        {
            bac:'images/slide_01_2000x410.jpg',
            img:'images/slide_01_640x340.jpg'
        },
        {
            bac:'images/slide_02_2000x410.jpg',
            img:'images/slide_02_640x340.jpg'
        },
        {
            bac:'images/slide_03_2000x410.jpg',
            img:'images/slide_03_640x340.jpg'
        },
        {
            bac:'images/slide_04_2000x410.jpg',
            img:'images/slide_04_640x340.jpg'
        }
    ];

    var renderHtml = function(){
        //是否是移动端
        var width = $(window).width();
        var isMobile = width < 768 ? true : false;

        //准备模版
        var pointTemplate = $('#point_template').html();
        var imageTemplate = $('#image_template').html();

        //创建模版
        var pointFuc = _.template(pointTemplate);
        var imageFuc = _.template(imageTemplate);

        //解析模版
        var pointHtml = pointFuc({model:imageList});
        var imageHtml = imageFuc({
            model:{
                list:imageList,
                isM:isMobile
            }
        });

        //渲染模板
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);
    };

    //屏幕尺寸改变
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');


    //移动端滑动切换
    var startX = 0;
    var moveX= 0;
    var distanceX =0;
    var isMove = false;

    $('.wjs_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        /*什么情况才算  左滑  右滑   滑动的距离超过了50就算滑动*/
        if(isMove && Math.abs(distanceX) > 50){
            /*上一张 右滑*/
            if(distanceX>0){
                $('.carousel').carousel('prev');
            }
            /*下一张 左滑*/
            else{
                $('.carousel').carousel('next');
            }
        }
        /*重置参数*/
        startX = moveX = distanceX = 0;
        isMove= false;
    });
}
//产品滑动标签页
function productTab(){
    /*
     * 1.有一个大容器
     * 2.子容器  的宽度要等于所有的li的宽度
     * 3.做滑动效果
     * */
    var parent = $('.nav-tabs-parent');
    var child = parent.find('.nav-tabs');
    var lis = child.find('li');
    var width = 0;

    /*2.子容器  的宽度要等于所有的li的宽度*/
    $.each(lis,function(i,n){
        /*
         * 1. width 取的是内容的宽度
         * 2.innerWidth 取的是内容的宽度加上内边距的宽度
         * 3.outerWidth 取的是内容加内边距加边框
         * 4.outerWidth(true)  内容 内边距 边框 外边距
         * */
        width += $(n).innerWidth();
    });
    child.width(width);
    //滑动效果
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });
}