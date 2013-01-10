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
Define a global callback function so you don't have to pass one to a function request every call if 
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
    
* `php.chain( methodCount )`
	* Implements the method chaining mode
	* Is the default method of operation
	* Used to chain PHP functions together in logical units
	* Calling `chain` directly is not required behavior
    
* `php.block( blockObject )`
	* Implements the blocking mode interface
	* Allows for passing JSON objects of PHP to the server
    
* `php.multi( multiObject )`
	* Implements the multiple mode interface
	* Used as an easy shorthand to send multiple function requests
	* Unlike `block` does not send all function calls at one time
    
* `php.exec( codeString )`
	* Implements the execution mode interface
	* Used to exicute arbitrary strings of PHP code

Getter/Setter methods:
* `php.callback( callback[, *] )`
	* Sets the global callback function
    * Passing a function sets the global callback and re-activates the `useCallback` property
    * Passing `true` or any "truthy" value sets the `useCallback` property to true
	* Passing `false` or any "falsy" value sets the `useCallback` property to false
    * Passing no arguments sets the `useCallback` property to false and returns the callback
* `php.context( context[, *] )`
	* Sets the global selector context
    * Passing a jQuery selected element sets the global context
    * Passing no arguments returns the global selector context

Closing methods:
* `php.end()`
	* Returns the value of the last requested function call
* `php.result()`
	* Returns the value of the last requested function call
* `php.data()`
	* Returns the value of the last requested function call within an array

Utility methods:
* `php.bench( selfInvokingCallback )`
	* Implements the bench performance method
    * Passing a self invoking function containing code returns the time in milaseconds it takes to process
      that code including request time to the server (if any function requests are made within that code).
    * Like other jquery.php methods the value is not directly returned until you call `end` or `result` on
      the method.
* `php.clear()`
	* Clears the chain buffer that holds all requests made to a point
    * If called directly before `repeat`, `repeat` will have no effect  
* `php.repeat()`
	* Repeats all function requests made to a point to the server 

### Returning Values to Variables
In many situations we will not be working with the DOM at all. We'll simply want to return results from PHP
and work with them directly in our JavaScript. There are a few different ways in which jquery.php returns
data.

* The `end` method returns data in raw form. That is it returns data outside of the array that jquery.php
stores it in
* The `result` method returns data within the array that jquery.php stores it in
* Both ways of retrieving data share one thing in common: you call them at the end of a request sequence.
* Since jquery.php was designed to work with jQuery and the DOM it is usually prudent to call `callback(false)`
to avoid using any set callbacks. Either way values will be returned back to your code. However without setting the
callback to false the DOM will still be interacted with if you have previously assigned any callbacks.

```javascript
// We suspend our callback so the global callback is not used
P.callback(false);

// Both .end(), .result() and .data() return data to variables
var strLenA = P.strlen('some string').end();
var strLenB = P.strlen('another string').end();
var totalStrLen = strLenA + strLenB;
console.log( totalStrLen ); // 25

// .data Returns data in an array
var data1 = P.crypt("Some Crypt String").data();
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
P.callback(false);

// Returning a functions return value to a JavaScript variable
var highlightedString = P.highlight_string('some string').end();
```

### Chain Mode
This is the default mode of operation of the plugin and calling the `chain` method directly is not required. Chain
mode allows for calling sequences of PHP functions in a chain (functionality that is not provided for PHP functions
in the PHP language construct itself).

Some important things to keep in mind:
* The first method called in a chain is passed that PHP function's required parameters with no alterations
* Methods that follow the first can be given the returned data from the last function call via an empty array which acts as a reference telling the plugin where within the parameters to pass the returned data from the last request to
* The point of PHP function chaining is to create a versitile shorthand for writing sequential function calls that depend on the returned results from functions called previously as values passed to the current called method's parameters
* While calling `chain` directly is not required, doing so leverages some powerful results that reduce latency to and from the server by minimizing the requests sent. Some things to remember when calling the `chain` method directly:
	* You must pass an integer to the `chain` method that represents how many methods in the chain follow. This number must be accurate. Passing 3 when there are 4 methods will result in failure
    * When calling `chain` directly all method requests are sent to the server at once vs. one at a time
	* Data is returned without the need to call any of our data methods at the end of a sequence. This is the only situation or mode of operation where you are not required to call a data method on a sequence when returning data to JavaScript
    * Additionally you can reference the returned data from a previous method call by using the name of the last method as a string and placing that string in the parameter location where you would like to have the data passed
    * This is the only mode that does not effect the repeat buffer

It will be far easier to simply demonstrate some usage scenarios:

```javascript
// Using chain mode without calling the chain method. Notice the empty array references.
var data1 = P.strtoupper("u,p,p,e,r,c,a,s,e").strstr([], "C,A,S,E").explode(",", [], 2).end();
console.log( data1 ); 	// ["C", "A,S,E"] 

// Call strtoupper followed by strstr followed by explode followed by implode
var data2 = P.strtoupper("u,p,p,e,r,c,a,s,e").strstr([], "C,A,S,E").explode(",", [], 6).implode(",",[]).end();
console.log( data2 ); 	// "C,A,S,E"

// Using chain mode by calling the chain method. Notice no data method is called at the end of the sequence.
var data3 = P.chain(3).strtoupper("u,p,p,e,r,c,a,s,e").strstr([], "C,A,S,E").explode(",", [], 2);
console.log(data3);		// ["C", "A,S,E"] 

// Using chain mode by calling the chain method. Referencing returned results by method name.
var data4 = 
	P.chain(3)
		.strtoupper("u,p,p,e,r,c,a,s,e")
		.strstr("strtoupper", "C,A,S,E")
		.explode(",", "strstr", 2);
console.log(data4);
```

### Block Mode
Perhaps one of the most powerful modes provided is block mode. In block mode you can pass a JSON object
containing PHP pseudo-code to be executed by PHP. Unlike other modes, code and function requests are not
executed and returned one at a time. Instead the entire "block" of JSON pseudo-code is executed on the
server and then returned.

* Each sub-object block must be referenced by a literal such as `$str`
* You assign any type of JavaScript data to a given object literal
* When making function requests an object literal must reference an object which first contains an object literal with the same name as the function you want to call.
* The object literal with the name of the function you would like to call must reference an array containing any parameters to be passed to that function.
* You can pass previously defined object literals as parameters to other functions by placing an identical string with the same name as the object literal you are targeting in the parameter location where you would like to pass it.

```javascript 
// Perhaps the easiest manner to use block mode is as follows   
var codeBlock = P.block({
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
}).end();
```

### Multi Mode
Multi mode allows you to call consecutive PHP functions as an object by passing the function name as
the property. This mode is different that chaining mode in that functions are called completely independently 
from one another. Multi mode simply provides a shorthand way of calling multiple PHP functions. Results are 
returned in an array in the order in which they were called.

```javascript
P.callback(false);

// Returning the waw plugin data with .data()
var data1 = P.multi({
    abs : [-884],
    cosh : [23],
    sqrt : [43]
}).data();
console.log( data1 ); 	// [[884, 4872401723.1245, 6.557438524302]]

// Returning our array of results with .end()
var data2 = P.multi({
    is_array : [['this', 'is', 'an', 'array']],
	json_encode : [{'object_literal': 'some val'}],
	gettype : [1.1]
}).end();
console.log( data2 ); 	// [true, "{"object_literal":"some val"}", "double"] 

// Returning our array of results with .result()
var data3 = P.multi({
    abs : [-884],
    cosh : [23],
    sqrt : [43]
}).result(); 			// [884, 4872401723.1245, 6.557438524302]
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
