(function(window,undefined){
	
	function each( arr , callback){
		console.log("each.......");
		for (var i=0; i<arr.length; i++) {
			if(callback.call( arr[i], i, arr[i] ) === false) {
				break;	
			}
		}
		return arr;
	}
	
	function selects( selector ,results ){
		results = results || [];
		Array.prototype.push( results, document.querySelectorAll( selector ) );
		return results;
	}
	
	window.itcastTools = window.it = {
		each:each,
		selects:selects
	};
})(window);
