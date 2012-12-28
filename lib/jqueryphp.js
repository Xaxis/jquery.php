/**
jqueryphp jQuery Plugin v1.1
https://github.com/Xaxis/jqueryphp
Author: Wil Neeley

See the README file for documentation and usage information.
**/
(function( $ ) {
	
	var 
		// A global reference shortcut to our plugin.
		plugin = $.fn.php,
		
		// A reference to core PHP functions.
		coreFunctions = {
			array : 'array array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_fill_keys array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive arsort asort compact count current each end extract in_array key key_exists krsort ksort list natcasesort natsort next pos prev range reset rsort shuffle sizeof sort uasort uksort usort',
			calendar : 'cal_days_in_month cal_from_jd cal_info cal_to_jd easter_date easter_days frenchtojd gregoriantojd jddayofweek jdmonthname jdtofrench jdtogregorian jdtojewish jdtojulian jdtounix jewishtojd juliantojd unixtojd',
			character : 'ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_graph ctype_lower ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit',
			class : 'call_user_method call_user_method_array class_exists get_class get_class_methods get_class_vars get_declared_classes get_declared_interfaces get_object_vars get_parent_class interface_exists is_a is_subclass_of method_exists property_exists',
			date : 'checkdate date date_create date_date_set date_default_timezone_get date_default_timezone_set date_format date_isodate_set date_modify date_offset_get date_parse date_sun_info date_sunrise date_sunset date_time_set date_timezone_get date_timezone_set getdate gettimeofday gmdate gmmktime gmstrftime idate localtime microtime mktime strftime strptime strtotime time timezone_abbreviations_list timezone_identifiers_list timezone_name_from_abbr timezone_name_get timezone_offset_get timezone_open timezone_transitions_get',
			directory : 'Directory.close Directory.read chdir chroot no closedir dir getcwd opendir readdir rewinddir scandir',
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
		
		cache = {
			// Stores values to be computed in a chain call
			data: false,	
			
			// Stores the callback used in a chain call	
			callback: null,	
			
			// Stores our selected object(s)	
			selected: null		
		},
		
		config = {
			// Stores our registered backend path
			path: 'function_request.php',
			chaining: true
		},
		
		methods = {

		/**
		 * Initialize config values and method chaining.
		 * @param {Object} options An array of name/value pairs for configuration.
		 * @return {Object} jQuery object.
		 */
		init : function( options ) {
			
			/* At runtime we first extend our 'config' object with required
			 * run time values.
			 */	
			var settings = $.extend( config, options );
			
			/* Then we wrap all of our PHP alias methods on our plugin object
			 * before returning the jQuery object.
			 */
			if ( config.chaining === true ) {
				methods.chain();
			}
			
			return this;
		},
		
		/**
		 * Impliment method chaining pattern.
		 * @return {Object} jQuery object.
		 */
		chain: function() {
			/* This is our method chaining logic. On script initialization
			 * we take all of our potential PHP function calls and make them
			 * chainable method calls on the .php plugin.
			 */
			var n = coreFunctions.array.split(" ").length,
				methodObj = coreFunctions,
				curMethod = null;
			
			/* For every PHP function class in our core PHP functions object we
			 * split the string of function names into an array.
			 */
			for ( methodClass in methodObj ) { 
				var n = coreFunctions[ methodClass ].split(" ").length;
				var curMethodClass = methodObj[methodClass].split(" ");
				
				/* For every PHP function name in a PHP function class we create
				 * a chained function on our .php object.
				 */
				while ( n-- ) {
					curMethod = curMethodClass[n];
			
					/* The value of the newly created method on the .php object is set to
					 * a self-invoking anonymous function which returns an anonymous function
					 * which calls our 'call' method.
					 */
					$.fn.php[curMethod] = (function( curMethod ) {
						return function() {
							var args = arguments, 
								aLen = args.length,
								fName = curMethod;
								
							/* If additional arguments are passed to individual functions
							 * in the chain we append these arguments after the cache.data
							 * pass.
							 * !! It would be nice to develop some form of interface logic 
							 * !! which allows the user to tell jqueryphp how to arrange/pass
							 * !! the arguments.
							 */
							
							methods['call'].apply( cache.selected, Array.prototype.slice.call( [fName, cache.callback, cache.data] ));
							
							// We return the plugin object to maintaining chaining.
							return this;
						}
					})( curMethod );
				}
			}
			
			return this;
		},

		/**
		 * Handles backend PHP function requests.
		 * @func {String} 		Name of function being requested.
		 * @callback {Function} A function for handling returned results.
		 * @return {Object} jQuery object.
		 */
		call : function( func, callback ) {
			/* We subtract 2 from the arglen variable so when building
			 * our args string to pass to the server we are not sending
			 * the func string or the callback object to be interpreted
			 * as a argument to be passed to a PHP function. 
			 */	
			var self = this,
				arglen = arguments.length - 2,
				args = arguments;
			
			/* Here we build a JSON object containing the arguments (if
			 * any) to be passed to the PHP function. We offset our index
			 * by 2 so we don't pass the function string or the callback
			 * object to the server.
			 */
			var jsonObj = [];
			for (var i=0; i<arglen; i++) {
				var argId = i + 2;
				jsonObj.push( args[argId] );
			}
			
			/* We stringify our arguments list to pass it through to
			 * the server for processing.
			 */
			var args = JSON.stringify(jsonObj);
			
			/* Finally the request object is built and sent to the server
			 * for handling.
			 */
			jQuery.ajaxSetup({async: false});
			var request = $.ajax({
				url: config.path,
				type: "POST",
				data: {'method': 'call', 'func': func, 'args': args},
				dataType: "text",
				success: function(data) {
					cache.data = data;	
					callback(data, self);
				}
			});
			
			return this;
		},
		
		/**
		 * This method allows for running PHP code written within 
		 * JavaScript. 
		 */
		/**
		 * Handles running PHP code strings.
		 * @code {String} 		PHP code to be executed.
		 * @callback {Function} A function for handling returned results.
		 * @return {Object} jQuery object.
		 */
		exec: function( code, callback ) {
			var self = this;
			
			/*
			 * Finally the request object is built and sent to the server
			 * for handling.
			 */
			$.ajaxSetup({async: false});
			var request = $.ajax({
				url: config.path,
				type: "POST",
				data: {'method': 'exec', 'code': code},
				dataType: "text",
				success: function( data, textStatus, xhr ) {
					callback(data, self);
				}
			});
			
			return this;
		}
	};
	
	/**
	 * Interface to the jqueryphp plugin.
	 * @method {String} 	Name of method to be called.
	 * @return {Object} jQuery object.
	 */
	$.fn.php = function( method ) {			
		var args = arguments,
			plugin = $.fn.php,
			callback = null;
		
		/* In the event the user is defining a chain of PHP functions we
		 * test the first argument to see if it's a function. 
		 */
		if ( jQuery.isFunction( args[0] ) ) {
			
			var fName = args[0].toString();
			fName = fName.substr('function '.length);
			fName = fName.substr(0, fName.indexOf('('));
			
			/* If our selected object has not been registered yet in our
			 * global cache we save it now.
			 */
			if ( fName === "chain" ) {
				cache.selected = this;
			}
			
			// Register our callback for chained functions
			cache.callback = args[0];
			
			// Register our initial argument data
			cache.data = args[1];
			
			// Return the plugin object so we don't break the chain
			return plugin;
		} 
		 
		/* In the event the user is defining a list of PHP functions to 
		 * call the first argument will be a plain object and the second
		 * parameter will be a function. We detect this situation and then
		 * structure the arguments that we pass to the php.call method in 
		 * the appropriate order.
		 */
		if ( jQuery.isPlainObject( args[0] ) && jQuery.isFunction( args[1] ) ) {
			callback = args[1];
			
			/* For each function defined in our object list we augment our parameters
			 * to conform to the php.call method.
			 */
			for ( func in method ) {	
				var passArgs = method[ func ];
				passArgs.unshift( callback )
				passArgs.unshift( func );
				methods['call'].apply( this, Array.prototype.slice.call( passArgs ) );
			} 
			
			return this;
		}
		
		/* The below plugin calls handle modes of "default" operation. That is
		 * calls made to a single PHP function and the usage of code exec mode.
		 */
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( method !== 'init' && method !== 'exec' ) {
			return methods[ 'call' ].apply( this, Array.prototype.slice.call( arguments ));
		} else if ( typeof method === 'object' ) {
			return methods.init.apply( this, arguments );
		} else if ( !method ) {
			console.log('no params');
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.php' );
		}
		
		return this;
	};

})( jQuery );
