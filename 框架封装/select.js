var Select =

(function () {
//1> 定义一个 support 对象. 将需要使用的方法进行处理, 得到方法的能力
//2> 需要使用的可能有兼容性的方法, 定义一个可以完成该方法的函数来替代. 在函数内部进行兼容处理
//3> 定义 select 函数. 首先看是否支持 qsa, 如果支持直接使用. 如果不支持自己再来实现

var support = {},
	rnative = /\[native code\]/,
	push = [].push;// 一开始就存储方法, 后面再是用的时候就不用每次都创建数组了. 也避免了原型的搜索

// 处理 push 的兼容性问题
try{
	push.apply([], document.getElementsByTagName( '*' ));
}catch(e){
	// 自定义
	push = {
		apply: function ( a, b ) {
			// 将 b 中的每一个元素加到 a 中
			for ( var i = 0; i < b.length; i++ ) {
				a[ a.length++ ] = b[ i ];
			}
			return a.length;
		},
		call: function (a){
			var args = [].slice.call( arguments, 1 );
			
			/*
			var args = [];
			for(var i=0; i<arguments.length; i++){
				args.push( arguments[i] );
			}
			*/
			// 要求将 args 中的每一个元素都加到a中
			this.apply( a, args );
			
			//将 arguments 中从1开始的所有元素都加到 a 中
			/*for( var i = 1; i < arguments.length; i++){
				a[ a.length++ ] = arguments[i];
			}*/
		}
	};
}

support.qsa = rnative.test( document.querySelectorAll + '' ); 
support.getElementsByClassName = rnative.test( document.getElementsByClassName );

var div = document.createElement( 'div' );
support.getElementsByClassName2 = rnative.test( div.getElementsByClassName );
support.trim = rnative.test( String.prototype.trim + '');
//判断数组的方法
support.indexOf = rnative.test( Array.prototype.indexOf+"" );

// 判断数组 array 中是否含有 search 元素
// 如果数组支持 indexOf 就应该使用数组提供的方法, 不支持才自定义实现
// indexOf 还需要一个参数, 就是 查找的开始位置
function indexOf( array,search,startIndex ){
	startIndex = startIndex || 0;
	if(support.indexOf){
		return array.indexOf(search,startIndex);
	}
	for(var i=0; i<array.length; i++){
		if(array[i] === search){
			return i;
		}
	}
	return -1;
}

function getByClass( className, node ) {
	if ( node == document && support.getElementsByClassName || 
		 node.nodeType == 1 && support.getElementsByClassName2 ) {
		
		return node.getElementsByClassName( className );
	} else {
		// 用自己的算法实现
		var arr = [],
			list = node.getElementsByTagName( '*' ),
			tempClassName;
		for ( var i = 0; i < list.length; i++ ) {
			tempClassName = list[ i ].getAttribute( 'class' );
			if( !tempClassName ) continue;
			//class类名可能有多个
			if ( indexOf(tempClassName.split(" "),className) != -1) {
				arr.push( list[ i ] );
			}
		}
		return arr;
	}
}

function trim( str ){
	if(support.trim) {
		return str.trim();
	}
	return str.replace(/^\s|\s$/g,'');
}

function unique( array ){
	var tempArray = [];
	for(var i=0; i<array.length; i++){
		if( indexOf( tempArray , array[i] ) == -1){
			tempArray.push( array[i] );
		}
	}
	return tempArray;
}

var Select = function ( selector, node, results ) {	
	results = results || [];
	node = node || document;
	
	if ( support.qsa ) {
		push.apply( results, document.querySelectorAll( selector ) );
		return unique(results);
	}
	return select2( selector, node,results );
}

// 获取元素的基本方法
function t( selector, node,results ){
	results = results || [];
	node = node || document;
	push.apply( results, node.getElementsByTagName( selector ) );
	return results;
}
function c(className, node,results){
	results = results || [];
	node = node || document;
	push.apply( results ,getByClass(className,node ));
	return results;
}
function id(idName, node, results){
	results = results || [];
	var dom = document.getElementById( idName );
	if(dom){
		push.apply( results , [dom]);
	}
	return results;
}

function select2( selector ,node, results ) {
	//将字符串 selector split 成一个数组, 然后去除两端的空格, 遍历, 遍历的时候使用 select3
	results = results || [];
	node = node || document;
	
	var list = selector.split(",");
	for(var i=0; i<list.length; i++){
		select3( trim( list[i] ), node,results );
	}
	return unique(results);
}

function select3( selector,node, results ) {
	results = results || [];
	node = node || document;
	
	// 只考虑 4 个基本选择器: #id, .className, tag, *
	// 判断传入的 selector 是四种选择器中的哪一种
	var first = selector.charAt(0);
	if(selector.split(" ").length === 1){
		if(first === "*"){
			return t(selector,node,results);
		}else if(first === "#"){
			return id( selector.slice(1),node,results);
		}else if(first === "."){
			return c(selector.slice(1),node,results);
		}else{
			return t(selector,node,results);
		}
	}else{
		// 处理其他的选择器
		// throw new Error( '当前版本还不支持该选择器, 请联系 .....' );
		
		// 讨论后代选择器: div .c .p      .a .b .d
		// 首先找到 div -> []
		// 在数组中找 后代的 .c -> []
		// 在数组中找 后代的 .p -> []
		
		/*
		if ( 如果都是后代元素 ) {
			// 将结果加到 results 中
		}
		*/
		
		// div > .c .p
		// [\w\d_\-]+(\s+[\w\d_\-]+)+
		// /\w+(\s+\w+)+/ 
		if(/^[#\.\w\d_\-]+(\s+[#\.\w\d_\-]+)+$/.test( selector )){
			// 全部都是后代选择器
			var tempList = select4(selector ,node);
			push.apply( results,tempList );
			
			return results;
		}else{
			// 处理其它选择器
			throw new Error("当前版本还不支持该选择器，请联系......");
		}
	}
}

// 该方法用于获取后代元素
function select4( selector ,node, results ){
	node = node || document;
	results = results || [];
	
	//selector中两端没有空格，中间没有逗号 ...
	// 'div   .c   .a'
	var list = selector.replace(/\s+/g,' ').split(' ');
	//此时 List 中存储的就是各个选择器，要求从里面获得元素，在得到的结果数组中，再次获得元素
	var res2 = [ node ];
	var res1;
	
	/*
	//一步一步的分析
	res1 = res2;
	res2 = [];
	
	for( var i=0; i<res1.length; i++){
		select3( 'div', res1[i], res2 );
	}
	
	//在 res1 中获得 .c
	res1 = res2;
	res2 = [];
	for( var i=0; i< res1.length; i++){
		select3('.c', res1[i], res2);
	}
	
	//在 res2 中获得 .a
	res1 = res2;
	res2 = [];
	for( var i0; i< res1.length; i++){
		select3('.a', res1[ i ], res2);
	}*/
	
	for (var i=0; i<list.length; i++){
		res1 = res2;
		
		res2 = [];
		for(var j=0; j<res1.length; j++){
			select3( list[ i ], res1[ j ], res2);
		}
	}
	
	return res2;
}

	
	

return Select;
	
})();
