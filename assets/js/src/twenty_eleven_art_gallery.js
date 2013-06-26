/**
 * Twenty Eleven Art Gallery
 * http://github.com/kadamwhite
 *
 * Copyright (c) 2013 K.Adam White
 * Licensed under the GPLv2+ license.
 */

 // We don't technically need to pass in Underscore, but it's more obvious
(function( window, $, _, undefined ) {
	'use strict';

	var $headerGallery, $thumbnails, $featuredArtwork, render;

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
				.html( render( data ) )
				// Set the ID so we can do that convenient comparison up above
				.data( 'id', data.id );
		} else {
			// If the gallery is not yet open, slide it open and hide the banner
			// First, however, we retrieve the template and define our `render` function
			render = _.template( $( '#gallery-template' ).html() );

			$('#branding').children('a').slideUp();
			$featuredArtwork.html( render( data ) ).slideDown();
			$thumbnails.addClass('open'); // For styling only
		}
	});
})( this, jQuery, _ );