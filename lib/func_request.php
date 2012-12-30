<?php
error_reporting(0); 

/*
 * While the jqueryphp plugin allows for the execution of 
 * arbitrary code via the 'exec' method, this functionality
 * is disabled by default. The plugin request 'exec' uses
 * the eval() construct which is very dangerous. If it is 
 * used pay special attention not to pass any user provided
 * data without proper validation in place.
 */
$config = array(
	'EXEC' 			=> true,
	'SEC_MODE'		=> 'blacklist'
);

/*
 * The blacklist array is used when the SEC_MODE configuration
 * variable is set to blacklist. In such a case all PHP functions 
 * are allowed except those found in the array.
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

/*
 * The whitelist array is used when the EXCLUSIVE configuration
 * variable is set to whitelist. In such a case all PHP functions are
 * disallowed except for those found in the array.
 */
$whitelist = array(
	// 'strlen',			// (e.g. Allowing the strlen function)
	// 'highlight_string'	// (e.g. Etc...)
);

/*
 * The first data passed from the client is which method request
 * is being made. For instance are they making a 'call' to a PHP
 * function or are they attempting to run PHP code written in 
 * JavaScript via 'exec'.
 */
$method_request = $_POST['method'] ? $_POST['method'] : false;
if ( $method_request ) {

	switch ( $method_request ) {
		
		/*
		 * This method handles all calls to pre-existing PHP functions
		 * regardless of whether they are native or user defined.
		 */
		case 'call' :
			
			/* We receive the function requested and arguments that
			 * are to be passed to it.
			 */
			$func_request = $_POST['func'] ? $_POST['func'] : false;
			$func_args = $_POST['args'] ? $_POST['args'] : false;
			
			/*
			 * Based on the security mode configuration variable we attempt to
			 * build our function call.
			 */
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
			
			/* Next we take our $func_args which should contain a JSON
			 * encoded string and convert it into a PHP associative array.
			 */
			$args_arr = json_decode($func_args, false);
			 
			/*
			 * If the user requested function exists and is allowed we proceed to call that function, 
			 * passing any arguments given with the requested function.
			 */
			if ( $function !== false ) {
				$call = $function;
				$result = call_user_func_array($call, $args_arr);
				
				// Next we need to determine the return type so we can send our data back to
				// JavaScript in the correct format.
				switch ( true ) {
					case is_array( $result ) :
						echo json_encode( $result );
						break;
						
					case is_null( $result ) :
						echo 'null';
						break;
						
					default :
						echo $result;
				}
	
			}
			break;
		
		/*
		 * This method handles the execution of user passed PHP strings
		 * to the server.
		 */	
		case 'exec' :
			if ( $config['EXEC'] === true ) {
				/*
				 * We receive the code to be executed from the user.
				 */
				 $code_string = $_POST['code'] ? $_POST['code'] : false;
				 
				 echo eval( $code_string );
			} else {
				echo "Usage of the 'exec' method has been disabled.";
			}
			break;
	}

}
?>
