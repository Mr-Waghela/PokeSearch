var mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix
	.scripts([  
        'assets/js/main.js',    
    ], 'assets/js/main1.js')
    .styles([
        'assets/css/style.css',
    ], 'assets/css/common.css')
    .disableNotifications();