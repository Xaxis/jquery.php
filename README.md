jqueryphp
=========

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
	
4) The secondary capacity of the plugin allows for the execution of 
arbitrary code strings written in PHP within JavaScript:
	
	var code = "$a = 2; $b = 2; $c = $a + $b; echo $c;"
	$("#results4").php('exec', code, function(data, self) {
		$(self).html(data);
	});
	
This functionality is disabled by default for it introduces some obvious
security issues.
