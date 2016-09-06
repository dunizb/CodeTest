/**
 * Created by Administrator on 2016/9/6 0006.
 */
define(function(require,exports,module){
    var tabModule = (function(m){
        function Tab(id){
            this.oDiv = document.getElementById(id);
            this.aInput = this.oDiv.getElementsByTagName('input');
            this.aDiv = this.oDiv.getElementsByTagName('div');
            this.nowIndex = 0;
        }
        Tab.prototype.init = function(){
            var _this = this;
            for(var i=0;i<this.aInput.length;i++){
                this.aInput[i].index = i;
                this.aInput[i].onclick = function(){
                    _this.change(this);
                }
            }
        }
        Tab.prototype.change = function(obj){
            for(var i=0;i<this.aInput.length;i++){
                this.aInput[i].style.background = '';
                this.aDiv[i].style.display = 'none';
            }
            obj.style.background = 'orange';
            this.aDiv[obj.index].style.display = 'block';
        }
        Tab.prototype.autoPlay = function(){
            var _this = this;
            setInterval(function(){
                if(_this.nowIndex == _this.aInput.length - 1){
                    _this.nowIndex = 0;
                }else{
                    _this.nowIndex ++;
                }
                _this.change(_this.aInput[_this.nowIndex]);
            },2000);
        }

        var tab = new Tab('tab');
        tab.init();
        // tab.autoPlay();
        m.Tab = Tab;
        return m;
    })(tabModule || {});

    exports.module = tabModule;
});