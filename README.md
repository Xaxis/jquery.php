#jQuery plugin for writing and using PHP within JavaScript
##A versitile jQuery plugin implementation

	A versitile wrapper for using PHP in JavaScript. Allows for quickly writing web applications in 
	multi-code situations. You can define and use custom PHP functions directly within JavaScript. 
	By default you can easily gain access to most of PHP's core functions within JavaScript without 
	the overhead and implementation issues often found when using JavaScript libraries to emulate PHP 
	functions. See features section for more details on provided functionality.

  Fork me @ https://github.com/Xaxis/jqueryphp

## REQUIREMENTS:
* jQuery library (http://www.jquery.com)

## FEATURES:
* Access to PHP core & user defined functions as JavaScript methods
* Dynamic JSON pseudo code to PHP translation
* Execution of arbitrary PHP strings within JavaScript
* Chaining of PHP functions as JavaScript methods
* Caching support to leverage multiple function requests
* Security procedures to block unintended PHP usage from the client
* Wide range of design patterns for using PHP directly in JavaScript
* Great flexibility while working with returned results and the DOM
* Automatic type conversion of returned results into JavaScript types
* Performance and bench testing functionality to calculate latency

## EXAMPLES:

### Shortcut Reference
For ease of use we define a shortcut reference which we will use throughout the rest of our examples. This
is only recommended behavior. You can of course use the plugin through $.fn.php at anytime.

```javascript
var P = $.fn.php;
```

### Initialization & Configuration
After we have included jquery and jquery.php in the head of our document we must call the init method. The
path where request_handler.php exists must be specified.

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

### Defining a Global Callback
Define a global callback function so you don't have to pass one to a function requests every call if 
we're working with the DOM.

```javascript
// Setting the global callback is as simple as passing a callback function to our plugin
P(function (data, self) {
    $(self).append("<div>" + data + "</div>");
});

// Or we could use our callback method to do the same thing
P.callback(function (data, self) {
    $(self).append("<div>" + data + "</div>");
});
```

Notice in both instances above we're defining two arguments to our callback: `data` and `self`. `data`
will hold the returned values from the server and `self` is used as a reference to our selector context.

The global callback is used when working with elements in the DOM. You are not required to define a 
callback at all if your intentions are to work programatically with PHP in JavaScript. See Returning 
Values to Variables.

### Defining a Global Selector Context
Here we specify the jQuery selected elements we would like our bound context to be. This will override
any previously selected contexts. If no context is chosen the plugin object becomes our context.

```javascript
// Setting our selector context can also be done independently by passing our selector object
P($("#results1"));

// Or we could use our context method to do the same thing
P.context($("#results1"));
```

The global selector context is used when targeting elements you would like to work with in the DOM. You 
are not required to use a selector context if your intentions are to work programatically with PHP in
JavaScript.

### Defining the Global Selector Context and Callback Simultaneously
It will often be easier to specify both the selector context and callback at the same time. This way you
won't need to set it while calling PHP functions and working with DOM elements.

```javascript
// We can set our global callback and selector context at the same time
P($("#results1"), function(data, self) {
    $(self).append("<div id='whatever'>" + data + "</div>");
});

// Another way we could do this would be calling the `callback` and `context` method as a chain
P.context($("#results1")).callback(function(data, self) {
    $(self).append("<div id='whatever'>" + data + "</div>");
});
```

### Plugin Methods
Before we get to much further into demonstrating how to use jquery.php, you should familiarize yourself
with the various core methods of the plugin.

Mode methods: 
* `block`
* 	Implements the blocking mode interface
* 	Allows for passing JSON objects of PHP to the server
* `chain`
* 	Implements the method chaining mode
* 	Is the default method of operation
* 	Used to chain PHP functions together in logical units
* 	Calling `chain` directly is not required behavior
* `exec`
* 	Implements the execution mode interface
* 	Used to exicute arbitrary strings of PHP code
* `multi`
* 	Implements the multiple mode interface
* 	Used as an easy shorthand to send multiple function requests
* 	Unlike `block` does not send all function calls at one time

Setter methods:
* `callback` 
* `context`

Getter methods:
* `end`
* `result`

Utility methods:
* `bench`
* `clear`
* `repeat`

### Returning Values to Variables
In many situations we will not be working with the DOM at all. We'll simply want to return results from PHP
and work with them directly in our JavaScript. There are a few different ways in which jquery.php returns
data.
* The `end` method returns data in raw form. That is it returns data outside of the array that jquery.php
stores it in.
* The `data` property returns data within an array that jquery.php stores it in.
* Both ways of retrieving data share one thing in common: you call them at the end of a request sequence.
* Since jquery.php was designed to work with jQuery and the DOM it is usually prudent to set the `useCallback`
property to `false` before sequences of code that work with returned values directly.

```javascript
// We suspend our callback so the global callback is not used
P.useCallback = false;

// Both .end() and .data return data to variables
var strLenA = P.strlen('some string').end();
var strLenB = P.strlen('another string').end();
var totalStrLen = strLenA + strLenB;
console.log( totalStrLen ); // 25

// .data Returns data in an array
var data1 = P.crypt("Some Crypt String").data;
console.log( data1 ); // ["$1$Tk1b01rk$shTKSqDslatUSRV3WdlnI/"]
```

### Basic Usage
The following are some simple usage scenarios. jquery.php attempts to provide a variety of different mechanisms
or interfaces that do the same thing. In other words jquery.php trys to abide by the, "there are many ways to 
skin a cat" principle as it relates to API design.

There are a few important points to keep in mind:
* You may assign a context or a callback at any time
* You do not have to work with the DOM. Returning values to variables is perfectly valid behavior.

```javascript	
// This is perhaps the simplest way of calling a PHP function
P.highlight_string('I am a string.', true);	

// You could also call a function by passing its name as the first parameter followed by the functions parameters
P('highlight_string', 'A longer test string!', true);

// Assinging the PHP function you wish to call as the name of the callback
P(function highlight_string(data, self) {
    $(self).append("<div><u>" + data + "</u></div>");
}, 'A shorter string!', true);

// Calling your function while choosing a new selector context and setting a new callback
$("#results1").php('highlight_string', function(data, self) {
    $(self).append("<div><u style='color: green;'>" + data + "</u></div>");
}, 'This will be the longest string passed to strlen yet (plus one ++)', true);

// Calling your function while choosing a new selector context without setting a callback
$("#results1").php('highlight_string', 'Yet another string!', true);

// Turning off the usage of callbacks
P.useCallback = false;

// Returning a functions return value to a JavaScript variable
var highlightedString = P.highlight_string('some string').end();
```

### Block Mode
Perhaps one of the most powerful modes provided is block mode. In block mode you can pass a JSON object
containing PHP pseudo-code to be executed by PHP. Unlike other modes, code and function requests are not
executed and returned one at a time. Instead the entire "block" of JSON pseudo-code is executed on the
server and then returned.

```javascript 
// Perhaps the easiest manner to use block mode is as follows   
P.block({
    $str: "Let's use PHP's file_get_contents()!",
    $opts: 
    [
        {
            http: {
                method: "GET",
                header: "Accept-language: en\r\n" +
                        "Cookie: foo=bar\r\n"
            }
        }
    ],
    $context: 
    {
        stream_context_create: ['$opts']
    },
    $contents: 
    {
        file_get_contents: ['http://www.williamneeley.com/', false, '$context']
    },
    $html: 
    {
        htmlentities: ['$contents']
    }
});

// Let's switch the selector context and assign a different callback
P($("#results2"), function (data, self) {
    $(self).append("<div style='color: green'>" + data + "</div>");
});

// We create an identical object as above and store it in the variable `codeBlock`
var codeBlock = 
{
    $str: "Let's use PHP's file_get_contents()!",
    $opts: 
    [
        {
            http: {
                method: "GET",
                header: "Accept-language: en\r\n" +
                        "Cookie: foo=bar\r\n"
            }
        }
    ],
    $context: 
    {
        stream_context_create: ['$opts']
    },
    $contents: 
    {
        file_get_contents: ['http://www.williamneeley.com/', false, '$context']
    },
    $html: 
    {
        htmlentities: ['$contents']
    }
};

// Returns the results of our codeBlock request to the selected context
P('block', codeBlock);	

// Now we disable our usage of a callback all together
P.useCallback = false;

// We want to return our computed results to a variable and don't want to effect the DOM
var result = P('block', codeBlock).result();
var data = P('block', codeBlock).data;
console.log( result, data );

// Additionally it is possible to set a new context and callback while making any type of request
P('block', $("#results3"), function(data, self) {
    $(self).append("<div style='border:5px dotted orange; white-space:pre-wrap;'>"+data+"</div>");
}, codeBlock);

// Turning the `useCallback` property is not required. Passing a callback in any request reactivates it
P.useCallback = true;
```

### Multi Mode
Multi mode allows you to call consecutive PHP functions as an object by passing the function name as
the property. Each property references an array of parameters to be passed to that function. When we
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

// If we don't want function calls to use the global callback we can suspend the callback
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

### Exec Mode
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

### Chain Mode
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

### Performance & Bench Testing
In many situations we would like to determine the latency involved with a given code block. The bench 
method was created to test the total time in milaseconds it takes to run your code (inclusive of response
time to and from the server). To use the bench method we must pass a specially structured callback
function like that used below. Notice the return value is an inline annonymous function. All other code
within is code you would like to test.

```javascript
var testTime = P('bench', (function() {
			
	var strLenA = P.strlen('some string').end();
	var strLenB = P.strlen('another string').end();
	var totalStrLen = strLenA + strLenB;
			
}), 3).end();
console.log('Test Time: ' + testTime + ' ms');
```
