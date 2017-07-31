/**
 * Created by Administrator on 2016/9/6 0006.
 */
define(function(require,exports,module){
    function Drag(id){
        this.oDiv = document.getElementById(id);
        this.alphaX = 0;
        this.alphaY = 0;
    }
    Drag.prototype.init = function(){
        var _this = this;
        this.oDiv.onmousedown = function(e){
            e = e || window.event;
            _this.alphaX = e.clientX - _this.oDiv.offsetLeft;
            _this.alphaY = e.clientY - _this.oDiv.offsetTop;
            document.onmousemove = function(e){
                e = e || window.event;
                var limitX = e.clientX - _this.alphaX;
                var limitY = e.clientY - _this.alphaY;
                if(limitX < 0){
                    limitX = 0;
                }else if(limitX > document.documentElement.clientWidth - _this.oDiv.offsetWidth){
                    limitX = document.documentElement.clientWidth - _this.oDiv.offsetWidth;
                }
                if(limitY < 0 ){
                    limitY = 0;
                }else if(limitY > document.documentElement.clientHeight - _this.oDiv.offsetHeight){
                    limitY = document.documentElement.clientHeight - _this.oDiv.offsetHeight;
                }
                _this.oDiv.style.left = limitX + 'px';
                _this.oDiv.style.top = limitY + 'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            return false;
        }
    }

    module.exports = Drag;
});
