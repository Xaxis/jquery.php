#jQuery plugin for writing and using PHP within JavaScript
##A versitile jQuery plugin implementation

	A versitile wrapper for using PHP in jQuery/JavaScript. Allows for quickly writing web applications 
	in multi-code situations. Now you can define and use your PHP functions directly within JavaScript. 
	By default you can easily gain access to all of PHP's core functions from your JavaScript without the
	overhead of using JavaScript libraries to emulate PHP functions. See features section for more details 
	on provided functionality.

  Fork me @ https://github.com/Xaxis/jqueryphp

## REQUIREMENTS:
* jQuery library (http://www.jquery.com)

## FEATURES:
* Access to PHP core & user defined functions as JavaScript methods
* Dynamic JSON pseudo code to PHP translation
* Execution of PHP strings within JavaScript
* Chaining of PHP functions as JavaScript methods
* Performance testing functionality
* Security procedures to block unintended PHP usage from the client
* Client side caching support for multiple function requests
* Whitelist/Blacklist operations modes for PHP function calls
* Wide range of design patterns for calling and using PHP functions
* Great flexibility while working with returned results and the DOM
* Automatic type conversion of returned results into JavaScript types

## EXAMPLES:

### Shortcut reference
For ease of use we define a shortcut reference which we will use throughout the rest of our examples. This
is only recommended behavior. You can of course use the plugin through $.fn.php at anytime.

```javascript
var P = $.fn.php;
```

### Initialization
After we have included jquery and jquery.php in the head of our document we must call the init method. The
path where request_handler.php exists must be specified. We provide the names of all user defined functions 
we want to use in a space delimited list.

```javascript
P('init', 
{
    // The path to our function request handler is absolutely required
    'path': 'http://www.YourDomain.com/jqueryphp/request_handler.php',
    
    // Synchronous requests are required for method chaining functionality
    'async': false,
    
    // List any user defined functions in the manner prescribed here
    'userFunctions': {
        languageFunctions: 'echo print print_r'
    }
});
```

### Defining a global callback
Here we can define a global callback function so we don't have to pass one to our function requests every time
if we're using the context of jquery selected elements.

```javascript
// Setting the global callback is as simple as passing a callback function to our plugin
P(function (data, self) {
    $(self).append("<div>" + data + "</div>");
});
```

### Defining a global selector context
Here we specify the jquery selected elements we would like our bound context to be. This will override
any previously selected contexts.

```javascript
// Setting our selector context can also be done independently by passing our selector object
P($("#results1"));
```

### Defining the global selector and callback simultaneously
Sometimes it will be easier to specify both the global selector context and callback at the same time.

```javascript
// We can set our global callback and selector context at the same time
P($("#results1"), function(data, self) {
    $(self).append("<div id='whatever'>" + data + "</div>");
});

```

### Usage scenario (Simple)
The following are some simple usage scenarios. It should be noted that the examples below demonstrate
multiple ways to do nearly the same thing (call PHP's highlight_string function). 

```javascript	
// This is perhaps the simplest way of calling your PHP function
P.highlight_string('I am a string.', true);	

// Passing the function you wish to use as a string as the first parameter
P('highlight_string', 'A longer test string!', true);

// Assinging the PHP function you wish to call as the name of the callback
P(function highlight_string(data, self) {
    $(self).append("<div><u>" + data + "</u></div>");
}, 'A shorter string!', true);

// Calling your PHP function by passing a string
P('highlight_string', function(data, self) {
    $(self).append("<div><u style='color: red'>" + data + "</div>");
}, 'This will be the longest string passed to strlen yet!', true);

// Calling your function while choosing a new selector context and setting a new callback
$("#results1").php('highlight_string', function(data, self) {
    $(self).append("<div><u style='color: green;'>" + data + "</u></div>");
}, 'This will be the longest string passed to strlen yet (plus one ++)', true);

// Calling your function while choosing a new selector context without setting a callback
$("#results1").php('highlight_string', 'Yet another string!', true);
```

### Usage scenario (Returning Values)
Many times we have no need to work with the DOM and our returned results. When making single function calls
it's as easy as assigning our calls to a variable.

```javascript
// We suspend our callback so the global callback is not used
P.useCallback = false;

var strLenA = P.strlen('some string');
var strLenB = P.strlen('another string');
var totalStrLen = strLenA + strLenB;
console.log( totalStrLen );
```

### Usage scenario (Block Mode)
Perhaps one of the most powerful modes provided is block mode. In block mode you can pass a JSON object
containing PHP pseudo-code to be executed by PHP. Unlike other modes, code and function requests are not
executed and returned one at a time. Instead the entire "block" of JSON pseudo-code is executed on the
server and then returned.

```javascript    
// We structure a JSON block of data and function requests to be passed to the server 
var codeBlock = {
    str: "Let's use PHP's file_get_contents()!",
    opts: 
    [
        {
            http: {
                method: "GET",
                header: "Accept-language: en\r\n" +
                        "Cookie: foo=bar\r\n"
            }
        }
    ],
    context: 
    {
        stream_context_create: ['opts']
    },
    contents: 
    {
        file_get_contents: ['http://www.williamneeley.com/', false, 'context']
    },
    html: 
    {
        htmlentities: ['contents']
    }
}

// Following the design pattern of the rest of our mode options we can of course use our block mode functionality
// while defining a callback.
P(function block(data, self) {
    $(self).append("<div style='border:5px dotted green; white-space:pre-wrap;'>"+data+"</div>");
}, codeBlock);

// Our code block is passed to the block function and the data is returned to the callback assigned to it.
P('block', codeBlock);	

// We suspend our callback so the global callback is not used
P.useCallback = false;

// Optionally we can store any returned results from our block function directly to a JavaScript variable.
var pageContents = P('block', codeBlock).result();
console.log(pageContents);
```

### Usage scenario (Multi Mode)
Multi mode allows you to call consecutive PHP functions as an object by passing the function name as
the property. Each property references a an array of parameters to be passed to that function. When we
return the results of a multi call to a variable an array is returned containing all the returned values.

```javascript
// Using multi mode and setting a new global callback
P(function multi(data, self) {
    $(self).append("<div>" + data + "</div>");
},
{
    abs : [-884],
    cosh : [23],
    sqrt : [43]
});

// If we don't want our following function calls to use our global callback we can suspend the callback
P.useCallback = false;

// Now we can return an array of values from our multi mode call
var dataSet = P('multi',
{
    abs : [-884],
    cosh : [23],
    sqrt : [43]
}).data;
console.log(dataSet);

// The global callback is unsuspended on the next callback passed to our plugin but we can also do so manually
P.useCallback = true;

// Set a new selector context while using multi mode
$("#results4").php('multi',
{
    pi : [700]
});
```

### Usage scenario (Exec Mode)
Exec mode allows you to pass arbitrary strings of PHP code to be executed. This mode is disabled by default
on the backend. It is advisable to only use this mode in development stages.

```javascript
// The one required component of an exec mode string is that a value be returned
var code = "$a = 2; $b = 2; $c = ($a + $b); return $c;";
P('exec', code);

// We can of course use exec mode while setting a new global callback
P(function exec(data, self) {
    $(self).append("<div style='border:2px dashed pink'>" + data + "</div>");
}, "$a = 8; $b = 3; $c = ($a + $b); return $c;");

// In order to return data to a variable we must call the result() method 
var execData = P('exec', code).result();
console.log( execData );
```

### Usage scenario (Chain Mode)
The below is an example of calling PHP functions using the chain mode pattern. We pass our parameters to be
acted on to our plugin method directly. No parameters should be sent to individual functions in the chain.
All functions in the chain must be able to work on the returned results of the function before itself in
the chain.

```javascript
// The simplest way to use chain mode
P('chain', 8, 3).pow().pi();

// One way to interface with our chain mode
P(function chain(data, self) {
    $(self).append("<div style='border:2px dashed blue'>" + data + "</div>");
}, -138)
    .abs()
    .tan();

// Interfacing with our chain mode using the 'chain' keyword
P('chain', function(data, self) {
    $(self).append("<div style='border:2px dashed yellow'>" + data + "</div>");
}, 2, 8)
    .pow()
    .pi();

// We suspend our callback so the global callback is not used
P.useCallback = false;

// Returning our results from a chain call directly to a variable (note the .data property)
var result = P('chain', 8, 3).pow().tan().abs().data;
console.log( result );
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
			
		var strLenA = P.strlen('some string');
		var strLenB = P.strlen('another string');
		var totalStrLen = strLenA + strLenB;
			
});
}, 3);
console.log('Test Time: ' + testTime + ' ms');
```
