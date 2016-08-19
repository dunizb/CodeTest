// 在框架中只有Itcast 与 I 暴露在外面，其余的所有内容应该在闭包中
(function(window,undefined){
	
//定义 Itcast构造函数
function Itcast( selector ){
	return new Itcast.fn.init( selector );
}
Itcast.fn = Itcast.prototype = {
	constructor: Itcast,
	type: 'Itcast',
	length: 0,
	
	//核心模块内容
	init: function (selector) {
		// 假设这里的init就是 jq 的 init，因此可以考虑各种参数
		// '',null,undefined
		if (!selector) {
			return this;
		}
		
		// str
		if(typeof selector == 'string'){
			//这里可能是HTML的字符串，也可能是选择器
			if( selector.charAt(0) === '<'){
				// 是HTML字符串
				// 将字符串转换为DOM对象，并加到this中
				[].push.apply(this, Itcast.parseHTML( selector ));
			}else{
				//是选择器
				//获取元素，并加到 this 中
				//使用 Itcast.Select
				[].push.apply(this, Itcast.Select(selector));
			}
		} 
		
		// fn
		if(typeof selector == 'funciton'){
			
		}
		
		//dom
		if(selector.nodeType){
			
		}
		
		//Itcast
		if(selector.type == 'Itcast'){
			
		}
	}
};
Itcast.fn.init.prototype = Itcast.fn;

// 添加 extend 方法
Itcast.extend = Itcast.fn.extend = function( obj ){
	for(var k in obj){
		this[ k ] = obj[ k ];
	}
}

//选择器模块放到这里
var Select = 

(function () {

//1> 定义一个 support 对象. 将需要使用的方法进行处理, 得到方法的能力
//2> 需要使用的可能有兼容性的方法, 定义一个可以完成该方法的函数来替代. 在函数内部进行兼容处理
//3> 定义 select 函数. 首先看是否支持 qsa, 如果支持直接使用. 如果不支持自己再来实现

var support = {},
	
	rnative = /\[native code\]/,
	
	push = [].push;	// 一开始就存储方法, 后面再是用的时候就不用每次都创建数组了. 也避免了原型的搜索
	
	
// 处理 push 的兼容性问题
try {
	
	push.apply([], document.getElementsByTagName( '*' ));
	
} catch( e ) {
	// 自定义
	push = {
		apply: function ( a, b ) {
			// 将 b 中的每一个元素加到 a 中
			for ( var i = 0; i < b.length; i++ ) {
				a[ a.length++ ] = b[ i ];
			}
			return a.length;
		}
	};
}

support.qsa = rnative.test( document.querySelectorAll + '' ); 
support.getElementsByClassName = rnative.test( document.getElementsByClassName );
support.trim = rnative.test( String.prototype.trim + '' );

var div = document.createElement( 'div' );
support.getElementsByClassName2 = rnative.test( div.getElementsByClassName );

// 判断数组的方法
support.indexOf = rnative.test( Array.prototype.indexOf + '' );


// 判断数组 array 中是否含有 search 元素
// 如果数组支持 indexOf 就应该使用数组提供的方法, 不支持才自定义实现
// indexOf 还需要一个参数, 就是 查找的开始位置
function indexOf( array, search, startIndex ) {
	startIndex = startIndex || 0;
	
	if ( support.indexOf ) {
		return array.indexOf( search, startIndex );
	}
	
	for ( var i = startIndex; i < array.length; i++ ) {
		if ( array[ i ] === search ) {
			return i;
		}
	}
	return -1;
}


// 提供进行筛选重复的方法
function unique( arr ) {
	var newArr = [];
	for ( var i = 0; i < arr.length; i++ ) {
		// if ( newArr.indexOf( arr[ i ] ) == -1 ) {
		if ( indexOf( newArr, arr[ i ] ) == -1 ) {		
			newArr.push( arr[ i ] );
		}
	}
	return newArr;
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
			// if ( list[ i ].getAttribute( 'class' ).split( ' ' ).indexOf( className ) != -1  ) {
			tempClassName = list[ i ].getAttribute( 'class' );
			
			if ( !tempClassName ) continue;
			// 避免过多的花括号与缩进
			
			if ( indexOf( tempClassName.split( ' ' ),
				 		  className ) != -1 ) {
			
				arr.push( list[ i ] );
			}
		}
		return arr;
	}
}

function trim( str ) {
	// 将 str 两边的空格去掉
	if ( support.trim ) {
		return str.trim();
	}
	return str.replace( /^\s+|\s+$/g, '' );
}


var Select = function ( selector, results ) {
	
	results = results || [];
	
	if ( support.qsa ) {
		
		push.apply( results, document.querySelectorAll( selector ) );
		
		return unique(results);
	}
	
	
	return select2( selector, results );
}



// 获取元素的基本方法
function t ( tagName, results ) {
	results = results || [];
	push.apply( results, document.getElementsByTagName( tagName ) );
	return results;
}
function c ( className, results ) {
	results = results || [];
	push.apply( results, getByClass( className, document ) );
	return results;
}
function id ( idName, results ) {
	results = results || [];
	var dom = document.getElementById( idName );
	if ( dom ) {
		push.apply( results, [ dom ] );
		// results[ results.length++ ] = dom;
	}
	return results;
}


function select2( selector, results ) {
	// 将字符串 selector split 成一个数组, 然后去除两端的空格, 遍历, 遍历的时候使用 select3
	results = results || [];
	var list = selector.split( ',' );
	for ( var i = 0; i < list.length; i++ ) {
		
		select3( trim( list[ i ] ), results );
		
	}
	return unique(results);
}


function select3( selector, results ) {
	// 只考虑 4 个基本选择器: #id, .className, tag, *
	// 判断传入的 selector 是四种选择器中的哪一种
	var first = selector.charAt( 0 );
	
	if ( selector.split( ' ' ).length === 1 ) {
		// 如果中间不含有空格, 那么就考虑基本选择器
		if ( selector === '*' ) {
			return t( selector, results );
		} else if ( first === '#' ) {  
			return id( selector.slice( 1 ), results );
			
		} else if ( first === '.' ) {	
			return c( selector.slice( 1 ), results );
			
		} else { 
			return t( selector, results );
		} 
	} else {
		// 处理其他的选择器
		throw new Error( '当前版本还不支持该选择器, 请联系 .....' );
	}
}
	
return Select;
	
})();

Itcast.Select = Select;

//DOM 操作模块放到这里
//工具方法
Itcast.parseHTML = (function(){
var node = document.createElement("div");
function parseHTML (str) {
	node.innerHTML = str;
	var arr = [];
	arr.push.apply(arr, node.childNodes);
	return arr;
}

return parseHTML;
})();

//模块中的实例方法
Itcast.fn.extend({
	appendTo:function( dom ){
		//将this中的每个成员加到DOM中
		for(var i=0; i < this.length; i++){
			dom.appendChild( this[i] );
		}
		return this;
	}
});

	window.Itcast = window.I = Itcast;
})(window);
