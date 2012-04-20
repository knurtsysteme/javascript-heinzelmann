/*! serializeObject v 0.02 by http://www.knurtsysteme.de
 * License: http://produkte.knurtsysteme.de/license */
if(typeof(jQuery)=='undefined') throw("require jQuery");
/**
* build an object of form elements like http://api.jquery.com/serializeArray does.
*
* instead of this:
* [{name: "a", value: "1"}, {name: "e", value: "2"},{name: "e", value: "3"}]
* return that:
* {a: "1", e: ["2", "3"]}
* 
* accept a wrapper that is not a form element.
*/
(function($){
    $.fn.serializeObject = function() {
    	var result = {};
    	var nameValues = $(':input', $(this)).serializeArray();
    	$(nameValues).each(function(i, nv) {
    		if(result[nv.name]) {
    			if(!$.isArray(result[nv.name])) {
    				var tmpa = [result[nv.name]];
    				result[nv.name] = tmpa;
    			}
    			result[nv.name].push(nv.value);
    		} else {
    			result[nv.name] = nv.value;
    		}
    	});
    	return result;
    }
})(jQuery);
