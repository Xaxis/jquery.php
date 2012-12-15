/**
jqueryphp jQuery Plugin v1.1
https://github.com/Xaxis/jqueryphp
Author: Wil Neeley

The primary intention of this plugin is to allow for calling PHP
functions from within JavaScript.

Secondarily, when the 'exec' feature is enabled, users of this
plugin can execute arbitrary PHP code written within JavaScript.

The usage of this plugin is advised in contexts where latency is
not an issue and direct access to PHP functionality within JavaScript
would prove very useful.

This plugin makes few assumptions regarding which functions can
be called. Therefore it is the responsibillity of the user to handle
security concerns.

This plugin assumes that the user knows how many arguments should
be passed to a given PHP function.

Usage:
1) Remember to include the latest version of jQuery as well as the
latest revision of jqueryphp.js in the head of your page file.

2) You must initialize the path of the backend PHP function request
handler file before using the extension:
	
	$.fn.php('init', {'path': '"http://www.mydomain.com/jqueryphp/lib/func_request.php'});
	
In the above we assign the path to our backend handler file and we're 
ready to start using the plugin.

3) You can call PHP functions in a few different ways. Since it is
assumed that the primary usage of the plugin is to call PHP functions
providing the .php() method the 'call' parameter is not required:

	$("#results").php('strlen', function(data, self) {
		$(self).html(data);
	}, 'teststring');
	
With that in mind, passing 'call' as the first paramter is acceptable:

	$("#results").php('call', 'strlen', function(data, self) {
		$(self).html(data);
	}, 'teststring');
	
The 'data' and 'self' arguments must be passed to the callback function.
The 'data' argument contains the servers response data to your requested
function call. The 'self' argument is just a reference to the 'this' context
of the DOM element(s) that you're selecting with jQuery.
	
4) The secondary capacity of the plugin allows for the execution of 
arbitrary code strings written in PHP within JavaScript:
	
	var code = "$a = 2; $b = 2; $c = $a + $b; echo $c;"
	$("#results4").php('exec', code, function(data, self) {
		$(self).html(data);
	});
	
This functionality is disabled by default for it introduces some obvious
security issues.
**/
(function( $ ) {
	
	var config = {
		'path' : 'function_request.php'
	};
	
	var methods = {
		
		/*
		 * This method handles all calls to pre-existing PHP functions
		 * regardless of whether they are native or user defined.
		 */
		init : function( options ) {
			var settings = $.extend(config, options);
		},
		
		/*
		 * This method handles the execution of user passed PHP strings
		 * to the server.
		 */	
		call : function( func, callback ) {
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
			 * Here we build a JSON object containing the arguments (if
			 * any) to be passed to the PHP function. We offset our index
			 * by 2 so we don't pass the function string or the callback
			 * object to the server.
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
				url: config.path,
				type: "POST",
				data: {'method': 'call', 'func': func, 'args': args},
				dataType: "text",
				success: function(data) {
					callback(data, self);
				}
			});
			
			return this;
		},
		
		/*
		 * This method allows for running PHP code written within 
		 * JavaScript. 
		 */
		exec: function( code, callback ) {
			var self = this;
			
			/*
			 * Finally the request object is built and sent to the server
			 * for handling.
			 */
			var request = $.ajax({
				url: config.path,
				type: "POST",
				data: {'method': 'exec', 'code': code},
				dataType: "text",
				success: function(data) {
					callback(data, self);
				}
			});
			
			return this;
		}
	};
	
	
	/*
	 * So the user of this plugin doesn't have to constantly pass in 
	 * the 'call' parameter, being as how it will be the most used 
	 * method, for convenience we make it so it is assumed when no
	 * method parameter string is passed the 'call' method is used.
	 */
	$.fn.php = function( method ) {		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( method !== 'init' && method !== 'exec' ) {
			return methods[ 'call' ].apply( this, Array.prototype.slice.call( arguments ));
		} else if ( typeof method === 'object' ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.php' );
		}
	};

})( jQuery );