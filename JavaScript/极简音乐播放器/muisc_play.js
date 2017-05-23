;(function(global){
    var __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.1",
        author: "Dunizb",
        website: "http://dunizb.com"
    };
    var defualts = {
        audioList: "",
        el: "",
        position: "",
        buttonImgSrc: "",
        htmls: `<audio autoplay loop style="width:0px;">
                    <source src="" type="audio/mpeg" />
                </audio>
                <a style="width:24px;height:24px;">►</a>
                <select>
                </select>`
    };
    var PlayCode = function(options) {
        var settings = Object.assign({}, defualts, options);//缺省值合并
        var audioDom = settings.el ? document.querySelector(settings.el) : document.body;//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        var audioBox = document.createElement("div");
        audioBox.id = "musicControl";
        audioBox.style = "opacity:0.5;overflow:hidden;position:absolute;z-index:999;" + settings.position;
        audioBox.innerHTML = settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        var audioButton = audioBox.querySelectorAll("a")[0];
        var audioList = audioBox.querySelectorAll("select")[0];
        var audioTag = audioBox.querySelectorAll("audio")[0];

        //跟换播放按钮图片
        if(settings.buttonImgSrc) audioButton.style.backgroundImage = 'url('+settings.buttonImgSrc+')';

        audioButton.state = true;

        var _urlType = toString.apply(settings.audioList);
        if(_urlType === '[object Object]'){
            var _temp = [];
            _temp.push(settings.audioList);
            settings.audioList = _temp;
        }

        if(!settings.audioList.length){
            console.error(__INFO__.plugins + '无音乐资源启动失败，请添加音乐资源 audioList');
            return;
        }

        if(typeof settings.audioList === 'object'){
            audioTag.src = settings.audioList[0].source;
            for(var i=0; i<settings.audioList.length; i++){
                var _option = new Option(settings.audioList[i].title, settings.audioList[i].source);
                audioList.add(_option);
            }
        }else{
            audioTag.src = settings.audioList;
            audioList.style.display = 'none';
        }

        var audioFn = {
            play: function(url) {
                if(url) audioTag.src = url;
                audioButton.innerHTML = "►";
                audioTag.play();
            },
            stop: function() {
                audioButton.innerHTML = "░";
                audioTag.pause();
            }
        };

        var _device = (/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent));
        var clickEvtName = _device ? "touchstart" : "mousedown";

        //给按钮绑定事件
        audioButton.addEventListener(clickEvtName, function(e){
            //判断播放状态
            if(this.state) {
                this.state = false;
                audioFn.stop();
            }else{
                this.state = true;
                audioFn.play();
            }
        });

        //从下拉列表选择歌曲播放
        audioList.addEventListener("change", function(e){
            var muiscName = this.options[this.selectedIndex].value;
            audioFn.play(muiscName);
            audioButton.state = true;
        });
    };
    
    global[__INFO__.plugins] = PlayCode;
})(typeof window !== 'undefined' ? window : this);