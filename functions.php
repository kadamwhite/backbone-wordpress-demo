<?php
/**
 * Twenty Eleven Art Gallery functions and definitions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * @package Twenty Eleven Art Gallery
 * @since 0.1.0
 */

// Useful global constants
define( 'TE_ARTGALLERY_VERSION', '0.1.0' );

/**
 * Set up theme defaults and register supported WordPress features.
 *
 * @uses load_theme_textdomain() For translation/localization support.
 *
 * @since 0.1.0
 */
function te_artgallery_setup() {
	/**
	 * Makes Twenty Eleven Art Gallery available for translation.
	 *
	 * Translations can be added to the /lang directory.
	 * If you're building a theme based on Twenty Eleven Art Gallery, use a find and replace
	 * to change 'te_artgallery' to the name of your theme in all template files.
	 */
	load_theme_textdomain( 'te_artgallery', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'te_artgallery_setup' );

/**
 * Enqueue scripts and styles for front-end.
 *
 * @since 0.1.0
 */
function te_artgallery_scripts_styles() {
	$postfix = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) ? '' : '.min';
	$assets_path = get_stylesheet_directory_uri() . '/assets';

	wp_register_style(
		'te_artgallery_parent',
		get_template_directory_uri() . "/style.css",
		array(),
		TE_ARTGALLERY_VERSION
	);

	if( is_front_page() ) {

		wp_enqueue_style(
			'te_artgallery',
			$assets_path . "/build/twenty_eleven_art_gallery{$postfix}.css",
			array( 'te_artgallery_parent' ),
			TE_ARTGALLERY_VERSION
		);

		wp_enqueue_script(
			'te_artgallery',
			$assets_path . "/build/twenty_eleven_art_gallery{$postfix}.js",
			array( 'jquery' ),
			TE_ARTGALLERY_VERSION,
			true
		);

	} else {
		wp_enqueue_style( 'te_artgallery_parent' );
	}
}
add_action( 'wp_enqueue_scripts', 'te_artgallery_scripts_styles' );

/**
 * Add humans.txt to the <head> element.
 */
function te_artgallery_header_meta() {
	$humans = '<link type="text/plain" rel="author" href="' . get_stylesheet_directory_uri() . '/humans.txt" />';

	echo apply_filters( 'te_artgallery_humans', $humans );
}
add_action( 'wp_head', 'te_artgallery_header_meta' );