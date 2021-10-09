// form validation options 
let isCurrencyOptions = {  
		require_symbol: false, 
		allow_space_after_symbol: false, 
		symbol_after_digits: false, 
		allow_negatives: false, 
		parens_for_negatives: false, 
		allow_negative_sign_placeholder: false, 
		thousands_separator: ',', 
		decimal_separator: '.', 
		allow_decimal: true, 
		digits_after_decimal: [2], 
		allow_space_after_digits: false,
}

let isEmailOptions = {  
		allow_display_name: false,
		require_display_name: false,
		allow_utf8_local_part: true,
		require_tld: true,
		allow_ip_domain: false,
		domain_specific_validation: false,
		ignore_max_length: true,
		blacklisted_chars: ' ',
}

let normalizeEmailOptions = {
		all_lowercase: true,
		gmail_lowercase: true,
		gmail_remove_dots: false,
		gmail_remove_subaddress: true,
		gmail_convert_googlemaildotcom: true,
		outlookdotcom_lowercase: true,
		yahoo_lowercase: true,
		yahoo_remove_subaddress: true,
		icloud_lowercase: true,
		icloud_remove_subaddress: true,
}

const phoneNumbersLocales = [ 'en-US', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK', 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-US' ];

export { isCurrencyOptions, isEmailOptions, normalizeEmailOptions, phoneNumbersLocales }
