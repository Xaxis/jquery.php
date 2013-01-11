<?php

// Set our error reporting level
error_reporting(0); 

// An array containing user files that should be included
$includes = array(
	//'function_definitions.php',
);

/* The blacklist array is used when the SEC_MODE configuration variable is set to 'blacklist'. When configured
 * to use the blacklist all functions listed in the array will be disabled.
 */
$blacklist = array(
	'`',
	'create_function',
	'escapeshellcmd',
	'exec',
	'include',
	'include_once',
	'passthru',
	'pcntl_exec',
	'phpinfo',
	'popen',
	'require',
	'require_once',
	'shell_exec',
	'system'
);

/* The whitelist array is used when the SEC_MODE configuration variable is set to 'whitelist'. When configured
 * to use the whitelist only functions listed in the array will be enabled.
 */
$whitelist = array(
	// 'strlen',			// (e.g. Allowing the strlen function)
	// 'highlight_string'	// (e.g. Etc...)
);

/* The jquery.php plugin allows for the execution of code provided by the client. This functionality should
 * be disabled by default. The 'exec' mode uses the eval() construct which can be very dangerous.
 */ 
$config = array(
	'EXEC' 			=> true,
	'SEC_MODE'		=> 'blacklist',
	'LISTS'			=> array(
		'blacklist' => $blacklist,
		'whitelist' => $whitelist
	)
);

// Include all user files
if ( ! empty( $includes ) ) {
	foreach ( $includes as $file ) {
		include( $file );
	}
}

/* The first data we look for from the client is which method request is being made. The method request is one
 * of our modes of operations and tells us which "method" to use in our switch statement.
 */
$method_request = $_POST['method'] ? $_POST['method'] : false;
if ( $method_request ) {

	switch ( $method_request ) {
		
		// The call "method" handles our requests to use PHP functions.
		case 'call' :
			
			// Retrieve the function requested and any arguments to be passed to it
			$func_request = $_POST['func'] ? $_POST['func'] : false;
			$func_args = $_POST['args'] ? $_POST['args'] : false;
			
			// Based on the security mode we use either our blacklist or whitelist.
			switch ( $config['SEC_MODE'] ) {
				case 'blacklist' :
					if ( function_exists($func_request) 
						 && !in_array($func_request, $blacklist) ) {
						$function = $func_request;
					} else {
						$function = false;
					}
					break;
					
				case 'whitelist' :
					if ( function_exists($func_request) 
						 && in_array($func_request, $whitelist) ) {
						$function = $func_request;
					} else {
						$function = false;
					}
					break;
			}
			
			// Convert our parameters string and convert it into an array
			$args_arr = json_decode($func_args, false);
			$args_clean_arr = array();
			
			// To play it safe we parse our arguments arrays into JSON. This allows users to pass
			// JavaScript arrays or objects that we can use in PHP.
			foreach ( $args_arr as $arg ) {
				
				if ( json_decode( $arg ) !== NULL ) {
					array_push( $args_clean_arr, json_decode( $arg ) );
				} else {
					array_push( $args_clean_arr, $arg );
				}
			}
			 
			// Call the requested function if permitted
			if ( $function !== false ) {
				$call = $function;
				echo parse_type( call_user_func_array($call, $args_clean_arr) );
			}
			break;
		
		// The block "method" handles requests to execute JSON blocks of PHP code
		case 'block' :
		
			// Retrieve our JSON string and convert it to an array
			$php_obj = $_POST['pobj'] ? json_decode( $_POST['pobj'] ) : false;
				 
			// Pass our JSON decoded PHP objects array to our execution handler
			print parse_type( parse_php_object( $php_obj, $config ) );				 
			break;
			
		// The exec "method" handles requests to execute PHP code strings
		case 'exec' :
			if ( $config['EXEC'] === true ) {
				 
				 // We receive code to be executed by the user
				 $code_string = $_POST['code'] ? $_POST['code'] : false;
				 
				 // Prefix our code with return to prevent NULL from being returned.
				 echo parse_type( eval( $code_string ) );
			} 
			break;
	}

}

/**
 * Converts PHP objects to arrays by typecasting.
 * @param {object} Object A self referencing PHP object.
 */
function object_to_array( &$object ) {
	if ( is_object( $object ) ) {
		(Array)$object;
	}
}
	
/**
 * Iterates over an array containing PHP and handles calls to enabled functions and executes them.
 * @param {phpObj} array A JSON decoded array of representational PHP.
 * @return {*} Will return the results of the last function call passed in through phpObj.
 */
function parse_php_object( $arr, $config ) {
	
	// We define a pointer array that contains reference names to parameter placeholders
	// that will be replaced by real data.
	$pointers = array();
	
	foreach ( $arr as $k => $v ) {
		
		// Create variable definition with our first level array keys
		${$k} = $v;
		
		// Populate our pointers index
		$pointers[$k] = $k;
			
		// When a value is an object we attempt to call functions defined within
		if ( is_object( ${$k} ) ) {
		
			// Convert our function object to an array
			$funcArr = (Array)${$k};
			
			// Use the first key of the function array as our function name to call
			$func_name = array_keys($funcArr);
			$func_name = $func_name[0];
			
			// Get the array of arguments to parse to our arguments array
			$func_args = $funcArr[$func_name];
			
			// Create an array to store the arguments to pass to our function call
			$args_arr = array();
			
			// Now we iterate over our function arguments looking for reference strings
			foreach ( $func_args as $arg ) {
				
				// We compare against the keys in our pointers index which was created above
				if ( array_key_exists( $arg, $pointers ) ) {
					
					// This is now a reference to ${$k}, the originally defined definition, the returned
					// result of the last sucessful function call
					$p = ${$arg};
					
					// We push our arguments onto the args_array which will be passed to our function call
					array_push( $args_arr, $p );
					
				} else {
				
					// We push our arguments onto the args_array which will be passed to our function call
					array_push( $args_arr, $arg );
				}
			}
			
			// Create our final cleaned array
			$args_clean_arr = array();
			
			// Now we iterate over all the arguments in the new array and convert any JSON to arrays
			foreach ( $args_arr as $arg ) {
				
				if ( json_decode( $arg ) !== NULL ) {
					array_push( $args_clean_arr, json_decode( $arg ) );
				} else {
					array_push( $args_clean_arr, $arg );
				}
			}
			
			
			// Based on the security mode selected, use either our blacklist or whitelist.
			switch ( $config['SEC_MODE'] ) {
				case 'blacklist' :
					if ( function_exists( $func_name ) 
						 && !in_array( $func_name, $config['LISTS']['blacklist'] ) ) {
						$function_allowed = true;
					} else {
						$function_allowed = false;
					}
					break;
					
				case 'whitelist' :
					if ( function_exists( $func_name ) 
						 && in_array( $func_name, $config['LISTS']['whitelist'] ) ) {
						$function_allowed = true;
					} else {
						$function_allowed = false;
					}
					break;
			}
			 
			// Call the requested function if permitted
			if ( $function_allowed === true ) {
				
				// Reassign our variable the returned value of a function call so that further function calls can
				// search for the existence of pointers and then use the updated variable definitions. This logic
				// takes advantage of the procedural nature of PHP and the order of the sub-blocks in the php object. 
				${$k} = call_user_func_array( $func_name, $args_clean_arr );
			} else {
				return ("Function you requested $func_name has been disabled by backend configuration.");
			}
		}
		
		// When we're not an object we're something else like an array, string, int, etc. If we're an array we need
		// to recursively iterate over ourselves to convert any objects into arrays.
		else {	
			if ( is_array( ${$k} ) ) {
				array_walk_recursive( ${$k}, 'object_to_array' );
			}
		}
		
	}
	
	// Return the returned result from our final function call
	return ${$k};
}

/**
 * Detects the type of a returned result and encodes a type identifier along with the data into a JSON object.
 * @param {*} data Result data from a PHP function call.
 * @return {Object} JSON encoded result data with type field.
 */
function parse_type( $data ) {
	
	$results = array(
		'type' => '',
		'data' => NULL
	);
	
	switch ( true ) {
			
		case is_int( $data ) :
			$type = 'int';
			break;
			
		case is_float( $data ) :
			$type = 'float';
			break;
			
		case is_string( $data ) :
			$type = 'string';
			break;
		
		case is_object( $data ) :
			$type = 'object';
			break;
			
		case is_array( $data ) :
			(Array)$data;
			$type = 'array';
			break;
			
		case is_object( $data ) :
			(Array)$data;
			$type = 'array';
			break;

		case is_bool( $data ) :
			$type = 'bool';
			break;
			
		case is_null( $data ) :
			$type = 'null';
			break;
			
		default :
			$type = 'default';
	}
	
	$results['type'] = $type;
	$results['data'] = $data;
	return json_encode( $results );
}
?>
