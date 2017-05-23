;(function(global){
    var __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.1",
        author: "Dunizb"
    };
    var defualts = {
        audioUrl: "",
        el: "",
        boxStyle: "",
        buttonSrc: "",
        htmls: `<audio autoplay loop style="width:0px;">
                    <source src="" type="audio/mpeg" />
                </audio>
                <a style="width:24px;height:24px;">►</a>
                <select>
                </select>`
    };
    var PlayCode = function(options) {
        var settings = Object.assign({}, defualts, options);//缺省值合并
        var audioDom = document.querySelector(settings.el);//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        //创建节点
        var audioBox = document.createElement("div");
        audioBox.id = "musicControl";
        audioBox.style = "opacity:0.5;overflow:hidden;position:absolute;z-index:999" + settings.boxStyle;
        audioBox.innerHTML = settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        var audioButton = audioBox.querySelectorAll("a")[0];
        var audioList = audioBox.querySelectorAll("select")[0];
        var audioTag = audioBox.querySelectorAll("audio")[0];

        //跟换播放按钮图片
        if(settings.buttonSrc) audioButton.style.backgroundImage = 'url('+settings.buttonSrc+')';

        audioButton.state = true;

        var _urlType = toString.apply(settings.audioUrl);
        if(_urlType === '[object Object]'){
            var _temp = [];
            _temp.push(settings.audioUrl);
            settings.audioUrl = _temp;
        }

        if(!settings.audioUrl.length){
            console.error(__INFO__.plugins + '无音乐资源启动失败，请添加音乐资源 audioUrl：');
            return;
        }

        if(typeof settings.audioUrl === 'object'){
            console.log('array');
            audioTag.src = settings.audioUrl[0].source;
            for(var i=0; i<settings.audioUrl.length; i++){
                var _option = new Option(settings.audioUrl[i].title, settings.audioUrl[i].source);
                audioList.add(_option);
            }
        }else{
            audioTag.src = settings.audioUrl;
            audioList.style.display = 'none';
        }

        var audioFn = {
            play: function(url) {
                if(url) audioTag.src = url;
                audioButton.innerHTML = "░";
                audioTag.play();
            },
            stop: function() {
                audioButton.innerHTML = "►";
                audioTag.pause();
            }
        };

        var _device = (/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent));
        var clickEvtName = _device ? "touchstart" : "mousedown";

        //给按钮绑定事件
        audioButton.addEventListener(clickEvtName, function(e){
            //判断播放状态
            console.log(this.state);
            if(this.state) {
                this.state = false;
                audioFn.play();
            }else{
                this.state = true;
                audioFn.stop();
            }
        }, false);

        //从下拉列表选择歌曲播放
        audioList.addEventListener("change", function(e){
            var muiscName = this.options[this.selectedIndex].value;
            audioFn.play(muiscName);
            audioButton.state = true;
        });
    };
    

    global[__INFO__.plugins] = PlayCode;

})(typeof window !== 'undefined' ? window : this);