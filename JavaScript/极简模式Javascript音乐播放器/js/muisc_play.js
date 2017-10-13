;(function(global){
    var __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.2",
        author: "Dunizb",
        website: "http://dunizb.com"
    };
    var defualts = {
        audioList: "",
        el: "",
        position: "",
        buttonImgSrc: "",
        htmls: '<audio autoplay loop style="width:0px;">'+
                    '<source src="" type="audio/mpeg" />'+
                '</audio>'+
                '<select>'+
                '</select>'
    };
    var PlayCode = function(options) {
        var settings = Object.assign({}, defualts, options);//缺省值合并
        var audioDom = settings.el ? document.getElementById(settings.el) : document.body;//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        var audioBox = document.createElement("div");
        audioBox.id = "musicControl";
        var boxDefaultStyle = "overflow:hidden;position:absolute;z-index:999;background-size: contain;background-repeat: no-repeat;width:30px;height:30px;"
        audioBox.style = boxDefaultStyle + settings.position;
        audioBox.innerHTML = settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        var audioList = audioBox.querySelectorAll("select")[0];
        var audioTag = audioBox.querySelectorAll("audio")[0];

        //更换播放按钮图片
        if(!settings.buttonImgSrc) {
            audioBox.style.backgroundImage = `url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NPHN2ZyB2ZXJzaW9uPSIxLjEiIGJhc2VQcm9maWxlPSJmdWxsIg0geG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0geG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDSB4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIiANICBoZWlnaHQ9IjYwcHgiIA0gIHdpZHRoPSI2MHB4IiANPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgb3BhY2l0eT0iMC41MDIiIGZpbGw9InJnYiggMCwgMCwgMCApIg0gZD0iTTMwLDEgQzQ2LjAxNiwxIDU5LDEzLjk4NCA1OSwzMCBDNTksNDYuMDE2IDQ2LjAxNiw1OSAzMCw1OSBDMTMuOTg0LDU5IDEsNDYuMDE2IDEsMzAgQzEsMTMuOTg0IDEzLjk4NCwxIDMwLDEgWiAiLz4NPHBhdGggc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZpbGw9InJnYiggMjU1LCAyNTUsIDI1NSApIg0gZD0iTTMwLDYwIEMxMy40MzEsNjAgMCw0Ni41NjkgMCwzMCBDMCwxMy40MzEgMTMuNDMxLDAgMzAsMCBDNDYuNTY5LDAgNjAsMTMuNDMxIDYwLDMwIEM2MCw0Ni41NjkgNDYuNTY5LDYwIDMwLDYwIFpNMzAsMyBDMTUuMDg4LDMgMywxNS4wODggMywzMCBDMyw0NC45MTIgMTUuMDg4LDU3IDMwLDU3IEM0NC45MTIsNTcgNTcsNDQuOTEyIDU3LDMwIEM1NywxNS4wODggNDQuOTEyLDMgMzAsMyBaICIvPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZmlsbD0icmdiKCAyNTUsIDI1NSwgMjU1ICkiDSBkPSJNMzEuMDg4LDEwIEMzMS4zNywxMi4wMDEgMzEuNDEsMTQuNTI0IDMzLjUwNiwxNy4wNDcgQzM1LjExNywxOC45NjkgMzYuOTMxLDIwLjY5IDM4LjE4LDIyLjI1MiBDMzkuODMyLDI0LjI5NCA0MSwyNi44NTcgNDEsMjkuNDYgQzQxLDMzLjYyNCAzOC45ODYsMzcuNzQ3IDM3LjYxNSw0MC4wMyBDMzcuNjE1LDQwLjAzIDM2Ljk3MSw0MC4wMyAzNi45NzEsNDAuMDMgQzM3LjkzOCwzNy44NjggMzkuODcyLDM0LjMwNCAzOS43MSwzMC41MDEgQzM5LjYzLDI4LjM3OCAzOC44MjQsMjYuMDk2IDM3LjQ1NSwyNC40MTUgQzM1LjkyMywyMi40NTIgMzMuMzQ0LDIwLjg5MSAzMS4wODgsMjAuNzMxIEMzMS4wODgsMjAuNzMxIDMxLjA4OCw0My40MzMgMzEuMDg4LDQzLjQzMyBDMzEuMDg4LDQ1LjIzNSAzMCw0Ni44NzcgMjguNDI5LDQ4LjA3OCBDMjYuODk4LDQ5LjI3OSAyNC44ODMsNTAgMjMuMTEsNTAgQzIxLjk4Miw1MCAyMC45MzQsNDkuNjQgMjAuMjA5LDQ5LjAzOSBDMTkuNDQzLDQ4LjQzOCAxOSw0Ny41NTggMTksNDYuNTE3IEMxOSw0NC44NzUgMjAuMTI4LDQzLjIzMyAyMS42NTksNDIuMDMyIEMyMy4xOTEsNDAuNzkxIDI1LjEyNCwzOS45OSAyNi43MzYsMzkuOTkgQzI4LjE0NywzOS45OSAyOS4zNTUsNDAuMTkgMzAuMDgxLDQwLjg3MSBDMzAuMDgxLDQwLjg3MSAzMC4wODEsMTAgMzAuMDgxLDEwIEMzMC4wODEsMTAgMzEuMDg4LDEwIDMxLjA4OCwxMCBaICIvPg08L3N2Zz4N')`;
        }else{
            audioBox.style.backgroundImage = 'url('+settings.buttonImgSrc+')';
        }

        audioBox.state = true;

        if(toString.apply(settings.audioList) === '[object Object]'){
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
                audioTag.play();
                audioBox.style.backgroundImage = audioBox.style.backgroundImage;
                audioBox.style.cssText = audioBox.style.cssText + settings.position;
                audioBox.style.cssText += ";animation: "+settings.animaClass+" .8s linear infinite;";
            },
            stop: function() {
                audioTag.pause();
                audioBox.style.backgroundImage = audioBox.style.backgroundImage;
                audioBox.style.cssText = audioBox.style.cssText + settings.position;
                audioBox.style.animation = "";
            }
        };

        var _device = (/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent));
        var clickEvtName = _device ? "touchstart" : "mousedown";

        //给按钮绑定事件
        audioBox.addEventListener(clickEvtName, function(e){
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

        //判断是否是微信
        if(navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(){
                WeixinJSBridge.invoke("getNetworkType", {}, function(e){
                    audioFn.play();
                });
            });
        }

        audioBox.style.cssText += ";animation: "+settings.animaClass+" .8s linear infinite;";
    };
    
    global[__INFO__.plugins] = PlayCode;
})(typeof window !== 'undefined' ? window : this);