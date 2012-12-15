<?php
/*
 * For security reasons it is advisable to dissalow calls
 * to certain functions, ESPECIALLY when client side 
 * requests determine which function are called. Thus, we
 * impliment a disabled function array that is referenced
 * everytime a user makes a function request.
 */
$disabled_functions = array(
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
 * We receive the function requested and arguments that
 * are to be passed to it.
 */
$func_request = $_POST['func'];
$func_args = $_POST['args'];

/*
 * Next we test for the functions existence. NOTE! Remember
 * to impliment a function policy list to specifically 
 * dissallow dangerous PHP functions.
 */
if ( function_exists($func_request) && !in_array($func_request, $disabled_functions) ) {
	$function = $func_request;
} else {
	$function = false;
}

/*
 * Next we take our $func_args which should contain a JSON
 * encoded string and convert it into a PHP associative array.
 */
$args_arr = json_decode($func_args, false);
 
/*
 * If the user requested function exists and is allowed
 * we proceed to call that function, passing any arguments
 * given with the requested function.
 */
if ( $function !== false ) {
	$call = $function;
	echo call_user_func_array($call, $args_arr);
}
?>