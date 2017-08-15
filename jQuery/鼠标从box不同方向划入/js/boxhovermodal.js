;(function($){
    $.fn.extend({
        "boxhovermodal": function (value) {
            //获取传过来的模态层
            var $childModal = value || ".box-hover-modal-m";
            
            //鼠标滑动事件
			$(this).mouseenter(function () {
                //getMouseDirection()返回值是分别对应左上右下
                var fx = getMouseDirection(this);
                if(fx === "top") {
                    $(this).find($childModal).css({
						"top": -$(this).height(),
						"left": '0'
					}).animate({
						"top": "0"
					}, 200);
                } else if(fx === "right") {
                    $(this).find($childModal).css({
						"top": "0",
						"left": $(this).width()
					}).animate({
						"left": "0"
					}, 200);
                } else if(fx === "bottom") {
                    $(this).find($childModal).css({
						"top": $(this).height(),
						"left": 0
					}).animate({
						"top": "0"
					}, 200);
                } else if(fx === "left") {
                    $(this).find($childModal).css({
						"top": "0",
						"left": -$(this).width()
					}).animate({
						"left": "0"
					}, 200);
                }
            }).mouseleave(function() {
                var fx = getMouseDirection(this);
                if (fx === "top") {
					$(this).find($childModal).animate({
						"top": -$(this).height()
					}, 200);
				} else if(fx === "right") {
                    $(this).find($childModal).animate({
						"left": 2 * $(this).width()
					}, 200)
                } else if(fx === "bottom") {
                    $(this).find($childModal).animate({
						"top": $(this).height()
					}, 200);
                } else if(fx === "left") {
                    $(this).find($childModal).animate({
						"left": -$(this).width()
					}, 200);
                }
            });
        }
    });

    //获取鼠标移动到元素的时候距离最近的边
    //左上右下=>letf,top,right,bottom
    function getMouseDirection(nowEle){
        //获取当前鼠标位置
        var mx = event.pageX;
        var my = event.pageY;

        //获取当前元素的上下左右
        var bLeft = $(nowEle).offset().left;
        var bTop = $(nowEle).offset().top;
        var bRight = bLeft + parseInt($(nowEle).width());
        var bBottom = bTop + parseInt($(nowEle).height());
        
        //计算出鼠标距离上下左右哪个最近
        var mLeft = Math.abs(mx - bLeft);
        var mTop = Math.abs(my - bTop);
        var mRight = Math.abs(bRight - mx);
        var mBottom = Math.abs(bBottom - my);

        //把计算出的几个距离放到数组bm里面
        var bm = [mTop, mRight, mBottom, mLeft];
        var directionArr = ["top", "right", "bottom", "left"];
        
        //计算出最小的那个值
        var bmMin = Math.min.apply(null, bm);

        //根据最小值遍历数组判断出是哪边最近
        var direction;
        $.each(bm, function (index, item) {
            if (item == bmMin) direction = directionArr[index];
        });
        console.log(direction)    
        return direction;
    }
})(jQuery);