jqueryphp
=========

The primary intention of this plugin is to allow for calling PHP
functions from within JavaScript.

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
	
	$.fn.php('init', {'path': 'http://www.mydomain.com/jqueryphp/lib/func_request.php'});
	
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

We can also pass an object containing name value pairs of functions and
parameters to be executed in sequential order like so:

	$("#results").php({
		abs : [-884],
		cosh : [23],
		sqrt : [43],
		pi : [700],
		highlight_string : ["<?php $a = 2; $b = 2; $c = $a + $b; echo $c; ?>"],
		date : ["DATE_RFC822"]
		}, function(data, self) { 
			$(self).append("<div>" + data + "</div>");
	});
	
When doing so we only pass our function/param object and our callback. Passing
extra parameters will have no effect.

Things get really interesting when we use the method chaining pattern when calling
our PHP functions. When using jqueryphp in this manner, only one parameter is passed.
The returned result from the first function is passed to the next and so on down the
chain.

	$("#results6").php(function chain(data, self) {
		$(self).append("<div>" + data + "</div>");
	}, -138)
		.abs() 
		.decbin()
		.decbin()
		.bindec()
		.sqrt()
		.tan()
		.abs()
		.round();

	
4) The secondary capacity of the plugin allows for the execution of 
arbitrary code strings written in PHP within JavaScript:
	
	var code = "$a = 2; $b = 2; $c = $a + $b; echo $c;"
	$("#results4").php('exec', code, function(data, self) {
		$(self).html(data);
	});
	
This functionality is disabled by default for it introduces some obvious
security issues.
