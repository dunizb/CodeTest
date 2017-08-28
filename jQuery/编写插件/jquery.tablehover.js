;(function($){
    $.fn.tablehover = function(options){
        //默认设置
        var defaults = {
            evenRowClass:'evenRow',
            oddRowClass:'oddRow',
            curRowClass:'curRow',
            eventType1:'mouseover',
            eventType2:'mouseout'            
        }

        var endOptions = $.extend(defaults, options);

        this.each(function(){
            var _this = $(this);

            _this.find('tr:even').addClass(endOptions.evenRowClass);
            _this.find('tr:odd').addClass(endOptions.oddRowClass);

            _this.find("tr").bind(endOptions.eventType1, function(){
                $(this).addClass(endOptions.curRowClass);
            });
            _this.find("tr").bind(endOptions.eventType2, function(){
                $(this).removeClass(endOptions.curRowClass);
            });
        });
    }
})(jQuery);