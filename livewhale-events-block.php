<?php
/**
 * Plugin Name:       Livewhale Events Block
 * Description:       Pulls templated Livewhale widgets onto Mercury theme page
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            UFIT Web Services
 * Text Domain:       livewhale-events-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_livewhale_events_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_livewhale_events_block_block_init' );

function enqueue_assets() {
	if ( is_admin() ) {
		wp_enqueue_script(
            'livewhale_script',
            'https://ufl.lwcal.com/livewhale/theme/core/scripts/lwcw.js'
        );
	}
}

add_theme_support( 'editor-styles' );