/**
jqueryphp jQuery Plugin v1.0
https://github.com/Xaxis/jqueryphp
Author: Wil Neeley

The intention of this plugin is to allow for the calling of PHP
functions from JavaScript in cases which latency is not an issue.

The plugin makes no assumptions regarding which functions are 
called nor what arguments are passed to them. In other words, it
is the responsibillity of the user to handle security concerns.

This plugin assumes that the user knows how many arguments should
be passed to a given PHP function. Error handling is not accounted 
for.

Usage:
1) Remember to include the latest version of jQuery as well as the
latest revision of jqueryphp.js in the head of your page file.

2) You must initialize the path of the backend PHP function request
handler file before using the extension:
	
	JPHP.path = "http://www.mydomain.com/jqueryphp/lib/func_request.php";
	
In the above we assign the path to our backend handler file and we're 
ready to start using the plugin.

3) The first argument passed must be the PHP function name that you
wish to call. The second argument must be the callback function which
has the code to handle the response from the server. The remaining 
arguments passed (if any) are the parameters you wish to pass to the
PHP function on the backend:

	$("#results").php('strlen', function(data, self) {
		$(self).html(data);
	}, 'teststring');
	
In the above notice the two arguments data and self. Each time when
defining a callback for the plugin you must pass data and self. The 
data argument contains the servers response data and the self argument
is just a reference to the 'this' context of the elements that you're
calling with your initial jQuery selector.
	
4) That's all for now. Please remember that this plugin can introduce
some serious security vulnerabilities due to the fact you're allowing
frontend clients to request PHP functions and pass those functions 
data on the server. It is advised that you create a function request
exception list, designed to only allow the functions you want to be
accessible to be called.


@method php
@param {String} func The PHP function to be called.
@param {Object} callback The callback function 
@return {Object} The jQuery object.
**/
jQuery.fn.php = function(func, callback) {		
	/*
	 * We subtract 2 from the arglen variable so when building
	 * our args string to pass to the server we are not sending
	 * the func string or the callback object to be interpreted
	 * as a argument to be passed to a PHP function.
	 */	
	var self = this, 
		arglen = arguments.length - 2,
		args = arguments;

	/*
	 * Here we build a JSON object containing any additional 
	 * arguments passed aside from the function request.
	 */
	var jsonObj = [];
	for (var i=0; i<arglen; i++) {
		var argId = i + 2;
		jsonObj.push( args[argId] );
	}
	
	/*
	 * We stringify our arguments list to pass it through to
	 * the server for processing.
	 */
	var args = JSON.stringify(jsonObj);
	
	/*
	 * Finally the request object is built and sent to the server
	 * for handling.
	 */
	var request = $.ajax({
		url: JPHP.path,
		type: "POST",
		data: {'func': func, 'args': args},
		dataType: "text",
		success: function(data) {
			callback(data, self);
		}
	});
	
	return this;
};

/**
The jqueryphp plugin requires the creation of the global variable
JPHP for configuration and initialization purposes.
**/
(function( window ) {
var 

	// A global reference to the API
	JPHP = function() {
		return this;
	};
	
	// A default path to be overriden
	JPHP.path = "function_request.php";

	// Expose JPHP to the global object
	window.JPHP = JPHP;
	
})( window );