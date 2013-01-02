/**
jqueryphp jQuery Plugin v1.5
https://github.com/Xaxis/jqueryphp
Author: Wil Neeley (https://github.com/Xaxis)

See the README file for documentation and usage information.
**/
(function( $ ) {
	
	var 
		
		// A reference to core PHP functions.
		coreFunctions = {
			array : 'array array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_fill_keys array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive arsort asort compact count current each end extract in_array key key_exists krsort ksort list natcasesort natsort next pos prev range reset rsort shuffle sizeof sort uasort uksort usort',
			calendar : 'cal_days_in_month cal_from_jd cal_info cal_to_jd easter_date easter_days frenchtojd gregoriantojd jddayofweek jdmonthname jdtofrench jdtogregorian jdtojewish jdtojulian jdtounix jewishtojd juliantojd unixtojd',
			character : 'ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_graph ctype_lower ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit',
			class : 'call_user_method call_user_method_array class_exists get_class get_class_methods get_class_vars get_declared_classes get_declared_interfaces get_object_vars get_parent_class interface_exists is_a is_subclass_of method_exists property_exists',
			date : 'checkdate date date_create date_date_set date_default_timezone_get date_default_timezone_set date_format date_isodate_set date_modify date_offset_get date_parse date_sun_info date_sunrise date_sunset date_time_set date_timezone_get date_timezone_set getdate gettimeofday gmdate gmmktime gmstrftime idate localtime microtime mktime strftime strptime strtotime time timezone_abbreviations_list timezone_identifiers_list timezone_name_from_abbr timezone_name_get timezone_offset_get timezone_open timezone_transitions_get',
			directory : 'chdir chroot no closedir dir getcwd opendir readdir rewinddir scandir',
			error : 'debug_backtrace debug_print_backtrace error_get_last error_log error_reporting restore_error_handler restore_exception_handler set_error_handler set_exception_handler trigger_error user_error',
			file : 'basename chgrp chmod chown clearstatcache copy delete dirname disk_free_space disk_total_space diskfreespace fclose feof fflush fgetc fgetcsv fgets fgetss file file_exists file_get_contents file_put_contents fileatime filectime filegroup fileide filemtime fileowner fileperms filesize filetype flock fnmatch fopen fpassthru fputcsv fputs fread fscanf fseek fstat ftell ftruncate fwrite glob is_dir is_executable is_file is_link is_readable is_uploaded_file is_writable is_writeable lchgrp lchown link linkinfo lstat mkdir move_uploaded_file parse_ini_file pathinfo pclose popen readfile readlink realpath rename rewind rmdir set_file_buffer stat symlink tempnam tmpfile touch umask unlink',
			function : 'call_user_func call_user_func_array create_function func_get_arg func_get_args func_num_args function_exists get_defined_functions register_shutdown_function register_tick_function unregister_tick_function',
			imap : 'imap_8bit imap_alerts imap_append imap_base64 imap_binary imap_body imap_bodystruct imap_check imap_clearflag_full imap_close imap_createmailbox imap_delete imap_deletemailbox imap_errors imap_expunge imap_fetch_overview imap_fetchbody imap_fetchheader imap_fetchstructure imap_get_quota imap_get_quotaroot imap_getacl imap_getmailboxes imap_getsubscribed imap_header imap_headerinfo imap_headers imap_last_error imap_list imap_listmailbox imap_listscan imap_listsubscribed imap_lsub imap_mail imap_mail_compose imap_mail_copy imap_mail_move imap_mailboxmsginfo imap_mime_header_decode imap_msg imap_num_msg imap_num_recent imap_open imap_ping imap_qprint imap_renamemailbox imap_reopen imap_rfc822_parse_adrlist imap_rfc822_parse_headers imap_rfc822_write_address imap_savebody imap_scanmailbox imap_search imap_set_quota imap_setacl imap_setflag_full imap_sort imap_status imap_subscribe imap_thread imap_timeout imap_uid imap_undelete imap_unsubscribe imap_utf7_decode imap_utf7_encode imap_utf8',
			image : 'gd_info getimagesize image2wbmp image_type_to_extension image_type_to_mime_type imagealphablending imageantialias imagearc imagechar imagecharup imagecolorallocate imagecolorallocatealpha imagecolorat imagecolorclosest imagecolorclosestalpha imagecolorclosesthwb imagecolordeallocate imagecolorexact imagecolorexactalpha imagecolormatch imagecolorresolve imagecolorresolvealpha imagecolorset imagecolorsforindex imagecolorstotal imagecolortransparent imageconvolution imagecopy imagecopymerge imagecopymergegray imagecopyresampled imagecopyresized imagecreate imagecreatefromgd imagecreatefromgd2 imagecreatefromgd2part imagecreatefromgif imagecreatefromjpeg imagecreatefrompng imagecreatefromstring imagecreatefromwbmp imagecreatefromxbm imagecreatefromxpm imagecreatetruecolor imagedashedline imagedestroy imageellipse imagefill imagefilledarc imagefilledellipse imagefilledpolygon imagefilledrectangle imagefilltoborder imagefilter imagefontheight imagefontwidth imageftbbox imagefttext imagegammacorrect imagegd imagegd2 imagegif imageinterlace imageistruecolor imagejpeg imagelayereffect imageline imageloadfont imagepalettecopy imagepng imagepolygon imagepsbbox imagepsencodefont imagepsextendfont imagepsfreefont imagepsloadfont imagepsslantfont imagepstext imagerectangle imagerotate imagesavealpha imagesetbrush imagesetpixel imagesetstyle imagesetthickness imagesettile imagestring imagestringup imagesx imagesy imagetruecolortopalette imagettfbbox imagettftext imagetypes imagewbmp imagexbm iptcembed iptcparse jpeg2wbmp png2wbmp',
			ldap : 'ldap_8859_to_t61 ldap_add ldap_bind ldap_close ldap_compare ldap_connect ldap_count_entries ldap_delete ldap_dn2ufn ldap_err2str ldap_err ldap_error ldap_explode_dn ldap_first_attribute ldap_first_entry ldap_first_reference ldap_free_result ldap_get_attributes ldap_get_dn ldap_get_entries ldap_get_option ldap_get_values ldap_get_values_len ldap_list ldap_mod_add ldap_mod_del ldap_mod_replace ldap_modify ldap_next_attribute ldap_next_entry ldap_next_reference ldap_parse_reference ldap_parse_result ldap_read ldap_rename ldap_sasl_bind ldap_search ldap_set_option ldap_set_rebind_proc ldap_sort ldap_start_tls ldap_t61_to_8859 ldap_unbind',
			math : 'abs acos acosh asin asinh atan atan2 atanh base_convert bindec ceil cos cosh decbin dechex decoct deg2rad exp expm1 floor fmod getrandmax hexdec hypot is_finite is_infinite is_nan lcg_value log log10 log1p max min mt_getrandmax mt_rand mt_srand octdec pi pow rad2deg rand round sin sinh sqrt srand tan tanh',
			misc : 'connection_aborted connection_status connection_timeout constant define defined die eval exit get_browser halt_compiler highlight_file highlight_string igre_user_abort pack php_check_syntax php_strip_whitespace show_source sleep sys_getloadavg time_nasleep time_sleep_until uniqid unpack usleep',
			multibyte : 'mb_check_encoding mb_convert_case mb_convert_encoding mb_convert_kana mb_convert_variables mb_decode_mimeheader mb_decode_numericentity mb_detect_encoding mb_detect_order mb_encode_mimeheader mb_encode_numericentity mb_ereg mb_ereg_match mb_ereg_replace mb_ereg_search mb_ereg_search_getpos mb_ereg_search_getregs mb_ereg_search_init mb_ereg_search_pos mb_ereg_search_regs mb_ereg_search_setpos mb_eregi mb_eregi_replace mb_get_info mb_http_input mb_http_output mb_internal_encoding mb_language mb_list_encodings mb_output_handler mb_parse_str mb_preferred_mime_name mb_regex_encoding mb_regex_set_options mb_send_mail mb_split mb_strcut mb_strimwidth mb_stripos mb_stristr mb_strlen mb_strpos mb_strrchr mb_strrichr mb_strripos mb_strrpos mb_strstr mb_strtolower mb_strtoupper mb_strwidth mb_substitute_character mb_substr mb_substr_count',
			mysql : 'mysql_affected_rows mysql_change_user mysql_client_encoding mysql_close mysql_connect mysql_create_db mysql_data_seek mysql_db_name mysql_db_query mysql_drop_db mysql_err mysql_error mysql_escape_string mysql_fetch_array mysql_fetch_assoc mysql_fetch_field mysql_fetch_lengths mysql_fetch_object mysql_fetch_row mysql_field_flags mysql_field_len mysql_field_name mysql_field_seek mysql_field_table mysql_field_type mysql_free_result mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql_insert_id mysql_list_dbs mysql_list_fields mysql_list_processes mysql_list_tables mysql_num_fields mysql_num_rows mysql_pconnect mysql_ping mysql_query mysql_real_escape_string mysql_result mysql_select_db mysql_stat mysql_tablename mysql_thread_id mysql_unbuffered_query',
			network : 'checkdnsrr closelog debugger_off debugger_on define_syslog_variables dns_check_record dns_get_mx dns_get_record fsockopen gethostbyaddr gethostbyname gethostbynamel getmxrr getprotobyname getprotobynumber getservbyname getservbyport header headers_list headers_sent inet_ntop inet_pton ip2long long2ip openlog pfsockopen setcookie setrawcookie socket_get_status socket_set_blocking socket_set_timeout syslog',
			output : 'flush ob_clean ob_end_clean ob_end_flush ob_flush ob_get_clean ob_get_contents ob_get_flush ob_get_length ob_get_level ob_get_status ob_gzhandler ob_implicit_flush ob_list_handlers ob_start output_add_rewrite_var output_reset_rewrite_vars',
			options : 'assert assert_options dl extension_loaded get_cfg_var get_current_user get_defined_constants get_extension_funcs get_include_path get_included_files get_loaded_extensions get_magic_quotes_gpc get_magic_quotes_runtime get_required_files getenv getlastmod getmygid getmyide getmypid getmyuid getopt getrusage ini_alter ini_get ini_get_all ini_restore ini_set main memory_get_peak_usage memory_get_usage php_ini_scanned_files php_logo_guid php_sapi_name php_uname phpcredits phpinfo phpversion putenv restore_include_path set_include_path set_magic_quotes_runtime set_time_limit sys_get_temp_dir version_compare zend_logo_guid zend_version',
			posix : 'posix_access posix_ctermid posix_get_last_error posix_getcwd posix_getegid posix_geteuid posix_getgid posix_getgrgid posix_getgrnam posix_getgroups posix_getlogin posix_getpgid posix_getpgrp posix_getpid posix_getppid posix_getpwnam posix_getpwuid posix_getrlimit posix_getsid posix_getuid posix_isatty posix_kill posix_mkfifo posix_mkd posix_setegid posix_seteuid posix_setgid posix_setpgid posix_setsid posix_setuid posix_strerror posix_times posix_ttyname posix_uname',
			program : 'escapeshellarg escapeshellcmd exec passthru proc_close proc_get_status proc_nice proc_open proc_terminate shell_exec system',
			regexp : 'ereg ereg_replace eregi eregi_replace split spliti sql_regcase preg_grep preg_last_error preg_match preg_match_all preg_quote preg_replace preg_replace_callback preg_split',
			session : 'session_cache_expire session_cache_limiter session_commit session_decode session_destroy session_encode session_get_cookie_params session_id session_is_registered session_module_name session_name session_regenerate_id session_register session_save_path session_set_cookie_params session_set_save_handler session_start session_unregister session_unset session_write_close',
			standard : 'class_implements class_parents iterator_count iterator_to_array spl_autoload spl_autoload_call spl_autoload_extensions spl_autoload_functions spl_autoload_register spl_autoload_unregister spl_classes spl_object_hash',
			stream : 'stream_bucket_append stream_bucket_make_writeable stream_bucket_new stream_bucket_prepend stream_context_create stream_context_get_default stream_context_get_options stream_context_set_option stream_context_set_params stream_copy_to_stream stream_filter_append stream_filter_prepend stream_filter_register stream_filter_remove stream_get_contents stream_get_filters stream_get_line stream_get_meta_data stream_get_transports stream_get_wrappers stream_register_wrapper stream_select stream_set_blocking stream_set_timeout stream_set_write_buffer stream_socket_accept stream_socket_client stream_socket_enable_crypto stream_socket_get_name stream_socket_pair stream_socket_recvfrom stream_socket_sendto stream_socket_server stream_wrapper_register stream_wrapper_restore stream_wrapper_unregister',
			string : 'addcslashes addslashes bin2hex chop chr chunk_split convert_cyr_string convert_uudecode convert_uuencode count_chars crc32 crypt echo explode fprintf get_html_translation_table hebrev hebrevc html_entity_decode htmlentities htmlspecialchars htmlspecialchars_decode implode join levenshtein localeconv ltrim md5 md5_file metaphone money_format nl2br nl_langinfo number_format ord parse_str print printf quoted_printable_decode quotemeta rtrim setlocale sha1 sha1_file similar_text soundex sprintf sscanf str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split str_word_count strcasecmp strchr strcmp strcoll strcspn strip_tags stripcslashes stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk strpos strrchr strrev strripos strrpos strspn strstr strtok strtolower strtoupper strtr substr substr_compare substr_count substr_replace trim ucfirst ucwords vfprintf vprintf vsprintf wordwrap',
			url : 'base64_decode base64_encode get_headers get_meta_tags http_build_query parse_url rawurldecode rawurlencode urldecode urlencode',
			variable : 'debug_zval_dump doubleval empty floatval get_defined_vars get_resource_type gettype import_request_variables intval is_array is_bool is_callable is_double is_float is_int is_integer is_long is_null is_numeric is_object is_real is_resource is_scalar is_string isset print_r serialize settype strval unserialize unset var_dump var_export',
			xml : 'utf8_decode utf8_encode xml_error_string xml_get_current_byte_index xml_get_current_column_number xml_get_current_line_number xml_get_error_code xml_parse xml_parse_into_struct xml_parser_create xml_parser_create_ns xml_parser_free xml_parser_get_option xml_parser_set_option xml_set_character_data_handler xml_set_default_handler xml_set_element_handler xml_set_end_namespace_decl_handler xml_set_external_entity_ref_handler xml_set_notation_decl_handler xml_set_object xml_set_processing_instruction_handler xml_set_start_namespace_decl_handler xml_set_unparsed_entity_decl_handler',
			zlib : 'gzclose gzcompress gzdeflate gzencode gzeof gzfile gzgetc gzgets gzgetss gzinflate gzopen gzpassthru gzputs gzread gzrewind gzseek gztell gzuncompress gzwrite readgzfile zlib_get_coding_type',
			hash : 'hash hash_algos hash_file hash_final hash_hmac hash_hmac_file hash_init hash_update hash_update_file hash_update_stream',
			iconv : 'iconv iconv_get_encoding iconv_mime_decode iconv_mime_decode_headers iconv_mime_encode iconv_set_encoding iconv_strlen iconv_strpos iconv_strrpos iconv_substr ob_iconv_handler'
		},
		
		// Here is where we store any user defined functions.
		userFunctions = {
		},
		
		cache = {
			
			// A global reference shortcut to our plugin
			plugin: $.fn.php,
			
			// Keeps the state of our operation mode
			mode: 'default',
			
			// Stores values to be computed in a chain call
			data: false,	
			
			// Stores the callback used in a chain call	
			callback: null,	
			
			// Stores our selected object(s)	
			selected: null,
			
			// Helps us track how many calls down a chain we are
			chainIndex: 0,
			
			// Stores our block mode index
			blockIndex: 0,
			
			// Stores our block mode operations
			block: {}
		},
		
		config = {
			
			// Stores our registered backend path
			path: 'function_request.php',
			
			// Stores whether async mode is enabled
			async: false,
			
			// User functions to pass to our global on initialization
			userFunctions: {}
		},
		
		methods = {

		/**
		 * Initialize config values and method chaining.
		 * @param {Object} options An array of name/value pairs for configuration.
		 * @return {Object} jQuery object.
		 */
		_init : function( options ) {
			
			// !! NOTE - What's the 'runtime' keyword?
			
			// At runtime we first extend our config object with required run time values.
			$.extend( config, options );
			
			// We copy any potentially user defined functions into our userFunctions global.
			userFunctions = config.userFunctions;
			
			// We make all of our core and user functions methods of the jquery.php object.
			methods._chain();
			
			return this;
		},
		
		/**
		 * Impliment object method creation of core and user defined functions.
		 * @return {Object} jQuery object.
		 */
		_chain: function() {
			
			// Extend our coreFunctions object with any user defined functions if provided
			if ( ! jQuery.isEmptyObject( userFunctions ) ) {
				$.extend( coreFunctions, userFunctions );
			}
			
			var n = 0,
				methodObj = coreFunctions,
				curMethod = null;
			
			/* For every PHP function class in our core PHP functions object we split the string of 
			 * function names into an array and attach them as an object method of our plugin.
			 */
			for ( methodClass in methodObj ) { 
				n = coreFunctions[ methodClass ].split(" ").length;
				var curMethodClass = methodObj[methodClass].split(" ");
				
				while ( n-- ) {
					curMethod = curMethodClass[n];
			
					/* The value of the newly created method on the .php object is set to a self-invoking 
					 * anonymous function which returns an anonymous function which calls our 'call' method
					 * and finally returns the plugin object itself with any bound data returned from a PHP
					 * function call.
					 */
					$.fn.php[curMethod] = (function( curMethod ) {
						return function() {
							var args = arguments, 
								aLen = args.length,
								fName = curMethod;
							
							/* No additional parameters should be passed to a method in a chain. If
							 * a parameter is detected in a method call we assume the user is calling
							 * a given function individually.
							 */
							if ( aLen > 0 ) {
								
							 	/* !! BLOCKING MODE !!
								 * If our cache index is greater than 0 we know that we are about to execute
							 	 * the following function requests in blocking mode.
							 	 */
								if ( cache.blockIndex > 0 ) {
									
								
								}
								
								// We iterate over all arguments passed and remove any callbacks.
								var passArgs = [];
								for ( var arg in args ) {
									if ( ! jQuery.isFunction( args[arg] ) ) {
										passArgs.push( args[arg] );
									}
								}
								
								// We add our function request to the begening of the array
								passArgs.unshift( curMethod );
								
								methods.call.apply( cache.selected, Array.prototype.slice.call( passArgs ));
						
								// Bind our return result to the data property of the plugin.
								this.data = cache.data[0];
								return this.data;
										
							/* Below we handle method chaining where no parameters are to be passed to
							 * individual methods in the chain. The only paramters passed must be defined in
							 * the .php method. Chained methods must abide by a logic that can work on the
							 * returned results of the first function in the chain called.
							 */
							} else {
								
								// This allows us to know how many methods down the chain we are.
								cache.chainIndex += 1;
								
								// We place the method name at the begening of our data array for our call method.
								cache.data.unshift(fName);
								
								methods['call'].apply( cache.selected, Array.prototype.slice.call( cache.data ));
								
								// Bind our return result to the data property of the plugin.
								this.data = cache.data[0];
								
								// !! Note - I need to create a way in which we return the data value on the
								// final iteration of the method chain.
								return this;
							}
							
						}
					})( curMethod );
				}
			}
			
			return this;
		},

		/**
		 * Handles backend PHP function requests.
		 * @func {String} Name of function being requested.
		 * @return {Object} jQuery object.
		 */
		call : function( func ) {
			
			/* Instead of requiring a callback on each execution of this
			 * method we use a callback was set as a global.
			 */
			var _callback = cache.callback;
			 
			/* We subtract 1 from the arglen variable so when building our args string to
			 * pass to the server we are not sending the func string to be interpreted as 
			 * a argument to be passed to a PHP function. 
			 */	
			var self = cache.selected,
				arglen = arguments.length - 1,
				args = arguments;
			
			/* Here we build a JSON object containing the arguments (if
			 * any) to be passed to the PHP function. We offset our index
			 * by 2 so we don't pass the function string or the callback
			 * object to the server.
			 */
			var jsonObj = [];
			for (var i=0; i<arglen; i++) {
				var argId = i + 1;
				jsonObj.push( args[argId] );
			}
			
			/* We stringify our arguments list to pass it through to
			 * the server for processing.
			 */
			var args = JSON.stringify(jsonObj);
			
			/* Based on the config value we configure async or sync XHR request. 
			 * !! Note - The method chaining pattern will not work in asyncronous mode.
			 */
			if ( config.async === false ) {
				jQuery.ajaxSetup({async: false});
			} else {
				jQuery.ajaxSetup({async: true});
			}
			
			/* Finally the request object is built and sent to the server
			 * for handling.
			 */
			var request = $.ajax({
				url: config.path,
				type: "POST",
				data: {'method': 'call', 'func': func, 'args': args},
				dataType: "text",
				success: function(data) {
					
					// The cache.data is only used on chained method requests.
					cache.data = [data];
					
					// Call our global callback.
					_callback(data, self);
				}
			});
			
			return this;
		},
		
		/**
		 * Handles running PHP code strings.
		 * @code {String} 		PHP code to be executed.
		 * @callback {Function} A function for handling returned results.
		 * @return {Object} jQuery object.
		 */
		exec : function( code, callback ) {
			var self = cache.selected;
			
			/* Based on the config value we configure async or sync XHR
			 * request. !! Note - The method chaining pattern will not work
			 * in asyncronous mode.
			 */
			if ( config.async === false ) {
				jQuery.ajaxSetup({async: false});
			} else {
				jQuery.ajaxSetup({async: true});
			}
			
			/*
			 * Finally the request object is built and sent to the server
			 * for handling.
			 */
			var request = $.ajax({
				url: config.path,
				type: "POST",
				data: {'method': 'exec', 'code': code},
				dataType: "text",
				success: function( data, textStatus, xhr ) {
					callback(data, self);
				}
			});
			
			return self;
		},
		
		/**
		 * Computes the average latency of running a block of code. The more rounds you run
		 * on a given test the higher its accuracy will be. By default 5 rounds are run.
		 * !! Note - Based on John Resig's research any rounds that run tests shorter than 15ms
		 * the system will round off to 0. This means there is very little accuracy in tests
		 * under this time span.
		 * @param {Function} callback A function containg code to be tested. 
		 * @param {Int} rounds The number of rounds to test the code.
		 * @return {String} The computed average time in milaseconds.
		 */
		bench : function( callback, rounds ) {
			
			// Establish a default value of rounds.
			rounds = ( rounds ) ? rounds : 5;
			
			// An array to store each rounds elapsed time.
			var roundTimes = [];
			for ( var i = 0; i < rounds; i++ ) {
				
				// Initialize our starting timestamp.
				var startTime = (new Date).getTime();
				
				// Execute our callback containing our code.
				try {					
					callback()();					
				} catch (e) {
					console.log(e);
				}
				
				// Initialize our closeing timestamp.
				var closeTime = (new Date).getTime();
				
				// Calculate the elapsed time.
				var elapsed = closeTime - startTime;
				
				// Save this rounds elapsed time in array.
				roundTimes.push( elapsed );
			}
			
			// Calculate the average of the rounds elapsed time.
			var roundsSum = 0;
			for ( var i = 0; i < roundTimes.length; i++ ) {
				roundsSum += parseInt( roundTimes[ i ] );
			}
			
			// Return our average time in milaseconds.
			var average = roundsSum / roundTimes.length;
			return average;
		},
		
		/**
		 * Handles block mode of delayed execution.
		 * @callback {String} A callback that returns code to block.
		 * @return {Object} jQuery object.
		 */
		block : function( callback ) {
			
			if ( jQuery.isFunction( callback ) ) {
				
				// !! - It seems we need some logic that can evaluate the code the user is trying
				// to send in a block. 
				// - Break that code into PHP function calls.
				// - Gather parameters that are being passed to those function calls.
				// - Store those function calls and parameters in a key/value object.
				// - Construct a special case XHR request to the backend containing our object.
				// - Construct a special case handler on the backend that executes all the requests.
				// - Possibly return the last executed function request back to JavaScript.
					
				// We need to basically count all the function request calls. Doing this will allow
				// us to keep an index of where we are in the block of execution before releasing
				// the plugin back to "normal" operation mode.
				var blockStr = callback().toString();
					
				var n = coreFunctions.array.split(" ").length,
					methodObj = coreFunctions,
					curMethod = null,
					blockIndex = 0;

				for ( methodClass in coreFunctions ) { 
					var n = coreFunctions[ methodClass ].split(" ").length;
					var curMethodClass = methodObj[methodClass].split(" ");
				
					while ( n-- ) {
						
						// Name of current method/function request we're searching for in our block string.
						curMethod = curMethodClass[n];
						
						// Now we create our regex in order to count all occurences of function request strings.
						var regex = new RegExp( "\\b" + "\\.[\\s*]" + curMethod + "\\b" + "\\("
												+ "|"
												+ "\\b" + "\\." + curMethod + "\\b" + "\\s*\\(", 
												"g" );
						
						// Now we see if we find any matches in our block string.
						var matched = ( blockStr.match( regex ) ) ? blockStr.match( regex ) : false;
						
						// If we have matches we updated our blockIndex count which will be used as a flag
						// which indicates a parameter should be passed as the first argument of our method
						// calls which tells us to buffer all function request so we can send them all at 
						// once.
						if ( matched ) {
							
							// Now we need to update our block index.
							cache.index += matched.length;
							
							// Now we need to split up our function requests and parameter lists into an
							// object.
							cache.block = { };
						}
					
					}
				
				}
					
			}
			
			console.log(cache.index);
		}

	};
	
	/**
	 * Interface to the jqueryphp plugin.
	 * @method {String} Name of method to be called.
	 * @return {Object} jQuery object with data property storing returned PHP result.
	 */
	$.fn.php = function( method ) {			
		var args = arguments,
			aLen = args.length,
			plugin = $.fn.php;
		
		// Break apart a passed callback function to identify its given name
		var fName = args[0].toString();	
		fName = fName.substr('function '.length);
		fName = fName.substr(0, fName.indexOf('('));
		
		// Reference the method (which determins our interface mode) that is being called (if any).
		var mode = fName || method;
		
		// If selected element(s) are passed we set our global to passed selected. This
		// should only happen when the 'select' method is being called.
		var newSelected = false;
		for ( var i = 0; i < aLen; i++ ) {
			if ( args[i] instanceof jQuery ) {
				cache.selected = args[i];
				newSelected = true;
			}
		}
		
		// If no selected elements passed and there is a global selected set, use it.
		if ( newSelected === false && cache.selected !== null ) {
			cache.selected = cache.selected;
		}
		
		// If the this context is an instance of the jQuery object the user is choosing to
		// use a new set of selected elements so we update the global selected set. 
		if ( this instanceof jQuery ) {
			cache.selected = this;
		}
		
		/* If a callback is passed we automatically update the global callback function. With that
		 * in mind there are a few modes of operation in which we would not want to update the
		 * global callback with a passed callback. Two of those modes are 'block' and 'bench' mode.
		 *
		 * !! We actually may need to override the global callback so as to return data only to variables
		 * and not to the previous callback. !!
		 */
		for ( var i = 0; i < aLen; i++ ) {
			if ( jQuery.isFunction( args[i] ) 
				 && mode !== 'bench' 
				 && mode !== 'block' ) {
				cache.callback = args[i];
			}
		}
		
		/* We use either the function name or a passed string to determine
		 * which method to call and how to call that method.
		 */
		switch ( mode ) {
			
			/* When the 'init' string is passed we extend our configuration object using 
			 * our initialization method.
			 */
			case 'init' :
				
				methods._init.apply( cache.selected, Array.prototype.slice.call( args, 1 ));
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
			
			/* This is the interface to the 'bench' method. The bench method differs from other
			 * methods in that it does not override the global callback, element(s), nor require
			 * any special context.
			 */
			case 'bench' :
				
				var cleanArgs = [];
				for ( var i = 0; i < aLen; i++ ) {
					if ( args[i] !== 'bench' ) {
						cleanArgs.push( args[i] );
					}
				}	

				return methods.bench.apply( plugin, Array.prototype.slice.call( cleanArgs ));
				
			/*
			 * The 'block' scenario indicates that a user wishes to send a block of PHP function
			 * requests at one time and return the computed result. This is not the same as 
			 * using 'exec' mode.
			 * In this mode we create a delayed execution and then send the whole of the code to
			 * the backend for processing.
			 */	
			case 'block' :
				
				var cleanArgs = [];
				for ( var i = 0; i < aLen; i++ ) {
					if ( args[i] !== 'block' ) {
						cleanArgs.push( args[i] );
					}
				}	
				
				return methods.block.apply( plugin, Array.prototype.slice.call( cleanArgs ));
								
			/* Here we provide a way to define a callback seperatly without making any PHP 
			 * function requests to the server.
			 */
			case 'callback' :
				
				// If a callback is provided we override our global callback.
				for ( var i = 0; i < aLen; i++ ) {
					if ( jQuery.isFunction( args[i] ) ) {
						cache.callback = args[i];
					}
				}	
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
				
			/* Here we provide a way to set any selected element(s) without making any PHP 
			 * function requests to the server.
			 */
			case 'select' :
			
				// If selected element(s) are passed we set our global selected.
				for ( var i = 0; i < aLen; i++ ) {
					if ( args[i] instanceof jQuery ) {
						cache.selected = args[i];
					}
				}	
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
				
			/* When the 'multi' string is passed OR when a callback function is passed
			 * that is named 'multi' we assume the user is providing a plain object
			 * containing function/parameter name values paris. 
			 */
			case 'multi' :
				
				// We reference our user provided PHP object,
				var phpObject = args[1];
					
				// We augment our passed paramters to conform to our 'call' method.
				for ( func in phpObject ) {	
					var passArgs = phpObject[ func ];
					passArgs.unshift( func );		
					methods['call'].apply( cache.selected, Array.prototype.slice.call( passArgs ) );
				} 
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
				
			/* When the 'call' string is passed OR when a callback function is named 'call' 
			 * we assume that the pattern the arguments are following is: 'call', 'function_name', 
			 * callback, [arguments]
			 */
			case 'call' :	

				methods.call.apply( cache.selected, Array.prototype.slice.call( args, 1 ));
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
			
			/* When the 'exec' string is passed OR when a callback function is named 'exec'
			 * we proceed to execute arbitrary code on the backend. This functionality is disabled
			 * by default of course. !!! We MAY deprecate this method.
			 */
			case 'exec' :
				
				methods.exec.apply( cache.selected, Array.prototype.slice.call( args, 1 ));
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;

			/* When the 'chain' string is passed OR when a callback function is passed
			 * that is named 'chain' we proceed to configure our environment for a series
			 * of chained function calls.
			*/			
			case 'chain' :
				
				// We restart our chain index
				cache.chainIndex = 0;
				
				// We restructure the arguments array, stripping any callbacks.
				var cleanArgs = [];
				for ( var arg in args ) {
					if ( ! jQuery.isFunction( args[arg] )
					     && args[arg] !== 'chain' ) {
						cleanArgs.push( args[arg] );
					}
					if ( method === 'chain') {
					}
				}
				
				// Register our global parameter argument data. Must be in the form of an array.
				cache.data = cleanArgs;

				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
			
			/* This defines the default mode of operation. Basically in this mode we are guessing
			 * at the manner in which a user is attempting to call a PHP function, hopefully using
			 * one of the interface patterns demonstrated in documenation.
			 */
			default :
				
				// We iterate over all arguments passed and remove any callbacks.
				var passArgs = [];
				for ( var arg in args ) {
					if ( ! jQuery.isFunction( args[arg] ) ) {
						passArgs.push( args[arg] );
					}
				}
				
				// If our string name is being called as a function name we place that name in passArgs.
				if ( fName ) {
					passArgs.unshift( fName );
				} 
								
				methods.call.apply( cache.selected, Array.prototype.slice.call( passArgs ));
				
				// Return the plugin object so we don't break the chain.
				return plugin;
				break;
		}
		
		return false;
	};

})( jQuery );
