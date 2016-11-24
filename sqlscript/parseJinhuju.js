
var user_tags_container = document.getElementById("user_tags_container");
var liList = user_tags_container.getElementsByTagName("li");
console.log(liList.length);

var li,tagName = "";
for(var i=2; i<liList.length; i++){
    li = liList[i];
    tagName += li.querySelector(".tag-link .name").innerText + ",";
}
console.log(tagName);
