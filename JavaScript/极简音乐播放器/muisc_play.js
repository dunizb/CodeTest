;(function(global){
    var __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.1",
        author: "Dunizb"
    };
    var defualts = {
        audioUrl: "",
        nodeId: "",
        boxStyle: "",
        buttonSrc: "",
        htmls: `<audio autoplay loop style="width:0px;">
                    <source src="" type="audio/mpeg" />
                </audio>
                <a style="width:24px;height:24px;">►</a>
                <select>
                    <option value="http://zhangmenshiting.baidu.com/data2/music/124574160/124574160.mp3?xcode=cbea75a9b0a1e3adc7d4e558c0a93524">独角戏</option>
                    <option value="http://zhangmenshiting.baidu.com/data2/music/36a3ce90e63edffbc4d9b4c0be474595/257539192/257539192.mp3?xcode=94d2818c8415707f23407a79428c3f0f">大王叫我来巡山</option>	
                </select>`
    };
    var PlayCode = function(options) {
        var settings = Object.assign({}, defualts, options);//缺省值合并
        var audioDom = document.querySelector(settings.nodeId);//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        //创建节点
        var audioBox = document.createElement("div");
        audioBox.id = "musicControl";
        audioBox.style = "opacity:0.5;overflow:hidden;position:absolute;z-index:999";
        audioBox.innerHTML = settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        var audioButton = audioBox.querySelectorAll("a");
    };

    global[__INFO__.plugins] = PlayCode;

})(typeof window !== 'undefined' ? window : this);