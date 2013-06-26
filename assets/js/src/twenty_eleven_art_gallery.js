/**
 * Twenty Eleven Art Gallery
 * http://github.com/kadamwhite
 *
 * Copyright (c) 2013 K.Adam White
 * Licensed under the GPLv2+ license.
 */

(function( window, $, undefined ) {
	'use strict';

	var $headerGallery, $thumbnails, $featuredArtwork, renderGallery;

	// Grab the template, which has been compiled into a JS function using Grunt
	renderGallery = window.artgallery['assets/js/templates/gallery_featured_image.tmpl'];

	// Don't need `$(document).ready` since this script is loaded at page bottom
	$headerGallery = $('.artwork-header-gallery');
	$thumbnails = $headerGallery.find('.artwork-thumbnails');
	$featuredArtwork = $headerGallery.find('.artwork-featured');

	// Catch any clicks on the image thumbnails
	$thumbnails.on('click', 'a', function( evt ) {
		var data;

		evt.preventDefault();

		// Get the featured image data from the link we clicked
		data = $( this ).data();

		// If we clicked the same image that's showing, do nothing
		if ( data.id === $featuredArtwork.data('id') ) {
			return;
		}

		// If the gallery is open, just switch the image
		if ( $featuredArtwork.is(':visible') ) {
			$featuredArtwork
				.html( renderGallery( data ) )
				// Set the ID so we can do that convenient comparison up above
				.data( 'id', data.id );
		} else {
			// If the gallery is not yet open, slide it open and hide the banner
			$('#branding').children('a').slideUp();
			$featuredArtwork.html( renderGallery( data ) ).slideDown();
			$thumbnails.addClass('open'); // For styling only
		}
	});
})( this, jQuery );
