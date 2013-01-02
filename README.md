#jQuery plugin for writing and using PHP within JavaScript
##A versitile jQuery plugin implementation

	A versitile wrapper for using PHP in jQuery/JavaScript. Allows for quickly
	writing web applications in multi-code situations. Now you can define and 
	use your PHP functions directly within JavaScript. By default you can easily
	gain access to all of PHP's core functions from your JavaScript without the
	overhead of using JavaScript libraries to emulate PHP functions. See features 
	section for more details on provided functionality.

  Fork me @ https://github.com/Xaxis/jqueryphp

## REQUIREMENTS:
* jQuery library (required - http://www.jquery.com)

## FEATURES:
* Access to PHP core functions as JavaScript methods
* Dynamic JavaScript to PHP code translation
* Execution of PHP strings within JavaScript
* Chaining of PHP functions as JavaScript methods
* Performance testing functionality
* Security procedures to block unintended PHP usage from the client
* Client side caching support for multiple function requests
* Whitelist/Blacklist operations mode on PHP function calls
* Wide range of design patterns for calling and using PHP functions
* Great flexibility while working with returned results and the DOM

## EXAMPLES:

### Shortcut reference
For ease of use we define a shortcut reference which we will use throughout the rest of our examples. This
is only recommended behavior. You can of course use the plugin through $.fn.php at anytime.

```javascript
var P = $.fn.php;
```

### Initialization
After we have included jquery and jquery.php in the head of our document we must call the init method. The
path where the backend func_request library must be specified. User defined functions are setup here. We
provide the names of all user defined functions we want to use in a space delimited list.

```javascript
P('init', 
{
		// The path to our function request handler is absolutely required
		'path': 'http://www.YourDomain.com/lib/func_request.php',

		// List any user defined functions in the manner prescribed here
		'userFunctions': {
			private: '_foo _bar _someFunc1 _someFunc2',
			public: 'foo bar someFunc1 someFunc2'
		}
});
```

### Defining a global callback
Here we can define a global callback function so we don't have to pass one to our function requests every time
if we're using the context of jquery selected elements.

```javascript
// One way to set our global callback function.
P(function callback(data, self) {
	$(self).append("<div>" + data + "</div>");
});

// This is another way to set our global callback function.
P('callback', function(data, self) {
	$(self).append("<span>" + data + "</span>");
});
```

### Defining a global selector context
Here we specify the jquery selected elements we would like our bound context to be. This will override
any previously selected elements. You can optionally define the element(s) context while calling PHP
functions as demonstrated in examples below.

```javascript
P('select', $("#results1"));
```

### Usage scenarios
The following are some simple usage scenarios. It should be noted that the examples below demonstrate
multiple ways to do the same thing. In the usage scenarios below we are calling PHP's strlen function.

```javascript	
// The simplest way of calling your PHP function.
P.strlen('I am a string.');

// And of course we can return our string length to a variable.
var strLen = P.strlen('I am a string.');

// Passing the 'call' keyword is allowed but not required or necessary.
P('call', 'strlen', 'A test string!');	
	
// Naming your function name 'call' is also possible (but not required or necessary).		
P(function call(data, self) {
	$(self).append("<br><i>" + data + "</i>");
}, 'strlen', 'A test string!');	
	
// Passing the function you wish to use as a string as the first parameter.
P('strlen', 'A longer test string!');

// Assinging the function you wish to call as the name of the callback.
P(function strlen(data, self) {
	$(self).append("<br><u>" + data + "</u>");
}, 'A shorter string!');

// Calling your function while setting a new global callback.
P('strlen', function(data, self) {
	$(self).append("<br><u style='color: red'>" + data + "</u>");
}, 'This will be the longest string passed to strlen yet!');

// Calling your function while choosing a new selector context and setting a new callback.
$("#results1").php('strlen', function(data, self) {
	$(self).append("<br><u style='color: green'>" + data + "</u>");
}, 'This will be the longest string passed to strlen yet (plus one)!');
	
// Calling your function while choosing a new selector context without setting a new callback.
$("#results2").php('strlen', 'Yet another string!');
```

### Some more simple usage demonstrations

```javascript
// Now let's switch our selector context to another div
P('select', $("#results2"));
	
// Let's set another callback function (if you don't further requests will just use the last one).
P('callback', function(data, self) {
	$(self).append("<div style='font-size: 2.0em;'>" + data + "</div>");
});
	
// And we call PHP's crypt function on the passed string.
P.crypt("My encrypted passphrase.");
	
// Now let's switch our selector context to another div
P('select', $("#results3"));
	
// Let's set another callback function (if you don't further requests will just use the last one).
P('callback', function(data, self) {
	$(self).append("<div style='font-size: 2.0em;'>" + data + "</div>");
});
	
// And we call PHP's crypt function on the passed string.
P.crypt("My encrypted passphrase.");
	
// Now let's switch our selector context to another div
P('select', $("#results3"));
```

### Using multi mode
The below is an example of calling multiple consecutive functions as an object by passing the function
name as the key and then an array of values pertaining to a given function's parameters.

```javascript
// Let's call a series of math functions
P(function multi(data, self) {
	$(self).append("<div>" + data + "</div>");
},
{
	abs : [-884],
	cosh : [23],
	sqrt : [43]
});
	
// Let's highlight a PHP string of code using our 'multi' functionality.
P('multi',
{
	highlight_string : ["<?php $a = 2; $b = 2; $c = $a + $b; echo $c; ?>"],
});
	
// Let's run the 'pi' function and then the 'data' function.
$("#results4").php('multi',
{
	pi : [700],
	date : ["DATE_RFC822"]
});
```

### Using code exec mode
Exec mode directly passes PHP code to the backend and return the result. This method is disabled by
default on the backend.

```javascript
// Passsing a simple string and return results.
var code = "$a = 2; $b = 2; $c = $a + $b; echo $c;"
P('exec', code, function(data, self) {
	$(self).html(data);
});
```

### Using function chaining
The below is an example of calling PHP functions using a function chaining pattern. It is imperative 
that we pass our callback as the first argument. In addition, naming the callback function 'chain'
is required. When passing parameters to a chain just think of the first function being called to
know which parameters to pass. It is the returned results of the first function that all other
functions in the chain act on.

```javascript
// Call a few math functions to work on the value -138
P(function chain(data, self) {
	$(self).append("<div style='border:2px dashed blue'>" + data + "</div>");
}, -138)
	.abs()
	.tan();
	
// Call a few functions to operate on the parameters 2, 8
P('chain', function(data, self) {
	$(self).append("<div style='border:2px dashed yellow'>" + data + "</div>");
}, 2, 8)
	.pow()
	.pi();
	
// And of course we can do the same thing without passing a callback
P('chain', 8, 3).pow().pi();
```

### Using PHP returned results directly in JavaScript
In many cases we will want to return data from a PHP function request to a JavaScript variable instead
of a DOM element so we can further act on that data with our JavaScript code. We can do so easily by 
assinging our method call to a JavaScript variable and accessing the .data property of the function call.

```javascript
// Here we calculate the total string length of a few strings
var strLenA = parseInt( P.strlen('some string').data );
var strLenB = parseInt( P.strlen('another string').data );
var totalStrLen = strLenA + strLenB;
console.log(strLenA, strLenB, totalStrLen);
```

### Performance bench testing
In many situations we would like to determine the latency involved with a given code block. The bench 
method was created to test the total time in milaseconds it takes to run your code (inclusive of response
time to and from the server). To use the bench method we must pass a specially structured callback
function like that used below. Notice the return value is an inline annonymous function. All other code
within is code you would like to test.

```javascript
var testTime = P('bench', function() {
	return (function() {
			
		var strLenA = parseInt( P.strlen('some string').data );
		var strLenB = parseInt( P.strlen('another string').data );
		var totalStrLen = strLenA + strLenB;
			
});
}, 3);
console.log('Test Time: ' + testTime + ' ms');
```
