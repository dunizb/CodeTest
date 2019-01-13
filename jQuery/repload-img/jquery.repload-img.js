$(function($){
    function PreLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extends({}, PreLoad.Default, options);

        if(this.opts.order === 'ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }

    PreLoad.Default = {
        order: 'unorder', // 默认无序预加载
        each: null, // 每一张图片加载完毕后的回调
        all: null // 所有图片加载完毕后的回调
    }

    /**
     * 无序加载
     */
    PreLoad.prototype._unordered = function() {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function(index, src) {
            if(typeof src !== 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error', function(){
                opts.each && opts.each(count);
                // value = Math.round(((count + 1)/len) * 100);
                // 所有图片加载完毕
                if(count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            });

            imgObj.src = src;
        });    
    };

    /**
     * 有序加载
     */
    PreLoad.prototype._ordered = function() {
        var opts = this.opts,
            imgs = this.imgs,
            len = imgs.length,
            count = 0;
        var imgObj = new Image();

        load();

        function load() {
            $(imgObj).on('load error', function() {
                opts.each && opts.each(count);
                if(count >= len) {
                    // 所有图片加载完毕
                    opts.all && opts.all();
                }else{
                    load();
                }
                count++;
            });
            imgObj.src = imgs[count];
        }
    };

    $.extends({
        preload: function(imgs, opts) {
            new PreLoad(imgs, opts);
        }
    });
})(jQuery);