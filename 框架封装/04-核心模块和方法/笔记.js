1.prependTo

将元素加到某一个DOM对象中的最前面

-> 就转换伪将一个DOM元素加到一个父元素的子元素的最前面

将DOM元素插入到父元素 的第0个元素的前面

2. 其他方法

.next()
1> 构造数据原型(this)
2> 获取每一个元素的一下一个元素
3> 返回新数据
Itcast.fn.next = function(){
	var newObj = this.constructor();
	var arr = this.map(function(v,i){
		return v.nextSibling;	//假设下一个不是文本节点
	});
	[].push.apply(newObj, arr);
	return newObj;
}

.parent()
1> 构造原型数据
2> 获得父元素
3> 返回新数据
Itcast.fn.parent = function(){
	var newObj = this.constructor();
	var arr = this.map(function(v, i){
		return v.parentNode;
	});
	[].push.apply(newObj,arr );
	return newObj;
}

// 关于下一个元素，应该使用工具方法
Itcast.next = function( elem ){
	var node = elem;
	while( node = node.nextSibling ){
		if(node.nodeType == 1){
			return node;
		}
	}
};

修改方法
Itcast.fn.next = function(){
	var newObj = this.constructor();
	var arr = this.map(function(v, i){
		return Itcast.next( v );
	});
	[].push.apply(newObj, arr);
	return newObj;
}

nextAll方法
Itcast.nextAll = function( elem ){
	var node = elem;
	var arr = [];
	while( node = node.nextSibling ){
		arr.push( node);
	}
	return arr;
};

Itcast.fn.nextAll = function(){
	var newObj = this.constructor();
	var arr = this.map(function(v, i){
		return Itcast.nextAll( v );
	});
	// concat 方法可以展开一维数组
	arr = [].concat.apply([], arr);
	[].push.apply(newObj, arr);
	return newObj;
}




















