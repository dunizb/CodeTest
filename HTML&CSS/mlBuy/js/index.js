window.onload = function() {
	lunbo();
}

function lunbo(){
	var oLis = document.querySelectorAll("#lunboUl li");
	var bannerImg = document.getElementById("bannerImg");

	for(var i=0; i<oLis.length; i++){
		oLis[i].onclick = function(){
			var thisLi = this.innerText;
			bannerImg.src = "images/banner/"+thisLi+".png";
		}
	}
}